'use client';

import React from 'react';
import {
  ChevronLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  Award,
  Users,
  CreditCard,
  Copy,
  ExternalLink,
} from 'lucide-react';

interface MaslamLembagaProps {
  onBack: () => void;
}

export const MaslamLembaga: React.FC<MaslamLembagaProps> = ({ onBack }) => {
  const handleCopyRekening = (rek: string) => {
    navigator.clipboard?.writeText(rek);
    alert(`Nomor rekening ${rek} berhasil disalin ke clipboard!`);
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
          color: 'white',
          padding: '16px 18px 20px',
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
            <span>Profil Lembaga</span>
          </button>
        </div>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
            Masjid Al-Muhajirin
          </h2>
          <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
            Dewan Kemakmuran Masjid (DKM) Periode 2024 - 2028
          </p>
        </div>
      </div>

      {/* Hero Card */}
      <div style={{ padding: '16px' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: 20,
            border: '1px solid #e2e8f0',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Logo Al-Muhajirin"
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              margin: '0 auto 12px',
              objectFit: 'contain',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            }}
          />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
            MASJID AL-MUHAJIRIN
          </h3>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4, margin: 0 }}>
            Yayasan Kemakmuran Umat Kayuringin Jaya
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              fontSize: '0.78rem',
              color: '#334155',
              marginTop: 12,
              background: '#f8fafc',
              padding: '8px 12px',
              borderRadius: 10,
            }}
          >
            <MapPin size={16} style={{ color: '#ea580c', flexShrink: 0 }} />
            <span>Jl. Maskoki Raya Perumnas 2 Kayuringin Jaya Bekasi</span>
          </div>
        </div>
      </div>

      {/* Susunan Pengurus */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
          Susunan Pengurus DKM Utama
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { role: 'Ketua DKM', nama: 'H. Ahmad Dahlan', icon: '👤' },
            { role: 'Wakil Ketua', nama: 'H. Bambang Soetrisno', icon: '👤' },
            { role: 'Sekretaris', nama: 'Fian Tampan (Piket)', icon: '📝' },
            { role: 'Bendahara Umum', nama: 'Ustadz Ridwan, S.E', icon: '💰' },
            { role: 'Ketua Bidang ZISWAF', nama: 'H. Suherman', icon: '🤝' },
            { role: 'Imam Rawatib', nama: 'Ustadz M. Syakir, Lc.', icon: '🕌' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                padding: '10px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: 800 }}>
                  {item.role}
                </span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginTop: 1 }}>
                  {item.nama}
                </div>
              </div>
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rekening Resmi Masjid */}
      <div style={{ padding: '0 16px 20px' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
          Rekening Infaq Bank Syariah
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #fed7aa',
              padding: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c2410c' }}>
                  BANK SYARIAH INDONESIA (BSI)
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', marginTop: 3 }}>
                  714-902-1882
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                  a.n. DKM MASJID AL-MUHAJIRIN BEKASI
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopyRekening('7149021882')}
                style={{
                  background: '#ffedd5',
                  border: '1px solid #fdba74',
                  color: '#c2410c',
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Copy size={13} />
                <span>Salin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
