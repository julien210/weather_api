import React, { useRef } from "react"
import * as D3 from "d3"
import { useD3 } from "d3blackbox"

// remplissage  de data
var dataset = [];
var numDataPoints = 10;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;   
for (var i = 0; i < numDataPoints; i++) {
    let  x = Math.round(Math.random() * xRange);
    let  y = Math.round(Math.random() * yRange);
	dataset.push([{x:x, y:y}])
}
// console.log(dataset)

var datasetBar = [28, 40, 56, 50, 75, 90, 120, 120, 500, 400];

var chartWidth = 1000, chartHeight = 1000, barPadding = 5;
var barWidth = (chartWidth / dataset.length);

//definition des axes
	// x = paddingLeft; y =paddingTop; 
const Axis = ({ x, y, scale, axisType, ticks = 10 }) => {
	const fnName = axisType === "left" ? "axisLeft" : "axisBottom"
	const ref = useD3(el => D3.select(el).call(D3[fnName](scale).ticks(ticks)))
	return <g transform={`translate(${x}, ${y})`}  ref={ref}/>
 }



export default () => {
 
	//taille svg
	const height = 1000
	const width = 1000
		
	//parameters....Lineaire
	const xScale = D3.scaleLinear()  // definit une lligne
	.domain([0, 1000])
	.range([0, width])
	const yScale = D3.scaleLinear()
	.domain([0, 1000])
	.range([height, 0])

	//parameters....histograme  pour axe  abscisse e t  ordonneees
	 const x = D3.scaleBand()
	 .domain([0, 1000])
	 .range([0, width])					// definit  la taille des bandes de l histogramme	
//////////////////// accrochage useRef()	
    const d3Ref = useRef()
    const attachD3 = D3.select(d3Ref.current)
    console.log(d3Ref.current )
//////////////////// definition  bar    
const barChart = attachD3.selectAll('rect')
    .data(datasetBar)
    .enter()
    .append('rect')
    .attr('y', function(d) {
        return chartHeight - d -40
    })
    .attr('height', function(d) {
        return d;
    })
    .attr('width', barWidth -5)
    .attr('fill', 'red')
    .attr('transform', function (d, i) {
        var translate = [barWidth * i, 0];
        return 'translate('+ translate +')';
        }
    )
//////////////////////////////ajout text histogramme

const textIndice = attachD3.selectAll('.myText')
    .data(datasetBar)
    .enter()
    .append('text')
    .attr('width', barWidth -50)
    .attr('y', function(d) {
        return chartHeight - d +-50
        })
    .text(function(d){ return d})
    .attr('fill', 'white')
    .attr('transform', function (d, i) {
        var translate = [barWidth * i, 0]
        return 'translate('+ translate +')'
        }
    )


  return (
	<div style={{display:'flex', alignContent: 'center', justifyContent:'center', backgroundColor:'pink'}} >
     <svg width={width} height={height} ref={d3Ref}>

	  {dataset.map(( i) => {
		  return(
			<>	  
			<circle key = {i}  
         		cx={i[0].x +50 }
          		cy={i[0].y -40 }
          		r={4}
			 	fill="black"
			/>
			{console.log(i)}
			<circle cx={50} cy={0+height-40} r={15}  fill="yellow" />
			</>
		  )
	  }
	  )}
        {/* <text x="500" y="500">SVG Text Example</text> */}
		<Axis x={50} y={height - (40)} scale={xScale} axisType="bottom" />
		<Axis x={50} y={0-40} scale={yScale} axisType="left" /> 
    </svg>

	</div>
  )
}