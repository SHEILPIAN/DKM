'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  UserCheck,
  CreditCard,
  PlusCircle,
} from 'lucide-react';
import { Pegawai, Absensi, SlipGaji, WaktuSalat, StatusHadir } from '@/types/dkm';
import { formatRupiah } from '@/components/modules/financial/AnalyticsCards';

interface MaslamAdministrasiProps {
  onBack: () => void;
  pegawai: Pegawai[];
  absensi: Absensi[];
  slipGaji: SlipGaji[];
  onAddAbsensi: (absenData: Omit<Absensi, 'id'>) => void;
  onApproveSalary: (slipId: number) => void;
}

export const MaslamAdministrasi: React.FC<MaslamAdministrasiProps> = ({
  onBack,
  pegawai,
  absensi,
  slipGaji,
  onAddAbsensi,
  onApproveSalary,
}) => {
  const [activeTab, setActiveTab] = useState<'absensi' | 'slip'>('absensi');
  const [selectedPegawaiId, setSelectedPegawaiId] = useState<number>(pegawai[0]?.id || 1);
  const [selectedSalat, setSelectedSalat] = useState<WaktuSalat>('SUBUH');
  const [selectedStatus, setSelectedStatus] = useState<StatusHadir>('HADIR');

  const handleRecordAbsensi = (e: React.FormEvent) => {
    e.preventDefault();
    const p = pegawai.find((x) => x.id === selectedPegawaiId);
    if (!p) return;

    onAddAbsensi({
      tanggal: new Date().toISOString().split('T')[0],
      waktuSalat: selectedSalat,
      status: selectedStatus,
      pegawaiId: p.id,
      pegawaiNama: p.nama,
    });
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
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
            <span>Administrasi & HR</span>
          </button>
        </div>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
            Administrasi Petugas
          </h2>
          <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
            Masjid AL-MUHAJIRIN KAYURINGIN BEKASI
          </p>
        </div>
      </div>

      {/* Segmented Tabs: Absensi Shalat | Slip Gaji Kafalah */}
      <div className="maslam-tabs-row">
        <button
          type="button"
          onClick={() => setActiveTab('absensi')}
          className={`maslam-tab-pill ${activeTab === 'absensi' ? 'active' : ''}`}
        >
          Absensi Shalat Fardhu
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('slip')}
          className={`maslam-tab-pill ${activeTab === 'slip' ? 'active' : ''}`}
        >
          Slip Gaji / Kafalah
        </button>
      </div>

      {activeTab === 'absensi' && (
        <div style={{ padding: '16px' }}>
          {/* Form Quick Check-in */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              padding: '16px',
              marginBottom: 16,
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
              Check-In Tugas Shalat Petugas Masjid
            </div>

            <form onSubmit={handleRecordAbsensi} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Pilih Petugas (Imam / Muadzin / Marbot)
                </label>
                <select
                  value={selectedPegawaiId}
                  onChange={(e) => setSelectedPegawaiId(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                >
                  {pegawai.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nama} ({p.jabatan})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                    Waktu Shalat
                  </label>
                  <select
                    value={selectedSalat}
                    onChange={(e) => setSelectedSalat(e.target.value as WaktuSalat)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.82rem',
                      marginTop: 4,
                    }}
                  >
                    <option value="SUBUH">Subuh</option>
                    <option value="DZUHUR">Dzuhur</option>
                    <option value="ASHAR">Ashar</option>
                    <option value="MAGHRIB">Maghrib</option>
                    <option value="ISYA">Isya</option>
                    <option value="JUMAT">Jumat</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                    Status Hadir
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as StatusHadir)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.82rem',
                      marginTop: 4,
                    }}
                  >
                    <option value="HADIR">Hadir Tepat Waktu</option>
                    <option value="IZIN">Izin / Badal</option>
                    <option value="SAKIT">Sakit</option>
                    <option value="ALPA">Alpa</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: 4, padding: 10 }}
              >
                <UserCheck size={16} />
                <span>Simpan Kehadiran</span>
              </button>
            </form>
          </div>

          {/* Log Absensi Terakhir */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
              Riwayat Absensi Terkini
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {absensi.slice(0, 6).map((ab) => (
                <div
                  key={ab.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0f172a' }}>
                      {ab.pegawaiNama}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                      Shalat {ab.waktuSalat} • {ab.tanggal}
                    </div>
                  </div>
                  <span
                    style={{
                      background: ab.status === 'HADIR' ? '#dcfce7' : '#fee2e2',
                      color: ab.status === 'HADIR' ? '#166534' : '#991b1b',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 999,
                    }}
                  >
                    {ab.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'slip' && (
        <div style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
            Daftar Slip Kafalah / Gaji Petugas
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {slipGaji.map((s) => {
              const isPaid = s.status === 'PAID';
              return (
                <div
                  key={s.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: 16,
                    border: isPaid ? '1px solid #86efac' : '1px solid #fde047',
                    padding: '16px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>
                        {s.pegawaiNama}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 2 }}>
                        {s.pegawaiJabatan} • Periode {s.bulan}
                      </div>
                    </div>
                    <span
                      style={{
                        background: isPaid ? '#dcfce7' : '#fef3c7',
                        color: isPaid ? '#166534' : '#854d0e',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: 999,
                      }}
                    >
                      {isPaid ? 'LUNAS (PAID)' : 'MENUNGGU ACC'}
                    </span>
                  </div>

                  <div style={{ margin: '10px 0', borderTop: '1px solid #f1f5f9', paddingTop: 8, fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                      <span>Gaji Pokok:</span>
                      <span>{formatRupiah(s.gajiPokok)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', marginTop: 2 }}>
                      <span>Tunjangan Kehadiran:</span>
                      <span>{formatRupiah(s.tunjangan)}</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 900,
                        color: '#0f172a',
                        marginTop: 6,
                        borderTop: '1px dashed #cbd5e1',
                        paddingTop: 6,
                        fontSize: '0.85rem',
                      }}
                    >
                      <span>Total Bersih:</span>
                      <span style={{ color: '#059669' }}>{formatRupiah(s.nominal)}</span>
                    </div>
                  </div>

                  {!isPaid && (
                    <button
                      type="button"
                      onClick={() => onApproveSalary(s.id)}
                      className="btn-primary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '9px',
                        fontSize: '0.8rem',
                        background: '#10b981',
                      }}
                    >
                      ✓ Setujui & Cairkan Kafalah
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
