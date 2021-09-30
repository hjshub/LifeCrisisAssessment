//main chart

'use strict';

(function($) {
    var chart = {};

    $(function() {
        $funcCustomChart().init();
    });

    function funcCustomChart() {
        var ctx = document.querySelectorAll('.chartList'),
            ctx00 = ctx[0].getContext('2d'),
            ctx01 = ctx[1].getContext('2d'),

            pieChart = function() { // pie
                chart.pie = new Chart(ctx00, {
                    // The type of chart we want to create
                    type: 'pie',

                    // The data for our dataset
                    data: {
                        labels: ['남성', '여성'],
                        datasets: [{
                            label: '성 비율',
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            borderWidth: 1,
                            backgroundColor: ['#52bfb0', '#4e7fc9'], // hexa, rgb 모두 가능
                            data: [72, 28]
                        }]
                    },

                    // Configuration options go here
                    options: {
                        resoponsive: true,
                        responsiveAnimationDuration: 300,
                        legend: {
                            position: 'right',
                            labels: {
                                fontSize: 15
                            }
                        },
                        tooltips: {
                            xPadding: 15,
                            yPadding: 15,
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var label = data.labels[tooltipItem.index] || '',
                                        _data = data.datasets[0].data[tooltipItem.index] || '';

                                    if (label && data) {
                                        label += ': ' + _data + '%';
                                    }
                                    return label;
                                }
                            }
                        }
                    },

                    //plugin
                    plugins: [{
                        afterDatasetsDraw: function(chartInstance, easing) {
                            // To only draw at the end of animation, check for easing === 1
                            var ctx = chartInstance.chart.ctx;

                            chartInstance.data.datasets.forEach(function(dataset, i) {
                                var meta = chartInstance.getDatasetMeta(i);
                                if (!meta.hidden) {
                                    meta.data.forEach(function(element, index) {
                                        // Draw the text in black, with the specified font
                                        var fontSize = 17,
                                            fontStyle = 'normal',
                                            fontFamily = 'Poppins';

                                        ctx.fillStyle = '#fff';
                                        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                                        // Just naively convert to string for now
                                        var dataString = dataset.data[index].toString();

                                        // Make sure alignment settings are correct
                                        var padding = 5,
                                            position = element.tooltipPosition();

                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        ctx.fillText(dataString + '%', position.x, position.y - (fontSize / 2) - padding);
                                    });
                                }
                            });
                        }
                    }]
                });
            },

            barChart = function() { // bar
                chart.bar = new Chart(ctx01, {
                    // The type of chart we want to create
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: ['10대', '20대', '30대', '40대', '50대', '60대', '70대'],
                        datasets: [{
                            label: '인원',
                            borderColor: 'rgba(66, 66, 66, 0.2)',
                            borderWidth: 1,
                            backgroundColor: ['#76c7db', '#76bedb', '#4e7fc9', '#52bfb0', '#52bf99', '#3c9669', '#5b567f'], // hexa, rgb 모두 가능
                            data: [38, 28, 27, 15, 4, 5, 1]
                        }]
                    },

                    // Configuration options go here
                    options: {
                        resoponsive: true,
                        responsiveAnimationDuration: 300,
                        onResize: function() {},
                        //maintainAspectRatio : false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    // max: 100,
                                    min: 0,
                                    stepSize: 10
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: '[인원수 (명)]',
                                    fontFamily: "'Noto Sans CJK KR', sans-serif",
                                    fontSize: 13
                                }
                            }],
                            xAxes: [{
                                gridLines: {
                                    display: false
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: '[연령대]',
                                    fontFamily: "'Noto Sans CJK KR', sans-serif",
                                    fontSize: 13
                                }
                            }]
                        },
                        legend: {
                            display: false,
                            position: 'bottom',
                            labels: {
                                fontSize: 15
                            }
                        },
                        tooltips: {
                            xPadding: 15,
                            yPadding: 15,
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var label = data.datasets[tooltipItem.datasetIndex].label || '',
                                        data = data.datasets[0].data[tooltipItem.index] || '';

                                    if (label && data) {
                                        label += ': ' + data + '명';
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                });
            },

            init = function() {
                barChart();
                pieChart();
            }

        return {
            init: init
        }
    }

    function $funcCustomChart() {
        var _funcCustomChart = new funcCustomChart();

        return _funcCustomChart;
    }

})(jQuery);