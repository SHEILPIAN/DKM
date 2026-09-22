'use client';

import React, { useState } from 'react';
import {
  Home,
  Building2,
  Sparkles,
  User,
  QrCode,
  CheckCircle2,
  X,
} from 'lucide-react';
import {
  KategoriKas,
  Transaksi,
  Fasilitas,
  Reservasi,
  Mustahiq,
  HewanQurban,
  ShohibulQurban,
  Pegawai,
  Absensi,
  SlipGaji,
  Warga,
  ProfilLembaga,
  PengurusLembaga,
  RekeningLembaga,
  Kegiatan,
  InventoryItem,
} from '@/types/dkm';

import { MaslamHome } from './MaslamHome';
import { MaslamKeuangan } from './MaslamKeuangan';
import { MaslamWarga } from './MaslamWarga';
import { MaslamAset } from './MaslamAset';
import { MaslamZiswaf } from './MaslamZiswaf';
import { MaslamIdulAdha } from './MaslamIdulAdha';
import { MaslamAdministrasi } from './MaslamAdministrasi';
import { MaslamLembaga } from './MaslamLembaga';
import { MaslamKegiatan } from './MaslamKegiatan';
import { MaslamInventory } from './MaslamInventory';
import { MaslamIdulFitri } from './MaslamIdulFitri';
import { MaslamTvMasjid } from './MaslamTvMasjid';
import { MaslamAkun } from './MaslamAkun';

interface MaslamAppProps {
  kategoriKas: KategoriKas[];
  transaksi: Transaksi[];
  fasilitas: Fasilitas[];
  reservasi: Reservasi[];
  mustahiq: Mustahiq[];
  hewanQurban: HewanQurban[];
  pegawai: Pegawai[];
  absensi: Absensi[];
  slipGaji: SlipGaji[];
  warga: Warga[];
  stokBerasKg: number;
  danaZakatRp: number;
  onOpenCashier: () => void;
  onOpenBookingModal: (dateStr: string, facilityId: number) => void;
  onOpenZakatModal: () => void;
  onOpenAndroidModal: () => void;
  onSwitchToDesktop: () => void;
  onToggleMustahiqDistribute: (id: number) => void;
  onRegisterShohibul: (
    hewanId: number,
    shohibulData: Omit<ShohibulQurban, 'id' | 'hewanId' | 'tanggalDaftar'>
  ) => void;
  onAddAbsensi: (absenData: Omit<Absensi, 'id'>) => void;
  onApproveSalary: (slipId: number) => void;
  onAddWarga: (w: Omit<Warga, 'id' | 'tanggalDaftar'>) => void;
  onUpdateWarga?: (w: Warga) => void;
  onDeleteWarga?: (id: number) => void;
  profilLembaga?: ProfilLembaga;
  onUpdateProfilLembaga?: (p: ProfilLembaga) => void;
  pengurusLembaga?: PengurusLembaga[];
  onAddPengurusLembaga?: (item: Omit<PengurusLembaga, 'id'>) => void;
  onUpdatePengurusLembaga?: (item: PengurusLembaga) => void;
  onDeletePengurusLembaga?: (id: number) => void;
  rekeningLembaga?: RekeningLembaga[];
  onAddRekeningLembaga?: (item: Omit<RekeningLembaga, 'id'>) => void;
  onUpdateRekeningLembaga?: (item: RekeningLembaga) => void;
  onDeleteRekeningLembaga?: (id: number) => void;
  kegiatanList?: Kegiatan[];
  onAddKegiatan?: (k: Omit<Kegiatan, 'id'>) => void;
  onUpdateKegiatan?: (k: Kegiatan) => void;
  onDeleteKegiatan?: (id: number) => void;
  onAddFasilitas?: (f: Omit<Fasilitas, 'id'>) => void;
  onUpdateFasilitas?: (f: Fasilitas) => void;
  onDeleteFasilitas?: (id: number) => void;
  inventoryList?: InventoryItem[];
  onAddInventory?: (item: Omit<InventoryItem, 'id'>) => void;
  onUpdateInventory?: (item: InventoryItem) => void;
  onDeleteInventory?: (id: number) => void;
}

export const MaslamApp: React.FC<MaslamAppProps> = ({
  kategoriKas,
  transaksi,
  fasilitas,
  reservasi,
  mustahiq,
  hewanQurban,
  pegawai,
  absensi,
  slipGaji,
  warga,
  stokBerasKg,
  danaZakatRp,
  onOpenCashier,
  onOpenBookingModal,
  onOpenZakatModal,
  onOpenAndroidModal,
  onSwitchToDesktop,
  onToggleMustahiqDistribute,
  onRegisterShohibul,
  onAddAbsensi,
  onApproveSalary,
  onAddWarga,
  onUpdateWarga,
  onDeleteWarga,
  profilLembaga,
  onUpdateProfilLembaga,
  pengurusLembaga,
  onAddPengurusLembaga,
  onUpdatePengurusLembaga,
  onDeletePengurusLembaga,
  rekeningLembaga,
  onAddRekeningLembaga,
  onUpdateRekeningLembaga,
  onDeleteRekeningLembaga,
  kegiatanList,
  onAddKegiatan,
  onUpdateKegiatan,
  onDeleteKegiatan,
  onAddFasilitas,
  onUpdateFasilitas,
  onDeleteFasilitas,
  inventoryList,
  onAddInventory,
  onUpdateInventory,
  onDeleteInventory,
}) => {
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [isQrScanOpen, setIsQrScanOpen] = useState<boolean>(false);
  const [isQrisBannerOpen, setIsQrisBannerOpen] = useState<boolean>(false);

  // Bottom dock active tab determination
  const getDockActiveTab = () => {
    if (currentScreen === 'home') return 'beranda';
    if (currentScreen === 'lembaga') return 'lembaga';
    if (currentScreen === 'keuangan') return 'maslam';
    if (currentScreen === 'akun') return 'akun';
    return '';
  };

  const dockActiveTab = getDockActiveTab();

  return (
    <div className="maslam-phone-wrapper">
      <div className="maslam-device">
        {/* Main Content Router */}
        <div style={{ flex: 1 }}>
          {currentScreen === 'home' && (
            <MaslamHome
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenQris={() => setIsQrisBannerOpen(true)}
              onOpenQrScan={() => setIsQrScanOpen(true)}
            />
          )}

          {currentScreen === 'keuangan' && (
            <MaslamKeuangan
              onBack={() => setCurrentScreen('home')}
              kategoriKas={kategoriKas}
              transaksi={transaksi}
              onOpenCashier={onOpenCashier}
            />
          )}

          {currentScreen === 'warga' && (
            <MaslamWarga
              onBack={() => setCurrentScreen('home')}
              wargaList={warga}
              onAddWarga={onAddWarga}
              onUpdateWarga={onUpdateWarga}
              onDeleteWarga={onDeleteWarga}
            />
          )}

          {currentScreen === 'aset' && (
            <MaslamAset
              onBack={() => setCurrentScreen('home')}
              fasilitas={fasilitas}
              reservasi={reservasi}
              onOpenBookingModal={onOpenBookingModal}
              onAddFasilitas={onAddFasilitas}
              onUpdateFasilitas={onUpdateFasilitas}
              onDeleteFasilitas={onDeleteFasilitas}
            />
          )}

          {currentScreen === 'ziswaf' && (
            <MaslamZiswaf
              onBack={() => setCurrentScreen('home')}
              onOpenZakatModal={onOpenZakatModal}
              mustahiqList={mustahiq}
              onToggleDistribute={onToggleMustahiqDistribute}
              stokBerasKg={stokBerasKg}
              danaZakatRp={danaZakatRp}
            />
          )}

          {currentScreen === 'iduladha' && (
            <MaslamIdulAdha
              onBack={() => setCurrentScreen('home')}
              hewanQurban={hewanQurban}
              onRegisterShohibul={onRegisterShohibul}
            />
          )}

          {currentScreen === 'administrasi' && (
            <MaslamAdministrasi
              onBack={() => setCurrentScreen('home')}
              pegawai={pegawai}
              absensi={absensi}
              slipGaji={slipGaji}
              onAddAbsensi={onAddAbsensi}
              onApproveSalary={onApproveSalary}
            />
          )}

          {currentScreen === 'lembaga' && (
            <MaslamLembaga
              onBack={() => setCurrentScreen('home')}
              profil={profilLembaga}
              onUpdateProfil={onUpdateProfilLembaga}
              pengurus={pengurusLembaga}
              onAddPengurus={onAddPengurusLembaga}
              onUpdatePengurus={onUpdatePengurusLembaga}
              onDeletePengurus={onDeletePengurusLembaga}
              rekening={rekeningLembaga}
              onAddRekening={onAddRekeningLembaga}
              onUpdateRekening={onUpdateRekeningLembaga}
              onDeleteRekening={onDeleteRekeningLembaga}
            />
          )}

          {currentScreen === 'kegiatan' && (
            <MaslamKegiatan
              onBack={() => setCurrentScreen('home')}
              kegiatanList={kegiatanList}
              onAddKegiatan={onAddKegiatan}
              onUpdateKegiatan={onUpdateKegiatan}
              onDeleteKegiatan={onDeleteKegiatan}
            />
          )}

          {currentScreen === 'inventory' && (
            <MaslamInventory
              onBack={() => setCurrentScreen('home')}
              inventoryList={inventoryList}
              onAddInventory={onAddInventory}
              onUpdateInventory={onUpdateInventory}
              onDeleteInventory={onDeleteInventory}
            />
          )}

          {currentScreen === 'idulfitri' && (
            <MaslamIdulFitri
              onBack={() => setCurrentScreen('home')}
              onOpenZakat={onOpenZakatModal}
            />
          )}

          {currentScreen === 'tvmasjid' && (
            <MaslamTvMasjid onBack={() => setCurrentScreen('home')} />
          )}

          {currentScreen === 'akun' && (
            <MaslamAkun
              onBack={() => setCurrentScreen('home')}
              onSwitchToDesktop={onSwitchToDesktop}
              onOpenAndroidModal={onOpenAndroidModal}
            />
          )}
        </div>

        {/* Bottom Navigation Dock (Screenshot 1: Beranda | Lembaga | Maslam | Akun) */}
        <nav className="maslam-bottom-dock">
          {/* 1. Beranda */}
          <button
            type="button"
            className={`maslam-dock-tab ${dockActiveTab === 'beranda' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('home')}
          >
            <Home size={20} strokeWidth={dockActiveTab === 'beranda' ? 2.6 : 1.8} />
            <span>Beranda</span>
          </button>

          {/* 2. Lembaga */}
          <button
            type="button"
            className={`maslam-dock-tab ${dockActiveTab === 'lembaga' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('lembaga')}
          >
            <Building2 size={20} strokeWidth={dockActiveTab === 'lembaga' ? 2.6 : 1.8} />
            <span>Lembaga</span>
          </button>

          {/* 3. Maslam (Keuangan / Pusat DKM) */}
          <button
            type="button"
            className={`maslam-dock-tab ${dockActiveTab === 'maslam' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('keuangan')}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: dockActiveTab === 'maslam' ? '#0a3a78' : '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: dockActiveTab === 'maslam' ? '#ffffff' : '#64748b',
                fontSize: '11px',
                fontWeight: 900,
              }}
            >
              M
            </div>
            <span>Maslam</span>
          </button>

          {/* 4. Akun */}
          <button
            type="button"
            className={`maslam-dock-tab ${dockActiveTab === 'akun' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('akun')}
          >
            <User size={20} strokeWidth={dockActiveTab === 'akun' ? 2.6 : 1.8} />
            <span>Akun</span>
          </button>
        </nav>
      </div>

      {/* QR Code Scanner Simulation Modal */}
      {isQrScanOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 390, textAlign: 'center' }}>
            <div className="modal-header">
              <h3 className="modal-title">Scan QR Daging Kurban</h3>
              <button
                type="button"
                onClick={() => setIsQrScanOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  width: 170,
                  height: 170,
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
                <QrCode size={90} style={{ color: '#0f172a' }} />
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

              <p style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 600, marginBottom: 16 }}>
                Arahkan kamera smartphone ke QR Code Kupon Daging Jamaah / Mustahik
              </p>

              <button
                type="button"
                onClick={() => {
                  alert('Scan Berhasil!\n\nKupon #QRB-2026-042\nNama: Bpk. Salim (RT 01/08)\nStatus: VALID - Silakan berikan paket daging 1.5 Kg.');
                  setIsQrScanOpen(false);
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

      {/* QRIS Infaq Digital Modal */}
      {isQrisBannerOpen && (
        <div className="modal-overlay" style={{ zIndex: 120 }}>
          <div className="modal-card" style={{ maxWidth: 390, textAlign: 'center' }}>
            <div className="modal-header">
              <h3 className="modal-title">QRIS Infaq Digital</h3>
              <button
                type="button"
                onClick={() => setIsQrisBannerOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  background: '#ffffff',
                  padding: 16,
                  borderRadius: 16,
                  border: '1px solid #e2e8f0',
                  display: 'inline-block',
                  margin: '0 auto 14px',
                }}
              >
                <QrCode size={180} style={{ color: '#0f172a' }} />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                DKM AL-MUHAJIRIN
              </h4>
              <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0 }}>
                NMID: ID1020038891238 • Mendukung Semua Bank & Dompet Digital
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
