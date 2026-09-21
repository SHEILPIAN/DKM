'use client';

import React from 'react';
import { Calendar, PlusCircle, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  onOpenCashier: () => void;
  isMobileView: boolean;
  setIsMobileView: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCashier,
  isMobileView,
  setIsMobileView,
}) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="hijri-date-badge">
          <Calendar size={15} style={{ color: 'var(--primary)' }} />
          <span>Senin, 9 Rabi&apos;ul Awwal 1448 H / 21 September 2026</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
