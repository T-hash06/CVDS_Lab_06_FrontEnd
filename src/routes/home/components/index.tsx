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

/**
 * Props for the Chart component.
 *
 * @interface ChartProps
 * @property {Todo[]} todos - An array of Todo items to be displayed in the chart.
 */
interface ChartProps {
	todos: Todo[];
}

Chart.register(BarElement, CategoryScale, LinearScale);
Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

/**
 * ChartTitle component renders a title for a chart.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.children - The title text to be displayed.
 * @returns The rendered chart title element.
 */
function ChartTitle({ children }: { children: string }) {
	return <h2 className='text-lg text-blue-600 font-semibold'>{children}</h2>;
}

/**
 * Component that renders a bar chart representing the distribution of task difficulties.
 *
 * @param {ChartProps} props - The properties object.
 * @param {Array} props.todos - The list of todos, each containing a difficulty property.
 *
 * @returns A bar chart displaying the count of tasks for each difficulty level.
 */
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

/**
 * Component to display a line chart of tasks completed over time.
 *
 * @param {Readonly<ChartProps>} props - The properties object.
 * @param {Array<Todo>} props.todos - The list of todo items.
 *
 * @returns A JSX element containing the chart.
 */
export const TasksCompletedOverTime = ({ todos }: Readonly<ChartProps>) => {
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

/**
 * Component to display a bar chart representing the average priority of todos.
 *
 * @param {Readonly<ChartProps>} props - The properties object.
 * @param {Array<Todo>} props.todos - The list of todos to calculate the average priority from.
 *
 * @returns A JSX element containing the bar chart.
 */
export const PriorityAverage = ({ todos }: Readonly<ChartProps>) => {
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

/**
 * Component to calculate and display the total time spent on completed todos.
 *
 * @param {Readonly<ChartProps>} props - The properties object.
 * @param {Array} props.todos - The list of todo items.
 * @returns The rendered component displaying the total time spent.
 *
 * The component filters the todos to include only those that are marked as done,
 * calculates the total time spent on these todos in hours, and displays this
 * information in a bar chart.
 */
export const TotalTimeSpent = ({ todos }: Readonly<ChartProps>) => {
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
