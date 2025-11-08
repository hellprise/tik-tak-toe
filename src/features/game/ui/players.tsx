import { GameDomain } from '@/entities/game';

import { cn } from '@/shared/lib/css';

export function GamePlayers({
	game,
	currentUser,
}: {
	game: GameDomain.GameEntity;
	currentUser: GameDomain.PlayerEntity;
}) {
	const firstPlayer = game.status === 'IDLE' ? game.creator : game.players[0];
	const secondPlayer = game.status === 'IDLE' ? undefined : game.players[1];

	return (
		<div className="flex flex-row justify-between gap-4">
			<div className="text-lg font-bold">
				X -{' '}
				<span className={cn('font-normal', firstPlayer.id === currentUser.id && 'text-green-500')}>
					{firstPlayer.login}:{firstPlayer.rating}
				</span>
			</div>
			<div className="text-lg font-bold">
				O -{' '}
				<span
					className={cn('font-normal', secondPlayer?.id === currentUser.id && 'text-green-500')}
				>
					{secondPlayer?.login ?? '...'}:{secondPlayer?.rating ?? '...'}
				</span>
			</div>
		</div>
	);
}
