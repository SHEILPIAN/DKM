'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { Warga } from '@/types/dkm';

interface MaslamWargaProps {
  onBack: () => void;
  wargaList: Warga[];
  onAddWarga: (warga: Omit<Warga, 'id' | 'tanggalDaftar'>) => void;
}

export const MaslamWarga: React.FC<MaslamWargaProps> = ({
  onBack,
  wargaList,
  onAddWarga,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMustahikOnly, setFilterMustahikOnly] = useState(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
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

  // Total metrics matching Screenshot 3
  const totalWargaCount = 691;
  const totalMustahikCount = 64;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      alert('Mohon isi nama warga.');
      return;
    }

    onAddWarga({
      nama,
      nik,
      noHp: noHp || '081234567890',
      alamat: alamat || `Jl. Maskoki RT ${rt}/RW ${rw}`,
      rt,
      rw,
      gender,
      kategoriUmur,
      umur: Number(umur) || 30,
      isMustahik,
      statusKeluarga: 'KEPALA_KELUARGA',
      pekerjaan: pekerjaan || 'Warga Tetap',
    });

    setIsInputModalOpen(false);
    // Reset
    setNama('');
    setNik('');
    setNoHp('');
    setAlamat('');
    setPekerjaan('');
    alert('Alhamdulillah! Data warga baru berhasil disimpan ke database DKM.');
  };

  const filteredWarga = wargaList.filter((w) => {
    const matchSearch =
      w.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.alamat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.noHp.includes(searchQuery);
    const matchMustahik = filterMustahikOnly ? w.isMustahik : true;
    return matchSearch && matchMustahik;
  });

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* 1. Teal Sub-Header (Screenshot 3) */}
      <div
        style={{
          background: 'linear-gradient(135deg, #094b5c 0%, #06333f 100%)',
          color: 'white',
          padding: '16px 18px 22px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Geometric Star Pattern Overlay */}
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

        {/* Top Nav: Back | Title | Info */}
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
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <span
            style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              letterSpacing: '0.5px',
            }}
          >
            WARGA
          </span>

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
            WARGA
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
            Masjid AL-MUHAJIRIN KAYURINGIN BEKASI
          </p>
        </div>
      </div>

      {/* 2. Banner: 0 Warga Ingin Bergabung (Screenshot 3) */}
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
              0 Warga ingin bergabung
            </span>
          </div>
          <ChevronRight size={18} style={{ color: '#1d4ed8' }} />
        </div>
      </div>

      {/* 3. Action Card: Input Data Warga (Screenshot 3) */}
      <div style={{ padding: '0 16px 12px' }}>
        <div
          onClick={() => setIsInputModalOpen(true)}
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
            {/* Notepad pencil icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="8" y2="18" />
              <line x1="16" y1="14" x2="8" y2="14" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
              Input Data Warga
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 2 }}>
              Masukkan Data Warga Baru
            </div>
          </div>
        </div>
      </div>

      {/* 4. Dual Metric Cards: Jumlah Warga & Mustahik (Screenshot 3) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          padding: '0 16px 14px',
        }}
      >
        {/* Card 1: Jumlah Warga */}
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
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              marginBottom: 8,
              boxShadow: '0 3px 8px rgba(6, 182, 212, 0.3)',
            }}
          >
            <Users size={18} />
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
            Jumlah Warga
          </div>
          <div
            style={{
              fontSize: '1.45rem',
              fontWeight: 900,
              color: '#0284c7',
              marginTop: 4,
            }}
          >
            {totalWargaCount}
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
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              marginBottom: 8,
              boxShadow: '0 3px 8px rgba(6, 182, 212, 0.3)',
            }}
          >
            <Users size={18} />
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
            Mustahik
          </div>
          <div
            style={{
              fontSize: '1.45rem',
              fontWeight: 900,
              color: '#0284c7',
              marginTop: 4,
            }}
          >
            {totalMustahikCount}
          </div>
        </div>
      </div>

      {/* 5. Card: Statistik by Gender (Screenshot 3) */}
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
          {/* Header Title with Mosque / User Icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
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
                color: '#b45309',
              }}
            >
              🕌
            </div>
            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
              Statistik by Gender
            </span>
          </div>

          {/* SVG Donut Chart (50% Gold/Peach Akhwat + 50% Navy Blue Ikhwan) */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0 20px' }}>
            <div style={{ position: 'relative', width: 170, height: 170 }}>
              <svg width="170" height="170" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="18" />
                
                {/* Top Half (50% Akhwat - Peach/Gold) */}
                {/* Circumference = 2 * PI * 40 ≈ 251.32. 50% = 125.66 */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#f6ad55"
                  strokeWidth="18"
                  strokeDasharray="125.66 125.66"
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />

                {/* Bottom Half (50% Ikhwan - Navy Blue) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#0f3d68"
                  strokeWidth="18"
                  strokeDasharray="125.66 125.66"
                  strokeDashoffset="125.66"
                  transform="rotate(-90 50 50)"
                />
              </svg>

              {/* Center percentage text */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                  50% : 50%
                </span>
                <span style={{ fontSize: '0.62rem', color: '#64748b', fontWeight: 600 }}>
                  Perbandingan
                </span>
              </div>
            </div>
          </div>

          {/* Legend Row: Left 50% Akhwat | Right 50% Ikhwan */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingTop: 10,
              borderTop: '1px solid #f1f5f9',
            }}
          >
            {/* Akhwat */}
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ea580c' }}>
                50%
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#334155',
                  marginTop: 3,
                }}
              >
                <span>🧕</span>
                <span>Akhwat</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 2 }}>
                345 Jiwa
              </div>
            </div>

            {/* Vertical Divider */}
            <div style={{ width: 1, height: 36, background: '#e2e8f0' }} />

            {/* Ikhwan */}
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f3d68' }}>
                50%
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#334155',
                  marginTop: 3,
                }}
              >
                <span>🧔</span>
                <span>Ikhwan</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 2 }}>
                346 Jiwa
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Card: Statistik Umur Warga (Screenshot 3) */}
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
          {/* Header Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
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
                color: '#b45309',
              }}
            >
              🕌
            </div>
            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
              Statistik Umur Warga
            </span>
          </div>

          {/* Age Demographics Breakdown Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Dewasa */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#1e293b' }}>Dewasa (21 - 55 th)</span>
                <span style={{ fontWeight: 800, color: '#0284c7' }}>296 Jiwa (43%)</span>
              </div>
              <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: '43%', height: '100%', background: '#0284c7', borderRadius: 999 }} />
              </div>
            </div>

            {/* Remaja */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#1e293b' }}>Remaja (13 - 20 th)</span>
                <span style={{ fontWeight: 800, color: '#10b981' }}>155 Jiwa (22%)</span>
              </div>
              <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: '22%', height: '100%', background: '#10b981', borderRadius: 999 }} />
              </div>
            </div>

            {/* Lansia */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#1e293b' }}>Lansia (&gt; 55 th)</span>
                <span style={{ fontWeight: 800, color: '#f59e0b' }}>120 Jiwa (18%)</span>
              </div>
              <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: '18%', height: '100%', background: '#f59e0b', borderRadius: 999 }} />
              </div>
            </div>

            {/* Anak */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#1e293b' }}>Anak-anak (&lt; 13 th)</span>
                <span style={{ fontWeight: 800, color: '#ec4899' }}>120 Jiwa (17%)</span>
              </div>
              <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: '17%', height: '100%', background: '#ec4899', borderRadius: 999 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Directory List of Warga (Interactive Database) */}
      <div style={{ padding: '0 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>
            Daftar Kartu Warga Terdata ({filteredWarga.length})
          </span>
          <button
            type="button"
            onClick={() => setFilterMustahikOnly(!filterMustahikOnly)}
            style={{
              background: filterMustahikOnly ? '#ecfdf5' : '#f8fafc',
              border: `1px solid ${filterMustahikOnly ? '#10b981' : '#cbd5e1'}`,
              color: filterMustahikOnly ? '#059669' : '#64748b',
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {filterMustahikOnly ? '✓ Hanya Mustahik' : 'Filter Mustahik'}
          </button>
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
        </div>

        {/* Warga Cards */}
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
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: w.gender === 'IKHWAN' ? '#dbeafe' : '#fce7f3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                  }}
                >
                  {w.gender === 'IKHWAN' ? '🧔' : '🧕'}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>
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
                  <div style={{ fontSize: '0.7rem', color: '#0369a1', marginTop: 1 }}>
                    {w.noHp}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Detail Warga: ${w.nama}\nAlamat: ${w.alamat}\nStatus: ${w.isMustahik ? 'Penerima Bantuan (Mustahik)' : 'Muzakki / Warga Mampu'}\nNo. HP: ${w.noHp}`)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: 4,
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: Input Data Warga */}
      {isInputModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 420 }}>
            <div className="modal-header">
              <h3 className="modal-title">Form Input Data Warga</h3>
              <button
                type="button"
                onClick={() => setIsInputModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
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
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                    Jenis Kelamin *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.85rem',
                      marginTop: 4,
                    }}
                  >
                    <option value="IKHWAN">Ikhwan (Laki-laki)</option>
                    <option value="AKHWAT">Akhwat (Perempuan)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                    Umur (Tahun)
                  </label>
                  <input
                    type="number"
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
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.85rem',
                      marginTop: 4,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                    RT (Rukun Tetangga)
                  </label>
                  <select
                    value={rt}
                    onChange={(e) => setRt(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 10px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.85rem',
                      marginTop: 4,
                    }}
                  >
                    <option value="01">RT 01</option>
                    <option value="02">RT 02</option>
                    <option value="03">RT 03</option>
                    <option value="04">RT 04</option>
                    <option value="05">RT 05</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                    RW (Kayuringin)
                  </label>
                  <input
                    type="text"
                    value={rw}
                    onChange={(e) => setRw(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.85rem',
                      marginTop: 4,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                  No. WhatsApp / HP
                </label>
                <input
                  type="text"
                  placeholder="0812xxxxxxxx"
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                  Alamat Rumah
                </label>
                <input
                  type="text"
                  placeholder="Jl. Maskoki Raya No..."
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f8fafc', padding: 12, borderRadius: 10 }}>
                <input
                  type="checkbox"
                  id="mustahikCheck"
                  checked={isMustahik}
                  onChange={(e) => setIsMustahik(e.target.checked)}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
                <label htmlFor="mustahikCheck" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', cursor: 'pointer' }}>
                  Kategori Mustahik (Penerima Manfaat Zakat / Sembako DKM)
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: 10, padding: 12 }}
              >
                Simpan Data Warga
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Info Pendataan Warga */}
      {isInfoModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 className="modal-title">Tentang Pendataan Warga</h3>
              <button
                type="button"
                onClick={() => setIsInfoModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body" style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.6 }}>
              <p style={{ marginBottom: 10 }}>
                <strong>Sistem Informasi Warga DKM Al-Muhajirin</strong> digunakan untuk mencatat basis data jamaah sekitar masjid di lingkungan Perumnas 2 Kayuringin Jaya Bekasi.
              </p>
              <ul style={{ paddingLeft: 18, marginBottom: 12 }}>
                <li>Pemetaan demografi jamaah (Ikhwan/Akhwat & kelompok usia).</li>
                <li>Penyaluran beras zakat fitrah & daging qurban yang tepat sasaran bagi 64 Mustahik.</li>
                <li>Undangan kegiatan tabligh akbar dan majelis taklim terkoordinir via WhatsApp.</li>
              </ul>
              <button
                type="button"
                onClick={() => setIsInfoModalOpen(false)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Queue Warga Ingin Bergabung */}
      {isQueueModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 className="modal-title">Pengajuan Warga Baru</h3>
              <button
                type="button"
                onClick={() => setIsQueueModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center', padding: '24px 16px' }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: '#2563eb',
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>
                Tidak Ada Antrean Pendaftaran
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5, marginBottom: 16 }}>
                Semua permohonan registrasi warga baru lewat aplikasi HP telah tervalidasi oleh Sekretariat DKM.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsQueueModalOpen(false);
                  setIsInputModalOpen(true);
                }}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                + Tambah Warga Baru Manual
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
