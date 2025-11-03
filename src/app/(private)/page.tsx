import { GamesList } from '@/features/games-list/server';

import { prisma } from '@/shared/lib/db';

export default async function Home() {
	const games = await prisma.game.findMany();

	console.log({ games });
	return (
		<div className="container mx-auto flex flex-col gap-8 pt-24">
			<h1 className="text-4xl font-bold">Игры</h1>
			<GamesList />
		</div>
	);
}
