'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  Building,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { Fasilitas, Reservasi } from '@/types/dkm';
import { formatRupiah } from '@/components/modules/financial/AnalyticsCards';

interface MaslamAsetProps {
  onBack: () => void;
  fasilitas: Fasilitas[];
  reservasi: Reservasi[];
  onOpenBookingModal: (dateStr: string, facilityId: number) => void;
}

export const MaslamAset: React.FC<MaslamAsetProps> = ({
  onBack,
  fasilitas,
  reservasi,
  onOpenBookingModal,
}) => {
  const [selectedFacility, setSelectedFacility] = useState<number>(1);

  const pendingBookings = reservasi.filter((r) => r.status === 'PENDING');
  const approvedBookings = reservasi.filter((r) => r.status === 'APPROVED');

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #093c78 0%, #062b59 100%)',
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
            <span>Peminjaman Fasilitas</span>
          </button>
        </div>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
            Aset & Aula DKM
          </h2>
          <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
            AL-MUHAJIRIN KAYURINGIN BEKASI
          </p>
        </div>
      </div>

      {/* Facilities Cards */}
      <div style={{ padding: '16px 16px 8px' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
          Daftar Fasilitas Siap Pakai
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {fasilitas.map((f) => (
            <div
              key={f.id}
              style={{
                background: '#ffffff',
                borderRadius: 16,
                border: selectedFacility === f.id ? '2px solid #0a3a78' : '1px solid #e2e8f0',
                padding: '16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {f.nama}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span
                      style={{
                        background: '#e0f2fe',
                        color: '#0369a1',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 6,
                      }}
                    >
                      Kapasitas: {f.kapasitas}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669' }}>
                      Infaq: {f.biayaInfaq ? formatRupiah(f.biayaInfaq) : 'Gratis'}
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '8px 0 12px', lineHeight: 1.4 }}>
                {f.deskripsi}
              </p>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => onOpenBookingModal('2026-09-28', f.id)}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: '9px 12px',
                    fontSize: '0.8rem',
                  }}
                >
                  <Calendar size={15} />
                  <span>Ajukan Jadwal</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jadwal Terkonfirmasi (Anti-Bentrok) */}
      <div style={{ padding: '12px 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
            Jadwal Pemakaian Terkonfirmasi
          </span>
          <span
            style={{
              background: '#dcfce7',
              color: '#166534',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: 999,
            }}
          >
            {approvedBookings.length} Agenda
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {approvedBookings.map((b) => (
            <div
              key={b.id}
              style={{
                background: '#ffffff',
                borderRadius: 14,
                border: '1px solid #e2e8f0',
                padding: '12px 14px',
                borderLeft: '4px solid #10b981',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                  {b.tujuanAcara}
                </span>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#059669' }}>
                  TERJADWAL
                </span>
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 4 }}>
                {b.fasilitasNama}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6, fontSize: '0.72rem', color: '#334155' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Calendar size={13} style={{ color: '#0a3a78' }} />
                  {b.waktuMulai.split('T')[0]}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={13} style={{ color: '#0a3a78' }} />
                  {b.waktuMulai.split('T')[1]} - {b.waktuSelesai.split('T')[1]}
                </span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#0369a1', marginTop: 4 }}>
                Pemohon: {b.namaPemohon} ({b.kontak})
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
