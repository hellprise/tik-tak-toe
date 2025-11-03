import { z } from 'zod';

import { prisma } from '@/shared/lib/db';

import type { Game, GamePlayer, Prisma, User } from '@/generated/prisma';

import type {
	GameEntity,
	GameIdleEntity,
	GameInProgressEntity,
	GameOverDrawEntity,
	GameOverEntity,
	PlayerEntity,
} from '../domain';

const gameInclude = {
	winner: { include: { user: true } },
	players: { include: { user: true } },
};

export const dbPlayerToPlayer = (db: GamePlayer & { user: User }): PlayerEntity => {
	return {
		id: db.user.id,
		login: db.user.login,
		rating: db.user.rating,
	};
};

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
	game: Game & {
		players: Array<GamePlayer & { user: User }>;
		winner?: (GamePlayer & { user: User }) | null;
	}
): GameEntity {
	const players = game.players.sort((a, b) => a.index - b.index).map(dbPlayerToPlayer);

	switch (game.status) {
		case 'IDLE': {
			const [creator] = players;

			if (!creator) {
				throw new Error('creator shoud be in game idle');
			}

			return {
				id: game.id,
				creator: creator,
				status: game.status,
				field: fieldSchema.parse(game.field),
			} satisfies GameIdleEntity;
		}
		case 'IN_PROGRESS':
		case 'GAME_OVER_DRAW':
			return {
				id: game.id,
				players: players,
				status: game.status,
				field: fieldSchema.parse(game.field),
			};
		case 'GAME_OVER':
			if (!game.winner) {
				throw new Error('Game winner is required for game over status');
			}

			return {
				id: game.id,
				players: players,
				status: game.status,
				field: fieldSchema.parse(game.field),
				winner: dbPlayerToPlayer(game.winner),
			} satisfies GameOverEntity;
	}
}

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
	const games = await prisma.game.findMany({
		include: gameInclude,
		where,
	});

	return games.map(dbGameToGameEntity);
}

async function saveGame(game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity) {
	const winnerId =
		game.status === 'GAME_OVER'
			? await prisma.gamePlayer
					.findFirstOrThrow({
						where: { userId: game.winner.id },
					})
					.then((p) => p.id)
			: undefined;

	return dbGameToGameEntity(
		await prisma.game.update({
			where: { id: game.id },
			data: {
				status: game.status,
				field: game.field,
				winnerId: winnerId,
			},
			include: gameInclude,
		})
	);
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
	const createdGame = await prisma.game.create({
		data: {
			status: game.status,
			id: game.id,
			field: game.field,
			players: {
				create: {
					index: 0,
					userId: game.creator.id,
				},
			},
		},
		include: gameInclude,
	});

	return dbGameToGameEntity(createdGame);
}

export const gameRepository = {
	gamesList,
	saveGame,
	createGame,
};
