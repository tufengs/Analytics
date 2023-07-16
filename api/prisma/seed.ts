import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt'
const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.application.deleteMany();
  await prisma.user.deleteMany();
  // Add additional delete statements for other relevant tables if needed

  console.log('Database cleared');
}

async function main() {
  
  const webmaster = await prisma.user.create({
    data: {
      email: 'webmaster@example.com',
      password: await hash('webmaster123', 10),
      role: Role.WEBMASTER,
      company: 'Example Company',
      baseUrl: 'https://example.com',
      validated: false,
      phoneNumber: '9876543210',
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: await hash('admin123', 10),
      role: Role.ADMIN,
      company: 'Example Company',
      baseUrl: 'https://example.com',
      validated: true,
      phoneNumber: '1234567890',
    },
  });

  console.log('Webmaster created:', webmaster);
  console.log('Admin created:', admin);
}

clearDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
