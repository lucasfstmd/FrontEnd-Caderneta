import React, { useState } from "react";
import "./Pacientes.css";

import Filtro from "./filtro/Filtro";
import ListaPacientes from "./listaPacientes/ListaPacientes";
import RequestAuth from "../../../service/auth/RequestAuth";

const Pacientes = () => {

    const [nomePesquisado, setNomePesquisado] = useState("");
    const [ubsSelecionada, setUbsSelecionada] = useState("");

    const handleBuscar = (nome) => {
        setNomePesquisado(nome);
    };

    const handleUbsSelecionada = (ubs) => {
        setUbsSelecionada(ubs);
    };

    return (
        <div className="Paciente">
            <RequestAuth>
                <Filtro onBuscar={handleBuscar} onUbsSelecionada={handleUbsSelecionada} />
                <ListaPacientes nomePesquisado={nomePesquisado} ubsSelecionada={ubsSelecionada} />
            </RequestAuth>
        </div>
    );
};

export default Pacientes;
