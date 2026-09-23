'use client';

import React, { useState } from 'react';
import { User } from '@/types/dkm';
import {
  ChevronLeft,
  User as UserIcon,
  Smartphone,
  Download,
  ShieldCheck,
  Monitor,
  Share2,
  CheckCircle2,
  Bell,
  HelpCircle,
} from 'lucide-react';

interface MaslamAkunProps {
  loggedInUser?: User | null;
  onLogout?: () => void;
  onBack: () => void;
  onOpenAndroidModal: () => void;
}

export const MaslamAkun: React.FC<MaslamAkunProps> = ({
  loggedInUser,
  onLogout,
  onBack,
  onOpenAndroidModal,
}) => {

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #093c78 0%, #062b59 100%)',
          color: 'white',
          padding: '10px 14px 12px', position: 'sticky', top: 0, zIndex: 30,
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
            <span>Akun & Pengaturan</span>
          </button>
          
          <button
            onClick={onLogout}
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              color: '#fca5a5',
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Keluar
          </button>
        </div>

        {/* Profile Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#fef3c7',
              border: '2.5px solid #f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
            }}
          >
            🧔
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>
              {loggedInUser?.nama || 'Pengguna'}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: 2 }}>
              {loggedInUser?.email || 'email@domain.com'}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              <span
                style={{
                  background: '#f59e0b',
                  color: '#1e293b',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  padding: '1px 7px',
                  borderRadius: 999,
                }}
              >
                {loggedInUser?.role || 'JAMAAH'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Android Smartphone Features */}
      <div style={{ padding: '10px 16px' }}>
        <div
          onClick={onOpenAndroidModal}
          style={{
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            borderRadius: 16,
            border: '1.5px solid #6ee7b7',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: '#10b981',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Smartphone size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#065f46' }}>
              Pasang Aplikasi di HP Android
            </div>
            <div style={{ fontSize: '0.74rem', color: '#047857', marginTop: 2 }}>
              Download file APK & Panduan Tambah ke Layar Utama
            </div>
          </div>
        </div>
      </div>



      {/* App Info Footer */}
      <div style={{ textAlign: 'center', padding: '16px', color: '#94a3b8', fontSize: '0.72rem' }}>
        <div>MASLAM DKM v2.4.0 (Mobile Build)</div>
        <div>AL-Muhajirin Kayuringin Bekasi</div>
      </div>
    </div>
  );
};
