#!/bin/sh
# Compare current LKM.svg with before.png reference
inkscape --export-type=png --export-filename=after.png --export-dpi=150 LKM.svg 2>/dev/null
m=/tmp/lkm_mask.png
convert before.png after.png -compose difference -composite \
  -grayscale Rec709Luminance -threshold 1% -morphology Dilate Disk:3 $m 2>/dev/null
convert after.png \( -size "$(identify -format '%wx%h' after.png)" xc:red \
  $m -compose copy-opacity -composite \) -compose over -composite diff_highlight.png 2>/dev/null
compare before.png after.png diff_highlight2.png
eog after.png diff_highlight.png diff_highlight2.png
