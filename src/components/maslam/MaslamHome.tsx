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
} from 'lucide-react';
import { User, KategoriKas, Transaksi, Fasilitas, Reservasi } from '@/types/dkm';

interface MaslamHomeProps {
  loggedInUser?: User | null;
  onNavigate: (screen: string) => void;
  onOpenQris: () => void;
  onOpenQrScan: () => void;
}

export const MaslamHome: React.FC<MaslamHomeProps> = ({
  loggedInUser,
  onNavigate,
  onOpenQris,
  onOpenQrScan,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

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

          <button
            type="button"
            className="maslam-bell-btn"
            onClick={() => alert('Notifikasi DKM AL-Muhajirin: 1 Pengajuan Reservasi baru & 3 Slip Gaji menunggu approval.')}
          >
            <Bell size={18} />
            <span className="maslam-bell-dot" />
          </button>
        </div>
      </header>

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
    </div>
  );
};
