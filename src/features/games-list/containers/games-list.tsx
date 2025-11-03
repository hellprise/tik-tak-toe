import { getIdleGames } from '@/entities/game/server';

import { CreateButton } from './create-button';
import { GameCard } from '../ui/game-card';
import { Layout } from '../ui/layout';

export async function GamesList() {
	const games = await getIdleGames();
	return (
		<Layout actions={<CreateButton />}>
			{games.map((game) => (
				<GameCard
					key={game.id}
					login={game.creator.login}
					rating={game.creator.rating}
					actions={<div>Actions</div>}
				/>
			))}
		</Layout>
	);
}
