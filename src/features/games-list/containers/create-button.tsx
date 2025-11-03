'use client';

import { startTransition } from 'react';

import { isLeft, mapLeft, right } from '@/shared/lib/either';
import { useActionState } from '@/shared/lib/react';
import { Button } from '@/shared/ui/button';

import { createGameAction } from '../actions/create-game';

export function CreateButton() {
	const [state, dispatch, isPending] = useActionState(createGameAction, right(undefined));

	return (
		<Button
			disabled={isPending}
			variant={isLeft(state) ? 'destructive' : 'default'}
			onClick={() => startTransition(dispatch)}
			error={mapLeft(
				state,
				(e) =>
					({
						['CAN_CREATE_ONLY_ONE_GAME']: 'You can create only one game',
						['USER_NOT_FOUND']: 'User not found',
					})[e]
			)}
		>
			Create game
		</Button>
	);
}
