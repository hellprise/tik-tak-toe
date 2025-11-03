import type { ReactNode } from 'react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';

export function GameCard({
	login,
	rating,
	actions,
}: {
	login: string;
	rating: number;
	actions: ReactNode;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Game with {login}</CardTitle>
			</CardHeader>
			<CardContent>Rating: {rating}</CardContent>
			<CardFooter>{actions}</CardFooter>
		</Card>
	);
}
