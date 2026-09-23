'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, HeartHandshake, QrCode, CheckCircle2, Share2, Printer, Sparkles } from 'lucide-react';
import { ZakatFitrahTrx } from '@/types/dkm';
import { formatRupiah } from '@/lib/utils';

interface ZakatInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddZakat: (trx: ZakatFitrahTrx) => void;
}

export const ZakatInputModal: React.FC<ZakatInputModalProps> = ({
  isOpen,
  onClose,
  onAddZakat,
}) => {
  const [namaMuzakki, setNamaMuzakki] = useState<string>('');
  const [kontak, setKontak] = useState<string>('');
  const [jenisZakat, setJenisZakat] = useState<'FITRAH_BERAS' | 'FITRAH_UANG' | 'ZAKAT_MAAL' | 'FIDYAH'>('FITRAH_UANG');
  const [jumlahJiwa, setJumlahJiwa] = useState<number>(1);
  const [nominalRp, setNominalRp] = useState<number>(50000); // 1 jiwa x 50.000
  const [jumlahBerasKg, setJumlahBerasKg] = useState<number>(2.5); // 1 jiwa x 2.5 kg
  const [generatedKupon, setGeneratedKupon] = useState<ZakatFitrahTrx | null>(null);

  if (!isOpen) return null;

  const handleJiwaChange = (val: number) => {
    const num = Math.max(1, val);
    setJumlahJiwa(num);
    if (jenisZakat === 'FITRAH_UANG') {
      setNominalRp(num * 50000);
    } else if (jenisZakat === 'FITRAH_BERAS') {
      setJumlahBerasKg(num * 2.5);
    }
  };

  const handleJenisZakatChange = (jenis: 'FITRAH_BERAS' | 'FITRAH_UANG' | 'ZAKAT_MAAL' | 'FIDYAH') => {
    setJenisZakat(jenis);
    if (jenis === 'FITRAH_UANG') {
      setNominalRp(jumlahJiwa * 50000);
    } else if (jenis === 'FITRAH_BERAS') {
      setJumlahBerasKg(jumlahJiwa * 2.5);
    } else if (jenis === 'ZAKAT_MAAL') {
      setNominalRp(2500000);
    } else if (jenis === 'FIDYAH') {
      setNominalRp(jumlahJiwa * 30000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const kuponNo = `ZKT-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newZakat: ZakatFitrahTrx = {
      id: Date.now(),
      namaMuzakki,
      kontak,
      jenisZakat,
      jumlahJiwa: Number(jumlahJiwa),
      nominalRp: jenisZakat !== 'FITRAH_BERAS' ? Number(nominalRp) : undefined,
      jumlahBerasKg: jenisZakat === 'FITRAH_BERAS' ? Number(jumlahBerasKg) : undefined,
      tanggal: new Date().toISOString(),
      noKupon: kuponNo,
    };

    onAddZakat(newZakat);
    setGeneratedKupon(newZakat);
  };

  const handleCloseAll = () => {
    setGeneratedKupon(null);
    setNamaMuzakki('');
    setKontak('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-card"
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
              <HeartHandshake size={20} />
            </div>
            <div>
              <h3 className="modal-title">Penerimaan Zakat & Fidyah (Amil DKM)</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Input data Muzakki dan cetak struk/kupon digital WhatsApp
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {!generatedKupon ? (
          <form onSubmit={handleSubmit} className="modal-body">
            {/* Nama Muzakki */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                NAMA MUZAKKI (ORANG YANG BERZAKAT)
              </label>
              <input
                type="text"
                value={namaMuzakki}
                onChange={(e) => setNamaMuzakki(e.target.value)}
                placeholder="Misal: Bpk. H. Syahrul & Keluarga"
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* No WhatsApp */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                NO. WHATSAPP (UNTUK PENGIRIMAN STRUK DIGITAL)
              </label>
              <input
                type="tel"
                value={kontak}
                onChange={(e) => setKontak(e.target.value)}
                placeholder="Misal: 081234567890"
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Jenis Zakat */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                JENIS ZAKAT / KEWAJIBAN
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {[
                  { id: 'FITRAH_UANG', label: 'Zakat Fitrah (Uang)' },
                  { id: 'FITRAH_BERAS', label: 'Zakat Fitrah (Beras)' },
                  { id: 'ZAKAT_MAAL', label: 'Zakat Maal / Harta' },
                  { id: 'FIDYAH', label: 'Fidyah Puasa' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleJenisZakatChange(item.id as any)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: '1.5px solid',
                      borderColor: jenisZakat === item.id ? 'var(--primary)' : '#e2e8f0',
                      background: jenisZakat === item.id ? 'var(--primary-light)' : '#ffffff',
                      color: jenisZakat === item.id ? 'var(--primary-dark)' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Jumlah Tanggungan Jiwa */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                  JUMLAH JIWA / TANGGUNGAN
                </label>
                <input
                  type="number"
                  min={1}
                  value={jumlahJiwa}
                  onChange={(e) => handleJiwaChange(Number(e.target.value))}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: '1.5px solid #cbd5e1',
                    fontSize: '1rem',
                    fontWeight: 700,
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                  {jenisZakat === 'FITRAH_BERAS' ? 'TOTAL BERAS (KG)' : 'TOTAL NOMINAL (RP)'}
                </label>
                {jenisZakat === 'FITRAH_BERAS' ? (
                  <input
                    type="number"
                    step="0.1"
                    value={jumlahBerasKg}
                    onChange={(e) => setJumlahBerasKg(Number(e.target.value))}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: '1.5px solid #cbd5e1',
                      fontSize: '1rem',
                      fontWeight: 800,
                      outline: 'none',
                    }}
                  />
                ) : (
                  <input
                    type="number"
                    value={nominalRp}
                    onChange={(e) => setNominalRp(Number(e.target.value))}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: '1.5px solid #cbd5e1',
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: 'var(--primary-dark)',
                      outline: 'none',
                    }}
                  />
                )}
              </div>
            </div>

            {/* Doa Penerimaan Zakat */}
            <div
              style={{
                marginBottom: 20,
                padding: '12px 16px',
                borderRadius: 12,
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                textAlign: 'center',
              }}
            >
              <div className="font-arabic" style={{ fontSize: '1.15rem', color: '#166534', marginBottom: 4 }}>
                آجَرَكَ اللهُ فِيْمَا أَعْطَيْتَ وَبَارَكَ لَكَ فِيْمَا أَبْقَيْتَ
              </div>
              <div style={{ fontSize: '0.75rem', color: '#15803d', fontStyle: 'italic' }}>
                &ldquo;Semoga Allah memberikan pahala atas apa yang engkau berikan, dan memberkahi apa yang engkau sisakan.&rdquo;
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" onClick={onClose} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                Batal
              </button>
              <button type="submit" className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                <CheckCircle2 size={18} />
                <span>Terima Zakat & Cetak Kupon Digital</span>
              </button>
            </div>
          </form>
        ) : (
          /* STRUK / KUPON DIGITAL MODAL */
          <div className="modal-body" style={{ textAlign: 'center' }}>
            <div
              style={{
                border: '2px dashed #059669',
                borderRadius: 16,
                padding: '24px 20px',
                background: '#fbfdfb',
                position: 'relative',
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'var(--primary)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                <Sparkles size={13} />
                BUKTI SERAH TERIMA ZAKAT DIGITAL
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Logo AL-Muhajirin"
                  style={{ width: 42, height: 42, objectFit: 'contain' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-dark)', margin: 0 }}>
                    DKM AL-MUHAJIRIN
                  </h4>
                  <p style={{ fontSize: '0.68rem', color: '#64748b', margin: 0 }}>
                    Jl. Maskoki Raya Perumnas 2 Kayuringin Jaya Bekasi
                  </p>
                </div>
              </div>

              <div style={{ padding: '12px', background: '#f1f5f9', borderRadius: 10, marginBottom: 14 }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Nomor Bukti Kupon:</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', letterSpacing: '1px' }}>
                  {generatedKupon.noKupon}
                </div>
              </div>

              <div style={{ textAlign: 'left', fontSize: '0.85rem', lineHeight: 1.8, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: 4 }}>
                  <span style={{ color: '#64748b' }}>Nama Muzakki:</span>
                  <span style={{ fontWeight: 700 }}>{generatedKupon.namaMuzakki}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: 4 }}>
                  <span style={{ color: '#64748b' }}>Jenis Zakat:</span>
                  <span style={{ fontWeight: 700 }}>{generatedKupon.jenisZakat}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: 4 }}>
                  <span style={{ color: '#64748b' }}>Jumlah Tanggungan:</span>
                  <span style={{ fontWeight: 700 }}>{generatedKupon.jumlahJiwa} Jiwa</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: 4 }}>
                  <span style={{ color: '#64748b' }}>Total Serahan:</span>
                  <span style={{ fontWeight: 800, color: '#059669', fontSize: '0.95rem' }}>
                    {generatedKupon.nominalRp ? formatRupiah(generatedKupon.nominalRp) : `${generatedKupon.jumlahBerasKg} Kg Beras`}
                  </span>
                </div>
              </div>

              {/* QR Verification Simulation */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#64748b', fontSize: '0.75rem' }}>
                <QrCode size={36} style={{ color: 'var(--primary)' }} />
                <span>Terverifikasi Sah oleh Petugas Amil DKM AL-Muhajirin</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => {
                  const text = `*BUKTI SERAH TERIMA ZAKAT AL-MUHAJIRIN (BEKASI)*%0ANo: ${generatedKupon.noKupon}%0AMuzakki: ${generatedKupon.namaMuzakki}%0AJenis: ${generatedKupon.jenisZakat}%0ATotal: ${generatedKupon.nominalRp ? formatRupiah(generatedKupon.nominalRp) : generatedKupon.jumlahBerasKg + ' Kg Beras'}%0AAlamat: Jl. Maskoki Raya Perumnas 2 Kayuringin Jaya Bekasi%0A%0A_Jazakumullahu Khairan Katsiran._`;
                  window.open(`https://wa.me/?text=${text}`, '_blank');
                }}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', background: '#25D366' }}
              >
                <Share2 size={16} />
                Kirim via WhatsApp
              </button>
              <button
                type="button"
                onClick={handleCloseAll}
                className="btn-outline"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Selesai & Tutup
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
