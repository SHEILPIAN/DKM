'use client';

import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  PlusCircle,
  Coins,
  Calendar,
  Wallet,
  Edit3,
  Trash2,
  Search,
  X,
  Plus,
  Building,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Printer,
  Share2,
  FileSpreadsheet,
  Check,
  Tag,
  Clock,
  User as UserIcon,
} from 'lucide-react';
import { KategoriKas, Transaksi, TipeTrx } from '@/types/dkm';
import { formatRupiah } from '@/lib/utils';

interface MaslamKeuanganProps {
  onBack: () => void;
  kategoriKas: KategoriKas[];
  transaksi: Transaksi[];
  onOpenCashier: () => void;
  onAddTransaction?: (trx: Omit<Transaksi, 'id'>) => void;
  onUpdateTransaction?: (trx: Transaksi) => void;
  onDeleteTransaction?: (id: number) => void;
  onAddKategoriKas?: (kat: Omit<KategoriKas, 'id'>) => void;
  onUpdateKategoriKas?: (kat: KategoriKas) => void;
  onDeleteKategoriKas?: (id: number) => void;
}

export const MaslamKeuangan: React.FC<MaslamKeuanganProps> = ({
  onBack,
  kategoriKas,
  transaksi,
  onOpenCashier,
  onAddTransaction,
  onUpdateTransaction,
  onDeleteTransaction,
  onAddKategoriKas,
  onUpdateKategoriKas,
  onDeleteKategoriKas,
}) => {
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'detail' | 'total'>('ringkasan');
  const [selectedPos, setSelectedPos] = useState<string>('ALL');
  const [selectedTipe, setSelectedTipe] = useState<'ALL' | 'IN' | 'OUT'>('ALL');
  const [selectedPeriod, setSelectedPeriod] = useState<'ALL' | 'THIS_MONTH' | 'TODAY'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Saldo Awal State
  const [saldoAwal, setSaldoAwal] = useState<number>(0);
  const [isSaldoAwalModalOpen, setIsSaldoAwalModalOpen] = useState(false);
  const [tempSaldoAwal, setTempSaldoAwal] = useState('');

  // Transaction Modal State (Add & Edit)
  const [isTrxModalOpen, setIsTrxModalOpen] = useState(false);
  const [editingTrx, setEditingTrx] = useState<Transaksi | null>(null);
  const [trxTipe, setTrxTipe] = useState<TipeTrx>('IN');
  const [trxNominal, setTrxNominal] = useState('');
  const [trxKeterangan, setTrxKeterangan] = useState('');
  const [trxKategoriId, setTrxKategoriId] = useState<number>(kategoriKas[0]?.id || 1);
  const [trxTanggal, setTrxTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [trxUserNama, setTrxUserNama] = useState('Admin DKM');

  // Delete Transaction Confirmation Modal State
  const [isDeleteTrxModalOpen, setIsDeleteTrxModalOpen] = useState(false);
  const [deletingTrx, setDeletingTrx] = useState<Transaksi | null>(null);

  // Kategori Kas Modal State (Add & Edit)
  const [isKatModalOpen, setIsKatModalOpen] = useState(false);
  const [editingKat, setEditingKat] = useState<KategoriKas | null>(null);
  const [katNama, setKatNama] = useState('');
  const [katSaldo, setKatSaldo] = useState('');

  // Delete Category Confirmation Modal State
  const [isDeleteKatModalOpen, setIsDeleteKatModalOpen] = useState(false);
  const [deletingKat, setDeletingKat] = useState<KategoriKas | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Helper formatting numbers with thousand separator
  const formatInputRupiah = (val: string) => {
    const raw = val.replace(/\D/g, '');
    if (!raw) return '';
    return new Intl.NumberFormat('id-ID').format(Number(raw));
  };

  // Aggregation Calculations
  const totalSaldoPos = useMemo(() => {
    return kategoriKas.reduce((acc, curr) => acc + curr.saldo, 0);
  }, [kategoriKas]);

  const totalPemasukan = useMemo(() => {
    return transaksi
      .filter((t) => t.tipe === 'IN')
      .reduce((acc, curr) => acc + curr.nominal, 0);
  }, [transaksi]);

  const totalPengeluaran = useMemo(() => {
    return transaksi
      .filter((t) => t.tipe === 'OUT')
      .reduce((acc, curr) => acc + curr.nominal, 0);
  }, [transaksi]);

  const saldoAkhirBersih = totalSaldoPos;

  // Breakdown lists per pos
  const pemasukanList = useMemo(() => {
    return kategoriKas
      .map((kat) => {
        const total = transaksi
          .filter((t) => t.tipe === 'IN' && t.kategoriId === kat.id)
          .reduce((acc, curr) => acc + curr.nominal, 0);
        const count = transaksi.filter((t) => t.tipe === 'IN' && t.kategoriId === kat.id).length;
        return { id: kat.id, nama: kat.nama, nominal: total, count };
      })
      .filter((x) => x.nominal > 0);
  }, [kategoriKas, transaksi]);

  const pengeluaranList = useMemo(() => {
    return kategoriKas
      .map((kat) => {
        const total = transaksi
          .filter((t) => t.tipe === 'OUT' && t.kategoriId === kat.id)
          .reduce((acc, curr) => acc + curr.nominal, 0);
        const count = transaksi.filter((t) => t.tipe === 'OUT' && t.kategoriId === kat.id).length;
        return { id: kat.id, nama: kat.nama, nominal: total, count };
      })
      .filter((x) => x.nominal > 0);
  }, [kategoriKas, transaksi]);

  // Filtered transactions for Detail Tab
  const filteredTransaksi = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const currentMonthStr = todayStr.substring(0, 7); // 'YYYY-MM'

    return transaksi.filter((trx) => {
      const matchTipe = selectedTipe === 'ALL' ? true : trx.tipe === selectedTipe;
      const matchPos = selectedPos === 'ALL' ? true : trx.kategoriId === Number(selectedPos);
      const matchSearch =
        trx.keterangan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (trx.kategoriNama && trx.kategoriNama.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (trx.userNama && trx.userNama.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchPeriod = true;
      if (selectedPeriod === 'TODAY') {
        matchPeriod = trx.tanggal.startsWith(todayStr);
      } else if (selectedPeriod === 'THIS_MONTH') {
        matchPeriod = trx.tanggal.startsWith(currentMonthStr);
      }

      return matchTipe && matchPos && matchSearch && matchPeriod;
    });
  }, [transaksi, selectedTipe, selectedPos, searchQuery, selectedPeriod]);

  // Quick Description Templates
  const quickIncomeTemplates = [
    'Infaq Kotak Amal Shalat Jumat',
    'Infaq Tromol Subuh',
    'Donasi Hamba Allah Renovasi Masjid',
    'Infaq QRIS Digital Jamaah',
    'Sedekah Operasional DKM',
    'Penerimaan Dana Kas Sosial',
  ];

  const quickExpenseTemplates = [
    'Tagihan Listrik PLN & Air PDAM',
    'Bisyarah / Kafalah Penceramah & Imam',
    'Pembelian Karbol & Alat Kebersihan',
    'Santunan Bulanan Anak Yatim & Dhuafa',
    'Konsumsi Pengajian Rutin Jamaah',
    'Perbaikan Sound System & Lampu',
  ];

  // Shortcut Nominal amounts
  const quickNominals = [50000, 100000, 250000, 500000, 1000000, 2500000, 5000000];

  // Handlers for Transactions
  const handleOpenAddTrx = (defaultTipe: TipeTrx = 'IN', defaultKatId?: number) => {
    setEditingTrx(null);
    setTrxTipe(defaultTipe);
    setTrxNominal('');
    setTrxKeterangan('');
    setTrxKategoriId(defaultKatId || kategoriKas[0]?.id || 1);
    setTrxTanggal(new Date().toISOString().split('T')[0]);
    setTrxUserNama('Admin DKM');
    setIsTrxModalOpen(true);
  };

  const handleOpenEditTrx = (trx: Transaksi) => {
    setEditingTrx(trx);
    setTrxTipe(trx.tipe);
    setTrxNominal(new Intl.NumberFormat('id-ID').format(trx.nominal));
    setTrxKeterangan(trx.keterangan);
    setTrxKategoriId(trx.kategoriId);
    setTrxTanggal(trx.tanggal ? trx.tanggal.split('T')[0] : new Date().toISOString().split('T')[0]);
    setTrxUserNama(trx.userNama || 'Admin DKM');
    setIsTrxModalOpen(true);
  };

  const handleSaveTrx = (e: React.FormEvent) => {
    e.preventDefault();
    const nominalNum = Number(trxNominal.replace(/\D/g, ''));
    if (!trxKeterangan.trim()) {
      alert('Mohon isi keterangan transaksi.');
      return;
    }
    if (!nominalNum || nominalNum <= 0) {
      alert('Mohon masukkan nominal yang valid.');
      return;
    }

    const selectedKategori = kategoriKas.find((k) => k.id === trxKategoriId);
    const katNama = selectedKategori ? selectedKategori.nama : 'Kas Operasional';

    if (editingTrx) {
      if (onUpdateTransaction) {
        onUpdateTransaction({
          ...editingTrx,
          tipe: trxTipe,
          nominal: nominalNum,
          keterangan: trxKeterangan.trim(),
          kategoriId: trxKategoriId,
          kategoriNama: katNama,
          tanggal: new Date(trxTanggal).toISOString(),
          userNama: trxUserNama.trim() || 'Admin DKM',
        });
        showToast('Alhamdulillah, perubahan transaksi berhasil disimpan!');
      }
    } else {
      if (onAddTransaction) {
        onAddTransaction({
          tipe: trxTipe,
          nominal: nominalNum,
          keterangan: trxKeterangan.trim(),
          kategoriId: trxKategoriId,
          kategoriNama: katNama,
          tanggal: new Date(trxTanggal).toISOString(),
          userId: 1,
          userNama: trxUserNama.trim() || 'Admin DKM',
        });
        showToast(`Catatan ${trxTipe === 'IN' ? 'pemasukan' : 'pengeluaran'} baru berhasil ditambahkan!`);
      }
    }
    setIsTrxModalOpen(false);
  };

  const handlePromptDeleteTrx = (trx: Transaksi) => {
    setDeletingTrx(trx);
    setIsDeleteTrxModalOpen(true);
  };

  const handleConfirmDeleteTrx = () => {
    if (deletingTrx && onDeleteTransaction) {
      onDeleteTransaction(deletingTrx.id);
      showToast('Transaksi berhasil dihapus dan saldo kas telah disesuaikan kembali.', 'info');
      setIsDeleteTrxModalOpen(false);
      setDeletingTrx(null);
    }
  };

  // Handlers for Kategori Kas
  const handleOpenAddKat = () => {
    setEditingKat(null);
    setKatNama('');
    setKatSaldo('');
    setIsKatModalOpen(true);
  };

  const handleOpenEditKat = (kat: KategoriKas) => {
    setEditingKat(kat);
    setKatNama(kat.nama);
    setKatSaldo(new Intl.NumberFormat('id-ID').format(kat.saldo));
    setIsKatModalOpen(true);
  };

  const handleSaveKat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!katNama.trim()) {
      alert('Mohon isi nama pos anggaran kas.');
      return;
    }
    const saldoNum = Number(katSaldo.replace(/\D/g, '')) || 0;

    if (editingKat) {
      if (onUpdateKategoriKas) {
        onUpdateKategoriKas({
          ...editingKat,
          nama: katNama.trim(),
          saldo: saldoNum,
        });
        showToast('Pos anggaran kas berhasil diperbarui!');
      }
    } else {
      if (onAddKategoriKas) {
        onAddKategoriKas({
          nama: katNama.trim(),
          saldo: saldoNum,
        });
        showToast('Pos anggaran kas baru berhasil ditambahkan!');
      }
    }
    setIsKatModalOpen(false);
  };

  const handlePromptDeleteKat = (kat: KategoriKas) => {
    setDeletingKat(kat);
    setIsDeleteKatModalOpen(true);
  };

  const handleConfirmDeleteKat = () => {
    if (deletingKat && onDeleteKategoriKas) {
      onDeleteKategoriKas(deletingKat.id);
      showToast('Pos anggaran kas berhasil dihapus.', 'info');
      setIsDeleteKatModalOpen(false);
      setDeletingKat(null);
    }
  };

  // Handlers for Saldo Awal
  const handleOpenSaldoAwalModal = () => {
    setTempSaldoAwal(saldoAwal > 0 ? new Intl.NumberFormat('id-ID').format(saldoAwal) : '');
    setIsSaldoAwalModalOpen(true);
  };

  const handleSaveSaldoAwal = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(tempSaldoAwal.replace(/\D/g, '')) || 0;
    setSaldoAwal(val);
    setIsSaldoAwalModalOpen(false);
    showToast('Saldo awal berhasil disesuaikan!');
  };

  // Drill down from Ringkasan category card to Detail Tab
  const handleDrillDownCategory = (katId: number, tipe: 'IN' | 'OUT' | 'ALL' = 'ALL') => {
    setSelectedPos(String(katId));
    setSelectedTipe(tipe);
    setActiveTab('detail');
  };

  // Copy WhatsApp Formatted Report
  const handleCopyWhatsAppReport = () => {
    const todayStr = new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    let text = `*📊 LAPORAN KEUANGAN DKM AL-MUHAJIRIN*\n`;
    text += `*AL-MUHAJIRIN KAYURINGIN BEKASI*\n`;
    text += `Tanggal: ${todayStr}\n`;
    text += `═══════════════════════\n\n`;
    text += `💰 *RINGKASAN SALDO:*\n`;
    text += `• Saldo Awal: ${formatRupiah(saldoAwal)}\n`;
    text += `• Total Pemasukan: ${formatRupiah(totalPemasukan)}\n`;
    text += `• Total Pengeluaran: ${formatRupiah(totalPengeluaran)}\n`;
    text += `• *Saldo Akhir Bersih: ${formatRupiah(saldoAkhirBersih + saldoAwal)}*\n\n`;

    text += `📈 *POS ANGGARAN KAS:*\n`;
    kategoriKas.forEach((kat, i) => {
      text += `${i + 1}. ${kat.nama}: ${formatRupiah(kat.saldo)}\n`;
    });

    text += `\n═══════════════════════\n`;
    text += `_Jazakumullahu khairan katsiran kepada seluruh jamaah dan donatur atas infaq & sedekah yang disalurkan._\n`;
    text += `*Sekretariat & Bendahara DKM AL-MUHAJIRIN*`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('Laporan Keuangan WhatsApp berhasil disalin ke clipboard!');
    } else {
      alert(text);
    }
  };

  // Print Report Handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ paddingBottom: 90, position: 'relative' }}>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 200,
            background:
              toastMessage.type === 'error'
                ? '#dc2626'
                : toastMessage.type === 'info'
                ? '#0284c7'
                : '#059669',
            color: '#ffffff',
            padding: '10px 18px',
            borderRadius: 30,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            fontSize: '0.82rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            maxWidth: '90%',
            animation: 'fadeIn 0.2s ease-in-out',
          }}
        >
          {toastMessage.type === 'error' ? (
            <AlertTriangle size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* 1. Header Navigation */}
      <div className="maslam-sub-header">
        <div className="maslam-header-nav">
          <button type="button" onClick={onBack} className="maslam-back-btn">
            <ChevronLeft size={22} />
            <span>Beranda</span>
          </button>
        </div>

        <div className="maslam-page-title-group">
          <h2>Laporan Keuangan</h2>
          <p>AL-MUHAJIRIN KAYURINGIN BEKASI</p>
        </div>

        {/* Action Toolbar: Share WhatsApp & Print */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10, padding: '0 16px' }}>
          <button
            type="button"
            onClick={handleCopyWhatsAppReport}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Copy size={13} />
            <span>Salin WA</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Printer size={13} />
            <span>Cetak</span>
          </button>
        </div>
      </div>

      {/* 2. Segmented Navigation Tabs */}
      <div className="maslam-tabs-row">
        <button
          type="button"
          onClick={() => setActiveTab('ringkasan')}
          className={`maslam-tab-pill ${activeTab === 'ringkasan' ? 'active' : ''}`}
        >
          Ringkasan
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('detail')}
          className={`maslam-tab-pill ${activeTab === 'detail' ? 'active' : ''}`}
        >
          Detail ({transaksi.length} Trx)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('total')}
          className={`maslam-tab-pill ${activeTab === 'total' ? 'active' : ''}`}
        >
          Pos Kas ({kategoriKas.length})
        </button>
      </div>

      {/* QUICK ACTION BUTTONS BAR (Available across tabs) */}
      <div style={{ padding: '12px 16px 4px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <button
          type="button"
          onClick={() => handleOpenAddTrx('IN')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '10px 14px',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)',
          }}
        >
          <Plus size={16} strokeWidth={3} />
          <span>+ Catat Pemasukan</span>
        </button>
        <button
          type="button"
          onClick={() => handleOpenAddTrx('OUT')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '10px 14px',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(225, 29, 72, 0.25)',
          }}
        >
          <Plus size={16} strokeWidth={3} />
          <span>- Catat Pengeluaran</span>
        </button>
      </div>

      {/* TAB 1: RINGKASAN LAPORAN KEUANGAN */}
      {activeTab === 'ringkasan' && (
        <div style={{ marginTop: 8 }}>
          {/* Saldo Awal Card (Editable) */}
          <div className="maslam-saldo-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 700 }}>
                Saldo Awal Periode
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginTop: 2 }}>
                {formatRupiah(saldoAwal)}
              </div>
            </div>
            <button
              type="button"
              onClick={handleOpenSaldoAwalModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: '0.74rem',
                fontWeight: 700,
                color: '#0284c7',
                cursor: 'pointer',
              }}
            >
              <Edit3 size={13} />
              <span>Ubah</span>
            </button>
          </div>

          {/* Saldo Akhir Bersih Card */}
          <div className="maslam-saldo-card green-pattern">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 800, letterSpacing: 0.5 }}>
                  SALDO AKHIR KAS BERSIH
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#064e3b', marginTop: 3 }}>
                  {formatRupiah(saldoAkhirBersih + saldoAwal)}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#15803d', marginTop: 4, fontWeight: 600 }}>
                  Tersebar di {kategoriKas.length} pos anggaran kas aktif
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(22, 101, 52, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#166534',
                }}
              >
                <Wallet size={24} />
              </div>
            </div>
          </div>

          {/* Dual Metric: Pemasukan & Pengeluaran */}
          <div className="maslam-dual-metric-grid">
            <div
              className="maslam-metric-box"
              style={{ cursor: 'pointer', transition: 'transform 0.15s' }}
              onClick={() => {
                setSelectedTipe('IN');
                setActiveTab('detail');
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="maslam-coin-badge">
                  Rp
                  <span className="maslam-coin-arrow" style={{ background: '#10b981' }}>
                    <ArrowUp size={10} strokeWidth={3} />
                  </span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>Lihat »</span>
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, marginTop: 8 }}>
                Total Pemasukan
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginTop: 2 }}>
                {formatRupiah(totalPemasukan)}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 700, marginTop: 4 }}>
                {transaksi.filter((t) => t.tipe === 'IN').length} Transaksi Masuk
              </div>
            </div>

            <div
              className="maslam-metric-box"
              style={{ cursor: 'pointer', transition: 'transform 0.15s' }}
              onClick={() => {
                setSelectedTipe('OUT');
                setActiveTab('detail');
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="maslam-coin-badge">
                  Rp
                  <span className="maslam-coin-arrow" style={{ background: '#ef4444' }}>
                    <ArrowDown size={10} strokeWidth={3} />
                  </span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: 700 }}>Lihat »</span>
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, marginTop: 8 }}>
                Total Pengeluaran
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginTop: 2 }}>
                {formatRupiah(totalPengeluaran)}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#dc2626', fontWeight: 700, marginTop: 4 }}>
                {transaksi.filter((t) => t.tipe === 'OUT').length} Transaksi Keluar
              </div>
            </div>
          </div>

          {/* Sub-total Pemasukan per Pos (Clickable to Drilldown) */}
          <div
            style={{
              margin: '0 16px 14px',
              background: '#ffffff',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="maslam-coin-badge" style={{ width: 26, height: 26, fontSize: '0.7rem', margin: 0 }}>
                  Rp
                  <span className="maslam-coin-arrow" style={{ background: '#10b981', width: 12, height: 12 }}>
                    <ArrowUp size={8} strokeWidth={3} />
                  </span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                  Sub-total Pemasukan per Pos
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleOpenAddTrx('IN')}
                style={{
                  background: '#ecfdf5',
                  color: '#047857',
                  border: '1px solid #a7f3d0',
                  padding: '3px 8px',
                  borderRadius: 6,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                + Tambah
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pemasukanList.length === 0 ? (
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', padding: '8px 0' }}>
                  Belum ada pemasukan tercatat
                </div>
              ) : (
                pemasukanList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleDrillDownCategory(item.id, 'IN')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      borderBottom: '1px solid #f1f5f9',
                      paddingBottom: 8,
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <span style={{ color: '#0369a1', fontWeight: 700 }}>{item.nama}</span>
                      <span style={{ fontSize: '0.68rem', color: '#64748b', marginLeft: 6 }}>
                        ({item.count} trx)
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 800, color: '#059669' }}>
                      <span>{formatRupiah(item.nominal)}</span>
                      <ChevronRight size={15} style={{ color: '#94a3b8' }} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sub-total Pengeluaran per Pos (Clickable to Drilldown) */}
          <div
            style={{
              margin: '0 16px 14px',
              background: '#ffffff',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="maslam-coin-badge" style={{ width: 26, height: 26, fontSize: '0.7rem', margin: 0 }}>
                  Rp
                  <span className="maslam-coin-arrow" style={{ background: '#ef4444', width: 12, height: 12 }}>
                    <ArrowDown size={8} strokeWidth={3} />
                  </span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                  Sub-total Pengeluaran per Pos
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleOpenAddTrx('OUT')}
                style={{
                  background: '#fef2f2',
                  color: '#b91c1c',
                  border: '1px solid #fecaca',
                  padding: '3px 8px',
                  borderRadius: 6,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                + Tambah
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pengeluaranList.length === 0 ? (
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', padding: '8px 0' }}>
                  Belum ada pengeluaran tercatat
                </div>
              ) : (
                pengeluaranList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleDrillDownCategory(item.id, 'OUT')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      borderBottom: '1px solid #f1f5f9',
                      paddingBottom: 8,
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <span style={{ color: '#475569', fontWeight: 700 }}>{item.nama}</span>
                      <span style={{ fontSize: '0.68rem', color: '#64748b', marginLeft: 6 }}>
                        ({item.count} trx)
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 800, color: '#dc2626' }}>
                      <span>{formatRupiah(item.nominal)}</span>
                      <ChevronRight size={15} style={{ color: '#94a3b8' }} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* TRANSAKSI TERKINI SECTION IN RINGKASAN WITH EDIT & HAPUS */}
          <div
            style={{
              margin: '0 16px 14px',
              background: '#ffffff',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={16} color="#0284c7" />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                  Transaksi Terkini (Bisa Langsung Edit & Hapus)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('detail')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0284c7',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Lihat Semua »
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {transaksi.slice(0, 5).map((trx) => (
                <div
                  key={trx.id}
                  style={{
                    background: '#f8fafc',
                    borderRadius: 12,
                    padding: 12,
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, paddingRight: 8 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.84rem', color: '#0f172a' }}>
                        {trx.keterangan}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 2 }}>
                        <span
                          style={{
                            background: trx.tipe === 'IN' ? '#ecfdf5' : '#fef2f2',
                            color: trx.tipe === 'IN' ? '#047857' : '#b91c1c',
                            padding: '1px 6px',
                            borderRadius: 6,
                            fontWeight: 700,
                            marginRight: 6,
                          }}
                        >
                          {trx.tipe === 'IN' ? '▲ Masuk' : '▼ Keluar'}
                        </span>
                        {trx.kategoriNama} • {new Date(trx.tanggal).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: '0.88rem',
                        color: trx.tipe === 'IN' ? '#059669' : '#dc2626',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {trx.tipe === 'IN' ? `+ ${formatRupiah(trx.nominal)}` : `- ${formatRupiah(trx.nominal)}`}
                    </div>
                  </div>

                  {/* Action Buttons: Edit & Hapus */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 8,
                      borderTop: '1px solid #e2e8f0',
                      paddingTop: 8,
                      marginTop: 8,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleOpenEditTrx(trx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: 6,
                        padding: '3px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#0284c7',
                        cursor: 'pointer',
                      }}
                    >
                      <Edit3 size={12} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePromptDeleteTrx(trx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        background: '#fef2f2',
                        border: '1px solid #fca5a5',
                        borderRadius: 6,
                        padding: '3px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#dc2626',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={12} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DETAIL TRANSAKSI LAPORAN KEUANGAN */}
      {activeTab === 'detail' && (
        <div style={{ padding: '0 16px', marginTop: 10 }}>
          {/* Active Filter Indicator if drilled down */}
          {(selectedPos !== 'ALL' || selectedTipe !== 'ALL') && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: 10,
                padding: '6px 12px',
                marginBottom: 10,
                fontSize: '0.76rem',
                color: '#1e40af',
              }}
            >
              <span>
                Filter Aktif: <strong>{selectedTipe === 'IN' ? 'Pemasukan' : selectedTipe === 'OUT' ? 'Pengeluaran' : 'Semua'}</strong>
                {selectedPos !== 'ALL' && ` • Pos ID: ${selectedPos}`}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedPos('ALL');
                  setSelectedTipe('ALL');
                  setSelectedPeriod('ALL');
                  setSearchQuery('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563eb',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '0.74rem',
                }}
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Search Box & Top Action Button */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: 12,
                padding: '0 12px',
              }}
            >
              <Search size={16} color="#64748b" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari transaksi, pos, atau petugas..."
                style={{
                  border: 'none',
                  outline: 'none',
                  padding: '9px 8px',
                  fontSize: '0.82rem',
                  width: '100%',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <X size={14} color="#94a3b8" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleOpenAddTrx('IN')}
              style={{
                background: '#0284c7',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '0 14px',
                fontWeight: 700,
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <Plus size={16} />
              <span>+ Tambah</span>
            </button>
          </div>

          {/* Filter Pills Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
            <button
              type="button"
              className={`maslam-filter-btn ${selectedTipe === 'ALL' ? 'active' : ''}`}
              onClick={() => setSelectedTipe('ALL')}
            >
              Semua Tipe
            </button>
            <button
              type="button"
              className={`maslam-filter-btn ${selectedTipe === 'IN' ? 'active' : ''}`}
              onClick={() => setSelectedTipe('IN')}
              style={{ color: selectedTipe === 'IN' ? '#047857' : undefined }}
            >
              ▲ Masuk
            </button>
            <button
              type="button"
              className={`maslam-filter-btn ${selectedTipe === 'OUT' ? 'active' : ''}`}
              onClick={() => setSelectedTipe('OUT')}
              style={{ color: selectedTipe === 'OUT' ? '#b91c1c' : undefined }}
            >
              ▼ Keluar
            </button>

            {/* Pos Anggaran Dropdown */}
            <select
              value={selectedPos}
              onChange={(e) => setSelectedPos(e.target.value)}
              style={{
                padding: '5px 10px',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                fontSize: '0.75rem',
                background: '#ffffff',
                fontWeight: 600,
                color: '#334155',
                outline: 'none',
              }}
            >
              <option value="ALL">Semua Pos Kas</option>
              {kategoriKas.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.nama}
                </option>
              ))}
            </select>

            {/* Period Filter */}
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              style={{
                padding: '5px 10px',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                fontSize: '0.75rem',
                background: '#ffffff',
                fontWeight: 600,
                color: '#334155',
                outline: 'none',
              }}
            >
              <option value="ALL">Semua Waktu</option>
              <option value="THIS_MONTH">Bulan Ini</option>
              <option value="TODAY">Hari Ini</option>
            </select>
          </div>

          {/* Filter Summary Counter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#475569' }}>
              Menampilkan {filteredTransaksi.length} Catatan Transaksi
            </span>
            <button
              type="button"
              onClick={() => handleOpenAddTrx('IN')}
              style={{
                background: 'none',
                border: 'none',
                color: '#059669',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <PlusCircle size={14} />
              <span>Tambah Baru</span>
            </button>
          </div>

          {/* List of Transaction Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredTransaksi.length === 0 ? (
              <div
                style={{
                  background: '#ffffff',
                  padding: '36px 16px',
                  borderRadius: 16,
                  textAlign: 'center',
                  color: '#64748b',
                  border: '1px solid #e2e8f0',
                }}
              >
                <Coins size={36} color="#94a3b8" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1e293b' }}>
                  Tidak Ada Transaksi Ditemukan
                </div>
                <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: '4px 0 16px' }}>
                  Tidak ada data yang cocok dengan kriteria filter pencarian.
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenAddTrx('IN')}
                  className="btn-primary"
                  style={{ display: 'inline-flex', padding: '8px 16px', fontSize: '0.8rem' }}
                >
                  <Plus size={15} />
                  <span>+ Tambah Transaksi Sekarang</span>
                </button>
              </div>
            ) : (
              filteredTransaksi.map((trx) => (
                <div
                  key={trx.id}
                  style={{
                    background: '#ffffff',
                    padding: 14,
                    borderRadius: 14,
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, paddingRight: 8 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>
                        {trx.keterangan}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                        <span
                          style={{
                            background: trx.tipe === 'IN' ? '#ecfdf5' : '#fef2f2',
                            color: trx.tipe === 'IN' ? '#047857' : '#b91c1c',
                            padding: '2px 8px',
                            borderRadius: 6,
                            fontWeight: 800,
                          }}
                        >
                          {trx.tipe === 'IN' ? '▲ Masuk' : '▼ Keluar'}
                        </span>
                        <span style={{ fontWeight: 600, color: '#334155' }}>
                          {trx.kategoriNama}
                        </span>
                        <span>•</span>
                        <span>{new Date(trx.tanggal).toLocaleDateString('id-ID')}</span>
                        {trx.userNama && (
                          <>
                            <span>•</span>
                            <span style={{ color: '#0284c7', fontWeight: 600 }}>
                              Oleh: {trx.userNama}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: '0.96rem',
                        color: trx.tipe === 'IN' ? '#059669' : '#dc2626',
                        textAlign: 'right',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {trx.tipe === 'IN' ? `+ ${formatRupiah(trx.nominal)}` : `- ${formatRupiah(trx.nominal)}`}
                    </div>
                  </div>

                  {/* Edit & Delete Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 8,
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: 10,
                      marginTop: 2,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleOpenEditTrx(trx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        borderRadius: 8,
                        padding: '6px 12px',
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        color: '#1d4ed8',
                        cursor: 'pointer',
                      }}
                    >
                      <Edit3 size={13} />
                      <span>Edit Transaksi</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePromptDeleteTrx(trx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: 8,
                        padding: '6px 12px',
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        color: '#dc2626',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={13} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: POS KAS ANGGARAN */}
      {activeTab === 'total' && (
        <div style={{ padding: '0 16px', marginTop: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                Pos Anggaran Kas Masjid ({kategoriKas.length})
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                Total Saldo: <strong>{formatRupiah(totalSaldoPos)}</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={handleOpenAddKat}
              style={{
                background: '#047857',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '8px 14px',
                fontWeight: 800,
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
              }}
            >
              <Plus size={16} />
              <span>+ Pos Kas</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {kategoriKas.map((k) => {
              const posIncome = transaksi
                .filter((t) => t.tipe === 'IN' && t.kategoriId === k.id)
                .reduce((acc, curr) => acc + curr.nominal, 0);
              const posExpense = transaksi
                .filter((t) => t.tipe === 'OUT' && t.kategoriId === k.id)
                .reduce((acc, curr) => acc + curr.nominal, 0);

              return (
                <div
                  key={k.id}
                  style={{
                    background: '#ffffff',
                    padding: 14,
                    borderRadius: 14,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1e293b' }}>
                        {k.nama}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 4 }}>
                        Masuk: <strong style={{ color: '#059669' }}>{formatRupiah(posIncome)}</strong> • Keluar: <strong style={{ color: '#dc2626' }}>{formatRupiah(posExpense)}</strong>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Saldo Terkini</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#059669', marginTop: 1 }}>
                        {formatRupiah(k.saldo)}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 8,
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: 10,
                      marginTop: 10,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleDrillDownCategory(k.id, 'ALL')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: 8,
                        padding: '5px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      <Coins size={13} />
                      <span>Lihat Trx</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEditKat(k)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        borderRadius: 8,
                        padding: '5px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#0284c7',
                        cursor: 'pointer',
                      }}
                    >
                      <Edit3 size={13} />
                      <span>Edit Pos & Saldo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePromptDeleteKat(k)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: 8,
                        padding: '5px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#dc2626',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={13} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL 1: Tambah / Edit Transaksi */}
      {isTrxModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 410 }}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {editingTrx ? <Edit3 size={18} color="#0284c7" /> : <PlusCircle size={18} color="#059669" />}
                <span>{editingTrx ? 'Edit Transaksi Kas' : 'Catat Transaksi Kas Baru'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsTrxModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTrx} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px' }}>
              {/* Tipe Selector: IN / OUT */}
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#334155' }}>
                  Jenis Transaksi
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 }}>
                  <button
                    type="button"
                    onClick={() => setTrxTipe('IN')}
                    style={{
                      padding: '10px',
                      borderRadius: 10,
                      border: trxTipe === 'IN' ? '2.5px solid #059669' : '1px solid #cbd5e1',
                      background: trxTipe === 'IN' ? '#ecfdf5' : '#ffffff',
                      color: trxTipe === 'IN' ? '#047857' : '#64748b',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                    }}
                  >
                    <ArrowUp size={14} />
                    <span>Pemasukan (IN)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrxTipe('OUT')}
                    style={{
                      padding: '10px',
                      borderRadius: 10,
                      border: trxTipe === 'OUT' ? '2.5px solid #dc2626' : '1px solid #cbd5e1',
                      background: trxTipe === 'OUT' ? '#fef2f2' : '#ffffff',
                      color: trxTipe === 'OUT' ? '#b91c1c' : '#64748b',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                    }}
                  >
                    <ArrowDown size={14} />
                    <span>Pengeluaran (OUT)</span>
                  </button>
                </div>
              </div>

              {/* Pos Anggaran Dropdown */}
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#334155' }}>
                  Pos Anggaran Kas
                </label>
                <select
                  value={trxKategoriId}
                  onChange={(e) => setTrxKategoriId(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '9px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                    fontWeight: 600,
                    background: '#ffffff',
                  }}
                >
                  {kategoriKas.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.nama} (Saldo: {formatRupiah(k.saldo)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Nominal with Rupiah Preview & Shortcuts */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#334155' }}>
                    Nominal Transaksi (Rp)
                  </label>
                  {trxNominal && (
                    <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 800 }}>
                      Rp {formatInputRupiah(trxNominal)}
                    </span>
                  )}
                </div>
                <div style={{ position: 'relative', marginTop: 4 }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      color: '#64748b',
                    }}
                  >
                    Rp
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 150.000"
                    value={trxNominal}
                    onChange={(e) => setTrxNominal(formatInputRupiah(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '9px 10px 9px 36px',
                      borderRadius: 8,
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      color: '#0f172a',
                    }}
                  />
                </div>

                {/* Quick Nominal Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
                  {quickNominals.map((nom) => (
                    <button
                      key={nom}
                      type="button"
                      onClick={() => setTrxNominal(new Intl.NumberFormat('id-ID').format(nom))}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: 6,
                        padding: '3px 8px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      +{new Intl.NumberFormat('id-ID').format(nom)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keterangan / Uraian & Quick Suggestion Chips */}
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#334155' }}>
                  Keterangan / Uraian Transaksi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Infaq Kotak Amal Shalat Jumat"
                  value={trxKeterangan}
                  onChange={(e) => setTrxKeterangan(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                />

                {/* Quick Suggestion Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                  {(trxTipe === 'IN' ? quickIncomeTemplates : quickExpenseTemplates).map((tpl) => (
                    <button
                      key={tpl}
                      type="button"
                      onClick={() => setTrxKeterangan(tpl)}
                      style={{
                        background: '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        borderRadius: 6,
                        padding: '2px 8px',
                        fontSize: '0.68rem',
                        color: '#334155',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {tpl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tanggal & Petugas Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#334155' }}>
                    Tanggal Transaksi
                  </label>
                  <input
                    type="date"
                    required
                    value={trxTanggal}
                    onChange={(e) => setTrxTanggal(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8rem',
                      marginTop: 4,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#334155' }}>
                    Petugas / Pencatat
                  </label>
                  <input
                    type="text"
                    value={trxUserNama}
                    onChange={(e) => setTrxUserNama(e.target.value)}
                    placeholder="Nama Petugas"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8rem',
                      marginTop: 4,
                    }}
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsTrxModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '11px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#64748b',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    padding: '11px',
                    fontSize: '0.85rem',
                    background: trxTipe === 'IN' ? '#059669' : '#dc2626',
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>{editingTrx ? 'Simpan Perubahan' : 'Catat Transaksi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Konfirmasi Hapus Transaksi */}
      {isDeleteTrxModalOpen && deletingTrx && (
        <div className="modal-overlay" style={{ zIndex: 130 }}>
          <div className="modal-card" style={{ maxWidth: 380, textAlign: 'center', padding: '24px 20px' }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
              }}
            >
              <AlertTriangle size={28} />
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
              Hapus Catatan Transaksi?
            </h3>

            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 16px', lineHeight: 1.4 }}>
              Apakah Anda yakin ingin menghapus transaksi ini? Saldo pos kas akan disesuaikan kembali secara otomatis.
            </p>

            {/* Transaction Preview Card */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: 12,
                textAlign: 'left',
                marginBottom: 18,
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1e293b' }}>
                {deletingTrx.keterangan}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 2 }}>
                {deletingTrx.kategoriNama} • {new Date(deletingTrx.tanggal).toLocaleDateString('id-ID')}
              </div>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: '1rem',
                  color: deletingTrx.tipe === 'IN' ? '#059669' : '#dc2626',
                  marginTop: 6,
                }}
              >
                {deletingTrx.tipe === 'IN' ? `+ ${formatRupiah(deletingTrx.nominal)}` : `- ${formatRupiah(deletingTrx.nominal)}`}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => {
                  setIsDeleteTrxModalOpen(false);
                  setDeletingTrx(null);
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 10,
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  color: '#64748b',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteTrx}
                style={{
                  flex: 1.5,
                  padding: '10px',
                  borderRadius: 10,
                  border: 'none',
                  background: '#dc2626',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Trash2 size={15} />
                <span>Ya, Hapus</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Tambah / Edit Pos Kas Anggaran */}
      {isKatModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 390 }}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {editingKat ? <Edit3 size={18} color="#0284c7" /> : <PlusCircle size={18} color="#059669" />}
                <span>{editingKat ? 'Edit Pos Kas Anggaran' : 'Tambah Pos Kas Baru'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsKatModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveKat} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px' }}>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#334155' }}>
                  Nama Pos Anggaran Kas
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kas Sosial & Santunan Dhuafa"
                  value={katNama}
                  onChange={(e) => setKatNama(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#334155' }}>
                    Saldo Saat Ini (Rp)
                  </label>
                  {katSaldo && (
                    <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 800 }}>
                      Rp {formatInputRupiah(katSaldo)}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Contoh: 15.000.000"
                  value={katSaldo}
                  onChange={(e) => setKatSaldo(formatInputRupiah(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '9px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    marginTop: 4,
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsKatModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#64748b',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 2, justifyContent: 'center', padding: '10px', fontSize: '0.82rem' }}
                >
                  <CheckCircle2 size={16} />
                  <span>{editingKat ? 'Perbarui Pos' : 'Simpan Pos Kas'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Konfirmasi Hapus Pos Kas */}
      {isDeleteKatModalOpen && deletingKat && (
        <div className="modal-overlay" style={{ zIndex: 130 }}>
          <div className="modal-card" style={{ maxWidth: 380, textAlign: 'center', padding: '24px 20px' }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
              }}
            >
              <AlertTriangle size={28} />
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
              Hapus Pos Kas Anggaran?
            </h3>

            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 16px', lineHeight: 1.4 }}>
              Apakah Anda yakin ingin menghapus pos anggaran kas <strong>"{deletingKat.nama}"</strong> (Saldo: {formatRupiah(deletingKat.saldo)})?
            </p>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => {
                  setIsDeleteKatModalOpen(false);
                  setDeletingKat(null);
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 10,
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  color: '#64748b',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteKat}
                style={{
                  flex: 1.5,
                  padding: '10px',
                  borderRadius: 10,
                  border: 'none',
                  background: '#dc2626',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Trash2 size={15} />
                <span>Ya, Hapus Pos</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Ubah Saldo Awal */}
      {isSaldoAwalModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 380 }}>
            <div className="modal-header">
              <h3 className="modal-title">Ubah Saldo Awal Periode</h3>
              <button
                type="button"
                onClick={() => setIsSaldoAwalModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSaldoAwal} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px' }}>
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 800, color: '#334155' }}>
                  Saldo Awal Kas Masjid (Rp)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 10.000.000"
                  value={tempSaldoAwal}
                  onChange={(e) => setTempSaldoAwal(formatInputRupiah(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 8,
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    marginTop: 4,
                  }}
                />
                <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 4 }}>
                  Saldo awal ini akan ditambahkan ke saldo akhir bersih pada laporan keuangan.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsSaldoAwalModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#64748b',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1.5, justifyContent: 'center', padding: '10px', fontSize: '0.82rem' }}
                >
                  <CheckCircle2 size={16} />
                  <span>Simpan Saldo Awal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
