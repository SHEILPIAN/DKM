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
} from 'lucide-react';
import { HewanQurban, ShohibulQurban } from '@/types/dkm';
import { formatRupiah } from '@/components/modules/financial/AnalyticsCards';

interface MaslamIdulAdhaProps {
  onBack: () => void;
  hewanQurban: HewanQurban[];
  onRegisterShohibul: (
    hewanId: number,
    shohibulData: Omit<ShohibulQurban, 'id' | 'hewanId' | 'tanggalDaftar'>
  ) => void;
}

export const MaslamIdulAdha: React.FC<MaslamIdulAdhaProps> = ({
  onBack,
  hewanQurban,
  onRegisterShohibul,
}) => {
  const [selectedHewanId, setSelectedHewanId] = useState<number>(hewanQurban[0]?.id || 1);
  const [isDaftarModalOpen, setIsDaftarModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [namaShohibul, setNamaShohibul] = useState('');
  const [atasNama, setAtasNama] = useState('');
  const [noWa, setNoWa] = useState('');

  const totalShohibul = hewanQurban.reduce((acc, h) => acc + h.shohibul.length, 0);

  const handleSubmitShohibul = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaShohibul.trim()) {
      alert('Mohon isi nama shohibul qurban.');
      return;
    }

    onRegisterShohibul(selectedHewanId, {
      nama: namaShohibul,
      atasNama: atasNama || `${namaShohibul} & Keluarga`,
      kontak: noWa || '081299887766',
      bayarLunas: true,
    });

    setIsDaftarModalOpen(false);
    setNamaShohibul('');
    setAtasNama('');
    setNoWa('');
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
          onClick={() => setIsDaftarModalOpen(true)}
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
          onClick={() => setIsQrModalOpen(true)}
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
          <QrCode size={16} />
          <span>Scan Kupon Daging</span>
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
            {totalShohibul} Shohibul
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
                      Estimasi Harga: {formatRupiah(hewan.hargaBeli)} • ({formatRupiah(hargaPerSlot)} / jiwa)
                    </div>
                  </div>

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
                    {isFull ? 'LENGKAP 7/7' : `Sisa ${remaining} Slot`}
                  </span>
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
                <div style={{ background: '#f8fafc', borderRadius: 10, padding: '10px 12px', marginTop: 8 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                    Daftar Nama Shohibul ({hewan.shohibul.length}/{hewan.slotMaks}):
                  </div>
                  {hewan.shohibul.length === 0 ? (
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontStyle: 'italic' }}>
                      Belum ada shohibul terdaftar di kelompok ini.
                    </div>
                  ) : (
                    <ol style={{ margin: 0, paddingLeft: 18, fontSize: '0.74rem', color: '#1e293b' }}>
                      {hewan.shohibul.map((s) => (
                        <li key={s.id} style={{ marginBottom: 3 }}>
                          <strong>{s.nama}</strong> ({s.atasNama})
                        </li>
                      ))}
                    </ol>
                  )}
                </div>

                {!isFull && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedHewanId(hewan.id);
                      setIsDaftarModalOpen(true);
                    }}
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

      {/* Modal Daftar Shohibul */}
      {isDaftarModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 className="modal-title">Pendaftaran Shohibul Qurban</h3>
              <button
                type="button"
                onClick={() => setIsDaftarModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitShohibul} className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                  Pilih Kelompok Hewan
                </label>
                <select
                  value={selectedHewanId}
                  onChange={(e) => setSelectedHewanId(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '9px 10px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    marginTop: 4,
                  }}
                >
                  {hewanQurban.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.kodeHewan} (Sisa {h.slotMaks - h.shohibul.length} Slot)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                  Nama Shohibul (Penyetor) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bpk. H. Rasyid Ridho"
                  value={namaShohibul}
                  onChange={(e) => setNamaShohibul(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                  Niat Atas Nama (Shohibul & Keluarga)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Rasyid Ridho bin Mansur & Keluarga"
                  value={atasNama}
                  onChange={(e) => setAtasNama(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                  No. WhatsApp Aktif
                </label>
                <input
                  type="text"
                  placeholder="0812xxxxxxxx"
                  value={noWa}
                  onChange={(e) => setNoWa(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    marginTop: 4,
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  background: '#7e22ce',
                  padding: '12px',
                  marginTop: 6,
                }}
              >
                Konfirmasi Pendaftaran
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Scan QR Pengambilan Daging */}
      {isQrModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 390, textAlign: 'center' }}>
            <div className="modal-header">
              <h3 className="modal-title">Scanner Kupon Daging Qurban</h3>
              <button
                type="button"
                onClick={() => setIsQrModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  width: 180,
                  height: 180,
                  background: '#f8fafc',
                  border: '2px dashed #94a3b8',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  position: 'relative',
                }}
              >
                <QrCode size={100} style={{ color: '#0f172a' }} />
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 10,
                    right: 10,
                    height: 2,
                    background: '#ef4444',
                    boxShadow: '0 0 8px #ef4444',
                  }}
                />
              </div>

              <p style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 600, marginBottom: 12 }}>
                Arahkan kamera smartphone ke QR Code Kupon Daging Jamaah / Mustahik
              </p>

              <button
                type="button"
                onClick={() => {
                  alert('Scan Berhasil!\n\nKupon #QRB-2026-042\nNama: Bpk. Salim (RT 01/08)\nStatus: VALID - Silakan berikan paket daging 1.5 Kg.');
                  setIsQrModalOpen(false);
                }}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Simulasi Scan Berhasil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
