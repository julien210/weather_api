import React, {  useRef } from "react"
import * as D3 from "d3"
import axios from 'axios'
import Box from '@material-ui/core/Box'
import { QueryClient, QueryClientProvider, useQuery } from "react-query";


const queryClient = new QueryClient({
   defaultOptions: {
     queries: {
       staleTime: 1000    ,
     },
     mutations: {
       // mutation options
     },
   },
 })

const  dataset  = Array.from({length: 56}, () => Math.floor(Math.random() * 56))
const newda = dataset.map((k, i)=>( [i, k]))
//console.log(newda)



const  ChartBourse = () => {

const d3Ref = useRef()  //  library  useRef from react
const attachD3 = D3.select(d3Ref.current)
///////////////////DATA
const  config = {
   cors:false   
}
const   queryDataBourse = ()=>{
    let url  = "https://api.blockchain.com/v3/exchange/tickers"
    const res = axios.get(url, config)
    .then(resp => resp.data)
    return  res
}
const { isLoading, error, data, isFetching } = useQuery("bourseData",  queryDataBourse,  {
    refetchAllOnWindowFocus: false,
})
if (isLoading) return null;
// if (isLoading) return "...Loading";
if (error) return  "An error has occurred: " + error.message;

const datasetBourse =[]
datasetBourse.push(data)
console.log(datasetBourse[0])
//console.log(Math.max(...datasetBourse[0]));


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
////////////................definition des Lignes


//////////// .................definition des axes
 const xScale = D3.scaleLinear()
 .domain([0,datasetBourse[0].length])
 .range([0, (constante[4])])           
 const yScale = D3.scaleLinear()
    .domain([0, D3.max(dataset)])
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
//////............................ DEFINITION  HISTOGRAMME
const xScaleRect = D3.scaleLinear()        // echelle x largeur divise par nbre de donnee
    .domain([0, datasetBourse[0].length])
    .range([0, constante[4]]);
const yScaleRect = D3.scaleLinear()
   .domain([0, D3.max(datasetBourse)])        // on definit  le max valeur datasetBourse et ca sera 100% hauteur
   .range([0, constante[5]]);
const rect = attachD3.selectAll('rect')
   .data(datasetBourse)
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
   .data(datasetBourse)
   .enter()
   .append('text')                        // on ajoute l element text
   .attr('x', (d,i) => xScaleRect(i)+constante[6]  )    //  meme chose que rectangle !
   .attr('y',(d) => constante[5]-yScaleRect(d)+10)         //   meme chose que rectangle  + un delta=10!
   .attr('fill', 'yellow')
   .text(function(id) { return 'data:' + id; })  // on rajoute  le string"section" a text
   .exit()
let x = constante[6]
let y = constante[5]
const valeurPointY = constante[5]/10
const valeurPointX = constante[4]/datasetBourse[0].length

return (      
   <Box  m={5}>  
   <svg width={constante[2]} height={constante[3]} ref={d3Ref} 
   style={{backgroundColor:'gray', display: 'inline-block', opacity:'0.8'}}>

      <g id='g0' ref={Left} ></g>
      <g id='g1' ref={Bottom} ></g> 
      <circle cx={0+x} cy= {0+y}  r="10" fill='red'/>   
      <circle cx={x+(2*valeurPointX) } cy= {y-(50 *valeurPointY)}  r="10" fill='black'/>          
     
   </svg>
   </Box>      
   )   
}

export default function AppBourse() {
   return (
     <QueryClientProvider client={queryClient}>
       <ChartBourse />
     </QueryClientProvider>
   )
 }
