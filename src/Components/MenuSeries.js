import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import Global from '../Global';
import logo from './../assets/images/logo.jpg'

export default class MenuSeries extends Component {

    state = {
        series: [],
        status: false
    }
    
    loadSeries = () =>{
        var request = "/api/Series";
        var url = Global.urlSeries + request;
        axios.get(url).then(response => {
          this.setState({
            series: response.data,
            status:true
          });
        });
    }

    componentDidMount = () =>{
        this.loadSeries();
      }


  render() {


    return (
      <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><img style ={{width :"200px"}}src={logo}></img></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/home">Home</NavLink>
                
              </li>
              
              <li className="nav-item">
                <NavLink className="nav-link active" to="/nuevopersonaje">Nuevo personaje</NavLink>
                
              </li>

              <li className="nav-item">
                <NavLink className="nav-link active" to="/personajesseries">Modificar personajes</NavLink>
                
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Series
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {
                        this.state.status == true &&
                        this.state.series.map((series,index)=>{
                        return(<li key={series.idSerie}>
                            <NavLink to={"/serie/" + series.idSerie} className="dropdown-item">
                            {series.nombre}
                            </NavLink>
                        </li>)
                        })
                    }
                </ul>
              </li>
              
            </ul>

          </div>
        </div>
      </nav>


      </div>
    )
  }
}
