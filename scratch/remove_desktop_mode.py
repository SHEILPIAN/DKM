import re

with open(r'd:\Development\DKM\src\app\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the conditional render at line 737ish:
# from `return ( <div className="app-container"> {isMobileView ? ( <MaslamApp... /> ) : ( <> ... </> )} </div> );`
# to `return ( <div className="app-container mobile-mode"> {!loggedInUser ? ( <LoginScreen onLogin={setLoggedInUser} /> ) : ( <MaslamApp... loggedInUser={loggedInUser} onLogout={() => setLoggedInUser(null)} /> )} ... modals </div> );`

# Since this is a big regex replace, let's just find the `return (` part and replace everything after it.
start_index = content.find('  return (')

if start_index == -1:
    print('Could not find return statement')
    exit(1)

maslam_app_start = content.find('<MaslamApp')
maslam_app_end = content.find('/>', maslam_app_start) + 2

maslam_app_str = content[maslam_app_start:maslam_app_end]

# Inject loggedInUser and onLogout props into MaslamApp
new_maslam_app = maslam_app_str.replace(
    '        <MaslamApp',
    '        <MaslamApp\n          loggedInUser={loggedInUser}\n          onLogout={() => setLoggedInUser(null)}'
)

# Extract modals
modals_start = content.find('{/* MODAL 1: Kasir Infaq Masuk / Keluar */}')
modals_end = content.rfind('</div>')

modals_str = content[modals_start:modals_end]

new_return = f'''  return (
    <div className="app-container mobile-mode">
      {{!loggedInUser ? (
        <LoginScreen onLogin={{setLoggedInUser}} />
      ) : (
{new_maslam_app}
      )}}

      {modals_str}
    </div>
  );
}}
'''

new_content = content[:start_index] + new_return

with open(r'd:\Development\DKM\src\app\page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Updated render function in page.tsx')
