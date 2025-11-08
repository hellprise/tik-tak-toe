import { GameId } from '@/kernel/ids';

import { left, right } from '@/shared/lib/either';

import { PlayerEntity } from '../domain';
import { gameEvents } from './game-events';
import { gameRepository } from '../repositories/game';

export async function surrenderGame(gameId: GameId, player: PlayerEntity) {
	const game = await gameRepository.getGame({ id: gameId });

	if (!game) {
		return left('GAME_NOT_FOUND' as const);
	}
	if (game.status !== 'IN_PROGRESS') {
		return left('GAME_IS_NOT_IN_PROGRESS' as const);
	}
	if (!game.players.some((p) => p.id === player.id)) {
		return left('PLAYER_IS_NOT_IN_GAME' as const);
	}

	const newGame = await gameRepository.saveGame({
		...game,
		status: 'GAME_OVER',
		winner: game.players.find((p) => p.id !== player.id)!,
	});

	await gameEvents.emit({
		type: 'game-changed',
		data: newGame,
	});

	return right(newGame);
}
