'use client';

import React, { useState } from 'react';
import {
  QrCode,
  Calendar,
  Clock,
  Heart,
  ChevronRight,
  Sparkles,
  Building,
  CheckCircle2,
  Share2,
  Wallet,
} from 'lucide-react';
import { KategoriKas, Fasilitas } from '@/types/dkm';
import { formatRupiah } from '../financial/AnalyticsCards';

interface JamaahMobileViewProps {
  kategoriKas: KategoriKas[];
  fasilitas: Fasilitas[];
  onOpenQuickDonation: () => void;
  onOpenFacilityBooking: () => void;
  onOpenZakatModal: () => void;
}

export const JamaahMobileView: React.FC<JamaahMobileViewProps> = ({
  kategoriKas,
  fasilitas,
  onOpenQuickDonation,
  onOpenFacilityBooking,
  onOpenZakatModal,
}) => {
  const [showQrisModal, setShowQrisModal] = useState<boolean>(false);
  const [qrisAmount, setQrisAmount] = useState<number>(50000);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const prayerTimes = [
    { name: 'Imsak', time: '04:22' },
    { name: 'Subuh', time: '04:32' },
    { name: 'Terbit', time: '05:46' },
    { name: 'Dzuhur', time: '11:53' },
    { name: 'Ashar', time: '15:04' },
    { name: 'Maghrib', time: '17:56', next: true },
    { name: 'Isya', time: '19:05' },
  ];

  const totalSaldo = kategoriKas.reduce((acc, curr) => acc + curr.saldo, 0);

  return (
    <div className="mobile-simulator-wrapper">
      <div className="phone-frame">
        {/* Notch */}
        <div className="phone-notch" />

        {/* Status Bar */}
        <div
          style={{
            padding: '24px 20px 10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#1e293b',
          }}
        >
          <span>16:50</span>
          <span>●●● 5G 100%</span>
        </div>

        {/* Mobile Header */}
        <div
          style={{
            background: 'var(--primary-gradient)',
            padding: '20px 20px 28px',
            borderBottomLeftRadius: 28,
            borderBottomRightRadius: 28,
            color: 'white',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: '0.72rem', opacity: 0.9, letterSpacing: '0.5px' }}>
                SELAMAT DATANG DI
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Masjid Jami&apos; Al-Ikhlas</h2>
            </div>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              🕌
            </div>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              borderRadius: 999,
              background: 'rgba(0,0,0,0.15)',
              fontSize: '0.72rem',
              fontWeight: 600,
            }}
          >
            <span>Senin, 9 Rabi&apos;ul Awwal 1448 H</span>
          </div>
        </div>

        <div style={{ padding: '0 16px 24px', marginTop: -18 }}>
          {/* CAROUSEL KARTU SALDO KAS MASJID (BISA DIGESER) */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: '0 4px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#334155' }}>
                TRANSPARANSI SALDO KAS (CAROUSEL)
              </span>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                {activeCardIndex + 1} dari {kategoriKas.length + 1}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                paddingBottom: 6,
              }}
            >
              {/* Kartu Total Kas Bersih */}
              <div
                style={{
                  minWidth: '85%',
                  scrollSnapAlign: 'start',
                  background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
                  color: 'white',
                  borderRadius: 20,
                  padding: '18px 20px',
                  boxShadow: '0 10px 20px rgba(5, 150, 105, 0.25)',
                }}
              >
                <div style={{ fontSize: '0.72rem', opacity: 0.85, fontWeight: 600 }}>
                  TOTAL KAS MASJID TERKUMPUL
                </div>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, margin: '6px 0 10px' }}>
                  {formatRupiah(totalSaldo)}
                </div>
                <div style={{ fontSize: '0.72rem', opacity: 0.9 }}>
                  ✓ Update Real-Time Terverifikasi DKM
                </div>
              </div>

              {/* Kartu Tiap Pos Kas */}
              {kategoriKas.map((kat, idx) => (
                <div
                  key={kat.id}
                  style={{
                    minWidth: '85%',
                    scrollSnapAlign: 'start',
                    background: '#ffffff',
                    color: '#0f172a',
                    borderRadius: 20,
                    padding: '18px 20px',
                    border: '1.5px solid var(--border-subtle)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: kat.color || '#10b981' }} />
                    {kat.nama}
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, margin: '6px 0 10px', color: 'var(--primary-dark)' }}>
                    {formatRupiah(kat.saldo)}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                    Alokasi Kas: ~{kat.alokasiPersen}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TOMBOL BESAR DONASI QRIS */}
          <div style={{ marginBottom: 20 }}>
            <button
              onClick={() => setShowQrisModal(true)}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                border: 'none',
                borderRadius: 20,
                padding: '16px 20px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(217, 119, 6, 0.3)',
                transition: 'transform 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: 'rgba(255,255,255,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <QrCode size={28} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Infaq QRIS Cepat</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>BCA, Mandiri, BSI, GoPay, OVO, Dana</div>
                </div>
              </div>
              <ChevronRight size={22} />
            </button>
          </div>

          {/* JADWAL SALAT HARI INI DENGAN NEXT COUNTDOWN */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 20,
              padding: '18px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: 20,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={16} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                  Jadwal Salat Hari Ini
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 999,
                  background: '#ecfdf5',
                  color: '#059669',
                }}
              >
                Menjelang Maghrib (17:56)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, textAlign: 'center' }}>
              {prayerTimes.slice(1, 5).map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding: '8px 4px',
                    borderRadius: 10,
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{p.name}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginTop: 2 }}>
                    {p.time}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, textAlign: 'center', marginTop: 8 }}>
              {prayerTimes.slice(5).map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding: '8px 4px',
                    borderRadius: 10,
                    background: p.next ? '#ecfdf5' : '#f8fafc',
                    border: p.next ? '1.5px solid #86efac' : '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: p.next ? '#047857' : '#64748b', fontWeight: p.next ? 700 : 400 }}>
                    {p.name} {p.next && '★ (Berikutnya)'}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: p.next ? '#065f46' : '#0f172a', marginTop: 2 }}>
                    {p.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK ACCESS MENUS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button
              type="button"
              onClick={onOpenFacilityBooking}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: 16,
                padding: '16px',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                <Building size={18} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Pinjam Aula</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                Cek jadwal & ajukan sewa
              </div>
            </button>

            <button
              type="button"
              onClick={onOpenZakatModal}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: 16,
                padding: '16px',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: '#fef3c7',
                  color: '#b45309',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                <Heart size={18} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Bayar Zakat</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                Fitrah beras / uang online
              </div>
            </button>
          </div>
        </div>

        {/* QRIS POPUP MODAL FOR MOBILE SIMULATOR */}
        {showQrisModal && (
          <div className="modal-overlay" onClick={() => setShowQrisModal(false)}>
            <div className="modal-card" style={{ maxWidth: 360 }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header" style={{ background: '#059669', color: 'white' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'white' }}>
                  Scan QRIS Infaq Masjid
                </h3>
                <button
                  onClick={() => setShowQrisModal(false)}
                  style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body" style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: 12 }}>
                  NMID: ID1020038891029<br />
                  <strong>DKM MASJID JAMI&apos; AL-IKHLAS</strong>
                </p>

                {/* SVG QR Code Simulation */}
                <div
                  style={{
                    background: '#ffffff',
                    padding: 16,
                    borderRadius: 16,
                    border: '2px solid #059669',
                    display: 'inline-block',
                    marginBottom: 16,
                  }}
                >
                  <QrCode size={180} style={{ color: '#0f172a' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 16 }}>
                  {[20000, 50000, 100000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setQrisAmount(amt)}
                      style={{
                        padding: '6px',
                        borderRadius: 8,
                        border: '1px solid',
                        borderColor: qrisAmount === amt ? 'var(--primary)' : '#cbd5e1',
                        background: qrisAmount === amt ? 'var(--primary-light)' : '#f8fafc',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      {formatRupiah(amt)}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    alert('Terima kasih atas infaq dan sedekah Anda. Semoga berkah.');
                    setShowQrisModal(false);
                  }}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <CheckCircle2 size={16} />
                  <span>Simulasi Bayar {formatRupiah(qrisAmount)}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
