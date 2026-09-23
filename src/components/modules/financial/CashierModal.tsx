'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Upload,
  ArrowDownLeft,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KategoriKas, TipeTrx, Transaksi } from '@/types/dkm';
import { formatRupiah } from '@/lib/utils';

interface CashierModalProps {
  isOpen: boolean;
  onClose: () => void;
  kategoriKas: KategoriKas[];
  onAddTransaction: (trx: Omit<Transaksi, 'id'>) => void;
}

export const CashierModal: React.FC<CashierModalProps> = ({
  isOpen,
  onClose,
  kategoriKas,
  onAddTransaction,
}) => {
  const [tipe, setTipe] = useState<TipeTrx>('IN');
  const [nominal, setNominal] = useState<number>(100000);
  const [kategoriId, setKategoriId] = useState<number>(kategoriKas[0]?.id || 1);
  const [keterangan, setKeterangan] = useState<string>('');
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [savedNominal, setSavedNominal] = useState<number>(0);

  if (!isOpen) return null;

  const quickNominals = [50000, 100000, 250000, 500000, 1000000, 2500000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nominal || nominal <= 0) return;

    const kategoriObj = kategoriKas.find((k) => k.id === Number(kategoriId));

    const newTrx: Omit<Transaksi, 'id'> = {
      tipe,
      nominal: Number(nominal),
      keterangan: keterangan || (tipe === 'IN' ? 'Infaq Hamba Allah' : 'Pengeluaran Kas Operasional'),
      tanggal: new Date().toISOString(),
      userId: 3,
      userNama: 'Fian Tampan (Piket)',
      kategoriId: Number(kategoriId),
      kategoriNama: kategoriObj?.nama || 'Kas Operasional',
    };

    onAddTransaction(newTrx);
    setSavedNominal(Number(nominal));

    // Trigger celebratory confetti for Infaq masuk
    if (tipe === 'IN') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#059669', '#10b981', '#f59e0b', '#34d399'],
        });
      } catch (err) {
        // Confetti fallback silent
      }
    }

    // Show micro-interaction pop-up
    setShowSuccessPopup(true);
  };

  const handleFinish = () => {
    setShowSuccessPopup(false);
    setKeterangan('');
    setNominal(100000);
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
        >
          <div className="modal-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: tipe === 'IN' ? 'var(--primary-light)' : '#fee2e2',
                  color: tipe === 'IN' ? 'var(--primary)' : '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {tipe === 'IN' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
              </div>
              <div>
                <h3 className="modal-title">Kasir Infaq & Pencatatan Kas</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Input transaksi langsung ke Buku Kas DKM
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
            {/* Tipe Transaksi Tabs */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <button
                type="button"
                onClick={() => setTipe('IN')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 12,
                  border: '2px solid',
                  borderColor: tipe === 'IN' ? '#059669' : '#e2e8f0',
                  background: tipe === 'IN' ? '#ecfdf5' : '#ffffff',
                  color: tipe === 'IN' ? '#065f46' : '#64748b',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <ArrowDownLeft size={18} />
                Pemasukan / Infaq (IN)
              </button>
              <button
                type="button"
                onClick={() => setTipe('OUT')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 12,
                  border: '2px solid',
                  borderColor: tipe === 'OUT' ? '#dc2626' : '#e2e8f0',
                  background: tipe === 'OUT' ? '#fef2f2' : '#ffffff',
                  color: tipe === 'OUT' ? '#991b1b' : '#64748b',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <ArrowUpRight size={18} />
                Pengeluaran (OUT)
              </button>
            </div>

            {/* Nominal Presets */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 8, color: '#334155' }}>
                PILIH NOMINAL CEPAT (RP)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 10 }}>
                {quickNominals.map((nom) => (
                  <button
                    key={nom}
                    type="button"
                    onClick={() => setNominal(nom)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 8,
                      border: '1px solid',
                      borderColor: nominal === nom ? 'var(--primary)' : '#cbd5e1',
                      background: nominal === nom ? 'var(--primary-light)' : '#f8fafc',
                      color: nominal === nom ? 'var(--primary-dark)' : '#334155',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {formatRupiah(nom)}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontWeight: 700,
                    color: '#64748b',
                    fontSize: '0.95rem',
                  }}
                >
                  Rp
                </span>
                <input
                  type="number"
                  value={nominal || ''}
                  onChange={(e) => setNominal(Number(e.target.value))}
                  placeholder="Atau ketik nominal kustom..."
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: 10,
                    border: '1.5px solid #cbd5e1',
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Pos Kategori Kas */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                POS KAS TUJUAN / SUMBER DANA
              </label>
              <select
                value={kategoriId}
                onChange={(e) => setKategoriId(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  background: '#ffffff',
                  outline: 'none',
                }}
              >
                {kategoriKas.map((kat) => (
                  <option key={kat.id} value={kat.id}>
                    {kat.nama} (Saldo: {formatRupiah(kat.saldo)})
                  </option>
                ))}
              </select>
            </div>

            {/* Keterangan */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                KETERANGAN TRANSAKSI
              </label>
              <input
                type="text"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                placeholder={tipe === 'IN' ? 'Misal: Infaq Kotak Amal Subuh, Donasi AC' : 'Misal: Beli Lampu LED Ruang Utama'}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Upload Bukti Simulation */}
            <div
              style={{
                marginBottom: 24,
                padding: 12,
                borderRadius: 10,
                border: '1px dashed #cbd5e1',
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569',
                }}
              >
                <Upload size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                  Lampirkan Bukti Nota / Resi Transfer (Opsional)
                </p>
                <p style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  Mendukung file JPG, PNG, atau scan PDF
                </p>
              </div>
            </div>

            {/* Tombol Simpan */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" onClick={onClose} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                Batal
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  fontSize: '0.95rem',
                  background: tipe === 'IN' ? 'var(--primary)' : '#dc2626',
                }}
              >
                <CheckCircle2 size={18} />
                <span>Simpan Transaksi {formatRupiah(nominal)}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* ==================================================================== */}
      {/* MICRO-INTERACTION: Pop-up Centang Hijau Membesar (Framer Motion)     */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="success-popup-overlay">
            <motion.div
              className="success-popup-card"
              initial={{ scale: 0.4, opacity: 0, y: 30 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 22,
                },
              }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="success-icon-bounce"
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1.35, 0.95, 1.1, 1],
                  rotate: [0, -10, 10, -5, 0],
                  transition: { delay: 0.1, duration: 0.6 },
                }}
              >
                <CheckCircle2 size={54} strokeWidth={2.5} />
              </motion.div>

              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: 8 }}>
                Alhamdulillah, Berhasil!
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: 14 }}>
                Data {tipe === 'IN' ? 'Infaq Masuk' : 'Pengeluaran'} sebesar{' '}
                <strong style={{ color: '#0f172a' }}>{formatRupiah(savedNominal)}</strong> telah tercatat dan
                saldo kas otomatis diperbarui.
              </p>

              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  fontSize: '0.78rem',
                  color: '#166534',
                  fontWeight: 600,
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Sparkles size={14} />
                Tersimpan di Buku Kas & Visualisasi Analitik
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                Tutup & Kembali
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
