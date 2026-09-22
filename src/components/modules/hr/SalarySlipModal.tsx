'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  CheckCircle,
  CreditCard,
  DollarSign,
  AlertCircle,
  X,
  Printer,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { SlipGaji } from '@/types/dkm';
import { formatRupiah } from '../financial/AnalyticsCards';

interface SalarySlipModalProps {
  slipGajiList: SlipGaji[];
  onApproveAndPay: (slipId: number) => void;
}

export const SalarySlipModal: React.FC<SalarySlipModalProps> = ({
  slipGajiList,
  onApproveAndPay,
}) => {
  const [selectedSlip, setSelectedSlip] = useState<SlipGaji | null>(null);

  const pendingList = slipGajiList.filter((s) => s.status === 'PENDING');
  const paidList = slipGajiList.filter((s) => s.status === 'PAID');

  const handlePayClick = (slip: SlipGaji) => {
    onApproveAndPay(slip.id);
    setSelectedSlip(null);
  };

  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Slip Gaji Digital & Pencairan Kafalah Petugas
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Kafalah dihitung otomatis (Gaji Pokok + Tunjangan Shalat - Potongan Alpa). Disetujui Bendahara langsung memotong Kas Operasional.
        </p>
      </div>

      {/* Pending Payroll Slips */}
      <div className="table-container" style={{ marginBottom: 28 }}>
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            background: '#fffbeb',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <CreditCard size={18} style={{ color: '#b45309' }} />
          <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#92400e' }}>
            Antrean Persetujuan Pencairan Gaji Bulan Ini ({pendingList.length} Slip Menunggu Bendahara)
          </span>
        </div>

        <table className="dkm-table">
          <thead>
            <tr>
              <th>Petugas & Jabatan</th>
              <th>Periode Bulan</th>
              <th>Gaji Pokok</th>
              <th>Tunjangan Shalat</th>
              <th>Potongan Alpa</th>
              <th>Total Kafalah Bersih</th>
              <th style={{ textAlign: 'center' }}>Aksi Bendahara</th>
            </tr>
          </thead>
          <tbody>
            {pendingList.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                  Semua slip gaji bulan ini telah dicairkan dan dibayarkan.
                </td>
              </tr>
            ) : (
              pendingList.map((slip) => (
                <tr key={slip.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{slip.pegawaiNama}</div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: 6,
                        background: '#f1f5f9',
                        color: '#475569',
                      }}
                    >
                      {slip.pegawaiJabatan}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{slip.bulan}</td>
                  <td>{formatRupiah(slip.gajiPokok)}</td>
                  <td style={{ color: '#059669', fontWeight: 600 }}>+ {formatRupiah(slip.tunjangan)}</td>
                  <td style={{ color: slip.potongan > 0 ? '#dc2626' : '#64748b', fontWeight: 600 }}>
                    {slip.potongan > 0 ? `- ${formatRupiah(slip.potongan)}` : 'Rp 0'}
                  </td>
                  <td>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                      {formatRupiah(slip.nominal)}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedSlip(slip)}
                        className="btn-outline"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        Lihat Slip
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePayClick(slip)}
                        className="btn-primary"
                        style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                        title="Approve pencairan gaji & otomatis catat pengeluaran di Kas Operasional"
                      >
                        <CheckCircle size={14} />
                        APPROVE & CAIRKAN
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Riwayat Penggajian Terbayar */}
      <div className="table-container">
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)', background: '#f8fafc' }}>
          <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#475569' }}>
            Riwayat Slip Gaji Yang Telah Ditransfer (PAID)
          </span>
        </div>
        <table className="dkm-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Nama Petugas</th>
              <th>Jabatan</th>
              <th>Bulan</th>
              <th>Nominal Ditransfer</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paidList.map((slip) => (
              <tr key={slip.id}>
                <td>
                  <span className="badge-status badge-approved">
                    <CheckCircle size={13} />
                    PAID (LUNAS)
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>{slip.pegawaiNama}</td>
                <td>{slip.pegawaiJabatan}</td>
                <td>{slip.bulan}</td>
                <td style={{ fontWeight: 700, color: '#059669' }}>{formatRupiah(slip.nominal)}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => setSelectedSlip(slip)}
                    className="btn-outline"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    Cetak Slip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slip Gaji Digital Preview Modal */}
      {selectedSlip && (
        <div className="modal-overlay" onClick={() => setSelectedSlip(null)}>
          <motion.div
            className="modal-card"
            style={{ maxWidth: 460 }}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FileText size={20} style={{ color: 'var(--primary)' }} />
                <h3 className="modal-title">Slip Gaji / Kafalah Petugas</h3>
              </div>
              <button
                onClick={() => setSelectedSlip(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Slip Card Details */}
              <div
                style={{
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: 16,
                  padding: '22px',
                  background: '#fbfdfb',
                  marginBottom: 20,
                }}
              >
                <div style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: 12, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 4 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logo.png"
                      alt="Logo AL-Muhajirin"
                      style={{ width: 38, height: 38, objectFit: 'contain' }}
                    />
                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-dark)', margin: 0 }}>
                        DKM AL-MUHAJIRIN
                      </h4>
                      <p style={{ fontSize: '0.65rem', color: '#64748b', margin: 0 }}>
                        Jl. Maskoki Raya Perumnas 2 Kayuringin Jaya Bekasi
                      </p>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600, marginTop: 4 }}>
                    Surat Keterangan Pembayaran Kafalah Khidmah Petugas
                  </p>
                </div>

                <div style={{ fontSize: '0.82rem', lineHeight: 1.9 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Nama Petugas:</span>
                    <span style={{ fontWeight: 700 }}>{selectedSlip.pegawaiNama}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Tugas / Jabatan:</span>
                    <span style={{ fontWeight: 700 }}>{selectedSlip.pegawaiJabatan}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Periode Bulan:</span>
                    <span style={{ fontWeight: 700 }}>{selectedSlip.bulan}</span>
                  </div>
                  <div style={{ borderTop: '1px dashed #cbd5e1', margin: '8px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#475569' }}>Gaji Pokok:</span>
                    <span style={{ fontWeight: 600 }}>{formatRupiah(selectedSlip.gajiPokok)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#059669' }}>Tunjangan Kehadiran Shalat:</span>
                    <span style={{ fontWeight: 600, color: '#059669' }}>
                      + {formatRupiah(selectedSlip.tunjangan)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#dc2626' }}>Potongan Ketidakhadiran (Alpa):</span>
                    <span style={{ fontWeight: 600, color: '#dc2626' }}>
                      - {formatRupiah(selectedSlip.potongan)}
                    </span>
                  </div>
                  <div style={{ borderTop: '2px solid #cbd5e1', margin: '10px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>TOTAL DITERIMA:</span>
                    <span style={{ fontWeight: 800, color: 'var(--primary-dark)', fontSize: '1.1rem' }}>
                      {formatRupiah(selectedSlip.nominal)}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 18,
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: selectedSlip.status === 'PAID' ? '#ecfdf5' : '#fffbeb',
                    border: `1px solid ${selectedSlip.status === 'PAID' ? '#a7f3d0' : '#fde68a'}`,
                    textAlign: 'center',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: selectedSlip.status === 'PAID' ? '#047857' : '#b45309',
                  }}
                >
                  Status: {selectedSlip.status === 'PAID' ? 'Sudah Ditransfer ke Rekening Petugas' : 'Menunggu Persetujuan Bendahara'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                {selectedSlip.status === 'PENDING' ? (
                  <button
                    type="button"
                    onClick={() => handlePayClick(selectedSlip)}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <CheckCircle size={16} />
                    Approve & Cairkan Kas
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <Printer size={16} />
                    Cetak Bukti Slip
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedSlip(null)}
                  className="btn-outline"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
