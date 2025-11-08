'use server';

import { GameId } from '@/kernel/ids';

import { stepGame } from '@/entities/game/server';
import { getCurrentUser } from '@/entities/user/server';

import { left } from '@/shared/lib/either';

export const gameStepAction = async ({ gameId, index }: { gameId: GameId; index: number }) => {
	const currentUser = await getCurrentUser();

	if (!currentUser) return left('USER_NOT_FOUND');

	return await stepGame(gameId, currentUser, index);
};
