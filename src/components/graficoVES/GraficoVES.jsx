import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './GraficoVES.css';

const GraficoVES = (props) => {
    const chartRef = useRef(null);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const labels = props.data.map((datas) => datas.ano);
        const data = props.data.map((datas) => datas.pontuacao_total);

        if (chart) {
            chart.data.labels = labels;
            chart.data.datasets[0].data = data;
            chart.update();
        } else {
            const newChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'PONTOS',
                            data,
                            fill: false,
                            pointRadius: 10,
                            pointHoverRadius: 15,
                            showLine: true,
                            backgroundColor: 'white',
                        },
                    ],
                },
                options: {
                    legend: {
                        labels: {
                            fontColor: 'white',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 0,
                            max: 10,
                            reverse: true,
                            ticks: {
                                fontColor: 'white',
                            },
                        },
                        x: {
                            ticks: {
                                fontColor: 'white',
                            },
                        },
                    },
                    elements: {
                        point: {
                            pointStyle: 'circle',
                        },
                    },
                },
            });

            setChart(newChart);
        }
    }, [props.data]);

    return (
        <div id="grafico_ves" className="pacientes index">
            <canvas ref={chartRef} id="myChart" width="400" height="400"></canvas>
        </div>
    );
};

export default GraficoVES;
