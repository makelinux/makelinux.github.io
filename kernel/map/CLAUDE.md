# Linux kernel map

Interactive SVG map of Linux kernel functions and subsystems.

## Project structure

- `LKM.svg` - main kernel map, tracked in git
- `lkm_edges.py` - extract edges from Inkscape connector metadata\
  `--dot` for graphviz output, `--fix` to repair broken connectors
- `find_obsolete.py` - find obsolete symbols using `~/linux/next/tags`
- `diff_svg.sh` - visual diff with ImageMagick, needs before.png
- `inkscape.sh` - chroot wrapper for Inkscape (ubuntu-9-32)

## SVG editing

### Symbol replacement
- Check `~/linux/next/tags` and grep source before replacing
- Replace both `xlink:href` URL and `<tspan>` text
- Use `replace_all` to catch both occurrences
- Check connectors before removing elements:
  grep for element id in connection-start/end refs
- Remove associated `<path>` connectors when removing elements

### Connectors
- `inkscape:connection-start="#textXXX"` and
  `inkscape:connection-end="#textYYY"` on `<path>` elements
- After renaming text, connectors stay valid (reference element
  id, not label)

### Version
- `id="kernel_release"` tspan holds kernel version (grey bold)
- Copyright in `dc:title` element

## Commit workflow

- Inkscape viewport metadata (zoom, cx, cy, window-height)
  pollutes diffs - exclude from semantic commits
- Extract hunks: save patch, filter by content, checkout + apply
- Commit message style: short, lowercase, `->` for replacements
