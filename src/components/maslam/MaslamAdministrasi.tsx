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
  Users,
  Plus,
  Edit3,
  Trash2,
  X,
  Phone,
} from 'lucide-react';
import { Pegawai, Absensi, SlipGaji, WaktuSalat, StatusHadir, Jabatan } from '@/types/dkm';
import { formatRupiah } from '@/components/modules/financial/AnalyticsCards';

interface MaslamAdministrasiProps {
  onBack: () => void;
  pegawai: Pegawai[];
  absensi: Absensi[];
  slipGaji: SlipGaji[];
  onAddAbsensi: (absenData: Omit<Absensi, 'id'>) => void;
  onUpdateAbsensi?: (absenData: Absensi) => void;
  onDeleteAbsensi?: (id: number) => void;
  onApproveSalary: (slipId: number) => void;
  onAddPegawai?: (p: Omit<Pegawai, 'id'>) => void;
  onUpdatePegawai?: (p: Pegawai) => void;
  onDeletePegawai?: (id: number) => void;
  onAddSlipGaji?: (slip: Omit<SlipGaji, 'id' | 'createdAt'>) => void;
  onUpdateSlipGaji?: (slip: SlipGaji) => void;
  onDeleteSlipGaji?: (id: number) => void;
}

const JABATAN_LIST: { key: Jabatan; label: string }[] = [
  { key: 'IMAM', label: 'Imam Rawatib' },
  { key: 'MUADZIN', label: 'Muadzin' },
  { key: 'MARBOT', label: 'Marbot / Kebersihan' },
  { key: 'GURU_TPA', label: 'Guru / Ustadz TPA' },
  { key: 'SATPAM', label: 'Petugas Keamanan' },
];

export const MaslamAdministrasi: React.FC<MaslamAdministrasiProps> = ({
  onBack,
  pegawai,
  absensi,
  slipGaji,
  onAddAbsensi,
  onUpdateAbsensi,
  onDeleteAbsensi,
  onApproveSalary,
  onAddPegawai,
  onUpdatePegawai,
  onDeletePegawai,
  onAddSlipGaji,
  onUpdateSlipGaji,
  onDeleteSlipGaji,
}) => {
  const [activeTab, setActiveTab] = useState<'absensi' | 'slip' | 'pegawai'>('absensi');

  // Quick Absensi Form
  const [selectedPegawaiId, setSelectedPegawaiId] = useState<number>(pegawai[0]?.id || 1);
  const [selectedSalat, setSelectedSalat] = useState<WaktuSalat>('SUBUH');
  const [selectedStatus, setSelectedStatus] = useState<StatusHadir>('HADIR');

  // Edit Absensi Modal
  const [isEditAbsenModalOpen, setIsEditAbsenModalOpen] = useState(false);
  const [editingAbsen, setEditingAbsen] = useState<Absensi | null>(null);
  const [editAbsenStatus, setEditAbsenStatus] = useState<StatusHadir>('HADIR');
  const [editAbsenSalat, setEditAbsenSalat] = useState<WaktuSalat>('SUBUH');

  // Pegawai Modal
  const [isPegawaiModalOpen, setIsPegawaiModalOpen] = useState(false);
  const [editingPegawai, setEditingPegawai] = useState<Pegawai | null>(null);
  const [pegawaiNama, setPegawaiNama] = useState('');
  const [pegawaiJabatan, setPegawaiJabatan] = useState<Jabatan>('IMAM');
  const [pegawaiGaji, setPegawaiGaji] = useState('');
  const [pegawaiTunjangan, setPegawaiTunjangan] = useState('');
  const [pegawaiNoHp, setPegawaiNoHp] = useState('');
  const [pegawaiRekening, setPegawaiRekening] = useState('');

  // Slip Gaji Modal
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false);
  const [editingSlip, setEditingSlip] = useState<SlipGaji | null>(null);
  const [slipPegawaiId, setSlipPegawaiId] = useState<number>(pegawai[0]?.id || 1);
  const [slipBulan, setSlipBulan] = useState('September 2026');
  const [slipGajiPokok, setSlipGajiPokok] = useState('');
  const [slipTunjangan, setSlipTunjangan] = useState('');
  const [slipPotongan, setSlipPotongan] = useState('');

  // Record Quick Absensi
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

  // Edit / Delete Absensi
  const handleOpenEditAbsen = (ab: Absensi) => {
    setEditingAbsen(ab);
    setEditAbsenStatus(ab.status);
    setEditAbsenSalat(ab.waktuSalat);
    setIsEditAbsenModalOpen(true);
  };

  const handleSaveEditAbsen = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAbsen && onUpdateAbsensi) {
      onUpdateAbsensi({
        ...editingAbsen,
        status: editAbsenStatus,
        waktuSalat: editAbsenSalat,
      });
    }
    setIsEditAbsenModalOpen(false);
  };

  const handleDeleteAbsenItem = (id: number) => {
    if (confirm('Yakin ingin menghapus catatan absensi ini?')) {
      if (onDeleteAbsensi) {
        onDeleteAbsensi(id);
      }
    }
  };

  // Pegawai Handlers
  const handleOpenAddPegawai = () => {
    setEditingPegawai(null);
    setPegawaiNama('');
    setPegawaiJabatan('IMAM');
    setPegawaiGaji('2500000');
    setPegawaiTunjangan('50000');
    setPegawaiNoHp('');
    setPegawaiRekening('BSI - 7182998811');
    setIsPegawaiModalOpen(true);
  };

  const handleOpenEditPegawai = (p: Pegawai) => {
    setEditingPegawai(p);
    setPegawaiNama(p.nama);
    setPegawaiJabatan(p.jabatan);
    setPegawaiGaji(p.gajiPokok.toString());
    setPegawaiTunjangan(p.tunjanganHadir.toString());
    setPegawaiNoHp(p.noHp);
    setPegawaiRekening(p.rekening);
    setIsPegawaiModalOpen(true);
  };

  const handleSavePegawai = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pegawaiNama.trim()) {
      alert('Mohon lengkapi nama pegawai.');
      return;
    }
    const gajiNum = Number(pegawaiGaji.replace(/\D/g, '')) || 0;
    const tunjanganNum = Number(pegawaiTunjangan.replace(/\D/g, '')) || 0;

    if (editingPegawai) {
      if (onUpdatePegawai) {
        onUpdatePegawai({
          ...editingPegawai,
          nama: pegawaiNama,
          jabatan: pegawaiJabatan,
          gajiPokok: gajiNum,
          tunjanganHadir: tunjanganNum,
          noHp: pegawaiNoHp || '081299887766',
          rekening: pegawaiRekening || 'BSI - Rekening Petugas',
        });
      }
    } else {
      if (onAddPegawai) {
        onAddPegawai({
          nama: pegawaiNama,
          jabatan: pegawaiJabatan,
          gajiPokok: gajiNum,
          tunjanganHadir: tunjanganNum,
          noHp: pegawaiNoHp || '081299887766',
          rekening: pegawaiRekening || 'BSI - Rekening Petugas',
        });
      }
    }
    setIsPegawaiModalOpen(false);
  };

  const handleDeletePegawaiItem = (id: number) => {
    if (confirm('Yakin ingin menghapus data pegawai / petugas ini?')) {
      if (onDeletePegawai) {
        onDeletePegawai(id);
      }
    }
  };

  // Slip Gaji Handlers
  const handleOpenAddSlip = () => {
    setEditingSlip(null);
    const p = pegawai[0];
    setSlipPegawaiId(p?.id || 1);
    setSlipBulan('September 2026');
    setSlipGajiPokok(p ? p.gajiPokok.toString() : '2000000');
    setSlipTunjangan('350000');
    setSlipPotongan('0');
    setIsSlipModalOpen(true);
  };

  const handleOpenEditSlip = (s: SlipGaji) => {
    setEditingSlip(s);
    setSlipPegawaiId(s.pegawaiId);
    setSlipBulan(s.bulan);
    setSlipGajiPokok(s.gajiPokok.toString());
    setSlipTunjangan(s.tunjangan.toString());
    setSlipPotongan(s.potongan.toString());
    setIsSlipModalOpen(true);
  };

  const handleSaveSlip = (e: React.FormEvent) => {
    e.preventDefault();
    const p = pegawai.find((x) => x.id === slipPegawaiId);
    const gaji = Number(slipGajiPokok.replace(/\D/g, '')) || 0;
    const tunj = Number(slipTunjangan.replace(/\D/g, '')) || 0;
    const pot = Number(slipPotongan.replace(/\D/g, '')) || 0;
    const total = gaji + tunj - pot;

    if (editingSlip) {
      if (onUpdateSlipGaji) {
        onUpdateSlipGaji({
          ...editingSlip,
          bulan: slipBulan,
          gajiPokok: gaji,
          tunjangan: tunj,
          potongan: pot,
          nominal: total,
          pegawaiId: slipPegawaiId,
          pegawaiNama: p?.nama || editingSlip.pegawaiNama,
          pegawaiJabatan: p?.jabatan || editingSlip.pegawaiJabatan,
        });
      }
    } else {
      if (onAddSlipGaji) {
        onAddSlipGaji({
          bulan: slipBulan,
          nominal: total,
          gajiPokok: gaji,
          tunjangan: tunj,
          potongan: pot,
          status: 'PENDING',
          pegawaiId: slipPegawaiId,
          pegawaiNama: p?.nama || 'Petugas DKM',
          pegawaiJabatan: p?.jabatan || 'MARBOT',
        });
      }
    }
    setIsSlipModalOpen(false);
  };

  const handleDeleteSlipItem = (id: number) => {
    if (confirm('Yakin ingin menghapus slip kafalah ini?')) {
      if (onDeleteSlipGaji) {
        onDeleteSlipGaji(id);
      }
    }
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          color: 'white',
          padding: '16px 18px 20px', position: 'sticky', top: 0, zIndex: 30,
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
            AL-MUHAJIRIN KAYURINGIN BEKASI
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="maslam-tabs-row">
        <button
          type="button"
          onClick={() => setActiveTab('absensi')}
          className={`maslam-tab-pill ${activeTab === 'absensi' ? 'active' : ''}`}
        >
          Absensi Shalat
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('slip')}
          className={`maslam-tab-pill ${activeTab === 'slip' ? 'active' : ''}`}
        >
          Slip Kafalah ({slipGaji.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pegawai')}
          className={`maslam-tab-pill ${activeTab === 'pegawai' ? 'active' : ''}`}
        >
          Petugas ({pegawai.length})
        </button>
      </div>

      {/* TAB 1: ABSENSI */}
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

          {/* Riwayat Absensi */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
              Riwayat Absensi Terkini ({absensi.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {absensi.slice(0, 10).map((ab) => (
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
                    <div style={{ fontWeight: 800, fontSize: '0.84rem', color: '#0f172a' }}>
                      {ab.pegawaiNama}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                      Shalat {ab.waktuSalat} • {ab.tanggal}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
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
                    <button
                      type="button"
                      onClick={() => handleOpenEditAbsen(ab)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0284c7',
                        cursor: 'pointer',
                        padding: 3,
                      }}
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteAbsenItem(ab.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#dc2626',
                        cursor: 'pointer',
                        padding: 3,
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SLIP GAJI */}
      {activeTab === 'slip' && (
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
              Daftar Slip Kafalah / Gaji Petugas
            </span>
            <button
              type="button"
              onClick={handleOpenAddSlip}
              style={{
                background: '#0284c7',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                padding: '6px 12px',
                fontWeight: 700,
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
              }}
            >
              <Plus size={14} />
              <span>+ Buat Slip</span>
            </button>
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
                      <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>
                        {s.pegawaiNama}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: 2 }}>
                        {s.pegawaiJabatan} • Periode {s.bulan}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
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
                      {!isPaid && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleOpenEditSlip(s)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#0284c7',
                              cursor: 'pointer',
                              padding: 2,
                            }}
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSlipItem(s.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#dc2626',
                              cursor: 'pointer',
                              padding: 2,
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </>
                      )}
                    </div>
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
                    {s.potongan > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dc2626', marginTop: 2 }}>
                        <span>Potongan Alpa:</span>
                        <span>- {formatRupiah(s.potongan)}</span>
                      </div>
                    )}
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

      {/* TAB 3: MASTER PETUGAS & PEGAWAI */}
      {activeTab === 'pegawai' && (
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
              Daftar Petugas & Pegawai Masjid
            </span>
            <button
              type="button"
              onClick={handleOpenAddPegawai}
              style={{
                background: '#0284c7',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                padding: '6px 12px',
                fontWeight: 700,
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
              }}
            >
              <Plus size={14} />
              <span>+ Petugas</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pegawai.map((p) => (
              <div
                key={p.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  border: '1px solid #e2e8f0',
                  padding: '14px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>
                      {p.nama}
                    </div>
                    <span
                      style={{
                        display: 'inline-block',
                        background: '#e0f2fe',
                        color: '#0369a1',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '1px 8px',
                        borderRadius: 6,
                        marginTop: 4,
                      }}
                    >
                      {p.jabatan}
                    </span>
                    <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: 6 }}>
                      💵 Gaji Pokok: <strong>{formatRupiah(p.gajiPokok)}</strong>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                      ⭐ Tunjangan Shalat: {formatRupiah(p.tunjanganHadir)} / kehadiran
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                      📱 {p.noHp} • 🏦 {p.rekening}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => handleOpenEditPegawai(p)}
                      style={{
                        background: '#f0f9ff',
                        border: '1px solid #bae6fd',
                        borderRadius: 8,
                        padding: '5px 8px',
                        color: '#0284c7',
                        cursor: 'pointer',
                      }}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePegawaiItem(p.id)}
                      style={{
                        background: '#fef2f2',
                        border: '1px solid #fca5a5',
                        borderRadius: 8,
                        padding: '5px 8px',
                        color: '#dc2626',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: Tambah / Edit Pegawai */}
      {isPegawaiModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingPegawai ? 'Edit Data Petugas' : 'Tambah Petugas Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsPegawaiModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePegawai} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ustadz M. Syakir, Lc."
                  value={pegawaiNama}
                  onChange={(e) => setPegawaiNama(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Jabatan Petugas
                </label>
                <select
                  value={pegawaiJabatan}
                  onChange={(e) => setPegawaiJabatan(e.target.value as Jabatan)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                >
                  {JABATAN_LIST.map((j) => (
                    <option key={j.key} value={j.key}>
                      {j.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                    Gaji Pokok (Rp)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2500000"
                    value={pegawaiGaji}
                    onChange={(e) => setPegawaiGaji(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.82rem',
                      marginTop: 4,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                    Tunjangan/Hadir
                  </label>
                  <input
                    type="text"
                    placeholder="50000"
                    value={pegawaiTunjangan}
                    onChange={(e) => setPegawaiTunjangan(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.82rem',
                      marginTop: 4,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Nomor HP / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="0812-3456-7890"
                  value={pegawaiNoHp}
                  onChange={(e) => setPegawaiNoHp(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Nomor Rekening Bank
                </label>
                <input
                  type="text"
                  placeholder="Contoh: BSI - 7182998811"
                  value={pegawaiRekening}
                  onChange={(e) => setPegawaiRekening(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsPegawaiModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#64748b',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 2, justifyContent: 'center', padding: '10px' }}
                >
                  <CheckCircle2 size={16} />
                  <span>{editingPegawai ? 'Simpan Perubahan' : 'Tambah Petugas'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Tambah / Edit Slip Gaji */}
      {isSlipModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingSlip ? 'Edit Slip Kafalah' : 'Buat Slip Kafalah Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsSlipModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSlip} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Pilih Petugas
                </label>
                <select
                  value={slipPegawaiId}
                  onChange={(e) => {
                    const pid = Number(e.target.value);
                    setSlipPegawaiId(pid);
                    const p = pegawai.find((x) => x.id === pid);
                    if (p) {
                      setSlipGajiPokok(p.gajiPokok.toString());
                    }
                  }}
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

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Bulan / Periode
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: September 2026"
                  value={slipBulan}
                  onChange={(e) => setSlipBulan(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                    Gaji Pokok (Rp)
                  </label>
                  <input
                    type="text"
                    required
                    value={slipGajiPokok}
                    onChange={(e) => setSlipGajiPokok(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.82rem',
                      marginTop: 4,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                    Tunjangan (Rp)
                  </label>
                  <input
                    type="text"
                    value={slipTunjangan}
                    onChange={(e) => setSlipTunjangan(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.82rem',
                      marginTop: 4,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Potongan (Rp)
                </label>
                <input
                  type="text"
                  placeholder="0"
                  value={slipPotongan}
                  onChange={(e) => setSlipPotongan(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsSlipModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#64748b',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 2, justifyContent: 'center', padding: '10px' }}
                >
                  <CheckCircle2 size={16} />
                  <span>{editingSlip ? 'Simpan Perubahan' : 'Buat Slip Gaji'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Edit Absensi */}
      {isEditAbsenModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 360 }}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Kehadiran Shalat</h3>
              <button
                type="button"
                onClick={() => setIsEditAbsenModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditAbsen} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: '0.84rem', color: '#0f172a' }}>
                Petugas: <strong>{editingAbsen?.pegawaiNama}</strong>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Waktu Shalat
                </label>
                <select
                  value={editAbsenSalat}
                  onChange={(e) => setEditAbsenSalat(e.target.value as WaktuSalat)}
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
                  value={editAbsenStatus}
                  onChange={(e) => setEditAbsenStatus(e.target.value as StatusHadir)}
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

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsEditAbsenModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#64748b',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 2, justifyContent: 'center', padding: '10px' }}
                >
                  <CheckCircle2 size={16} />
                  <span>Perbarui Status</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
