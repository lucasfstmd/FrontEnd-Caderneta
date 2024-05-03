import React, { useEffect, useState } from "react";
import "./Inicio.css";

import PainelFicha from "../../../../../components/painelFicha/PainelFicha";

import api from "../../../../../service/api";

import { Chart } from "react-google-charts";
import Loading from "../../../../../components/loading/Loading";
import { useParams } from 'react-router-dom'
import antropometricos from '../avaliacoes/antropometricos/Antropometricos'

function Inicio(props) {
    const params = useParams()
    const { id } = params
    const [antropometricos, setAntropometricos] = useState([]);
    const [controlePressao, setControlePressao] = useState([]);
    const [glicemia, setGlicemia] = useState([]);
    const [dataPeso, setDataPeso] = useState([["Ano", "Peso"]]);
    const [dataPressao, setDataPressao] = useState([["Data", "Pressão"]]);
    const [dataGlicemia, setDataGlicemia] = useState([["Data", "Glicemia"]]);
    const [dataPanturrilha, setDataPanturrilha] = useState([["Data", "Perimetro"]]);
    const [loadingPeso, setLoadingPeso] = useState(true)
    const [loadingPressao, setLoadingPressao] = useState(true)
    const [loadingGlicemia, setLoadingGlicemia] = useState(true)

    async function carregarAntropometricos() {
        try {
            const response = await api.get(`v1/antropometricos/paciente/${id}`);
            setAntropometricos(response.data);
            setLoadingPeso(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    async function carregarPressao() {
        try {
            const response = await api.get(
                `v1/pressao-controles/paciente/${id}`
            );
            setControlePressao(response.data);
            setLoadingPressao(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    async function carregarGlicemia() {
        try {
            const response = await api.get(
                `v1/glicemia-controles/paciente/${id}`
            );
            setGlicemia(response.data);
            setLoadingGlicemia(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarAntropometricos();
        carregarPressao();
        carregarGlicemia();
    }, [id]);

    useEffect(() => {
        if (antropometricos.length !== 0) {
            const dataPointsPeso = antropometricos.map((item) => [item.ano, item.peso]);
            const dataPointsPanturrilha = antropometricos.map((item) => [item.ano, item.perimetro_panturrilha]);
            const dataCopyPanturrilha = [["Ano", "Perimetro"], ...dataPointsPanturrilha];
            const dataCopyPeso = [["Ano", "Peso"], ...dataPointsPeso];
            setDataPeso(dataCopyPeso);
            setDataPanturrilha(dataCopyPanturrilha)
        }
        if (controlePressao.length !== 0) {
            const dataPointPressao = controlePressao.map((item) => [item.data, item.pressao])
            const dataCopyPressao = [["Data", "Pressão"], ...dataPointPressao];
            setDataPressao(dataCopyPressao)
        }
        if (glicemia.length !== 0) {
            const dataPointGlicemia = glicemia.map((item) => [item.data, item.valor])
            const dataCopyGlicemia = [["Data", "Glicemia"], ...dataPointGlicemia];
            setDataGlicemia(dataCopyGlicemia)
        }
    }, [antropometricos, controlePressao, glicemia]);


    const optionsPeso = {
        chart: {
            title: "Medições de Peso",
            subtitle: "Pesos por ano",
        },
    }
    const optionsPressao = {
        chart: {
            title: "Controle de Pressão",
            subtitle: "Medições de Pressão",
        },
    }
    const optionsGlicemia = {
        chart: {
            title: "Controle de Glicemia",
            subtitle: "Medições de Glicemia",
        },
    }
    const optionsPanturrilha = {
        chart: {
            title: "Perimetro da Panturrilha",
            subtitle: "Medições de Panturrilha",
        },
    }


    return (
        <div className="Inicio">
            <PainelFicha titulo="Inicio" botaoNew={false}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                    {antropometricos !== 0 && (
                        <>
                            <div className="GraficoPeso">
                                <Loading loading={loadingPeso}>
                                    <Chart chartType="Bar" data={dataPeso} options={optionsPeso} width="50vh"
                                           height="400px"/>
                                </Loading>
                            </div>
                            <div className="GraficoPeso">
                                <Loading loading={loadingPeso}>
                                    <Chart chartType="Bar" data={dataPanturrilha} options={optionsPanturrilha}
                                           width="50vh"
                                           height="400px"/>
                                </Loading>
                            </div>
                        </>
                    )}
                    {glicemia.length !== 0 && (
                        <div className="GraficoPeso">
                            <Loading loading={loadingGlicemia}>
                                <Chart chartType="Bar" data={dataGlicemia} options={optionsGlicemia} width="50vh"
                                       height="400px"/>
                            </Loading>
                        </div>
                    )}
                    {controlePressao.length !== 0 && (
                        <div className="GraficoPeso">
                            <Loading loading={loadingPressao}>
                                <Chart chartType="Bar" data={dataPressao} options={optionsPressao} width="50vh"
                                       height="400px"/>
                            </Loading>
                        </div>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Inicio;
