'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  Sparkles,
  Moon,
  HeartHandshake,
  Calendar,
  Users,
  Plus,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  MapPin,
  Clock,
  Mic,
  Scroll,
} from 'lucide-react';
import { IdulFitriAgenda, IdulFitriPanitia } from '@/types/dkm';

interface DetailShalatId {
  lokasi: string;
  waktu: string;
  imam: string;
  khatib: string;
}

interface MaslamIdulFitriProps {
  onBack: () => void;
  onOpenZakat: () => void;
  agendaList?: IdulFitriAgenda[];
  onAddAgenda?: (a: Omit<IdulFitriAgenda, 'id'>) => void;
  onUpdateAgenda?: (a: IdulFitriAgenda) => void;
  onDeleteAgenda?: (id: number) => void;
  panitiaList?: IdulFitriPanitia[];
  onAddPanitia?: (p: Omit<IdulFitriPanitia, 'id'>) => void;
  onUpdatePanitia?: (p: IdulFitriPanitia) => void;
  onDeletePanitia?: (id: number) => void;
  detailShalat?: DetailShalatId;
  onUpdateDetailShalat?: (detail: DetailShalatId) => void;
}

const DEFAULT_AGENDAS: IdulFitriAgenda[] = [
  {
    id: 1,
    namaAcara: 'Shalat Idul Fitri 1447 H Berjamaah',
    tanggalWaktu: '1 Syawal 1447 H • Pukul 06.45 WIB',
    lokasi: 'Halaman Parkir & Ruang Utama AL-Muhajirin',
    imamKhatib: 'Imam: Ustadz M. Syakir, Lc. | Khatib: Dr. H. Faisal Akbar, M.A.',
    deskripsi: 'Jamaah diimbau membawa sajadah masing-masing dan berwudhu dari rumah.',
  },
  {
    id: 2,
    namaAcara: 'Gema Takbir Keliling & Syiar Remaja Masjid',
    tanggalWaktu: 'Malam 1 Syawal • Pukul 20.00 WIB',
    lokasi: 'Rute Wilayah RW 06 s.d RW 08 Kayuringin Jaya',
    imamKhatib: 'Koordinator: Ust. Danang (RISMA)',
    deskripsi: 'Diikuti santriwan-santriwati TPA AL-Muhajirin dan warga sekitar.',
  },
  {
    id: 3,
    namaAcara: 'Halal Bihalal & Silaturahim Akbar Jamaah',
    tanggalWaktu: '2 Syawal 1447 H • Pukul 09.00 - 12.00 WIB',
    lokasi: 'Aula Serbaguna Lt. 2 AL-Muhajirin',
    imamKhatib: 'Kultum: Ustadz H. Ahmad Zaki, S.Ag',
    deskripsi: 'Ramah tamah seluruh pengurus DKM, tokoh masyarakat, dan warga.',
  },
];

const DEFAULT_PANITIA: IdulFitriPanitia[] = [
  { id: 1, nama: 'H. Bambang Sugianto, M.M.', jabatan: 'Ketua Panitia Ramadhan & Idul Fitri', kontak: '0812-8877-6655' },
  { id: 2, nama: 'Ustadz Ridwan, S.E.', jabatan: 'Seksi Zakat Fitrah & Fidyah', kontak: '0813-1122-3344' },
  { id: 3, nama: 'Ir. Hendra Gunawan', jabatan: 'Seksi Pelaksanaan Shalat & Sound System', kontak: '0815-5544-3322' },
  { id: 4, nama: 'Ibu Hj. Siti Rahmah', jabatan: 'Seksi Konsumsi & Halal Bihalal', kontak: '0818-7766-5544' },
];

export const MaslamIdulFitri: React.FC<MaslamIdulFitriProps> = ({
  onBack,
  onOpenZakat,
  agendaList = DEFAULT_AGENDAS,
  onAddAgenda,
  onUpdateAgenda,
  onDeleteAgenda,
  panitiaList = DEFAULT_PANITIA,
  onAddPanitia,
  onUpdatePanitia,
  onDeletePanitia,
  detailShalat = {
    lokasi: 'Halaman Parkir & Ruang Utama AL-Muhajirin',
    waktu: 'Pukul 06.45 WIB - Selesai',
    imam: 'Ustadz M. Syakir, Lc.',
    khatib: 'Dr. H. Faisal Akbar, M.A.',
  },
  onUpdateDetailShalat,
}) => {
  const [activeTab, setActiveTab] = useState<'agenda' | 'panitia' | 'shalat'>('agenda');

  // Agenda Modal State
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
  const [editingAgenda, setEditingAgenda] = useState<IdulFitriAgenda | null>(null);
  const [namaAcara, setNamaAcara] = useState('');
  const [tanggalWaktu, setTanggalWaktu] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [imamKhatib, setImamKhatib] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  // Panitia Modal State
  const [isPanitiaModalOpen, setIsPanitiaModalOpen] = useState(false);
  const [editingPanitia, setEditingPanitia] = useState<IdulFitriPanitia | null>(null);
  const [namaPanitia, setNamaPanitia] = useState('');
  const [jabatanPanitia, setJabatanPanitia] = useState('');
  const [kontakPanitia, setKontakPanitia] = useState('');

  // Shalat Modal State
  const [isShalatModalOpen, setIsShalatModalOpen] = useState(false);
  const [shalatLokasi, setShalatLokasi] = useState(detailShalat.lokasi);
  const [shalatWaktu, setShalatWaktu] = useState(detailShalat.waktu);
  const [shalatImam, setShalatImam] = useState(detailShalat.imam);
  const [shalatKhatib, setShalatKhatib] = useState(detailShalat.khatib);

  // Agenda Handlers
  const handleOpenAddAgenda = () => {
    setEditingAgenda(null);
    setNamaAcara('');
    setTanggalWaktu('');
    setLokasi('');
    setImamKhatib('');
    setDeskripsi('');
    setIsAgendaModalOpen(true);
  };

  const handleOpenEditAgenda = (item: IdulFitriAgenda) => {
    setEditingAgenda(item);
    setNamaAcara(item.namaAcara);
    setTanggalWaktu(item.tanggalWaktu);
    setLokasi(item.lokasi);
    setImamKhatib(item.imamKhatib || '');
    setDeskripsi(item.deskripsi || '');
    setIsAgendaModalOpen(true);
  };

  const handleSaveAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaAcara.trim() || !tanggalWaktu.trim()) {
      alert('Mohon lengkapi nama acara dan waktu.');
      return;
    }

    if (editingAgenda) {
      if (onUpdateAgenda) {
        onUpdateAgenda({
          ...editingAgenda,
          namaAcara,
          tanggalWaktu,
          lokasi,
          imamKhatib,
          deskripsi,
        });
      }
    } else {
      if (onAddAgenda) {
        onAddAgenda({
          namaAcara,
          tanggalWaktu,
          lokasi,
          imamKhatib,
          deskripsi,
        });
      }
    }
    setIsAgendaModalOpen(false);
  };

  const handleDeleteAgendaItem = (id: number) => {
    if (confirm('Yakin ingin menghapus agenda acara Idul Fitri ini?')) {
      if (onDeleteAgenda) {
        onDeleteAgenda(id);
      }
    }
  };

  // Panitia Handlers
  const handleOpenAddPanitia = () => {
    setEditingPanitia(null);
    setNamaPanitia('');
    setJabatanPanitia('');
    setKontakPanitia('');
    setIsPanitiaModalOpen(true);
  };

  const handleOpenEditPanitia = (item: IdulFitriPanitia) => {
    setEditingPanitia(item);
    setNamaPanitia(item.nama);
    setJabatanPanitia(item.jabatan);
    setKontakPanitia(item.kontak);
    setIsPanitiaModalOpen(true);
  };

  const handleSavePanitia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaPanitia.trim() || !jabatanPanitia.trim()) {
      alert('Mohon lengkapi nama panitia dan jabatannya.');
      return;
    }

    if (editingPanitia) {
      if (onUpdatePanitia) {
        onUpdatePanitia({
          ...editingPanitia,
          nama: namaPanitia,
          jabatan: jabatanPanitia,
          kontak: kontakPanitia,
        });
      }
    } else {
      if (onAddPanitia) {
        onAddPanitia({
          nama: namaPanitia,
          jabatan: jabatanPanitia,
          kontak: kontakPanitia,
        });
      }
    }
    setIsPanitiaModalOpen(false);
  };

  const handleDeletePanitiaItem = (id: number) => {
    if (confirm('Yakin ingin menghapus nama panitia ini?')) {
      if (onDeletePanitia) {
        onDeletePanitia(id);
      }
    }
  };

  // Shalat Handlers
  const handleOpenEditShalat = () => {
    setShalatLokasi(detailShalat.lokasi);
    setShalatWaktu(detailShalat.waktu);
    setShalatImam(detailShalat.imam);
    setShalatKhatib(detailShalat.khatib);
    setIsShalatModalOpen(true);
  };

  const handleSaveShalat = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateDetailShalat) {
      onUpdateDetailShalat({
        lokasi: shalatLokasi,
        waktu: shalatWaktu,
        imam: shalatImam,
        khatib: shalatKhatib,
      });
    }
    setIsShalatModalOpen(false);
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)',
          color: 'white',
          padding: '10px 14px 12px', position: 'sticky', top: 0, zIndex: 30,
        }}
      >
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
            marginBottom: 14,
          }}
        >
          <ChevronLeft size={22} />
          <span>Ramadhan & Idul Fitri</span>
        </button>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
          Idul Fitri 1447 H
        </h2>
        <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
          AL-MUHAJIRIN KAYURINGIN BEKASI
        </p>
      </div>

      {/* Tabs */}
      <div className="maslam-tabs-row">
        <button
          type="button"
          onClick={() => setActiveTab('agenda')}
          className={`maslam-tab-pill ${activeTab === 'agenda' ? 'active' : ''}`}
        >
          Agenda Acara ({agendaList.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('shalat')}
          className={`maslam-tab-pill ${activeTab === 'shalat' ? 'active' : ''}`}
        >
          Shalat Idul Fitri
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('panitia')}
          className={`maslam-tab-pill ${activeTab === 'panitia' ? 'active' : ''}`}
        >
          Panitia ({panitiaList.length})
        </button>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Banner Zakat Fitrah */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: '1.5rem' }}>🌙</span>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Kepanitiaan Zakat Fitrah 1447H
              </h4>
              <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0 }}>
                Standar BAZNAS: 2.5 Kg / 3.5 Liter Beras atau Rp 45.000 / Jiwa
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenZakat}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', background: '#6d28d9', padding: '10px' }}
          >
            Input Zakat Muzakki & Cetak Struk
          </button>
        </div>

        {/* TAB 1: AGENDA ACARA */}
        {activeTab === 'agenda' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                Rangkaian Kegiatan Idul Fitri
              </span>
              <button
                type="button"
                onClick={handleOpenAddAgenda}
                style={{
                  background: '#6d28d9',
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
                <span>+ Agenda</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {agendaList.map((ag) => (
                <div
                  key={ag.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: 16,
                    border: '1px solid #e2e8f0',
                    padding: '16px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        {ag.namaAcara}
                      </h4>
                      <div style={{ fontSize: '0.74rem', color: '#6d28d9', fontWeight: 700, marginTop: 4 }}>
                        🕒 {ag.tanggalWaktu}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: 3 }}>
                        📍 {ag.lokasi}
                      </div>
                      {ag.imamKhatib && (
                        <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600, marginTop: 3 }}>
                          🎙️ {ag.imamKhatib}
                        </div>
                      )}
                      {ag.deskripsi && (
                        <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 6, margin: 0 }}>
                          {ag.deskripsi}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 8,
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: 8,
                      marginTop: 10,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleOpenEditAgenda(ag)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        background: '#f5f3ff',
                        border: '1px solid #ddd6fe',
                        borderRadius: 8,
                        padding: '4px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#6d28d9',
                        cursor: 'pointer',
                      }}
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteAgendaItem(ag.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        background: '#fef2f2',
                        border: '1px solid #fca5a5',
                        borderRadius: 8,
                        padding: '4px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#dc2626',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={13} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DETAIL SHALAT */}
        {activeTab === 'shalat' && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              padding: '18px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Pelaksanaan Shalat Idul Fitri 1 Syawal
              </h4>
              <button
                type="button"
                onClick={handleOpenEditShalat}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  background: '#f5f3ff',
                  border: '1px solid #ddd6fe',
                  borderRadius: 8,
                  padding: '5px 12px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#6d28d9',
                  cursor: 'pointer',
                }}
              >
                <Edit3 size={13} />
                <span>Edit Petugas & Jadwal</span>
              </button>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.8 }}>
              <div>📍 <strong>Lokasi:</strong> {detailShalat.lokasi}</div>
              <div>⏰ <strong>Waktu:</strong> {detailShalat.waktu}</div>
              <div>🎙️ <strong>Imam Shalat:</strong> {detailShalat.imam}</div>
              <div>📜 <strong>Khatib:</strong> {detailShalat.khatib}</div>
            </div>
          </div>
        )}

        {/* TAB 3: PANITIA */}
        {activeTab === 'panitia' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                Susunan Panitia Ramadhan & Idul Fitri
              </span>
              <button
                type="button"
                onClick={handleOpenAddPanitia}
                style={{
                  background: '#6d28d9',
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
                <span>+ Panitia</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {panitiaList.map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: 14,
                    border: '1px solid #e2e8f0',
                    padding: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#0f172a' }}>
                      {p.nama}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#6d28d9', fontWeight: 600, marginTop: 2 }}>
                      {p.jabatan}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                      📱 {p.kontak}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => handleOpenEditPanitia(p)}
                      style={{
                        background: '#f5f3ff',
                        border: '1px solid #ddd6fe',
                        borderRadius: 8,
                        padding: '5px 8px',
                        color: '#6d28d9',
                        cursor: 'pointer',
                      }}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePanitiaItem(p.id)}
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
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: Tambah / Edit Agenda Acara */}
      {isAgendaModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingAgenda ? 'Edit Agenda Idul Fitri' : 'Tambah Agenda Acara Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAgendaModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAgenda} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Nama Acara / Kegiatan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Shalat Idul Fitri 1447 H"
                  value={namaAcara}
                  onChange={(e) => setNamaAcara(e.target.value)}
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
                  Tanggal & Waktu
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 1 Syawal 1447 H • Pukul 06.45 WIB"
                  value={tanggalWaktu}
                  onChange={(e) => setTanggalWaktu(e.target.value)}
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
                  Lokasi / Tempat
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Halaman Parkir & Ruang Utama"
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
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
                  Imam / Khatib / Penceramah (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Ustadz M. Syakir, Lc."
                  value={imamKhatib}
                  onChange={(e) => setImamKhatib(e.target.value)}
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
                  Catatan / Deskripsi Tambahan
                </label>
                <textarea
                  rows={2}
                  placeholder="Informasi bawa sajadah, rute, dll."
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
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
                  onClick={() => setIsAgendaModalOpen(false)}
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
                  style={{ flex: 2, justifyContent: 'center', background: '#6d28d9', padding: '10px' }}
                >
                  <CheckCircle2 size={16} />
                  <span>{editingAgenda ? 'Simpan Perubahan' : 'Tambah Agenda'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Tambah / Edit Panitia */}
      {isPanitiaModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 390 }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingPanitia ? 'Edit Panitia Idul Fitri' : 'Tambah Panitia Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsPanitiaModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePanitia} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: H. Bambang Sugianto"
                  value={namaPanitia}
                  onChange={(e) => setNamaPanitia(e.target.value)}
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
                  Jabatan / Seksi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Seksi Zakat Fitrah"
                  value={jabatanPanitia}
                  onChange={(e) => setJabatanPanitia(e.target.value)}
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
                  Nomor Kontak / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 0812-3456-7890"
                  value={kontakPanitia}
                  onChange={(e) => setKontakPanitia(e.target.value)}
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
                  onClick={() => setIsPanitiaModalOpen(false)}
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
                  style={{ flex: 2, justifyContent: 'center', background: '#6d28d9', padding: '10px' }}
                >
                  <CheckCircle2 size={16} />
                  <span>{editingPanitia ? 'Perbarui' : 'Simpan Panitia'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Edit Pelaksanaan Shalat */}
      {isShalatModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 390 }}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Pelaksanaan Shalat Id</h3>
              <button
                type="button"
                onClick={() => setIsShalatModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveShalat} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Lokasi Shalat
                </label>
                <input
                  type="text"
                  required
                  value={shalatLokasi}
                  onChange={(e) => setShalatLokasi(e.target.value)}
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
                  Waktu Pelaksanaan
                </label>
                <input
                  type="text"
                  required
                  value={shalatWaktu}
                  onChange={(e) => setShalatWaktu(e.target.value)}
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
                  Imam Shalat
                </label>
                <input
                  type="text"
                  required
                  value={shalatImam}
                  onChange={(e) => setShalatImam(e.target.value)}
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
                  Khatib
                </label>
                <input
                  type="text"
                  required
                  value={shalatKhatib}
                  onChange={(e) => setShalatKhatib(e.target.value)}
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
                  onClick={() => setIsShalatModalOpen(false)}
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
                  style={{ flex: 2, justifyContent: 'center', background: '#6d28d9', padding: '10px' }}
                >
                  <CheckCircle2 size={16} />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
