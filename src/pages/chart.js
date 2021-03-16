import React from 'react'
import { Doughnut } from '@reactchartjs/react-chart.js'
import { Pie } from '@reactchartjs/react-chart.js'
import { Line } from '@reactchartjs/react-chart.js'
import { Radar } from '@reactchartjs/react-chart.js'

import axios from 'axios'
import Box from '@material-ui/core/Box'
import { QueryClient, QueryClientProvider, useQuery } from "react-query";


const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 100,
      },
      mutations: {
        // mutation options
      },
    },
})




function Doug() {

    
const   queryDataBourse = ()=>{
    let url  = "https://api.blockchain.com/v3/exchange/tickers"
    const res = axios.get(url)
    .then(resp => resp.data)
    return  res
}
const { isLoading, error, data, isFetching } = useQuery("bourseData",  queryDataBourse,  {
    refetchAllOnWindowFocus: false,
})

if (isLoading) return "...Loading";
if (error) return  "An error has occurred: " + error.message;

//k.symbol+ k.price_24h+k.volume_24h+k.last_trade_price 
const color = data.map((k, i)=>{
                let rand = () => Math.floor(Math.random() * 255)
                return( 'rgba('+[rand(),rand(),rand(), 0.5]+')' )
            })
const borderColor= data.map((k, i)=>{
                let rand = () => Math.floor(Math.random() * 255)
                return( 'rgba('+[100,0,rand(), 1]+')' )
            })
const labels =  data.map (k=>( k.symbol ))
const num =  data.map (k=>( k.price_24h))
const volume =  data.map (k=>( k.volume_24h))
const trade =  data.map (k=>( k.last_trade_price))

const  datasetPrice =    [{label: '#cours', data:  num,  backgroundColor: color, borderColor:borderColor}]
const dataFinalPrice =    {labels: labels, datasets: datasetPrice}

const  datasetVolume =    [{label: '#volume', data:  volume,  backgroundColor: color, borderColor:borderColor}]
const dataFinalVolume =    {labels: labels, datasets: datasetVolume}


return(
  <>
   <Doughnut data={dataFinalPrice} />
   <Pie data={dataFinalVolume} />
   <Line data={dataFinalPrice}/>
   <Radar data={dataFinalVolume}/>
  </>
)
}

export default function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <Doug/>
      </QueryClientProvider>
    );
  }