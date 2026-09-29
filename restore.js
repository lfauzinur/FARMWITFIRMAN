const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  console.log('Reading backup data...');
  const backup = JSON.parse(fs.readFileSync('db-backup.json', 'utf8'));
  
  console.log('Restoring data to new database...');

  // Using a loop to avoid foreign key / relation issues if possible, though we might need to be careful with ordering.
  // Order of restoration based on dependencies:
  const restoreOrder = [
    'user',
    'category',
    'product',
    'order',
    'orderItem',
    'consultationService',
    'booking',
    'videoTestimonial',
    'article',
    'portfolio',
    'companyProfile',
    'teamMember'
  ];

  for (const model of restoreOrder) {
    if (backup[model] && backup[model].length > 0) {
      console.log(`Restoring ${backup[model].length} records for ${model}...`);
      try {
        await prisma[model].createMany({
          data: backup[model],
          skipDuplicates: true
        });
        console.log(`✅ ${model} restored`);
      } catch (e) {
        console.error(`❌ Error restoring ${model}:`, e.message);
      }
    }
  }

  console.log('Database restoration completed!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
