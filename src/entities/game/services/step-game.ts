import { GameId } from '@/kernel/ids';

import { left, right } from '@/shared/lib/either';

import { GameDomain } from '..';
import { gameEvents } from './game-events';
import { gameRepository } from '../repositories/game';

export async function stepGame(gameId: GameId, player: GameDomain.PlayerEntity, index: number) {
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

	const stepResult = GameDomain.doStep({ game, index, player });

	if (stepResult.type === 'left') {
		return stepResult;
	}

	const newGame = await gameRepository.saveGame(stepResult.value);

	await gameEvents.emit({
		type: 'game-changed',
		data: newGame,
	});

	return right(newGame);
}
