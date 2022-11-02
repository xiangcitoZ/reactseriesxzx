import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

export default class NuevoPersonaje extends Component {
    cajaNombreRef= React.createRef();
    cajaImagenRef = React.createRef();
    selectedSerie= React.createRef();

    state = {
        mensaje:"",
        status: false,
        serie : [],
        statusSerie : false
    }

    cargarSerie = () =>{
        var request = "/api/Series";
        var url = Global.urlSeries + request
        axios.get(url).then(res => {
            this.setState({
                serie: res.data,
                statusSerie: true
            });
        });
    }
    componentDidMount = () => {
        this.cargarSerie();
        
    }

    insertarApuesta = (e) => {
        e.preventDefault();
        var request = "/api/Personajes";
        var url = Global.urlSeries+request;
        var nom = this.cajaNombreRef.current.value;
        var img= this.cajaImagenRef.current.value;
        var ser = parseInt(this.selectedSerie.current.value);
        console.log(ser)
        //REACT YA PERMITE DECLARAR OBJETOS CON FORMATO JSON
        //DECLARAMOS UN OBJETO CON LAS PROPIEDADES DEL API JSON
        var personaje = {
            nombre: nom,
            imagen: img,
            idSerie: ser
        };
        //EN axios EL METODO POST RECIBE DOS PARAMETROS
        // 1) URL DEL API
        // 2) OBJETO JSON PARA EL API
        axios.post(url,personaje).then(response =>{
            this.setState({
                status:true,
                mensaje:"Personaje insertado"
            })
        })

    }


  render() {
    return (
      <div>
        <h1 style={{color:"blue"}}>Nuevo personaje</h1>
        <form style={{width: "500px", margin: "0 auto"}}>
            <label>Nombre: </label>
            <input style={{textAlign:"center"}} type="text" className='form-control'
            ref={this.cajaNombreRef} required/><br/>
            <label>Imagen: </label>
            <input style={{textAlign:"center"}} type="text" className='form-control'
            ref={this.cajaImagenRef} required/><br/>
            <label>Serie: </label>
            <select style={{textAlign:"center"}} type="text" className='form-control'
            ref={this.selectedSerie} required>
                {this.state.statusSerie == true &&
                            this.state.serie.map((serie, index) => {
                                return (<option key={index} value={serie.idSerie}>
                                    {serie.nombre}
                                </option>)
                            })
                        }
            </select>
            
            <br/>

            <button className='btn btn-info' onClick={this.insertarApuesta}>
                Nueva Apuesta
            </button>
        
        </form>
        <h2 style={{color:"blue"}}>
            {this.state.mensaje}
        </h2>
      </div>
    )
  }
}
