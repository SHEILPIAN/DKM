import { PrismaClient } from '@prisma/client';

const localPrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:postgres@localhost:5432/dkm_db?schema=public'
    }
  }
});

const remotePrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:lewAvopDfyubrsjBKpHoAXSKmkpGdnUN@centerbeam.proxy.rlwy.net:26705/railway'
    }
  }
});

async function main() {
  console.log('Connecting to databases...');
  
  // This approach is naive and doesn't account for foreign key constraints 
  // during insertion, which might require a specific order of insertion.
  // We can try fetching all data from local DB first.
  
  const models = [
    'user',
    'kategoriKas',
    'transaksi',
    'fasilitas',
    'reservasi',
    'mustahiq',
    'hewanQurban',
    'shohibulQurban',
    'pegawai',
    'absensi',
    'slipGaji',
    'warga',
    'profilLembaga',
    'pengurusLembaga',
    'rekeningLembaga',
    'kegiatan',
    'inventoryItem',
    'idulFitriAgenda',
    'idulFitriPanitia',
    'tvRunningText',
    'tvPengumuman',
    'tvSetting'
  ];

  for (const model of models) {
    try {
      console.log(`Migrating model: ${model}`);
      // @ts-ignore
      const data = await localPrisma[model].findMany();
      console.log(`Found ${data.length} records in ${model}`);
      
      if (data.length > 0) {
        // @ts-ignore
        // Truncate the table in remote DB first or handle conflicts?
        // Actually, if we just seeded it, it might conflict. 
        // We might want to clear remote data first, or skip if already seeded?
        // We'll see how many records there are.
      }
    } catch (e) {
      console.error(`Failed to process ${model}:`, e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
