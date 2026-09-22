import os
import glob
import re

directory = r'd:\Development\DKM\src\components\maslam'
files = glob.glob(os.path.join(directory, '*.tsx'))

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to find the top header style blocks which look like:
    # background: 'linear-gradient(...)',
    # color: 'white',
    # padding: '16px 18px ...',
    # (optional position/overflow here)
    
    # We will use regex to find this pattern and add sticky properties.
    # Pattern: background: 'linear-gradient[^}]*padding: '16px 18px[^}]*
    
    def replacer(match):
        block = match.group(0)
        # If it already has position: relative, replace it with sticky
        if "position: 'relative'" in block:
            block = block.replace("position: 'relative'", "position: 'sticky', top: 0, zIndex: 30")
        else:
            # Add it after padding
            block = re.sub(r"(padding:\s*'[^']+',)", r"\1 position: 'sticky', top: 0, zIndex: 30,", block)
        return block
    
    new_content = re.sub(
        r"background:\s*'linear-gradient[^}]*padding:\s*'16px 18px[^}]+",
        replacer,
        content
    )
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {os.path.basename(filepath)}')
