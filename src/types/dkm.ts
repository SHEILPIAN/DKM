// Type definitions matching the Prisma schema and UI state

export type Role = 'SUPER_ADMIN' | 'KETUA_DKM' | 'BENDAHARA' | 'PIKET';
export type TipeTrx = 'IN' | 'OUT';
export type StatusReservasi = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
export type KategoriAsnaf = 
  | 'FAKIR' 
  | 'MISKIN' 
  | 'AMIL' 
  | 'MUALAF' 
  | 'GHARIM' 
  | 'FISABILILLAH' 
  | 'IBNUSABIL';

export type TipeHewan = 'SAPI' | 'KAMBING' | 'DOMBA';
export type Jabatan = 'IMAM' | 'MUADZIN' | 'MARBOT' | 'GURU_TPA' | 'SATPAM';
export type WaktuSalat = 'SUBUH' | 'DZUHUR' | 'ASHAR' | 'MAGHRIB' | 'ISYA' | 'JUMAT';
export type StatusHadir = 'HADIR' | 'ALPA' | 'IZIN' | 'SAKIT';
export type StatusGaji = 'PENDING' | 'APPROVED' | 'PAID';

export interface User {
  id: number;
  nama: string;
  email: string;
  role: Role;
}

export interface KategoriKas {
  id: number;
  nama: string;
  saldo: number;
  alokasiPersen?: number; // Target persentase anggaran
  color?: string;
}

export interface Transaksi {
  id: number;
  tipe: TipeTrx;
  nominal: number;
  keterangan: string;
  buktiFotoUrl?: string;
  tanggal: string; // ISO string
  userId: number;
  userNama?: string;
  kategoriId: number;
  kategoriNama?: string;
}

export interface Fasilitas {
  id: number;
  nama: string;
  deskripsi?: string;
  kapasitas?: string;
  biayaInfaq?: number;
  fotoUrl?: string;
}

export interface Reservasi {
  id: number;
  namaPemohon: string;
  kontak: string;
  tujuanAcara: string;
  waktuMulai: string; // YYYY-MM-DDTHH:mm
  waktuSelesai: string; // YYYY-MM-DDTHH:mm
  status: StatusReservasi;
  fasilitasId: number;
  fasilitasNama?: string;
  catatanAdmin?: string;
  createdAt: string;
}

export interface Mustahiq {
  id: number;
  nama: string;
  alamat: string;
  kategori: KategoriAsnaf;
  status: boolean; // Aktif / Terverifikasi RT/RW
  jumlahTanggungan: number;
  statusDistribusi?: 'BELUM' | 'SUDAH';
}

export interface ShohibulQurban {
  id: number;
  nama: string;
  atasNama: string;
  kontak?: string;
  bayarLunas: boolean;
  hewanId: number;
  tanggalDaftar: string;
}

export interface HewanQurban {
  id: number;
  kodeHewan: string; // misal "SAPI-01"
  tipeHewan: TipeHewan;
  hargaBeli: number;
  slotMaks: number;
  shohibul: ShohibulQurban[];
}

export interface Pegawai {
  id: number;
  nama: string;
  jabatan: Jabatan;
  gajiPokok: number;
  tunjanganHadir: number; // per kehadiran
  rekening: string;
  noHp: string;
}

export interface Absensi {
  id: number;
  tanggal: string; // YYYY-MM-DD
  waktuSalat: WaktuSalat;
  status: StatusHadir;
  pegawaiId: number;
  pegawaiNama?: string;
}

export interface SlipGaji {
  id: number;
  bulan: string; // misal "September 2026"
  nominal: number;
  gajiPokok: number;
  tunjangan: number;
  potongan: number;
  status: StatusGaji;
  pegawaiId: number;
  pegawaiNama?: string;
  pegawaiJabatan?: Jabatan;
  createdAt: string;
}

export interface ZakatFitrahTrx {
  id: number;
  namaMuzakki: string;
  kontak: string;
  jenisZakat: 'FITRAH_BERAS' | 'FITRAH_UANG' | 'ZAKAT_MAAL' | 'FIDYAH';
  jumlahJiwa: number;
  nominalRp?: number;
  jumlahBerasKg?: number;
  tanggal: string;
  noKupon: string;
}
