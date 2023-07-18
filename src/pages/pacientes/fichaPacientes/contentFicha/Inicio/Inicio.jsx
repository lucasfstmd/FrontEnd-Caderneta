import React, { useEffect, useState } from "react";
import "./Inicio.css";

import PainelFicha from "../../../../../components/painelFicha/PainelFicha";

import api from "../../../../../service/api";

import { Chart } from "react-google-charts";

function Inicio(props) {
    const [pesoPaciente, setPesoPaciente] = useState([]);
    const [data, setData] = useState([["Ano", "Peso"]]);

    useEffect(() => {
        async function carregarPeso() {
            try {
                const response = await api.get(`v1/pesos/paciente/${props.pacienteId}`);
                setPesoPaciente(response.data);
            } catch (error) {
                console.error("Erro ao carregar o peso do paciente:", error);
            }
        }

        carregarPeso();
    }, [props.pacienteId]);

    useEffect(() => {
        const dataPoints = pesoPaciente.map((item) => [item.ano.toString(), item.peso]);
        const dataCopy = [["Ano", "Peso"], ...dataPoints];
        setData(dataCopy);
    }, [pesoPaciente]);


    const options = {
        chart: {
            title: "Medições de Peso",
            subtitle: "Pesos por ano",
        },
    }

    return (
        <div className="Inicio">
            <PainelFicha titulo="Inicio" botaoNew={false}>
                <div className="GraficoPeso">
                    <Chart chartType="Bar" data={data} options={options} width="50vh" height="400px" />
                </div>
            </PainelFicha>
        </div>
    );
}

export default Inicio;
