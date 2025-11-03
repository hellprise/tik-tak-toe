import { gameRepository } from '../repositories/game';

import type { GameIdleEntity } from '../domain';

export const getIdleGames = async (): Promise<GameIdleEntity[]> => {
	const games = await gameRepository.gamesList({ status: 'IDLE' });
	return games as GameIdleEntity[];
};
