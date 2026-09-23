// Type definitions matching the Prisma schema and UI state

export type Role = 'SUPER_ADMIN' | 'KETUA_DKM' | 'BENDAHARA' | 'PIKET' | 'JAMAAH';
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
  password?: string;
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

export interface Warga {
  id: number;
  nama: string;
  nik?: string;
  noHp: string;
  alamat: string;
  rt: string;
  rw: string;
  gender: 'IKHWAN' | 'AKHWAT';
  kategoriUmur: 'ANAK' | 'REMAJA' | 'DEWASA' | 'LANSIA';
  umur: number;
  isMustahik: boolean;
  statusKeluarga: 'KEPALA_KELUARGA' | 'ISTRI' | 'ANAK' | 'LAINNYA';
  pekerjaan?: string;
  tanggalDaftar: string;
}

export interface ProfilLembaga {
  nama: string;
  yayasan: string;
  periode: string;
  alamat: string;
  telepon: string;
  email: string;
  deskripsi?: string;
  logoUrl?: string;
}

export interface PengurusLembaga {
  id: number;
  role: string;
  nama: string;
  noHp?: string;
  icon?: string;
}

export interface RekeningLembaga {
  id: number;
  bank: string;
  noRekening: string;
  atasNama: string;
}

export interface Kegiatan {
  id: number;
  judul: string;
  narasumber: string;
  waktu: string;
  lokasi: string;
  kategori: string;
  deskripsi?: string;
  kontakPIC?: string;
}

export interface InventoryItem {
  id: number;
  nama: string;
  jumlah: string;
  kondisi: 'BAIK' | 'PERLU PERBAIKAN' | 'RUSAK';
  lokasi: string;
  kategori?: string;
  keterangan?: string;
}

export interface IdulFitriAgenda {
  id: number;
  namaAcara: string;
  tanggalWaktu: string;
  lokasi: string;
  imamKhatib?: string;
  deskripsi?: string;
}

export interface IdulFitriPanitia {
  id: number;
  nama: string;
  jabatan: string;
  kontak: string;
}

export interface TvRunningText {
  id: number;
  pesan: string;
  aktif: boolean;
  urutan: number;
}

export interface TvPengumuman {
  id: number;
  judul: string;
  isi: string;
  tampilkan: boolean;
  tanggalMulai?: string;
}

export interface TvSetting {
  namaMasjid: string;
  lokasi: string;
  jedaIqomahMenit: number;
}
