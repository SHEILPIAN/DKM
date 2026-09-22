'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Package,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  Edit3,
  Trash2,
  Search,
  X,
  MapPin,
  Layers,
  Sparkles,
} from 'lucide-react';
import { InventoryItem } from '@/types/dkm';
import { INITIAL_INVENTORY } from '@/lib/mockData';

interface MaslamInventoryProps {
  onBack: () => void;
  inventoryList?: InventoryItem[];
  onAddInventory?: (item: Omit<InventoryItem, 'id'>) => void;
  onUpdateInventory?: (item: InventoryItem) => void;
  onDeleteInventory?: (id: number) => void;
}

const PRESET_KONDISI: ('BAIK' | 'PERLU PERBAIKAN' | 'RUSAK')[] = [
  'BAIK',
  'PERLU PERBAIKAN',
  'RUSAK',
];

const PRESET_LOKASI = [
  'Ruang Utama',
  'Aula Lantai 2',
  'Ruang Sound',
  'Gudang Belakang',
  'Gudang Tenda',
  'Ruang Jenazah',
  'Mimbar & Mihrab',
];

const PRESET_KATEGORI = [
  'Elektronik & Sound',
  'Ibadah & Karpet',
  'Tenda & Outdoor',
  'Perlengkapan & Furnitur',
  'Sosial & Fardhu Kifayah',
  'Elektronik & Kelistrikan',
];

const PRESET_JUMLAH = ['1 Unit', '2 Set', '6 Pcs', '10 Unit', '18 Gulung', '150 Unit'];

export const MaslamInventory: React.FC<MaslamInventoryProps> = ({
  onBack,
  inventoryList: externalList,
  onAddInventory,
  onUpdateInventory,
  onDeleteInventory,
}) => {
  const [list, setList] = useState<InventoryItem[]>(
    externalList || INITIAL_INVENTORY
  );

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKondisi, setSelectedKondisi] = useState<string>('SEMUA');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  // Form State
  const [nama, setNama] = useState('');
  const [jumlah, setJumlah] = useState('1 Unit');
  const [kondisi, setKondisi] = useState<'BAIK' | 'PERLU PERBAIKAN' | 'RUSAK'>('BAIK');
  const [lokasi, setLokasi] = useState('Ruang Utama');
  const [kategori, setKategori] = useState('Ibadah & Karpet');
  const [keterangan, setKeterangan] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Metrics
  const countBaik = list.filter((i) => i.kondisi === 'BAIK').length;
  const countPerbaikan = list.filter((i) => i.kondisi === 'PERLU PERBAIKAN').length;
  const countRusak = list.filter((i) => i.kondisi === 'RUSAK').length;

  // -------------------------------------------------------------
  // HANDLERS
  // -------------------------------------------------------------
  const handleOpenAdd = () => {
    setEditingItem(null);
    setNama('');
    setJumlah('1 Unit');
    setKondisi('BAIK');
    setLokasi('Ruang Utama');
    setKategori('Ibadah & Karpet');
    setKeterangan('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setNama(item.nama);
    setJumlah(item.jumlah);
    setKondisi(item.kondisi);
    setLokasi(item.lokasi);
    setKategori(item.kategori || 'Ibadah & Karpet');
    setKeterangan(item.keterangan || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      alert('Nama barang inventaris wajib diisi!');
      return;
    }

    if (editingItem) {
      // Edit
      const updated: InventoryItem = {
        ...editingItem,
        nama: nama.trim(),
        jumlah: jumlah.trim() || '1 Unit',
        kondisi,
        lokasi: lokasi.trim() || 'Ruang Utama',
        kategori: kategori.trim() || undefined,
        keterangan: keterangan.trim() || undefined,
      };

      setList((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      if (onUpdateInventory) onUpdateInventory(updated);
      showToast('Data barang berhasil diperbarui!');
    } else {
      // Tambah baru
      const newItem: InventoryItem = {
        id: Date.now(),
        nama: nama.trim(),
        jumlah: jumlah.trim() || '1 Unit',
        kondisi,
        lokasi: lokasi.trim() || 'Ruang Utama',
        kategori: kategori.trim() || undefined,
        keterangan: keterangan.trim() || undefined,
      };

      setList((prev) => [newItem, ...prev]);
      if (onAddInventory) onAddInventory(newItem);
      showToast('Barang baru berhasil ditambahkan!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number, namaBarang: string) => {
    if (window.confirm(`Yakin ingin menghapus inventaris "${namaBarang}"?`)) {
      setList((prev) => prev.filter((i) => i.id !== id));
      if (onDeleteInventory) onDeleteInventory(id);
      showToast('Barang berhasil dihapus.');
    }
  };

  // Filtered List
  const filteredList = list.filter((item) => {
    const matchKondisi = selectedKondisi === 'SEMUA' || item.kondisi === selectedKondisi;
    const matchSearch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.kategori && item.kategori.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchKondisi && matchSearch;
  });

  const getKondisiBadge = (k: 'BAIK' | 'PERLU PERBAIKAN' | 'RUSAK') => {
    switch (k) {
      case 'BAIK':
        return { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' };
      case 'PERLU PERBAIKAN':
        return { bg: '#fef9c3', text: '#a16207', border: '#fef08a' };
      case 'RUSAK':
        return { bg: '#fee2e2', text: '#b91c1c', border: '#fecaca' };
      default:
        return { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' };
    }
  };

  return (
    <div style={{ paddingBottom: 85, position: 'relative' }}>
      {/* Toast Notification */}
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
          background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)',
          color: 'white',
          padding: '16px 18px 20px', position: 'sticky', top: 0, zIndex: 30,
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
            <span>Inventaris Masjid</span>
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
            <span>+ Tambah Barang</span>
          </button>
        </div>

        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
            Inventory & Sarpras
          </h2>
          <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
            AL-MUHAJIRIN KAYURINGIN BEKASI
          </p>
        </div>
      </div>

      {/* Top 3 Summary Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
          padding: '14px 16px 6px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: 12,
            border: '1px solid #bbf7d0',
            padding: '10px 8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#15803d' }}>
            Kondisi Baik
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#166534', marginTop: 2 }}>
            {countBaik}
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            borderRadius: 12,
            border: '1px solid #fef08a',
            padding: '10px 8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#a16207' }}>
            Perbaikan
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#854d0e', marginTop: 2 }}>
            {countPerbaikan}
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            borderRadius: 12,
            border: '1px solid #fecaca',
            padding: '10px 8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#b91c1c' }}>
            Rusak
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#991b1b', marginTop: 2 }}>
            {countRusak}
          </div>
        </div>
      </div>

      {/* Search & Filter Chips */}
      <div style={{ padding: '8px 16px 6px' }}>
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
            placeholder="Cari barang, ruangan, atau kategori..."
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

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
          {['SEMUA', 'BAIK', 'PERLU PERBAIKAN', 'RUSAK'].map((kd) => {
            const isActive = selectedKondisi === kd;
            return (
              <button
                key={kd}
                type="button"
                onClick={() => setSelectedKondisi(kd)}
                style={{
                  background: isActive ? '#be185d' : '#ffffff',
                  color: isActive ? '#ffffff' : '#64748b',
                  border: isActive ? '1px solid #be185d' : '1px solid #e2e8f0',
                  borderRadius: 20,
                  padding: '4px 12px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {kd}
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory List of Inventory */}
      <div style={{ padding: '8px 16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
            Daftar Sarana & Prasarana DKM ({filteredList.length})
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            style={{
              background: '#be185d',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredList.map((it) => {
            const badge = getKondisiBadge(it.kondisi);
            return (
              <div
                key={it.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  border: '1px solid #e2e8f0',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{ flex: 1, minWidth: 0, paddingRight: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>
                      {it.nama}
                    </span>
                    <span
                      style={{
                        background: badge.bg,
                        color: badge.text,
                        border: `1px solid ${badge.border}`,
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: 6,
                      }}
                    >
                      {it.kondisi}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 3 }}>
                    Jumlah: <strong style={{ color: '#0f172a' }}>{it.jumlah}</strong> • Lokasi: {it.lokasi}
                  </div>

                  {it.kategori && (
                    <div style={{ fontSize: '0.68rem', color: '#be185d', marginTop: 2, fontWeight: 600 }}>
                      Kategori: {it.kategori}
                    </div>
                  )}

                  {it.keterangan && (
                    <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: 2, fontStyle: 'italic' }}>
                      Catatan: {it.keterangan}
                    </div>
                  )}
                </div>

                {/* Edit & Delete Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(it)}
                    title="Edit Barang"
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
                    onClick={() => handleDelete(it.id, it.nama)}
                    title="Hapus Barang"
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

          {filteredList.length === 0 && (
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
              Tidak ada barang inventaris yang sesuai. Klik tombol <strong>+ Tambah Barang</strong> di atas.
            </div>
          )}
        </div>
      </div>

      {/* ======================================================= */}
      {/* MODAL: TAMBAH / EDIT BARANG INVENTARIS                  */}
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
                  <Package size={18} color="#be185d" />
                  <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>
                    {editingItem ? 'Edit Barang Inventaris' : 'Tambah Barang Baru'}
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

              <form onSubmit={handleSubmit} style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Nama Barang */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Nama Barang / Sarpras *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Genset Silent 5000 Watt"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
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

                  {/* Jumlah & Kondisi */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                        Jumlah / Volume *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: 1 Unit / 10 Pcs"
                        value={jumlah}
                        onChange={(e) => setJumlah(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: 10,
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                        Kondisi Barang *
                      </label>
                      <select
                        value={kondisi}
                        onChange={(e) => setKondisi(e.target.value as any)}
                        style={{
                          width: '100%',
                          padding: '9px 10px',
                          borderRadius: 10,
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          background: '#ffffff',
                          fontWeight: 700,
                        }}
                      >
                        <option value="BAIK">✅ BAIK</option>
                        <option value="PERLU PERBAIKAN">⚠️ PERLU PERBAIKAN</option>
                        <option value="RUSAK">❌ RUSAK</option>
                      </select>
                    </div>
                  </div>

                  {/* Quick Chips Jumlah */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {PRESET_JUMLAH.map((j) => (
                      <button
                        key={j}
                        type="button"
                        onClick={() => setJumlah(j)}
                        style={{
                          background: jumlah === j ? '#be185d' : '#f1f5f9',
                          color: jumlah === j ? '#ffffff' : '#475569',
                          border: 'none',
                          borderRadius: 6,
                          padding: '3px 7px',
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {j}
                      </button>
                    ))}
                  </div>

                  {/* Lokasi Penyimpanan */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Lokasi Penyimpanan / Ruangan *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Gudang Belakang"
                      value={lokasi}
                      onChange={(e) => setLokasi(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
                      {PRESET_LOKASI.map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLokasi(l)}
                          style={{
                            background: lokasi === l ? '#be185d' : '#f1f5f9',
                            color: lokasi === l ? '#ffffff' : '#475569',
                            border: 'none',
                            borderRadius: 6,
                            padding: '3px 7px',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kategori Barang */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Kategori Barang
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Elektronik & Sound"
                      value={kategori}
                      onChange={(e) => setKategori(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
                      {PRESET_KATEGORI.map((k) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setKategori(k)}
                          style={{
                            background: kategori === k ? '#be185d' : '#f1f5f9',
                            color: kategori === k ? '#ffffff' : '#475569',
                            border: 'none',
                            borderRadius: 6,
                            padding: '3px 7px',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Keterangan */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Catatan / Keterangan (Opsional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Contoh: Pembelian infaq warga tahun 2025, servis rutin tiap 6 bulan."
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
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

                  {/* Submit buttons */}
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
                        background: '#be185d',
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(190, 24, 93, 0.3)',
                      }}
                    >
                      {editingItem ? 'Simpan Perubahan' : 'Tambah Barang'}
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
