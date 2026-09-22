'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  User,
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
  onBack: () => void;
  onSwitchToDesktop: () => void;
  onOpenAndroidModal: () => void;
}

export const MaslamAkun: React.FC<MaslamAkunProps> = ({
  onBack,
  onSwitchToDesktop,
  onOpenAndroidModal,
}) => {
  const [currentUser, setCurrentUser] = useState<'PIKET' | 'BENDAHARA' | 'KETUA'>('PIKET');

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #093c78 0%, #062b59 100%)',
          color: 'white',
          padding: '16px 18px 24px', position: 'sticky', top: 0, zIndex: 30,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
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
              {currentUser === 'PIKET' && 'Fian Tampan'}
              {currentUser === 'BENDAHARA' && 'Ustadz Ridwan, S.E'}
              {currentUser === 'KETUA' && 'H. Ahmad Dahlan'}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: 2 }}>
              {currentUser === 'PIKET' && 'Petugas Piket & Operator Kasir HP'}
              {currentUser === 'BENDAHARA' && 'Bendahara Umum DKM'}
              {currentUser === 'KETUA' && 'Ketua DKM AL-Muhajirin'}
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
                DKM AKTIF
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Switch Role Quick Bar */}
      <div style={{ padding: '14px 16px 8px' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: 8 }}>
          Ganti Akun Pengguna / Otoritas
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => setCurrentUser('PIKET')}
            style={{
              flex: 1,
              padding: '8px 6px',
              borderRadius: 10,
              fontSize: '0.72rem',
              fontWeight: 700,
              background: currentUser === 'PIKET' ? '#0a3a78' : '#ffffff',
              color: currentUser === 'PIKET' ? '#ffffff' : '#334155',
              border: '1px solid #cbd5e1',
              cursor: 'pointer',
            }}
          >
            Fian (Piket)
          </button>
          <button
            type="button"
            onClick={() => setCurrentUser('BENDAHARA')}
            style={{
              flex: 1,
              padding: '8px 6px',
              borderRadius: 10,
              fontSize: '0.72rem',
              fontWeight: 700,
              background: currentUser === 'BENDAHARA' ? '#0a3a78' : '#ffffff',
              color: currentUser === 'BENDAHARA' ? '#ffffff' : '#334155',
              border: '1px solid #cbd5e1',
              cursor: 'pointer',
            }}
          >
            Bendahara
          </button>
          <button
            type="button"
            onClick={() => setCurrentUser('KETUA')}
            style={{
              flex: 1,
              padding: '8px 6px',
              borderRadius: 10,
              fontSize: '0.72rem',
              fontWeight: 700,
              background: currentUser === 'KETUA' ? '#0a3a78' : '#ffffff',
              color: currentUser === 'KETUA' ? '#ffffff' : '#334155',
              border: '1px solid #cbd5e1',
              cursor: 'pointer',
            }}
          >
            Ketua DKM
          </button>
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

      {/* Switch to Desktop Admin View */}
      <div style={{ padding: '4px 16px 16px' }}>
        <div
          onClick={onSwitchToDesktop}
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: '#eff6ff',
              color: '#1d4ed8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Monitor size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
              Beralih ke Portal Admin PC
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 2 }}>
              Mode Layar Lebar dengan Grafik Arus Kas Lengkap
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
