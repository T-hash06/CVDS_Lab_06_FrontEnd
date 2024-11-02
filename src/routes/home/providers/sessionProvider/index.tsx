import type { loader } from '@routes/home/loader';
import type { Session } from '@types';
import type React from 'react';

import { createContext, useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import cookies from 'js-cookie';

/**
 * Creates a context for the session hook.
 *
 * This context is used to provide the session state and actions to the component tree.
 * It is initialized with a null value or the return type of the `useSessionHook` hook.
 */
const context = createContext<ReturnType<typeof useSessionHook> | null>(null);

/**
 * Custom hook to manage user session.
 *
 * This hook provides the current session and a logout function.
 * It uses the `useLoaderData` hook to get the session promise and sets the session state once the promise resolves.
 * The `logout` function removes the session cookie, navigates to the login page, and clears the session state.
 */
function useSessionHook() {
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

/**
 * Custom hook to access the session context.
 *
 * This hook provides access to the session context and ensures that it is used within a `SessionProvider`.
 * If the session context is not available, it throws an error.
 *
 * @returns The session context value.
 * @throws {Error} If the hook is used outside of a `SessionProvider`.
 */
export function useSession() {
	const session = useContext(context);

	if (!session) {
		throw new Error('useSession must be used within a SessionProvider');
	}

	return session;
}

/**
 * SessionProvider component that uses a custom hook to manage session state
 * and provides it to the rest of the application via context.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components that will have access to the session context.
 * @returns The context provider component wrapping the children with session state.
 */
export function SessionProvider({ children }: { children: React.ReactNode }) {
	const session = useSessionHook();

	return <context.Provider value={session}>{children}</context.Provider>;
}
