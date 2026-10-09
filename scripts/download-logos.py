import os
import urllib.request

LOGOS_DIR = "public/logos"
os.makedirs(LOGOS_DIR, exist_ok=True)

# MIT License for devicon & simple-icons
LICENSE_TEXT = """MIT License

Copyright (c) Devicon & Simple Icons contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

with open(os.path.join(LOGOS_DIR, "LICENSE"), "w", encoding="utf-8") as f:
    f.write(LICENSE_TEXT)

# Map key -> raw GitHub URL (devicon or simple-icons)
LOGO_URLS = {
    "python": "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    "r": "https://raw.githubusercontent.com/devicons/devicon/master/icons/r/r-original.svg",
    "java": "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
    "csharp": "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg",
    "pandas": "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg",
    "numpy": "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg",
    "scikitlearn": "https://raw.githubusercontent.com/devicons/devicon/master/icons/scikitlearn/scikitlearn-original.svg",
    "matplotlib": "https://raw.githubusercontent.com/devicons/devicon/master/icons/matplotlib/matplotlib-original.svg",
    "react": "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    "nodejs": "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    "express": "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
    "fastapi": "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg",
    "mysql": "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
    "sqlite": "https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg",
    "mongodb": "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    "microsoftsqlserver": "https://raw.githubusercontent.com/devicons/devicon/master/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
    "azure": "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg",
    "git": "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
    "github": "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg",
    "pycharm": "https://raw.githubusercontent.com/devicons/devicon/master/icons/pycharm/pycharm-original.svg",
    "jupyter": "https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original.svg",
    "vscode": "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg",
    "intellij": "https://raw.githubusercontent.com/devicons/devicon/master/icons/intellij/intellij-original.svg",
    "linkedin": "https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original.svg",
    "chartjs": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/chartdotjs.svg",
}

headers = {"User-Agent": "Mozilla/5.0"}
for key, url in LOGO_URLS.items():
    dest = os.path.join(LOGOS_DIR, f"{key}.svg")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as resp:
            content = resp.read()
            with open(dest, "wb") as f:
                f.write(content)
            print(f"Downloaded logo {key}")
    except Exception as e:
        print(f"Failed to download {key}: {e}")

print("Logos processed!")
