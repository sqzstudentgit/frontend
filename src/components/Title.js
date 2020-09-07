import React from 'react'


//exportat por defecto un componente funcional puro
//para eso creamos una funcion con un arrow function 
// que tiene como parametro las props y que devolvera el html segun esta el bulma

export const Title = ({children}) => (
    //esta linea html aqui se ha convertido en componente de React
    <h1 className="title"> {children} </h1>
)