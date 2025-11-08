import { GameId, UserId } from '@/kernel/ids';

import { left, right } from '@/shared/lib/either';

export type GameEntity =
	| GameIdleEntity
	| GameInProgressEntity
	| GameOverEntity
	| GameOverDrawEntity;

export type GameIdleEntity = {
	status: 'IDLE';
	id: GameId;
	field: Field;
	creator: PlayerEntity;
};

export type GameInProgressEntity = {
	status: 'IN_PROGRESS';
	id: GameId;
	// players: [Player, Player]; if we want to have only two players in game by default
	players: PlayerEntity[];
	field: Field;
};

export type GameOverEntity = {
	status: 'GAME_OVER';
	id: GameId;
	players: PlayerEntity[];
	field: Field;
	winner: PlayerEntity;
};

export type GameOverDrawEntity = {
	status: 'GAME_OVER_DRAW';
	id: GameId;
	players: PlayerEntity[];
	field: Field;
};

export type PlayerEntity = {
	id: UserId;
	login: string;
	rating: number;
};

export type Field = (GameSymbol | null)[];
export type GameSymbol = string;

export const GAME_SYMBOL = {
	X: 'X',
	O: 'O',
};

export const getGameCurrentSymbol = (
	game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity
) => {
	const symbols = game.field.filter((s) => s !== null).length;

	return symbols % 2 === 0 ? GAME_SYMBOL.X : GAME_SYMBOL.O;
};

export const getNextSymbol = (sameSymbol: GameSymbol) => {
	return { [GAME_SYMBOL.X]: GAME_SYMBOL.O, [GAME_SYMBOL.O]: GAME_SYMBOL.X }[sameSymbol];
	// return sameSymbol === GAME_SYMBOL.X ? GAME_SYMBOL.O : GAME_SYMBOL.X;
};

export const getPlayerSymbol = (
	player: PlayerEntity,
	game: GameInProgressEntity | GameOverEntity
) => {
	const index = game.players.findIndex((p) => p.id === player.id);

	return { 0: GAME_SYMBOL.X, 1: GAME_SYMBOL.O }[index];
	// return game.players.findIndex((p) => p.id === player.id) === 0 ? GAME_SYMBOL.X : GAME_SYMBOL.O;
};

export const doStep = ({
	game,
	index,
	player,
}: {
	game: GameInProgressEntity;
	index: number;
	player: PlayerEntity;
}) => {
	const currentSymbol = getGameCurrentSymbol(game);

	if (currentSymbol !== getPlayerSymbol(player, game)) {
		return left('NOT_PLAYER_SYMBOL' as const);
	}

	if (game.field[index]) {
		return left('GAME_CELL_ALLREADY_HAS_SYMBOL' as const);
	}

	const newField = game.field.map((cell, i) => (i === index ? currentSymbol : cell));

	if (calculateWinner(newField)) {
		return right({
			...game,
			field: newField,
			winner: player,
			status: 'GAME_OVER',
		} satisfies GameOverEntity);
	}

	if (isDraw(newField)) {
		return right({
			...game,
			field: newField,
			status: 'GAME_OVER_DRAW',
		} satisfies GameOverDrawEntity);
	}

	return right({
		...game,
		field: newField,
	} satisfies GameInProgressEntity);
};

function isDraw(squares: Field) {
	const winner = calculateWinner(squares);

	if (!winner) {
		return squares.every((s) => s !== null);
	}

	return false;
}

const lines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function calculateWinner(squares: Field) {
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];

		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}

	return null;
}
