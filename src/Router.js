import React, { Component } from 'react'
import {Route,BrowserRouter, Routes} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import MenuSeries from './Components/MenuSeries'
import Home from './Components/Home'
import DetallesSeries from './Components/DetallesSeries'
import Personajes from './Components/Personajes'
import NuevoPersonaje from './Components/NuevoPersonaje'
import ModificarPersonajes from './Components/ModificarPersonajes'

export default class Router extends Component {
  render() {

    function DetallesSeriesElement(){
        var {idseries} = useParams();
        
        return(
          <DetallesSeries idseries={idseries} />
        );
  
      }

      function PersonajesElement(){
        var {idseries} = useParams();
  
        return(
          <Personajes idseries={idseries} />
        );
      }

    return (
      <div>
        <BrowserRouter>
            <MenuSeries/>
            <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/serie/:idseries' element={<DetallesSeriesElement/>} />
            <Route path='/personajes/:idseries' element={<PersonajesElement/>}/>
            <Route path='/nuevopersonaje/' element={<NuevoPersonaje/>}/>
            <Route path='/personajesseries/' element={<ModificarPersonajes/>}/>

            
            </Routes>

        </BrowserRouter>


      </div>
    )
  }
}
