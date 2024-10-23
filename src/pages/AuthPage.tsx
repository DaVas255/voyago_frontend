import { MainLayout } from '@/components/layouts/MainLayout/MainLayout';
import { AuthForm } from '@/components/features/AuthForm/AuthForm';
import { useState } from 'react';

export const AuthPage = () => {
	const [isLoginForm, setIsLoginForm] = useState(true);
	return (
		<MainLayout>
			<AuthForm isLogin={isLoginForm} setIsLoginForm={setIsLoginForm} />
		</MainLayout>
	);
};
