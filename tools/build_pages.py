"""Build static pages from shared header/footer and page content. Run: py tools/build_pages.py"""
from pathlib import Path
import html
import json
import re
ROOT = Path(__file__).resolve().parent.parent
TEMPLATES = ROOT / 'templates'

def main():
    header = (TEMPLATES / 'header.html').read_text(encoding='utf-8')
    footer = (TEMPLATES / 'footer.html').read_text(encoding='utf-8')
    pages = json.loads((TEMPLATES / 'pages.json').read_text(encoding='utf-8'))
    for slug, metadata in pages.items():
        page_header = header.replace('{{title}}', html.escape(metadata['title'])).replace('{{description}}', html.escape(metadata['description'], quote=True))
        filename = slug + '.html'
        # Only the current main-navigation link receives aria-current.
        page_header = re.sub(r'(<nav\b.*?</nav>)', lambda m: m[0].replace(f'href="{filename}"', f'href="{filename}" aria-current="page"'), page_header, flags=re.S)
        body = (TEMPLATES / 'pages' / filename).read_text(encoding='utf-8')
        (ROOT / filename).write_text(page_header + '<main id="main">\n' + body + '\n</main>' + footer, encoding='utf-8')
        print('Built ' + filename)

if __name__ == '__main__':
    main()
