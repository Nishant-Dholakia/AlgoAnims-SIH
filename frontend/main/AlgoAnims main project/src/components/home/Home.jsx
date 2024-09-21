import React, { useEffect } from "react";

export default function Home() {
    useEffect(()=>{
      async function main() {
        const api = await fetch("http://localhost:3000/home");
        const data = await api.json();
        console.log(data);
      }
      main();
    } , [])
  return (
    <>
      
    </>
  );
}
