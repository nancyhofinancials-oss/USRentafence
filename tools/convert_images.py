"""Organize original JFIF images as verified JPEG copies; keep originals intact."""
from pathlib import Path
from PIL import Image
import shutil

ROOT = Path(__file__).resolve().parent.parent
DESTINATIONS = {
    'barricades': 'products/metal-crowd-control-barricade.jpg',
    'fence1': 'products/us-rent-a-fence-chain-link-sign.jpg',
    'fence2': 'products/temporary-fence-panel-on-bases.jpg',
    'fence3': 'projects/sidewalk-temporary-fence-installation.jpg',
    'fence4': 'products/chain-link-site-fencing.jpg',
    'jerseybarriers': 'products/red-white-plastic-jersey-barriers.jpg',
    'silt': 'products/silt-fencing.jpg',
}

def main():
    for source in sorted(ROOT.glob('*.jfif')):
        destination = ROOT / 'assets/images' / DESTINATIONS.get(source.stem, 'products/' + source.stem + '.jpg')
        destination.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(source) as original:
            original.verify()
        with Image.open(source) as original:
            dimensions = original.size
            if original.format != 'JPEG':
                raise ValueError(f'{source.name} is not JPEG; review before recompressing')
        # JFIF is already a JPEG format. Copying preserves all compressed image data.
        if destination.exists() and destination.read_bytes() != source.read_bytes():
            raise FileExistsError(f'Refusing to overwrite different image: {destination}')
        shutil.copyfile(source, destination)
        with Image.open(destination) as converted:
            assert converted.format == 'JPEG' and converted.size == dimensions
            converted.verify()
        assert source.read_bytes() == destination.read_bytes()
        old = ROOT / 'assets/images/products' / (source.stem + '.jpg')
        # Remove only a verified redundant generated copy, never the original JFIF.
        if old != destination and old.exists() and old.read_bytes() == source.read_bytes():
            old.unlink()
        for file in list(ROOT.rglob('*.html')) + list(ROOT.rglob('*.css')):
            content = file.read_text(encoding='utf-8-sig')
            updated = content.replace('assets/images/products/' + source.stem + '.jpg', 'assets/images/' + DESTINATIONS[source.stem])
            updated = updated.replace('../images/products/' + source.stem + '.jpg', '../images/' + DESTINATIONS[source.stem])
            if content != updated:
                file.write_text(updated, encoding='utf-8')
        print(f'{source.name} -> assets/images/{DESTINATIONS[source.stem]} | {dimensions} | identical bytes verified')

if __name__ == '__main__':
    main()
