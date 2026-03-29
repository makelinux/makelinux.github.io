#!/usr/bin/env python3
"""Find obsolete symbols in LKM.svg that no longer exist in the kernel source."""

import xml.etree.ElementTree as ET
import os
import re
import subprocess

dir = os.path.dirname(os.path.abspath(__file__))
SVG = os.path.join(dir, 'LKM.svg')
KERNEL = os.path.expanduser('~/linux/next')

# Labels, categories, descriptions - not kernel symbols
SKIP = {
    'access', 'abstract', 'and', 'audio', 'bridges', 'camera',
    'class', 'cli', 'complete', 'console', 'control', 'controller',
    'current', 'debugging', 'device', 'drivers', 'electronics',
    'functions', 'functionalities', 'hardware', 'implementations',
    'interfaces', 'interrupt', 'keyboard', 'layers', 'logical',
    'mapping', 'memory', 'module', 'modules', 'mouse', 'network',
    'networking', 'operations', 'oss', 'owner', 'page', 'probe',
    'processes', 'processing', 'protocols', 'registers', 'security',
    'space', 'splice', 'storage', 'swap', 'synchronization',
    'system', 'threads', 'tty', 'user', 'virtual', 'zone',
    'Ethernet', 'Scheduler',
}

tree = ET.parse(SVG)
ns = '{http://www.w3.org/2000/svg}'

syms = set()
for tag in ('tspan', 'text'):
    for e in tree.getroot().iter(ns + tag):
        t = (e.text or '').strip()
        if t and re.match(r'^[a-z_][a-zA-Z0-9_]{2,}$', t) and t not in SKIP:
            syms.add(t)

print(f"Checking {len(syms)} symbols against {KERNEL}\n")

tag_syms = set()
with open(KERNEL + '/tags', errors='ignore') as f:
    for line in f:
        if not line.startswith('!'):
            tag_syms.add(line.split('\t', 1)[0])

missing = sorted(syms - tag_syms)


def grep_sym(s):
    r = subprocess.run(
        ['grep', '-rnw', '--include=*.c', '--include=*.h', s, KERNEL],
        capture_output=True, text=True, timeout=30
    )
    return r.stdout.strip().splitlines() if r.returncode == 0 else []


def classify_hit(sym, lines):
    code = []
    for line in lines:
        t = line.split(':', 2)[-1].strip() if ':' in line else line.strip()
        if t.startswith('//') or t.startswith('/*') or t.startswith('*'):
            continue
        code.append(line)
    if not code:
        return 'comment-only', lines
    core = [x for x in code
            if not x.startswith(KERNEL + '/tools/')
            and not x.startswith(KERNEL + '/Documentation/')]
    if not core:
        return 'tools-only', code
    return 'code', core


obsolete, comment_only, tools_only, found = [], [], [], []

for s in missing:
    lines = grep_sym(s)
    if not lines:
        obsolete.append(s)
        continue
    kind, hits = classify_hit(s, lines)
    if kind == 'comment-only':
        comment_only.append((s, hits))
    elif kind == 'tools-only':
        tools_only.append((s, hits))
    else:
        found.append((s, hits))

print(f"Total symbols checked: {len(syms)}")
print(f"Found in tags: {len(syms) - len(missing)}\n")

for label, items in [
    (f"Obsolete - not found anywhere: {len(obsolete)}", [(s, []) for s in obsolete]),
    (f"Comment-only - no code definition: {len(comment_only)}", comment_only),
    (f"Tools/tests only - not in kernel proper: {len(tools_only)}", tools_only),
    (f"Still in source but not in tags: {len(found)}", found),
]:
    print(label)
    for s, hits in items:
        print(f"  {s}")
        for h in hits[:2]:
            print(f"    {h.replace(KERNEL + '/', '')}")
    print()
