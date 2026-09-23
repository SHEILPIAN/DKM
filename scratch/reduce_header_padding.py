import os, glob, re

for f in glob.glob(r'd:\Development\DKM\src\components\maslam\*.tsx'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace padding values in headers
    # Example: padding: '16px 18px 20px' or padding: '16px 18px 22px'
    # Wait, the inline styles in some files might have single quotes, so let's use a regex.
    new_content = re.sub(r"padding:\s*'(16px 18px \d+px)'", r"padding: '10px 14px 12px'", content)
    
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f'Updated {os.path.basename(f)}')
