import React, { Component } from 'react'
import axios from "axios";
import Global from '../Global';
import { NavLink } from 'react-router-dom';

export default class ModificarPersonajes extends Component {
    selectSerieRef = React.createRef();
    selectPersonajeRef = React.createRef();

    state = {
        series: [],
        statusSeries: false,
        personajes: [],
        statusPersonajes: false
    }

    loadSeries = () => {
        var request = "/api/Series";
        var url = Global.urlSeries + request;
        axios.get(url).then(response => {
            this.setState({
                series: response.data,
                statusSeries: true
            });
        });
    }

    loadPersonajes = () => {
        var request = "/api/Personajes";
        var url = Global.urlSeries + request;
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
                statusPersonajes: true
            });
        });
    }

    loadCambios = (e) => {
        e.preventDefault();
        var idSeries = this.selectSerieRef.current.value;
        console.log(idSeries);

        var idPersonajes = this.selectPersonajeRef.current.value;
        console.log(idPersonajes);

        var url1 = Global.urlSeries + "/api/Personajes/" + idPersonajes + "/" + idSeries
        axios.put(url1).then(res => {
            this.setState({
                statusUpdate: true,
                mensaje: "Personajes cambiados."
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
        this.loadPersonajes();
    }



    render() {
        return (
            <div>
                <h1 style={{ color: "blue" }}>Personajes y series</h1>
                <form>
                    <label>Seleccione una serie: </label>
                    <br />
                    {/* SELECT DE SERIES */}
                    <select ref={this.selectSerieRef}>
                        {this.state.statusSeries == true &&
                            this.state.series.map((series, index) => {
                                return (<option key={series.idSerie} value={series.idSerie}>
                                    {series.nombre}
                                </option>
                                
                                )
                            })
                        }
                    </select>
                    <br />
                    <label>Seleccione un personaje: </label>
                    <br />
                    {/* SELECT DE PERSONAJES */}
                    <select ref={this.selectPersonajeRef}>
                        {this.state.statusPersonajes == true &&
                            this.state.personajes.map((personajes, index) => {
                                return (<option key={personajes.idPersonaje} value={personajes.idPersonaje}>
                                    {personajes.nombre}
                                </option>)
                            })
                        }

                    </select>
                    <br />
                    <br />
                    <br />
                    <button onClick={this.loadCambios}>
                        Guardar cambios
                    </button>

                </form>
                <div >
                    
                    {   
                        this.state.statusSeries == true &&
                        this.state.series.map((serie,index)=>{
                            return(<img src={serie.imagen}>
                                    
                            </img>)
                        })

                    }
                    {   
                        this.state.statusPersonajes == true &&
                        this.state.personajes.map((personaje,index)=>{
                            return(<img src={personaje.imagen}>
                                    
                            </img>)
                        })

                    }

                </div>
                {
                    this.state.statusUpdate &&
                    <h2 style={{ color: "blue" }}>{this.state.mensaje}</h2>
                }
            </div>
        )
    }
}
