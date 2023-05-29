import React, { useEffect } from "react";
import busquedaUsuario from "./apis/busquedaUsuario";

const fetchData = async () => {
  try {
    const respuesta = await busquedaUsuario.get("/");
    console.log(respuesta);
  } catch (err) {
    console.log(err);
  }
};

const App = () => {
  useEffect(() => {
    fetchData();
  },[]);
  return (<div>{}</div>);
}; export default App;
