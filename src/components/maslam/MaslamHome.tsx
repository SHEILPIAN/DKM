'use client';

import React, { useState } from 'react';
import {
  Bell,
  ChevronRight,
  Megaphone,
  QrCode,
  Building2,
  Calendar,
  Users,
  Building,
  Package,
  HeartHandshake,
  Coins,
  Sparkles,
  Beef,
  Tv,
  FileSpreadsheet,
  Home,
  Layers,
  User as UserIcon,
  UserCheck,
  ShieldCheck,
  LogOut,
  X,
  Shield,
} from 'lucide-react';
import { User, KategoriKas, Transaksi, Fasilitas, Reservasi } from '@/types/dkm';

interface MaslamHomeProps {
  loggedInUser?: User | null;
  onNavigate: (screen: string) => void;
  onOpenQris: () => void;
  onOpenQrScan: () => void;
  onLogout?: () => void;
}

export const MaslamHome: React.FC<MaslamHomeProps> = ({
  loggedInUser,
  onNavigate,
  onOpenQris,
  onOpenQrScan,
  onLogout,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [showAccountModal, setShowAccountModal] = useState<boolean>(false);

  const banners = [
    {
      id: 1,
      title: 'TABUNGAN QURBAN DIGITAL UNTUK MASJID DAN JAMAAH',
      subtitle: 'Solusi tabungan qurban berbasis digital yang memudahkan perencanaan ibadah qurban.',
      tag: 'nusaQu',
      bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #f59e0b 100%)',
      textColor: '#78350f',
    },
    {
      id: 2,
      title: 'INFAQ & SEDEKAH QRIS DIGITAL AL-MUHAJIRIN',
      subtitle: 'Salurkan sedekah subuh dan infaq operasional masjid langsung lewat QRIS.',
      tag: 'Infaq Digital',
      bg: 'linear-gradient(135deg, #dcfce7 0%, #a7f3d0 50%, #10b981 100%)',
      textColor: '#064e3b',
    },
    {
      id: 3,
      title: 'PEMINJAMAN AULA & FASILITAS DKM ANTI-BENTROK',
      subtitle: 'Cek jadwal ketersediaan aula serbaguna dan tenda inventaris langsung dari HP.',
      tag: 'Fasilitas MAM',
      bg: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #3b82f6 100%)',
      textColor: '#1e3a8a',
    },
  ];

  // 11 Menu Grid Items matching Screenshot 1
  const menuItems = [
    {
      id: 'lembaga',
      label: 'Data Lembaga',
      icon: Building2,
      bg: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    },
    {
      id: 'kegiatan',
      label: 'Kegiatan',
      icon: Calendar,
      bg: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
    },
    {
      id: 'warga',
      label: 'Warga',
      icon: Users,
      bg: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    },
    {
      id: 'aset',
      label: 'Aset',
      icon: Building,
      bg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: Package,
      bg: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    },
    {
      id: 'ziswaf',
      label: 'Ziswaf',
      icon: HeartHandshake,
      bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    {
      id: 'keuangan',
      label: 'Keuangan',
      icon: Coins,
      bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
    {
      id: 'idulfitri',
      label: 'Idul Fitri',
      icon: Sparkles,
      bg: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    },
    {
      id: 'iduladha',
      label: 'Idul Adha',
      icon: Beef,
      bg: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
    },
    {
      id: 'tvmasjid',
      label: 'TV Masjid',
      icon: Tv,
      bg: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)',
    },
    {
      id: 'administrasi',
      label: 'Administrasi',
      icon: FileSpreadsheet,
      bg: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    },
    {
      id: 'akun',
      label: 'Akun Pengguna',
      icon: UserCheck,
      bg: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
    },
  ];

  const currentBanner = banners[activeSlide];

  return (
    <div>
      {/* 1. Header (Deep Blue MASLAM DKM) */}
      <header className="maslam-header">
        <div className="maslam-top-row">
          <div className="maslam-brand-group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Logo AL-Muhajirin"
              className="maslam-logo-img"
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="maslam-title">MASLAM</span>
              <span className="maslam-badge-dkm">DKM</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              className="maslam-bell-btn"
              onClick={() => alert('Notifikasi DKM AL-Muhajirin: 1 Pengajuan Reservasi baru & 3 Slip Gaji menunggu approval.')}
              title="Notifikasi"
            >
              <Bell size={18} />
              <span className="maslam-bell-dot" />
            </button>

            {/* Quick Profile / Akun Button */}
            <button
              type="button"
              onClick={() => setShowAccountModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(255, 255, 255, 0.14)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                borderRadius: 999,
                padding: '3px 8px 3px 4px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.72rem',
                fontWeight: 700,
                transition: 'all 0.2s',
              }}
              title="Buka Menu Akun Pengguna"
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#f59e0b',
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                }}
              >
                {loggedInUser?.nama ? loggedInUser.nama.charAt(0).toUpperCase() : 'U'}
              </div>
              <span style={{ maxWidth: 84, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {loggedInUser?.nama ? loggedInUser.nama.split(' ')[0] : 'Akun'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* User Greeting & Akun Bar */}
      <div
        style={{
          background: 'linear-gradient(135deg, #093c78 0%, #062b59 100%)',
          padding: '0 14px 12px',
          color: 'white',
        }}
      >
        <div
          onClick={() => setShowAccountModal(true)}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: 14,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#fef3c7',
                border: '2px solid #f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                flexShrink: 0,
              }}
            >
              🧔
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#93c5fd', fontWeight: 600 }}>
                Assalamu&apos;alaikum,
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                {loggedInUser?.nama || 'Pengguna DKM'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                <span
                  style={{
                    background: '#f59e0b',
                    color: '#1e293b',
                    fontSize: '0.6rem',
                    fontWeight: 800,
                    padding: '1px 7px',
                    borderRadius: 999,
                  }}
                >
                  {loggedInUser?.role || 'JAMAAH'}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#cbd5e1', opacity: 0.85 }}>
                  • Menu Akun
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '6px 10px',
              borderRadius: 8,
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'white',
            }}
          >
            <UserIcon size={14} />
            <span>Akun</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Carousel Banner */}
      <div className="maslam-carousel-wrap">
        <div
          className="maslam-banner-card"
          style={{
            background: currentBanner.bg,
            padding: '24px 20px 42px',
            color: currentBanner.textColor,
            minHeight: 180,
            cursor: 'pointer',
          }}
          onClick={() => {
            if (activeSlide === 0) onNavigate('iduladha');
            else if (activeSlide === 1) onNavigate('keuangan');
            else onNavigate('aset');
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.85)',
              padding: '2px 10px',
              borderRadius: 6,
              fontSize: '0.75rem',
              fontWeight: 800,
              marginBottom: 10,
            }}
          >
            {currentBanner.tag}
          </div>
          <h3
            style={{
              fontSize: '1.05rem',
              fontWeight: 900,
              lineHeight: 1.25,
              marginBottom: 6,
            }}
          >
            {currentBanner.title}
          </h3>
          <p style={{ fontSize: '0.74rem', lineHeight: 1.4, opacity: 0.9 }}>
            {currentBanner.subtitle}
          </p>

          <div className="maslam-banner-overlay">
            AL-MUHAJIRIN KAYURINGIN BEKASI
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="maslam-dots-row">
          {banners.map((_, idx) => (
            <span
              key={idx}
              className={`maslam-dot ${activeSlide === idx ? 'active' : ''}`}
              onClick={() => setActiveSlide(idx)}
            />
          ))}
        </div>
      </div>

      {/* 3. 11 Icons Grid Menu (Screenshot 1) */}
      <div className="maslam-grid-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className="maslam-menu-btn"
              onClick={() => onNavigate(item.id)}
            >
              <div className="maslam-icon-circle" style={{ background: item.bg }}>
                <Icon size={24} strokeWidth={2.2} />
              </div>
              <span className="maslam-menu-label">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Action / Notification Cards below Grid */}
      <div style={{ marginTop: 4, marginBottom: 20 }}>
        {/* Green Notification: Pesanan Kurban Baru */}
        <div
          className="maslam-action-banner green-soft"
          onClick={() => onNavigate('iduladha')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Megaphone size={20} style={{ color: '#16a34a' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>
              0 Pesanan Kurban Baru
            </span>
          </div>
          <ChevronRight size={18} style={{ color: '#16a34a' }} />
        </div>

        {/* Yellow Action: Scan QR Pengambilan Daging Kurban */}
        <div
          className="maslam-action-banner yellow-soft"
          onClick={onOpenQrScan}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <QrCode size={20} style={{ color: '#ca8a04' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>
              Scan QR pengambilan daging Kurban
            </span>
          </div>
          <ChevronRight size={18} style={{ color: '#ca8a04' }} />
        </div>
      </div>

      {/* 5. Menu Akun Pengguna Modal / Bottom Sheet */}
      {showAccountModal && (
        <div
          className="modal-overlay"
          style={{ zIndex: 130 }}
          onClick={() => setShowAccountModal(false)}
        >
          <div
            className="modal-card"
            style={{
              maxWidth: 390,
              width: '92%',
              padding: '20px',
              borderRadius: 20,
              textAlign: 'left',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 14,
                borderBottom: '1px solid #f1f5f9',
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <UserCheck size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Menu Akun Pengguna
                  </h3>
                  <p style={{ fontSize: '0.7rem', color: '#64748b', margin: 0 }}>
                    Profil & Otorisasi Sistem DKM
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAccountModal(false)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Profile Info Box */}
            <div
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: 14,
                padding: '14px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#fef3c7',
                  border: '2px solid #f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  flexShrink: 0,
                }}
              >
                🧔
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {loggedInUser?.nama || 'Pengguna DKM'}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {loggedInUser?.email || 'email@domain.com'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span
                    style={{
                      background: '#f59e0b',
                      color: '#1e293b',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      padding: '1px 8px',
                      borderRadius: 999,
                    }}
                  >
                    {loggedInUser?.role || 'JAMAAH'}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <ShieldCheck size={12} /> Aktif
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {/* Option 1: Buka Halaman Akun & Pengaturan */}
              <button
                type="button"
                onClick={() => {
                  setShowAccountModal(false);
                  onNavigate('akun');
                }}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: '#eff6ff',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <UserIcon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>
                      Profil & Pengaturan Akun
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                      Lihat rincian akun, instal APK Android
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </button>

              {/* Option 2 (Super Admin / Admin): Kelola Pengguna Sistem */}
              {loggedInUser?.role === 'SUPER_ADMIN' && (
                <button
                  type="button"
                  onClick={() => {
                    setShowAccountModal(false);
                    onNavigate('users');
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: '1px solid #bfdbfe',
                    background: '#f0f7ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: '#2563eb',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Shield size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#1e3a8a' }}>
                        Manajemen User Pengguna
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#3b82f6' }}>
                        Tambah, edit user & hak akses sistem
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="#2563eb" />
                </button>
              )}

              {/* Option 3: Keluar Akun */}
              {onLogout && (
                <button
                  type="button"
                  onClick={() => {
                    setShowAccountModal(false);
                    onLogout();
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: '1px solid #fee2e2',
                    background: '#fef2f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: '#fee2e2',
                        color: '#ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <LogOut size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#dc2626' }}>
                        Keluar (Logout)
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#ef4444' }}>
                        Keluar dari sesi akun pengguna ini
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="#ef4444" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowAccountModal(false)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                color: '#64748b',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
