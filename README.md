# Sistem Manajemen Terpadu DKM (Dewan Kemakmuran Masjid)

Aplikasi Web Fullstack Manajemen DKM modern yang dirancang khusus untuk transparansi keuangan kasir infaq, peminjaman fasilitas anti-bentrok jadwal, tata kelola ZISWAF & kepanitiaan Qurban patungan sapi 1:7, serta absensi & penggajian (Kafalah) petugas masjid.

---

## 🕌 4 Modul Utama

### 1. Modul Analitik Keuangan (Financial Analytics)
- **Top Summary Cards**: Total Saldo Kas Saat Ini, Total Pemasukan Bulan Ini (dengan indikator persentase tren vs bulan lalu), dan Total Pengeluaran Bulan Ini.
- **Visualisasi Recharts**:
  - **Area/Line Chart Arus Kas**: Perbandingan Infaq Masuk (IN) vs Pengeluaran (OUT) mingguan.
  - **Donut/Pie Chart Alokasi Kas**: Pembagian sebaran kas per pos anggaran (Operasional, Dakwah, Pembangunan, Sosial).
- **Kasir Infaq & Transaksi Baru**:
  - Pilihan Pos Kas tujuan, nominal cepat (Rp 50rb, 100rb, 250rb, 500rb, 1jt, custom), upload bukti transfer/nota.
  - **Micro-Interaction Animasi**: Pop-up centang hijau membesar (*bounce spring*) dengan Framer Motion & efek konfeti saat infaq berhasil dicatat.
- **Buku Besar (General Ledger)**: Tabel mutasi kas lengkap dengan pencarian, filter kategori, filter tipe IN/OUT, dan transisi *fade-in*.

### 2. Modul Reservasi Fasilitas (Facility Booking)
- **Kalender Ketersediaan Publik**:
  - Tampilan visual status tanggal (Hijau = Tersedia, Merah = Terisi / APPROVED, Kuning = Sedang Direview / PENDING).
  - Pilihan fasilitas: Aula Utama Serbaguna (Lantai 2), Ruang Rapat & Majelis Taklim, Tenda & Kursi Inventaris.
- **Pencegahan Bentrok (Double Booking Prevention)**:
  - Tombol pengajuan otomatis dinonaktifkan (*disabled*) jika tanggal tersebut sudah berstatus APPROVED.
- **Panel Otorisasi Admin**:
  - Daftar antrean permohonan reservasi dengan tombol **APPROVE** dan **REJECT**.
  - Kolom catatan syarat DKM (misal: *"Wajib bayar infaq kebersihan di muka Rp 200.000"*).
  - Saat di-Approve, kalender otomatis mengunci tanggal tersebut dan memunculkan simulasi notifikasi konfirmasi WhatsApp.

### 3. Modul ZISWAF & Kepanitiaan Qurban
- **Penerimaan Zakat & Fidyah**:
  - Input Muzakki, pilihan jenis zakat (Fitrah Uang, Fitrah Beras, Zakat Maal, Fidyah Puasa), jumlah tanggungan jiwa.
  - **Struk / Kupon Digital Modal**: Cetak kupon digital resmi dengan nomor verifikasi dan tombol bagikan langsung ke WhatsApp.
- **Database Mustahiq (8 Asnaf)**:
  - Klasifikasi Fakir, Miskin, Amil, Mualaf, Gharim, Fisabilillah, Ibnu Sabil.
  - Status validasi RT/RW setempat.
  - Penyaluran zakat real-time yang langsung memotong sisa stok beras zakat.
- **Manajemen Qurban Patungan Sapi (1:7)**:
  - Visualisasi slot per sapi (7 slot per hewan).
  - Pendaftaran Shohibul Qurban (Pekurban) dengan status pembayaran lunas.
  - **Auto-Split Group**: Ketika sapi terisi 7/7 pekurban, sistem otomatis mengunci kelompok tersebut dan membuka grup sapi baru.

### 4. Modul HR & Kafalah Petugas Masjid
- **Perekaman Kehadiran Shalat**:
  - Check-in tugas harian Imam, Muadzin, dan Marbot per waktu shalat (Subuh, Dzuhur, Ashar, Maghrib, Isya, Jumat).
  - Status: Hadir, Izin, Sakit, Alpa.
- **Kalkulasi Kafalah Otomatis**:
  - Gaji Pokok + Tunjangan Kehadiran Shalat - Potongan Ketidakhadiran (Alpa).
- **Pencairan & Integrasi Otomatis Kas**:
  - Setiap tanggal 1, sistem menghasilkan Slip Gaji Digital berstatus Pending.
  - Saat Bendahara klik **APPROVE & CAIRKAN**, sistem otomatis menambahkan transaksi pengeluaran (OUT) di Kas Operasional dan memotong saldo kas secara real-time!

### 5. Mode Tampilan Dual (Desktop Admin & Mobile Jamaah)
- **Admin Portal**: Layout desktop lengkap dengan navigasi sidebar.
- **Jamaah View**: Simulator aplikasi smartphone untuk jamaah publik yang menampilkan:
  - Tombol Besar Donasi QRIS Cepat.
  - Carousel Saldo Kas Masjid (kartu bisa digeser).
  - Jadwal Shalat Hari ini dengan penunjuk waktu shalat berikutnya.
  - Akses cepat reservasi aula dan pembayaran zakat.

---

## 🛠️ Perintah Database & Prisma

File skema Prisma terletak pada `prisma/schema.prisma` dan telah dikonfigurasi untuk PostgreSQL.

### 1. Format Skema Prisma
```bash
npx prisma format
```

### 2. Push Skema ke Database PostgreSQL
Pastikan `DATABASE_URL` pada `.env` telah diarahkan ke database PostgreSQL Anda:
```bash
npx prisma db push
```

### 3. Jalankan Migrasi
```bash
npx prisma migrate dev --name init_dkm_system
```

### 4. Generate Prisma Client
```bash
npx prisma generate
```

---

## 🚀 Menjalankan Aplikasi Secara Lokal

1. **Jalankan Server Development**:
   ```bash
   npm run dev
   ```
2. Buka browser pada alamat:
   ```
   http://localhost:3000
   ```
3. **Build untuk Produksi**:
   ```bash
   npm run build
   npm run start
   ```
