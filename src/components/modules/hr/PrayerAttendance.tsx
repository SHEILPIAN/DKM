'use client';

import React, { useState } from 'react';
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CalendarCheck,
  UserCheck,
  Plus,
} from 'lucide-react';
import { Pegawai, Absensi, WaktuSalat, StatusHadir } from '@/types/dkm';

interface PrayerAttendanceProps {
  pegawai: Pegawai[];
  absensi: Absensi[];
  onAddAbsensi: (absen: Omit<Absensi, 'id'>) => void;
}

export const PrayerAttendance: React.FC<PrayerAttendanceProps> = ({
  pegawai,
  absensi,
  onAddAbsensi,
}) => {
  const [selectedSalat, setSelectedSalat] = useState<WaktuSalat>('MAGHRIB');
  const [selectedPegawaiId, setSelectedPegawaiId] = useState<number>(pegawai[0]?.id || 1);
  const [selectedStatus, setSelectedStatus] = useState<StatusHadir>('HADIR');

  const waktuSalatList: WaktuSalat[] = ['SUBUH', 'DZUHUR', 'ASHAR', 'MAGHRIB', 'ISYA', 'JUMAT'];

  const handleCheckIn = () => {
    const p = pegawai.find((x) => x.id === Number(selectedPegawaiId));
    onAddAbsensi({
      tanggal: '2026-09-21',
      waktuSalat: selectedSalat,
      status: selectedStatus,
      pegawaiId: Number(selectedPegawaiId),
      pegawaiNama: p?.nama || 'Petugas',
    });
  };

  // Filter absensi for today
  const todayAbsensi = absensi.filter((a) => a.tanggal === '2026-09-21');

  return (
    <div style={{ marginTop: 24 }}>
      {/* Quick Check-In Box */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
          borderRadius: 18,
          border: '1.5px solid var(--border-emerald)',
          padding: '22px',
          marginBottom: 24,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'var(--primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CalendarCheck size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
              Perekaman Kehadiran Tugas Shalat Fardhu & Rawatib
            </h4>
            <p style={{ fontSize: '0.75rem', color: '#166534' }}>
              Check-in petugas Imam, Muadzin, dan Marbot saat bertugas di masjid
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 5, color: '#166534' }}>
              PILIH PETUGAS
            </label>
            <select
              value={selectedPegawaiId}
              onChange={(e) => setSelectedPegawaiId(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid #86efac',
                fontSize: '0.85rem',
                background: '#ffffff',
                fontWeight: 600,
              }}
            >
              {pegawai.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nama} ({p.jabatan})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 5, color: '#166534' }}>
              WAKTU SALAT
            </label>
            <select
              value={selectedSalat}
              onChange={(e) => setSelectedSalat(e.target.value as WaktuSalat)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid #86efac',
                fontSize: '0.85rem',
                background: '#ffffff',
                fontWeight: 600,
              }}
            >
              {waktuSalatList.map((w) => (
                <option key={w} value={w}>
                  Salat {w}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 5, color: '#166534' }}>
              STATUS KEHADIRAN
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as StatusHadir)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid #86efac',
                fontSize: '0.85rem',
                background: '#ffffff',
                fontWeight: 600,
              }}
            >
              <option value="HADIR">HADIR TEPAT WAKTU</option>
              <option value="IZIN">IZIN DENGAN SURAT</option>
              <option value="SAKIT">SAKIT</option>
              <option value="ALPA">ALPA (TANPA KETERANGAN)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleCheckIn}
            className="btn-primary"
            style={{ height: 42, justifyContent: 'center' }}
          >
            <CheckCircle size={16} />
            <span>Rekam Kehadiran</span>
          </button>
        </div>
      </div>

      {/* Tabel Log Kehadiran Hari Ini */}
      <div className="table-container">
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)', background: '#f8fafc' }}>
          <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#475569' }}>
            Log Kehadiran Petugas (Senin, 21 September 2026)
          </span>
        </div>
        <table className="dkm-table">
          <thead>
            <tr>
              <th>Waktu Salat</th>
              <th>Nama Petugas</th>
              <th>Status Hadir</th>
              <th>Dampak Honor</th>
            </tr>
          </thead>
          <tbody>
            {todayAbsensi.map((item) => (
              <tr key={item.id}>
                <td>
                  <span
                    style={{
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 6,
                      background: '#f1f5f9',
                      fontSize: '0.75rem',
                      color: '#334155',
                    }}
                  >
                    {item.waktuSalat}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>{item.pegawaiNama}</td>
                <td>
                  <span
                    className="badge-status"
                    style={{
                      background:
                        item.status === 'HADIR'
                          ? '#ecfdf5'
                          : item.status === 'ALPA'
                          ? '#fef2f2'
                          : '#fffbeb',
                      color:
                        item.status === 'HADIR'
                          ? '#059669'
                          : item.status === 'ALPA'
                          ? '#dc2626'
                          : '#b45309',
                    }}
                  >
                    {item.status}
                  </span>
                </td>
                <td style={{ fontSize: '0.8rem', color: item.status === 'HADIR' ? '#059669' : '#dc2626', fontWeight: 600 }}>
                  {item.status === 'HADIR'
                    ? '+ Tunjangan Kehadiran Bertambah'
                    : item.status === 'ALPA'
                    ? '- Terpotong Kafalah Otomatis'
                    : 'Tidak Dipotong (Izin/Sakit)'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
