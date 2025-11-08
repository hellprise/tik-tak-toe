import { startTransition, useState } from 'react';

import { GameId } from '@/kernel/ids';
import { routes } from '@/kernel/routes';

import { GameDomain } from '@/entities/game';

import { useEventsSource } from '@/shared/lib/sse/client';

import { gameStepAction } from '../actions/game-step';

export function useGame(gameId: GameId, player: GameDomain.PlayerEntity) {
	const [optimisticGame, dispatchOptimistic] = useState<GameDomain.GameEntity>();

	const { isPending, dataStream: game } = useEventsSource<GameDomain.GameEntity>(
		routes.gameStream(gameId),
		() => {
			dispatchOptimistic(undefined);
		}
	);

	const step = (index: number) => {
		if (game && game.status === 'IN_PROGRESS') {
			const result = GameDomain.doStep({ game, player, index });
			if (result.type === 'right') {
				dispatchOptimistic(result.value);
			}
		}
		startTransition(async () => {
			await gameStepAction({ gameId, index });
		});
	};

	return {
		game: optimisticGame ?? game,
		step,
		isPending: isPending,
	};
}
