'use client';

import React from 'react';
import { Calendar, PlusCircle, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  onOpenCashier: () => void;
  isMobileView: boolean;
  setIsMobileView: (val: boolean) => void;
  onOpenAndroidModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCashier,
  isMobileView,
  setIsMobileView,
  onOpenAndroidModal,
}) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="hijri-date-badge">
          <Calendar size={15} style={{ color: 'var(--primary)' }} />
          <span>Senin, 9 Rabi&apos;ul Awwal 1448 H / 21 September 2026</span>
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.78rem',
            color: '#475569',
            fontWeight: 600,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981' }} />
          <span>Masjid Al-Muhajirin (Kayuringin Jaya, Bekasi)</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Tombol Aplikasi Android */}
        <button
          onClick={onOpenAndroidModal}
          className="btn-outline"
          style={{
            borderColor: '#a7f3d0',
            background: '#f0fdf4',
            color: '#065f46',
            fontWeight: 700,
            fontSize: '0.82rem',
            padding: '8px 14px',
          }}
          title="Pasang Aplikasi di HP Android"
        >
          <Smartphone size={15} style={{ color: '#059669' }} />
          <span>Aplikasi Android</span>
        </button>

        {/* Toggle View Mode */}
        <div className="view-switcher-toggle">
          <button
            onClick={() => setIsMobileView(false)}
            className={`switcher-btn ${!isMobileView ? 'active' : ''}`}
            title="Tampilan Admin Desktop"
          >
            <Monitor size={15} />
            <span>Admin Portal</span>
          </button>
          <button
            onClick={() => setIsMobileView(true)}
            className={`switcher-btn ${isMobileView ? 'active' : ''}`}
            title="Tampilan Jamaah (Mobile App Simulator)"
          >
            <Smartphone size={15} />
            <span>Jamaah View</span>
          </button>
        </div>

        {/* Action Button */}
        <button onClick={onOpenCashier} className="btn-primary">
          <PlusCircle size={16} />
          <span>Input Infaq / Trx Baru</span>
        </button>
      </div>
    </header>
  );
};
