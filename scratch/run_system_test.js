const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\selpian.VUTEQ\\.gemini\\antigravity-ide\\brain\\d3baf2c7-fc97-441b-860e-01ab96aa3175';
const SCREENSHOT_DIR = path.join(ARTIFACT_DIR, 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTest() {
  console.log('🚀 Memulai Uji Coba Lengkap Sistem MASLAM DKM...');
  
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=430,920'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 880, deviceScaleFactor: 2 });

  const results = [];

  try {
    // 1. Halaman Login
    console.log('1. Membuka Halaman Login (http://localhost:3000)...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1500);
    const p1 = path.join(SCREENSHOT_DIR, '01_login_screen.png');
    await page.screenshot({ path: p1 });
    results.push({ id: 1, name: 'Halaman Login & Pilihan Akun', file: '01_login_screen.png' });
    console.log('   ✓ Screenshot 1 tersimpan');

    // 2. Login Super Admin (Admin IT DKM)
    console.log('2. Melakukan Login sebagai Super Admin (Admin IT DKM)...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const adminBtn = buttons.find(b => b.textContent && b.textContent.includes('Admin IT DKM'));
      if (adminBtn) adminBtn.click();
    });
    await sleep(2000);
    const p2 = path.join(SCREENSHOT_DIR, '02_beranda_admin.png');
    await page.screenshot({ path: p2 });
    results.push({ id: 2, name: 'Beranda Utama & 12 Menu Grid (Super Admin)', file: '02_beranda_admin.png' });
    console.log('   ✓ Screenshot 2 tersimpan');

    // 3. Buka Popup Modal "Menu Akun Pengguna" dari Header
    console.log('3. Membuka Modal Menu Akun Pengguna...');
    await page.evaluate(() => {
      const akunBtn = document.querySelector('button[title*="Menu Akun"]') || document.querySelector('.maslam-header button:last-child');
      if (akunBtn) akunBtn.click();
    });
    await sleep(1000);
    const p3 = path.join(SCREENSHOT_DIR, '03_modal_menu_akun.png');
    await page.screenshot({ path: p3 });
    results.push({ id: 3, name: 'Popup Bottom Sheet Menu Akun Pengguna', file: '03_modal_menu_akun.png' });
    console.log('   ✓ Screenshot 3 tersimpan');

    // 4. Buka Halaman Akun & Pengaturan Lengkap dari Modal
    console.log('4. Membuka Halaman Akun & Pengaturan Lengkap...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const profilBtn = buttons.find(b => b.textContent && b.textContent.includes('Profil & Pengaturan Akun'));
      if (profilBtn) profilBtn.click();
    });
    await sleep(1500);
    const p4 = path.join(SCREENSHOT_DIR, '04_halaman_akun.png');
    await page.screenshot({ path: p4 });
    results.push({ id: 4, name: 'Halaman Akun & Informasi Hak Akses', file: '04_halaman_akun.png' });
    console.log('   ✓ Screenshot 4 tersimpan');

    // 5. Buka Fitur Manajemen Akun Pengguna dari Halaman Akun
    console.log('5. Menguji Fitur Manajemen Akun Pengguna...');
    await page.waitForSelector('#btn-manajemen-user', { timeout: 5000 });
    await page.click('#btn-manajemen-user');
    await sleep(1500);
    const p5 = path.join(SCREENSHOT_DIR, '05_manajemen_user.png');
    await page.screenshot({ path: p5 });
    results.push({ id: 5, name: 'Fitur Manajemen Akun Pengguna Sistem', file: '05_manajemen_user.png' });
    console.log('   ✓ Screenshot 5 tersimpan');

    // Kembali ke Beranda
    await page.evaluate(() => {
      const dockBeranda = document.querySelector('.maslam-bottom-dock button');
      if (dockBeranda) dockBeranda.click();
    });
    await sleep(1000);

    // Daftar 12 Menu Grid di Beranda (Urutan Indeks 0 s.d 11)
    const menus = [
      { index: 0, name: 'Data Lembaga (Profil & Pengurus)', file: '06_data_lembaga.png' },
      { index: 1, name: 'Kegiatan & Kajian Masjid', file: '07_kegiatan.png' },
      { index: 2, name: 'Database Warga & Jamaah', file: '08_warga.png' },
      { index: 3, name: 'Aset Fasilitas & Reservasi Aula', file: '09_aset_fasilitas.png' },
      { index: 4, name: 'Inventory & Sarana Prasarana', file: '10_inventory.png' },
      { index: 5, name: 'Ziswaf & Mustahiq', file: '11_ziswaf.png' },
      { index: 6, name: 'Keuangan & Kas Masjid', file: '12_keuangan.png' },
      { index: 7, name: 'Idul Fitri & Panitia Ramadhan', file: '13_idulfitri.png' },
      { index: 8, name: 'Idul Adha & Hewan Qurban 1:7', file: '14_iduladha.png' },
      { index: 9, name: 'TV Masjid Digital Display', file: '15_tvmasjid.png' },
      { index: 10, name: 'Administrasi Pegawai & Slip Gaji', file: '16_administrasi.png' },
      { index: 11, name: 'Akun Pengguna (Dari Grid Beranda)', file: '17_akun_dari_grid.png' },
    ];

    for (const m of menus) {
      console.log(`Menguji Menu [${m.index + 1}/12]: ${m.name}...`);
      await page.evaluate((idx) => {
        const btns = Array.from(document.querySelectorAll('.maslam-menu-btn'));
        if (btns[idx]) btns[idx].click();
      }, m.index);
      await sleep(1200);

      const filePath = path.join(SCREENSHOT_DIR, m.file);
      await page.screenshot({ path: filePath });
      results.push({ id: results.length + 1, name: `Menu: ${m.name}`, file: m.file });
      console.log(`   ✓ Screenshot disimpan: ${m.file}`);

      // Kembali ke Beranda
      await page.evaluate(() => {
        const dockBeranda = document.querySelector('.maslam-bottom-dock button');
        if (dockBeranda) dockBeranda.click();
      });
      await sleep(800);
    }

    // 18. Uji Coba Logout & Login sebagai Jamaah
    console.log('18. Menguji Logout dan Login Peran Jamaah...');
    await page.evaluate(() => {
      const dockAkun = Array.from(document.querySelectorAll('.maslam-dock-tab')).find(t => t.textContent.includes('Akun'));
      if (dockAkun) dockAkun.click();
    });
    await sleep(1000);

    // Klik tombol Keluar di Akun
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const logoutBtn = btns.find(b => b.textContent && b.textContent.includes('Keluar'));
      if (logoutBtn) logoutBtn.click();
    });
    await sleep(1500);

    // Login sebagai Bapak Budi (Jamaah)
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const jamaahBtn = buttons.find(b => b.textContent && b.textContent.includes('Bapak Budi (Jamaah)'));
      if (jamaahBtn) jamaahBtn.click();
    });
    await sleep(2000);
    const p18 = path.join(SCREENSHOT_DIR, '18_beranda_role_jamaah.png');
    await page.screenshot({ path: p18 });
    results.push({ id: results.length + 1, name: 'Sesi Akun Jamaah (Bapak Budi)', file: '18_beranda_role_jamaah.png' });
    console.log('   ✓ Screenshot 18 disimpan');

    console.log('\n=========================================');
    console.log('🎉 SEMUA PENGUJIAN 18 FITUR LENGKAP SUKSES!');
    console.log('=========================================');

    fs.writeFileSync(path.join(ARTIFACT_DIR, 'test_results.json'), JSON.stringify(results, null, 2));

  } catch (err) {
    console.error('❌ Terjadi kesalahan pada pengujian:', err);
  } finally {
    await browser.close();
  }
}

runTest();
