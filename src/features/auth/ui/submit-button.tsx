import type { ReactNode } from 'react';

import { Button } from '@/shared/ui/button';

export function SubmitButton({
	children,
	isPending,
}: {
	children: ReactNode;
	isPending?: boolean;
}) {
	return (
		<Button disabled={isPending} loading={isPending} type="submit" className="w-full">
			{children}
		</Button>
	);
}
