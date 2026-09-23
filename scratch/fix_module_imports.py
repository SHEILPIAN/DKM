import os
import re

modules_dir = r'd:\Development\DKM\src\components\modules'

for root, dirs, files in os.walk(modules_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if 'AnalyticsCards' in content and 'formatRupiah' in content:
                new_content = re.sub(r'import\s*{\s*formatRupiah\s*}\s*from\s*[\'\"].*?AnalyticsCards[\'\"];', 'import { formatRupiah } from \'@/lib/utils\';', content)
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f'Fixed import in {path}')

print('Done fixing formatRupiah imports in modules')
