function echartLine(data, sbar, ebar, name){ 	
	
	if( typeof (echarts) === 'undefined'){ console.log('echarts is undefined'); return; }
	var echart = echarts.init(document.getElementById('echart'));
		echart.setOption({
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross'
		        }
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
		    },
		    yAxis: {
		        type: 'value',
		        interval :1,
		        axisPointer: {
		            snap: true
		        }
		    },
		    visualMap: {
		        show: false,
		        dimension: 0,
		        pieces: [{
		            lte: sbar/10,
		            color: 'skyblue'
		        }, {
		            gt: sbar/10,
		            lte: ebar/10,
		            color: 'blue'
		        }, {
		            gt: ebar/10,
		            color: 'skyblue'
		        }]
		    },
		    series: [
		        {
		            name:'인원수',
		            type:'line',
		            color: 'blue',
		            smooth: true,
		            data: data,
		            markArea: {
		                data: [ [{
		                    name: name,
		                    xAxis: sbar
		                }, {
		                    xAxis: ebar
		                }]]
		            }
		        }
		    ]		    
		}
	);
}