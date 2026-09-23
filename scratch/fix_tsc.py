import re

# Fix page.tsx
with open(r'd:\Development\DKM\src\app\page.tsx', 'r', encoding='utf-8') as f:
    page = f.read()

# Remove setIsMobileView references in MaslamApp call
page = re.sub(r'\s*onSwitchToDesktop=\{.*?\}', '', page)
# Ensure User is in imports
if ' User,' not in page and '\n  User,' not in page:
    page = page.replace('import {', 'import { User,', 1)

with open(r'd:\Development\DKM\src\app\page.tsx', 'w', encoding='utf-8') as f:
    f.write(page)


# Fix MaslamAkun.tsx
with open(r'd:\Development\DKM\src\components\maslam\MaslamAkun.tsx', 'r', encoding='utf-8') as f:
    akun = f.read()

# Change User import from lucide-react to UserIcon
akun = akun.replace('User,', 'User as UserIcon,')
akun = akun.replace('import {', 'import { User } from \'@/types/dkm\';\nimport {', 1)

with open(r'd:\Development\DKM\src\components\maslam\MaslamAkun.tsx', 'w', encoding='utf-8') as f:
    f.write(akun)


# Fix MaslamApp.tsx
with open(r'd:\Development\DKM\src\components\maslam\MaslamApp.tsx', 'r', encoding='utf-8') as f:
    app = f.read()

if 'loggedInUser?: User | null;' not in app:
    app = app.replace('export interface MaslamAppProps {', 'export interface MaslamAppProps {\n  loggedInUser?: User | null;\n  onLogout?: () => void;')

if 'loggedInUser,' not in app.split('export const MaslamApp')[1][:150]:
    app = app.replace('export const MaslamApp: React.FC<MaslamAppProps> = ({', 'export const MaslamApp: React.FC<MaslamAppProps> = ({\n  loggedInUser,\n  onLogout,')

# Remove onSwitchToDesktop from MaslamAkun call since it doesn't exist anymore
app = re.sub(r'\s*onSwitchToDesktop=\{.*?\}', '', app)

with open(r'd:\Development\DKM\src\components\maslam\MaslamApp.tsx', 'w', encoding='utf-8') as f:
    f.write(app)

print('Fixed compilation issues')
