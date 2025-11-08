'use client';

import { GameDomain } from '@/entities/game';

export function GameField({
	game,
	onCellClick,
}: {
	game: GameDomain.GameEntity;
	onCellClick?: (index: number) => void;
}) {
	return (
		<div className="grid grid-cols-3">
			{game.field.map((symbol, index) => (
				<button
					onClick={() => onCellClick?.(index)}
					key={index}
					className="border-primary flex h-10 w-10 items-center justify-center border"
				>
					{symbol ?? ''}
				</button>
			))}
		</div>
	);
}
