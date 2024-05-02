import React, {useState} from "react"
import "./AdicionarDiagnosticos.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../../ContentFicha'

function AdicionarDiagnosticos() {
    const params = useParams();
    const { id } = params
    const query = useQuery();
    const navigate = useNavigate();

    const [tipo, setTipo] = useState('');
    const [tipo_outro, setTipoOutro] = useState('');
    const [ano_diagnostico, setAno_diagnostico] = useState('');
    const [ano_internacao, setAno_internacao] = useState('');
    const [tempo_internacao, setTempo_internacao] = useState('');

    const Diagnostico = {
        paciente_id: id,
        tipo,
        tipo_outro,
        ano_diagnostico,
        ano_internacao,
        tempo_internacao,
    }

    async function handleSalvarApi() {
        try {
            await api.post("v1/diagnosticos", Diagnostico);
            setOpen(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setOpenErro400(true);
            } else if (error.response && error.response.status === 500) {
                setOpenErro500(true);
            }
        }
    }

    const [open, setOpen] = useState(false);
    const [openErro400, setOpenErro400] = useState(false);
    const [openErro500, setOpenErro500] = useState(false);

    const handleFecharErro400 = () => {
        setOpenErro400(false);
    }

    const handleFecharErro500 = () => {
        setOpenErro500(false);
    }

    const handleClickOpen = () => {
        handleSalvarApi();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSalvar = () => {
        setOpen(false);
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    }

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    }

    return (
        <div className="AdicionarDiagnosticos">
            <div className="LabelInput">
                <label><strong>Tipo: </strong></label>
                <select value={tipo} name="tipo" onChange={(e) => setTipo(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Acidente vascular cerebral">Acidente vascular cerebral</option>
                    <option value="Anemia">Anemia</option>
                    <option value="Asma">Asma</option>
                    <option value="Depressão">Depressão</option>
                    <option value="Diabetes mellitus">Diabetes mellitus</option>
                    <option value="Doença arterial coronariana">Doença arterial coronariana</option>
                    <option value="Doença pulmonar obstrutiva crônica (DPOC)">Doença pulmonar obstrutiva crônica (DPOC)</option>
                    <option value="Epilepsia">Epilepsia</option>
                    <option value="Hipertensão arterial">Hipertensão arterial</option>
                    <option value="Incontinência fecal">Incontinência fecal</option>
                    <option value="Incontinência urinária">Incontinência urinária</option>
                    <option value="Insuficiência cardíaca">Insuficiência cardíaca</option>
                    <option value="Insuficiência cognitiva (demência)">Insuficiência cognitiva (demência)</option>
                    <option value="Úlcera péptica">Úlcera péptica</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Outro Tipo (Escreva): </strong></label>
                <input value={tipo_outro} onChange={(e) => setTipoOutro(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Ano de Diagnóstico: </strong></label>
                <input value={ano_diagnostico} onChange={(e) => setAno_diagnostico(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Ano de Internação: </strong></label>
                <input value={ano_internacao} onChange={(e) => setAno_internacao(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Tempo de Internação: </strong></label>
                <input value={tempo_internacao} onChange={(e) => setTempo_internacao(e.target.value)} type="text"/>
            </div>
            <div className="BotaoForm">
                <button onClick={handleClickOpen} className="botaoFormSalvar">Salvar</button>
                <button onClick={handleFecharClick} className="botaoFormFechar">Fechar</button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Sucesso!"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Informações salvas com sucesso!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSalvar} autoFocus>
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openErro400}
                    onClose={handleFecharErro400}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Erro"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Algum campo está com dados errados.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleFecharErro400} autoFocus>
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openErro500}
                    onClose={handleFecharErro500}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Erro"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Ocorreu um erro no servidor.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleFecharErro500} autoFocus>
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default AdicionarDiagnosticos;
