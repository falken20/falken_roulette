import React from 'react'
//import ruleta from '../img/wheel.png'
import './index.css';

const Premios = (props) => (

    <div>
        <p align="center">
            {/* <button onClick={props.shopPremio.bind(this, props.indice)} className="btn btn-info btn-lg btn-block">{props.data.premio} - $ {props.data.precio}</button> */}
            <center>
            <label class="label-teams">{props.data.cat}</label>
            </center>
        </p>
    </div>

)

export default Premios