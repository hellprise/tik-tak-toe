// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

async function main() {
	await prisma.user.create({
		data: {
			login: 'test1',
			rating: 100,
			passwordHash: 'test1',
			salt: 'test1',
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
