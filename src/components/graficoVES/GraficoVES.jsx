import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const GraficoVES = ({ data }) => {
    useEffect(() => {
        const ctx = document.getElementById('myChartVes').getContext('2d');
        const labels = data.map((datas) => datas.ano);
        const data = data.map((datas) => datas.pontuacao_total);

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'pontos',
                        data,
                        fill: false,
                        pointRadius: 10,
                        pointHoverRadius: 15,
                        showLine: true,
                        backgroundColor: 'rgba(255,255,255,0.7)',
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
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max: 10,
                                reverse: true,
                                fontColor: 'white',
                            },
                        },
                    ],
                    xAxes: [
                        {
                            ticks: {
                                fontColor: 'white',
                            },
                        },
                    ],
                },
                elements: {
                    point: {
                        pointStyle: 'circle',
                    },
                },
            },
        });
    }, [data]);

    return (
        <div id="grafico_ves" className="pacientes index">
            <canvas id="myChartVes" width="400" height="400"></canvas>
        </div>
    );
};

export default GraficoVES;
