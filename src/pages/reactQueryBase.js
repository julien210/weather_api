import React from "react";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
//import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example () {
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    fetch(
      "http://swapi.dev/api/planets/"
    ).then((res) => res.json())
  )

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data.results.map(item=>{
        return(
          <div key ={item.name}>
          {item.name}
          </div>
        )
      })}
      poipoi
    </div>
  )
}

