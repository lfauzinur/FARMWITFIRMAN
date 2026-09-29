const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const models = [
    'user', 'product', 'category', 'order', 'orderItem', 
    'consultationService', 'booking', 'videoTestimonial', 
    'article', 'portfolio', 'companyProfile', 'teamMember'
  ];
  
  const backup = {};
  
  for (const model of models) {
    if (prisma[model]) {
      backup[model] = await prisma[model].findMany();
    }
  }
  
  fs.writeFileSync('db-backup.json', JSON.stringify(backup, null, 2));
  console.log('Database successfully backed up to db-backup.json');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
