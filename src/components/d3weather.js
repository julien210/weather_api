import React, { createElement, useRef } from "react"
import * as D3 from "d3"
import Box from '@material-ui/core/Box'


const  Chart = ({temperature, feels_like, temp_min, temp_max}) => {

const d3Ref = useRef()  //  library  useRef from react
const attachD3 = D3.select(d3Ref.current)

///////////////////DATA
const datasetBar=[]
//console.log(temperature, feels_like, temp_min, temp_max)
datasetBar.push(temperature, feels_like, temp_min, temp_max)
console.log(datasetBar)
console.log(Math.max(...datasetBar));
const  max= Math.max(...datasetBar)

//.......................................................//
//IMPORTANT/ SI  ON MET UN POURCENTAGE DS LA TAILLE DE SVG CA LE MET DANS  LA BALISE <FOOTER>
//DONC METTRE DES PX OU  DES EM  POUR ETRE  SUR  DDE LE METRRE DANS LA BALISE  DIV DE GATSBY 
//.......................................................//


const Constantes = (largeur, hauteur)=>{
   let constantes=[]
   let widthPage = Math.round(window.innerWidth)
   let heightPage = Math.round(window.innerHeight)
   let widthSVG =  Math.round(largeur * window.innerWidth)
   let heightSVG = Math.round(hauteur *  window.innerHeight)
   let widthIntSVG =  Math.round(largeur * window.innerWidth - 0.04*window.innerWidth)
   let heightIntSVG =  Math.round(hauteur * window.innerHeight - 0.04*window.innerHeight)
   let abscisseX = Math.round(widthSVG -widthIntSVG)
   let abscisseY = Math.round(heightSVG -heightIntSVG)
   constantes.push(  widthPage ,heightPage,  
                     widthSVG , heightSVG, widthIntSVG,heightIntSVG,
                     abscisseX , abscisseY )
   return constantes
}

const  constante  = Constantes(0.8, 0.5)


//////////// .................definition des axes
 
 const xScale = D3.scaleLinear()
 .domain([0,datasetBar.length])
 .range([0, (constante[4])])           
 const yScale = D3.scaleLinear()
    .domain([0, D3.max(datasetBar)])
   //  identique// .domain([0, max])
    .range([constante[5], 0]);  
 const x_axis = D3.axisBottom()
    .scale(xScale)         
 const y_axis = D3.axisLeft()
    .scale(yScale)
         
////////////definir  deux  g avec 2 id d,ifferent  et  les fourrer  avec d es data

const  Bottom= ()=>{
 let x  = attachD3.select('#g1')  
 .call(x_axis ) 
 .attr('stroke','white')
 .attr('fill', 'white')
 .attr("transform", `translate( ${constante[6]}, ${constante[5]} )`)
 }

const  Left = ()=>{
 let y  = attachD3.select('#g0')
 .call(y_axis)
 .attr('stroke','white')
 .attr('fill', 'white')
 .attr("transform", `translate(${constante[6]}, 0)`)
}



// (function Remove (){
//    attachD3.selectAll('rect').remove();
// })()






















const xScaleRect = D3.scaleLinear()        // echelle x largeur divise par nbre de donnee
    .domain([0, datasetBar.length])
    .range([0, constante[4]]);

const yScaleRect = D3.scaleLinear()
   .domain([0, D3.max(datasetBar)])        // on definit  le max valeur datasetBar et ca sera 100% hauteur
   .range([0, constante[5]]);

const rect = attachD3.selectAll('rect')
   .data(datasetBar)
   .enter()
   .append('rect')
   .attr('x', (d,i) => xScaleRect(i)+constante[6]  )                      // on passe par une fonction pour  diviser par nbre bar                       // definit  la  largeur des bandes 20  dc  espace  puisque  (25-20)
   .attr('width', xScaleRect(0.9))
   .attr('height', (d) => yScaleRect(d))
   .attr('y', (d) => constante[5]-yScaleRect(d))    // pas de decalagepour le bas et voir axisBottom
   .attr('stroke', 'pink')
   .attr('opacity', '0.5')
         // .exit()

 //// ASTUCE  SI  ON  MET TEXT APRES BAR ON ECRIT DESSUS  
const bar = attachD3.selectAll('text')  // a select  text tous les text
   .data(datasetBar)
   .enter()
   .append('text')                        // on ajoute l element text
   .attr('x', (d,i) => xScaleRect(i)+constante[6]  )    //  meme chose que rectangle !
   .attr('y',(d) => constante[5]-yScaleRect(d)+10)         //   meme chose que rectangle  + un delta=10!
   .attr('fill', 'yellow')
   .text(function(id) { return 'data:' + id; })  // on rajoute  le string"section" a text
   .exit()

let x = constante[6]
let y = constante[5]
const valeurPointY = constante[5]/temp_max
const valeurPointX = constante[4]/datasetBar.length

return (      
   <Box  m={5}>  
   <svg width={constante[2]} height={constante[3]} ref={d3Ref} 
   style={{backgroundColor:'gray', display: 'inline-block', opacity:'0.8'}}>

      <g id='g0' ref={Left} ></g>
      <g id='g1' ref={Bottom} ></g> 
      <circle cx={0+x} cy= {0+y}  r="10" fill='red'/>   
      <circle cx={x+(2*valeurPointX) } cy= {y-(50 *valeurPointY)}  r="10" fill='black'/>          
      {/* <circle id ='idC' cx={temperature} cy= {temperature}  r="4" fill='red'/>        */}
   </svg>
   </Box>      
   )   
}
export  default Chart

