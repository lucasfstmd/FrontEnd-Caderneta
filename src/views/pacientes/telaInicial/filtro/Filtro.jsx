import React, { useState, useEffect } from "react";
import "./Filtro.css";

import Painel from "../../../../components/painel/Painel";

import api from "../../../../service/api";

function Filtro(props) {
    const [nome, setNome] = useState("");
    const [ubsSelecionada, setUbsSelecionada] = useState("");
    const [ubs, setUbs] = useState([]);

    useEffect(() => {
        async function carregarUbs() {
            try {
                const response = await api.get("v1/ubs");
                setUbs(response.data);
            } catch (error) {
                console.log(error)
            }

        }

        carregarUbs();
    }, []);

    const handleChangeBuscarNome = (e) => {
        setNome(e.target.value);
    };

    const realizarBuscaNome = () => {
        props.onBuscar(nome);
    };

    const handleChangeUbsSelecionada = (e) => {
        const ubsSelecionada = e.target.value;
        setUbsSelecionada(ubsSelecionada);
        props.onUbsSelecionada(ubsSelecionada);
    };

    return (
        <div className="Filtro">
            <Painel titulo={"Filtro de Pacientes"}>
                <div className="LabelInput">
                    <label id="IdLabel">
                        <strong>Nome: </strong>
                    </label>
                    <input
                        type="text"
                        id="inputFiltro"
                        value={nome}
                        onChange={handleChangeBuscarNome}
                    />
                </div>
                <div className="LabelInput">
                    <label id="IdLabel">
                        <strong>UBS: </strong>
                    </label>
                    <select
                        value={ubsSelecionada}
                        onChange={handleChangeUbsSelecionada}
                        id="selectFiltro"
                    >
                        <option value="">Selecionar</option>
                        {ubs.map((ubs, index) => (
                            <option key={index} value={ubs.nome}>
                                {ubs.nome}
                            </option>
                        ))}
                    </select>

                </div>
                <div className="Butao">
                    <button onClick={realizarBuscaNome}>Buscar</button>
                </div>
            </Painel>
        </div>
    );
}

export default Filtro;
