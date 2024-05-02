import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Ficha.css";

import MenuFicha from "./menuFicha/MenuFicha";
import ContentFicha from "./contentFicha/ContentFicha";

import api from "../../../service/api";

import { format } from "date-fns";
import RequestAuth from "../../../service/auth/RequestAuth";

const Ficha = () => {
    const { id } = useParams();

    const [paciente, setPaciente] = useState(null);

    useEffect(() => {
        async function fetchPaciente() {
            try {
                const response = await api.get(`v1/pacientes/${id}`);
                setPaciente(response.data);
            } catch (error) {
                console.log(undefined)
            }
        }

        fetchPaciente();
    }, [id]);


    if (!paciente) {
        return <div>Carregando...</div>;
    }

    const formattedDate = format(new Date(paciente.created), "dd/MM/yyyy");

    return (
        <RequestAuth>
            <div className="Ficha">
                <div className="InformacoesPessoais">
                    <div className="Nome">
                        <strong>{paciente.nome}</strong>
                    </div>
                    <div className="FichaPessoal">
                        Data de Cadastro: {formattedDate}
                    </div>
                </div>
                <div className="ConteudoFicha">
                    <MenuFicha />
                    <ContentFicha
                        pacienteId={paciente.id}
                    />
                </div>
            </div>
        </RequestAuth>
    );
};

export default Ficha;
