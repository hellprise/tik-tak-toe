'use client';

import { GameDomain } from '@/entities/game';

import { useGame } from '../model/use-game';
import { GameField } from '../ui/field';
import { GameLayout } from '../ui/layout';
import { GamePlayers } from '../ui/players';
import { GameStatus } from '../ui/status';

export function GameClient({
	defaultGame,
	player,
}: {
	defaultGame: GameDomain.GameEntity;
	player: GameDomain.PlayerEntity;
}) {
	const { game = defaultGame, step } = useGame(defaultGame.id, player);

	return (
		<GameLayout
			players={<GamePlayers game={game} currentUser={player} />}
			status={<GameStatus game={game} />}
			field={<GameField game={game} onCellClick={step} />}
		/>
	);
}
