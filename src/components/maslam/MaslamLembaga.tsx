'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  Plus,
  Edit3,
  Trash2,
  Copy,
  Check,
  X,
  Sparkles,
  CreditCard,
  User,
  CheckCircle2,
} from 'lucide-react';
import {
  ProfilLembaga,
  PengurusLembaga,
  RekeningLembaga,
} from '@/types/dkm';
import {
  INITIAL_PROFIL_LEMBAGA,
  INITIAL_PENGURUS_LEMBAGA,
  INITIAL_REKENING_LEMBAGA,
} from '@/lib/mockData';

interface MaslamLembagaProps {
  onBack: () => void;
  profil?: ProfilLembaga;
  onUpdateProfil?: (p: ProfilLembaga) => void;
  pengurus?: PengurusLembaga[];
  onAddPengurus?: (item: Omit<PengurusLembaga, 'id'>) => void;
  onUpdatePengurus?: (item: PengurusLembaga) => void;
  onDeletePengurus?: (id: number) => void;
  rekening?: RekeningLembaga[];
  onAddRekening?: (item: Omit<RekeningLembaga, 'id'>) => void;
  onUpdateRekening?: (item: RekeningLembaga) => void;
  onDeleteRekening?: (id: number) => void;
}

const PRESET_ICONS = ['👤', '📝', '💰', '🤝', '🕌', '⚙️', '📢', '🛡️', '⭐', '📖'];
const PRESET_ROLES = [
  'Ketua DKM',
  'Wakil Ketua DKM',
  'Sekretaris',
  'Bendahara Umum',
  'Ketua Bidang ZISWAF',
  'Bidang Sarana & Prasarana',
  'Bidang Dakwah & Kajian',
  'Imam Rawatib',
  'Muadzin',
  'Marbot Masjid',
  'Koordinator Keamanan',
];

export const MaslamLembaga: React.FC<MaslamLembagaProps> = ({
  onBack,
  profil: externalProfil,
  onUpdateProfil,
  pengurus: externalPengurus,
  onAddPengurus,
  onUpdatePengurus,
  onDeletePengurus,
  rekening: externalRekening,
  onAddRekening,
  onUpdateRekening,
  onDeleteRekening,
}) => {
  // Local states for fallback or live display
  const [profilState, setProfilState] = useState<ProfilLembaga>(
    externalProfil || INITIAL_PROFIL_LEMBAGA
  );
  const [pengurusList, setPengurusList] = useState<PengurusLembaga[]>(
    externalPengurus || INITIAL_PENGURUS_LEMBAGA
  );
  const [rekeningList, setRekeningList] = useState<RekeningLembaga[]>(
    externalRekening || INITIAL_REKENING_LEMBAGA
  );

  // Modals visibility
  const [isEditProfilOpen, setIsEditProfilOpen] = useState<boolean>(false);
  const [isPengurusModalOpen, setIsPengurusModalOpen] = useState<boolean>(false);
  const [editingPengurus, setEditingPengurus] = useState<PengurusLembaga | null>(null);

  const [isRekeningModalOpen, setIsRekeningModalOpen] = useState<boolean>(false);
  const [editingRekening, setEditingRekening] = useState<RekeningLembaga | null>(null);

  // Form states for Profil
  const [formProfil, setFormProfil] = useState<ProfilLembaga>(profilState);

  // Form states for Pengurus
  const [formPengurusRole, setFormPengurusRole] = useState<string>('');
  const [formPengurusNama, setFormPengurusNama] = useState<string>('');
  const [formPengurusNoHp, setFormPengurusNoHp] = useState<string>('');
  const [formPengurusIcon, setFormPengurusIcon] = useState<string>('👤');

  // Form states for Rekening
  const [formRekeningBank, setFormRekeningBank] = useState<string>('BANK SYARIAH INDONESIA (BSI)');
  const [formRekeningNomor, setFormRekeningNomor] = useState<string>('');
  const [formRekeningAtasNama, setFormRekeningAtasNama] = useState<string>('DKM AL-MUHAJIRIN BEKASI');

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyRekening = (rek: string) => {
    navigator.clipboard?.writeText(rek);
    showToast(`Nomor rekening ${rek} berhasil disalin!`);
  };

  // -------------------------------------------------------------
  // HANDLERS: PROFIL LEMBAGA
  // -------------------------------------------------------------
  const handleOpenEditProfil = () => {
    setFormProfil({ ...profilState });
    setIsEditProfilOpen(true);
  };

  const handleSaveProfil = (e: React.FormEvent) => {
    e.preventDefault();
    setProfilState(formProfil);
    if (onUpdateProfil) onUpdateProfil(formProfil);
    setIsEditProfilOpen(false);
    showToast('Profil Lembaga berhasil diperbarui!');
  };

  // -------------------------------------------------------------
  // HANDLERS: PENGURUS LEMBAGA
  // -------------------------------------------------------------
  const handleOpenAddPengurus = () => {
    setEditingPengurus(null);
    setFormPengurusRole('');
    setFormPengurusNama('');
    setFormPengurusNoHp('');
    setFormPengurusIcon('👤');
    setIsPengurusModalOpen(true);
  };

  const handleOpenEditPengurus = (p: PengurusLembaga) => {
    setEditingPengurus(p);
    setFormPengurusRole(p.role);
    setFormPengurusNama(p.nama);
    setFormPengurusNoHp(p.noHp || '');
    setFormPengurusIcon(p.icon || '👤');
    setIsPengurusModalOpen(true);
  };

  const handleSavePengurus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPengurusNama.trim() || !formPengurusRole.trim()) {
      alert('Nama dan Jabatan pengurus wajib diisi!');
      return;
    }

    if (editingPengurus) {
      // Edit existing
      const updated: PengurusLembaga = {
        ...editingPengurus,
        role: formPengurusRole.trim(),
        nama: formPengurusNama.trim(),
        noHp: formPengurusNoHp.trim() || undefined,
        icon: formPengurusIcon,
      };
      setPengurusList((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      if (onUpdatePengurus) onUpdatePengurus(updated);
      showToast('Data pengurus berhasil diupdate!');
    } else {
      // Add new
      const newItem: PengurusLembaga = {
        id: Date.now(),
        role: formPengurusRole.trim(),
        nama: formPengurusNama.trim(),
        noHp: formPengurusNoHp.trim() || undefined,
        icon: formPengurusIcon,
      };
      setPengurusList((prev) => [...prev, newItem]);
      if (onAddPengurus) onAddPengurus(newItem);
      showToast('Pengurus baru berhasil ditambahkan!');
    }

    setIsPengurusModalOpen(false);
  };

  const handleDeletePengurusItem = (id: number, nama: string) => {
    if (window.confirm(`Yakin ingin menghapus pengurus "${nama}"?`)) {
      setPengurusList((prev) => prev.filter((p) => p.id !== id));
      if (onDeletePengurus) onDeletePengurus(id);
      showToast('Pengurus berhasil dihapus.');
    }
  };

  // -------------------------------------------------------------
  // HANDLERS: REKENING BANK
  // -------------------------------------------------------------
  const handleOpenAddRekening = () => {
    setEditingRekening(null);
    setFormRekeningBank('BANK SYARIAH INDONESIA (BSI)');
    setFormRekeningNomor('');
    setFormRekeningAtasNama('DKM AL-MUHAJIRIN BEKASI');
    setIsRekeningModalOpen(true);
  };

  const handleOpenEditRekening = (r: RekeningLembaga) => {
    setEditingRekening(r);
    setFormRekeningBank(r.bank);
    setFormRekeningNomor(r.noRekening);
    setFormRekeningAtasNama(r.atasNama);
    setIsRekeningModalOpen(true);
  };

  const handleSaveRekening = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRekeningBank.trim() || !formRekeningNomor.trim()) {
      alert('Nama Bank dan Nomor Rekening wajib diisi!');
      return;
    }

    if (editingRekening) {
      const updated: RekeningLembaga = {
        ...editingRekening,
        bank: formRekeningBank.trim(),
        noRekening: formRekeningNomor.trim(),
        atasNama: formRekeningAtasNama.trim() || 'DKM AL-MUHAJIRIN BEKASI',
      };
      setRekeningList((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      if (onUpdateRekening) onUpdateRekening(updated);
      showToast('Data rekening berhasil diperbarui!');
    } else {
      const newItem: RekeningLembaga = {
        id: Date.now(),
        bank: formRekeningBank.trim(),
        noRekening: formRekeningNomor.trim(),
        atasNama: formRekeningAtasNama.trim() || 'DKM AL-MUHAJIRIN BEKASI',
      };
      setRekeningList((prev) => [...prev, newItem]);
      if (onAddRekening) onAddRekening(newItem);
      showToast('Rekening baru berhasil ditambahkan!');
    }

    setIsRekeningModalOpen(false);
  };

  const handleDeleteRekeningItem = (id: number, bank: string) => {
    if (window.confirm(`Hapus rekening bank ${bank}?`)) {
      setRekeningList((prev) => prev.filter((r) => r.id !== id));
      if (onDeleteRekening) onDeleteRekening(id);
      showToast('Rekening berhasil dihapus.');
    }
  };

  return (
    <div style={{ paddingBottom: 85, position: 'relative' }}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              background: '#0f172a',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: 30,
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.84rem',
              fontWeight: 600,
              border: '1px solid #334155',
            }}
          >
            <CheckCircle2 size={16} color="#10b981" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
          color: 'white',
          padding: '16px 18px 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
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
            <span>Data Lembaga</span>
          </button>

          <button
            type="button"
            onClick={handleOpenEditProfil}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              color: 'white',
              borderRadius: 8,
              padding: '6px 12px',
              fontSize: '0.74rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Edit3 size={13} />
            <span>Edit Profil</span>
          </button>
        </div>

        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0 }}>
            {profilState.nama}
          </h2>
          <p style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: 2, margin: 0 }}>
            Dewan Kemakmuran Masjid (DKM) {profilState.periode}
          </p>
        </div>
      </div>

      {/* Hero Card Profil */}
      <div style={{ padding: '16px' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: 20,
            border: '1px solid #e2e8f0',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            position: 'relative',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profilState.logoUrl || '/logo.png'}
            alt={`Logo ${profilState.nama}`}
            style={{
              width: 84,
              height: 84,
              margin: '0 auto 12px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.18))',
            }}
          />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
            {profilState.nama}
          </h3>
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 4, margin: 0, fontWeight: 600 }}>
            {profilState.yayasan}
          </p>

          {profilState.deskripsi && (
            <p style={{ fontSize: '0.74rem', color: '#475569', marginTop: 8, lineHeight: 1.4 }}>
              {profilState.deskripsi}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              fontSize: '0.78rem',
              color: '#334155',
              marginTop: 12,
              background: '#f8fafc',
              padding: '8px 12px',
              borderRadius: 10,
              border: '1px solid #f1f5f9',
            }}
          >
            <MapPin size={16} style={{ color: '#ea580c', flexShrink: 0 }} />
            <span>{profilState.alamat}</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              marginTop: 10,
            }}
          >
            <div
              style={{
                background: '#fff7ed',
                padding: '8px 10px',
                borderRadius: 8,
                border: '1px solid #ffedd5',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.72rem',
                color: '#c2410c',
                fontWeight: 600,
              }}
            >
              <Phone size={13} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {profilState.telepon || '-'}
              </span>
            </div>

            <div
              style={{
                background: '#f0fdf4',
                padding: '8px 10px',
                borderRadius: 8,
                border: '1px solid #dcfce7',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.72rem',
                color: '#15803d',
                fontWeight: 600,
              }}
            >
              <Mail size={13} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {profilState.email || '-'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* SECTION: SUSUNAN PENGURUS DKM                           */}
      {/* ======================================================= */}
      <div style={{ padding: '0 16px 18px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
              Susunan Pengurus DKM
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
              Total: {pengurusList.length} Pengurus Aktif
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenAddPengurus}
            style={{
              background: '#ea580c',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              padding: '7px 12px',
              fontSize: '0.76rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(234, 88, 12, 0.3)',
            }}
          >
            <Plus size={15} />
            <span>Tambah Pengurus</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {pengurusList.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#ffffff',
                borderRadius: 14,
                border: '1px solid #e2e8f0',
                padding: '12px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: '#fff7ed',
                    border: '1px solid #ffedd5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}
                >
                  {item.icon || '👤'}
                </div>
                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      color: '#ea580c',
                      fontWeight: 800,
                      background: '#fff7ed',
                      padding: '2px 8px',
                      borderRadius: 6,
                      display: 'inline-block',
                      marginBottom: 2,
                    }}
                  >
                    {item.role}
                  </span>
                  <div
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.nama}
                  </div>
                  {item.noHp && (
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 1 }}>
                      WA: {item.noHp}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Edit & Delete */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, marginLeft: 8 }}>
                <button
                  type="button"
                  onClick={() => handleOpenEditPengurus(item)}
                  title="Edit Pengurus"
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    color: '#0f172a',
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Edit3 size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeletePengurusItem(item.id, item.nama)}
                  title="Hapus Pengurus"
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {pengurusList.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '24px',
                background: '#ffffff',
                borderRadius: 14,
                border: '1px dashed #cbd5e1',
                color: '#94a3b8',
                fontSize: '0.82rem',
              }}
            >
              Belum ada data pengurus. Klik tombol <strong>+ Tambah Pengurus</strong> di atas.
            </div>
          )}
        </div>
      </div>

      {/* ======================================================= */}
      {/* SECTION: REKENING RESMI MASJID                          */}
      {/* ======================================================= */}
      <div style={{ padding: '0 16px 20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
              Rekening Infaq Bank Syariah
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
              {rekeningList.length} Rekening Terdaftar
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenAddRekening}
            style={{
              background: '#0284c7',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              padding: '7px 12px',
              fontSize: '0.76rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)',
            }}
          >
            <Plus size={15} />
            <span>Tambah Rekening</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rekeningList.map((rek) => (
            <div
              key={rek.id}
              style={{
                background: '#ffffff',
                borderRadius: 14,
                border: '1px solid #fed7aa',
                padding: '14px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#c2410c' }}>
                    {rek.bank}
                  </div>
                  <div
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 900,
                      color: '#0f172a',
                      marginTop: 3,
                      letterSpacing: '0.5px',
                    }}
                  >
                    {rek.noRekening}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                    a.n. {rek.atasNama}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => handleCopyRekening(rek.noRekening)}
                    style={{
                      background: '#ffedd5',
                      border: '1px solid #fdba74',
                      color: '#c2410c',
                      padding: '5px 10px',
                      borderRadius: 8,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Copy size={12} />
                    <span>Salin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEditRekening(rek)}
                    title="Edit Rekening"
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      color: '#334155',
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Edit3 size={13} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteRekeningItem(rek.id, rek.bank)}
                    title="Hapus Rekening"
                    style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {rekeningList.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '20px',
                background: '#ffffff',
                borderRadius: 14,
                border: '1px dashed #cbd5e1',
                color: '#94a3b8',
                fontSize: '0.82rem',
              }}
            >
              Belum ada rekening terdaftar. Klik <strong>+ Tambah Rekening</strong>.
            </div>
          )}
        </div>
      </div>

      {/* ======================================================= */}
      {/* MODAL 1: EDIT PROFIL LEMBAGA                            */}
      {/* ======================================================= */}
      <AnimatePresence>
        {isEditProfilOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
            onClick={() => setIsEditProfilOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#ffffff',
                borderRadius: 20,
                width: '100%',
                maxWidth: 440,
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#f8fafc',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Building2 size={18} color="#ea580c" />
                  <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>
                    Edit Profil Lembaga
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditProfilOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProfil} style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Nama Lembaga / Masjid
                    </label>
                    <input
                      type="text"
                      required
                      value={formProfil.nama}
                      onChange={(e) => setFormProfil({ ...formProfil, nama: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Nama Yayasan / Badan Hukum
                    </label>
                    <input
                      type="text"
                      required
                      value={formProfil.yayasan}
                      onChange={(e) => setFormProfil({ ...formProfil, yayasan: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Periode DKM
                    </label>
                    <input
                      type="text"
                      value={formProfil.periode}
                      onChange={(e) => setFormProfil({ ...formProfil, periode: e.target.value })}
                      placeholder="Contoh: Periode 2024 - 2028"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Alamat Lengkap
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formProfil.alamat}
                      onChange={(e) => setFormProfil({ ...formProfil, alamat: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                        No. Telp / WA
                      </label>
                      <input
                        type="text"
                        value={formProfil.telepon}
                        onChange={(e) => setFormProfil({ ...formProfil, telepon: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: 10,
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                        Email Resmi
                      </label>
                      <input
                        type="email"
                        value={formProfil.email}
                        onChange={(e) => setFormProfil({ ...formProfil, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: 10,
                          border: '1px solid #cbd5e1',
                          fontSize: '0.85rem',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Deskripsi / Visi Misi Singkat
                    </label>
                    <textarea
                      rows={3}
                      value={formProfil.deskripsi || ''}
                      onChange={(e) => setFormProfil({ ...formProfil, deskripsi: e.target.value })}
                      placeholder="Visi misi & deskripsi lembaga..."
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <button
                      type="button"
                      onClick={() => setIsEditProfilOpen(false)}
                      style={{
                        flex: 1,
                        padding: '11px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        color: '#64748b',
                      }}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      style={{
                        flex: 2,
                        padding: '11px',
                        borderRadius: 10,
                        border: 'none',
                        background: '#ea580c',
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)',
                      }}
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================= */}
      {/* MODAL 2: TAMBAH / EDIT PENGURUS                         */}
      {/* ======================================================= */}
      <AnimatePresence>
        {isPengurusModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
            onClick={() => setIsPengurusModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#ffffff',
                borderRadius: 20,
                width: '100%',
                maxWidth: 420,
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#f8fafc',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <User size={18} color="#ea580c" />
                  <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>
                    {editingPengurus ? 'Edit Data Pengurus' : 'Tambah Pengurus Baru'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPengurusModalOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSavePengurus} style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Jabatan / Posisi
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ketua DKM / Sekretaris"
                      value={formPengurusRole}
                      onChange={(e) => setFormPengurusRole(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                      }}
                    />

                    {/* Quick suggestion chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                      {PRESET_ROLES.slice(0, 5).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setFormPengurusRole(r)}
                          style={{
                            background: formPengurusRole === r ? '#ea580c' : '#f1f5f9',
                            color: formPengurusRole === r ? '#ffffff' : '#475569',
                            border: 'none',
                            borderRadius: 6,
                            padding: '3px 7px',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Nama Lengkap Pengurus
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: H. Ahmad Dahlan"
                      value={formPengurusNama}
                      onChange={(e) => setFormPengurusNama(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Nomor HP / WhatsApp (Opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: 0812-3456-7890"
                      value={formPengurusNoHp}
                      onChange={(e) => setFormPengurusNoHp(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Pilih Ikon Avatar
                    </label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {PRESET_ICONS.map((ic) => (
                        <button
                          key={ic}
                          type="button"
                          onClick={() => setFormPengurusIcon(ic)}
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: 10,
                            border: formPengurusIcon === ic ? '2px solid #ea580c' : '1px solid #cbd5e1',
                            background: formPengurusIcon === ic ? '#fff7ed' : '#ffffff',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {ic}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <button
                      type="button"
                      onClick={() => setIsPengurusModalOpen(false)}
                      style={{
                        flex: 1,
                        padding: '11px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        color: '#64748b',
                      }}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      style={{
                        flex: 2,
                        padding: '11px',
                        borderRadius: 10,
                        border: 'none',
                        background: '#ea580c',
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)',
                      }}
                    >
                      {editingPengurus ? 'Simpan Perubahan' : 'Tambah Pengurus'}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================= */}
      {/* MODAL 3: TAMBAH / EDIT REKENING BANK                    */}
      {/* ======================================================= */}
      <AnimatePresence>
        {isRekeningModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
            onClick={() => setIsRekeningModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#ffffff',
                borderRadius: 20,
                width: '100%',
                maxWidth: 420,
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#f8fafc',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CreditCard size={18} color="#0284c7" />
                  <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>
                    {editingRekening ? 'Edit Rekening Bank' : 'Tambah Rekening Bank'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRekeningModalOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveRekening} style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Nama Bank
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: BANK SYARIAH INDONESIA (BSI)"
                      value={formRekeningBank}
                      onChange={(e) => setFormRekeningBank(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                      }}
                    />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                      {['BANK SYARIAH INDONESIA (BSI)', 'BANK MUAMALAT', 'BCA SYARIAH', 'MANDIRI'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormRekeningBank(b)}
                          style={{
                            background: formRekeningBank === b ? '#0284c7' : '#f1f5f9',
                            color: formRekeningBank === b ? '#ffffff' : '#475569',
                            border: 'none',
                            borderRadius: 6,
                            padding: '3px 7px',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Nomor Rekening
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 714-902-1882"
                      value={formRekeningNomor}
                      onChange={(e) => setFormRekeningNomor(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: 4 }}>
                      Atas Nama (A.N.)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: DKM AL-MUHAJIRIN BEKASI"
                      value={formRekeningAtasNama}
                      onChange={(e) => setFormRekeningAtasNama(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <button
                      type="button"
                      onClick={() => setIsRekeningModalOpen(false)}
                      style={{
                        flex: 1,
                        padding: '11px',
                        borderRadius: 10,
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        color: '#64748b',
                      }}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      style={{
                        flex: 2,
                        padding: '11px',
                        borderRadius: 10,
                        border: 'none',
                        background: '#0284c7',
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
                      }}
                    >
                      {editingRekening ? 'Simpan Perubahan' : 'Tambah Rekening'}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
