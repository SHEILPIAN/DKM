'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  HeartHandshake,
  PlusCircle,
  PackageCheck,
  CheckCircle2,
  Phone,
  QrCode,
  Share2,
  Plus,
  Edit3,
  Trash2,
  Search,
  X,
  SlidersHorizontal,
  Users,
  BadgePercent,
} from 'lucide-react';
import { Mustahiq, KategoriAsnaf } from '@/types/dkm';
import { formatRupiah } from '@/lib/utils';

interface MaslamZiswafProps {
  onBack: () => void;
  onOpenZakatModal: () => void;
  mustahiqList: Mustahiq[];
  onToggleDistribute: (id: number) => void;
  stokBerasKg: number;
  danaZakatRp: number;
  onAddMustahiq?: (m: Omit<Mustahiq, 'id'>) => void;
  onUpdateMustahiq?: (m: Mustahiq) => void;
  onDeleteMustahiq?: (id: number) => void;
  onUpdateStokZiswaf?: (berasKg: number, danaRp: number) => void;
}

const ASNAF_CATEGORIES: KategoriAsnaf[] = [
  'FAKIR',
  'MISKIN',
  'AMIL',
  'MUALAF',
  'GHARIM',
  'FISABILILLAH',
  'IBNUSABIL',
];

export const MaslamZiswaf: React.FC<MaslamZiswafProps> = ({
  onBack,
  onOpenZakatModal,
  mustahiqList,
  onToggleDistribute,
  stokBerasKg,
  danaZakatRp,
  onAddMustahiq,
  onUpdateMustahiq,
  onDeleteMustahiq,
  onUpdateStokZiswaf,
}) => {
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsnaf, setSelectedAsnaf] = useState<string>('SEMUA');
  const [filterBelumSalur, setFilterBelumSalur] = useState<boolean>(false);

  // Modals
  const [isMustahiqModalOpen, setIsMustahiqModalOpen] = useState(false);
  const [editingMustahiq, setEditingMustahiq] = useState<Mustahiq | null>(null);

  const [isStokModalOpen, setIsStokModalOpen] = useState(false);
  const [formBeras, setFormBeras] = useState<number>(stokBerasKg);
  const [formDana, setFormDana] = useState<number>(danaZakatRp);

  // Form State Mustahiq
  const [formNama, setFormNama] = useState('');
  const [formAlamat, setFormAlamat] = useState('');
  const [formKategori, setFormKategori] = useState<KategoriAsnaf>('FAKIR');
  const [formTanggungan, setFormTanggungan] = useState<number>(3);
  const [formVerified, setFormVerified] = useState<boolean>(true);
  const [formDistribusi, setFormDistribusi] = useState<'BELUM' | 'SUDAH'>('BELUM');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const sudahDistribusiCount = mustahiqList.filter((m) => m.statusDistribusi === 'SUDAH').length;

  // -------------------------------------------------------------
  // HANDLERS: MUSTAHIQ
  // -------------------------------------------------------------
  const handleOpenAddMustahiq = () => {
    setEditingMustahiq(null);
    setFormNama('');
    setFormAlamat('Jl. Maskoki Raya RT 02/RW 08');
    setFormKategori('FAKIR');
    setFormTanggungan(3);
    setFormVerified(true);
    setFormDistribusi('BELUM');
    setIsMustahiqModalOpen(true);
  };

  const handleOpenEditMustahiq = (m: Mustahiq) => {
    setEditingMustahiq(m);
    setFormNama(m.nama);
    setFormAlamat(m.alamat);
    setFormKategori(m.kategori);
    setFormTanggungan(m.jumlahTanggungan || 1);
    setFormVerified(m.status);
    setFormDistribusi(m.statusDistribusi || 'BELUM');
    setIsMustahiqModalOpen(true);
  };

  const handleSaveMustahiq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNama.trim()) {
      alert('Nama Mustahiq wajib diisi!');
      return;
    }

    if (editingMustahiq) {
      // Edit
      const updated: Mustahiq = {
        ...editingMustahiq,
        nama: formNama.trim(),
        alamat: formAlamat.trim(),
        kategori: formKategori,
        jumlahTanggungan: Number(formTanggungan) || 1,
        status: formVerified,
        statusDistribusi: formDistribusi,
      };

      if (onUpdateMustahiq) onUpdateMustahiq(updated);
      showToast('Data mustahiq berhasil diperbarui!');
    } else {
      // Tambah Baru
      if (onAddMustahiq) {
        onAddMustahiq({
          nama: formNama.trim(),
          alamat: formAlamat.trim() || 'Kayuringin Jaya',
          kategori: formKategori,
          jumlahTanggungan: Number(formTanggungan) || 1,
          status: formVerified,
          statusDistribusi: formDistribusi,
        });
      }
      showToast('Mustahiq baru berhasil ditambahkan!');
    }

    setIsMustahiqModalOpen(false);
  };

  const handleDeleteMustahiqItem = (id: number, nama: string) => {
    if (window.confirm(`Yakin ingin menghapus data mustahiq "${nama}"?`)) {
      if (onDeleteMustahiq) onDeleteMustahiq(id);
      showToast('Mustahiq berhasil dihapus.');
    }
  };

  // -------------------------------------------------------------
  // HANDLERS: STOK ZISWAF
  // -------------------------------------------------------------
  const handleOpenEditStok = () => {
    setFormBeras(stokBerasKg);
    setFormDana(danaZakatRp);
    setIsStokModalOpen(true);
  };

  const handleSaveStok = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateStokZiswaf) {
      onUpdateStokZiswaf(Number(formBeras) || 0, Number(formDana) || 0);
    }
    setIsStokModalOpen(false);
    showToast('Saldo dan stok ZISWAF berhasil diperbarui!');
  };

  // Filtered List
  const filteredMustahiq = mustahiqList.filter((m) => {
    const matchAsnaf = selectedAsnaf === 'SEMUA' || m.kategori === selectedAsnaf;
    const matchSearch =
      m.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.alamat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.kategori.toLowerCase().includes(searchQuery.toLowerCase());
    const matchBelum = filterBelumSalur ? m.statusDistribusi !== 'SUDAH' : true;
    return matchAsnaf && matchSearch && matchBelum;
  });

  const getAsnafColor = (cat: KategoriAsnaf) => {
    switch (cat) {
      case 'FAKIR':
        return { bg: '#fee2e2', text: '#b91c1c', border: '#fecaca' };
      case 'MISKIN':
        return { bg: '#ffedd5', text: '#c2410c', border: '#fed7aa' };
      case 'AMIL':
        return { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd' };
      case 'MUALAF':
        return { bg: '#fdf4ff', text: '#a21caf', border: '#f5d0fe' };
      case 'GHARIM':
        return { bg: '#fef9c3', text: '#a16207', border: '#fef08a' };
      case 'FISABILILLAH':
        return { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' };
      case 'IBNUSABIL':
        return { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' };
      default:
        return { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' };
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              background: '#0f172a',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: 30,
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.84rem',
              fontWeight: 600,
              border: '1px solid #334155',
            }}
          >
            <CheckCircle2 size={16} color="#10b981" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)',
          color: 'white',
          padding: '10px 14px 12px', position: 'sticky', top: 0, zIndex: 30,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
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
            <span>ZISWAF DKM</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAddMustahiq}
            style={{
              background: 'rgba(255, 255, 255, 0.22)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              color: 'white',
              borderRadius: 10,
              padding: '7px 12px',
              fontSize: '0.76rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Plus size={15} />
            <span>+ Mustahiq</span>
          </button>
        </div>

        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
            Zakat, Infaq & Waqaf
          </h2>
          <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
            AL-MUHAJIRIN KAYURINGIN BEKASI
          </p>
        </div>
      </div>

      {/* Stock Cards with Edit Option */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          padding: '16px 16px 10px',
        }}
      >
        {/* Stok Beras */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #bbf7d0',
            padding: '14px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534' }}>
              🌾 Stok Beras Zakat
            </div>
            <button
              type="button"
              onClick={handleOpenEditStok}
              title="Edit Saldo/Stok"
              style={{
                background: 'none',
                border: 'none',
                color: '#166534',
                cursor: 'pointer',
                padding: 2,
              }}
            >
              <Edit3 size={13} />
            </button>
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#064e3b', marginTop: 4 }}>
            {stokBerasKg.toFixed(1)} <span style={{ fontSize: '0.85rem' }}>Kg</span>
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>
            Tersedia untuk 8 Asnaf
          </div>
        </div>

        {/* Dana Zakat */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #fed7aa',
            padding: '14px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9a3412' }}>
              💰 Dana Zakat Tunai
            </div>
            <button
              type="button"
              onClick={handleOpenEditStok}
              title="Edit Saldo/Stok"
              style={{
                background: 'none',
                border: 'none',
                color: '#9a3412',
                cursor: 'pointer',
                padding: 2,
              }}
            >
              <Edit3 size={13} />
            </button>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#c2410c', marginTop: 4 }}>
            {formatRupiah(danaZakatRp)}
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2 }}>
            Kas Khusus ZISWAF
          </div>
        </div>
      </div>

      {/* Action Buttons: Input Penerimaan Zakat */}
      <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          type="button"
          onClick={onOpenZakatModal}
          className="btn-primary"
          style={{
            width: '100%',
            justifyContent: 'center',
            padding: '12px',
            fontSize: '0.88rem',
            background: '#059669',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
          }}
        >
          <PlusCircle size={18} />
          <span>+ Input Penerimaan Zakat & Kupon Digital</span>
        </button>
      </div>

      {/* Search & Filter Asnaf */}
      <div style={{ padding: '0 16px 8px' }}>
        {/* Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#ffffff',
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            padding: '8px 12px',
            gap: 8,
            boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
            marginBottom: 10,
          }}
        >
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Cari nama mustahiq, RT, atau kategori Asnaf..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '0.82rem',
              color: '#0f172a',
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Filter Asnaf Chips */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 6 }}>
          {['SEMUA', ...ASNAF_CATEGORIES].map((asnaf) => {
            const isActive = selectedAsnaf === asnaf;
            return (
              <button
                key={asnaf}
                type="button"
                onClick={() => setSelectedAsnaf(asnaf)}
                style={{
                  background: isActive ? '#059669' : '#ffffff',
                  color: isActive ? '#ffffff' : '#64748b',
                  border: isActive ? '1px solid #059669' : '1px solid #e2e8f0',
                  borderRadius: 20,
                  padding: '4px 12px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {asnaf}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mustahiq Directory */}
      <div style={{ padding: '4px 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>
              Database Mustahiq ({filteredMustahiq.length})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              type="button"
              onClick={() => setFilterBelumSalur(!filterBelumSalur)}
              style={{
                background: filterBelumSalur ? '#fff7ed' : '#f8fafc',
                border: `1px solid ${filterBelumSalur ? '#ea580c' : '#cbd5e1'}`,
                color: filterBelumSalur ? '#c2410c' : '#64748b',
                padding: '4px 8px',
                borderRadius: 8,
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {filterBelumSalur ? '✓ Belum Diserahkan' : 'Belum Salur'}
            </button>

            <button
              type="button"
              onClick={handleOpenAddMustahiq}
              style={{
                background: '#059669',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: 8,
                fontSize: '0.72rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
              }}
            >
              <Plus size={13} />
              <span>Tambah</span>
            </button>
          </div>
        </div>

        {/* List of Mustahiq Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredMustahiq.map((m) => {
            const isSudah = m.statusDistribusi === 'SUDAH';
            const asnafStyle = getAsnafColor(m.kategori);

            return (
              <div
                key={m.id}
                style={{
                  background: isSudah ? '#f0fdf4' : '#ffffff',
                  borderRadius: 14,
                  border: isSudah ? '1px solid #86efac' : '1px solid #e2e8f0',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{ flex: 1, minWidth: 0, paddingRight: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>
                      {m.nama}
                    </span>
                    <span
                      style={{
                        background: asnafStyle.bg,
                        color: asnafStyle.text,
                        border: `1px solid ${asnafStyle.border}`,
                        fontSize: '0.64rem',
                        fontWeight: 800,
                        padding: '1px 7px',
                        borderRadius: 999,
                      }}
                    >
                      {m.kategori}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                    {m.alamat} • Tanggungan: {m.jumlahTanggungan || 1} Jiwa
                  </div>

                  <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700, marginTop: 3 }}>
                    Hak Paket: {((m.jumlahTanggungan || 1) * 2.5).toFixed(1)} Kg Beras / Rp {((m.jumlahTanggungan || 1) * 50000).toLocaleString('id-ID')}
                  </div>
                </div>

                {/* Actions: Toggle Distribute, Edit, Delete */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => onToggleDistribute(m.id)}
                    style={{
                      background: isSudah ? '#10b981' : '#f1f5f9',
                      color: isSudah ? '#ffffff' : '#475569',
                      border: isSudah ? 'none' : '1px solid #cbd5e1',
                      padding: '6px 10px',
                      borderRadius: 8,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    {isSudah ? (
                      <>
                        <CheckCircle2 size={13} />
                        <span>Tersalurkan</span>
                      </>
                    ) : (
                      <span>Serahkan</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEditMustahiq(m)}
                    title="Edit Data Mustahiq"
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      color: '#334155',
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Edit3 size={13} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteMustahiqItem(m.id, m.nama)}
                    title="Hapus Mustahiq"
                    style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}

          {filteredMustahiq.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '30px 20px',
                background: '#ffffff',
                borderRadius: 14,
                border: '1px dashed #cbd5e1',
                color: '#94a3b8',
                fontSize: '0.84rem',
              }}
            >
              Data mustahiq tidak ditemukan. Klik tombol <strong>+ Tambah Mustahiq</strong> di atas.
            </div>
          )}
        </div>
      </div>

      {/* ======================================================= */}
      {/* MODAL 1: TAMBAH / EDIT DATA MUSTAHIQ                    */}
      {/* ======================================================= */}
      <AnimatePresence>
        {isMustahiqModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
            onClick={() => setIsMustahiqModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#ffffff',
                borderRadius: 20,
                width: '100%',
                maxWidth: 440,
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#f8fafc',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <HeartHandshake size={18} color="#059669" />
                  <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>
                    {editingMustahiq ? 'Edit Data Mustahiq' : 'Tambah Mustahiq Baru'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMustahiqModalOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveMustahiq} style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Nama Mustahiq */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Nama Lengkap Mustahiq *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Pak Salim (62 th)"
                      value={formNama}
                      onChange={(e) => setFormNama(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                      }}
                    />
                  </div>

                  {/* Kategori 8 Asnaf */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Kategori 8 Asnaf *
                    </label>
                    <select
                      value={formKategori}
                      onChange={(e) => setFormKategori(e.target.value as KategoriAsnaf)}
                      style={{
                        width: '100%',
                        padding: '9px 10px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        background: '#ffffff',
                        fontWeight: 700,
                        color: '#0f172a',
                      }}
                    >
                      {ASNAF_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Alamat */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Alamat / RT RW Domisili
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Jl. Melati No. 12, RT 01/RW 03"
                      value={formAlamat}
                      onChange={(e) => setFormAlamat(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  {/* Jumlah Tanggungan Jiwa */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Jumlah Tanggungan Jiwa Keluarga
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={15}
                      value={formTanggungan}
                      onChange={(e) => setFormTanggungan(Number(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                    <div style={{ fontSize: '0.7rem', color: '#059669', marginTop: 4, fontWeight: 600 }}>
                      Estimasi Hak Paket: {(formTanggungan * 2.5).toFixed(1)} Kg Beras Fitrah
                    </div>
                  </div>

                  {/* Status Penyaluran & Verifikasi */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', fontWeight: 600, color: '#1e293b', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formVerified}
                        onChange={(e) => setFormVerified(e.target.checked)}
                        style={{ width: 16, height: 16 }}
                      />
                      <span>Tervalidasi & Memenuhi Syarat RT / RW</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', fontWeight: 600, color: '#1e293b', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formDistribusi === 'SUDAH'}
                        onChange={(e) => setFormDistribusi(e.target.checked ? 'SUDAH' : 'BELUM')}
                        style={{ width: 16, height: 16 }}
                      />
                      <span>Tandai Sudah Menerima Paket Zakat</span>
                    </label>
                  </div>

                  {/* Submit Buttons */}
                  <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                    <button
                      type="button"
                      onClick={() => setIsMustahiqModalOpen(false)}
                      style={{
                        flex: 1,
                        padding: '11px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        color: '#64748b',
                      }}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      style={{
                        flex: 2,
                        padding: '11px',
                        borderRadius: 10,
                        border: 'none',
                        background: '#059669',
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                      }}
                    >
                      {editingMustahiq ? 'Simpan Perubahan' : 'Tambah Mustahiq'}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================= */}
      {/* MODAL 2: EDIT SALDO & STOK ZISWAF                       */}
      {/* ======================================================= */}
      <AnimatePresence>
        {isStokModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
            onClick={() => setIsStokModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#ffffff',
                borderRadius: 20,
                width: '100%',
                maxWidth: 400,
                padding: '20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>
                  Penyesuaian Saldo & Stok ZISWAF
                </span>
                <button
                  type="button"
                  onClick={() => setIsStokModalOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveStok} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                    Stok Beras Zakat Fitrah (Kg)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    required
                    value={formBeras}
                    onChange={(e) => setFormBeras(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: 10,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: '#064e3b',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                    Dana Zakat Tunai (Rp)
                  </label>
                  <input
                    type="number"
                    step={100000}
                    required
                    value={formDana}
                    onChange={(e) => setFormDana(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: 10,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: '#c2410c',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                  <button
                    type="button"
                    onClick={() => setIsStokModalOpen(false)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 10,
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      color: '#64748b',
                    }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 10,
                      border: 'none',
                      background: '#059669',
                      color: 'white',
                      fontSize: '0.84rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    Simpan Stok
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
