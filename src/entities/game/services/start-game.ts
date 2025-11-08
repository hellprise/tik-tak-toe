import { GameId } from '@/kernel/ids';

import { left, right } from '@/shared/lib/either';

import { PlayerEntity } from '../domain';
import { gameEvents } from './game-events';
import { gameRepository } from '../repositories/game';

export async function startGame(gameId: GameId, player: PlayerEntity) {
	const game = await gameRepository.getGame({ id: gameId });

	if (!game) return left('GAME_NOT_FOUND' as const);
	if (game.status !== 'IDLE') return left('GAME_STATUS_NOT_IDLE' as const);
	if (game.creator.id === player.id) return left('CREATOR_CAN_NOT_START_GAME' as const);

	const newGame = await gameRepository.startGame(gameId, player);

	await gameEvents.emit({
		type: 'game-changed',
		data: newGame,
	});

	return right(newGame);
}
