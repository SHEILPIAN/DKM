import os, glob, re
for f in glob.glob(r'd:\Development\DKM\src\components\maslam\*.tsx'):
    with open(f, 'r', encoding='utf-8') as file: content = file.read()
    new_content = re.sub(r"paddingBottom:\s*85,\s*", "", content)
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file: file.write(new_content)
        print(f'Updated {os.path.basename(f)}')
