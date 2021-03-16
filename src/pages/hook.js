import { useState, useEffect } from "react";

function useFetch(url) {
  const [result, setData] = useState([]);
  const [loading, setLoading] = useState(true);
 
  async function fetchUrl() {
  
  // let headers = {
  //     "method": "GET",
  //     "headers": {
  //       "x-rapidapi-key": "0ffa70b232msh1c188d972a4a1efp1e0188jsnf259e11ccdd9",
  //       "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com"
  //   }
  // }

  // let config = {
  //   ...headers
  // }
  // const response = await fetch(url, config);
  
  const  response = await fetch (url) 
  const json = await response.json();
    setData(json);
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [result, loading];
}
export { useFetch };