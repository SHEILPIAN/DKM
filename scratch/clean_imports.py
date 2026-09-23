import re

with open(r'd:\Development\DKM\src\app\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove imports for deleted components
deleted_components = [
    'Sidebar', 'Header', 'MobileBottomNav', 'AnalyticsCards', 'CashFlowChart',
    'AllocationChart', 'GeneralLedger', 'FacilityCalendar', 'BookingAdminQueue',
    'PrayerAttendance', 'EmployeeList', 'SalarySlipModal'
]

for comp in deleted_components:
    content = re.sub(rf'import\s+{{\s*{comp}\s*}}\s+from\s+[\'\"].*?[\'\"];\n', '', content)
    content = re.sub(rf'import\s+{comp}\s+from\s+[\'\"].*?[\'\"];\n', '', content)

with open(r'd:\Development\DKM\src\app\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Cleaned up imports in page.tsx')
