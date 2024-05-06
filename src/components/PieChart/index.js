import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import './index.css'


const PieChart = () => {
    const [pieChartData, setPieChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/pie-chart', {
                params: {
                    month: 'march' // Default month, can be changed dynamically
                }
            });
            setPieChartData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderChart = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        const chartData = {
            labels: pieChartData.map(item => item.category),
            datasets: [{
                data: pieChartData.map(item => item.itemCount),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF99CC',
                    '#FF6666',
                    '#CCCC00',
                    '#3399FF',
                    '#99FF99'
                    // Add more colors as needed
                ]
            }]
        };

        return <Pie data={chartData} />;
    };

    return (
        <div className="pie-chart-container">
            {renderChart()}
        </div>
    );
};

export default PieChart;
