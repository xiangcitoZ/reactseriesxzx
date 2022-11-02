import React, { Component } from 'react'
import axios from "axios";
import Global from '../Global';
import { NavLink } from 'react-router-dom';
export default class Personajes extends Component {

    state = {
        personajes: [],
        status: false

    }

    loadPersonajes = () => {

        var request = "/api/Series/PersonajesSerie/" + this.props.idseries;
        console.log(request)
        var url = Global.urlSeries + request;

        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
                status: true
            });
        });
    }

    componentDidMount = () => {
        this.loadPersonajes();
    }

    render() {
        return (
            <div align='center' >
                <NavLink to={"/serie/"+ this.props.idseries } className="btn btn-danger">Volver</NavLink>
                <br />
                <table style ={{width :"600px"}} className='table table-bordered table-warning'>

                    <thead>
                        <tr>
                            <th>Personaje</th>
                            <th>Imagen</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.personajes.map((personajes, index) => {
                                return (<tr key={personajes.idPersonaje}>
                                    <td>{personajes.nombre}</td>
                                    <td><img  style ={{width :"200px"}} src={personajes.imagen} /></td>
                                    
                                </tr>)
                            })
                        }
                    </tbody>

                </table>

            </div>
        )
    }
}
