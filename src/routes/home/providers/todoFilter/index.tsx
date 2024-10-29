import type React from 'react';

import { createContext, useContext, useState } from 'react';

const homeContext = createContext<ReturnType<typeof todoFilter> | null>(null);

function todoFilter() {
	const [filter, setFilter] = useState('');

	return { filter, setFilter };
}

export function useTodoFilter() {
	const context = useContext(homeContext);

	if (!context) {
		throw new Error(
			'useTodoFilter must be used within a TodoFilterProvider',
		);
	}

	return context;
}

export function TodoFilterProvider({
	children,
}: { children: React.ReactNode }) {
	const value = todoFilter();

	return (
		<homeContext.Provider value={value}>{children}</homeContext.Provider>
	);
}
