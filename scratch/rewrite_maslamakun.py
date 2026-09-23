import re

with open(r'd:\Development\DKM\src\components\maslam\MaslamAkun.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace interface and props
content = content.replace('interface MaslamAkunProps {', 'interface MaslamAkunProps {\n  loggedInUser?: User | null;\n  onLogout?: () => void;')
content = content.replace('export const MaslamAkun: React.FC<MaslamAkunProps> = ({', 'export const MaslamAkun: React.FC<MaslamAkunProps> = ({\n  loggedInUser,\n  onLogout,')

# Remove local currentUser state
content = re.sub(r'  const \[currentUser, setCurrentUser\].*;\n', '', content)

# Header top row: add Logout button to top right
header_top = '''        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <button
            type="button"
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: 0,
              gap: 6,
              fontSize: '1rem',
              fontWeight: 700,
            }}
          >
            <ChevronLeft size={22} />
            <span>Akun & Pengaturan</span>
          </button>
          
          <button
            onClick={onLogout}
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              color: '#fca5a5',
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Keluar
          </button>
        </div>'''

content = re.sub(r'<div style={{ display: \'flex\', alignItems: \'center\', marginBottom: 14 }}>.*?</div>', header_top, content, flags=re.DOTALL)

# Profile info: replace hardcoded name and role with loggedInUser
profile_info = '''<div>
            <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>
              {loggedInUser?.nama || 'Pengguna'}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: 2 }}>
              {loggedInUser?.email || 'email@domain.com'}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              <span
                style={{
                  background: '#f59e0b',
                  color: '#1e293b',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  padding: '1px 7px',
                  borderRadius: 999,
                }}
              >
                {loggedInUser?.role || 'JAMAAH'}
              </span>
            </div>
          </div>'''

content = re.sub(r'<div>\s*<div style={{ fontSize: \'1\.1rem\', fontWeight: 900 }}>.*?</div>\s*</div>\s*</div>', profile_info + '\n        </div>', content, flags=re.DOTALL)

# Remove Switch Role Quick Bar and PC mode section
content = re.sub(r'\{/\* Switch Role Quick Bar \*/\}.*?\{/\* Android Smartphone Features \*/\}', '{/* Android Smartphone Features */}', content, flags=re.DOTALL)
content = re.sub(r'\{/\* Switch to Desktop Admin View \*/\}.*?\{/\* Pengaturan \*/\}', '{/* Pengaturan */}', content, flags=re.DOTALL)

with open(r'd:\Development\DKM\src\components\maslam\MaslamAkun.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated MaslamAkun.tsx')
