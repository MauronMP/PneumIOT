
import { ResponsiveBar } from "@nivo/bar";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { API_BASE_URL } from "../config.js";

const BarChart = ({ patient_id, day_date, flagQuerietType, sensor_id, board_id }) => {

    // Status for storing received data
    const [averageMeasures, setAverageMeasures] = useState(null);
    const [axisBottomLegend, setAxisBottomLegend] = useState(null); 


    // Obtains the average values of the measurements obtained by the patient's board sensors.
    // Depending on the type of flag, it has been requested to see daily, monthly or yearly graphs.
    useEffect(() => {
        
        let queryType = '';

        switch (flagQuerietType) {
            case 0:
                queryType = `${API_BASE_URL}/daily/average/${sensor_id}/${patient_id}/${day_date}/${board_id}`;
                setAxisBottomLegend("Hour of the day");
                break;
            case 1:
                const month_id = day_date;
                queryType = `${API_BASE_URL}/monthly/average/${sensor_id}/${patient_id}/${month_id}/${board_id}`;
                setAxisBottomLegend("Day of the month");
                break;
            case 2:
                const year_date = day_date;
                queryType = `${API_BASE_URL}/yearly/average/${sensor_id}/${patient_id}/${year_date}/${board_id}`;
                setAxisBottomLegend("Month of the year");
                break;
            default:
                queryType = "";
        }

    /**
     * 
     * It makes a data request to the server using the fetch method and updates the status with the results. 
     * Then, it performs transformations on the received data, converting the 'average' property into floating point numbers. 
     * Finally, the transformed result is stored in the state of the React component. 
     * The useEffect hook ensures that the request is made when certain dependency values change.
     * 
     */
        fetch(queryType)
            .then((response) => response.json())
            .then((averageMeasures) => {
                const parsedAverageMeasures = averageMeasures.map((item) => ({
                    ...item,
                    average: parseFloat(item.average),
                }));
            setAverageMeasures(parsedAverageMeasures);
        })
        .catch((error) => console.error("Error fetching data:", error));
  }, [sensor_id, patient_id, day_date, flagQuerietType, board_id]);


    
    /**
     * 
     * In case the previous query has data and the variable 
     * averageMeasures has them, the graphs are shown
     * 
     */
    return (
        <React.Fragment>
            {averageMeasures && (
                <Box height="35vh">
                    <ResponsiveBar
                        data={averageMeasures}
                        keys={['average']}
                        indexBy="data_time"
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.2}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={{ scheme: 'set2' }}
                        theme={{
                            legends: {
                                text: {
                                    fill: '#777777'
                                }
                            },
                            axis: {
                                fontSize: "14px",
                                tickColor: "#eee",
                                ticks: {
                                    line: {
                                        stroke: "#777777"
                                    },
                                    text: {
                                        fill: "#777777"
                                    }
                                },
                                legend: {
                                    text: {
                                        fill: "#777777"
                                    }
                                }
                            },
                        }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    '3'
                                ]
                            ]
                        }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: axisBottomLegend,
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Average',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        enableGridX={true}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                        motionConfig="stiff"
                        role="application"
                        isFocusable={true}
                        motionStiffness={90}
                        motionDamping={15}
                        animate={false}
                        tooltip={
                            ({ indexValue, value }) => (
                            <strong>
                                {indexValue}: {value}
                            </strong>
                            )
                        }
                    />
                </Box>
            )}
        </React.Fragment>
    );
};

export default BarChart;
