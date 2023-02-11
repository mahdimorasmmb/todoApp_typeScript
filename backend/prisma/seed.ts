// import { PrismaClient, Prisma } from "@prisma/client";

// const prisma = new PrismaClient();

// const userData : Prisma.TodoCreateInput[] = [
//   {
   
//     isDone: false,
//     task: "task 1 ",
//     handNotes: "hand1",
//     description: "desTaske",
//   },
//   {
   
//     isDone: false,
//     task: "task 2 ",
//     handNotes: "hand1",
//     description: "desTaske",
//   },
//   {
//     isDone: false,
//     task: "task 3",
//     handNotes: "hand1",
//     description: "desTaske",
//   },
// ];

// async function main() {
//   console.log(`Start seeding ...`);
//   for (const u of userData) {
//     const user = await prisma.todo.create({
//       data: u
//     });
//     console.log(`Created user with id: ${user.id}`);
//   }
//   console.log(`Seeding finished.`);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
