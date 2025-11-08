import type { ReactNode } from 'react';

import Link from 'next/link';
import { redirect } from 'next/navigation';

import { routes } from '@/kernel/routes';

import { sessionService } from '@/entities/user/server';

import { Button } from '@/shared/ui/button';

export default async function PrivateLayout({ children }: { children: ReactNode }) {
	const { session } = await sessionService.verifySession();

	return (
		<div className="flex grow flex-col">
			<header className="border-b-primary/50 flex flex-row items-center justify-between gap-4 border-b px-10 py-4">
				<Link href={routes.home} className="text-xl font-bold">
					Tik-Tak-Toe Online
				</Link>
				<div className="flex items-center gap-4">
					<div className="max-w-40 truncate text-base">{session.login}</div>
					<form
						action={async () => {
							'use server';
							sessionService.deleteSession();
							redirect(routes.signIn);
						}}
					>
						<Button>Sign out</Button>
					</form>
				</div>
			</header>
			{children}
		</div>
	);
}
