'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, User, Phone, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Fasilitas, Reservasi } from '@/types/dkm';
import { formatRupiah } from '@/lib/utils';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  fasilitas: Fasilitas[];
  reservasi: Reservasi[];
  initialDate?: string;
  initialFacilityId?: number;
  onSubmitBooking: (newRes: Omit<Reservasi, 'id' | 'createdAt'>) => void;
}

export const BookingFormModal: React.FC<BookingFormModalProps> = ({
  isOpen,
  onClose,
  fasilitas,
  reservasi,
  initialDate,
  initialFacilityId,
  onSubmitBooking,
}) => {
  const [fasilitasId, setFasilitasId] = useState<number>(initialFacilityId || fasilitas[0]?.id || 1);
  const [namaPemohon, setNamaPemohon] = useState<string>('');
  const [kontak, setKontak] = useState<string>('');
  const [tujuanAcara, setTujuanAcara] = useState<string>('');
  const [tanggalMulai, setTanggalMulai] = useState<string>(initialDate || '2026-09-25');
  const [jamMulai, setJamMulai] = useState<string>('08:00');
  const [jamSelesai, setJamSelesai] = useState<string>('12:00');
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [conflictDetail, setConflictDetail] = useState<Reservasi | null>(null);

  useEffect(() => {
    if (initialDate) setTanggalMulai(initialDate);
    if (initialFacilityId) setFasilitasId(initialFacilityId);
  }, [initialDate, initialFacilityId]);

  // Cek Ketersediaan Otomatis (Availability Checker)
  useEffect(() => {
    const conflict = reservasi.find(
      (r) =>
        r.fasilitasId === Number(fasilitasId) &&
        r.status === 'APPROVED' &&
        r.waktuMulai.startsWith(tanggalMulai)
    );

    if (conflict) {
      setIsBooked(true);
      setConflictDetail(conflict);
    } else {
      setIsBooked(false);
      setConflictDetail(null);
    }
  }, [fasilitasId, tanggalMulai, reservasi]);

  if (!isOpen) return null;

  const selectedFasilitasObj = fasilitas.find((f) => f.id === Number(fasilitasId));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isBooked) return;

    const newBooking: Omit<Reservasi, 'id' | 'createdAt'> = {
      namaPemohon,
      kontak,
      tujuanAcara,
      waktuMulai: `${tanggalMulai}T${jamMulai}`,
      waktuSelesai: `${tanggalMulai}T${jamSelesai}`,
      status: 'PENDING',
      fasilitasId: Number(fasilitasId),
      fasilitasNama: selectedFasilitasObj?.nama || 'Fasilitas Masjid',
    };

    onSubmitBooking(newBooking);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
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
              <Calendar size={20} />
            </div>
            <div>
              <h3 className="modal-title">Formulir Reservasi Fasilitas</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Pengajuan peminjaman aula / fasilitas inventaris DKM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Availability Alert if Date is already approved */}
          {isBooked && conflictDetail && (
            <div
              style={{
                padding: '14px 16px',
                borderRadius: 12,
                background: '#fef2f2',
                border: '1.5px solid #fecaca',
                color: '#991b1b',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
              }}
            >
              <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: '0.82rem' }}>
                <strong>Jadwal Tidak Tersedia (Double Booking Dicegah):</strong>
                <p style={{ marginTop: 2 }}>
                  Tanggal {tanggalMulai} pada fasilitas ini sudah disetujui (APPROVED) untuk acara &quot;
                  {conflictDetail.tujuanAcara}&quot; atas nama {conflictDetail.namaPemohon}. Silakan pilih tanggal
                  lain.
                </p>
              </div>
            </div>
          )}

          {/* Fasilitas */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
              PILIH FASILITAS MASJID
            </label>
            <select
              value={fasilitasId}
              onChange={(e) => setFasilitasId(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: 10,
                border: '1.5px solid #cbd5e1',
                fontSize: '0.9rem',
                fontWeight: 600,
                outline: 'none',
              }}
            >
              {fasilitas.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nama} ({f.kapasitas}) - Infaq {formatRupiah(f.biayaInfaq || 0)}
                </option>
              ))}
            </select>
          </div>

          {/* Tanggal & Waktu */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                TANGGAL ACARA
              </label>
              <input
                type="date"
                value={tanggalMulai}
                onChange={(e) => setTanggalMulai(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: isBooked ? '1.5px solid #dc2626' : '1.5px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                JAM MULAI
              </label>
              <input
                type="time"
                value={jamMulai}
                onChange={(e) => setJamMulai(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 10px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                JAM SELESAI
              </label>
              <input
                type="time"
                value={jamSelesai}
                onChange={(e) => setJamSelesai(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 10px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Nama Pemohon */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
              NAMA LENGKAP PEMOHON / PENANGGUNG JAWAB
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={16}
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
              />
              <input
                type="text"
                value={namaPemohon}
                onChange={(e) => setNamaPemohon(e.target.value)}
                placeholder="Misal: Bpk. Muhammad Arifin"
                required
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 38px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* No WA */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
              NOMOR WHATSAPP (AKTIF UNTUK NOTIFIKASI)
            </label>
            <div style={{ position: 'relative' }}>
              <Phone
                size={16}
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
              />
              <input
                type="tel"
                value={kontak}
                onChange={(e) => setKontak(e.target.value)}
                placeholder="Misal: 081234567890"
                required
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 38px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Tujuan Acara */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
              TUJUAN ACARA / DESKRIPSI KEGIATAN
            </label>
            <div style={{ position: 'relative' }}>
              <FileText
                size={16}
                style={{ position: 'absolute', left: 12, top: 14, color: '#94a3b8' }}
              />
              <textarea
                value={tujuanAcara}
                onChange={(e) => setTujuanAcara(e.target.value)}
                placeholder="Misal: Akad Nikah Putri Pertama (Keluarga Besar & Tamu Undangan +/- 150 Orang)"
                required
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" onClick={onClose} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
              Batal
            </button>
            <button
              type="submit"
              disabled={isBooked}
              className="btn-primary"
              style={{
                flex: 2,
                justifyContent: 'center',
                opacity: isBooked ? 0.45 : 1,
                cursor: isBooked ? 'not-allowed' : 'pointer',
              }}
            >
              <CheckCircle2 size={18} />
              <span>{isBooked ? 'Tanggal Bentrok (Disabled)' : 'Ajukan Reservasi (PENDING)'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
