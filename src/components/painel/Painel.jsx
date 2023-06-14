import React from 'react'
import './Painel.css'

const Painel = (props) => (
    <div className="Container">
        <div className="Titulo">
            <h1>{props.titulo}</h1>
            <hr/>
        </div>
        <div className="Conteudo">
            {props.children}
        </div>
    </div>
)

export default Painel;