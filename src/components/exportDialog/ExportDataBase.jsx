import React, { useState} from "react"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import {CSVLink} from "react-csv";
import {AiFillCloseCircle, AiOutlineDownload} from "react-icons/ai";
import {Link} from "react-router-dom";

function ExportDataBase() {
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
    const [sarcfs, setSarcfs] = useState([]);
    const [dataBase, setDataBase] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (url, setData) => {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
    }

    const url = 'http://localhost:8080/api'

    const fetchDataBase = async () => {
        const response = await fetch(`${url}/v1/database`)
        const data = await response.json()
        setDataBase(data)
        setLoading(false);
    }

    const fetchDataForExport = async () => {
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
        await fetchData(`${url}/v1/sarcfs`, setSarcfs);
        setLoading(false);

    };

    const getDataBase = () => {
        fetchDataForExport();
        // fetchDataBase();
    }

    const build = (array,field, patient_id) => {
        return array
            .filter(item => item.paciente_id === patient_id)
            .map((item) => {
                return {
                    ...item
                }
            })
            .reduce((accumulated, current, index) => {
                const obj = {}
                Object.keys(current).forEach(key => {
                    if (key !== 'paciente_id') {
                        obj[`${field}_${index + 1}_${key}`] = current[key]
                    }
                })
                return {
                    ...accumulated,
                    ...obj
                }
            }, {})
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
        const sarcf = build(sarcfs, "sarcfs", patient.id);

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
            ...frrisque,
            ...sarcf
        }
    })

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        getDataBase();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Link onClick={handleClickOpen}
                  style={{ textDecoration: 'none', color: '#1E90FF', margin: "2vh" }}
            >
                <strong>Banco de Dados</strong>
            </Link>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Baixar csv"}
                </DialogTitle>
                <DialogContent>
                    {loading ?
                        <DialogContentText id="alert-dialog-description">
                            Carregando CSV
                        </DialogContentText>
                        :
                        <DialogContentText id="alert-dialog-description">
                            Pronto!
                        </DialogContentText>
                    }
                </DialogContent>
                <DialogActions>
                    {loading ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', AlingItens: 'center' }}>
                            <CircularProgress />
                        </Box>
                        :
                        <>
                            <Button onClick={handleClose} variant="outlined" color="success">
                                <CSVLink style={{textDecoration: 'none', color: 'green'}} data={result}
                                         filename="banco-de-dados.csv">
                                    <AiOutlineDownload/> Baixar
                                </CSVLink>
                            </Button>
                            <Button onClick={handleClose} variant="outlined" color="error">
                                <AiFillCloseCircle style={{marginRight: "1vh"}}/> Fechar
                            </Button>
                        </>
                    }
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ExportDataBase;
