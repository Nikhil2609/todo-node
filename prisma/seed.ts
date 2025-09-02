// import { PrismaClient } from '@prisma/client';
// import { hashPassword } from '../src/utils/commonFunction';
// const prisma = new PrismaClient();

// async function main() {
//   const roles = [
//     { id: 1, name: 'admin' },
//     { id: 2, name: 'customer' },
//     { id: 3, name: 'vendor' }
//   ];

//   for (const { id, name } of roles) {
//     await prisma.role.upsert({
//       where: { id },
//       update: {},
//       create: { id, role: name }
//     });
//   }
//   await prisma.user.upsert({
//     where: { email: 'admin@example.com' },
//     update: {},
//     create: {
//       name: 'Super Admin',
//       email: 'admin@twiggy.com',
//       password: await hashPassword('Twiggy@123'), //  TODO:: Need to update raw password to hashed once hash function is written.
//       roleId: 1,
//       is_active: true
//     }
//   });
// }

// main()
//   .catch((error) => {
//     console.log(error);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
