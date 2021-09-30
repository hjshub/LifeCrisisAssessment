//chart

'use strict';

var chart = {};

(function($){

	$(function(){
		$funcCustomChart().init();
	});

	function $funcCustomChart(){
		var _funcCustomChart = new funcCustomChart();

		return _funcCustomChart;
	}

	function funcCustomChart(){
		var ctx = document.querySelectorAll('.chartList'),
	   	ctx00 = ctx[0].getContext('2d'),
	   	ctx01 = ctx[1].getContext('2d'),

	   	lineChart = function(){ // line
		    chart.line = new Chart(ctx00, {
		      // The type of chart we want to create
		      type: 'line',

		      // The data for our dataset
		      data: {
		        labels: ['2021-01-05','2021-01-06','2021-01-07','2021-01-08','2021-01-09','2021-01-10','2021-01-11','2021-01-12'],
		        datasets: [{
		          label: '',
		          lineTension: 0, //곡선 장력 직선일 경우 0
		          borderColor: 'rgba(247, 150, 70, 1)',
		          borderWidth: 2,
		          pointBorderWidth: 2,
		          pointRadius: 3,
		          pointBackgroundColor: 'rgba(247, 150, 70, 1)',
		          fill: true,
		          backgroundColor: 'rgba(255, 255, 255, 0)', // hexa, rgb 모두 가능
		          hoverBackgroundColor :'rgba(247, 150, 70, 1)',
		          data: [85, 75, 83, 92, 92, 68, 68, 68]
		        }]
		      },

		      // Configuration options go here
		      options: {
		      	resoponsive: true,
		      	responsiveAnimationDuration: 300,
		      	maintainAspectRatio: true,
		      	scales: {
			        yAxes: [{
			        	offset: true,
			        	position: 'left',
			            ticks: {
			                max: 120,
			                min: 0,
			                stepSize: 30,
			                padding: 20
			            },
			            gridLines: {
			            	drawBorder: false
					    },
			        }],
			        xAxes:[{
			        	offset: true,
			        	//autoSkip: false,
			        	ticks: {
			               	fontSize: 12,
			            	lineHeight: 1.3,
			            	padding: 20,
			            	z: 0
			            },
			        	gridLines: {
					    	display: false
					    }
			        }]
			    },
			    legend: {
                    display: false
                }
		      }

		    });
		},

	   	barChart = function(){ // bar
		    chart.bar = new Chart(ctx01, {
		      // The type of chart we want to create
		      type: 'bar',

		      // The data for our dataset
		      data: {
		        labels: ['2021-01-05','2021-01-06','2021-01-07','2021-01-08','2021-01-09','2021-01-10','2021-01-11','2021-01-12'],
		        datasets: [{
		          label: '',
		          borderColor: 'rgba(66, 66, 66, 0.2)',
		          borderWidth: 0,
		          backgroundColor : 'rgba(247, 150, 70, 1)', // hexa, rgb 모두 가능
		          data: [85, 75, 83, 92, 92, 68, 68, 68]
		        }]
		      },

		      // Configuration options go here
		      options: {
		      	resoponsive : true,
		      	responsiveAnimationDuration : 300,
		      	maintainAspectRatio: true,
		      	
		      	scales: {
			        yAxes: [{
			            ticks: {
			                max: 120,
			                min: 0,
			                stepSize: 30,
			                padding: 10
			            },
			        }],
			        xAxes:[{
			        	ticks: {
			               	fontSize: 12,
			            	lineHeight: 1.3,
			            	padding: 10,
			            	z: 0
			            },
			        	gridLines: {
					    	display: false
					    },
			        }]
			    },
			    legend: {
                    display: false
                }
		      }

		    });
		},

		chartChange = function(){
			$('#chartChange').find('a').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				var this_ = $(this),
					id = this_.attr('href'); 

				$('.chart-layer').css('display','none');
				$('.chart-layer' + id).css('display','block');

				this_ 
				.addClass('on')
				.siblings('a').removeClass('on');
			});
		},

		init = function(){
			lineChart();
			barChart();
			chartChange();
		}

		return {
			init : init
		}
	}
})(jQuery);
