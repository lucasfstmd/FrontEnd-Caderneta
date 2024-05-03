import React, {useState} from "react";
import "./AdicionarMedicamentos.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../../ContentFicha'

function AdicionarMedicamentos() {
    const params = useParams();
    const { id } = params
    const query = useQuery();
    const navigate = useNavigate();

    const [nome_medicamento, setNome_medicamento] = useState('');
    const [dose, setDose] = useState('');
    const [data_inicio, setData_inicio] = useState('');
    const [prescrito_por, setPrescrito_por] = useState('');
    const [suspensao_data, setSuspensao_data] = useState('');
    const [suspensao_motivo, setSuspensao_motivo] = useState('');

    const Avaliacao = {
        paciente_id: parseInt(id),
        nome_medicamento,
        dose,
        data_inicio,
        prescrito_por,
        suspensao_data,
        suspensao_motivo,
    }

    async function handleSalvarApi() {
        try {
            await api.post("v1/avaliacoes", Avaliacao);
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
        <div className="AdicionarMedicamentos">
            <div className="LabelInput">
                <label><strong>Nome do medicamento, do fitoterápico, do suplemento ou da vitamina e sua concentração: </strong></label>
                <input value={nome_medicamento} onChange={(e) => setNome_medicamento(e.target.value)} type="text" className="nome_medicamento" />
            </div>
            <div className="LabelInput">
                <label><strong>Dose e frequência: </strong></label>
                <input value={dose} onChange={(e) => setDose(e.target.value)} type="text" className="dose" />
            </div>
            <div className="LabelInput">
                <label><strong>Data de início ou tempo de uso: </strong></label>
                <input value={data_inicio} onChange={(e) => setData_inicio(e.target.value)} type="text" className="data_inicio" />
            </div>
            <div className="LabelInput">
                <label><strong>Foi prescrito por algum profissional de saúde? Qual?: </strong></label>
                <input value={prescrito_por} onChange={(e) => setPrescrito_por(e.target.value)} type="text" className="prescrito_por" />
            </div>
            <div className="LabelInput">
                <label><strong>Suspensao Data: </strong></label>
                <input value={suspensao_data} onChange={(e) => setSuspensao_data(e.target.value)} type="text" className="suspensao_data" />
            </div>
            <div className="LabelInput">
                <label><strong>Suspensao Motivo: </strong></label>
                <input value={suspensao_motivo} onChange={(e) => setSuspensao_motivo(e.target.value)} type="text" className="suspensao_motivo" />
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

export default AdicionarMedicamentos;
