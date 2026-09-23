'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Plus,
  Edit3,
  Trash2,
  Share2,
  Search,
  CheckCircle2,
  X,
  UserCheck,
  Phone,
  BookOpen,
} from 'lucide-react';
import { Kegiatan } from '@/types/dkm';
import { INITIAL_KEGIATAN } from '@/lib/mockData';

interface MaslamKegiatanProps {
  onBack: () => void;
  kegiatanList?: Kegiatan[];
  onAddKegiatan?: (k: Omit<Kegiatan, 'id'>) => void;
  onUpdateKegiatan?: (k: Kegiatan) => void;
  onDeleteKegiatan?: (id: number) => void;
}

const CATEGORY_OPTIONS = [
  'RUTIN MINGGUAN',
  'MUSLIMAH',
  'REMAJA',
  'SHALAT JUMAT',
  'TEMATIK',
  'SOSIAL',
  'HARI BESAR ISLAM',
];

const PRESET_LOCATIONS = [
  'Ruang Utama AL-Muhajirin',
  'Aula Serbaguna Lantai 2',
  'Serambi Timur AL-Muhajirin',
  'Halaman Depan Masjid',
  'Ruang Rapat DKM',
];

export const MaslamKegiatan: React.FC<MaslamKegiatanProps> = ({
  onBack,
  kegiatanList: externalKegiatanList,
  onAddKegiatan,
  onUpdateKegiatan,
  onDeleteKegiatan,
}) => {
  const [list, setList] = useState<Kegiatan[]>(
    externalKegiatanList || INITIAL_KEGIATAN
  );

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('SEMUA');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingKegiatan, setEditingKegiatan] = useState<Kegiatan | null>(null);

  // Form states
  const [formJudul, setFormJudul] = useState<string>('');
  const [formNarasumber, setFormNarasumber] = useState<string>('');
  const [formWaktu, setFormWaktu] = useState<string>('');
  const [formLokasi, setFormLokasi] = useState<string>('Ruang Utama AL-Muhajirin');
  const [formKategori, setFormKategori] = useState<string>('RUTIN MINGGUAN');
  const [formDeskripsi, setFormDeskripsi] = useState<string>('');
  const [formKontakPIC, setFormKontakPIC] = useState<string>('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // -------------------------------------------------------------
  // HANDLERS
  // -------------------------------------------------------------
  const handleOpenAdd = () => {
    setEditingKegiatan(null);
    setFormJudul('');
    setFormNarasumber('');
    setFormWaktu('');
    setFormLokasi('Ruang Utama AL-Muhajirin');
    setFormKategori('RUTIN MINGGUAN');
    setFormDeskripsi('');
    setFormKontakPIC('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (kg: Kegiatan) => {
    setEditingKegiatan(kg);
    setFormJudul(kg.judul);
    setFormNarasumber(kg.narasumber);
    setFormWaktu(kg.waktu);
    setFormLokasi(kg.lokasi);
    setFormKategori(kg.kategori);
    setFormDeskripsi(kg.deskripsi || '');
    setFormKontakPIC(kg.kontakPIC || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formJudul.trim() || !formNarasumber.trim() || !formWaktu.trim()) {
      alert('Judul, Narasumber, dan Waktu kegiatan wajib diisi!');
      return;
    }

    if (editingKegiatan) {
      // Edit
      const updated: Kegiatan = {
        ...editingKegiatan,
        judul: formJudul.trim(),
        narasumber: formNarasumber.trim(),
        waktu: formWaktu.trim(),
        lokasi: formLokasi.trim(),
        kategori: formKategori,
        deskripsi: formDeskripsi.trim() || undefined,
        kontakPIC: formKontakPIC.trim() || undefined,
      };

      setList((prev) => prev.map((k) => (k.id === updated.id ? updated : k)));
      if (onUpdateKegiatan) onUpdateKegiatan(updated);
      showToast('Jadwal kegiatan berhasil diperbarui!');
    } else {
      // Tambah baru
      const newItem: Kegiatan = {
        id: Date.now(),
        judul: formJudul.trim(),
        narasumber: formNarasumber.trim(),
        waktu: formWaktu.trim(),
        lokasi: formLokasi.trim(),
        kategori: formKategori,
        deskripsi: formDeskripsi.trim() || undefined,
        kontakPIC: formKontakPIC.trim() || undefined,
      };

      setList((prev) => [newItem, ...prev]);
      if (onAddKegiatan) onAddKegiatan(newItem);
      showToast('Kegiatan baru berhasil ditambahkan!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number, judul: string) => {
    if (window.confirm(`Yakin ingin menghapus kegiatan "${judul}"?`)) {
      setList((prev) => prev.filter((k) => k.id !== id));
      if (onDeleteKegiatan) onDeleteKegiatan(id);
      showToast('Kegiatan berhasil dihapus.');
    }
  };

  const handleShareBroadcast = (kg: Kegiatan) => {
    const text = `📢 *INFO KAJIAN & KEGIATAN AL-MUHAJIRIN*\n\n` +
      `📖 *${kg.judul}*\n` +
      `🎙️ Narasumber: *${kg.narasumber}*\n` +
      `⏰ Waktu: ${kg.waktu}\n` +
      `📍 Tempat: ${kg.lokasi}\n` +
      (kg.deskripsi ? `📝 Catatan: ${kg.deskripsi}\n` : '') +
      (kg.kontakPIC ? `📞 Kontak: ${kg.kontakPIC}\n\n` : '\n') +
      `_Mari ajak keluarga dan sanak saudara hadir memakmurkan majelis ilmu. Barakallahu Fiikum._`;

    navigator.clipboard?.writeText(text);
    showToast('Teks broadcast WhatsApp berhasil disalin!');
  };

  // Filtered List
  const filteredList = list.filter((kg) => {
    const matchCat =
      selectedCategory === 'SEMUA' || kg.kategori === selectedCategory;
    const matchSearch =
      kg.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kg.narasumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kg.lokasi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'RUTIN MINGGUAN':
        return { bg: '#ffe4e6', text: '#e11d48', border: '#fecdd3' };
      case 'MUSLIMAH':
        return { bg: '#fdf4ff', text: '#c026d3', border: '#f5d0fe' };
      case 'REMAJA':
        return { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' };
      case 'SHALAT JUMAT':
        return { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' };
      case 'TEMATIK':
        return { bg: '#fefce8', text: '#ca8a04', border: '#fef08a' };
      case 'SOSIAL':
        return { bg: '#fff7ed', text: '#ea580c', border: '#fed7aa' };
      default:
        return { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' };
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
          background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
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
            <span>Agenda & Kegiatan</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
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
            <span>+ Tambah Kegiatan</span>
          </button>
        </div>

        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
            Jadwal Kegiatan & Kajian
          </h2>
          <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
            AL-MUHAJIRIN KAYURINGIN BEKASI
          </p>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div style={{ padding: '14px 16px 6px' }}>
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
            placeholder="Cari kajian, penceramah, atau tempat..."
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

        {/* Horizontal Category Chips */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            overflowX: 'auto',
            paddingBottom: 6,
            scrollbarWidth: 'none',
          }}
        >
          {['SEMUA', ...CATEGORY_OPTIONS].map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: isActive ? '#e11d48' : '#ffffff',
                  color: isActive ? '#ffffff' : '#64748b',
                  border: isActive ? '1px solid #e11d48' : '1px solid #e2e8f0',
                  borderRadius: 20,
                  padding: '5px 12px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 2px 6px rgba(225, 29, 72, 0.3)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* List of Kegiatan */}
      <div style={{ padding: '8px 16px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a' }}>
            Daftar Agenda ({filteredList.length})
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredList.map((kg) => {
            const catStyle = getCategoryColor(kg.kategori);
            return (
              <div
                key={kg.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  border: '1px solid #e2e8f0',
                  padding: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  position: 'relative',
                }}
              >
                {/* Header Card: Category & Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span
                    style={{
                      background: catStyle.bg,
                      color: catStyle.text,
                      border: `1px solid ${catStyle.border}`,
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '3px 9px',
                      borderRadius: 999,
                      letterSpacing: '0.3px',
                    }}
                  >
                    {kg.kategori}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => handleShareBroadcast(kg)}
                      title="Salin Broadcast WhatsApp"
                      style={{
                        background: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        color: '#16a34a',
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Share2 size={13} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(kg)}
                      title="Edit Kegiatan"
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
                      onClick={() => handleDelete(kg.id, kg.judul)}
                      title="Hapus Kegiatan"
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

                {/* Judul */}
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 6px' }}>
                  {kg.judul}
                </h4>

                {/* Narasumber */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#475569', marginBottom: 8 }}>
                  <UserCheck size={14} color="#e11d48" />
                  <span>
                    Narasumber: <strong style={{ color: '#0f172a' }}>{kg.narasumber}</strong>
                  </span>
                </div>

                {/* Deskripsi */}
                {kg.deskripsi && (
                  <p style={{ fontSize: '0.74rem', color: '#64748b', margin: '0 0 10px', lineHeight: 1.4 }}>
                    {kg.deskripsi}
                  </p>
                )}

                {/* Waktu & Lokasi Grid */}
                <div
                  style={{
                    background: '#f8fafc',
                    borderRadius: 10,
                    padding: '8px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    fontSize: '0.74rem',
                    color: '#334155',
                    border: '1px solid #f1f5f9',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={14} style={{ color: '#e11d48', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600 }}>{kg.waktu}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={14} style={{ color: '#e11d48', flexShrink: 0 }} />
                    <span>{kg.lokasi}</span>
                  </div>
                  {kg.kontakPIC && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0369a1' }}>
                      <Phone size={13} style={{ flexShrink: 0 }} />
                      <span>PIC: {kg.kontakPIC}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {filteredList.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '30px 20px',
                background: '#ffffff',
                borderRadius: 16,
                border: '1px dashed #cbd5e1',
                color: '#94a3b8',
                fontSize: '0.84rem',
              }}
            >
              Tidak ada kegiatan ditemukan. Klik tombol <strong>+ Tambah Kegiatan</strong> di atas.
            </div>
          )}
        </div>
      </div>

      {/* ======================================================= */}
      {/* MODAL: TAMBAH / EDIT KEGIATAN                           */}
      {/* ======================================================= */}
      <AnimatePresence>
        {isModalOpen && (
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
            onClick={() => setIsModalOpen(false)}
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
                  <Calendar size={18} color="#e11d48" />
                  <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>
                    {editingKegiatan ? 'Edit Jadwal Kegiatan' : 'Tambah Kegiatan Baru'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Judul Kegiatan */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Judul Agenda / Kajian
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Kajian Fiqih Muamalah Ahad Pagi"
                      value={formJudul}
                      onChange={(e) => setFormJudul(e.target.value)}
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

                  {/* Kategori */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Kategori Kegiatan
                    </label>
                    <select
                      value={formKategori}
                      onChange={(e) => setFormKategori(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        background: '#ffffff',
                        fontWeight: 600,
                        color: '#0f172a',
                      }}
                    >
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Narasumber */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Narasumber / Penceramah / Instruktur
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ustadz M. Syakir, Lc."
                      value={formNarasumber}
                      onChange={(e) => setFormNarasumber(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  {/* Waktu */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Jadwal / Waktu Pelaksanaan
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Setiap Ahad Pagi, Ba'da Subuh - 07.00 WIB"
                      value={formWaktu}
                      onChange={(e) => setFormWaktu(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  {/* Lokasi */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Lokasi di Lingkungan Masjid
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ruang Utama AL-Muhajirin"
                      value={formLokasi}
                      onChange={(e) => setFormLokasi(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
                      {PRESET_LOCATIONS.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setFormLokasi(loc)}
                          style={{
                            background: formLokasi === loc ? '#e11d48' : '#f1f5f9',
                            color: formLokasi === loc ? '#ffffff' : '#475569',
                            border: 'none',
                            borderRadius: 6,
                            padding: '3px 7px',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deskripsi */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Catatan / Deskripsi Acara (Opsional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Materi kajian, syarat peserta, atau info sarapan gratis..."
                      value={formDeskripsi}
                      onChange={(e) => setFormDeskripsi(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        resize: 'none',
                      }}
                    />
                  </div>

                  {/* Kontak PIC */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      No. WhatsApp PIC Panitia (Opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 0812-3456-7890 (Akhi Fian)"
                      value={formKontakPIC}
                      onChange={(e) => setFormKontakPIC(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  {/* Submit & Cancel */}
                  <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
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
                        background: '#e11d48',
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)',
                      }}
                    >
                      {editingKegiatan ? 'Simpan Perubahan' : 'Tambah Kegiatan'}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
