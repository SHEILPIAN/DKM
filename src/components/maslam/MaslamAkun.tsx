'use client';

import React, { useState } from 'react';
import { User } from '@/types/dkm';
import {
  ChevronLeft,
  ChevronRight,
  User as UserIcon,
  Smartphone,
  Download,
  ShieldCheck,
  Monitor,
  Share2,
  CheckCircle2,
  Bell,
  HelpCircle,
  Users,
  LogOut,
} from 'lucide-react';

interface MaslamAkunProps {
  loggedInUser?: User | null;
  onLogout?: () => void;
  onBack: () => void;
  onOpenAndroidModal: () => void;
  onNavigate?: (screen: string) => void;
}

export const MaslamAkun: React.FC<MaslamAkunProps> = ({
  loggedInUser,
  onLogout,
  onBack,
  onOpenAndroidModal,
  onNavigate,
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



      {/* Admin Management Section */}
      {loggedInUser?.role === 'SUPER_ADMIN' && onNavigate && (
        <div style={{ padding: '4px 16px 10px' }}>
          <div
            id="btn-manajemen-user"
            onClick={() => onNavigate('users')}
            style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: 16,
              border: '1.5px solid #93c5fd',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.12)',
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: '#2563eb',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Users size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e3a8a' }}>
                Manajemen Akun Pengguna
              </div>
              <div style={{ fontSize: '0.74rem', color: '#1d4ed8', marginTop: 2 }}>
                Kelola daftar user sistem, tambah user & hak akses peran
              </div>
            </div>
            <ChevronRight size={18} color="#2563eb" />
          </div>
        </div>
      )}

      {/* Informasi Akun & Hak Akses */}
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '16px' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={18} color="#059669" /> Informasi Akun & Hak Akses
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Nama Pengguna</span>
              <span style={{ fontWeight: 700, color: '#0f172a' }}>{loggedInUser?.nama || '-'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Alamat Email</span>
              <span style={{ fontWeight: 700, color: '#0f172a' }}>{loggedInUser?.email || '-'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Level Akses</span>
              <span style={{ fontWeight: 800, color: '#f59e0b' }}>{loggedInUser?.role || 'JAMAAH'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Status Akun</span>
              <span style={{ fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle2 size={14} /> Terverifikasi & Aktif
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Logout Tambahan */}
      {onLogout && (
        <div style={{ padding: '0 16px 8px' }}>
          <button
            type="button"
            onClick={onLogout}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 12,
              border: '1.5px solid #fca5a5',
              background: '#fef2f2',
              color: '#dc2626',
              fontSize: '0.85rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: 'pointer',
            }}
          >
            <LogOut size={16} /> Keluar dari Akun (Logout)
          </button>
        </div>
      )}

      {/* App Info Footer */}
      <div style={{ textAlign: 'center', padding: '16px', color: '#94a3b8', fontSize: '0.72rem' }}>
        <div>MASLAM DKM v2.4.0 (Mobile Build)</div>
        <div>AL-Muhajirin Kayuringin Bekasi</div>
      </div>
    </div>
  );
};
