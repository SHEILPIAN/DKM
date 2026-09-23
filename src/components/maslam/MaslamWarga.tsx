'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Info,
  UserPlus,
  Users,
  ChevronRight,
  Search,
  CheckCircle2,
  X,
  Phone,
  MapPin,
  HeartHandshake,
  UserCheck,
  Plus,
  Edit3,
  Trash2,
  Share2,
} from 'lucide-react';
import { Warga } from '@/types/dkm';

interface MaslamWargaProps {
  onBack: () => void;
  wargaList: Warga[];
  onAddWarga: (warga: Omit<Warga, 'id' | 'tanggalDaftar'>) => void;
  onUpdateWarga?: (warga: Warga) => void;
  onDeleteWarga?: (id: number) => void;
}

export const MaslamWarga: React.FC<MaslamWargaProps> = ({
  onBack,
  wargaList,
  onAddWarga,
  onUpdateWarga,
  onDeleteWarga,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMustahikOnly, setFilterMustahikOnly] = useState(false);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWarga, setEditingWarga] = useState<Warga | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);

  // Form State
  const [nama, setNama] = useState('');
  const [nik, setNik] = useState('');
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [rt, setRt] = useState('02');
  const [rw, setRw] = useState('08');
  const [gender, setGender] = useState<'IKHWAN' | 'AKHWAT'>('IKHWAN');
  const [kategoriUmur, setKategoriUmur] = useState<'ANAK' | 'REMAJA' | 'DEWASA' | 'LANSIA'>('DEWASA');
  const [umur, setUmur] = useState<number>(35);
  const [isMustahik, setIsMustahik] = useState(false);
  const [pekerjaan, setPekerjaan] = useState('');
  const [statusKeluarga, setStatusKeluarga] = useState<'KEPALA_KELUARGA' | 'ISTRI' | 'ANAK' | 'LAINNYA'>('KEPALA_KELUARGA');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Dynamic Metrics based on current wargaList
  const totalWargaCount = wargaList.length;
  const totalMustahikCount = wargaList.filter((w) => w.isMustahik).length;
  const ikhwanCount = wargaList.filter((w) => w.gender === 'IKHWAN').length;
  const akhwatCount = wargaList.filter((w) => w.gender === 'AKHWAT').length;
  const ikhwanPercent = totalWargaCount > 0 ? Math.round((ikhwanCount / totalWargaCount) * 100) : 50;
  const akhwatPercent = 100 - ikhwanPercent;

  // Age Breakdown
  const dewasaCount = wargaList.filter((w) => w.kategoriUmur === 'DEWASA').length;
  const remajaCount = wargaList.filter((w) => w.kategoriUmur === 'REMAJA').length;
  const lansiaCount = wargaList.filter((w) => w.kategoriUmur === 'LANSIA').length;
  const anakCount = wargaList.filter((w) => w.kategoriUmur === 'ANAK').length;

  const dewasaPercent = totalWargaCount > 0 ? Math.round((dewasaCount / totalWargaCount) * 100) : 0;
  const remajaPercent = totalWargaCount > 0 ? Math.round((remajaCount / totalWargaCount) * 100) : 0;
  const lansiaPercent = totalWargaCount > 0 ? Math.round((lansiaCount / totalWargaCount) * 100) : 0;
  const anakPercent = totalWargaCount > 0 ? Math.round((anakCount / totalWargaCount) * 100) : 0;

  // -------------------------------------------------------------
  // OPEN MODAL HANDLERS
  // -------------------------------------------------------------
  const handleOpenAdd = () => {
    setEditingWarga(null);
    setNama('');
    setNik('');
    setNoHp('');
    setAlamat('');
    setRt('02');
    setRw('08');
    setGender('IKHWAN');
    setKategoriUmur('DEWASA');
    setUmur(35);
    setIsMustahik(false);
    setPekerjaan('');
    setStatusKeluarga('KEPALA_KELUARGA');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (w: Warga) => {
    setEditingWarga(w);
    setNama(w.nama);
    setNik(w.nik || '');
    setNoHp(w.noHp);
    setAlamat(w.alamat);
    setRt(w.rt);
    setRw(w.rw);
    setGender(w.gender);
    setKategoriUmur(w.kategoriUmur);
    setUmur(w.umur);
    setIsMustahik(w.isMustahik);
    setPekerjaan(w.pekerjaan || '');
    setStatusKeluarga(w.statusKeluarga);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      alert('Mohon isi nama lengkap warga.');
      return;
    }

    if (editingWarga) {
      // Edit
      const updated: Warga = {
        ...editingWarga,
        nama: nama.trim(),
        nik: nik.trim() || undefined,
        noHp: noHp.trim() || '081234567890',
        alamat: alamat.trim() || `Jl. Maskoki RT ${rt}/RW ${rw}`,
        rt,
        rw,
        gender,
        kategoriUmur,
        umur: Number(umur) || 30,
        isMustahik,
        statusKeluarga,
        pekerjaan: pekerjaan.trim() || 'Warga Tetap',
      };

      if (onUpdateWarga) onUpdateWarga(updated);
      showToast('Data warga berhasil diperbarui!');
    } else {
      // Tambah Baru
      onAddWarga({
        nama: nama.trim(),
        nik: nik.trim() || undefined,
        noHp: noHp.trim() || '081234567890',
        alamat: alamat.trim() || `Jl. Maskoki RT ${rt}/RW ${rw}`,
        rt,
        rw,
        gender,
        kategoriUmur,
        umur: Number(umur) || 30,
        isMustahik,
        statusKeluarga,
        pekerjaan: pekerjaan.trim() || 'Warga Tetap',
      });
      showToast('Data warga baru berhasil ditambahkan!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number, namaWarga: string) => {
    if (window.confirm(`Yakin ingin menghapus data warga "${namaWarga}"?`)) {
      if (onDeleteWarga) onDeleteWarga(id);
      showToast('Data warga berhasil dihapus.');
    }
  };

  const filteredWarga = wargaList.filter((w) => {
    const matchSearch =
      w.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.alamat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.noHp.includes(searchQuery) ||
      `rt ${w.rt}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchMustahik = filterMustahikOnly ? w.isMustahik : true;
    return matchSearch && matchMustahik;
  });

  return (
    <div style={{ position: 'relative' }}>
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

      {/* 1. Teal Sub-Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #094b5c 0%, #06333f 100%)',
          color: 'white',
          padding: '16px 18px 22px',
          position: 'sticky', top: 0, zIndex: 30,
          overflow: 'hidden',
        }}
      >
        {/* Geometric Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            backgroundImage:
              'radial-gradient(rgba(255, 255, 255, 0.12) 15%, transparent 20%), radial-gradient(rgba(255, 255, 255, 0.08) 15%, transparent 20%)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        />

        {/* Top Nav: Back | Title | Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 2,
            marginBottom: 16,
          }}
        >
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
              gap: 4,
            }}
          >
            <ChevronLeft size={24} />
            <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>Kembali</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={handleOpenAdd}
              style={{
                background: 'rgba(255, 255, 255, 0.22)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: 'white',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: '0.74rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Plus size={14} />
              <span>+ Tambah Warga</span>
            </button>

            <button
              type="button"
              onClick={() => setIsInfoModalOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <Info size={22} />
            </button>
          </div>
        </div>

        {/* Big Title & Subtitle */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2
            style={{
              fontSize: '1.45rem',
              fontWeight: 900,
              letterSpacing: '-0.3px',
              margin: 0,
            }}
          >
            DATABASE WARGA
          </h2>
          <p
            style={{
              fontSize: '0.78rem',
              opacity: 0.9,
              letterSpacing: '0.2px',
              marginTop: 3,
              margin: 0,
            }}
          >
            AL-MUHAJIRIN KAYURINGIN JAYA BEKASI
          </p>
        </div>
      </div>

      {/* 2. Banner: Warga Ingin Bergabung */}
      <div style={{ padding: '14px 16px 8px' }}>
        <div
          onClick={() => setIsQueueModalOpen(true)}
          style={{
            background: '#eff6ff',
            border: '1.5px solid #bfdbfe',
            borderRadius: 14,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1d4ed8',
              }}
            >
              <UserPlus size={18} />
            </div>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#1e3a8a',
              }}
            >
              0 Warga ingin bergabung (Antrean Verifikasi)
            </span>
          </div>
          <ChevronRight size={18} style={{ color: '#1d4ed8' }} />
        </div>
      </div>

      {/* 3. Action Card: Input Data Warga */}
      <div style={{ padding: '0 16px 12px' }}>
        <div
          onClick={handleOpenAdd}
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            transition: 'transform 0.15s',
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
              border: '1px solid #93c5fd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284c7',
              flexShrink: 0,
            }}
          >
            <UserPlus size={22} color="#0284c7" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
              Input Data Warga Baru
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 2 }}>
              Klik untuk menambahkan kepala keluarga / jamaah baru
            </div>
          </div>
          <ChevronRight size={18} color="#94a3b8" />
        </div>
      </div>

      {/* 4. Top 2 Metrics Cards: Total Warga & Mustahik */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          padding: '0 16px 14px',
        }}
      >
        {/* Card 1: Total Warga */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            padding: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: '#fef3c7',
              border: '1px solid #fde047',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              fontSize: '1.2rem',
            }}
          >
            👥
          </div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>
            Total Terdata
          </div>
          <div
            style={{
              fontSize: '1.45rem',
              fontWeight: 900,
              color: '#0f172a',
              marginTop: 2,
            }}
          >
            {totalWargaCount} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Jiwa</span>
          </div>
        </div>

        {/* Card 2: Mustahik */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            padding: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: '#e0f2fe',
              border: '1px solid #bae6fd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              fontSize: '1.2rem',
            }}
          >
            🤝
          </div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>
            Mustahik
          </div>
          <div
            style={{
              fontSize: '1.45rem',
              fontWeight: 900,
              color: '#0284c7',
              marginTop: 2,
            }}
          >
            {totalMustahikCount} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Jiwa</span>
          </div>
        </div>
      </div>

      {/* 5. Card: Statistik by Gender */}
      <div style={{ padding: '0 16px 14px' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: 20,
            border: '1px solid #e2e8f0',
            padding: '18px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#fef3c7',
                border: '1px solid #fde047',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              🕌
            </div>
            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
              Statistik by Gender
            </span>
          </div>

          {/* Progress Bar Gender */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ height: 12, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden', display: 'flex' }}>
              <div
                style={{
                  width: `${ikhwanPercent}%`,
                  background: 'linear-gradient(90deg, #094b5c, #0284c7)',
                  transition: 'width 0.3s',
                }}
              />
              <div
                style={{
                  width: `${akhwatPercent}%`,
                  background: 'linear-gradient(90deg, #f97316, #ea580c)',
                  transition: 'width 0.3s',
                }}
              />
            </div>
          </div>

          {/* Legend Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingTop: 8,
              borderTop: '1px solid #f1f5f9',
            }}
          >
            {/* Ikhwan */}
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0284c7' }}>
                {ikhwanPercent}%
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginTop: 2 }}>
                🧔 Ikhwan ({ikhwanCount} Jiwa)
              </div>
            </div>

            <div style={{ width: 1, height: 32, background: '#e2e8f0' }} />

            {/* Akhwat */}
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ea580c' }}>
                {akhwatPercent}%
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginTop: 2 }}>
                🧕 Akhwat ({akhwatCount} Jiwa)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Card: Statistik Umur Warga */}
      <div style={{ padding: '0 16px 14px' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: 20,
            border: '1px solid #e2e8f0',
            padding: '18px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#fef3c7',
                border: '1px solid #fde047',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              📊
            </div>
            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
              Statistik Umur Warga
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Dewasa */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#1e293b' }}>Dewasa (21 - 55 th)</span>
                <span style={{ fontWeight: 800, color: '#0284c7' }}>{dewasaCount} Jiwa ({dewasaPercent}%)</span>
              </div>
              <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${dewasaPercent}%`, height: '100%', background: '#0284c7', borderRadius: 999 }} />
              </div>
            </div>

            {/* Remaja */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#1e293b' }}>Remaja (13 - 20 th)</span>
                <span style={{ fontWeight: 800, color: '#10b981' }}>{remajaCount} Jiwa ({remajaPercent}%)</span>
              </div>
              <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${remajaPercent}%`, height: '100%', background: '#10b981', borderRadius: 999 }} />
              </div>
            </div>

            {/* Lansia */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#1e293b' }}>Lansia (&gt; 55 th)</span>
                <span style={{ fontWeight: 800, color: '#f59e0b' }}>{lansiaCount} Jiwa ({lansiaPercent}%)</span>
              </div>
              <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${lansiaPercent}%`, height: '100%', background: '#f59e0b', borderRadius: 999 }} />
              </div>
            </div>

            {/* Anak */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#1e293b' }}>Anak-anak (&lt; 13 th)</span>
                <span style={{ fontWeight: 800, color: '#ec4899' }}>{anakCount} Jiwa ({anakPercent}%)</span>
              </div>
              <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${anakPercent}%`, height: '100%', background: '#ec4899', borderRadius: 999 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Directory List of Warga (Interactive Database) */}
      <div style={{ padding: '0 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
              Daftar Kartu Warga ({filteredWarga.length})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              type="button"
              onClick={() => setFilterMustahikOnly(!filterMustahikOnly)}
              style={{
                background: filterMustahikOnly ? '#ecfdf5' : '#f8fafc',
                border: `1px solid ${filterMustahikOnly ? '#10b981' : '#cbd5e1'}`,
                color: filterMustahikOnly ? '#059669' : '#64748b',
                padding: '5px 10px',
                borderRadius: 8,
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {filterMustahikOnly ? '✓ Mustahik' : 'Filter Mustahik'}
            </button>

            <button
              type="button"
              onClick={handleOpenAdd}
              style={{
                background: '#094b5c',
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
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <Search
            size={16}
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
          />
          <input
            type="text"
            placeholder="Cari nama warga, RT, atau alamat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              borderRadius: 12,
              border: '1px solid #cbd5e1',
              fontSize: '0.82rem',
              background: '#ffffff',
              outline: 'none',
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Warga Cards with EDIT & HAPUS buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredWarga.map((w) => (
            <div
              key={w.id}
              style={{
                background: '#ffffff',
                borderRadius: 14,
                border: '1px solid #e2e8f0',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: w.gender === 'IKHWAN' ? '#dbeafe' : '#fce7f3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}
                >
                  {w.gender === 'IKHWAN' ? '🧔' : '🧕'}
                </div>

                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>
                      {w.nama}
                    </span>
                    {w.isMustahik && (
                      <span
                        style={{
                          background: '#ecfdf5',
                          color: '#059669',
                          fontSize: '0.62rem',
                          fontWeight: 800,
                          padding: '1px 6px',
                          borderRadius: 999,
                          border: '1px solid #a7f3d0',
                        }}
                      >
                        Mustahik
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                    RT {w.rt}/RW {w.rw} • {w.pekerjaan || 'Warga'} • {w.umur} th
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#0369a1', marginTop: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Phone size={11} />
                    <span>{w.noHp}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Edit & Delete */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, marginLeft: 8 }}>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(w)}
                  title="Edit Data Warga"
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
                  onClick={() => handleDelete(w.id, w.nama)}
                  title="Hapus Warga"
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
          ))}

          {filteredWarga.length === 0 && (
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
              Data warga tidak ditemukan. Klik tombol <strong>+ Tambah Warga</strong> di atas.
            </div>
          )}
        </div>
      </div>

      {/* ======================================================= */}
      {/* MODAL: INPUT / EDIT DATA WARGA                          */}
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
                  <Users size={18} color="#094b5c" />
                  <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>
                    {editingWarga ? 'Edit Data Warga' : 'Form Input Data Warga'}
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
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Nama Lengkap Warga *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bpk. Muhammad Zaki"
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                        Jenis Kelamin *
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        style={{
                          width: '100%',
                          padding: '9px 10px',
                          borderRadius: 10,
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          background: '#ffffff',
                          fontWeight: 600,
                        }}
                      >
                        <option value="IKHWAN">🧔 Ikhwan (Laki-laki)</option>
                        <option value="AKHWAT">🧕 Akhwat (Perempuan)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                        Umur (Tahun) *
                      </label>
                      <input
                        type="number"
                        required
                        value={umur}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setUmur(val);
                          if (val < 13) setKategoriUmur('ANAK');
                          else if (val <= 20) setKategoriUmur('REMAJA');
                          else if (val <= 55) setKategoriUmur('DEWASA');
                          else setKategoriUmur('LANSIA');
                        }}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: 10,
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                        RT (Rukun Tetangga)
                      </label>
                      <select
                        value={rt}
                        onChange={(e) => setRt(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 10px',
                          borderRadius: 10,
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          background: '#ffffff',
                        }}
                      >
                        <option value="01">RT 01</option>
                        <option value="02">RT 02</option>
                        <option value="03">RT 03</option>
                        <option value="04">RT 04</option>
                        <option value="05">RT 05</option>
                        <option value="06">RT 06</option>
                        <option value="07">RT 07</option>
                        <option value="08">RT 08</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                        RW (Kayuringin)
                      </label>
                      <input
                        type="text"
                        value={rw}
                        onChange={(e) => setRw(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: 10,
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Nomor WhatsApp / HP
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 0812-3456-7890"
                      value={noHp}
                      onChange={(e) => setNoHp(e.target.value)}
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
                      Alamat Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Jl. Maskoki 3 No. 15"
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                        Pekerjaan / Profesi
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Wiraswasta / Guru"
                        value={pekerjaan}
                        onChange={(e) => setPekerjaan(e.target.value)}
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
                        Status Keluarga
                      </label>
                      <select
                        value={statusKeluarga}
                        onChange={(e) => setStatusKeluarga(e.target.value as any)}
                        style={{
                          width: '100%',
                          padding: '9px 10px',
                          borderRadius: 10,
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                          background: '#ffffff',
                        }}
                      >
                        <option value="KEPALA_KELUARGA">Kepala Keluarga</option>
                        <option value="ISTRI">Istri</option>
                        <option value="ANAK">Anak</option>
                        <option value="LAINNYA">Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      background: isMustahik ? '#ecfdf5' : '#f8fafc',
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: isMustahik ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                    }}
                  >
                    <input
                      type="checkbox"
                      id="mustahikCheckModal"
                      checked={isMustahik}
                      onChange={(e) => setIsMustahik(e.target.checked)}
                      style={{ width: 18, height: 18, cursor: 'pointer' }}
                    />
                    <label
                      htmlFor="mustahikCheckModal"
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: isMustahik ? '#059669' : '#1e293b',
                        cursor: 'pointer',
                      }}
                    >
                      Kategori Mustahik (Penerima Manfaat Zakat & Santunan DKM)
                    </label>
                  </div>

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
                        background: '#094b5c',
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(9, 75, 92, 0.3)',
                      }}
                    >
                      {editingWarga ? 'Simpan Perubahan' : 'Tambah Warga'}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Info Modal */}
      <AnimatePresence>
        {isInfoModalOpen && (
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
            onClick={() => setIsInfoModalOpen(false)}
          >
            <div
              style={{
                background: '#ffffff',
                borderRadius: 20,
                width: '100%',
                maxWidth: 380,
                padding: '20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>
                  Tentang Data Warga
                </span>
                <button
                  type="button"
                  onClick={() => setIsInfoModalOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={20} />
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
                Modul Data Warga merekam sensus jamaah masjid di lingkungan Kayuringin Jaya. Data ini dipakai untuk pemetaan kupon qurban, penyaluran zakat fitrah ke 8 Asnaf mustahik, dan broadcast agenda pengajian.
              </p>
              <button
                type="button"
                onClick={() => setIsInfoModalOpen(false)}
                style={{
                  width: '100%',
                  marginTop: 14,
                  padding: '10px',
                  borderRadius: 10,
                  background: '#094b5c',
                  color: 'white',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Mengerti
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Queue Modal */}
      <AnimatePresence>
        {isQueueModalOpen && (
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
            onClick={() => setIsQueueModalOpen(false)}
          >
            <div
              style={{
                background: '#ffffff',
                borderRadius: 20,
                width: '100%',
                maxWidth: 380,
                padding: '20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>
                  Antrean Pendaftaran Warga
                </span>
                <button
                  type="button"
                  onClick={() => setIsQueueModalOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={20} />
                </button>
              </div>
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={40} color="#10b981" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                  Tidak Ada Antrean Tertunda
                </div>
                <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 4 }}>
                  Semua permohonan pendaftaran warga baru melalui formulir online jamaah telah terverifikasi.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsQueueModalOpen(false)}
                style={{
                  width: '100%',
                  marginTop: 10,
                  padding: '10px',
                  borderRadius: 10,
                  background: '#094b5c',
                  color: 'white',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
