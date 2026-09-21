'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Plus,
  CheckCircle2,
  Lock,
  Sparkles,
  UserPlus,
  AlertCircle,
  X,
  CreditCard,
} from 'lucide-react';
import { HewanQurban, ShohibulQurban } from '@/types/dkm';
import { formatRupiah } from '../financial/AnalyticsCards';

interface QurbanManagerProps {
  hewanQurban: HewanQurban[];
  onRegisterShohibul: (
    hewanId: number,
    shohibul: Omit<ShohibulQurban, 'id' | 'hewanId' | 'tanggalDaftar'>
  ) => void;
}

export const QurbanManager: React.FC<QurbanManagerProps> = ({
  hewanQurban,
  onRegisterShohibul,
}) => {
  const [selectedHewanForRegister, setSelectedHewanForRegister] = useState<HewanQurban | null>(null);
  const [nama, setNama] = useState<string>('');
  const [atasNama, setAtasNama] = useState<string>('');
  const [kontak, setKontak] = useState<string>('');
  const [bayarLunas, setBayarLunas] = useState<boolean>(true);

  const handleOpenRegister = (hewan: HewanQurban) => {
    setSelectedHewanForRegister(hewan);
    setNama('');
    setAtasNama('');
    setKontak('');
    setBayarLunas(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHewanForRegister) return;

    onRegisterShohibul(selectedHewanForRegister.id, {
      nama,
      atasNama: atasNama || `${nama} & Keluarga`,
      kontak,
      bayarLunas,
    });

    setSelectedHewanForRegister(null);
  };

  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Kepanitiaan Qurban: Slot Patungan Sapi (1 Sapi = 7 Orang)
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Sistem otomatis menutup kelompok ketika 7 slot terisi penuh dan membuka grup sapi baru berikutnya
        </p>
      </div>

      {/* Grid of Cattle Groups */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 20,
        }}
      >
        {hewanQurban.map((hewan) => {
          const filledCount = hewan.shohibul.length;
          const isFull = filledCount >= hewan.slotMaks;
          const remaining = Math.max(0, hewan.slotMaks - filledCount);
          const iuranPerSlot = Math.round(hewan.hargaBeli / hewan.slotMaks);

          return (
            <div
              key={hewan.id}
              style={{
                background: '#ffffff',
                borderRadius: 20,
                border: '1.5px solid',
                borderColor: isFull ? '#cbd5e1' : 'var(--border-emerald)',
                padding: '22px',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                      {hewan.kodeHewan}
                    </h4>
                    {isFull && (
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: 999,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          background: '#f1f5f9',
                          color: '#475569',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <Lock size={11} />
                        SLOT PENUH
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Iuran: <strong>{formatRupiah(iuranPerSlot)}</strong> / Pekurban
                  </p>
                </div>

                <div
                  style={{
                    textAlign: 'right',
                    padding: '6px 12px',
                    borderRadius: 12,
                    background: isFull ? '#f1f5f9' : '#ecfdf5',
                    border: `1px solid ${isFull ? '#e2e8f0' : '#a7f3d0'}`,
                  }}
                >
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: isFull ? '#64748b' : '#047857' }}>
                    KETERISIAN
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isFull ? '#334155' : '#059669' }}>
                    {filledCount} / {hewan.slotMaks}
                  </div>
                </div>
              </div>

              {/* Visual Progress Bar (7 Segments for Cow) */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
                  {Array.from({ length: hewan.slotMaks }).map((_, idx) => {
                    const isSlotFilled = idx < filledCount;
                    return (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: 8,
                          borderRadius: 999,
                          background: isSlotFilled
                            ? isFull
                              ? '#059669'
                              : 'var(--primary)'
                            : '#e2e8f0',
                        }}
                      />
                    );
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                  <span>{filledCount} Terdaftar</span>
                  <span>{isFull ? 'Siap Diqurbankan' : `Tersisa ${remaining} Slot`}</span>
                </div>
              </div>

              {/* Shohibul List */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: 8 }}>
                  DAFTAR SHOHIBUL QURBAN (PEKURBAN):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {hewan.shohibul.map((s, sIdx) => (
                    <div
                      key={s.id || sIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        borderRadius: 8,
                        background: '#f8fafc',
                        fontSize: '0.78rem',
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 700, color: '#1e293b' }}>
                          {sIdx + 1}. {s.nama}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>
                          Niat: {s.atasNama}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 7px',
                          borderRadius: 6,
                          background: s.bayarLunas ? '#ecfdf5' : '#fffbeb',
                          color: s.bayarLunas ? '#047857' : '#b45309',
                        }}
                      >
                        {s.bayarLunas ? 'LUNAS' : 'DP / BELUM'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Register Button */}
              {isFull ? (
                <div
                  style={{
                    padding: '10px',
                    borderRadius: 10,
                    background: '#f8fafc',
                    textAlign: 'center',
                    fontSize: '0.78rem',
                    color: '#64748b',
                    fontWeight: 600,
                    border: '1px solid #e2e8f0',
                  }}
                >
                  ✓ Kelompok Lengkap 7/7 (Pendaftaran Sapi Ini Ditutup)
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleOpenRegister(hewan)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <UserPlus size={16} />
                  <span>Daftarkan Pekurban Baru (Sisa {remaining} Slot)</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Register Shohibul Modal */}
      {selectedHewanForRegister && (
        <div className="modal-overlay" onClick={() => setSelectedHewanForRegister(null)}>
          <motion.div
            className="modal-card"
            style={{ maxWidth: 480 }}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
                  }}
                >
                  <Users size={18} />
                </div>
                <div>
                  <h3 className="modal-title">Pendaftaran Pekurban (Shohibul)</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {selectedHewanForRegister.kodeHewan}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedHewanForRegister(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                  NAMA PENDAFTAR (SHOHIBUL QURBAN)
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Misal: Bpk. Kurniawan Hadi"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                  NIAT QURBAN ATAS NAMA SIAPA
                </label>
                <input
                  type="text"
                  value={atasNama}
                  onChange={(e) => setAtasNama(e.target.value)}
                  placeholder="Misal: Kurniawan Hadi bin Subagyo"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                  NOMOR WHATSAPP
                </label>
                <input
                  type="tel"
                  value={kontak}
                  onChange={(e) => setKontak(e.target.value)}
                  placeholder="081234567890"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                  STATUS PEMBAYARAN IURAN ({formatRupiah(Math.round(selectedHewanForRegister.hargaBeli / 7))})
                </label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setBayarLunas(true)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 10,
                      border: '1.5px solid',
                      borderColor: bayarLunas ? 'var(--primary)' : '#e2e8f0',
                      background: bayarLunas ? 'var(--primary-light)' : '#ffffff',
                      color: bayarLunas ? 'var(--primary-dark)' : '#64748b',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    Lunas Penuh
                  </button>
                  <button
                    type="button"
                    onClick={() => setBayarLunas(false)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 10,
                      border: '1.5px solid',
                      borderColor: !bayarLunas ? '#f59e0b' : '#e2e8f0',
                      background: !bayarLunas ? '#fffbeb' : '#ffffff',
                      color: !bayarLunas ? '#b45309' : '#64748b',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    DP / Bertahap
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setSelectedHewanForRegister(null)}
                  className="btn-outline"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                  <CheckCircle2 size={16} />
                  <span>Konfirmasi Slot</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
