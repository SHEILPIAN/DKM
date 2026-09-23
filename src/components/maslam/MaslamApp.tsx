'use client';

import React, { useState } from 'react';
import {
  Home,
  Building2,
  Sparkles,
  User as UserIcon,
  QrCode,
  CheckCircle2,
  X,
} from 'lucide-react';
import {
  User,
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
  IdulFitriAgenda,
  IdulFitriPanitia,
  TvRunningText,
  TvPengumuman,
  TvSetting,
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
import { MaslamUserManagement } from './MaslamUserManagement';

interface MaslamAppProps {
  loggedInUser?: User | null;
  onLogout?: () => void;
  usersList?: User[];
  onAddUser?: (u: Omit<User, 'id'>) => void;
  onUpdateUser?: (u: User) => void;
  onDeleteUser?: (id: number) => void;
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
  onAddMustahiq?: (m: Omit<Mustahiq, 'id'>) => void;
  onUpdateMustahiq?: (m: Mustahiq) => void;
  onDeleteMustahiq?: (id: number) => void;
  onUpdateStokZiswaf?: (berasKg: number, danaRp: number) => void;
  // Keuangan
  onAddTransaction?: (trx: Omit<Transaksi, 'id'>) => void;
  onUpdateTransaction?: (trx: Transaksi) => void;
  onDeleteTransaction?: (id: number) => void;
  onAddKategoriKas?: (kat: Omit<KategoriKas, 'id'>) => void;
  onUpdateKategoriKas?: (kat: KategoriKas) => void;
  onDeleteKategoriKas?: (id: number) => void;
  // Idul Adha
  onAddHewanQurban?: (hewan: Omit<HewanQurban, 'id' | 'shohibul'>) => void;
  onUpdateHewanQurban?: (hewan: HewanQurban) => void;
  onDeleteHewanQurban?: (id: number) => void;
  onUpdateShohibul?: (hewanId: number, shohibul: ShohibulQurban) => void;
  onDeleteShohibul?: (hewanId: number, shohibulId: number) => void;
  // Administrasi
  onUpdateAbsensi?: (absenData: Absensi) => void;
  onDeleteAbsensi?: (id: number) => void;
  onAddPegawai?: (p: Omit<Pegawai, 'id'>) => void;
  onUpdatePegawai?: (p: Pegawai) => void;
  onDeletePegawai?: (id: number) => void;
  onAddSlipGaji?: (slip: Omit<SlipGaji, 'id' | 'createdAt'>) => void;
  onUpdateSlipGaji?: (slip: SlipGaji) => void;
  onDeleteSlipGaji?: (id: number) => void;
  // Idul Fitri
  idulFitriAgendas?: IdulFitriAgenda[];
  onAddIdulFitriAgenda?: (a: Omit<IdulFitriAgenda, 'id'>) => void;
  onUpdateIdulFitriAgenda?: (a: IdulFitriAgenda) => void;
  onDeleteIdulFitriAgenda?: (id: number) => void;
  idulFitriPanitiaList?: IdulFitriPanitia[];
  onAddIdulFitriPanitia?: (p: Omit<IdulFitriPanitia, 'id'>) => void;
  onUpdateIdulFitriPanitia?: (p: IdulFitriPanitia) => void;
  onDeleteIdulFitriPanitia?: (id: number) => void;
  detailShalatId?: { lokasi: string; waktu: string; imam: string; khatib: string };
  onUpdateDetailShalatId?: (d: { lokasi: string; waktu: string; imam: string; khatib: string }) => void;
  // TV Masjid
  tvRunningTexts?: TvRunningText[];
  onAddTvRunningText?: (rt: Omit<TvRunningText, 'id'>) => void;
  onUpdateTvRunningText?: (rt: TvRunningText) => void;
  onDeleteTvRunningText?: (id: number) => void;
  tvPengumumanList?: TvPengumuman[];
  onAddTvPengumuman?: (p: Omit<TvPengumuman, 'id'>) => void;
  onUpdateTvPengumuman?: (p: TvPengumuman) => void;
  onDeleteTvPengumuman?: (id: number) => void;
  tvSetting?: TvSetting;
  onUpdateTvSetting?: (setting: TvSetting) => void;
}

export const MaslamApp: React.FC<MaslamAppProps> = ({
  loggedInUser,
  onLogout,
  usersList = [],
  onAddUser = () => {},
  onUpdateUser = () => {},
  onDeleteUser = () => {},
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
  onAddMustahiq,
  onUpdateMustahiq,
  onDeleteMustahiq,
  onUpdateStokZiswaf,
  onAddTransaction,
  onUpdateTransaction,
  onDeleteTransaction,
  onAddKategoriKas,
  onUpdateKategoriKas,
  onDeleteKategoriKas,
  onAddHewanQurban,
  onUpdateHewanQurban,
  onDeleteHewanQurban,
  onUpdateShohibul,
  onDeleteShohibul,
  onUpdateAbsensi,
  onDeleteAbsensi,
  onAddPegawai,
  onUpdatePegawai,
  onDeletePegawai,
  onAddSlipGaji,
  onUpdateSlipGaji,
  onDeleteSlipGaji,
  idulFitriAgendas,
  onAddIdulFitriAgenda,
  onUpdateIdulFitriAgenda,
  onDeleteIdulFitriAgenda,
  idulFitriPanitiaList,
  onAddIdulFitriPanitia,
  onUpdateIdulFitriPanitia,
  onDeleteIdulFitriPanitia,
  detailShalatId,
  onUpdateDetailShalatId,
  tvRunningTexts,
  onAddTvRunningText,
  onUpdateTvRunningText,
  onDeleteTvRunningText,
  tvPengumumanList,
  onAddTvPengumuman,
  onUpdateTvPengumuman,
  onDeleteTvPengumuman,
  tvSetting,
  onUpdateTvSetting,
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
        {/* Background Mosque Wallpaper Watermark */}
        <div className="maslam-device-bg" aria-hidden="true">
          <div className="maslam-device-bg-img" />
        </div>

        {/* Main Content Router */}
        <div style={{ flex: 1, position: 'relative', zIndex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0, paddingBottom: '70px' }}>
          {currentScreen === 'home' && (
            <MaslamHome
              loggedInUser={loggedInUser}
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
              onAddTransaction={onAddTransaction}
              onUpdateTransaction={onUpdateTransaction}
              onDeleteTransaction={onDeleteTransaction}
              onAddKategoriKas={onAddKategoriKas}
              onUpdateKategoriKas={onUpdateKategoriKas}
              onDeleteKategoriKas={onDeleteKategoriKas}
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
              onAddMustahiq={onAddMustahiq}
              onUpdateMustahiq={onUpdateMustahiq}
              onDeleteMustahiq={onDeleteMustahiq}
              onUpdateStokZiswaf={onUpdateStokZiswaf}
            />
          )}

          {currentScreen === 'iduladha' && (
            <MaslamIdulAdha
              onBack={() => setCurrentScreen('home')}
              hewanQurban={hewanQurban}
              onRegisterShohibul={onRegisterShohibul}
              onAddHewanQurban={onAddHewanQurban}
              onUpdateHewanQurban={onUpdateHewanQurban}
              onDeleteHewanQurban={onDeleteHewanQurban}
              onUpdateShohibul={onUpdateShohibul}
              onDeleteShohibul={onDeleteShohibul}
            />
          )}

          {currentScreen === 'administrasi' && (
            <MaslamAdministrasi
              onBack={() => setCurrentScreen('home')}
              pegawai={pegawai}
              absensi={absensi}
              slipGaji={slipGaji}
              onAddAbsensi={onAddAbsensi}
              onUpdateAbsensi={onUpdateAbsensi}
              onDeleteAbsensi={onDeleteAbsensi}
              onApproveSalary={onApproveSalary}
              onAddPegawai={onAddPegawai}
              onUpdatePegawai={onUpdatePegawai}
              onDeletePegawai={onDeletePegawai}
              onAddSlipGaji={onAddSlipGaji}
              onUpdateSlipGaji={onUpdateSlipGaji}
              onDeleteSlipGaji={onDeleteSlipGaji}
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
              agendaList={idulFitriAgendas}
              onAddAgenda={onAddIdulFitriAgenda}
              onUpdateAgenda={onUpdateIdulFitriAgenda}
              onDeleteAgenda={onDeleteIdulFitriAgenda}
              panitiaList={idulFitriPanitiaList}
              onAddPanitia={onAddIdulFitriPanitia}
              onUpdatePanitia={onUpdateIdulFitriPanitia}
              onDeletePanitia={onDeleteIdulFitriPanitia}
              detailShalat={detailShalatId}
              onUpdateDetailShalat={onUpdateDetailShalatId}
            />
          )}

          {currentScreen === 'tvmasjid' && (
            <MaslamTvMasjid
              onBack={() => setCurrentScreen('home')}
              runningTexts={tvRunningTexts}
              onAddRunningText={onAddTvRunningText}
              onUpdateRunningText={onUpdateTvRunningText}
              onDeleteRunningText={onDeleteTvRunningText}
              pengumumanList={tvPengumumanList}
              onAddPengumuman={onAddTvPengumuman}
              onUpdatePengumuman={onUpdateTvPengumuman}
              onDeletePengumuman={onDeleteTvPengumuman}
              tvSetting={tvSetting}
              onUpdateTvSetting={onUpdateTvSetting}
            />
          )}

          
          {currentScreen === 'users' && (
            <MaslamUserManagement
              onBack={() => setCurrentScreen('home')}
              usersList={usersList}
              onAddUser={onAddUser}
              onUpdateUser={onUpdateUser}
              onDeleteUser={onDeleteUser}
            />
          )}

          {currentScreen === 'akun' && (
            <MaslamAkun
              loggedInUser={loggedInUser}
              onLogout={onLogout}
              onBack={() => setCurrentScreen('home')}
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
            <UserIcon size={20} strokeWidth={dockActiveTab === 'akun' ? 2.6 : 1.8} />
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
