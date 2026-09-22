'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { AnalyticsCards } from '@/components/modules/financial/AnalyticsCards';
import { CashFlowChart } from '@/components/modules/financial/CashFlowChart';
import { AllocationChart } from '@/components/modules/financial/AllocationChart';
import { CashierModal } from '@/components/modules/financial/CashierModal';
import { GeneralLedger } from '@/components/modules/financial/GeneralLedger';
import { FacilityCalendar } from '@/components/modules/booking/FacilityCalendar';
import { BookingFormModal } from '@/components/modules/booking/BookingFormModal';
import { BookingAdminQueue } from '@/components/modules/booking/BookingAdminQueue';
import { ZakatInputModal } from '@/components/modules/ziswaf/ZakatInputModal';
import { MustahiqTable } from '@/components/modules/ziswaf/MustahiqTable';
import { QurbanManager } from '@/components/modules/ziswaf/QurbanManager';
import { EmployeeList } from '@/components/modules/hr/EmployeeList';
import { PrayerAttendance } from '@/components/modules/hr/PrayerAttendance';
import { SalarySlipModal } from '@/components/modules/hr/SalarySlipModal';
import { JamaahMobileView } from '@/components/modules/jamaah/JamaahMobileView';
import { AndroidAppModal } from '@/components/layout/AndroidAppModal';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { MaslamApp } from '@/components/maslam/MaslamApp';

import {
  INITIAL_KATEGORI_KAS,
  INITIAL_TRANSAKSI,
  INITIAL_FASILITAS,
  INITIAL_RESERVASI,
  INITIAL_MUSTAHIQ,
  INITIAL_HEWAN_QURBAN,
  INITIAL_PEGAWAI,
  INITIAL_ABSENSI,
  INITIAL_SLIP_GAJI,
  INITIAL_WARGA,
} from '@/lib/mockData';

import {
  KategoriKas,
  Transaksi,
  Fasilitas,
  Reservasi,
  Mustahiq,
  HewanQurban,
  ShohibulQurban,
  Pegawai,
  Absensi,
  SlipGaji,
  ZakatFitrahTrx,
  Warga,
} from '@/types/dkm';

export default function DkmApp() {
  // Global State: Default to mobile HP Maslam view as requested
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileView, setIsMobileView] = useState<boolean>(true);

  // Data States
  const [kategoriKas, setKategoriKas] = useState<KategoriKas[]>(INITIAL_KATEGORI_KAS);
  const [transaksi, setTransaksi] = useState<Transaksi[]>(INITIAL_TRANSAKSI);
  const [fasilitas, setFasilitas] = useState<Fasilitas[]>(INITIAL_FASILITAS);
  const [reservasi, setReservasi] = useState<Reservasi[]>(INITIAL_RESERVASI);
  const [mustahiq, setMustahiq] = useState<Mustahiq[]>(INITIAL_MUSTAHIQ);
  const [hewanQurban, setHewanQurban] = useState<HewanQurban[]>(INITIAL_HEWAN_QURBAN);
  const [pegawai, setPegawai] = useState<Pegawai[]>(INITIAL_PEGAWAI);
  const [absensi, setAbsensi] = useState<Absensi[]>(INITIAL_ABSENSI);
  const [slipGaji, setSlipGaji] = useState<SlipGaji[]>(INITIAL_SLIP_GAJI);
  const [warga, setWarga] = useState<Warga[]>(INITIAL_WARGA);

  // ZISWAF Stocks
  const [stokBerasKg, setStokBerasKg] = useState<number>(450.0);
  const [danaZakatRp, setDanaZakatRp] = useState<number>(35000000);

  // Modals
  const [isCashierOpen, setIsCashierOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedBookingDate, setSelectedBookingDate] = useState<string>('');
  const [selectedBookingFacilityId, setSelectedBookingFacilityId] = useState<number>(1);
  const [isZakatModalOpen, setIsZakatModalOpen] = useState<boolean>(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState<boolean>(false);

  // -------------------------------------------------------------
  // Modul 1 Handlers: Kasir & Mutasi Saldo
  // -------------------------------------------------------------
  const handleAddTransaction = (newTrx: Omit<Transaksi, 'id'>) => {
    const createdTrx: Transaksi = {
      ...newTrx,
      id: Date.now(),
    };

    // Update daftar transaksi
    setTransaksi((prev) => [createdTrx, ...prev]);

    // Update Saldo Kategori Kas secara Real-Time
    setKategoriKas((prev) =>
      prev.map((k) => {
        if (k.id === createdTrx.kategoriId) {
          const delta = createdTrx.tipe === 'IN' ? createdTrx.nominal : -createdTrx.nominal;
          return { ...k, saldo: Math.max(0, k.saldo + delta) };
        }
        return k;
      })
    );
  };

  // -------------------------------------------------------------
  // Modul 2 Handlers: Reservasi Fasilitas & Otorisasi Admin
  // -------------------------------------------------------------
  const handleOpenBookingForDate = (dateStr: string, facilityId: number) => {
    setSelectedBookingDate(dateStr);
    setSelectedBookingFacilityId(facilityId);
    setIsBookingModalOpen(true);
  };

  const handleAddBooking = (newRes: Omit<Reservasi, 'id' | 'createdAt'>) => {
    const createdRes: Reservasi = {
      ...newRes,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setReservasi((prev) => [createdRes, ...prev]);
    alert('Alhamdulillah, permohonan reservasi Anda telah diajukan (Status: PENDING) dan menunggu verifikasi Sekretariat DKM.');
  };

  const handleApproveBooking = (id: number, catatan: string) => {
    setReservasi((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: 'APPROVED', catatanAdmin: catatan }
          : r
      )
    );
  };

  const handleRejectBooking = (id: number, catatan: string) => {
    setReservasi((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: 'REJECTED', catatanAdmin: catatan }
          : r
      )
    );
  };

  // -------------------------------------------------------------
  // Modul 3 Handlers: ZISWAF & Qurban Sapi 1:7
  // -------------------------------------------------------------
  const handleAddZakat = (zakatTrx: ZakatFitrahTrx) => {
    if (zakatTrx.nominalRp) {
      setDanaZakatRp((prev) => prev + (zakatTrx.nominalRp || 0));
      // Tambahkan juga ke Kas ZISWAF & Sosial di Keuangan
      handleAddTransaction({
        tipe: 'IN',
        nominal: zakatTrx.nominalRp,
        keterangan: `Penerimaan ${zakatTrx.jenisZakat} dari ${zakatTrx.namaMuzakki} (${zakatTrx.jumlahJiwa} Jiwa)`,
        tanggal: zakatTrx.tanggal,
        userId: 3,
        userNama: 'Amil DKM',
        kategoriId: 4, // Kas Sosial & Santunan Yatim
        kategoriNama: 'Kas Sosial & Santunan Yatim',
      });
    }
    if (zakatTrx.jumlahBerasKg) {
      setStokBerasKg((prev) => prev + (zakatTrx.jumlahBerasKg || 0));
    }
  };

  const handleToggleMustahiqDistribute = (id: number) => {
    setMustahiq((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const newStatus = m.statusDistribusi === 'SUDAH' ? 'BELUM' : 'SUDAH';
          // Jika status berubah menjadi SUDAH, potong stok beras 5 Kg real-time
          if (newStatus === 'SUDAH') {
            setStokBerasKg((curr) => Math.max(0, curr - 5.0));
          } else {
            setStokBerasKg((curr) => curr + 5.0);
          }
          return { ...m, statusDistribusi: newStatus };
        }
        return m;
      })
    );
  };

  const handleRegisterShohibul = (
    hewanId: number,
    shohibulData: Omit<ShohibulQurban, 'id' | 'hewanId' | 'tanggalDaftar'>
  ) => {
    setHewanQurban((prev) => {
      return prev.map((hewan) => {
        if (hewan.id === hewanId) {
          const newShohibul: ShohibulQurban = {
            ...shohibulData,
            id: Date.now(),
            hewanId,
            tanggalDaftar: new Date().toISOString().split('T')[0],
          };

          const updatedList = [...hewan.shohibul, newShohibul];

          // Auto-split group jika kuota 7/7 tercapai
          if (updatedList.length >= hewan.slotMaks && hewan.tipeHewan === 'SAPI') {
            setTimeout(() => {
              // Otomatis buat sapi baru
              const nextNumber = prev.filter((h) => h.tipeHewan === 'SAPI').length + 1;
              const newSapiNumber = nextNumber < 10 ? `0${nextNumber}` : `${nextNumber}`;
              const newSapi: HewanQurban = {
                id: Date.now() + 1,
                kodeHewan: `SAPI-${newSapiNumber} (Kelompok Baru)`,
                tipeHewan: 'SAPI',
                hargaBeli: 24500000,
                slotMaks: 7,
                shohibul: [],
              };
              setHewanQurban((hPrev) => [...hPrev, newSapi]);
              alert(`Subhanallah! Sapi ${hewan.kodeHewan} telah PENUH (7/7 slot). Sistem otomatis membuka kelompok ${newSapi.kodeHewan}.`);
            }, 500);
          }

          return { ...hewan, shohibul: updatedList };
        }
        return hewan;
      });
    });
  };

  // -------------------------------------------------------------
  // Modul 4 Handlers: HR & Kafalah Petugas
  // -------------------------------------------------------------
  const handleAddAbsensi = (absenData: Omit<Absensi, 'id'>) => {
    const created: Absensi = {
      ...absenData,
      id: Date.now(),
    };
    setAbsensi((prev) => [created, ...prev]);
    alert(`Kehadiran ${absenData.pegawaiNama} untuk Salat ${absenData.waktuSalat} (${absenData.status}) berhasil direkam.`);
  };

  const handleApproveAndPaySalary = (slipId: number) => {
    const slip = slipGaji.find((s) => s.id === slipId);
    if (!slip) return;

    // 1. Update status slip gaji menjadi PAID
    setSlipGaji((prev) =>
      prev.map((s) => (s.id === slipId ? { ...s, status: 'PAID' } : s))
    );

    // 2. Otomatis catat pengeluaran (OUT) di Kas Operasional
    handleAddTransaction({
      tipe: 'OUT',
      nominal: slip.nominal,
      keterangan: `Pencairan Kafalah / Gaji ${slip.pegawaiNama} (${slip.bulan})`,
      tanggal: new Date().toISOString(),
      userId: 2,
      userNama: 'Ustadz Ridwan, S.E (Bendahara)',
      kategoriId: 1, // Kas Operasional & Kebersihan
      kategoriNama: 'Kas Operasional & Kebersihan',
    });

    alert(
      `Alhamdulillah! Slip gaji ${slip.pegawaiNama} sebesar ${slip.nominal.toLocaleString('id-ID')} telah DISETUJUI & DIBAYARKAN. Transaksi pengeluaran otomatis tercatat di Kas Operasional.`
    );
  };

  // -------------------------------------------------------------
  // Modul 5 Handlers: Data Warga & Mustahik (Screenshot 3)
  // -------------------------------------------------------------
  const handleAddWarga = (newWarga: Omit<Warga, 'id' | 'tanggalDaftar'>) => {
    const created: Warga = {
      ...newWarga,
      id: Date.now(),
      tanggalDaftar: new Date().toISOString().split('T')[0],
    };
    setWarga((prev) => [created, ...prev]);
  };

  // Counters
  const pendingBookingsCount = reservasi.filter((r) => r.status === 'PENDING').length;
  const pendingSalaryCount = slipGaji.filter((s) => s.status === 'PENDING').length;

  return (
    <div className="app-container">
      {/* ======================================================= */}
      {/* MODE UTAMA HP (MASLAM DKM MOBILE APPLICATION)           */}
      {/* ======================================================= */}
      {isMobileView ? (
        <MaslamApp
          kategoriKas={kategoriKas}
          transaksi={transaksi}
          fasilitas={fasilitas}
          reservasi={reservasi}
          mustahiq={mustahiq}
          hewanQurban={hewanQurban}
          pegawai={pegawai}
          absensi={absensi}
          slipGaji={slipGaji}
          warga={warga}
          stokBerasKg={stokBerasKg}
          danaZakatRp={danaZakatRp}
          onOpenCashier={() => setIsCashierOpen(true)}
          onOpenBookingModal={handleOpenBookingForDate}
          onOpenZakatModal={() => setIsZakatModalOpen(true)}
          onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
          onSwitchToDesktop={() => setIsMobileView(false)}
          onToggleMustahiqDistribute={handleToggleMustahiqDistribute}
          onRegisterShohibul={handleRegisterShohibul}
          onAddAbsensi={handleAddAbsensi}
          onApproveSalary={handleApproveAndPaySalary}
          onAddWarga={handleAddWarga}
        />
      ) : (
        /* ===================================================== */
        /* MODE ADMIN PORTAL DESKTOP (PC / LAYAR LEBAR)          */
        /* ===================================================== */
        <>
          {/* Sidebar Navigation */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            pendingBookingsCount={pendingBookingsCount}
            pendingSalaryCount={pendingSalaryCount}
          />

          {/* Main Content Wrapper */}
          <div className="main-wrapper">
            <Header
              onOpenCashier={() => setIsCashierOpen(true)}
              isMobileView={isMobileView}
              setIsMobileView={setIsMobileView}
              onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
            />

            <main className="page-content">
              {/* TAB 1: DASHBOARD ANALITIK KEUANGAN */}
              {activeTab === 'dashboard' && (
                <div>
                  <div style={{ marginBottom: 20 }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      Dashboard Analitik Keuangan & Operasional
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Ringkasan transparansi kas masjid, grafik arus kas mingguan, dan sebaran anggaran
                    </p>
                  </div>

                  {/* Top 3 Cards + Trend Indicator */}
                  <AnalyticsCards kategoriKas={kategoriKas} transaksi={transaksi} />

                  {/* Charts Grid */}
                  <div className="charts-grid">
                    <CashFlowChart transaksi={transaksi} />
                    <AllocationChart kategoriKas={kategoriKas} />
                  </div>

                  {/* Recent Transactions in Dashboard */}
                  <GeneralLedger transaksi={transaksi.slice(0, 6)} kategoriKas={kategoriKas} />
                </div>
              )}

              {/* TAB 2: KASIR INFAQ & BUKU BESAR */}
              {activeTab === 'keuangan' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div>
                      <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        Kasir Infaq & Buku Kas Umum
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Input mutasi kas harian, cetak laporan, dan pencarian transaksi
                      </p>
                    </div>
                    <button onClick={() => setIsCashierOpen(true)} className="btn-gold">
                      + Buka Form Kasir Infaq
                    </button>
                  </div>

                  <AnalyticsCards kategoriKas={kategoriKas} transaksi={transaksi} />
                  <GeneralLedger transaksi={transaksi} kategoriKas={kategoriKas} />
                </div>
              )}

              {/* TAB 3: RESERVASI FASILITAS */}
              {activeTab === 'reservasi' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div>
                      <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        Manajemen Reservasi Fasilitas Anti-Bentrok
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Kalender ketersediaan aula & tenda, pengajuan jamaah, dan persetujuan otorisasi admin
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedBookingDate('2026-09-25');
                        setSelectedBookingFacilityId(1);
                        setIsBookingModalOpen(true);
                      }}
                      className="btn-primary"
                    >
                      + Buat Pengajuan Reservasi Baru
                    </button>
                  </div>

                  {/* Calendar View */}
                  <FacilityCalendar
                    fasilitas={fasilitas}
                    reservasi={reservasi}
                    onSelectDateToBook={handleOpenBookingForDate}
                  />

                  {/* Admin Approval Queue */}
                  <BookingAdminQueue
                    reservasi={reservasi}
                    onApprove={handleApproveBooking}
                    onReject={handleRejectBooking}
                  />
                </div>
              )}

              {/* TAB 4: ZISWAF & QURBAN */}
              {activeTab === 'ziswaf' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div>
                      <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        Pengelolaan ZISWAF & Kepanitiaan Qurban
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Penerimaan Zakat Fitrah/Maal, database 8 Asnaf tervalidasi RT/RW, dan slot patungan sapi 1:7
                      </p>
                    </div>
                    <button onClick={() => setIsZakatModalOpen(true)} className="btn-primary">
                      + Input Zakat Muzakki & Cetak Kupon
                    </button>
                  </div>

                  {/* Mustahiq Distribution */}
                  <MustahiqTable
                    mustahiq={mustahiq}
                    onToggleDistribute={handleToggleMustahiqDistribute}
                    stokBerasTersediaKg={stokBerasKg}
                    danaZakatTersediaRp={danaZakatRp}
                  />

                  {/* Qurban Joint Cow Management */}
                  <QurbanManager
                    hewanQurban={hewanQurban}
                    onRegisterShohibul={handleRegisterShohibul}
                  />
                </div>
              )}

              {/* TAB 5: HR & KAFALAH PETUGAS */}
              {activeTab === 'hr' && (
                <div>
                  <div style={{ marginBottom: 10 }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      HR Petugas Masjid & Penggajian (Kafalah)
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Perekaman kehadiran shalat fardhu imam/muadzin, perhitungan honor otomatis, dan slip gaji digital
                    </p>
                  </div>

                  {/* Check-In Kehadiran Shalat */}
                  <PrayerAttendance
                    pegawai={pegawai}
                    absensi={absensi}
                    onAddAbsensi={handleAddAbsensi}
                  />

                  {/* Master Pegawai */}
                  <EmployeeList pegawai={pegawai} />

                  {/* Slip Gaji Digital & Auto-Deduct */}
                  <SalarySlipModal
                    slipGajiList={slipGaji}
                    onApproveAndPay={handleApproveAndPaySalary}
                  />
                </div>
              )}
            </main>
          </div>

          {/* MOBILE BOTTOM NAVIGATION BAR (Hanya di mode desktop simulator) */}
          <MobileBottomNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobileView={isMobileView}
            setIsMobileView={setIsMobileView}
            pendingBookingsCount={pendingBookingsCount}
            pendingSalaryCount={pendingSalaryCount}
          />
        </>
      )}

      {/* MODAL 1: Kasir Infaq Masuk / Keluar */}
      <CashierModal
        isOpen={isCashierOpen}
        onClose={() => setIsCashierOpen(false)}
        kategoriKas={kategoriKas}
        onAddTransaction={handleAddTransaction}
      />

      {/* MODAL 2: Form Reservasi Fasilitas */}
      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        fasilitas={fasilitas}
        reservasi={reservasi}
        initialDate={selectedBookingDate}
        initialFacilityId={selectedBookingFacilityId}
        onSubmitBooking={handleAddBooking}
      />

      {/* MODAL 3: Penerimaan Zakat & Struk Digital */}
      <ZakatInputModal
        isOpen={isZakatModalOpen}
        onClose={() => setIsZakatModalOpen(false)}
        onAddZakat={handleAddZakat}
      />

      {/* MODAL 4: Installer Aplikasi Android */}
      <AndroidAppModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
      />
    </div>
  );
}
