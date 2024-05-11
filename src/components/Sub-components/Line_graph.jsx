import { LineChart } from '@mui/x-charts/LineChart';

// Sample data for Outcome and Income
const Outcome = [4000, 3500, 5000, 2500, 3000];
const Income = [5000, 5000, 5000, 5000, 5000];

// Labels for X-axis
const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

// Component for rendering a simple line chart
export default function SimpleLineChart() {
    return (
        <LineChart
            width={640} // Width of the chart
            height={400} // Height of the chart
            series={[ // Data series to be plotted on the chart
                { data: Income, label: 'Income', color: '#20C997' }, // Income data series with label and color
                { data: Outcome, label: 'Expense', color: '#E74C3C' }, // Outcome data series with label and color
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]} // Configuration for X-axis, using point scale type and xLabels as data
        />
    );
}
