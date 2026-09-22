'use client';

import React from 'react';
import { ChevronLeft, Sparkles, Moon, HeartHandshake } from 'lucide-react';

interface MaslamIdulFitriProps {
  onBack: () => void;
  onOpenZakat: () => void;
}

export const MaslamIdulFitri: React.FC<MaslamIdulFitriProps> = ({ onBack, onOpenZakat }) => {
  return (
    <div style={{ paddingBottom: 80 }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)',
          color: 'white',
          padding: '16px 18px 20px',
        }}
      >
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
            marginBottom: 14,
          }}
        >
          <ChevronLeft size={22} />
          <span>Ramadhan & Idul Fitri</span>
        </button>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
          Idul Fitri 1447 H
        </h2>
        <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
          Masjid AL-MUHAJIRIN KAYURINGIN BEKASI
        </p>
      </div>

      <div style={{ padding: '16px' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            padding: '16px',
            marginBottom: 14,
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: '1.5rem' }}>🌙</span>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Kepanitiaan Zakat Fitrah 1447H
              </h4>
              <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0 }}>
                Standar BAZNAS: 2.5 Kg / 3.5 Liter Beras atau Rp 45.000 / Jiwa
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenZakat}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', background: '#6d28d9', padding: '10px' }}
          >
            Input Zakat Muzakki & Cetak Struk
          </button>
        </div>

        {/* Shalat Idul Fitri Details */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            padding: '16px',
          }}
        >
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
            Pelaksanaan Shalat Idul Fitri 1 Syawal
          </h4>
          <div style={{ fontSize: '0.78rem', color: '#334155', lineHeight: 1.6 }}>
            <div>📍 <strong>Lokasi:</strong> Halaman Parkir & Ruang Utama Masjid Al-Muhajirin</div>
            <div>⏰ <strong>Waktu:</strong> Pukul 06.45 WIB - Selesai</div>
            <div>🎙️ <strong>Imam:</strong> Ustadz M. Syakir, Lc.</div>
            <div>📜 <strong>Khatib:</strong> Dr. H. Faisal Akbar, M.A.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
