'use client';

import Link from 'next/link';

import { routes } from '@/kernel/routes';

import { GameDomain } from '@/entities/game';

import { Button } from '@/shared/ui/button';

import { CreateButton } from './create-button';
import { GameCard } from '../ui/game-card';
import { Layout } from '../ui/layout';

export function GamesListClient({ games }: { games: GameDomain.GameIdleEntity[] }) {
	return (
		<Layout actions={<CreateButton />}>
			{games.map((game) => (
				<GameCard
					key={game.id}
					login={game.creator.login}
					rating={game.creator.rating}
					actions={
						<Button asChild>
							<Link href={routes.game(game.id)}>Join</Link>
						</Button>
					}
				/>
			))}
		</Layout>
	);
}
