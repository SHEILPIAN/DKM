'use client';

import React from 'react';
import {
  LayoutDashboard,
  Wallet,
  CalendarDays,
  HeartHandshake,
  Users,
  Smartphone,
  Landmark,
  ShieldCheck,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingBookingsCount: number;
  pendingSalaryCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  pendingBookingsCount,
  pendingSalaryCount,
}) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard Analitik',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'keuangan',
      label: 'Kasir & Buku Besar',
      icon: Wallet,
      badge: null,
    },
    {
      id: 'reservasi',
      label: 'Reservasi Fasilitas',
      icon: CalendarDays,
      badge: pendingBookingsCount > 0 ? `${pendingBookingsCount} Antrean` : null,
    },
    {
      id: 'ziswaf',
      label: 'ZISWAF & Qurban',
      icon: HeartHandshake,
      badge: null,
    },
    {
      id: 'hr',
      label: 'HR & Kafalah Petugas',
      icon: Users,
      badge: pendingSalaryCount > 0 ? `${pendingSalaryCount} Slip` : null,
    },
    {
      id: 'jamaah',
      label: 'Mode Jamaah (Mobile)',
      icon: Smartphone,
      badge: 'Publik',
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="mosque-icon-badge">
          <Landmark size={24} />
        </div>
        <div className="sidebar-title">
          <h1>DKM AL-IKHLAS</h1>
          <p>Sistem Tata Kelola Masjid</p>
        </div>
      </div>

      <nav className="nav-menu">
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-subtle)', padding: '8px 12px 4px', letterSpacing: '0.5px' }}>
          MENU UTAMA
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-badge-card">
          <div className="user-avatar">FD</div>
          <div className="user-info">
            <div className="user-name">Fian Tampan (Piket)</div>
            <div className="user-role">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <ShieldCheck size={13} />
                PETUGAS OPERASIONAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
