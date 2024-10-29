import type { loader } from '@routes/home/loader';
import type { Session } from '@types';
import type React from 'react';

import { createContext, useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import cookies from 'js-cookie';

const context = createContext<ReturnType<typeof userSession> | null>(null);

function userSession() {
	const [session, setSession] = useState<Session | null>(null);
	const navigate = useNavigate();

	const { sessionPromise } = useLoaderData() as ReturnType<typeof loader>;

	useEffect(() => {
		sessionPromise.then(setSession);
	}, [sessionPromise]);

	const logout = () => {
		cookies.remove('__scss');
		navigate('/login');
		setSession(null);
	};

	return { session, logout };
}

export function useSession() {
	const session = useContext(context);

	if (!session) {
		throw new Error('useSession must be used within a SessionProvider');
	}

	return session;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
	const session = userSession();

	return <context.Provider value={session}>{children}</context.Provider>;
}
