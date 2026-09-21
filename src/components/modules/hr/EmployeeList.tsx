'use client';

import React from 'react';
import { Users, Phone, CreditCard, Award, Plus } from 'lucide-react';
import { Pegawai, Jabatan } from '@/types/dkm';
import { formatRupiah } from '../financial/AnalyticsCards';

interface EmployeeListProps {
  pegawai: Pegawai[];
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ pegawai }) => {
  const getBadgeColor = (jabatan: Jabatan) => {
    switch (jabatan) {
      case 'IMAM':
        return { bg: '#ecfdf5', text: '#065f46', border: '#a7f3d0' };
      case 'MUADZIN':
        return { bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe' };
      case 'MARBOT':
        return { bg: '#fef3c7', text: '#92400e', border: '#fde68a' };
      case 'GURU_TPA':
        return { bg: '#f3e8ff', text: '#6b21a8', border: '#e9d5ff' };
      case 'SATPAM':
        return { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' };
      default:
        return { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' };
    }
  };

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Master Data Petugas Masjid (Kafalah & Penggajian)
        </h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Daftar staf operasional DKM, ketentuan gaji pokok, tunjangan kehadiran shalat dan nomor rekening
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        {pegawai.map((p) => {
          const badge = getBadgeColor(p.jabatan);
          return (
            <div
              key={p.id}
              style={{
                background: '#ffffff',
                borderRadius: 16,
                border: '1px solid var(--border-subtle)',
                padding: '20px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a' }}>{p.nama}</h4>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: 4,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 6,
                      background: badge.bg,
                      color: badge.text,
                      border: `1px solid ${badge.border}`,
                    }}
                  >
                    {p.jabatan}
                  </span>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', lineHeight: 1.8, color: '#475569', marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Gaji Pokok:</span>
                  <strong style={{ color: 'var(--primary-dark)' }}>{formatRupiah(p.gajiPokok)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tunjangan Kehadiran:</span>
                  <strong style={{ color: '#059669' }}>+{formatRupiah(p.tunjanganHadir)} / shalat</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <CreditCard size={13} style={{ color: '#64748b' }} />
                  <span>{p.rekening}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Phone size={13} style={{ color: '#64748b' }} />
                  <span>{p.noHp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
