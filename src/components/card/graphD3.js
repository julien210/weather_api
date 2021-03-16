import React from 'react'
import { useQuery } from "react-query";
import Box from '@material-ui/core/Box'
import Chart from '../d3weather'

const fetchData = async () => {
    let apiKey = process.env.GATSBY_WEATHER_API_KEY
    let   url = 'https://api.openweathermap.org/data/2.5/weather?units=metrics&lang=fr&lat=45.76&lon=4.83&appid='+apiKey
    const dd = fetch(`${url}`)
   .then(res=>(
     res.json()
    ))
    return dd
  }
  

function GraphD3 () {
    // const [newSpellName, setNewSpellName] = useState();
    const { isLoading, error, data } = useQuery("fetchData",  fetchData)
    if (isLoading) return null;
    if (error) return "An error has occurred: " + error.message;
    // const onCreate = () => {
    //   const db = firebase.firestore();
    //   db.collection("spells").add({ name:  newSpellName });
    // };
   
    const kelvin =273.15
    let tableauDataFinal = []
    tableauDataFinal.push(data)
    //  console.log(tableauDataFinal)
    return (
      <>   
        {tableauDataFinal.map((item, index)=>{ 
          return(
            <Box key ={index}>
              <Box  borderRight={1}  style={{minWidth:'40%', marginLeft:'4rem', marginTop: '2em'}}>
              <ul style = {{listStyle:'none'}}>
                <li>temperature: { (item.main.temp - kelvin).toFixed(2)} </li>
                <li>feels_like: {(item.main.feels_like- kelvin).toFixed(2)}</li>
                <li>temp_min : {(item.main.temp_min- kelvin).toFixed(2)}</li>
                <li>temp_max : {(item.main.temp_max - kelvin).toFixed(2)} </li>
                <li>pressure:  {item.main.pressure } </li>     
                <li>humidity:  {item.main.humidity} </li>  
                <li>visibility:  {item.visibility} </li> 
                <li> wind_speed : {item.wind.speed}</li>   
                <li> wind_de : {item.wind.deg}</li> 
                <li> main :{item.weather[0].main}</li>                  
              </ul>
            </Box>
            <Box m={2}>
            <Chart 
            temperature = {(item.main.temp - kelvin).toFixed(2)}
            feels_like = {item.main.feels_like}
            temp_min = {item.main.temp_min}
            temp_max = {item.main.temp_max} 
            pressure = {item.main.pressure} 
            humidity =  {item.main.humidity}
            visibility ={item.visibility}
            wind_speed ={item.wind.speed}
            wind_deg ={item.wind.deg}
            description ={item.weather[0].description}
            main ={item.weather[0].main}
            />
            </Box>
          </Box>
          )
        })}
        <Box  borderRight={1} style={{width: '10%', margin: 'auto', marginTop: '2em'}}>
        {data.main.feels_like}<br />
        {data.name}<br />
        {data.dt}
        </Box>
        {/* <ReactQueryDevtools/> */}
      </>
    )
  }
  export default  GraphD3