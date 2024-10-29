import type { Todo } from '@components';

import {
	BarElement,
	CategoryScale,
	Chart,
	LineElement,
	LinearScale,
	PointElement,
} from 'chart.js';
import { differenceInHours, parseISO } from 'date-fns';
import { Bar, Line } from 'react-chartjs-2';

interface ChartProps {
	todos: Todo[];
}

Chart.register(BarElement, CategoryScale, LinearScale);
Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

function ChartTitle({ children }: { children: string }) {
	return <h2 className='text-lg text-blue-600 font-semibold'>{children}</h2>;
}

export const DifficultyHistogram = ({ todos }: ChartProps) => {
	const initialData = { low: 0, medium: 0, high: 0 };
	const difficultyCounts = todos.reduce((acc, todo) => {
		const difficulty = todo.difficulty ?? 'low';
		acc[difficulty] = (acc[difficulty] || 0) + 1;
		return acc;
	}, initialData);

	const data = {
		labels: Object.keys(difficultyCounts).map(
			(label) => label[0].toUpperCase() + label.slice(1),
		),
		datasets: [
			{
				data: Object.values(difficultyCounts),
				backgroundColor: [
					// 'hsl(0, 0%, 70%)', // N/A
					'hsl(130, 80%, 69%)', // low
					'hsl(48, 90%, 67%)',
					'hsl(350, 90%, 74%)',
				],
				borderColor: [
					// 'hsl(0, 0%, 80%)', // N/A
					'hsl(130, 100%, 40%)', // low
					'hsl(48, 100%, 50%)', // medium
					'hsl(350, 100%, 69%)', // high
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<>
			<ChartTitle>Difficulty histogram</ChartTitle>
			<Bar
				data={data}
				options={{
					responsive: true,
				}}
			/>
		</>
	);
};

export const TasksCompletedOverTime = ({ todos }: ChartProps) => {
	const completedDates = todos
		.filter((todo) => todo.done)
		.map((todo) => todo.updatedAt.split('T')[0]);

	const dateCounts = completedDates.reduce(
		(acc, date) => {
			acc[date] = (acc[date] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	const data = {
		labels: Object.keys(dateCounts),
		datasets: [
			{
				label: 'Ended tasks',
				data: Object.values(dateCounts),
				borderColor: 'rgba(75, 192, 192, 1)',
				fill: false,
			},
		],
	};

	return (
		<>
			<ChartTitle>Tasks completed over time</ChartTitle>
			<Line data={data} options={{ responsive: true }} />
		</>
	);
};

export const PriorityAverage = ({ todos }: ChartProps) => {
	const priorityCounts = todos.reduce(
		(acc, todo) => {
			const priority = todo.priority ?? 1;
			acc[priority] = (acc[priority] || 0) + 1;
			return acc;
		},
		{} as Record<number, number>,
	);

	const data = {
		labels: Object.keys(priorityCounts),
		datasets: [
			{
				label: 'Average priority',
				data: Object.values(priorityCounts),
				backgroundColor: 'rgba(153, 102, 255, 0.6)',
				borderColor: 'rgba(153, 102, 255, 1)',
				borderWidth: 1,
			},
		],
	};

	return (
		<>
			<ChartTitle>Average priority</ChartTitle>
			<Bar data={data} options={{ responsive: true }} />
		</>
	);
};

export const TotalTimeSpent = ({ todos }: ChartProps) => {
	const timeSpent = todos
		.filter((todo) => todo.done)
		.map((todo) =>
			differenceInHours(
				parseISO(todo.updatedAt),
				parseISO(todo.createdAt),
			),
		)
		.reduce((acc, hours) => acc + hours, 0);

	const data = {
		labels: ['Total time spent'],
		datasets: [
			{
				label: 'Horas',
				data: [timeSpent],
				backgroundColor: 'rgba(255, 159, 64, 0.6)',
				borderColor: 'rgba(255, 159, 64, 1)',
				borderWidth: 1,
			},
		],
	};

	return (
		<>
			<ChartTitle>Total time spent</ChartTitle>
			<Bar data={data} options={{ responsive: true }} />
		</>
	);
};
