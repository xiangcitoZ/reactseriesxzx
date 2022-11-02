import React, { Component } from 'react'
import axios from "axios";
import Global from '../Global';
import { NavLink } from 'react-router-dom';



export default class DetallesSeries extends Component {

    state = {
        series:{},
        status:false
    }

    //CARGAR LA SERIE
    loadSeries = () =>{
        var id = this.props.idseries;
        console.log(id);

        var request = "/api/Series/" + id;
        var url = Global.urlSeries + request;
        console.log(url);
        axios.get(url).then(response =>{
            this.setState({
                series: response.data,
                status:true
            });
        });

    }

    //PARA ACTUALIZAR LA PAGINA LA SERIE AL CAMBIAR 
    componentDidUpdate = (oldProps) =>{
        if(oldProps.idseries != this.props.idseries)
        {
            this.loadSeries();
        }
    }

    componentDidMount = () => {
        this.loadSeries();
    }

  render() {

    return (
      <div>

        <img style ={{width :"500px"}} src={this.state.series.imagen}/>
        <br/>
        <h1>{this.state.series.nombre}</h1>
        <br/>

        <h1>IMDB: {this.state.series.puntuacion}</h1>
        <br/>
        <br/>
        
        <NavLink to={"/personajes/"+this.props.idseries} className="btn btn-success">Personajes</NavLink>

      </div>
    )
  }
}
