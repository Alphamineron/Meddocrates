$(function() {
   chartReady()
});

let tsalesdom_data
var chart

function chartReady(id = -1) {
    fetch("http://localhost:1337/sales/tsalesdom/" + id)
        .then((response) => response.json())
        .then(function (data) {
            tsalesdom_data = data;
            statsMain()
        })
        .catch(function (error) {
            console.error(error);
        });
}

function statsMain() {
    console.log(tsalesdom_data);
var options = {
      chart: {
        type: "area",
        height: 300,
        foreColor: "#999",
        stacked: true,
        dropShadow: {
          enabled: true,
          enabledSeries: [0],
          top: -2,
          left: 2,
          blur: 5,
          opacity: 0.06
        }
      },
      colors: ['#0090FF', '#00E396'],
      stroke: {
        curve: "smooth",
        width: 3
      },
      dataLabels: {
        enabled: false
      },
      series: [{
        name: 'Total Sales',
        data: tsalesdom_data
      }],
      markers: {
        size: 0,
        strokeColor: "#fff",
        strokeWidth: 3,
        strokeOpacity: 1,
        fillOpacity: 1,
        hover: {
          size: 6
        }
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          offsetX: 14,
          offsetY: -5
        },
        tooltip: {
          enabled: true
        }
      },
      grid: {
        padding: {
          left: -5,
          right: 5
        }
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      fill: {
        type: "solid",
        fillOpacity: 0.7
      }
    };

    chart = new ApexCharts(document.querySelector("#timeline-chart"), options);
    chart.render();
}


// var options = {
//       chart: {
//         type: "area",
//         height: 300,
//         foreColor: "#999",
//         stacked: true,
//         dropShadow: {
//           enabled: true,
//           enabledSeries: [0],
//           top: -2,
//           left: 2,
//           blur: 5,
//           opacity: 0.06
//         }
//       },
//       colors: ['#00E396', '#0090FF'],
//       stroke: {
//         curve: "smooth",
//         width: 3
//       },
//       dataLabels: {
//         enabled: false
//       },
//       series: [{
//         name: 'Total Sales of the Month',
//         data: tsalesdom_data
//       }],
//       markers: {
//         size: 0,
//         strokeColor: "#fff",
//         strokeWidth: 3,
//         strokeOpacity: 1,
//         fillOpacity: 1,
//         hover: {
//           size: 6
//         }
//       },
//       xaxis: {
//         type: "datetime",
//         axisBorder: {
//           show: false
//         },
//         axisTicks: {
//           show: false
//         }
//       },
//       yaxis: {
//         labels: {
//           offsetX: 14,
//           offsetY: -5
//         },
//         tooltip: {
//           enabled: true
//         }
//       },
//       grid: {
//         padding: {
//           left: -5,
//           right: 5
//         }
//       },
//       tooltip: {
//         x: {
//           format: "dd MMM yyyy"
//         },
//       },
//       legend: {
//         position: 'top',
//         horizontalAlign: 'left'
//       },
//       fill: {
//         type: "solid",
//         fillOpacity: 0.7
//       }
//     };


    
// // FusionCharts.ready(function(){
//     var chart = new ApexCharts(document.querySelector("#timeline-chart"), options);
//     chart.render();
// // });

