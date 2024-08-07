import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

const BloodPressureChart = ({ bloodPressureData }) => {
    if (!Array.isArray(bloodPressureData) || bloodPressureData.length === 0) {
        return <p>No blood pressure data available</p>;
    }

    const labels = bloodPressureData.map(d => `${d.month} ${d.year}`);
    const systolicData = bloodPressureData.map(d => d.blood_pressure.systolic.value);
    const diastolicData = bloodPressureData.map(d => d.blood_pressure.diastolic.value);

    const data = {
        labels,
        datasets: [
            {
                label: 'Systolic',
                data: systolicData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
            {
                label: 'Diastolic',
                data: diastolicData,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default BloodPressureChart;
