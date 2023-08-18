import React, {useEffect, useState} from "react";
import "./Export.css"
import Painel from "../../components/painel/Painel";
import RequestAuth from "../../service/auth/RequestAuth";
import ExportDialog from "../../components/exportDialog/ExportDialog";
import Link from '@mui/material/Link';
import ExportDataBase from "../../components/exportDataBase/ExportDataBase";

function Export() {

    const url = 'http://localhost:8080/api'

    const [pacientes, setPacientes] = useState([]);
    const [loadingPacientes, setLoadingPacientes] = useState(true);
    const getPacientes = async () => {
        const response = await fetch(`${url}/v1/pacientes`);
        const data = await response.json();
        setPacientes(data);
        setLoadingPacientes(false);
    }

    const [familiares, setFamiliares] = useState([]);
    const [loadingFamiliares, setLoadingFamiliares] = useState(true);

    const getFamiliares = async () => {
        const response = await fetch(`${url}/v1/familiares`);
        const data = await response.json();
        setFamiliares(data);
        setLoadingFamiliares(false);
    }

    const [obitos, setObitos] = useState([]);
    const [loadingObitos, setLoadingObitos] = useState(true);

    const getObitos = async () => {
        const response = await fetch(`${url}/v1/obitos`);
        const data = await response.json();
        setObitos(data);
        setLoadingObitos(false);
    }

    const [medicamentos, setMedicamentos] = useState([]);
    const [loadingMed, setLoadingMed] = useState(true);

    const getMed = async () => {
        const response = await fetch(`${url}/v1/avaliacoes`);
        const data = await response.json();
        setMedicamentos(data);
        setLoadingMed(false);
    }

    const [polifarmacias, setPolifarmacias] = useState([]);
    const [loadingPoli, setLoadingPoli] = useState(true);

    const getPoli = async () => {
        const response = await fetch(`${url}/v1/polifarmacias`);
        const data = await response.json();
        setPolifarmacias(data);
        setLoadingPoli(false);
    }

    const [diagnosticos, setDiagnosticos] = useState([]);
    const [loadingDiag, setLoadingDiag] = useState(true);

    const getDiag = async () => {
        const response = await fetch(`${url}/v1/diagnosticos`);
        const data = await response.json();
        setDiagnosticos(data);
        setLoadingDiag(false);
    }

    const [antropometricos, setAntropometricos] = useState([]);
    const [loadingAntro, setLoadingAntro] = useState(true);

    const getAntro = async () => {
        const response = await fetch(`${url}/v1/antropometricos`);
        const data = await response.json();
        setAntropometricos(data);
        setLoadingAntro(false);
    }

    const [cirurgias, setCirurgias] = useState([]);
    const [loadingCirur, setLoadingCirur] = useState(true);

    const getCirur = async () => {
        const response = await fetch(`${url}/v1/cirurgias`);
        const data = await response.json();
        setCirurgias(data);
        setLoadingCirur(false);
    }

    const [reacoes, setReacoes] = useState([]);
    const [loadingReac, setLoadingReac] = useState(true);

    const getReac = async () => {
        const response = await fetch(`${url}/v1/reacoes`);
        const data = await response.json();
        setReacoes(data);
        setLoadingReac(false);
    }

    const [pesos, setPesos] = useState([]);
    const [loadingPesos, setLoadingPesos] = useState(true);

    const getPesos = async () => {
        const response = await fetch(`${url}/v1/pesos`);
        const data = await response.json();
        setPesos(data);
        setLoadingPesos(false);
    }

    const [pesoPerdas, setPesoPerdas] = useState([]);
    const [loadingPesoPerdas, setLoadingPesoPerdas] = useState(true);

    const getPesoPerdas = async () => {
        const response = await fetch(`${url}/v1/peso-perdas`);
        const data = await response.json();
        setPesoPerdas(data);
        setLoadingPesoPerdas(false);
    }

    const [vulnerabilidades, setVulnerabilidades] = useState([]);
    const [loadingVulnerabilidades, setLoadingVulnerabilidades] = useState(true);

    const getVulnerabilidades = async () => {
        const response = await fetch(`${url}/v1/vulnerabilidades`);
        const data = await response.json();
        setVulnerabilidades(data);
        setLoadingVulnerabilidades(false);
    }

    const [ambientais, setAmbientais] = useState([]);
    const [loadingAmbientais, setLoadingAmbientais] = useState(true);

    const getAmbientais = async () => {
        const response = await fetch(`${url}/v1/ambientais`);
        const data = await response.json();
        setAmbientais(data);
        setLoadingAmbientais(false);
    }

    const [quedas, setQuedas] = useState([]);
    const [loadingQuedas, setLoadingQuedas] = useState(true);

    const getQuedas = async () => {
        const response = await fetch(`${url}/v1/quedas`);
        const data = await response.json();
        setQuedas(data);
        setLoadingQuedas(false);
    }

    const [cronicas, setCronicas] = useState([]);
    const [loadingCronicas, setLoadingCronicas] = useState(true);

    const getCronicas = async () => {
        const response = await fetch(`${url}/v1/cronicas`);
        const data = await response.json();
        setCronicas(data);
        setLoadingCronicas(false);
    }

    const [intensidades, setIntensidades] = useState([]);
    const [loadingIntensidades, setLoadingIntensidades] = useState(true);

    const getIntensidades = async () => {
        const response = await fetch(`${url}/v1/intensidades`);
        const data = await response.json();
        setIntensidades(data);
        setLoadingIntensidades(false);
    }

    const [habitos, setHabitos] = useState([]);
    const [loadingHabitos, setLoadingHabitos] = useState(true);

    const getHabitos = async () => {
        const response = await fetch(`${url}/v1/habitos`);
        const data = await response.json();
        setHabitos(data);
        setLoadingHabitos(false);
    }

    const [controlePressao, setControlePressao] = useState([]);
    const [loadingControlePressao, setLoadingControlePressao] = useState(true);

    const getControlePressao = async () => {
        const response = await fetch(`${url}/v1/pressao-controles`);
        const data = await response.json();
        setControlePressao(data);
        setLoadingControlePressao(false);
    }

    const [glicemia, setGlicemia] = useState([]);
    const [loadingGlicemia, setLoadingGlicemia] = useState(true);

    const getGlicemia = async () => {
        const response = await fetch(`${url}/v1/glicemia-controles`);
        const data = await response.json();
        setGlicemia(data);
        setLoadingGlicemia(false);
    }

    const [saudeBucal, setSaudeBucal] = useState([]);
    const [loadingSaudeBuca, setLoadingSaudeBuca] = useState(true);

    const getSaudeBuca = async () => {
        const response = await fetch(`${url}/v1/bucal-saudes`);
        const data = await response.json();
        setSaudeBucal(data);
        setLoadingSaudeBuca(false);
    }

    const [pcls, setPcls] = useState([]);
    const [loadingPcls, setLoadingPcls] = useState(true);

    const getPcls = async () => {
        const response = await fetch(`${url}/v1/pcls`);
        const data = await response.json();
        setPcls(data);
        setLoadingPcls(false);
    }

    const [forcaPreensao, setForcaPreensao] = useState([]);
    const [loadingForcaPreensao, setLoadingForcaPreensao] = useState(true);

    const getForcaPreensao = async () => {
        const response = await fetch(`${url}/v1/preensao-forcas`);
        const data = await response.json();
        setForcaPreensao(data);
        setLoadingForcaPreensao(false);
    }

    const [sppbs, setSppbs] = useState([]);
    const [loadingSbbps, setLoadingSbbps] = useState(true);

    const getSbbps = async () => {
        const response = await fetch(`${url}/v1/sppbs`);
        const data = await response.json();
        setSppbs(data);
        setLoadingSbbps(false);
    }

    const [ivcfs, setIvcfs] = useState([]);
    const [loadingIvcfs, setLoadingIvcfs] = useState(true);

    const getIvcfs = async () => {
        const response = await fetch(`${url}/v1/ivcfs`);
        const data = await response.json();
        setIvcfs(data);
        setLoadingIvcfs(false);
    }

    const [bioimpedancias, setBioimpedancias] = useState([]);
    const [loadingBioimpedancias, setLoadingBioimpedancias] = useState(true);

    const getBioimpedancias = async () => {
        const response = await fetch(`${url}/v1/bioimpedancias`);
        const data = await response.json();
        setBioimpedancias(data);
        setLoadingBioimpedancias(false);
    }

    const [examesLabo, setExameLabo] = useState([]);
    const [loadingExamesLabo, setLoadingExamesLabo] = useState(true);

    const getExamesLabo = async () => {
        const response = await fetch(`${url}/v1/laboratorial-exames`);
        const data = await response.json();
        setExameLabo(data);
        setLoadingExamesLabo(false);
    }

    const [fragilidades, setFragilidades] = useState([]);
    const [loadingFragilidades, setLoadingFragilidades] = useState(true);

    const getFragilidades = async () => {
        const response = await fetch(`${url}/v1/fragilidades`);
        const data = await response.json();
        setFragilidades(data);
        setLoadingFragilidades(false);
    }

    const [frrisques, setFrrisques] = useState([]);
    const [loadingFrrisques, setLoadingFrrisques] = useState(true);

    const getFrrisques = async () => {
        const response = await fetch(`${url}/v1/frrisques`);
        const data = await response.json();
        setFrrisques(data);
        setLoadingFrrisques(false);
    }

    const [sarcfs, setSarcfs] = useState([]);
    const [loadingSarcfs, setLoadingSarcfs] = useState(true);

    const getSarcfs = async () => {
        const response = await fetch(`${url}/v1/sarcfs`);
        const data = await response.json();
        setSarcfs(data);
        setLoadingSarcfs(false);
    }


    return (
        <RequestAuth>
            <div className="Export">
                <Painel titulo="Exportar Dados">
                    <ul>
                        <li>
                            <ExportDataBase/>
                        </li>
                        <li>
                            <Link onClick={getPacientes}>
                                <ExportDialog
                                    name={"Pacientes"}
                                    data={pacientes}
                                    loading={loadingPacientes}
                                    fileName={"pacientes.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getFamiliares}>
                                <ExportDialog
                                    name={"Familiares"}
                                    data={familiares}
                                    loading={loadingFamiliares}
                                    fileName={"familiares.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getObitos}>
                                <ExportDialog
                                    name={"Obitos"}
                                    data={obitos}
                                    loading={loadingObitos}
                                    fileName={"obitos.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getMed}>
                                <ExportDialog
                                    name={"Medicamentos"}
                                    data={medicamentos}
                                    loading={loadingMed}
                                    fileName={"medicamentos.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getPoli}>
                                <ExportDialog
                                    name={"Polifarmacias"}
                                    data={polifarmacias}
                                    loading={loadingPoli}
                                    fileName={"polifarmacias.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getDiag}>
                                <ExportDialog
                                    name={"Diagnosticos"}
                                    data={diagnosticos}
                                    loading={loadingDiag}
                                    fileName={"diagnosticos.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getAntro}>
                                <ExportDialog
                                    name={"Antropometricos"}
                                    data={antropometricos}
                                    loading={loadingAntro}
                                    fileName={"antropometricos.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getCirur}>
                                <ExportDialog
                                    name={"Cirurgias"}
                                    data={cirurgias}
                                    loading={loadingCirur}
                                    fileName={"cirurgias.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getReac}>
                                <ExportDialog
                                    name={"Reaçoes"}
                                    data={reacoes}
                                    loading={loadingReac}
                                    fileName={"reacoes.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getPesos}>
                                <ExportDialog
                                    name={"Pesos"}
                                    data={pesos}
                                    loading={loadingPesos}
                                    fileName={"pesos.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getPesoPerdas}>
                                <ExportDialog
                                    name={"Pesos perdas"}
                                    data={pesoPerdas}
                                    loading={loadingPesoPerdas}
                                    fileName={"pesos-perdas.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getVulnerabilidades}>
                                <ExportDialog
                                    name={"Vulnerabilidade"}
                                    data={vulnerabilidades}
                                    loading={loadingVulnerabilidades}
                                    fileName={"vulnerabilidades.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getAmbientais}>
                                <ExportDialog
                                    name={"Ambientais"}
                                    data={ambientais}
                                    loading={loadingAmbientais}
                                    fileName={"ambientais.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getQuedas}>
                                <ExportDialog
                                    name={"Quedas"}
                                    data={quedas}
                                    loading={loadingQuedas}
                                    fileName={"quedas.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getCronicas}>
                                <ExportDialog
                                    name={"Cronicas"}
                                    data={cronicas}
                                    loading={loadingCronicas}
                                    fileName={"cronicas.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getIntensidades}>
                                <ExportDialog
                                    name={"Intensidades"}
                                    data={intensidades}
                                    loading={loadingIntensidades}
                                    fileName={"intensidades.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getHabitos}>
                                <ExportDialog
                                    name={"Habitos"}
                                    data={habitos}
                                    loading={loadingHabitos}
                                    fileName={"habitos.csv"}
                                />
                            </Link>
                        </li>
                    </ul>
                    <div className="Titulo">
                        Outras Avaliações
                    </div>
                    <ul>
                        <li>
                            <Link onClick={getControlePressao}>
                                <ExportDialog
                                    name={"Controle de Pressão Arterial"}
                                    data={controlePressao}
                                    loading={loadingControlePressao}
                                    fileName={"controle-pressao.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getGlicemia}>
                                <ExportDialog
                                    name={"Controle de Glicemia"}
                                    data={glicemia}
                                    loading={loadingGlicemia}
                                    fileName={"controle-glicemia.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getSaudeBuca}>
                                <ExportDialog
                                    name={"Avaliação Saúde Bucal"}
                                    data={saudeBucal}
                                    loading={loadingSaudeBuca}
                                    fileName={"saude-bucal.csv"}
                                />
                            </Link>
                        </li>
                    </ul>
                    <div className="Titulo">
                        Adicionais
                    </div>
                    <ul>
                        <li>
                            <Link onClick={getPcls}>
                                <ExportDialog
                                    name={"Prova Cognitiva de Leganés (PCL)"}
                                    data={pcls}
                                    loading={loadingPcls}
                                    fileName={"pcl.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getForcaPreensao}>
                                <ExportDialog
                                    name={"Força de Preensão"}
                                    data={forcaPreensao}
                                    loading={loadingForcaPreensao}
                                    fileName={"forca-preensao.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getSbbps}>
                                <ExportDialog
                                    name={"Short Physucal Performance Battery (SPPB)"}
                                    data={sppbs}
                                    loading={loadingSbbps}
                                    fileName={"sppb.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getIvcfs}>
                                <ExportDialog
                                    name={"Índice de Vulnerabilidade Vlínico-Funcional-20 (IVCF-20)"}
                                    data={ivcfs}
                                    loading={loadingIvcfs}
                                    fileName={"ivcf.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getBioimpedancias}>
                                <ExportDialog
                                    name={"Bioimpedância"}
                                    data={bioimpedancias}
                                    loading={loadingBioimpedancias}
                                    fileName={"bioimpedancias.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getExamesLabo}>
                                <ExportDialog
                                    name={"Exames Laboratoriais"}
                                    data={examesLabo}
                                    loading={loadingExamesLabo}
                                    fileName={"exames-laboratoriais.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getFragilidades}>
                                <ExportDialog
                                    name={"Fragilidades"}
                                    data={fragilidades}
                                    loading={loadingFragilidades}
                                    fileName={"fragilidades.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getFrrisques}>
                                <ExportDialog
                                    name={"Frrisque"}
                                    data={frrisques}
                                    loading={loadingFrrisques}
                                    fileName={"frrisque.csv"}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link onClick={getSarcfs}>
                                <ExportDialog
                                    name={"Sarcfs"}
                                    data={sarcfs}
                                    loading={loadingSarcfs}
                                    fileName={"sarcfs.csv"}
                                />
                            </Link>
                        </li>
                    </ul>
                </Painel>
            </div>
        </RequestAuth>
    );
}

export default Export;
