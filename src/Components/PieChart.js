import React from 'react';
import {Pie} from 'react-chartjs-2';

export default function PieChart(props) {
    const data = {
        labels: [
            'Death',
            'Confirmed',
            'Recovered'
        ],
        datasets: [{
            data: [props.death, props.confirm, props.recover],
            backgroundColor: [
            'red',
            'blue',
            'green'
            ],
            hoverBackgroundColor: [
            'red',
            'blue',
            'green'
            ]
        }]
    };
    return (
        <div>
        <h2>Covid-19 Chart</h2>
        <Pie data={data} height={70}/>
      </div>
    )
}