import React from 'react';
import Plot from 'react-plotly.js';

export default function SpikeTrainPanel(props) {
    const lineProperties = {
        type: 'scatter',
        mode: 'markers'
        //marker: {color: 'green'},
    };
    if (props.show) {
        const data = props.data.map(spikes => {
            return { ...lineProperties, ...spikes }
        });
        const layout = {
            margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50,
                pad: 4,
            },
            xaxis: {
                title: {
                    text: `Time (${props.axisLabels.x})`
                }
            },
            yaxis: {
                title: {
                    text: "Spike Trains"
                }
            },
        };
        if (props.ranges) {
            if (props.ranges.xRange) {
                layout.xaxis.range = props.ranges.xRange;
                layout.xaxis.autorange = false;
            }
            if (props.ranges.yRange) {
                layout.yaxis.range = props.ranges.yRange;
                layout.yaxis.autorange = false;
            }
        }
        return (
            <Plot
                data={data}
                layout={layout}
                onRelayout={props.onRelayout}
                useResizeHandler={!Boolean(props.width && props.height)}
                style={{
                    width: props.width || "100%",
                    height: props.height || "100%",
                }}
            />
        );
    } else {
        return <div />
    }
}