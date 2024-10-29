import type React from 'react';

import { createContext, useContext, useState } from 'react';

const contentTypeContext = createContext<ReturnType<typeof contentType> | null>(
	null,
);

function contentType() {
	const [content, setContent] = useState<'tasks' | 'analytics'>('tasks');

	const toggleContent = () => {
		setContent((prevContent) =>
			prevContent === 'tasks' ? 'analytics' : 'tasks',
		);
	};

	return {
		content,
		setContent,
		toggleContent,
	};
}

export function useContentType() {
	const context = useContext(contentTypeContext);

	if (!context) {
		throw new Error(
			'useContentType must be used within a ContentTypeProvider',
		);
	}

	return context;
}

export function ContentTypeProvider(props: { children: React.ReactNode }) {
	const value = contentType();

	return (
		<contentTypeContext.Provider value={value}>
			{props.children}
		</contentTypeContext.Provider>
	);
}
