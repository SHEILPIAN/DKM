'use client';

import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  MessageSquare,
  Building,
  Check,
  X,
  Send,
} from 'lucide-react';
import { Reservasi } from '@/types/dkm';

interface BookingAdminQueueProps {
  reservasi: Reservasi[];
  onApprove: (id: number, catatan: string) => void;
  onReject: (id: number, catatan: string) => void;
}

export const BookingAdminQueue: React.FC<BookingAdminQueueProps> = ({
  reservasi,
  onApprove,
  onReject,
}) => {
  const [adminNotes, setAdminNotes] = useState<{ [key: number]: string }>({});
  const [whatsAppModalData, setWhatsAppModalData] = useState<Reservasi | null>(null);

  const handleNoteChange = (id: number, val: string) => {
    setAdminNotes((prev) => ({ ...prev, [id]: val }));
  };

  const handleApproveClick = (res: Reservasi) => {
    const note = adminNotes[res.id] || 'Harus bayar infaq kebersihan di muka Rp 200.000.';
    onApprove(res.id, note);
    // Show WA notification preview
    setWhatsAppModalData({ ...res, status: 'APPROVED', catatanAdmin: note });
  };

  const handleRejectClick = (res: Reservasi) => {
    const note = adminNotes[res.id] || 'Format acara tidak sesuai pedoman penggunaan masjid.';
    onReject(res.id, note);
  };

  const pendingList = reservasi.filter((r) => r.status === 'PENDING');
  const pastList = reservasi.filter((r) => r.status !== 'PENDING');

  const formatDateTime = (dtStr: string) => {
    try {
      const d = new Date(dtStr);
      return d.toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dtStr;
    }
  };

  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Panel Otorisasi & Antrean Reservasi Fasilitas
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Tinjau pengajuan dari jamaah, berikan catatan syarat operasional, lalu Approve atau Reject
        </p>
      </div>

      {/* Antrean Pending */}
      <div className="table-container" style={{ marginBottom: 28 }}>
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            background: '#fffbeb',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Clock size={18} style={{ color: '#b45309' }} />
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#92400e' }}>
            Menunggu Persetujuan ({pendingList.length} Pengajuan Aktif)
          </span>
        </div>

        <table className="dkm-table">
          <thead>
            <tr>
              <th>Pemohon & Kontak</th>
              <th>Fasilitas & Jadwal</th>
              <th>Tujuan Acara</th>
              <th style={{ width: 260 }}>Catatan / Syarat DKM</th>
              <th style={{ width: 180, textAlign: 'center' }}>Aksi Keputusan</th>
            </tr>
          </thead>
          <tbody>
            {pendingList.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                  Tidak ada antrean pending saat ini. Semua jadwal telah diproses.
                </td>
              </tr>
            ) : (
              pendingList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.namaPemohon}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#059669', marginTop: 3 }}>
                      <Phone size={12} />
                      {item.kontak}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Building size={14} style={{ color: 'var(--primary)' }} />
                      {item.fasilitasNama}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>
                      Mulai: {formatDateTime(item.waktuMulai)}
                      <br />
                      Selesai: {formatDateTime(item.waktuSelesai)}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: 500 }}>
                      &ldquo;{item.tujuanAcara}&rdquo;
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Misal: Infaq kebersihan di muka Rp 200rb"
                      value={adminNotes[item.id] || ''}
                      onChange={(e) => handleNoteChange(item.id, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: 8,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.8rem',
                        outline: 'none',
                      }}
                    />
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                      <button
                        type="button"
                        onClick={() => handleApproveClick(item)}
                        className="btn-primary"
                        style={{ padding: '7px 12px', fontSize: '0.78rem' }}
                        title="Setujui Reservasi dan Kunci Tanggal di Kalender"
                      >
                        <Check size={14} />
                        APPROVE
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRejectClick(item)}
                        className="btn-danger"
                        style={{ padding: '7px 12px' }}
                        title="Tolak Pengajuan Reservasi"
                      >
                        <X size={14} />
                        REJECT
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Riwayat Reservasi (Approved & Rejected) */}
      <div className="table-container">
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)', background: '#f8fafc' }}>
          <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#475569' }}>
            Riwayat Keputusan Reservasi
          </span>
        </div>
        <table className="dkm-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Pemohon</th>
              <th>Fasilitas</th>
              <th>Waktu</th>
              <th>Tujuan Acara</th>
              <th>Catatan Admin</th>
            </tr>
          </thead>
          <tbody>
            {pastList.map((item) => {
              const isApproved = item.status === 'APPROVED';
              return (
                <tr key={item.id}>
                  <td>
                    <span className={`badge-status ${isApproved ? 'badge-approved' : 'badge-rejected'}`}>
                      {isApproved ? <CheckCircle size={13} /> : <XCircle size={13} />}
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.namaPemohon}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.kontak}</div>
                  </td>
                  <td>{item.fasilitasNama}</td>
                  <td style={{ fontSize: '0.78rem' }}>{formatDateTime(item.waktuMulai)}</td>
                  <td style={{ fontSize: '0.82rem' }}>{item.tujuanAcara}</td>
                  <td style={{ fontSize: '0.8rem', color: '#475569' }}>
                    {item.catatanAdmin || '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* WhatsApp Message Confirmation Simulator Modal */}
      {whatsAppModalData && (
        <div className="modal-overlay" onClick={() => setWhatsAppModalData(null)}>
          <div className="modal-card" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ background: '#059669', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Send size={20} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'white' }}>
                  Notifikasi WhatsApp Terkirim Otomatis
                </h3>
              </div>
              <button
                onClick={() => setWhatsAppModalData(null)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  background: '#e7f8ef',
                  padding: 16,
                  borderRadius: 14,
                  border: '1px solid #bbf7d0',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  color: '#14532d',
                }}
              >
                <p>
                  <strong>Kepada Yth. {whatsAppModalData.namaPemohon}</strong> ({whatsAppModalData.kontak}),
                </p>
                <p style={{ marginTop: 8 }}>
                  Permohonan reservasi fasilitas <strong>{whatsAppModalData.fasilitasNama}</strong> untuk kegiatan{' '}
                  &quot;{whatsAppModalData.tujuanAcara}&quot; telah <strong>DISETUJUI (APPROVED)</strong> oleh Sekretariat DKM
                  Masjid Al-Muhajirin (Kayuringin Jaya, Bekasi).
                </p>
                <div style={{ marginTop: 10, padding: 10, background: '#ffffff', borderRadius: 8, border: '1px dashed #86efac' }}>
                  <p style={{ fontWeight: 700, color: '#065f46' }}>Catatan Penggunaan:</p>
                  <p>{whatsAppModalData.catatanAdmin}</p>
                </div>
                <p style={{ marginTop: 10, fontSize: '0.78rem', color: '#166534' }}>
                  Tanggal tersebut kini resmi diblokir di Kalender Publik Masjid. Terima kasih.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setWhatsAppModalData(null)}
                className="btn-primary"
                style={{ width: '100%', marginTop: 20, justifyContent: 'center' }}
              >
                Tutup Notifikasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
