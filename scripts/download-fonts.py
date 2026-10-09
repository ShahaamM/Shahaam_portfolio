import urllib.request
import re
import os

os.makedirs('src/fonts', exist_ok=True)
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def download_file(url, path):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp, open(path, 'wb') as f:
        f.write(resp.read())
    print(f"Downloaded {path} ({os.path.getsize(path)} bytes)")

def parse_and_download(css_url, out_prefix):
    req = urllib.request.Request(css_url, headers=headers)
    css = urllib.request.urlopen(req).read().decode('utf-8')
    blocks = css.split('@font-face')
    for b in blocks:
        if not b.strip():
            continue
        if '/* latin */' in b:
            style_m = re.search(r'font-style:\s*([^;]+);', b)
            weight_m = re.search(r'font-weight:\s*([^;]+);', b)
            url_m = re.search(r'src:\s*url\((https://[^\)]+\.woff2)\)', b)
            if url_m:
                url = url_m.group(1)
                style = style_m.group(1).strip() if style_m else 'normal'
                weight = weight_m.group(1).strip() if weight_m else '400'
                weight_clean = weight.replace(' ', '_').replace('..', '-')
                filename = f"{out_prefix}-{style}-{weight_clean}.woff2"
                download_file(url, os.path.join('src/fonts', filename))

parse_and_download('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap', 'InterTight')
parse_and_download('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap', 'InstrumentSerif')
parse_and_download('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap', 'JetBrainsMono')

print("Fonts successfully downloaded!")
