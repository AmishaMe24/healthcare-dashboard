import React, { useMemo, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const BloodPressureChart = ({ diagnosisHistory }) => {
    const [timeRange, setTimeRange] = useState('1');

    const handleSelectChange = (event) => {
        setTimeRange(event.target.value);
    };

    const processedData = useMemo(() => {
        // Check if diagnosisHistory exists and has items
        if (!diagnosisHistory || !Array.isArray(diagnosisHistory) || diagnosisHistory.length === 0) {
            console.log("No diagnosis history data available");
            return null;
        }

        console.log("Diagnosis History:", diagnosisHistory);
        
        // Debug the structure of the first item to see what's available
        if (diagnosisHistory.length > 0) {
            console.log("First record structure:", JSON.stringify(diagnosisHistory[0], null, 2));
        }

        // Instead of using current date, let's use a fixed reference date
        // This ensures consistent filtering regardless of when the component is rendered
        const currentDate = new Date();
        console.log("Current date:", currentDate);
        
        // For testing, you can override the current date to match your data
        // const currentDate = new Date(2024, 3, 1); // April 1, 2024

        let oldData;
        if (timeRange === '1') {
            oldData = new Date(currentDate);
            oldData.setFullYear(currentDate.getFullYear() - 1);
        } else if (timeRange === '15') {
            oldData = new Date(currentDate);
            oldData.setMonth(currentDate.getMonth() - 15);
        } else if (timeRange === '2') {
            oldData = new Date(currentDate);
            oldData.setFullYear(currentDate.getFullYear() - 2);
        } else {
            // Default to showing all data if timeRange is invalid
            oldData = new Date(0); // January 1, 1970
        }

        console.log("Cutoff date for filtering:", oldData);

        // Filter out records without blood_pressure data
        const validRecords = diagnosisHistory.filter(record => {
            const hasValidData = record && 
                record.month && 
                record.year && 
                record.blood_pressure && 
                record.blood_pressure.systolic && 
                record.blood_pressure.systolic.value !== undefined &&
                record.blood_pressure.diastolic && 
                record.blood_pressure.diastolic.value !== undefined;
            
            if (!hasValidData) {
                console.log("Invalid record found:", record);
            }
            return hasValidData;
        });

        console.log("Valid records count:", validRecords.length);

        if (validRecords.length === 0) {
            console.log("No valid records with blood pressure data");
            return null;
        }

        const filteredAndSortedHistory = [...validRecords]
            .filter(record => {
                // We'll reverse the comparison logic - instead of filtering out old records,
                // we'll include all records and sort them
                return true;
            })
            .sort((a, b) => {
                // Sort by date (newest first)
                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const aMonthIndex = monthNames.indexOf(a.month);
                const bMonthIndex = monthNames.indexOf(b.month);
                
                return (new Date(b.year, bMonthIndex, 1) - new Date(a.year, aMonthIndex, 1));
            })
            // Then take only the most recent records based on timeRange
            .slice(0, timeRange === '1' ? 12 : timeRange === '15' ? 15 : 24)
            // And finally sort them back in chronological order
            .sort((a, b) => {
                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const aMonthIndex = monthNames.indexOf(a.month);
                const bMonthIndex = monthNames.indexOf(b.month);
                
                return (new Date(a.year, aMonthIndex, 1) - new Date(b.year, bMonthIndex, 1));
            });

        console.log("Filtered and sorted records count:", filteredAndSortedHistory.length);

        if (filteredAndSortedHistory.length === 0) {
            console.log("No records within the selected time range");
            return null;
        }

        const lastRecord = filteredAndSortedHistory[filteredAndSortedHistory.length - 1];

        return {
            labels: filteredAndSortedHistory.map(record => `${record.month.slice(0, 3)}, ${record.year}`),
            systolicData: filteredAndSortedHistory.map(record => record.blood_pressure.systolic.value),
            diastolicData: filteredAndSortedHistory.map(record => record.blood_pressure.diastolic.value),
            currentReadings: {
                systolic: lastRecord.blood_pressure.systolic,
                diastolic: lastRecord.blood_pressure.diastolic
            }
        };
    }, [diagnosisHistory, timeRange]);

    // If no valid data is available, show a message instead of the chart
    if (!processedData) {
        return (
            <div className="bg-[#F8F5FF] p-4 rounded-lg flex items-center justify-center h-52">
                <p className="text-gray-500">No blood pressure data available</p>
            </div>
        );
    }

    const chartData = {
        labels: processedData.labels,
        datasets: [
            {
                label: 'Systolic',
                data: processedData.systolicData,
                borderColor: '#C26EB4',
                backgroundColor: '#C26EB4',
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#E66FD2',
            },
            {
                label: 'Diastolic',
                data: processedData.diastolicData,
                borderColor: '#7E6CAB',
                backgroundColor: '#7E6CAB',
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#8C6FE6',
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#FFF',
                titleColor: '#000',
                bodyColor: '#000',
                borderColor: '#DDD',
                borderWidth: 1,
                padding: 12,
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            y: {
                min: 60,
                max: 180,
                grid: {
                    color: '#F0F0F0',
                    drawBorder: false,
                },
                ticks: {
                    stepSize: 20,
                    color: '#707070',
                    font: {
                        family: 'Manrope',
                        size: 12
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#707070',
                    font: {
                        family: 'Manrope',
                        size: 12
                    }
                }
            }
        }
    };

    return (
        <div className="bg-[#F8F5FF] p-4 rounded-lg">
            <div className='flex'>
                <div className="mb-6 w-2/3">
                    <div className='flex justify-between items-center pb-2'>
                        <h3 className="text-lg font-bold text-[#072635]">Blood Pressure</h3>
                        <div className="flex flex-col space-x-4">
                            <select className="bg-[#F8F5FF] rounded-lg px-3 text-sm" 
                            value={timeRange} onChange={handleSelectChange}>
                                <option value='1'>Last 1 Year</option>
                                <option value='15'>Last 15 Months</option>
                                <option value='2'>Last 2 Years</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className="h-52">
                            <Chart type="line" data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-1/3">
                    <div className="pl-4 flex flex-col justify-center">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-[#E66FD2] mr-2"></div>
                                <span className="text-sm font-bold">Systolic</span>
                            </div>
                            <div className="text-2xl font-bold">{processedData.currentReadings.systolic.value}</div>
                            <div className="text-sm flex items-center">
                                {processedData.currentReadings.systolic.levels.includes('Higher') ? (
                                    <span className="mr-1">▲</span>
                                ) : (
                                    <span className="mr-1">▼</span>
                                )}
                                {processedData.currentReadings.systolic.levels}
                            </div>
                        </div>
                        <hr className="border-[#E0E0E0] my-4" />

                        <div className='space-y-2'>
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-[#8C6FE6] mr-2"></div>
                                <span className="text-sm font-bold">Diastolic</span>
                            </div>
                            <div className="text-2xl font-bold">{processedData.currentReadings.diastolic.value}</div>
                            <div className="text-sm flex items-center">
                                {processedData.currentReadings.diastolic.levels.includes('Higher') ? (
                                    <span className="mr-1">▲</span>
                                ) : (
                                    <span className="mr-1">▼</span>
                                )}
                                {processedData.currentReadings.diastolic.levels}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BloodPressureChart;