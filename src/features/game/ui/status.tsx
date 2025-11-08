import { GameDomain } from '@/entities/game';

export function GameStatus({ game }: { game: GameDomain.GameEntity }) {
	switch (game.status) {
		case 'IDLE':
			return <div className="text-lg">Waiting for player</div>;
		case 'IN_PROGRESS': {
			const currentSymbol = GameDomain.getGameCurrentSymbol(game);
			return <div className="text-lg">Turn: {currentSymbol}</div>;
		}
		case 'GAME_OVER': {
			const currentSymbol = GameDomain.getPlayerSymbol(game.winner, game);
			return <div className="text-lg">Winner: {currentSymbol}</div>;
		}
		case 'GAME_OVER_DRAW':
			return <div className="text-lg">Draw</div>;
	}
}
