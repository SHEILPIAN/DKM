'use client';

import React from 'react';
import { ChevronLeft, Calendar, Clock, MapPin } from 'lucide-react';

interface MaslamKegiatanProps {
  onBack: () => void;
}

export const MaslamKegiatan: React.FC<MaslamKegiatanProps> = ({ onBack }) => {
  const kegiatanList = [
    {
      judul: 'Kajian Subuh Berjamaah & Sarapan Bersama',
      narasumber: 'Ustadz M. Syakir, Lc.',
      waktu: 'Setiap Ahad Pagi, Ba\'da Subuh',
      lokasi: 'Ruang Utama AL-Muhajirin',
      kategori: 'RUTIN MINGGUAN',
    },
    {
      judul: 'Majelis Taklim Muslimah & Tahsin Al-Qur\'an',
      narasumber: 'Ustadzah Hj. Faridah',
      waktu: 'Setiap Selasa, 09.00 - 11.30 WIB',
      lokasi: 'Aula Serbaguna Lantai 2',
      kategori: 'MUSLIMAH',
    },
    {
      judul: 'Pelatihan Qiro\'ah & Hadrah Remaja Masjid',
      narasumber: 'Tim Remaja DKM',
      waktu: 'Setiap Sabtu Malam, Ba\'da Isya',
      lokasi: 'Serambi Timur',
      kategori: 'REMAJA',
    },
    {
      judul: 'Khotbah & Shalat Jumat Berjamaah',
      narasumber: 'Habib Ali Al-Kaff',
      waktu: 'Jumat, 11.45 WIB',
      lokasi: 'AL-Muhajirin',
      kategori: 'SHALAT JUMAT',
    },
  ];

  return (
    <div style={{ paddingBottom: 80 }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
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
          <span>Agenda & Kegiatan</span>
        </button>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
          Jadwal Kegiatan
        </h2>
        <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
          AL-MUHAJIRIN KAYURINGIN BEKASI
        </p>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
          Jadwal Pengajian & Majelis Taklim
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {kegiatanList.map((kg, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                borderRadius: 16,
                border: '1px solid #e2e8f0',
                padding: '16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                  style={{
                    background: '#ffe4e6',
                    color: '#e11d48',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: 999,
                  }}
                >
                  {kg.kategori}
                </span>
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '8px 0 4px' }}>
                {kg.judul}
              </h4>
              <div style={{ fontSize: '0.76rem', color: '#64748b', marginBottom: 8 }}>
                Narasumber: <strong>{kg.narasumber}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '0.74rem', color: '#334155' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={13} style={{ color: '#e11d48' }} />
                  {kg.waktu}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={13} style={{ color: '#e11d48' }} />
                  {kg.lokasi}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
