'use client';

import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit2, Trash2, Shield, User as UserIcon, Lock, Mail, Users, CheckCircle2 } from 'lucide-react';
import { User, Role } from '@/types/dkm';

interface MaslamUserManagementProps {
  onBack: () => void;
  usersList: User[];
  onAddUser: (u: Omit<User, 'id'>) => void;
  onUpdateUser: (u: User) => void;
  onDeleteUser: (id: number) => void;
}

export const MaslamUserManagement: React.FC<MaslamUserManagementProps> = ({
  onBack,
  usersList,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Form State
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('JAMAAH');

  const openAddModal = () => {
    setEditingUser(null);
    setNama('');
    setEmail('');
    setPassword('');
    setRole('JAMAAH');
    setIsModalOpen(true);
  };

  const openEditModal = (u: User) => {
    setEditingUser(u);
    setNama(u.nama);
    setEmail(u.email);
    setPassword(u.password || '');
    setRole(u.role);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !email || !password || !role) return;

    if (editingUser) {
      onUpdateUser({ ...editingUser, nama, email, password, role });
    } else {
      onAddUser({ nama, email, password, role });
    }
    setIsModalOpen(false);
  };

  const roleColors: Record<Role, string> = {
    SUPER_ADMIN: '#dc2626', // red
    KETUA_DKM: '#d97706', // orange
    BENDAHARA: '#059669', // green
    PIKET: '#2563eb', // blue
    JAMAAH: '#64748b', // slate
  };

  return (
    <div style={{ paddingBottom: 80, minHeight: '100%', background: '#f8fafc' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #093c78 0%, #062b59 100%)',
          color: 'white',
          padding: '14px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            <span>Manajemen Akun</span>
          </button>
          
          <button
            onClick={openAddModal}
            style={{
              background: '#f59e0b',
              color: '#1e293b',
              border: 'none',
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: '0.8rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
            }}
          >
            <Plus size={16} /> Tambah
          </button>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
          Daftar Pengguna Sistem
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 16 }}>
          Kelola data pengguna, password, dan level hak akses masing-masing akun.
        </p>

        {/* Users List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {usersList.map((u) => (
            <div
              key={u.id}
              style={{
                background: 'white',
                borderRadius: 12,
                padding: '16px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: '#eff6ff',
                    color: roleColors[u.role],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1.5px solid ${roleColors[u.role]}30`,
                  }}
                >
                  <UserIcon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                    {u.nama}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <Mail size={12} /> {u.email}
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <span
                      style={{
                        background: `${roleColors[u.role]}15`,
                        color: roleColors[u.role],
                        padding: '3px 8px',
                        borderRadius: 6,
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        border: `1px solid ${roleColors[u.role]}40`,
                      }}
                    >
                      {u.role.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => openEditModal(u)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: '1px solid #e2e8f0',
                    background: 'white',
                    color: '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDeleteUser(u.id)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: '1px solid #fee2e2',
                    background: '#fef2f2',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tabel Keterangan Hak Akses */}
        <div style={{ marginTop: 24, background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Shield size={20} color="#0f172a" />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Hak Akses (Role)</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: '0.75rem' }}>
              <span style={{ fontWeight: 800, color: roleColors.SUPER_ADMIN }}>SUPER ADMIN:</span> Kontrol penuh seluruh sistem termasuk manajemen user.
            </div>
            <div style={{ fontSize: '0.75rem' }}>
              <span style={{ fontWeight: 800, color: roleColors.KETUA_DKM }}>KETUA DKM:</span> Akses laporan keuangan & persetujuan slip gaji.
            </div>
            <div style={{ fontSize: '0.75rem' }}>
              <span style={{ fontWeight: 800, color: roleColors.BENDAHARA }}>BENDAHARA:</span> Modul Keuangan penuh, Kasir Infaq, & Pembukuan.
            </div>
            <div style={{ fontSize: '0.75rem' }}>
              <span style={{ fontWeight: 800, color: roleColors.PIKET }}>PIKET:</span> Modul Reservasi, Kasir Infaq Masuk, Presensi.
            </div>
            <div style={{ fontSize: '0.75rem' }}>
              <span style={{ fontWeight: 800, color: roleColors.JAMAAH }}>JAMAAH:</span> Akses Ziswaf & melihat jadwal. Tidak dapat merubah data.
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form Tambah / Edit */}
      {isModalOpen && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: 'white',
              width: '100%',
              maxWidth: '480px',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: '24px',
              boxShadow: '0 -10px 25px -5px rgba(0, 0, 0, 0.1)',
              animation: 'slideUp 0.3s ease-out forwards',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                {editingUser ? 'Edit Akun' : 'Tambah Akun'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>Nama Lengkap</label>
                <div style={{ position: 'relative' }}>
                  <UserIcon size={18} color="#94a3b8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                    placeholder="Contoh: H. Ahmad Dahlan"
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 38px',
                      borderRadius: 12,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>Alamat Email (Untuk Login)</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="contoh@dkm.id"
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 38px',
                      borderRadius: 12,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>Kata Sandi (Password)</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Minimal 6 karakter"
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 38px',
                      borderRadius: 12,
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>Hak Akses / Jabatan</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 12,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    backgroundColor: 'white',
                    outline: 'none',
                    appearance: 'none',
                  }}
                >
                  <option value="SUPER_ADMIN">Admin IT (Super Admin)</option>
                  <option value="KETUA_DKM">Ketua DKM</option>
                  <option value="BENDAHARA">Bendahara Umum</option>
                  <option value="PIKET">Petugas Piket / Operator</option>
                  <option value="JAMAAH">Jamaah (Hanya Lihat)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: 12,
                    border: '1px solid #cbd5e1',
                    background: 'white',
                    color: '#64748b',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: 12,
                    border: 'none',
                    background: '#2563eb',
                    color: 'white',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Simpan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
