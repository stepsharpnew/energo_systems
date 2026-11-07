# /// script
# requires-python = ">=3.12"
# dependencies = ["Pillow==12.2.0"]
# ///
"""Build responsive WebP previews and intrinsic-size metadata.

Run with `uv run scripts/build-image-previews.py`. Originals stay unchanged for
full-screen viewing and downloads. Source bytes and encoder settings determine
preview URLs, so regenerated images are safe with the public image cache TTL.
"""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
FRONT = ROOT / "front"
PUBLIC = FRONT / "public"
OUTPUT = PUBLIC / "img/previews"
MANIFEST = FRONT / "data/imageManifest.json"
WIDTHS = (240, 480, 800, 1200, 1600)
QUALITY = 80
ENCODER = f"webp-q{QUALITY}-m5-v1"
RASTER = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
SOURCE_DIRS = ("components", "pages", "assets", "data")
URL = re.compile(r'''["'`](/(?:img|hdd|ups|dgu)/[^"'`<>\s]+?\.(?:jpe?g|png|webp|gif))["'`]''', re.I)


def referenced_images() -> set[str]:
    referenced = set()
    for dirname in SOURCE_DIRS:
        for path in (FRONT / dirname).rglob("*"):
            if path.is_file() and path.suffix in {".vue", ".js", ".ts", ".css", ".scss", ".json"} and path != MANIFEST:
                referenced.update(URL.findall(path.read_text()))
    return referenced


def build() -> None:
    referenced = referenced_images()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest, outputs = {}, set()
    for dirname in ("img", "hdd", "ups", "dgu"):
        for path in sorted((PUBLIC / dirname).rglob("*")):
            if not path.is_file() or path.suffix.lower() not in RASTER or OUTPUT in path.parents:
                continue
            src = "/" + path.relative_to(PUBLIC).as_posix()
            try:
                with Image.open(path) as original:
                    icc_profile = original.info.get("icc_profile", b"")
                    image = ImageOps.exif_transpose(original)
                    width, height = image.size
                    entry = {"width": width, "height": height, "variants": []}
                    manifest[src] = entry
                    # Small PNG logos can be encoded losslessly; tiny icons and
                    # animated assets only need dimensions.
                    small_logo = path.suffix.lower() == ".png" and 128 <= width < 320 and path.stat().st_size > 4096
                    if src not in referenced or (width < 320 and not small_logo) or getattr(original, "is_animated", False):
                        continue
                    has_alpha = image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info)
                    image = image.convert("RGBA" if has_alpha else "RGB")
                    # Source bytes already include the ICC bytes. The flag
                    # changes cache identity only for color-managed sources.
                    profile = ENCODER + ("-lossless" if small_logo else "") + ("-keep-icc" if icc_profile else "")
                    digest = hashlib.sha256(path.read_bytes() + profile.encode()).hexdigest()[:16]
                    for target_width in sorted({size for size in WIDTHS if size < width} | {min(width, WIDTHS[-1])}):
                        target_height = max(1, round(height * target_width / width))
                        filename = f"{digest}-{target_width}.webp"
                        output = OUTPUT / filename
                        if not output.exists():
                            image.resize((target_width, target_height), Image.Resampling.LANCZOS).save(output, "WEBP", quality=QUALITY, method=5, lossless=small_logo, icc_profile=icc_profile)
                        # Do not keep a full-size re-encode larger than its source.
                        if target_width == width and output.stat().st_size >= path.stat().st_size:
                            output.unlink()
                            entry["variants"].append({"src": src, "width": width, "height": height})
                            continue
                        outputs.add(filename)
                        entry["variants"].append({"src": "/img/previews/" + filename, "width": target_width, "height": target_height})
            except (OSError, ValueError) as error:
                raise RuntimeError(f"Cannot process {src}: {error}") from error
    for path in OUTPUT.glob("*.webp"):
        if path.name not in outputs:
            path.unlink()
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(dict(sorted(manifest.items())), ensure_ascii=False, indent=2) + "\n")
    print(f"Wrote {len(manifest)} image dimensions and {len(outputs)} responsive previews ({sum((OUTPUT / name).stat().st_size for name in outputs):,} bytes).")


if __name__ == "__main__":
    build()
