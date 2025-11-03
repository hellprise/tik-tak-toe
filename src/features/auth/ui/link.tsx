import React from 'react';

import Link from 'next/link';

export function BottomLink({
	linkText,
	text,
	url,
}: {
	text: string;
	linkText: string;
	url: string;
}) {
	return (
		<p className="text-primary/50 text-sm">
			{text}{' '}
			<Link href={url} className="text-primary font-medium hover:underline">
				{linkText}
			</Link>
		</p>
	);
}
