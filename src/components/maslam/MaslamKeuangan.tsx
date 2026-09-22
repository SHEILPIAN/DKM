'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  Filter,
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
} from 'lucide-react';
import { KategoriKas, Transaksi, TipeTrx } from '@/types/dkm';
import { formatRupiah } from '@/components/modules/financial/AnalyticsCards';

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
  const [activeTab, setActiveTab] = useState<'total' | 'detail' | 'ringkasan'>('ringkasan');
  const [selectedPos, setSelectedPos] = useState<string>('ALL');
  const [selectedTipe, setSelectedTipe] = useState<'ALL' | 'IN' | 'OUT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Transaction Modal State
  const [isTrxModalOpen, setIsTrxModalOpen] = useState(false);
  const [editingTrx, setEditingTrx] = useState<Transaksi | null>(null);
  const [trxTipe, setTrxTipe] = useState<TipeTrx>('IN');
  const [trxNominal, setTrxNominal] = useState('');
  const [trxKeterangan, setTrxKeterangan] = useState('');
  const [trxKategoriId, setTrxKategoriId] = useState<number>(kategoriKas[0]?.id || 1);
  const [trxTanggal, setTrxTanggal] = useState(new Date().toISOString().split('T')[0]);

  // Kategori Kas Modal State
  const [isKatModalOpen, setIsKatModalOpen] = useState(false);
  const [editingKat, setEditingKat] = useState<KategoriKas | null>(null);
  const [katNama, setKatNama] = useState('');
  const [katSaldo, setKatSaldo] = useState('');

  // Aggregation
  const totalSaldo = kategoriKas.reduce((acc, curr) => acc + curr.saldo, 0);

  const totalPemasukan = transaksi
    .filter((t) => t.tipe === 'IN')
    .reduce((acc, curr) => acc + curr.nominal, 0);

  const totalPengeluaran = transaksi
    .filter((t) => t.tipe === 'OUT')
    .reduce((acc, curr) => acc + curr.nominal, 0);

  // Dynamic category breakdown based on current transactions
  const pemasukanList = kategoriKas.map((kat) => {
    const total = transaksi
      .filter((t) => t.tipe === 'IN' && t.kategoriId === kat.id)
      .reduce((acc, curr) => acc + curr.nominal, 0);
    return { id: kat.id, nama: kat.nama, nominal: total };
  }).filter((x) => x.nominal > 0);

  const pengeluaranList = kategoriKas.map((kat) => {
    const total = transaksi
      .filter((t) => t.tipe === 'OUT' && t.kategoriId === kat.id)
      .reduce((acc, curr) => acc + curr.nominal, 0);
    return { id: kat.id, nama: kat.nama, nominal: total };
  }).filter((x) => x.nominal > 0);

  // Filtered transactions
  const filteredTransaksi = transaksi.filter((trx) => {
    const matchTipe = selectedTipe === 'ALL' ? true : trx.tipe === selectedTipe;
    const matchPos = selectedPos === 'ALL' ? true : trx.kategoriId === Number(selectedPos);
    const matchSearch =
      trx.keterangan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (trx.kategoriNama && trx.kategoriNama.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchTipe && matchPos && matchSearch;
  });

  // Handlers for Transaction
  const handleOpenAddTrx = () => {
    setEditingTrx(null);
    setTrxTipe('IN');
    setTrxNominal('');
    setTrxKeterangan('');
    setTrxKategoriId(kategoriKas[0]?.id || 1);
    setTrxTanggal(new Date().toISOString().split('T')[0]);
    setIsTrxModalOpen(true);
  };

  const handleOpenEditTrx = (trx: Transaksi) => {
    setEditingTrx(trx);
    setTrxTipe(trx.tipe);
    setTrxNominal(trx.nominal.toString());
    setTrxKeterangan(trx.keterangan);
    setTrxKategoriId(trx.kategoriId);
    setTrxTanggal(trx.tanggal.split('T')[0]);
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
          keterangan: trxKeterangan,
          kategoriId: trxKategoriId,
          kategoriNama: katNama,
          tanggal: new Date(trxTanggal).toISOString(),
        });
      }
    } else {
      if (onAddTransaction) {
        onAddTransaction({
          tipe: trxTipe,
          nominal: nominalNum,
          keterangan: trxKeterangan,
          kategoriId: trxKategoriId,
          kategoriNama: katNama,
          tanggal: new Date(trxTanggal).toISOString(),
          userId: 1,
          userNama: 'Admin DKM',
        });
      }
    }
    setIsTrxModalOpen(false);
  };

  const handleDeleteTrxItem = (id: number) => {
    if (confirm('Yakin ingin menghapus catatan transaksi ini? Saldo kas akan disesuaikan kembali.')) {
      if (onDeleteTransaction) {
        onDeleteTransaction(id);
      }
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
    setKatSaldo(kat.saldo.toString());
    setIsKatModalOpen(true);
  };

  const handleSaveKat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!katNama.trim()) {
      alert('Mohon isi nama pos kas anggaran.');
      return;
    }
    const saldoNum = Number(katSaldo.replace(/\D/g, '')) || 0;

    if (editingKat) {
      if (onUpdateKategoriKas) {
        onUpdateKategoriKas({
          ...editingKat,
          nama: katNama,
          saldo: saldoNum,
        });
      }
    } else {
      if (onAddKategoriKas) {
        onAddKategoriKas({
          nama: katNama,
          saldo: saldoNum,
        });
      }
    }
    setIsKatModalOpen(false);
  };

  const handleDeleteKatItem = (id: number) => {
    if (confirm('Yakin ingin menghapus pos anggaran kas ini?')) {
      if (onDeleteKategoriKas) {
        onDeleteKategoriKas(id);
      }
    }
  };

  return (
    <div style={{ paddingBottom: 90 }}>
      {/* 1. Header */}
      <div className="maslam-sub-header">
        <div className="maslam-header-nav">
          <button type="button" onClick={onBack} className="maslam-back-btn">
            <ChevronLeft size={22} />
            <span>Laporan Keuangan</span>
          </button>
        </div>

        <div className="maslam-page-title-group">
          <h2>Laporan Keuangan</h2>
          <p>AL-MUHAJIRIN KAYURINGIN BEKASI</p>
        </div>
      </div>

      {/* 2. Segmented Tabs: Total | Detail | Ringkasan */}
      <div className="maslam-tabs-row">
        <button
          type="button"
          onClick={() => setActiveTab('total')}
          className={`maslam-tab-pill ${activeTab === 'total' ? 'active' : ''}`}
        >
          Total ({kategoriKas.length} Pos)
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
          onClick={() => setActiveTab('ringkasan')}
          className={`maslam-tab-pill ${activeTab === 'ringkasan' ? 'active' : ''}`}
        >
          Ringkasan
        </button>
      </div>

      {/* 3. Filter Bar (Detail & Ringkasan) */}
      <div className="maslam-filter-row" style={{ flexWrap: 'wrap', gap: 6 }}>
        <button
          type="button"
          className={`maslam-filter-btn ${selectedTipe === 'ALL' ? 'active' : ''}`}
          onClick={() => setSelectedTipe('ALL')}
        >
          (Semua)
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
        {activeTab === 'detail' && (
          <select
            value={selectedPos}
            onChange={(e) => setSelectedPos(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: 999,
              border: '1px solid #cbd5e1',
              fontSize: '0.75rem',
              background: '#ffffff',
              fontWeight: 600,
              color: '#334155',
            }}
          >
            <option value="ALL">Semua Pos Kas</option>
            {kategoriKas.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* TAB 1: RINGKASAN */}
      {activeTab === 'ringkasan' && (
        <>
          {/* Saldo Awal Card */}
          <div className="maslam-saldo-card">
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Saldo Awal</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>
              Rp. 0
            </div>
          </div>

          {/* Saldo Akhir Card */}
          <div className="maslam-saldo-card green-pattern">
            <div style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 700 }}>Saldo Akhir Bersih</div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#064e3b', marginTop: 4 }}>
              {formatRupiah(totalSaldo)}
            </div>
          </div>

          {/* Dual Metric Cards */}
          <div className="maslam-dual-metric-grid">
            <div className="maslam-metric-box">
              <div className="maslam-coin-badge">
                Rp
                <span className="maslam-coin-arrow" style={{ background: '#10b981' }}>
                  <ArrowUp size={10} strokeWidth={3} />
                </span>
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
                Total Pemasukan
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginTop: 3 }}>
                {formatRupiah(totalPemasukan)}
              </div>
            </div>

            <div className="maslam-metric-box">
              <div className="maslam-coin-badge">
                Rp
                <span className="maslam-coin-arrow" style={{ background: '#ef4444' }}>
                  <ArrowDown size={10} strokeWidth={3} />
                </span>
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
                Total Pengeluaran
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginTop: 3 }}>
                {formatRupiah(totalPengeluaran)}
              </div>
            </div>
          </div>

          {/* Sub-total Pemasukan Card List */}
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
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pemasukanList.length === 0 ? (
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' }}>
                  Belum ada transaksi pemasukan tercatat
                </div>
              ) : (
                pemasukanList.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      borderBottom: '1px solid #f1f5f9',
                      paddingBottom: 8,
                    }}
                  >
                    <span style={{ color: '#0369a1', fontWeight: 600 }}>{item.nama}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700, color: '#0f172a' }}>
                      <span>{formatRupiah(item.nominal)}</span>
                      <ChevronRight size={15} style={{ color: '#94a3b8' }} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sub-total Pengeluaran Card List */}
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
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pengeluaranList.length === 0 ? (
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' }}>
                  Belum ada transaksi pengeluaran tercatat
                </div>
              ) : (
                pengeluaranList.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      borderBottom: '1px solid #f1f5f9',
                      paddingBottom: 8,
                    }}
                  >
                    <span style={{ color: '#475569', fontWeight: 600 }}>{item.nama}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700, color: '#dc2626' }}>
                      <span>{formatRupiah(item.nominal)}</span>
                      <ChevronRight size={15} style={{ color: '#94a3b8' }} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* TAB 2: DETAIL TRANSAKSI */}
      {activeTab === 'detail' && (
        <div style={{ padding: '0 16px' }}>
          {/* Search & Add Action Bar */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
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
                placeholder="Cari transaksi atau pos..."
                style={{
                  border: 'none',
                  outline: 'none',
                  padding: '8px 8px',
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
              onClick={handleOpenAddTrx}
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
              <span>Tambah</span>
            </button>
          </div>

          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1e293b', marginBottom: 10 }}>
            Daftar Transaksi ({filteredTransaksi.length} Data)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredTransaksi.length === 0 ? (
              <div
                style={{
                  background: '#ffffff',
                  padding: '24px 16px',
                  borderRadius: 14,
                  textAlign: 'center',
                  color: '#94a3b8',
                  fontSize: '0.8rem',
                  border: '1px solid #e2e8f0',
                }}
              >
                Tidak ada transaksi yang cocok dengan filter.
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
                    boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#0f172a' }}>
                        {trx.keterangan}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 3 }}>
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
                          {trx.tipe === 'IN' ? 'Pemasukan' : 'Pengeluaran'}
                        </span>
                        {trx.kategoriNama} • {new Date(trx.tanggal).toLocaleDateString('id-ID')}
                      </div>
                    </div>

                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: '0.92rem',
                        color: trx.tipe === 'IN' ? '#059669' : '#dc2626',
                        textAlign: 'right',
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
                      paddingTop: 8,
                      marginTop: 2,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleOpenEditTrx(trx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: 8,
                        padding: '4px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#0284c7',
                        cursor: 'pointer',
                      }}
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTrxItem(trx.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        background: '#fef2f2',
                        border: '1px solid #fca5a5',
                        borderRadius: 8,
                        padding: '4px 10px',
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
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: POS KAS ANGGARAN */}
      {activeTab === 'total' && (
        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
              Pos Anggaran Kas Masjid ({kategoriKas.length})
            </div>
            <button
              type="button"
              onClick={handleOpenAddKat}
              style={{
                background: '#047857',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '6px 12px',
                fontWeight: 700,
                fontSize: '0.76rem',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
              }}
            >
              <Plus size={15} />
              <span>+ Pos Kas</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {kategoriKas.map((k) => (
              <div
                key={k.id}
                style={{
                  background: '#ffffff',
                  padding: 14,
                  borderRadius: 14,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#1e293b' }}>
                      {k.nama}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                      Saldo Terkini
                    </div>
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#059669' }}>
                    {formatRupiah(k.saldo)}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: 8,
                    marginTop: 10,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleOpenEditKat(k)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      padding: '4px 10px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#0284c7',
                      cursor: 'pointer',
                    }}
                  >
                    <Edit3 size={13} />
                    <span>Edit Pos / Saldo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteKatItem(k.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      background: '#fef2f2',
                      border: '1px solid #fca5a5',
                      borderRadius: 8,
                      padding: '4px 10px',
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
            ))}
          </div>
        </div>
      )}

      {/* Floating Action Button: + Catat Infaq / Kasir */}
      <div
        style={{
          position: 'fixed',
          bottom: 74,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 410,
          padding: '0 16px',
          zIndex: 35,
        }}
      >
        <button
          type="button"
          onClick={handleOpenAddTrx}
          className="btn-primary"
          style={{
            width: '100%',
            justifyContent: 'center',
            padding: '13px',
            fontSize: '0.92rem',
            boxShadow: '0 8px 20px rgba(5, 150, 105, 0.35)',
          }}
        >
          <PlusCircle size={18} />
          <span>+ Catat Infaq / Pengeluaran Kasir</span>
        </button>
      </div>

      {/* MODAL 1: Tambah / Edit Transaksi */}
      {isTrxModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 410 }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingTrx ? 'Edit Transaksi Kas' : 'Catat Transaksi Kas Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsTrxModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTrx} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Tipe Selector: IN / OUT */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Jenis Transaksi
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 }}>
                  <button
                    type="button"
                    onClick={() => setTrxTipe('IN')}
                    style={{
                      padding: '8px',
                      borderRadius: 10,
                      border: trxTipe === 'IN' ? '2px solid #059669' : '1px solid #cbd5e1',
                      background: trxTipe === 'IN' ? '#ecfdf5' : '#ffffff',
                      color: trxTipe === 'IN' ? '#047857' : '#64748b',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    ▲ Pemasukan (IN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrxTipe('OUT')}
                    style={{
                      padding: '8px',
                      borderRadius: 10,
                      border: trxTipe === 'OUT' ? '2px solid #dc2626' : '1px solid #cbd5e1',
                      background: trxTipe === 'OUT' ? '#fef2f2' : '#ffffff',
                      color: trxTipe === 'OUT' ? '#b91c1c' : '#64748b',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    ▼ Pengeluaran (OUT)
                  </button>
                </div>
              </div>

              {/* Pos Anggaran Dropdown */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Pos Anggaran Kas Tujuan
                </label>
                <select
                  value={trxKategoriId}
                  onChange={(e) => setTrxKategoriId(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                >
                  {kategoriKas.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.nama} (Saldo: {formatRupiah(k.saldo)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Nominal */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Nominal (Rp)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 150000"
                  value={trxNominal}
                  onChange={(e) => setTrxNominal(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    marginTop: 4,
                  }}
                />
              </div>

              {/* Keterangan */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Keterangan / Uraian
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Infaq Kotak Amal Shalat Jumat / Pembelian Karbol"
                  value={trxKeterangan}
                  onChange={(e) => setTrxKeterangan(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                />
              </div>

              {/* Tanggal */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
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
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsTrxModalOpen(false)}
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
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    padding: '10px',
                    fontSize: '0.82rem',
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

      {/* MODAL 2: Tambah / Edit Pos Kas */}
      {isKatModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 390 }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingKat ? 'Edit Pos Kas Anggaran' : 'Tambah Pos Kas Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsKatModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveKat} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Nama Pos Kas Anggaran
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kas Sosial & Santunan Dhuafa"
                  value={katNama}
                  onChange={(e) => setKatNama(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Saldo Saat Ini (Rp)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 15000000"
                  value={katSaldo}
                  onChange={(e) => setKatSaldo(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
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
    </div>
  );
};
