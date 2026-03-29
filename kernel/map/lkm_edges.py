#!/usr/bin/env python3
"""Extract edges from LKM.svg as symbol -> symbol."""

import xml.etree.ElementTree as ET
import os
import re
import sys

dir = os.path.dirname(os.path.abspath(__file__))
SVG = os.path.join(dir, 'LKM.svg')
dot = '--dot' in sys.argv
fix = '--fix' in sys.argv

tree = ET.parse(SVG)
root = tree.getroot()
ns = '{http://www.w3.org/2000/svg}'
ink = '{http://www.inkscape.org/namespaces/inkscape}'

labels = {}
for el in root.iter():
    eid = el.get('id')
    if not eid:
        continue
    for t in el.iter(ns + 'tspan'):
        if t.text and t.text.strip():
            labels[eid] = t.text.strip()
            break


def quote(s):
    return f'"{s}"' if not re.match(r'^[a-zA-Z_]\w*$', s) else s


# Fixes for incomplete connectors: path_id -> (side, target_element_id)
FIXES = {
    'path6565': ('end', 'text3406'),    # interrupt -> common_interrupt
    'path20494': ('end', 'text5658'),   # __setup_irq -> irq_desc
    'path6545': ('start', 'text8248'),  # kernel_thread -> kernel_clone
    'path3385': ('start', 'text4253'),  # USB -> usb_hcd_irq
    'path3387': ('end', 'text7719'),    # inw -> I/O ports
    'path6529': ('end', 'text4766'),    # __sock_create -> inet_family_ops
    'path9268': ('end', 'text9264'),    # netif_rx -> netif_receive_skb
    'path4417': ('end', 'text2614'),    # wakeup_kswapd -> block devices
    'path3669': ('end', 'text6830'),    # setup_arch -> trap_init
    'path3840': ('end', 'text3834'),    # sys_sysinfo -> si_swapinfo
}

modified = False
edges = []
for p in root.iter(ns + 'path'):
    s = p.get(ink + 'connection-start')
    e = p.get(ink + 'connection-end')
    if not s or not e:
        if s or e:
            pid = p.get('id', '?')
            sl = labels.get(s.lstrip('#'), s) if s else '?'
            el = labels.get(e.lstrip('#'), e) if e else '?'
            print(f'{pid}: incomplete {sl} -> {el}', file=sys.stderr)
            if fix and pid in FIXES:
                side, target = FIXES[pid]
                if side == 'start':
                    p.set(ink + 'connection-start', '#' + target)
                else:
                    p.set(ink + 'connection-end', '#' + target)
                modified = True
        continue
    src = labels.get(s.lstrip('#'))
    dst = labels.get(e.lstrip('#'))
    if src and dst:
        edges.append((p.get('id', '?'), src, dst))

if fix and modified:
    for prefix, uri in [
        ('', 'http://www.w3.org/2000/svg'),
        ('inkscape', 'http://www.inkscape.org/namespaces/inkscape'),
        ('xlink', 'http://www.w3.org/1999/xlink'),
        ('sodipodi', 'http://sodipodi.sourceforge.net/DTD/sodipodi-0.0.dtd'),
        ('rdf', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
        ('cc', 'http://creativecommons.org/ns#'),
        ('dc', 'http://purl.org/dc/elements/1.1/'),
    ]:
        ET.register_namespace(prefix, uri)
    tree.write(SVG, xml_declaration=True, encoding='unicode')
    print(f'Fixed incomplete edges in {SVG}', file=sys.stderr)

if dot:
    print('digraph LKM {')
    print('    rankdir=TB;')
    print('    node [shape=box, style=rounded];')
    for pid, src, dst in edges:
        print(f'    {quote(src)} -> {quote(dst)};')
    print('}')
else:
    for pid, src, dst in edges:
        print(f"{pid}: {src} -> {dst}")
