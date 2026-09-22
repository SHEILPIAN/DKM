'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  Beef,
  Users,
  QrCode,
  CheckCircle2,
  PlusCircle,
  Share2,
  Sparkles,
  Plus,
  Edit3,
  Trash2,
  X,
  Phone,
} from 'lucide-react';
import { HewanQurban, ShohibulQurban, TipeHewan } from '@/types/dkm';
import { formatRupiah } from '@/components/modules/financial/AnalyticsCards';

interface MaslamIdulAdhaProps {
  onBack: () => void;
  hewanQurban: HewanQurban[];
  onRegisterShohibul: (
    hewanId: number,
    shohibulData: Omit<ShohibulQurban, 'id' | 'hewanId' | 'tanggalDaftar'>
  ) => void;
  onAddHewanQurban?: (hewan: Omit<HewanQurban, 'id' | 'shohibul'>) => void;
  onUpdateHewanQurban?: (hewan: HewanQurban) => void;
  onDeleteHewanQurban?: (id: number) => void;
  onUpdateShohibul?: (hewanId: number, shohibul: ShohibulQurban) => void;
  onDeleteShohibul?: (hewanId: number, shohibulId: number) => void;
}

export const MaslamIdulAdha: React.FC<MaslamIdulAdhaProps> = ({
  onBack,
  hewanQurban,
  onRegisterShohibul,
  onAddHewanQurban,
  onUpdateHewanQurban,
  onDeleteHewanQurban,
  onUpdateShohibul,
  onDeleteShohibul,
}) => {
  const [selectedHewanId, setSelectedHewanId] = useState<number>(hewanQurban[0]?.id || 1);
  const [isDaftarModalOpen, setIsDaftarModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Shohibul form state
  const [editingShohibul, setEditingShohibul] = useState<ShohibulQurban | null>(null);
  const [namaShohibul, setNamaShohibul] = useState('');
  const [atasNama, setAtasNama] = useState('');
  const [noWa, setNoWa] = useState('');
  const [bayarLunas, setBayarLunas] = useState(true);

  // Hewan modal state
  const [isHewanModalOpen, setIsHewanModalOpen] = useState(false);
  const [editingHewan, setEditingHewan] = useState<HewanQurban | null>(null);
  const [kodeHewan, setKodeHewan] = useState('');
  const [tipeHewan, setTipeHewan] = useState<TipeHewan>('SAPI');
  const [hargaBeli, setHargaBeli] = useState('');
  const [slotMaks, setSlotMaks] = useState(7);

  const totalShohibul = hewanQurban.reduce((acc, h) => acc + h.shohibul.length, 0);

  // Handlers for Shohibul
  const handleOpenAddShohibul = (hewanId?: number) => {
    if (hewanId) setSelectedHewanId(hewanId);
    setEditingShohibul(null);
    setNamaShohibul('');
    setAtasNama('');
    setNoWa('');
    setBayarLunas(true);
    setIsDaftarModalOpen(true);
  };

  const handleOpenEditShohibul = (hewanId: number, shohibul: ShohibulQurban) => {
    setSelectedHewanId(hewanId);
    setEditingShohibul(shohibul);
    setNamaShohibul(shohibul.nama);
    setAtasNama(shohibul.atasNama);
    setNoWa(shohibul.kontak || '');
    setBayarLunas(shohibul.bayarLunas);
    setIsDaftarModalOpen(true);
  };

  const handleSubmitShohibul = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaShohibul.trim()) {
      alert('Mohon isi nama shohibul qurban.');
      return;
    }

    if (editingShohibul) {
      if (onUpdateShohibul) {
        onUpdateShohibul(selectedHewanId, {
          ...editingShohibul,
          nama: namaShohibul,
          atasNama: atasNama || `${namaShohibul} & Keluarga`,
          kontak: noWa || '081299887766',
          bayarLunas,
        });
      }
    } else {
      onRegisterShohibul(selectedHewanId, {
        nama: namaShohibul,
        atasNama: atasNama || `${namaShohibul} & Keluarga`,
        kontak: noWa || '081299887766',
        bayarLunas,
      });
    }

    setIsDaftarModalOpen(false);
  };

  const handleDeleteShohibulItem = (hewanId: number, shohibulId: number) => {
    if (confirm('Yakin ingin membatalkan/menghapus shohibul ini dari kelompok?')) {
      if (onDeleteShohibul) {
        onDeleteShohibul(hewanId, shohibulId);
      }
    }
  };

  // Handlers for Hewan Qurban
  const handleOpenAddHewan = () => {
    setEditingHewan(null);
    const countSapi = hewanQurban.filter((h) => h.tipeHewan === 'SAPI').length + 1;
    setKodeHewan(`SAPI-0${countSapi} (Kelompok Baru)`);
    setTipeHewan('SAPI');
    setHargaBeli('24500000');
    setSlotMaks(7);
    setIsHewanModalOpen(true);
  };

  const handleOpenEditHewan = (hewan: HewanQurban) => {
    setEditingHewan(hewan);
    setKodeHewan(hewan.kodeHewan);
    setTipeHewan(hewan.tipeHewan);
    setHargaBeli(hewan.hargaBeli.toString());
    setSlotMaks(hewan.slotMaks);
    setIsHewanModalOpen(true);
  };

  const handleSaveHewan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kodeHewan.trim()) {
      alert('Mohon isi kode kelompok hewan.');
      return;
    }
    const hargaNum = Number(hargaBeli.replace(/\D/g, '')) || 24500000;

    if (editingHewan) {
      if (onUpdateHewanQurban) {
        onUpdateHewanQurban({
          ...editingHewan,
          kodeHewan,
          tipeHewan,
          hargaBeli: hargaNum,
          slotMaks: Number(slotMaks),
        });
      }
    } else {
      if (onAddHewanQurban) {
        onAddHewanQurban({
          kodeHewan,
          tipeHewan,
          hargaBeli: hargaNum,
          slotMaks: Number(slotMaks),
        });
      }
    }
    setIsHewanModalOpen(false);
  };

  const handleDeleteHewanItem = (id: number) => {
    if (confirm('Yakin ingin menghapus kelompok hewan qurban ini?')) {
      if (onDeleteHewanQurban) {
        onDeleteHewanQurban(id);
      }
    }
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #7e22ce 0%, #581c87 100%)',
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
            <span>Kepanitiaan Qurban</span>
          </button>
        </div>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
            Idul Adha & Qurban 1447H
          </h2>
          <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
            AL-MUHAJIRIN KAYURINGIN BEKASI
          </p>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          padding: '16px 16px 10px',
        }}
      >
        <button
          type="button"
          onClick={() => handleOpenAddShohibul()}
          style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 14,
            padding: '12px',
            fontWeight: 700,
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            boxShadow: '0 4px 10px rgba(126, 34, 206, 0.25)',
            cursor: 'pointer',
          }}
        >
          <PlusCircle size={16} />
          <span>+ Daftar Shohibul</span>
        </button>

        <button
          type="button"
          onClick={handleOpenAddHewan}
          style={{
            background: '#ffffff',
            color: '#7e22ce',
            border: '1.5px solid #d8b4fe',
            borderRadius: 14,
            padding: '12px',
            fontWeight: 700,
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            cursor: 'pointer',
          }}
        >
          <Plus size={16} />
          <span>+ Kelompok Hewan</span>
        </button>
      </div>

      {/* Kelompok Sapi / Kambing */}
      <div style={{ padding: '8px 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
            Kelompok Hewan Qurban (Patungan Sapi 1:7)
          </span>
          <span
            style={{
              background: '#f3e8ff',
              color: '#7e22ce',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: 999,
            }}
          >
            {totalShohibul} Shohibul Terdaftar
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {hewanQurban.map((hewan) => {
            const isFull = hewan.shohibul.length >= hewan.slotMaks;
            const remaining = hewan.slotMaks - hewan.shohibul.length;
            const hargaPerSlot = Math.round(hewan.hargaBeli / hewan.slotMaks);

            return (
              <div
                key={hewan.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  border: isFull ? '1.5px solid #10b981' : '1px solid #e2e8f0',
                  padding: '16px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: '1.1rem' }}>
                        {hewan.tipeHewan === 'SAPI' ? '🐄' : '🐐'}
                      </span>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                        {hewan.kodeHewan}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                      Estimasi: {formatRupiah(hewan.hargaBeli)} • ({formatRupiah(hargaPerSlot)} / jiwa)
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span
                      style={{
                        background: isFull ? '#dcfce7' : '#fef3c7',
                        color: isFull ? '#166534' : '#854d0e',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: 999,
                        border: `1px solid ${isFull ? '#86efac' : '#fde047'}`,
                      }}
                    >
                      {isFull ? `${hewan.slotMaks}/${hewan.slotMaks} LENGKAP` : `Sisa ${remaining} Slot`}
                    </span>

                    {/* Edit & Delete Hewan buttons */}
                    <button
                      type="button"
                      onClick={() => handleOpenEditHewan(hewan)}
                      title="Edit Kelompok Hewan"
                      style={{
                        background: '#f3e8ff',
                        border: '1px solid #d8b4fe',
                        borderRadius: 8,
                        padding: '4px 6px',
                        color: '#7e22ce',
                        cursor: 'pointer',
                      }}
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteHewanItem(hewan.id)}
                      title="Hapus Kelompok Hewan"
                      style={{
                        background: '#fef2f2',
                        border: '1px solid #fca5a5',
                        borderRadius: 8,
                        padding: '4px 6px',
                        color: '#dc2626',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Progress bar slot 1:7 */}
                <div style={{ margin: '12px 0 10px' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {Array.from({ length: hewan.slotMaks }).map((_, idx) => {
                      const isOccupied = idx < hewan.shohibul.length;
                      return (
                        <div
                          key={idx}
                          style={{
                            flex: 1,
                            height: 6,
                            borderRadius: 999,
                            background: isOccupied ? '#7e22ce' : '#e2e8f0',
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Shohibul List */}
                <div style={{ background: '#f8fafc', borderRadius: 12, padding: '10px 12px', marginTop: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#475569' }}>
                      Shohibul Terdaftar ({hewan.shohibul.length}/{hewan.slotMaks}):
                    </div>
                    {!isFull && (
                      <button
                        type="button"
                        onClick={() => handleOpenAddShohibul(hewan.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#7e22ce',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Plus size={12} />
                        <span>Tambah</span>
                      </button>
                    )}
                  </div>

                  {hewan.shohibul.length === 0 ? (
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontStyle: 'italic' }}>
                      Belum ada shohibul terdaftar di kelompok ini.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {hewan.shohibul.map((s, idx) => (
                        <div
                          key={s.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: '#ffffff',
                            padding: '6px 10px',
                            borderRadius: 8,
                            border: '1px solid #e2e8f0',
                            fontSize: '0.75rem',
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: 800, color: '#0f172a' }}>
                              {idx + 1}. {s.nama}
                            </span>{' '}
                            <span style={{ color: '#64748b' }}>({s.atasNama})</span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <button
                              type="button"
                              onClick={() => handleOpenEditShohibul(hewan.id, s)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#7e22ce',
                                cursor: 'pointer',
                                padding: 2,
                              }}
                            >
                              <Edit3 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteShohibulItem(hewan.id, s.id)}
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
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {!isFull && (
                  <button
                    type="button"
                    onClick={() => handleOpenAddShohibul(hewan.id)}
                    className="btn-outline"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '8px',
                      fontSize: '0.78rem',
                      marginTop: 10,
                      borderColor: '#d8b4fe',
                      color: '#7e22ce',
                    }}
                  >
                    + Gabung Kelompok Ini ({formatRupiah(hargaPerSlot)})
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL 1: Pendaftaran / Edit Shohibul */}
      {isDaftarModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingShohibul ? 'Edit Data Shohibul Qurban' : 'Pendaftaran Shohibul Qurban'}
              </h3>
              <button
                type="button"
                onClick={() => setIsDaftarModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitShohibul} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Pilih Kelompok Hewan
                </label>
                <select
                  value={selectedHewanId}
                  onChange={(e) => setSelectedHewanId(Number(e.target.value))}
                  disabled={!!editingShohibul}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.82rem',
                    marginTop: 4,
                  }}
                >
                  {hewanQurban.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.kodeHewan} ({h.shohibul.length}/{h.slotMaks} Terisi)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Nama Lengkap Shohibul (Pekurban)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: H. Bambang Sugianto"
                  value={namaShohibul}
                  onChange={(e) => setNamaShohibul(e.target.value)}
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
                  Niat Atas Nama (Keluarga)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: H. Bambang & Keluarga Besar"
                  value={atasNama}
                  onChange={(e) => setAtasNama(e.target.value)}
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
                  Nomor WhatsApp / Kontak
                </label>
                <input
                  type="text"
                  placeholder="0812-9988-7766"
                  value={noWa}
                  onChange={(e) => setNoWa(e.target.value)}
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

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <input
                  type="checkbox"
                  id="bayarLunasCheckbox"
                  checked={bayarLunas}
                  onChange={(e) => setBayarLunas(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: '#7e22ce' }}
                />
                <label htmlFor="bayarLunasCheckbox" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                  Sudah Lunas Pembayaran Slot Qurban
                </label>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsDaftarModalOpen(false)}
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
                  style={{ flex: 2, justifyContent: 'center', background: '#7e22ce', padding: '10px' }}
                >
                  <CheckCircle2 size={16} />
                  <span>{editingShohibul ? 'Simpan Perubahan' : 'Daftarkan Shohibul'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Tambah / Edit Kelompok Hewan Qurban */}
      {isHewanModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 390 }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingHewan ? 'Edit Kelompok Hewan' : 'Buka Kelompok Hewan Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsHewanModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveHewan} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Jenis Hewan
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setTipeHewan('SAPI');
                      setSlotMaks(7);
                    }}
                    style={{
                      padding: '8px',
                      borderRadius: 10,
                      border: tipeHewan === 'SAPI' ? '2px solid #7e22ce' : '1px solid #cbd5e1',
                      background: tipeHewan === 'SAPI' ? '#f3e8ff' : '#ffffff',
                      color: tipeHewan === 'SAPI' ? '#7e22ce' : '#64748b',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    🐄 Sapi (Slot 7)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTipeHewan('KAMBING');
                      setSlotMaks(1);
                    }}
                    style={{
                      padding: '8px',
                      borderRadius: 10,
                      border: tipeHewan === 'KAMBING' ? '2px solid #7e22ce' : '1px solid #cbd5e1',
                      background: tipeHewan === 'KAMBING' ? '#f3e8ff' : '#ffffff',
                      color: tipeHewan === 'KAMBING' ? '#7e22ce' : '#64748b',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    🐐 Kambing / Domba (Slot 1)
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Kode / Nama Kelompok
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SAPI-03 (Kelompok C)"
                  value={kodeHewan}
                  onChange={(e) => setKodeHewan(e.target.value)}
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
                  Estimasi Total Harga Beli (Rp)
                </label>
                <input
                  type="text"
                  required
                  placeholder="24500000"
                  value={hargaBeli}
                  onChange={(e) => setHargaBeli(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    marginTop: 4,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Maksimal Slot Shohibul
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={slotMaks}
                  onChange={(e) => setSlotMaks(Number(e.target.value))}
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
                  onClick={() => setIsHewanModalOpen(false)}
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
                  style={{ flex: 2, justifyContent: 'center', background: '#7e22ce', padding: '10px' }}
                >
                  <CheckCircle2 size={16} />
                  <span>{editingHewan ? 'Perbarui Kelompok' : 'Buka Kelompok'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
