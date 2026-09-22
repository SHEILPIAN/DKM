'use client';

import React from 'react';
import {
  LayoutDashboard,
  Wallet,
  CalendarDays,
  HeartHandshake,
  Users,
  Smartphone,
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileView: boolean;
  setIsMobileView: (val: boolean) => void;
  pendingBookingsCount: number;
  pendingSalaryCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  isMobileView,
  setIsMobileView,
  pendingBookingsCount,
  pendingSalaryCount,
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'keuangan', label: 'Kasir', icon: Wallet },
    { id: 'reservasi', label: 'Jadwal', icon: CalendarDays, badge: pendingBookingsCount },
    { id: 'ziswaf', label: 'ZISWAF', icon: HeartHandshake },
    { id: 'hr', label: 'Kafalah', icon: Users, badge: pendingSalaryCount },
    { id: 'jamaah', label: 'Jamaah', icon: Smartphone },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = isMobileView ? tab.id === 'jamaah' : activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              if (tab.id === 'jamaah') {
                setIsMobileView(true);
              } else {
                setIsMobileView(false);
                setActiveTab(tab.id);
              }
            }}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={20} />
              {tab.badge && tab.badge > 0 ? (
                <span className="bottom-nav-badge">{tab.badge}</span>
              ) : null}
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
