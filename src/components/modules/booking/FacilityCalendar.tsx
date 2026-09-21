'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Info,
  Building,
} from 'lucide-react';
import { Fasilitas, Reservasi } from '@/types/dkm';
import { formatRupiah } from '../financial/AnalyticsCards';

interface FacilityCalendarProps {
  fasilitas: Fasilitas[];
  reservasi: Reservasi[];
  onSelectDateToBook: (dateStr: string, facilityId: number) => void;
}

export const FacilityCalendar: React.FC<FacilityCalendarProps> = ({
  fasilitas,
  reservasi,
  onSelectDateToBook,
}) => {
  const [selectedFacilityId, setSelectedFacilityId] = useState<number>(fasilitas[0]?.id || 1);
  const selectedFacility = fasilitas.find((f) => f.id === selectedFacilityId) || fasilitas[0];

  // Generate calendar days for September 2026
  // September 2026 starts on Tuesday (index 2) and has 30 days
  const daysInMonth = 30;
  const startDayOfWeek = 2; // 0: Minggu, 1: Senin, 2: Selasa...

  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const getDayReservations = (dayNum: number) => {
    const dayStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const datePrefix = `2026-09-${dayStr}`;

    return reservasi.filter(
      (r) =>
        r.fasilitasId === selectedFacilityId &&
        r.waktuMulai.startsWith(datePrefix) &&
        r.status !== 'REJECTED'
    );
  };

  return (
    <div style={{ marginTop: 24 }}>
      {/* Facility Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 20,
        }}
      >
        {fasilitas.map((f) => {
          const isSelected = f.id === selectedFacilityId;
          return (
            <button
              key={f.id}
              onClick={() => setSelectedFacilityId(f.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 18px',
                borderRadius: 14,
                border: '1.5px solid',
                borderColor: isSelected ? 'var(--primary)' : '#e2e8f0',
                background: isSelected ? 'var(--primary-light)' : '#ffffff',
                color: isSelected ? 'var(--primary-dark)' : '#475569',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.88rem',
                boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <Building size={18} style={{ color: isSelected ? 'var(--primary)' : '#64748b' }} />
              <div style={{ textAlign: 'left' }}>
                <div>{f.nama}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 500, color: '#64748b' }}>
                  {f.kapasitas} • Infaq: {formatRupiah(f.biayaInfaq || 0)}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Calendar Card */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 20,
          border: '1px solid var(--border-subtle)',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Calendar Navigation & Legend */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CalendarIcon size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                September 2026
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Status Ketersediaan Jadwal: {selectedFacility?.nama}
              </p>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 14, fontSize: '0.78rem', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 12, borderRadius: 4, background: '#bbf7d0', border: '1px solid #86efac' }} />
              <span style={{ color: '#166534' }}>Tersedia (Bisa Booking)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 12, borderRadius: 4, background: '#fecaca', border: '1px solid #fca5a5' }} />
              <span style={{ color: '#991b1b' }}>Terisi (APPROVED)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 12, borderRadius: 4, background: '#fef3c7', border: '1px solid #fde68a' }} />
              <span style={{ color: '#b45309' }}>Menunggu Review (PENDING)</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid Header */}
        <div className="calendar-grid" style={{ marginBottom: 8 }}>
          {dayNames.map((name, i) => (
            <div key={i} className="calendar-header-day">
              {name}
            </div>
          ))}
        </div>

        {/* Calendar Day Cells */}
        <div className="calendar-grid">
          {/* Empty cells before start of month */}
          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="calendar-cell disabled" />
          ))}

          {/* Days of month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dayRes = getDayReservations(dayNum);
            const approved = dayRes.find((r) => r.status === 'APPROVED');
            const pending = dayRes.find((r) => r.status === 'PENDING');

            let statusClass = 'available';
            if (approved) statusClass = 'booked';
            else if (pending) statusClass = 'pending';

            const dayStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
            const dateStr = `2026-09-${dayStr}`;

            return (
              <div
                key={dayNum}
                className={`calendar-cell ${statusClass}`}
                onClick={() => {
                  if (approved) {
                    alert(
                      `Tanggal 2026-09-${dayStr} sudah DISETUJUI (APPROVED) untuk ${approved.namaPemohon} (${approved.tujuanAcara}). Tidak dapat dibooking.`
                    );
                    return;
                  }
                  onSelectDateToBook(dateStr, selectedFacilityId);
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      color: approved ? '#991b1b' : pending ? '#92400e' : '#166534',
                    }}
                  >
                    {dayNum}
                  </span>
                  {approved ? (
                    <XCircle size={14} style={{ color: '#dc2626' }} />
                  ) : pending ? (
                    <Clock size={14} style={{ color: '#d97706' }} />
                  ) : (
                    <CheckCircle size={14} style={{ color: '#10b981' }} />
                  )}
                </div>

                <div style={{ fontSize: '0.68rem', lineHeight: 1.2, marginTop: 4 }}>
                  {approved ? (
                    <span style={{ color: '#991b1b', fontWeight: 700 }}>
                      TERISI: {approved.namaPemohon.split(' ')[0]}
                    </span>
                  ) : pending ? (
                    <span style={{ color: '#92400e', fontWeight: 600 }}>
                      REVIEW: {pending.namaPemohon.split(' ')[0]}
                    </span>
                  ) : (
                    <span style={{ color: '#15803d', fontWeight: 500 }}>Bisa Booking</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice Info */}
        <div
          style={{
            marginTop: 18,
            padding: '12px 16px',
            borderRadius: 12,
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: '0.8rem',
            color: '#475569',
          }}
        >
          <Info size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <span>
            Klik pada tanggal hijau (tersedia) untuk langsung membuka formulir pengajuan reservasi. Sistem secara otomatis
            mencegah bentrok jadwal (double booking).
          </span>
        </div>
      </div>
    </div>
  );
};
