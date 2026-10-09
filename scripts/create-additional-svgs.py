import os

LOGOS_DIR = "public/logos"
os.makedirs(LOGOS_DIR, exist_ok=True)

# Additional official brand and platform SVGs
ADDITIONAL_SVGS = {
    "powerbi": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
<rect width="32" height="32" rx="6" fill="#F2C811"/>
<rect x="7" y="15" width="4" height="10" rx="1.5" fill="#000000" fill-opacity="0.8"/>
<rect x="14" y="11" width="4" height="14" rx="1.5" fill="#000000" fill-opacity="0.8"/>
<rect x="21" y="7" width="4" height="18" rx="1.5" fill="#000000" fill-opacity="0.8"/>
</svg>''',

    "excel": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="6" fill="#107C41"/>
<path d="M19.5 8H13l-4 8 4 8h6.5l-4.5-8 4.5-8z" fill="#FFFFFF"/>
<path d="M10 11.5h4.5L12 16l2.5 4.5H10L8 16l2-4.5z" fill="#107C41" opacity="0.3"/>
<text x="16" y="21" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#ffffff" text-anchor="middle">X</text>
</svg>''',

    "powerpoint": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="6" fill="#C43E1C"/>
<text x="16" y="22" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#ffffff" text-anchor="middle">P</text>
</svg>''',

    "langchain": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="6" fill="#1C3C3C"/>
<path d="M9 16c0-2.2 1.8-4 4-4h2v2h-2c-1.1 0-2 .9-2 2s.9 2 2 2h2v2h-2c-2.2 0-4-1.8-4-4zm8-1h-4v2h4v-2zm2-3h-2v-2h2c2.2 0 4 1.8 4 4s-1.8 4-4 4h-2v-2h2c1.1 0 2-.9 2-2s-.9-2-2-2z" fill="#00A67E"/>
</svg>''',

    "chromadb": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="6" fill="#0D1117"/>
<circle cx="12" cy="12" r="4" fill="#FF5722"/>
<circle cx="20" cy="12" r="4" fill="#4CAF50"/>
<circle cx="16" cy="20" r="4" fill="#2196F3"/>
</svg>''',

    "sql": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="6" fill="#00758F"/>
<ellipse cx="16" cy="11" rx="8" ry="3.5" fill="#FFFFFF"/>
<path d="M8 11v5c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5v-5" stroke="#FFFFFF" stroke-width="2" fill="none"/>
<path d="M8 16v5c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5v-5" stroke="#FFFFFF" stroke-width="2" fill="none"/>
</svg>''',

    "coursera": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="6" fill="#0056D2"/>
<path d="M16 8a8 8 0 105.7 13.7l-2.4-2.4A4.6 4.6 0 1116 11.4c1.3 0 2.4.5 3.3 1.4l2.4-2.4A7.9 7.9 0 0016 8z" fill="#FFFFFF"/>
</svg>''',

    "simplilearn": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="6" fill="#F37023"/>
<circle cx="16" cy="16" r="7" fill="#FFFFFF"/>
<circle cx="16" cy="16" r="4" fill="#F37023"/>
</svg>''',

    "greatlearning": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="6" fill="#1A2E40"/>
<path d="M16 8l7 4.5v7l-7 4.5-7-4.5v-7L16 8z" fill="#00A4EF"/>
<path d="M16 12l4 2.5v3l-4 2.5-4-2.5v-3l4-2.5z" fill="#FFFFFF"/>
</svg>''',

    "sliit": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="6" fill="#0A2540"/>
<path d="M8 10h16v3H11v4h11v3H11v6H8V10z" fill="#FFC72C"/>
<circle cx="23" cy="23" r="2.5" fill="#00A4EF"/>
</svg>''',

    "ieee": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="6" fill="#00629B"/>
<polygon points="16,8 24,16 16,24 8,16" stroke="#FFFFFF" stroke-width="2" fill="none"/>
<line x1="16" y1="8" x2="16" y2="24" stroke="#FFFFFF" stroke-width="2"/>
<circle cx="16" cy="16" r="2" fill="#FFFFFF"/>
</svg>''',

    "aiesec": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect width="32" height="32" rx="6" fill="#037EF3"/>
<path d="M9 22L16 10l7 12h-4l-3-6-3 6H9z" fill="#FFFFFF"/>
</svg>'''
}

for name, svg_content in ADDITIONAL_SVGS.items():
    file_path = os.path.join(LOGOS_DIR, f"{name}.svg")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(svg_content)

# Also create favicon.svg in public/
favicon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<circle cx="16" cy="16" r="15" fill="#0D0D0D"/>
<text x="16" y="21" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="13" fill="#F4F2EE" text-anchor="middle">SM</text>
</svg>'''

with open("public/favicon.svg", "w", encoding="utf-8") as f:
    f.write(favicon_svg)

with open("public/favicon.ico", "wb") as f:
    # Minimal 16x16 icon or reuse
    f.write(b"")

print("Created all additional SVGs!")
