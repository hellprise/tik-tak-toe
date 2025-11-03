import React, { useId } from 'react';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export function AuthFields({
	errors,
	formData,
}: {
	formData?: FormData;
	errors?: {
		login?: string;
		password?: string;
	};
}) {
	const loginId = useId();
	const passwordId = useId();
	return (
		<>
			<div className="flex flex-col gap-2">
				<Label htmlFor={loginId}>Login</Label>
				<Input
					id={loginId}
					type="login"
					name="login"
					placeholder="Enter your login"
					required
					defaultValue={formData?.get('login')?.toString()}
				/>
				{errors?.login && <p className="text-destructive text-sm">{errors.login}</p>}
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor={passwordId}>Password</Label>
				<Input
					id={passwordId}
					type="password"
					name="password"
					placeholder="Enter your password"
					required
					defaultValue={formData?.get('password')?.toString()}
				/>
				{errors?.password && <p className="text-destructive text-sm">{errors.password}</p>}
			</div>
		</>
	);
}
