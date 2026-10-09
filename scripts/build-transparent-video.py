#!/usr/bin/env python3
"""
scripts/build-transparent-video.py
Generates a seamless looping WebM video with TRUE ALPHA CHANNEL (yuva420p, VP9).
Every frame has its background cleanly segmented and alpha feathered,
so the character moves/speaks against a 100% transparent background.
"""

import os
import subprocess
import wave
import numpy as np
from PIL import Image
from scipy import ndimage
import imageio_ffmpeg

def get_ffmpeg():
    return imageio_ffmpeg.get_ffmpeg_exe()

def generate_transparent_webm():
    ff = get_ffmpeg()
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    video_in = os.path.join(base_dir, "intro.mp4")
    out_webm = os.path.join(base_dir, "public", "hero", "hero.webm")
    out_mp4 = os.path.join(base_dir, "public", "hero", "hero.mp4")
    temp_wav = os.path.join(base_dir, "temp_loop_audio.wav")

    # 1. First generate the seamless looped audio using NumPy
    print("1. Generating seamless looped audio...")
    temp_raw_wav = "temp_raw_audio.wav"
    subprocess.run([
        ff, "-y", "-t", "10.0", "-i", video_in,
        "-vn", "-ar", "48000", "-ac", "2", temp_raw_wav
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    with wave.open(temp_raw_wav, "rb") as wf:
        params = wf.getparams()
        framerate = wf.getframerate()
        n_frames = wf.getnframes()
        audio = np.frombuffer(wf.readframes(n_frames), dtype=np.int16).reshape(-1, 2)

    fade_duration = 0.5
    fade_samples = int(fade_duration * framerate)
    out_samples = n_frames - fade_samples

    out_audio = np.zeros((out_samples, 2), dtype=np.int16)
    main_len = n_frames - 2 * fade_samples
    out_audio[0:main_len] = audio[fade_samples:n_frames - fade_samples]

    w = np.linspace(0.0, 1.0, fade_samples, endpoint=False)[:, np.newaxis]
    fade_end = audio[n_frames - fade_samples:n_frames].astype(np.float64)
    fade_start = audio[0:fade_samples].astype(np.float64)
    faded = (1.0 - w) * fade_end + w * fade_start
    out_audio[main_len:] = np.clip(faded, -32768, 32767).astype(np.int16)

    with wave.open(temp_wav, "wb") as wf:
        wf.setparams(params)
        wf.setnframes(out_samples)
        wf.writeframes(out_audio.tobytes())

    if os.path.exists(temp_raw_wav):
        os.remove(temp_raw_wav)

    # 2. Extract the seamless looping video frames from ffmpeg
    # Duration is 9.5 seconds at 24 fps (228 frames)
    # Using the xfade filter graph
    print("2. Reading looped video frames with xfade...")
    filter_complex = (
        "[0:v]trim=start=0.5:end=10.0,setpts=PTS-STARTPTS,fps=24,"
        "crop=800:1000:560:50,scale=768:960[v_main];"
        "[0:v]trim=start=0:end=0.5,setpts=PTS-STARTPTS,fps=24,"
        "crop=800:1000:560:50,scale=768:960[v_head];"
        "[v_main][v_head]xfade=transition=fade:duration=0.5:offset=9.0,format=rgb24[v]"
    )
    cmd_extract = [
        ff, "-y", "-i", video_in,
        "-filter_complex", filter_complex,
        "-map", "[v]",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "pipe:1"
    ]
    p_in = subprocess.Popen(cmd_extract, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)

    # 3. Setup ffmpeg encoder for transparent VP9 WebM
    print("3. Starting VP9 yuva420p transparent encoder...")
    cmd_encode = [
        ff, "-y",
        "-f", "rawvideo", "-pix_fmt", "rgba", "-s", "768x960", "-r", "24", "-i", "pipe:0",
        "-i", temp_wav,
        "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-crf", "28", "-b:v", "0",
        "-deadline", "good", "-cpu-used", "2",
        "-c:a", "libopus", "-b:a", "80k",
        "-map", "0:v", "-map", "1:a",
        out_webm
    ]
    p_out = subprocess.Popen(cmd_encode, stdin=subprocess.PIPE, stderr=subprocess.PIPE)

    W, H = 768, 960
    bytes_per_frame = W * H * 3
    frame_count = 0

    print("4. Processing frames with alpha matte...")
    while True:
        raw_rgb = p_in.stdout.read(bytes_per_frame)
        if len(raw_rgb) < bytes_per_frame:
            break

        arr = np.frombuffer(raw_rgb, dtype=np.uint8).reshape((H, W, 3))
        arr_f = arr.astype(np.float32)

        # Background color from top-left corners
        bg_color = np.median(arr_f[:20, :20], axis=(0, 1))
        color_dist = np.linalg.norm(arr_f - bg_color, axis=-1)

        # White/off-white threshold
        is_white = color_dist < 22.0

        # Connected component labeling
        labeled, num_features = ndimage.label(is_white)
        border_labels = set(np.unique(labeled[0, :])) | set(np.unique(labeled[-1, :])) | set(np.unique(labeled[:, 0])) | set(np.unique(labeled[:, -1]))
        border_labels.discard(0)

        # Label between legs around (Y=800, X=384)
        leg_gap_label = labeled[800, 384]
        bg_labels = list(border_labels)
        if leg_gap_label != 0 and leg_gap_label not in border_labels:
            bg_labels.append(leg_gap_label)

        bg_mask = np.isin(labeled, bg_labels)
        fg_mask = ~bg_mask

        # Smooth edge feathering
        alpha_float = ndimage.gaussian_filter(fg_mask.astype(np.float32), sigma=0.8)
        alpha_uint8 = np.clip(alpha_float * 255.0, 0, 255).astype(np.uint8)

        # RGBA frame
        rgba = np.dstack([arr, alpha_uint8])
        p_out.stdin.write(rgba.tobytes())

        frame_count += 1
        if frame_count % 48 == 0:
            print(f"   Processed {frame_count} frames ({frame_count/24:.1f}s)...")

    p_in.stdout.close()
    p_in.wait()

    p_out.stdin.close()
    stdout, stderr = p_out.communicate()
    if p_out.returncode != 0:
        print("Encoder error:", stderr.decode("utf-8", errors="ignore"))
        raise RuntimeError("Encoding failed")

    print(f"5. Successfully generated transparent WebM: {out_webm} ({os.path.getsize(out_webm)} bytes, {frame_count} frames)")

    if os.path.exists(temp_wav):
        os.remove(temp_wav)

if __name__ == "__main__":
    generate_transparent_webm()
