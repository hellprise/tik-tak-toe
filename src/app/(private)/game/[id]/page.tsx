import { Game } from '@/features/game/server';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	return (
		<main className="mx-auto flex w-full max-w-[600px] grow flex-col pt-24">
			<Game gameId={id} />
		</main>
	);
}
