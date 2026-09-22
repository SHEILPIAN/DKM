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
  INITIAL_PROFIL_LEMBAGA,
  INITIAL_PENGURUS_LEMBAGA,
  INITIAL_REKENING_LEMBAGA,
  INITIAL_KEGIATAN,
  INITIAL_INVENTORY,
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
  ProfilLembaga,
  PengurusLembaga,
  RekeningLembaga,
  Kegiatan,
  InventoryItem,
  IdulFitriAgenda,
  IdulFitriPanitia,
  TvRunningText,
  TvPengumuman,
  TvSetting,
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
  const [profilLembaga, setProfilLembaga] = useState<ProfilLembaga>(INITIAL_PROFIL_LEMBAGA);
  const [pengurusLembaga, setPengurusLembaga] = useState<PengurusLembaga[]>(INITIAL_PENGURUS_LEMBAGA);
  const [rekeningLembaga, setRekeningLembaga] = useState<RekeningLembaga[]>(INITIAL_REKENING_LEMBAGA);
  const [kegiatanList, setKegiatanList] = useState<Kegiatan[]>(INITIAL_KEGIATAN);
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>(INITIAL_INVENTORY);

  // Idul Fitri States
  const [idulFitriAgendas, setIdulFitriAgendas] = useState<IdulFitriAgenda[]>([
    {
      id: 1,
      namaAcara: 'Shalat Idul Fitri 1447 H Berjamaah',
      tanggalWaktu: '1 Syawal 1447 H • Pukul 06.45 WIB',
      lokasi: 'Halaman Parkir & Ruang Utama AL-Muhajirin',
      imamKhatib: 'Imam: Ustadz M. Syakir, Lc. | Khatib: Dr. H. Faisal Akbar, M.A.',
      deskripsi: 'Jamaah diimbau membawa sajadah masing-masing dan berwudhu dari rumah.',
    },
    {
      id: 2,
      namaAcara: 'Gema Takbir Keliling & Syiar Remaja Masjid',
      tanggalWaktu: 'Malam 1 Syawal • Pukul 20.00 WIB',
      lokasi: 'Rute Wilayah RW 06 s.d RW 08 Kayuringin Jaya',
      imamKhatib: 'Koordinator: Ust. Danang (RISMA)',
      deskripsi: 'Diikuti santriwan-santriwati TPA AL-Muhajirin dan warga sekitar.',
    },
    {
      id: 3,
      namaAcara: 'Halal Bihalal & Silaturahim Akbar Jamaah',
      tanggalWaktu: '2 Syawal 1447 H • Pukul 09.00 - 12.00 WIB',
      lokasi: 'Aula Serbaguna Lt. 2 AL-Muhajirin',
      imamKhatib: 'Kultum: Ustadz H. Ahmad Zaki, S.Ag',
      deskripsi: 'Ramah tamah seluruh pengurus DKM, tokoh masyarakat, dan warga.',
    },
  ]);

  const [idulFitriPanitiaList, setIdulFitriPanitiaList] = useState<IdulFitriPanitia[]>([
    { id: 1, nama: 'H. Bambang Sugianto, M.M.', jabatan: 'Ketua Panitia Ramadhan & Idul Fitri', kontak: '0812-8877-6655' },
    { id: 2, nama: 'Ustadz Ridwan, S.E.', jabatan: 'Seksi Zakat Fitrah & Fidyah', kontak: '0813-1122-3344' },
    { id: 3, nama: 'Ir. Hendra Gunawan', jabatan: 'Seksi Pelaksanaan Shalat & Sound System', kontak: '0815-5544-3322' },
    { id: 4, nama: 'Ibu Hj. Siti Rahmah', jabatan: 'Seksi Konsumsi & Halal Bihalal', kontak: '0818-7766-5544' },
  ]);

  const [detailShalatId, setDetailShalatId] = useState({
    lokasi: 'Halaman Parkir & Ruang Utama AL-Muhajirin',
    waktu: 'Pukul 06.45 WIB - Selesai',
    imam: 'Ustadz M. Syakir, Lc.',
    khatib: 'Dr. H. Faisal Akbar, M.A.',
  });

  // TV Masjid States
  const [tvRunningTexts, setTvRunningTexts] = useState<TvRunningText[]>([
    { id: 1, pesan: '📢 Mohon merapatkan dan meluruskan shaf shalat. Matikan atau heningkan nada dering ponsel Anda.', aktif: true, urutan: 1 },
    { id: 2, pesan: '🕌 Kajian Rutin Ba\'da Maghrib setiap Kamis malam: Kitab Riyadhus Shalihin bersama Ust. Dr. H. Faisal Akbar.', aktif: true, urutan: 2 },
    { id: 3, pesan: '💳 Salurkan infaq dan sedekah terbaik Anda melalui scan QRIS resmi AL-Muhajirin di pintu masuk masjid.', aktif: true, urutan: 3 },
  ]);

  const [tvPengumumanList, setTvPengumumanList] = useState<TvPengumuman[]>([
    { id: 1, judul: 'Kajian Akbar Maulid Nabi', isi: 'Ahad Pagi, 27 September 2026 bersama Ustadz Abdul Somad, Lc. M.A.', tampilkan: true },
    { id: 2, judul: 'Penerimaan Santri Baru TPA', isi: 'Pendaftaran TPA AL-Muhajirin semester ganjil telah dibuka di kantor sekretariat.', tampilkan: true },
  ]);

  const [tvSetting, setTvSetting] = useState<TvSetting>({
    namaMasjid: 'AL-MUHAJIRIN',
    lokasi: 'Kayuringin Jaya, Bekasi Selatan',
    jedaIqomahMenit: 10,
  });

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

  const handleUpdateTransaction = (updatedTrx: Transaksi) => {
    const oldTrx = transaksi.find((t) => t.id === updatedTrx.id);
    setTransaksi((prev) => prev.map((t) => (t.id === updatedTrx.id ? updatedTrx : t)));

    if (oldTrx) {
      setKategoriKas((prev) =>
        prev.map((k) => {
          let saldo = k.saldo;
          if (k.id === oldTrx.kategoriId) {
            saldo -= oldTrx.tipe === 'IN' ? oldTrx.nominal : -oldTrx.nominal;
          }
          if (k.id === updatedTrx.kategoriId) {
            saldo += updatedTrx.tipe === 'IN' ? updatedTrx.nominal : -updatedTrx.nominal;
          }
          return { ...k, saldo: Math.max(0, saldo) };
        })
      );
    }
  };

  const handleDeleteTransaction = (id: number) => {
    const oldTrx = transaksi.find((t) => t.id === id);
    setTransaksi((prev) => prev.filter((t) => t.id !== id));
    if (oldTrx) {
      setKategoriKas((prev) =>
        prev.map((k) => {
          if (k.id === oldTrx.kategoriId) {
            const revert = oldTrx.tipe === 'IN' ? -oldTrx.nominal : oldTrx.nominal;
            return { ...k, saldo: Math.max(0, k.saldo + revert) };
          }
          return k;
        })
      );
    }
  };

  const handleAddKategoriKas = (kat: Omit<KategoriKas, 'id'>) => {
    const created: KategoriKas = { ...kat, id: Date.now() };
    setKategoriKas((prev) => [...prev, created]);
  };

  const handleUpdateKategoriKas = (kat: KategoriKas) => {
    setKategoriKas((prev) => prev.map((k) => (k.id === kat.id ? kat : k)));
  };

  const handleDeleteKategoriKas = (id: number) => {
    setKategoriKas((prev) => prev.filter((k) => k.id !== id));
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

  const handleAddFasilitas = (newFas: Omit<Fasilitas, 'id'>) => {
    const created: Fasilitas = {
      ...newFas,
      id: Date.now(),
    };
    setFasilitas((prev) => [...prev, created]);
  };

  const handleUpdateFasilitas = (updated: Fasilitas) => {
    setFasilitas((prev) =>
      prev.map((f) => (f.id === updated.id ? updated : f))
    );
  };

  const handleDeleteFasilitas = (id: number) => {
    setFasilitas((prev) => prev.filter((f) => f.id !== id));
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

  const handleAddHewanQurban = (hewan: Omit<HewanQurban, 'id' | 'shohibul'>) => {
    const created: HewanQurban = { ...hewan, id: Date.now(), shohibul: [] };
    setHewanQurban((prev) => [...prev, created]);
  };

  const handleUpdateHewanQurban = (hewan: HewanQurban) => {
    setHewanQurban((prev) => prev.map((h) => (h.id === hewan.id ? hewan : h)));
  };

  const handleDeleteHewanQurban = (id: number) => {
    setHewanQurban((prev) => prev.filter((h) => h.id !== id));
  };

  const handleUpdateShohibul = (hewanId: number, shohibul: ShohibulQurban) => {
    setHewanQurban((prev) =>
      prev.map((h) => {
        if (h.id === hewanId) {
          return {
            ...h,
            shohibul: h.shohibul.map((s) => (s.id === shohibul.id ? shohibul : s)),
          };
        }
        return h;
      })
    );
  };

  const handleDeleteShohibul = (hewanId: number, shohibulId: number) => {
    setHewanQurban((prev) =>
      prev.map((h) => {
        if (h.id === hewanId) {
          return {
            ...h,
            shohibul: h.shohibul.filter((s) => s.id !== shohibulId),
          };
        }
        return h;
      })
    );
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

  const handleUpdateAbsensi = (absenData: Absensi) => {
    setAbsensi((prev) => prev.map((a) => (a.id === absenData.id ? absenData : a)));
  };

  const handleDeleteAbsensi = (id: number) => {
    setAbsensi((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddPegawai = (p: Omit<Pegawai, 'id'>) => {
    const created: Pegawai = { ...p, id: Date.now() };
    setPegawai((prev) => [...prev, created]);
  };

  const handleUpdatePegawai = (p: Pegawai) => {
    setPegawai((prev) => prev.map((item) => (item.id === p.id ? p : item)));
  };

  const handleDeletePegawai = (id: number) => {
    setPegawai((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddSlipGaji = (slip: Omit<SlipGaji, 'id' | 'createdAt'>) => {
    const created: SlipGaji = {
      ...slip,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setSlipGaji((prev) => [created, ...prev]);
  };

  const handleUpdateSlipGaji = (slip: SlipGaji) => {
    setSlipGaji((prev) => prev.map((s) => (s.id === slip.id ? slip : s)));
  };

  const handleDeleteSlipGaji = (id: number) => {
    setSlipGaji((prev) => prev.filter((s) => s.id !== id));
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

  const handleUpdateWarga = (updated: Warga) => {
    setWarga((prev) =>
      prev.map((w) => (w.id === updated.id ? updated : w))
    );
  };

  const handleDeleteWarga = (id: number) => {
    setWarga((prev) => prev.filter((w) => w.id !== id));
  };

  // -------------------------------------------------------------
  // Modul Data Lembaga Handlers: Profil, Pengurus, Rekening
  // -------------------------------------------------------------
  const handleUpdateProfilLembaga = (p: ProfilLembaga) => {
    setProfilLembaga(p);
  };

  const handleAddPengurusLembaga = (p: Omit<PengurusLembaga, 'id'>) => {
    const created: PengurusLembaga = { ...p, id: Date.now() };
    setPengurusLembaga((prev) => [...prev, created]);
  };

  const handleUpdatePengurusLembaga = (p: PengurusLembaga) => {
    setPengurusLembaga((prev) =>
      prev.map((item) => (item.id === p.id ? p : item))
    );
  };

  const handleDeletePengurusLembaga = (id: number) => {
    setPengurusLembaga((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddRekeningLembaga = (r: Omit<RekeningLembaga, 'id'>) => {
    const created: RekeningLembaga = { ...r, id: Date.now() };
    setRekeningLembaga((prev) => [...prev, created]);
  };

  const handleUpdateRekeningLembaga = (r: RekeningLembaga) => {
    setRekeningLembaga((prev) =>
      prev.map((item) => (item.id === r.id ? r : item))
    );
  };

  const handleDeleteRekeningLembaga = (id: number) => {
    setRekeningLembaga((prev) => prev.filter((item) => item.id !== id));
  };

  // -------------------------------------------------------------
  // Modul Agenda & Kegiatan Handlers
  // -------------------------------------------------------------
  const handleAddKegiatan = (k: Omit<Kegiatan, 'id'>) => {
    const created: Kegiatan = { ...k, id: Date.now() };
    setKegiatanList((prev) => [created, ...prev]);
  };

  const handleUpdateKegiatan = (k: Kegiatan) => {
    setKegiatanList((prev) =>
      prev.map((item) => (item.id === k.id ? k : item))
    );
  };

  const handleDeleteKegiatan = (id: number) => {
    setKegiatanList((prev) => prev.filter((item) => item.id !== id));
  };

  // -------------------------------------------------------------
  // Modul Inventory & Sarpras Handlers
  // -------------------------------------------------------------
  const handleAddInventory = (item: Omit<InventoryItem, 'id'>) => {
    const created: InventoryItem = { ...item, id: Date.now() };
    setInventoryList((prev) => [created, ...prev]);
  };

  const handleUpdateInventory = (item: InventoryItem) => {
    setInventoryList((prev) =>
      prev.map((i) => (i.id === item.id ? item : i))
    );
  };

  const handleDeleteInventory = (id: number) => {
    setInventoryList((prev) => prev.filter((i) => i.id !== id));
  };

  // -------------------------------------------------------------
  // Modul ZISWAF / Mustahiq Handlers
  // -------------------------------------------------------------
  const handleAddMustahiq = (newM: Omit<Mustahiq, 'id'>) => {
    const created: Mustahiq = { ...newM, id: Date.now() };
    setMustahiq((prev) => [created, ...prev]);
  };

  const handleUpdateMustahiq = (updated: Mustahiq) => {
    setMustahiq((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
  };

  const handleDeleteMustahiq = (id: number) => {
    setMustahiq((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpdateStokZiswaf = (berasKg: number, danaRp: number) => {
    setStokBerasKg(berasKg);
    setDanaZakatRp(danaRp);
  };

  // -------------------------------------------------------------
  // Modul Idul Fitri Handlers
  // -------------------------------------------------------------
  const handleAddIdulFitriAgenda = (a: Omit<IdulFitriAgenda, 'id'>) => {
    const created: IdulFitriAgenda = { ...a, id: Date.now() };
    setIdulFitriAgendas((prev) => [...prev, created]);
  };

  const handleUpdateIdulFitriAgenda = (a: IdulFitriAgenda) => {
    setIdulFitriAgendas((prev) => prev.map((item) => (item.id === a.id ? a : item)));
  };

  const handleDeleteIdulFitriAgenda = (id: number) => {
    setIdulFitriAgendas((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddIdulFitriPanitia = (p: Omit<IdulFitriPanitia, 'id'>) => {
    const created: IdulFitriPanitia = { ...p, id: Date.now() };
    setIdulFitriPanitiaList((prev) => [...prev, created]);
  };

  const handleUpdateIdulFitriPanitia = (p: IdulFitriPanitia) => {
    setIdulFitriPanitiaList((prev) => prev.map((item) => (item.id === p.id ? p : item)));
  };

  const handleDeleteIdulFitriPanitia = (id: number) => {
    setIdulFitriPanitiaList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateDetailShalatId = (d: { lokasi: string; waktu: string; imam: string; khatib: string }) => {
    setDetailShalatId(d);
  };

  // -------------------------------------------------------------
  // Modul TV Display Masjid Handlers
  // -------------------------------------------------------------
  const handleAddTvRunningText = (rt: Omit<TvRunningText, 'id'>) => {
    const created: TvRunningText = { ...rt, id: Date.now() };
    setTvRunningTexts((prev) => [...prev, created]);
  };

  const handleUpdateTvRunningText = (rt: TvRunningText) => {
    setTvRunningTexts((prev) => prev.map((item) => (item.id === rt.id ? rt : item)));
  };

  const handleDeleteTvRunningText = (id: number) => {
    setTvRunningTexts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddTvPengumuman = (p: Omit<TvPengumuman, 'id'>) => {
    const created: TvPengumuman = { ...p, id: Date.now() };
    setTvPengumumanList((prev) => [...prev, created]);
  };

  const handleUpdateTvPengumuman = (p: TvPengumuman) => {
    setTvPengumumanList((prev) => prev.map((item) => (item.id === p.id ? p : item)));
  };

  const handleDeleteTvPengumuman = (id: number) => {
    setTvPengumumanList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateTvSetting = (s: TvSetting) => {
    setTvSetting(s);
  };

  // Counters
  const pendingBookingsCount = reservasi.filter((r) => r.status === 'PENDING').length;
  const pendingSalaryCount = slipGaji.filter((s) => s.status === 'PENDING').length;

  return (
    <div className={`app-container ${isMobileView ? 'mobile-container' : ''}`}>
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
          onUpdateWarga={handleUpdateWarga}
          onDeleteWarga={handleDeleteWarga}
          profilLembaga={profilLembaga}
          onUpdateProfilLembaga={handleUpdateProfilLembaga}
          pengurusLembaga={pengurusLembaga}
          onAddPengurusLembaga={handleAddPengurusLembaga}
          onUpdatePengurusLembaga={handleUpdatePengurusLembaga}
          onDeletePengurusLembaga={handleDeletePengurusLembaga}
          rekeningLembaga={rekeningLembaga}
          onAddRekeningLembaga={handleAddRekeningLembaga}
          onUpdateRekeningLembaga={handleUpdateRekeningLembaga}
          onDeleteRekeningLembaga={handleDeleteRekeningLembaga}
          kegiatanList={kegiatanList}
          onAddKegiatan={handleAddKegiatan}
          onUpdateKegiatan={handleUpdateKegiatan}
          onDeleteKegiatan={handleDeleteKegiatan}
          onAddFasilitas={handleAddFasilitas}
          onUpdateFasilitas={handleUpdateFasilitas}
          onDeleteFasilitas={handleDeleteFasilitas}
          inventoryList={inventoryList}
          onAddInventory={handleAddInventory}
          onUpdateInventory={handleUpdateInventory}
          onDeleteInventory={handleDeleteInventory}
          onAddMustahiq={handleAddMustahiq}
          onUpdateMustahiq={handleUpdateMustahiq}
          onDeleteMustahiq={handleDeleteMustahiq}
          onUpdateStokZiswaf={handleUpdateStokZiswaf}
          onAddTransaction={handleAddTransaction}
          onUpdateTransaction={handleUpdateTransaction}
          onDeleteTransaction={handleDeleteTransaction}
          onAddKategoriKas={handleAddKategoriKas}
          onUpdateKategoriKas={handleUpdateKategoriKas}
          onDeleteKategoriKas={handleDeleteKategoriKas}
          onAddHewanQurban={handleAddHewanQurban}
          onUpdateHewanQurban={handleUpdateHewanQurban}
          onDeleteHewanQurban={handleDeleteHewanQurban}
          onUpdateShohibul={handleUpdateShohibul}
          onDeleteShohibul={handleDeleteShohibul}
          onUpdateAbsensi={handleUpdateAbsensi}
          onDeleteAbsensi={handleDeleteAbsensi}
          onAddPegawai={handleAddPegawai}
          onUpdatePegawai={handleUpdatePegawai}
          onDeletePegawai={handleDeletePegawai}
          onAddSlipGaji={handleAddSlipGaji}
          onUpdateSlipGaji={handleUpdateSlipGaji}
          onDeleteSlipGaji={handleDeleteSlipGaji}
          idulFitriAgendas={idulFitriAgendas}
          onAddIdulFitriAgenda={handleAddIdulFitriAgenda}
          onUpdateIdulFitriAgenda={handleUpdateIdulFitriAgenda}
          onDeleteIdulFitriAgenda={handleDeleteIdulFitriAgenda}
          idulFitriPanitiaList={idulFitriPanitiaList}
          onAddIdulFitriPanitia={handleAddIdulFitriPanitia}
          onUpdateIdulFitriPanitia={handleUpdateIdulFitriPanitia}
          onDeleteIdulFitriPanitia={handleDeleteIdulFitriPanitia}
          detailShalatId={detailShalatId}
          onUpdateDetailShalatId={handleUpdateDetailShalatId}
          tvRunningTexts={tvRunningTexts}
          onAddTvRunningText={handleAddTvRunningText}
          onUpdateTvRunningText={handleUpdateTvRunningText}
          onDeleteTvRunningText={handleDeleteTvRunningText}
          tvPengumumanList={tvPengumumanList}
          onAddTvPengumuman={handleAddTvPengumuman}
          onUpdateTvPengumuman={handleUpdateTvPengumuman}
          onDeleteTvPengumuman={handleDeleteTvPengumuman}
          tvSetting={tvSetting}
          onUpdateTvSetting={handleUpdateTvSetting}
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
            <div className="desktop-wallpaper-bg" aria-hidden="true" />
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
