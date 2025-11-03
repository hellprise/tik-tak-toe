import cuid from 'cuid';

import { left, right } from '@/shared/lib/either';

import { gameRepository } from '../repositories/game';

import type { PlayerEntity } from '../domain';

export async function createGame(player: PlayerEntity) {
	const playerGames = await gameRepository.gamesList({
		players: { some: { id: player.id } },
		status: 'IDLE',
	});

	const isGameInIdleStatus = playerGames.some(
		(game) => game.status === 'IDLE' && game.creator.id === player.id
	);

	// it means that player can't create more than one game in idle status (active game)
	if (isGameInIdleStatus) {
		return left('CAN_CREATE_ONLY_ONE_GAME' as const);
	}

	const createdGame = await gameRepository.createGame({
		id: cuid(),
		creator: player,
		status: 'IDLE',
		field: Array(9).fill(null),
	});

	return right(createdGame);
}
