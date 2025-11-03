'use server';

import { redirect } from 'next/navigation';

import { routes } from '@/kernel/routes';

import { createGame } from '@/entities/game/server';
import { getCurrentUser } from '@/entities/user/server';

import { left } from '@/shared/lib/either';

export const createGameAction = async () => {
	const user = await getCurrentUser();

	if (!user) {
		return left('USER_NOT_FOUND' as const);
	}

	const gameResult = await createGame(user);

	if (gameResult.type === 'right') {
		redirect(routes.game(gameResult.value.id));
	}

	return gameResult;
};
