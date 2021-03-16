import React, {useState, useEffect } from "react";
import firebase  from '../components/firebase'
import Img from 'gatsby-image'
import Box from '@material-ui/core/Box'
import Chart from '../components/d3weather'
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {useFetch} from './hook.js'
import SimpleCard from '../components/card/cardMedia'
import Button from  '@material-ui/core/Button' 
import axios from 'axios'
import GraphD3 from '../components/card/graphD3'


/////////////////// PARAMETRE REACT-QUERY
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
const queryClientD3 = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:5000    ,
    },
    mutations: {
      // mutation options
    },
  },
})



function Bourse2 (){

  const [currency, setCurrency] = useState("COP");
  const   queryData = ()=>{
    let baseUrl1  = "https://v6.exchangerate-api.com/v6/e5fe00153d7c5b11abc2237b/latest/"
    const url1 = baseUrl1 + currency
    const res = axios.get(url1)
    .then(resp => resp.data)
    return  res
  }
  
  const { isLoading, error, data, isFetching } = useQuery(currency,  queryData,  {
    refetchAllOnWindowFocus: false,
  })
  
   if (isLoading) return null;
  // if (isLoading) return "...Loading";
  if (error) return "An error has occurred: " + error.message;

  const devi = [ "USD", "EUR", "CHF", "CNY", "MUR", "MGA", "CAD" , "COP"]
  console.log(data)
  const newData =[]
  newData.push(data)

  return(
    <>
    {newData.map((id, node)=> {
        return(
          <div  key ={id} style={{textAlign: 'center'}}>
            <SimpleCard
              currency =  {id.base_code}
              time = {id.time_last_update_utc}
              conversionEUR ={id.conversion_rates.EUR}
              conversionUSD ={id.conversion_rates.USD}
              conversionCHF ={id.conversion_rates.CHF}
              conversionCNY ={id.conversion_rates.CNY}
              conversionMUR ={id.conversion_rates.MUR}
              conversionMGA ={id.conversion_rates.MGA}
              conversionCAD ={id.conversion_rates.CAD}
              conversionCOP ={id.conversion_rates.COP}
              >
            </SimpleCard>
           <Button size="large" variant="contained"
           style={{color: 'red', marginTop: '2em'}}
           onClick = {()=>setCurrency( devi[Math.floor(Math.random() * Math.floor(devi.length))])}
           >CHANGE {currency}
           </Button>

          </div>
        );
      })}
    </>
  );
}



export default function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Bourse2 />
    </QueryClientProvider>
    <QueryClientProvider client={queryClientD3}>
      <GraphD3 />
    </QueryClientProvider>
    </>
  )
}