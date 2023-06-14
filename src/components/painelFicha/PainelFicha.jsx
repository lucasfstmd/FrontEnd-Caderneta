import React from "react";
import "./PainelFicha.css"
import {AiOutlineUserAdd} from "react-icons/ai";

const PainelFicha = (props) => (
    <div className="PainelFicha">
        <div className="Header">
            <div className="Titulo">
                <strong>{props.titulo}</strong>
                {props.botaoNew ? (
                    <button className="BotaoFicha" onClick={props.onAdicionarClick}><AiOutlineUserAdd style={{marginRight: "0.5vh"}}/>Novo</button>
                ) : (
                    " "
                )}
            </div>
        </div>
        <div className="ContentPainelFicha">{props.children}</div>
    </div>
);


export default PainelFicha;