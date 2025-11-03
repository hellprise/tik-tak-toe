'use client';

import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="bg-background flex min-h-screen items-center justify-center">{children}</div>
	);
}
