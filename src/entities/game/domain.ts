import { GameId, UserId } from '@/kernel/ids';

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
