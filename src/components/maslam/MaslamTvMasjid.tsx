'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  Tv,
  Volume2,
  Monitor,
  Plus,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  Clock,
  Sliders,
  Bell,
  Sparkles,
} from 'lucide-react';
import { TvRunningText, TvPengumuman, TvSetting } from '@/types/dkm';

interface MaslamTvMasjidProps {
  onBack: () => void;
  runningTexts?: TvRunningText[];
  onAddRunningText?: (rt: Omit<TvRunningText, 'id'>) => void;
  onUpdateRunningText?: (rt: TvRunningText) => void;
  onDeleteRunningText?: (id: number) => void;
  pengumumanList?: TvPengumuman[];
  onAddPengumuman?: (p: Omit<TvPengumuman, 'id'>) => void;
  onUpdatePengumuman?: (p: TvPengumuman) => void;
  onDeletePengumuman?: (id: number) => void;
  tvSetting?: TvSetting;
  onUpdateTvSetting?: (setting: TvSetting) => void;
}

const DEFAULT_RUNNING_TEXTS: TvRunningText[] = [
  { id: 1, pesan: '📢 Mohon merapatkan dan meluruskan shaf shalat. Matikan atau heningkan nada dering ponsel Anda.', aktif: true, urutan: 1 },
  { id: 2, pesan: '🕌 Kajian Rutin Ba\'da Maghrib setiap Kamis malam: Kitab Riyadhus Shalihin bersama Ust. Dr. H. Faisal Akbar.', aktif: true, urutan: 2 },
  { id: 3, pesan: '💳 Salurkan infaq dan sedekah terbaik Anda melalui scan QRIS resmi AL-Muhajirin di pintu masuk masjid.', aktif: true, urutan: 3 },
];

const DEFAULT_PENGUMUMAN: TvPengumuman[] = [
  { id: 1, judul: 'Kajian Akbar Maulid Nabi', isi: 'Ahad Pagi, 27 September 2026 bersama Ustadz Abdul Somad, Lc. M.A.', tampilkan: true },
  { id: 2, judul: 'Penerimaan Santri Baru TPA', isi: 'Pendaftaran TPA AL-Muhajirin semester ganjil telah dibuka di kantor sekretariat.', tampilkan: true },
];

const DEFAULT_SETTING: TvSetting = {
  namaMasjid: 'AL-MUHAJIRIN',
  lokasi: 'Kayuringin Jaya, Bekasi Selatan',
  jedaIqomahMenit: 10,
};

export const MaslamTvMasjid: React.FC<MaslamTvMasjidProps> = ({
  onBack,
  runningTexts = DEFAULT_RUNNING_TEXTS,
  onAddRunningText,
  onUpdateRunningText,
  onDeleteRunningText,
  pengumumanList = DEFAULT_PENGUMUMAN,
  onAddPengumuman,
  onUpdatePengumuman,
  onDeletePengumuman,
  tvSetting = DEFAULT_SETTING,
  onUpdateTvSetting,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'running' | 'pengumuman' | 'setting'>('preview');

  // Running text modal
  const [isRtModalOpen, setIsRtModalOpen] = useState(false);
  const [editingRt, setEditingRt] = useState<TvRunningText | null>(null);
  const [rtPesan, setRtPesan] = useState('');
  const [rtAktif, setRtAktif] = useState(true);

  // Pengumuman modal
  const [isPengumumanModalOpen, setIsPengumumanModalOpen] = useState(false);
  const [editingPengumuman, setEditingPengumuman] = useState<TvPengumuman | null>(null);
  const [pengumumanJudul, setPengumumanJudul] = useState('');
  const [pengumumanIsi, setPengumumanIsi] = useState('');
  const [pengumumanTampilkan, setPengumumanTampilkan] = useState(true);

  // TV setting modal / inline
  const [settingNama, setSettingNama] = useState(tvSetting.namaMasjid);
  const [settingLokasi, setSettingLokasi] = useState(tvSetting.lokasi);
  const [settingIqomah, setSettingIqomah] = useState(tvSetting.jedaIqomahMenit);

  // Active running text ticker string
  const activeRunningString = runningTexts
    .filter((r) => r.aktif)
    .map((r) => r.pesan)
    .join('  ★  ');

  // Handlers for Running Text
  const handleOpenAddRt = () => {
    setEditingRt(null);
    setRtPesan('');
    setRtAktif(true);
    setIsRtModalOpen(true);
  };

  const handleOpenEditRt = (rt: TvRunningText) => {
    setEditingRt(rt);
    setRtPesan(rt.pesan);
    setRtAktif(rt.aktif);
    setIsRtModalOpen(true);
  };

  const handleSaveRt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rtPesan.trim()) {
      alert('Mohon isi pesan teks berjalan.');
      return;
    }

    if (editingRt) {
      if (onUpdateRunningText) {
        onUpdateRunningText({
          ...editingRt,
          pesan: rtPesan,
          aktif: rtAktif,
        });
      }
    } else {
      if (onAddRunningText) {
        onAddRunningText({
          pesan: rtPesan,
          aktif: rtAktif,
          urutan: runningTexts.length + 1,
        });
      }
    }
    setIsRtModalOpen(false);
  };

  const handleDeleteRtItem = (id: number) => {
    if (confirm('Yakin ingin menghapus running text ini?')) {
      if (onDeleteRunningText) {
        onDeleteRunningText(id);
      }
    }
  };

  // Handlers for Pengumuman
  const handleOpenAddPengumuman = () => {
    setEditingPengumuman(null);
    setPengumumanJudul('');
    setPengumumanIsi('');
    setPengumumanTampilkan(true);
    setIsPengumumanModalOpen(true);
  };

  const handleOpenEditPengumuman = (p: TvPengumuman) => {
    setEditingPengumuman(p);
    setPengumumanJudul(p.judul);
    setPengumumanIsi(p.isi);
    setPengumumanTampilkan(p.tampilkan);
    setIsPengumumanModalOpen(true);
  };

  const handleSavePengumuman = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pengumumanJudul.trim() || !pengumumanIsi.trim()) {
      alert('Mohon isi judul dan isi pengumuman.');
      return;
    }

    if (editingPengumuman) {
      if (onUpdatePengumuman) {
        onUpdatePengumuman({
          ...editingPengumuman,
          judul: pengumumanJudul,
          isi: pengumumanIsi,
          tampilkan: pengumumanTampilkan,
        });
      }
    } else {
      if (onAddPengumuman) {
        onAddPengumuman({
          judul: pengumumanJudul,
          isi: pengumumanIsi,
          tampilkan: pengumumanTampilkan,
        });
      }
    }
    setIsPengumumanModalOpen(false);
  };

  const handleDeletePengumumanItem = (id: number) => {
    if (confirm('Yakin ingin menghapus slide pengumuman ini?')) {
      if (onDeletePengumuman) {
        onDeletePengumuman(id);
      }
    }
  };

  // Handler for Setting
  const handleSaveSetting = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateTvSetting) {
      onUpdateTvSetting({
        namaMasjid: settingNama,
        lokasi: settingLokasi,
        jedaIqomahMenit: Number(settingIqomah),
      });
    }
    alert('Pengaturan TV Display berhasil diperbarui.');
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
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
          <span>TV Display Masjid</span>
        </button>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
          Digital Signage TV
        </h2>
        <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
          AL-MUHAJIRIN KAYURINGIN BEKASI
        </p>
      </div>

      {/* Tabs */}
      <div className="maslam-tabs-row" style={{ flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`maslam-tab-pill ${activeTab === 'preview' ? 'active' : ''}`}
        >
          📺 Live Display
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('running')}
          className={`maslam-tab-pill ${activeTab === 'running' ? 'active' : ''}`}
        >
          Running Text ({runningTexts.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pengumuman')}
          className={`maslam-tab-pill ${activeTab === 'pengumuman' ? 'active' : ''}`}
        >
          Pengumuman ({pengumumanList.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('setting')}
          className={`maslam-tab-pill ${activeTab === 'setting' ? 'active' : ''}`}
        >
          ⚙️ Pengaturan
        </button>
      </div>

      <div style={{ padding: '16px' }}>
        {/* TAB 1: PREVIEW TV DISPLAY */}
        {activeTab === 'preview' && (
          <div>
            <div
              style={{
                background: '#091e3a',
                color: 'white',
                borderRadius: 16,
                border: '4px solid #334155',
                padding: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 10 }}>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#f59e0b' }}>
                    {tvSetting.namaMasjid}
                  </div>
                  <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                    {tvSetting.lokasi}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#10b981' }}>
                    12:00:15
                  </div>
                  <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                    Selasa, 22 Sep 2026
                  </div>
                </div>
              </div>

              {/* Prayer Times Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, margin: '14px 0', textAlign: 'center' }}>
                {[
                  { s: 'SUBUH', t: '04:38' },
                  { s: 'DZUHUR', t: '11:55', act: true },
                  { s: 'ASHAR', t: '15:10' },
                  { s: 'MAGHRIB', t: '17:58' },
                  { s: 'ISYA', t: '19:08' },
                ].map((p, i) => (
                  <div
                    key={i}
                    style={{
                      background: p.act ? '#f59e0b' : 'rgba(255,255,255,0.08)',
                      color: p.act ? '#0f172a' : '#ffffff',
                      borderRadius: 8,
                      padding: '6px 2px',
                    }}
                  >
                    <div style={{ fontSize: '0.58rem', fontWeight: 700 }}>{p.s}</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 900 }}>{p.t}</div>
                  </div>
                ))}
              </div>

              {/* Pengumuman Slide Frame */}
              {pengumumanList.filter((p) => p.tampilkan).length > 0 && (
                <div
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    borderRadius: 10,
                    padding: '10px 12px',
                    marginBottom: 12,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#60a5fa' }}>
                    📢 {pengumumanList.filter((p) => p.tampilkan)[0]?.judul}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#e2e8f0', marginTop: 3 }}>
                    {pengumumanList.filter((p) => p.tampilkan)[0]?.isi}
                  </div>
                </div>
              )}

              {/* Running Text Ticker */}
              <div
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  borderRadius: 8,
                  padding: '8px 10px',
                  fontSize: '0.7rem',
                  color: '#fde047',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>{activeRunningString || 'Belum ada running text yang aktif.'}</span>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 14, textAlign: 'center' }}>
              Tampilan Digital Signage ini siap disambungkan ke Smart TV Masjid atau Android TV Box melalui browser fullscreen.
            </p>
          </div>
        )}

        {/* TAB 2: KELOLA RUNNING TEXT */}
        {activeTab === 'running' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                Daftar Pesan Running Text
              </span>
              <button
                type="button"
                onClick={handleOpenAddRt}
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
                <span>+ Pesan Baru</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {runningTexts.map((rt) => (
                <div
                  key={rt.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: 14,
                    border: '1px solid #e2e8f0',
                    padding: '14px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, paddingRight: 8 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                        {rt.pesan}
                      </div>
                      <div style={{ marginTop: 6 }}>
                        <span
                          style={{
                            background: rt.aktif ? '#dcfce7' : '#f1f5f9',
                            color: rt.aktif ? '#166534' : '#64748b',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 999,
                          }}
                        >
                          {rt.aktif ? '● TAYANG DI TV' : '○ NONAKTIF'}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEditRt(rt)}
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
                        onClick={() => handleDeleteRtItem(rt.id)}
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

        {/* TAB 3: KELOLA PENGUMUMAN */}
        {activeTab === 'pengumuman' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                Slide Pengumuman Digital TV
              </span>
              <button
                type="button"
                onClick={handleOpenAddPengumuman}
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
                <span>+ Pengumuman</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pengumumanList.map((p) => (
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
                    <div style={{ flex: 1, paddingRight: 8 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                        {p.judul}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: 4 }}>
                        {p.isi}
                      </div>
                      <div style={{ marginTop: 6 }}>
                        <span
                          style={{
                            background: p.tampilkan ? '#dcfce7' : '#f1f5f9',
                            color: p.tampilkan ? '#166534' : '#64748b',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 999,
                          }}
                        >
                          {p.tampilkan ? '● AKTIF DITAMPILKAN' : '○ DISEMBUNYIKAN'}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEditPengumuman(p)}
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
                        onClick={() => handleDeletePengumumanItem(p.id)}
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

        {/* TAB 4: PENGATURAN DISPLAY TV */}
        {activeTab === 'setting' && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              padding: '18px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
            }}
          >
            <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a', marginBottom: 14 }}>
              Pengaturan Layar TV Masjid
            </h4>

            <form onSubmit={handleSaveSetting} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Nama Utama Masjid di TV
                </label>
                <input
                  type="text"
                  required
                  value={settingNama}
                  onChange={(e) => setSettingNama(e.target.value)}
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
                  Keterangan Lokasi / Wilayah
                </label>
                <input
                  type="text"
                  required
                  value={settingLokasi}
                  onChange={(e) => setSettingLokasi(e.target.value)}
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
                  Durasi Hitung Mundur Jeda Iqomah (Menit)
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  required
                  value={settingIqomah}
                  onChange={(e) => setSettingIqomah(Number(e.target.value))}
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

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '10px', marginTop: 6 }}
              >
                <CheckCircle2 size={16} />
                <span>Simpan Pengaturan Display TV</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* MODAL 1: Tambah / Edit Running Text */}
      {isRtModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingRt ? 'Edit Pesan Running Text' : 'Tambah Running Text Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsRtModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveRt} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Isi Pesan Running Text
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Contoh: 📢 Mohon merapatkan dan meluruskan shaf shalat..."
                  value={rtPesan}
                  onChange={(e) => setRtPesan(e.target.value)}
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

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  id="rtAktifCheckbox"
                  checked={rtAktif}
                  onChange={(e) => setRtAktif(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: '#0284c7' }}
                />
                <label htmlFor="rtAktifCheckbox" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                  Aktifkan di Layar TV
                </label>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsRtModalOpen(false)}
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
                  <span>{editingRt ? 'Simpan Perubahan' : 'Tambah Pesan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Tambah / Edit Pengumuman */}
      {isPengumumanModalOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingPengumuman ? 'Edit Slide Pengumuman' : 'Tambah Slide Pengumuman'}
              </h3>
              <button
                type="button"
                onClick={() => setIsPengumumanModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePengumuman} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                  Judul Pengumuman
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kajian Akbar Akhir Bulan"
                  value={pengumumanJudul}
                  onChange={(e) => setPengumumanJudul(e.target.value)}
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
                  Isi / Detail Pengumuman
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Informasi waktu, penceramah, dan tempat..."
                  value={pengumumanIsi}
                  onChange={(e) => setPengumumanIsi(e.target.value)}
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

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  id="pengumumanTampilkanCheckbox"
                  checked={pengumumanTampilkan}
                  onChange={(e) => setPengumumanTampilkan(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: '#0284c7' }}
                />
                <label htmlFor="pengumumanTampilkanCheckbox" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                  Tampilkan di TV Monitor
                </label>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsPengumumanModalOpen(false)}
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
                  <span>{editingPengumuman ? 'Perbarui' : 'Simpan Pengumuman'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
