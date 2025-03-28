// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const CustomApexChart = ({ data, title, lineStyle, lineWidth, chartType, controls }) => {
//     // Convert each data object into a series object expected by ApexCharts.
//     const series = data.map((serie) => {
//         // Get only the last 20 items from both x-axis and y-axis
//         const last20X = serie["x-axis"].slice(-100);
//         const last20Y = serie["y-axis"].slice(-100);
    
//         // Ensure the data is sorted by x value (if not already)
//         const seriesData = last20X.map((x, i) => ({
//             x,
//             y: last20Y[i]
//         })).sort((a, b) => new Date(a.x) - new Date(b.x));        
    
//         return {
//             name: serie.seriesName,
//             data: seriesData,
//             ...(serie.color && { color: serie.color })
//         };
//     });
    
//     // Compute xMin and xMax from the first series (assuming all series are similar)
//     const xMin = series[0]?.data[0]?.x;
//     const xMax = series[0]?.data[series[0]?.data.length - 1]?.x;
    
//     // Chart configuration options with dynamic x-axis range.
//     const options = {
//         chart: {
//             height: 350,
//             type: chartType,
//             // Disable selection by default unless autoSelected is explicitly set to 'selection'
//             selection: {
//               enabled: false,
//               type: "x"
//             },
//             zoom: {
//                 enabled: controls?.zoomEnabled !== undefined ? controls.zoomEnabled : true,
//                 type: controls?.zoomType || 'x',
//                 autoScaleYaxis: controls?.autoScaleYaxis !== undefined ? controls.autoScaleYaxis : true
//             },
//             toolbar: {
//                 show: controls?.show !== undefined ? controls.show : true,
//                 tools: {
//                     download: controls?.download !== undefined ? controls.download : true,
//                     selection: controls?.selection !== undefined ? controls.selection : false,
//                     zoom: controls?.zoom !== undefined ? controls.zoom : true,
//                     zoomin: controls?.zoomin !== undefined ? controls.zoomin : true,
//                     zoomout: controls?.zoomout !== undefined ? controls.zoomout : true,
//                     pan: controls?.pan !== undefined ? controls.pan : true,
//                     reset: controls?.reset !== undefined ? controls.reset : true
//                 },
//                 // autoSelected: controls?.autoSelected || 'zoom'
//             }
//         },
//         dataLabels: {
//             enabled: false
//         },
//         stroke: {
//             curve: lineStyle,
//             width: lineWidth
//         },
//         title: {
//             text: title,
//             align: 'left'
//         },
//         grid: {
//             row: {
//                 colors: ['white', 'transparent'],
//                 opacity: 0.5
//             }
//         },
//         xaxis: {
//             type: 'datetime',
//             tickAmount: 20,
//             labels: {
//                 formatter: (value) => new Date(value).toLocaleString(),
//                 rotate: -45
//             },
//             min: xMin,
//             max: xMax
//         }
//     };

//     return (
//         <div>
//             <div id="chart">
//                 <ReactApexChart key={chartType} options={options} series={series} height={350} type={chartType} width={"100%"} style={{background: "white", borderRadius: "4px" , padding : "5px"}}/>
//             </div>
//             <div id="html-dist"></div>
//         </div>
//     );
// };

// export default CustomApexChart;



import React from 'react';
import ReactApexChart from 'react-apexcharts';

const CustomApexChart = ({ data, title, lineStyle = 'smooth', lineWidth = 2, chartType = 'line', controls = {} }) => {
    // Convert each dataset into ApexChart series format.
    const series = data.map((serie) => {
        // Slice last 100 data points for both x-axis and y-axis
        const slicedX = serie["x-axis"].slice(-100);
        const slicedY = serie["y-axis"].slice(-100);

        // Ensure chronological sorting of data
        const sortedData = slicedX.map((x, i) => ({ x, y: slicedY[i] })).sort((a, b) => new Date(a.x) - new Date(b.x));

        return {
            name: serie.seriesName,
            data: sortedData,
            color: serie.color || undefined, // Apply color if provided
        };
    });

    // Determine x-axis min/max for proper scaling
    const xMin = series[0]?.data[0]?.x;
    const xMax = series[0]?.data[series[0]?.data.length - 1]?.x;

    // Chart configuration options
    const options = {
        chart: {
            height: 350,
            type: chartType,
            zoom: {
                enabled: controls.zoomEnabled ?? true,
                type: controls.zoomType || 'x',
                autoScaleYaxis: controls.autoScaleYaxis ?? true
            },
            toolbar: {
                show: controls.show ?? true,
                tools: {
                    download: controls.download ?? true,
                    selection: controls.selection ?? false,
                    zoom: controls.zoom ?? true,
                    zoomin: controls.zoomin ?? true,
                    zoomout: controls.zoomout ?? true,
                    pan: controls.pan ?? true,
                    reset: controls.reset ?? true
                }
            }
        },
        dataLabels: { enabled: false },
        stroke: { curve: lineStyle, width: lineWidth },
        title: { text: title, align: 'left' },
        grid: { row: { colors: ['white', 'transparent'], opacity: 0.5 } },
        xaxis: {
            type: 'datetime',
            tickAmount: 20,
            labels: { formatter: (value) => new Date(value).toLocaleString(), rotate: -45 },
            min: xMin,
            max: xMax
        }
    };



    return (
        <div className="bg-white rounded-lg shadow-md p-3">
            <ReactApexChart key={chartType} options={options} series={series} height={350} type={chartType} width="100%" />
        </div>
    );
};

export default CustomApexChart;
