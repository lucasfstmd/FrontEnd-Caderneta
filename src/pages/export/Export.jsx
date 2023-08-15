import React, { useEffect, useState } from "react";
import "./Export.css"
import Painel from "../../components/painel/Painel";
import RequestAuth from "../../service/auth/RequestAuth";
import { CSVLink } from "react-csv";

function Export() {
    // const [dataBase, setDataBase] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [familiares, setFamiliares] = useState([]);
    const [obitos, setObitos] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [polifarmacias, setPolifarmacias] = useState([]);
    const [diagnosticos, setDiagnosticos] = useState([]);
    const [antropometricos, setAntropometricos] = useState([]);
    const [cirurgias, setCirurgias] = useState([]);
    const [reacoes, setReacoes] = useState([]);
    const [pesos, setPesos] = useState([]);
    const [pesoPerdas, setPesoPerdas] = useState([]);
    const [vulnerabilidades, setVulnerabilidades] = useState([]);
    const [ambientais, setAmbientais] = useState([]);
    const [quedas, setQuedas] = useState([]);
    const [cronicas, setCronicas] = useState([]);
    const [intensidades, setIntensidades] = useState([]);
    const [habitos, setHabitos] = useState([]);
    const [controlePressao, setControlePressao] = useState([]);
    const [glicemia, setGlicemia] = useState([]);
    const [saudeBucal, setSaudeBucal] = useState([]);
    const [pcls, setPcls] = useState([]);
    const [forcaPreensao, setForcaPreensao] = useState([]);
    const [sppbs, setSppbs] = useState([]);
    const [ivcfs, setIvcfs] = useState([]);
    const [bioimpedancias, setBioimpedancias] = useState([]);
    const [examesLabo, setExameLabo] = useState([]);
    const [fragilidades, setFragilidades] = useState([]);
    const [frrisques, setFrrisques] = useState([]);

    useEffect(() => {
        const fetchData = async (url, setData) => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        }

        const url = 'http://localhost:8080/api'

        const fetchDataForExport = async () => {
            // await fetchData(`${url}/v1/database`, setDataBase);
            await fetchData(`${url}/v1/pacientes`, setPacientes);
            await fetchData(`${url}/v1/familiares`, setFamiliares);
            await fetchData(`${url}/v1/obitos`, setObitos);
            await fetchData(`${url}/v1/avaliacoes`, setMedicamentos);
            await fetchData(`${url}/v1/polifarmacias`, setPolifarmacias);
            await fetchData(`${url}/v1/diagnosticos`, setDiagnosticos);
            await fetchData(`${url}/v1/antropometricos`, setAntropometricos);
            await fetchData(`${url}/v1/cirurgias`, setCirurgias);
            await fetchData(`${url}/v1/reacoes`, setReacoes);
            await fetchData(`${url}/v1/pesos`, setPesos);
            await fetchData(`${url}/v1/peso-perdas`, setPesoPerdas);
            await fetchData(`${url}/v1/vulnerabilidades`, setVulnerabilidades);
            await fetchData(`${url}/v1/ambientais`, setAmbientais);
            await fetchData(`${url}/v1/quedas`, setQuedas);
            await fetchData(`${url}/v1/cronicas`, setCronicas);
            await fetchData(`${url}/v1/intensidades`, setIntensidades);
            await fetchData(`${url}/v1/habitos`, setHabitos);
            await fetchData(`${url}/v1/pressao-controles`, setControlePressao);
            await fetchData(`${url}/v1/glicemia-controles`, setGlicemia);
            await fetchData(`${url}/v1/bucal-saudes`, setSaudeBucal);
            await fetchData(`${url}/v1/pcls`, setPcls);
            await fetchData(`${url}/v1/preensao-forcas`, setForcaPreensao);
            await fetchData(`${url}/v1/sppbs`, setSppbs);
            await fetchData(`${url}/v1/ivcfs`, setIvcfs);
            await fetchData(`${url}/v1/bioimpedancias`, setBioimpedancias);
            await fetchData(`${url}/v1/laboratorial-exames`, setExameLabo);
            await fetchData(`${url}/v1/fragilidades`, setFragilidades);
            await fetchData(`${url}/v1/frrisques`, setFrrisques);

        };

        fetchDataForExport();
    }, []);


    const build = (array,field, patient_id) =>{
        return array
            .filter(item => item.paciente_id === patient_id)
            .map((item) =>{
                return {
                    ...item
                }
            })
            .reduce((accumulated, current,index)=>{
                const obj = {}
                Object.keys(current).forEach(key=>{
                    if(key !== 'paciente_id'){
                        obj[`${field}_${index+1}_${key}`] = current[key]
                    }
                })
                return {
                    ...accumulated,
                    ...obj
                }
            },{})
    }

    const result = pacientes.map(patient => {
        const familiar = build(familiares,'familiar', patient.id);
        const obito = build(obitos,'exame',patient.id);
        const medicamento = build(medicamentos, "medicamentos", patient.id);
        const polifarmacia = build(polifarmacias, "polifarmacias", patient.id);
        const diagnostico = build(diagnosticos, "diagnosticos", patient.id);
        const antropometrico = build(antropometricos, "antropometricos", patient.id);
        const cirurgia = build(cirurgias, "cirurgias", patient.id);
        const reacao = build(reacoes, "reacoes", patient.id);
        const peso = build(pesos, "pesos", patient.id);
        const pesoPerda = build(pesoPerdas, "peso-perdas", patient.id);
        const vulnerabilidade = build(vulnerabilidades, "vulnerabilidades", patient.id);
        const ambiental = build(ambientais, "ambientais", patient.id);
        const queda = build(quedas, "quedas", patient.id);
        const cronica = build(cronicas, "cronicas", patient.id);
        const intensidade = build(intensidades, "intensidades", patient.id);
        const habito = build(habitos, "habitos", patient.id);
        const controlesPressao = build(controlePressao, "controlePressao", patient.id);
        const glicemias = build(glicemia, "glicemia", patient.id);
        const saudeBuca = build(saudeBucal, "saudeBucal", patient.id);
        const pcl = build(pcls, "pcls", patient.id);
        const forcasPreensao = build(forcaPreensao, "forcaPreensao", patient.id);
        const sppb = build(sppbs, "sppbs", patient.id);
        const ivcf = build(ivcfs, "ivcfs", patient.id);
        const bioimpedancia = build(bioimpedancias, "bioimpedancias", patient.id);
        const exameLabo = build(examesLabo, "exames-laboratoriais", patient.id);
        const fragilidade = build(fragilidades, "fragilidades", patient.id);
        const frrisque = build(frrisques, "frrisques", patient.id);

        return {
            ...patient,
            ...familiar,
            ...obito,
            ...medicamento,
            ...polifarmacia,
            ...diagnostico,
            ...antropometrico,
            ...cirurgia,
            ...reacao,
            ...peso,
            ...pesoPerda,
            ...vulnerabilidade,
            ...ambiental,
            ...queda,
            ...cronica,
            ...intensidade,
            ...habito,
            ...controlesPressao,
            ...glicemias,
            ...saudeBuca,
            ...pcl,
            ...forcasPreensao,
            ...sppb,
            ...ivcf,
            ...bioimpedancia,
            ...exameLabo,
            ...fragilidade,
            ...frrisque
        }
    })


    return (
        <RequestAuth>
            <div className="Export">
                <Painel titulo="Exportar Dados">
                    <ul>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh" }} data={result} filename="banco_de_dados.csv">
                                <strong>Banco de Dados</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh" }} data={pacientes} filename="pacientes.csv">
                                <strong>Pacientes</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh" }} data={familiares} filename="familiares.csv">
                                <strong>Familiares</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh" }} data={obitos} filename="obitos.csv">
                                <strong>Óbitos</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={medicamentos} filename="medicamentos.csv">
                                <strong>Medicamentos</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={polifarmacias} filename="polifarmacias.csv">
                                <strong>Polifarmacias</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={diagnosticos} filename="diagnosticos.csv">
                                <strong>Diagnosticos</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={antropometricos} filename="antropometricos.csv">
                                <strong>Antropométricos</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={cirurgias} filename="cirurgias.csv">
                                <strong>Cirurgias</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={reacoes} filename="reacoes.csv">
                                <strong>Reações</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={pesos} filename="pesos.csv">
                                <strong>Pesos</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={pesoPerdas} filename="peso-perdas.csv">
                                <strong>Peso Perdas</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={vulnerabilidades} filename="vulnerabilidades.csv">
                                <strong>Vulnerabilidades</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={ambientais} filename="ambientais.csv">
                                <strong>Ambientais</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={quedas} filename="quedas.csv">
                                <strong>Quedas</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={cronicas} filename="cronicas.csv">
                                <strong>Crônicas</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={intensidades} filename="intensidades.csv">
                                <strong>Intensidades</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={habitos} filename="habitos.csv">
                                <strong>Hábitos</strong>
                            </CSVLink>
                        </li>
                    </ul>
                    <div className="Titulo">
                        Outras Avaliações
                    </div>
                    <ul>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={controlePressao} filename="controlePressao.csv">
                                <strong>Controle de Pressão Arterial</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={glicemia} filename="glicemia.csv">
                                <strong>Controle de Glicemia</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={saudeBucal} filename="saudeBucal.csv">
                                <strong>Avaliação Saúde Bucal</strong>
                            </CSVLink>
                        </li>
                    </ul>
                    <div className="Titulo">
                        Adicionais
                    </div>
                    <ul>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={pcls} filename="pcl.csv">
                                <strong>Prova Cognitiva de Leganés (PCL)</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={forcaPreensao} filename="forcaPreensao.csv">
                                <strong>Força de Preensão</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={sppbs} filename="sppb.csv">
                                <strong>Short Physucal Performance Battery (SPPB)</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={ivcfs} filename="ivcf.csv">
                                <strong>Índice de Vulnerabilidade Vlínico-Funcional-20 (IVCF-20)</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={bioimpedancias} filename="bioimpedancia.csv">
                                <strong>Bioimpedância</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={examesLabo} filename="examesLaboratoriais.csv">
                                <strong>Exames Laboratoriais</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={fragilidades} filename="fragilidades.csv">
                                <strong>Fragilidades</strong>
                            </CSVLink>
                        </li>
                        <li>
                            <CSVLink style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh"  }} data={frrisques} filename="frrisques.csv">
                                <strong>Frrisque</strong>
                            </CSVLink>
                        </li>
                    </ul>
                </Painel>
            </div>
        </RequestAuth>
    );
}

export default Export;
