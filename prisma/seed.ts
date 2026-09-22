import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding DKM Management System Database...');

  // 1. Users
  const userKetua = await prisma.user.upsert({
    where: { email: 'ketua@almuhajirin.org' },
    update: {},
    create: {
      nama: 'H. Ahmad Dahlan',
      email: 'ketua@almuhajirin.org',
      password: '$2a$12$eXampleHashedPasswordKetuaDKM',
      role: 'KETUA_DKM',
    },
  });

  const userBendahara = await prisma.user.upsert({
    where: { email: 'bendahara@almuhajirin.org' },
    update: {},
    create: {
      nama: 'Ustadz Ridwan, S.E',
      email: 'bendahara@almuhajirin.org',
      password: '$2a$12$eXampleHashedPasswordBendahara',
      role: 'BENDAHARA',
    },
  });

  const userPiket = await prisma.user.upsert({
    where: { email: 'piket@almuhajirin.org' },
    update: {},
    create: {
      nama: 'Fian Tampan',
      email: 'piket@almuhajirin.org',
      password: '$2a$12$eXampleHashedPasswordPiket',
      role: 'PIKET',
    },
  });

  // 2. Kategori Kas
  const katOperasional = await prisma.kategoriKas.upsert({
    where: { nama: 'Kas Operasional & Kebersihan' },
    update: {},
    create: {
      nama: 'Kas Operasional & Kebersihan',
      saldo: 48500000,
    },
  });

  const katDakwah = await prisma.kategoriKas.upsert({
    where: { nama: 'Kas Dakwah & Pengajian' },
    update: {},
    create: {
      nama: 'Kas Dakwah & Pengajian',
      saldo: 24750000,
    },
  });

  const katPembangunan = await prisma.kategoriKas.upsert({
    where: { nama: 'Kas Pembangunan & Infrastruktur' },
    update: {},
    create: {
      nama: 'Kas Pembangunan & Infrastruktur',
      saldo: 82300000,
    },
  });

  const katSosial = await prisma.kategoriKas.upsert({
    where: { nama: 'Kas Sosial & Santunan Yatim' },
    update: {},
    create: {
      nama: 'Kas Sosial & Santunan Yatim',
      saldo: 31200000,
    },
  });

  // 3. Fasilitas
  const aula = await prisma.fasilitas.create({
    data: {
      nama: 'Aula Utama Serbaguna (Lantai 2)',
      deskripsi: 'Kapasitas 300 jamaah, full AC, sound system, panggung & kursi futura.',
    },
  });

  const ruangRapat = await prisma.fasilitas.create({
    data: {
      nama: 'Ruang Rapat & Majelis Taklim (Lantai 1)',
      deskripsi: 'Kapasitas 60 jamaah, AC, meja rapat, smart TV, proyektor.',
    },
  });

  // 4. Pegawai
  await prisma.pegawai.createMany({
    data: [
      {
        nama: 'Ustadz M. Syakir, Lc.',
        jabatan: 'IMAM',
        gajiPokok: 3500000,
        rekening: 'BSI 7149021882',
      },
      {
        nama: 'Kang Bilal Ar-Rafi',
        jabatan: 'MUADZIN',
        gajiPokok: 2400000,
        rekening: 'BSI 7188992211',
      },
      {
        nama: 'Pak Sukiman',
        jabatan: 'MARBOT',
        gajiPokok: 2200000,
        rekening: 'BRI 012301048821501',
      },
      {
        nama: 'Ustadzah Halimah, S.Pd.I',
        jabatan: 'GURU_TPA',
        gajiPokok: 1800000,
        rekening: 'Bank Mandiri 1330018899221',
      },
    ],
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
