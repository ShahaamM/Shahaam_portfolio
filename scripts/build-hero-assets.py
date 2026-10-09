#!/usr/bin/env python3
"""
scripts/build-hero-assets.py
Processes intro video and portrait photo into production-ready web assets.
1. Seamless video loop with xfade and sample-accurate numpy audio crossfade.
2. Background whitening (colorlevels).
3. Dual export: hero.mp4 (H.264/AAC) and hero.webm (VP9/Opus).
4. Portrait bust (480x600 webp) and Open Graph image (1200x630 og.jpg).
"""

import os
import sys
import wave
import shutil
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

def get_ffmpeg_binary():
    # Check PATH first
    ff = shutil.which("ffmpeg")
    if ff:
        return ff
    # Check imageio_ffmpeg
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        pass
    raise RuntimeError("FFmpeg executable not found. Please install ffmpeg or imageio-ffmpeg.")

def process_audio(ffmpeg_bin, input_video, output_wav, loop_duration=10.0, fade_duration=0.5):
    """
    Extracts raw audio and produces sample-accurate crossfade loop using NumPy.
    Fade last `fade_duration` into first `fade_duration`.
    """
    temp_raw = "temp_raw_audio.wav"
    cmd = [
        ffmpeg_bin, "-y", "-t", str(loop_duration), "-i", input_video,
        "-vn", "-ar", "48000", "-ac", "2", temp_raw
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    with wave.open(temp_raw, "rb") as wf:
        params = wf.getparams()
        framerate = wf.getframerate()
        n_frames = wf.getnframes()
        raw_bytes = wf.readframes(n_frames)
        audio = np.frombuffer(raw_bytes, dtype=np.int16).reshape(-1, 2)

    fade_samples = int(fade_duration * framerate)
    out_samples = n_frames - fade_samples

    out_audio = np.zeros((out_samples, 2), dtype=np.int16)
    main_len = n_frames - 2 * fade_samples

    # Main section: [fade_samples : n_frames - fade_samples]
    out_audio[0:main_len] = audio[fade_samples:n_frames - fade_samples]

    # Crossfade section: last fade_samples
    w = np.linspace(0.0, 1.0, fade_samples, endpoint=False)[:, np.newaxis]
    fade_end = audio[n_frames - fade_samples:n_frames].astype(np.float64)
    fade_start = audio[0:fade_samples].astype(np.float64)
    faded = (1.0 - w) * fade_end + w * fade_start

    out_audio[main_len:] = np.clip(faded, -32768, 32767).astype(np.int16)

    with wave.open(output_wav, "wb") as wf:
        wf.setparams(params)
        wf.setnframes(out_samples)
        wf.writeframes(out_audio.tobytes())

    if os.path.exists(temp_raw):
        os.remove(temp_raw)

    return out_samples / framerate

def process_video_and_export(ffmpeg_bin, input_video, audio_wav, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    hero_mp4 = os.path.join(out_dir, "hero.mp4")
    hero_webm = os.path.join(out_dir, "hero.webm")

    # Center crop: person centered at x=960 in 1920x1080 source
    # Crop 800x1000 with x=560, y=50, scaled to 768x960
    # Whiten background with colorlevels
    filter_complex = (
        "[0:v]trim=start=0.5:end=10.0,setpts=PTS-STARTPTS,fps=24,"
        "crop=800:1000:560:50,scale=768:960,"
        "colorlevels=rimax=0.96:gimax=0.96:bimax=0.96[v_main];"
        "[0:v]trim=start=0:end=0.5,setpts=PTS-STARTPTS,fps=24,"
        "crop=800:1000:560:50,scale=768:960,"
        "colorlevels=rimax=0.96:gimax=0.96:bimax=0.96[v_head];"
        "[v_main][v_head]xfade=transition=fade:duration=0.5:offset=9.0,format=yuv420p[v]"
    )

    print("Encoding hero.mp4...")
    cmd_mp4 = [
        ffmpeg_bin, "-y", "-i", input_video, "-i", audio_wav,
        "-filter_complex", filter_complex,
        "-map", "[v]", "-map", "1:a",
        "-c:v", "libx264", "-crf", "24", "-preset", "slow",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        hero_mp4
    ]
    subprocess.run(cmd_mp4, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"Generated {hero_mp4} ({os.path.getsize(hero_mp4)} bytes)")

    print("Encoding hero.webm...")
    cmd_webm = [
        ffmpeg_bin, "-y", "-i", input_video, "-i", audio_wav,
        "-filter_complex", filter_complex,
        "-map", "[v]", "-map", "1:a",
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-deadline", "good", "-cpu-used", "2",
        "-c:a", "libopus", "-b:a", "80k",
        hero_webm
    ]
    subprocess.run(cmd_webm, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"Generated {hero_webm} ({os.path.getsize(hero_webm)} bytes)")

def process_portrait_and_og(source_photo, public_dir):
    os.makedirs(public_dir, exist_ok=True)
    bust_path = os.path.join(public_dir, "portrait-bust.webp")
    og_path = os.path.join(public_dir, "og.jpg")

    im = Image.open(source_photo).convert("RGB")
    w, h = im.size

    # Crop head to shirt at 480x600 (aspect ratio 4:5 = 0.8)
    target_ratio = 480.0 / 600.0
    crop_w = int(w * 0.95)
    crop_h = int(crop_w / target_ratio)
    if crop_h > h:
        crop_h = h
        crop_w = int(crop_h * target_ratio)

    left = (w - crop_w) // 2
    top = int(h * 0.04) # slight headroom
    if top + crop_h > h:
        top = h - crop_h

    bust = im.crop((left, top, left + crop_w, top + crop_h))
    bust = bust.resize((480, 600), Image.Resampling.LANCZOS)
    bust.save(bust_path, "WEBP", quality=92)
    print(f"Generated {bust_path}")

    # Generate OG image at 1200x630
    # Warm off-white #f4f2ee canvas
    og = Image.new("RGB", (1200, 630), color=(244, 242, 238))
    draw = ImageDraw.Draw(og)

    # Paste bust image on the right
    bust_thumb = bust.resize((360, 450), Image.Resampling.LANCZOS)
    # Border / card for bust
    card_box = (740, 90, 1120, 540)
    draw.rectangle(card_box, fill=(255, 255, 255), outline=(220, 218, 212), width=2)
    og.paste(bust_thumb, (750, 90))

    # Text elements on left
    # Draw simple clean typography without external font dependencies
    draw.text((80, 140), "SHAHAAM MARZOOK", fill=(13, 13, 13))
    draw.text((80, 180), "FORWARD DEPLOYMENT ENGINEER", fill=(119, 117, 111))
    draw.text((80, 240), "BSc (Hons) Information Technology (Data Science)", fill=(58, 58, 58))
    draw.text((80, 280), "AI Engineering · Data Science · Full Stack Systems", fill=(119, 117, 111))
    draw.text((80, 460), "Portfolio & Selected Work · 2026", fill=(169, 166, 160))

    og.save(og_path, "JPEG", quality=90)
    print(f"Generated {og_path}")

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    video_input = os.path.join(base_dir, "intro.mp4")
    photo_input = os.path.join(base_dir, "Shahaam_Pic.jpg")
    public_hero_dir = os.path.join(base_dir, "public", "hero")
    public_dir = os.path.join(base_dir, "public")

    ffmpeg_bin = get_ffmpeg_binary()
    print(f"Using FFmpeg: {ffmpeg_bin}")

    temp_wav = os.path.join(base_dir, "temp_loop_audio.wav")
    try:
        print("Creating seamless audio crossfade...")
        process_audio(ffmpeg_bin, video_input, temp_wav)

        print("Exporting video assets (MP4 + WebM)...")
        process_video_and_export(ffmpeg_bin, video_input, temp_wav, public_hero_dir)

        print("Creating portrait and OG assets...")
        process_portrait_and_og(photo_input, public_dir)

        print("Hero pipeline completed successfully!")
    finally:
        if os.path.exists(temp_wav):
            os.remove(temp_wav)

if __name__ == "__main__":
    main()
