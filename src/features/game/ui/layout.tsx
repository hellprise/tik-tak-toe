import React, { ReactNode } from 'react';

import Link from 'next/link';

import { routes } from '@/kernel/routes';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function GameLayout({
	status,

	field,
	players,
}: {
	players?: ReactNode;
	status?: ReactNode;
	field?: ReactNode;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Link href={routes.home}>Tic-Tac-Toe 3x3</Link>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				{players}
				{status}
				<div className="flex items-center justify-center">{field}</div>
			</CardContent>
		</Card>
	);
}
