'use client';

import React from 'react';
import { ChevronLeft, Tv, Volume2, Monitor } from 'lucide-react';

interface MaslamTvMasjidProps {
  onBack: () => void;
}

export const MaslamTvMasjid: React.FC<MaslamTvMasjidProps> = ({ onBack }) => {
  return (
    <div style={{ paddingBottom: 80 }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
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
          <span>TV Display Masjid</span>
        </button>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
          Digital Signage TV
        </h2>
        <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
          Masjid AL-MUHAJIRIN KAYURINGIN BEKASI
        </p>
      </div>

      <div style={{ padding: '16px' }}>
        {/* TV Preview Frame */}
        <div
          style={{
            background: '#091e3a',
            color: 'white',
            borderRadius: 16,
            border: '4px solid #334155',
            padding: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 10 }}>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#f59e0b' }}>
                MASJID AL-MUHAJIRIN
              </div>
              <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                Kayuringin Jaya, Bekasi Selatan
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#10b981' }}>
                11:58:30
              </div>
              <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                Selasa, 22 Sep 2026
              </div>
            </div>
          </div>

          {/* Prayer Times Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, margin: '14px 0', textAlign: 'center' }}>
            {[
              { s: 'SUBUH', t: '04:38' },
              { s: 'DZUHUR', t: '11:55', act: true },
              { s: 'ASHAR', t: '15:10' },
              { s: 'MAGHRIB', t: '17:58' },
              { s: 'ISYA', t: '19:08' },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  background: p.act ? '#f59e0b' : 'rgba(255,255,255,0.08)',
                  color: p.act ? '#0f172a' : '#ffffff',
                  borderRadius: 8,
                  padding: '6px 2px',
                }}
              >
                <div style={{ fontSize: '0.58rem', fontWeight: 700 }}>{p.s}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 900 }}>{p.t}</div>
              </div>
            ))}
          </div>

          {/* Running Text */}
          <div
            style={{
              background: 'rgba(0,0,0,0.5)',
              borderRadius: 8,
              padding: '6px 10px',
              fontSize: '0.68rem',
              color: '#fde047',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            📢 Mohon merapatkan dan meluruskan shaf shalat. Matikan atau heningkan nada dering HP.
          </div>
        </div>

        <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 12, textAlign: 'center' }}>
          Tampilan ini dapat disambungkan langsung ke Smart TV Masjid melalui browser di HDMI stick.
        </p>
      </div>
    </div>
  );
};
