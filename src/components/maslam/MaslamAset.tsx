'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Building,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Users,
  ShieldCheck,
  Plus,
  Edit3,
  Trash2,
  X,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Fasilitas, Reservasi } from '@/types/dkm';
import { formatRupiah } from '@/components/modules/financial/AnalyticsCards';

interface MaslamAsetProps {
  onBack: () => void;
  fasilitas: Fasilitas[];
  reservasi: Reservasi[];
  onOpenBookingModal: (dateStr: string, facilityId: number) => void;
  onAddFasilitas?: (f: Omit<Fasilitas, 'id'>) => void;
  onUpdateFasilitas?: (f: Fasilitas) => void;
  onDeleteFasilitas?: (id: number) => void;
}

const PRESET_KAPASITAS = [
  '200 Jamaah',
  '100 Jamaah',
  '50 Kursi',
  '30 Orang',
  '1 Unit',
  '2 Set',
];

const PRESET_INFAQ = [
  { label: 'Gratis', value: 0 },
  { label: 'Rp 250.000', value: 250000 },
  { label: 'Rp 500.000', value: 500000 },
  { label: 'Rp 750.000', value: 750000 },
  { label: 'Rp 1.000.000', value: 1000000 },
];

export const MaslamAset: React.FC<MaslamAsetProps> = ({
  onBack,
  fasilitas,
  reservasi,
  onOpenBookingModal,
  onAddFasilitas,
  onUpdateFasilitas,
  onDeleteFasilitas,
}) => {
  const [selectedFacility, setSelectedFacility] = useState<number>(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFasilitas, setEditingFasilitas] = useState<Fasilitas | null>(null);

  // Form State
  const [nama, setNama] = useState('');
  const [kapasitas, setKapasitas] = useState('100 Jamaah');
  const [biayaInfaq, setBiayaInfaq] = useState<number>(0);
  const [deskripsi, setDeskripsi] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const approvedBookings = reservasi.filter((r) => r.status === 'APPROVED');

  // -------------------------------------------------------------
  // HANDLERS
  // -------------------------------------------------------------
  const handleOpenAdd = () => {
    setEditingFasilitas(null);
    setNama('');
    setKapasitas('100 Jamaah');
    setBiayaInfaq(0);
    setDeskripsi('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (f: Fasilitas) => {
    setEditingFasilitas(f);
    setNama(f.nama);
    setKapasitas(f.kapasitas || '100 Jamaah');
    setBiayaInfaq(f.biayaInfaq || 0);
    setDeskripsi(f.deskripsi || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      alert('Nama aset/fasilitas wajib diisi!');
      return;
    }

    if (editingFasilitas) {
      // Edit
      const updated: Fasilitas = {
        ...editingFasilitas,
        nama: nama.trim(),
        kapasitas: kapasitas.trim() || undefined,
        biayaInfaq: Number(biayaInfaq) || 0,
        deskripsi: deskripsi.trim() || undefined,
      };

      if (onUpdateFasilitas) onUpdateFasilitas(updated);
      showToast('Data aset/fasilitas berhasil diperbarui!');
    } else {
      // Tambah Baru
      if (onAddFasilitas) {
        onAddFasilitas({
          nama: nama.trim(),
          kapasitas: kapasitas.trim() || undefined,
          biayaInfaq: Number(biayaInfaq) || 0,
          deskripsi: deskripsi.trim() || undefined,
        });
      }
      showToast('Aset/fasilitas baru berhasil ditambahkan!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number, namaFasilitas: string) => {
    if (window.confirm(`Yakin ingin menghapus aset/fasilitas "${namaFasilitas}"?`)) {
      if (onDeleteFasilitas) onDeleteFasilitas(id);
      showToast('Aset/fasilitas berhasil dihapus.');
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
          background: 'linear-gradient(135deg, #093c78 0%, #062b59 100%)',
          color: 'white',
          padding: '16px 18px 20px',
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
            <span>Peminjaman Fasilitas</span>
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
            <span>+ Tambah Aset</span>
          </button>
        </div>

        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
            Aset & Aula DKM
          </h2>
          <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
            AL-MUHAJIRIN KAYURINGIN BEKASI
          </p>
        </div>
      </div>

      {/* Facilities Cards */}
      <div style={{ padding: '16px 16px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
            Daftar Fasilitas Siap Pakai ({fasilitas.length})
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            style={{
              background: '#093c78',
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {fasilitas.map((f) => (
            <div
              key={f.id}
              style={{
                background: '#ffffff',
                borderRadius: 16,
                border: selectedFacility === f.id ? '2px solid #0a3a78' : '1px solid #e2e8f0',
                padding: '16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0, paddingRight: 8 }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {f.nama}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        background: '#e0f2fe',
                        color: '#0369a1',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 6,
                      }}
                    >
                      Kapasitas: {f.kapasitas || 'Standar'}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: f.biayaInfaq ? '#059669' : '#0284c7',
                        background: f.biayaInfaq ? '#ecfdf5' : '#f0f9ff',
                        padding: '2px 8px',
                        borderRadius: 6,
                      }}
                    >
                      Infaq: {f.biayaInfaq ? formatRupiah(f.biayaInfaq) : 'Gratis / Sukarela'}
                    </span>
                  </div>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(f)}
                    title="Edit Aset / Fasilitas"
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      color: '#334155',
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Edit3 size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(f.id, f.nama)}
                    title="Hapus Aset"
                    style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {f.deskripsi && (
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '8px 0 12px', lineHeight: 1.4 }}>
                  {f.deskripsi}
                </p>
              )}

              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFacility(f.id);
                    onOpenBookingModal('2026-09-28', f.id);
                  }}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: '9px 12px',
                    fontSize: '0.8rem',
                    background: 'linear-gradient(135deg, #093c78 0%, #0a3a78 100%)',
                  }}
                >
                  <Calendar size={15} />
                  <span>Ajukan Jadwal Peminjaman</span>
                </button>
              </div>
            </div>
          ))}

          {fasilitas.length === 0 && (
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
              Belum ada data fasilitas/aset. Klik tombol <strong>+ Tambah Aset</strong> di atas.
            </div>
          )}
        </div>
      </div>

      {/* Jadwal Terkonfirmasi (Anti-Bentrok) */}
      <div style={{ padding: '12px 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
            Jadwal Pemakaian Terkonfirmasi
          </span>
          <span
            style={{
              background: '#dcfce7',
              color: '#166534',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: 999,
            }}
          >
            {approvedBookings.length} Agenda
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {approvedBookings.map((b) => (
            <div
              key={b.id}
              style={{
                background: '#ffffff',
                borderRadius: 14,
                border: '1px solid #e2e8f0',
                padding: '12px 14px',
                borderLeft: '4px solid #10b981',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                  {b.tujuanAcara}
                </span>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#059669' }}>
                  TERJADWAL
                </span>
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 4 }}>
                {b.fasilitasNama}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6, fontSize: '0.72rem', color: '#334155' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Calendar size={13} style={{ color: '#0a3a78' }} />
                  {b.waktuMulai.split('T')[0]}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={13} style={{ color: '#0a3a78' }} />
                  {b.waktuMulai.split('T')[1]} - {b.waktuSelesai.split('T')[1]}
                </span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#0369a1', marginTop: 4 }}>
                Pemohon: {b.namaPemohon} ({b.kontak})
              </div>
            </div>
          ))}

          {approvedBookings.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '16px',
                background: '#ffffff',
                borderRadius: 12,
                border: '1px dashed #e2e8f0',
                color: '#94a3b8',
                fontSize: '0.78rem',
              }}
            >
              Belum ada jadwal peminjaman aula yang terkonfirmasi minggu ini.
            </div>
          )}
        </div>
      </div>

      {/* ======================================================= */}
      {/* MODAL: TAMBAH / EDIT ASET & FASILITAS                   */}
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
                  <Building size={18} color="#093c78" />
                  <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>
                    {editingFasilitas ? 'Edit Aset / Fasilitas' : 'Tambah Aset / Fasilitas Baru'}
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
                  {/* Nama Fasilitas */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Nama Aset / Fasilitas *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Aula Utama Serbaguna (Lantai 2)"
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

                  {/* Kapasitas */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Kapasitas / Daya Tampung
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 200 Jamaah / 50 Kursi"
                      value={kapasitas}
                      onChange={(e) => setKapasitas(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
                      {PRESET_KAPASITAS.map((kp) => (
                        <button
                          key={kp}
                          type="button"
                          onClick={() => setKapasitas(kp)}
                          style={{
                            background: kapasitas === kp ? '#093c78' : '#f1f5f9',
                            color: kapasitas === kp ? '#ffffff' : '#475569',
                            border: 'none',
                            borderRadius: 6,
                            padding: '3px 8px',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {kp}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Biaya Infaq */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Infaq Operasional (Rp) - 0 = Gratis
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={50000}
                      value={biayaInfaq}
                      onChange={(e) => setBiayaInfaq(Number(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        color: '#059669',
                      }}
                    />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
                      {PRESET_INFAQ.map((inf) => (
                        <button
                          key={inf.label}
                          type="button"
                          onClick={() => setBiayaInfaq(inf.value)}
                          style={{
                            background: biayaInfaq === inf.value ? '#059669' : '#f1f5f9',
                            color: biayaInfaq === inf.value ? '#ffffff' : '#475569',
                            border: 'none',
                            borderRadius: 6,
                            padding: '3px 8px',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {inf.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deskripsi */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Fasilitas Pendukung / Deskripsi
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Contoh: Dilengkapi 4 unit AC 2 PK, Sound System Wireless, Mimbar, Karpet, dan toilet khusus."
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
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
                        background: '#093c78',
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(9, 60, 120, 0.3)',
                      }}
                    >
                      {editingFasilitas ? 'Simpan Perubahan' : 'Tambah Aset'}
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
