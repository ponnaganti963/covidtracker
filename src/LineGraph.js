import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';
const options = {
    elements: {
      point: {
        radius: 0,
        pointStyle: 'circle',
        hoverRadius: 5,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
  };
  

function LineGraph({ casesType='cases' , className}) {
    const [data, setdata] = useState({});

    const buildChartData = (data , casesType) =>{
        const chartData = [];
        let lastDataPoint;

        for (let date in data.cases){
            if (lastDataPoint){
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;

    }

    useEffect(()=>{

        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(respose => respose.json())
        .then(data =>{
            const chartData = buildChartData(data,casesType);
            setdata(chartData);
        })

    },[casesType]);
    
    return (
        <div className={className} >
            {
                data?.length > 0 && (
                    <Line
                        options= {options}
                        data={
                                {
                                datasets: [
                                    {
                                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                                    borderColor: "#CC1034",
                                    data: data,
                                    fill: true,
                                    label: casesType,
                                    spanGaps: false,
                                    },
                                ],
                            }
                        }
                        />
                )
            }
            
        </div>
    )
}

export default LineGraph
