import os
import glob
import re

directory = r'd:\Development\DKM\src\components\maslam'
files = glob.glob(os.path.join(directory, '*.tsx'))

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = re.sub(
        r"(padding:\s*'16px 18px[^']*',)",
        r"position: 'sticky', top: 0, zIndex: 30, \g<1>",
        content
    )
    
    # MaslamWarga has explicit relative
    new_content = new_content.replace(
        "position: 'relative',",
        ""
    )
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {os.path.basename(filepath)}')
