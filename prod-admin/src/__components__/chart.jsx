// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler,
    LineController,
    BarController,
    DoughnutController,
    PieController
} from 'chart.js';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';

// Register Chart.js modules
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler);
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LineController,
    BarController,
    DoughnutController,
    PieController
);

// Default fallback labels
const defaultLabels = ['Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export const BarChart = ({
    data_1 = [10, 20, 30, 40, 50, 60], // Revenue
    data_2 = [5, 15, 25, 35, 45, 55], // Transactions
    title_1 = 'Revenue',
    title_2 = 'Transactions',
    bgColor_1 = 'rgba(0, 115, 255, 0.9)',
    bgColor_2 = 'rgba(53, 162, 235, 0.9)',
    labels = defaultLabels
}) => {
    const normalizedData1 = Array.isArray(data_1) ? data_1.slice(0, labels.length) : [];
    const normalizedData2 = Array.isArray(data_2) ? data_2.slice(0, labels.length) : [];

    while (normalizedData1.length < labels.length) normalizedData1.push(0);
    while (normalizedData2.length < labels.length) normalizedData2.push(0);

    const data = {
        labels,
        datasets: [
            {
                label: title_1,
                data: normalizedData1,
                backgroundColor: bgColor_1,
                borderColor: bgColor_1,
                borderWidth: 1,
                yAxisID: 'y1', // For Revenue
                type: 'bar'
            },
            {
                label: title_2,
                data: normalizedData2,
                borderColor: bgColor_2,
                backgroundColor: bgColor_2,
                yAxisID: 'y2', // For Transactions
                type: 'line',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            y1: {
                beginAtZero: true,
                position: 'left',
                title: {
                    display: true,
                    text: title_1
                },
                grid: {
                    drawOnChartArea: false
                }
            },
            y2: {
                beginAtZero: true,
                position: 'right',
                title: {
                    display: true,
                    text: title_2
                },
                grid: {
                    drawOnChartArea: false
                }
            },
            x: {
                grid: { display: false }
            }
        }
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Bar
                data={data}
                options={options}
            />
        </div>
    );
};
BarChart.propTypes = {
    horizontal: PropTypes.bool,
    data_1: PropTypes.arrayOf(PropTypes.number),
    data_2: PropTypes.arrayOf(PropTypes.number),
    title_1: PropTypes.string,
    title_2: PropTypes.string,
    bgColor_1: PropTypes.string,
    bgColor_2: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string)
};

// === ✅ DOUGHNUT CHART ===
export const DoughnutChart = ({
    labels = ['Red', 'Blue', 'Green'],
    data = [300, 50, 100],
    backgroundColor = ['#FF6384', '#36A2EB', '#FFCE56'],
    cutout = '70%',
    legends = true,
    offset = 0
}) => {
    // Ensure data arrays are valid
    const validData = Array.isArray(data) ? data.filter((item) => typeof item === 'number' && !isNaN(item)) : [];
    const validLabels = Array.isArray(labels) ? labels.slice(0, validData.length) : [];
    const validColors = Array.isArray(backgroundColor) ? backgroundColor.slice(0, validData.length) : ['#FF6384'];

    // If no valid data, show a placeholder
    if (validData.length === 0) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>No data available</div>;
    }

    const doughnutData = {
        labels: validLabels,
        datasets: [
            {
                data: validData,
                backgroundColor: validColors,
                borderWidth: 2,
                borderColor: '#fff',
                offset
            }
        ]
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: legends,
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label(context) {
                        const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
                        const percentage = ((context.parsed / total) * 100).toFixed(1);
                        return `${context.label}: ${context.parsed} (${percentage}%)`;
                    }
                }
            }
        },
        cutout
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Doughnut
                data={doughnutData}
                options={doughnutOptions}
            />
        </div>
    );
};

DoughnutChart.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number),
    backgroundColor: PropTypes.arrayOf(PropTypes.string),
    cutout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    legends: PropTypes.bool,
    offset: PropTypes.number
};

// === ✅ PIE CHART ===
export const PieChart = ({
    labels = ['Apple', 'Banana', 'Cherry'],
    data = [40, 25, 35],
    backgroundColor = ['#FF6384', '#36A2EB', '#FFCE56'],
    offset = 0
}) => {
    const validData = Array.isArray(data) ? data.filter((item) => typeof item === 'number' && !isNaN(item)) : [];
    const validLabels = Array.isArray(labels) ? labels.slice(0, validData.length) : [];
    const validColors = Array.isArray(backgroundColor) ? backgroundColor.slice(0, validData.length) : ['#FF6384'];

    if (validData.length === 0) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>No data available</div>;
    }

    const pieChartData = {
        labels: validLabels,
        datasets: [
            {
                data: validData,
                backgroundColor: validColors,
                borderWidth: 2,
                borderColor: '#fff',
                offset
            }
        ]
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    padding: 20,
                    usePointStyle: true
                }
            },
            tooltip: {
                callbacks: {
                    label(context) {
                        const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
                        const percentage = ((context.parsed / total) * 100).toFixed(1);
                        return `${context.label}: ${context.parsed} (${percentage}%)`;
                    }
                }
            }
        }
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Pie
                data={pieChartData}
                options={pieChartOptions}
            />
        </div>
    );
};

PieChart.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.number),
    backgroundColor: PropTypes.arrayOf(PropTypes.string),
    offset: PropTypes.number
};

// === ✅ LINE CHART ===
export const LineChart = ({
    data = [5, 10, 15, 20, 25, 30],
    label = 'Progress',
    backgroundColor = 'rgba(75,192,192,0.4)',
    borderColor = 'rgba(75,192,192,1)',
    labels = defaultLabels
}) => {
    const validData = Array.isArray(data) ? data : [];
    const normalizedData = validData.slice(0, labels.length);

    while (normalizedData.length < labels.length) {
        normalizedData.push(0);
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { display: true, color: 'rgba(0,0,0,0.1)' },
                ticks: {
                    callback(value) {
                        return typeof value === 'number' ? value.toLocaleString() : value;
                    }
                }
            },
            x: {
                grid: { display: true, color: 'rgba(0,0,0,0.1)' }
            }
        },
        elements: {
            point: {
                radius: 4,
                hoverRadius: 6
            },
            line: {
                tension: 0.4
            }
        }
    };

    const lineChartData = {
        labels,
        datasets: [
            {
                fill: true,
                label,
                data: normalizedData,
                backgroundColor,
                borderColor,
                borderWidth: 2,
                pointBackgroundColor: borderColor,
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }
        ]
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Line
                options={options}
                data={lineChartData}
            />
        </div>
    );
};

LineChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number),
    label: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string)
};

// Named exports only - no default export to ensure Fast Refresh compatibility
