import React, {useEffect, useState} from "react";
import "./EditarMedicamentos.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarMedicamentos(props) {
    const [avaliacoes, setAvaliacoes] = useState();
    const [nome_medicamento, setNome_medicamento] = useState('');
    const [dose, setDose] = useState('');
    const [data_inicio, setData_inicio] = useState('');
    const [prescrito_por, setPrescrito_por] = useState('');
    const [suspensao_data, setSuspensao_data] = useState('');
    const [suspensao_motivo, setSuspensao_motivo] = useState('');

    useEffect(() => {
        async function carregarMedicamentos() {
            try {
                const response = await api.get(`v1/avaliacoes/${props.medicamentosId}`);
                setAvaliacoes(response.data);
                setNome_medicamento(response.data.nome_medicamento);
                setDose(response.data.dose);
                setData_inicio(response.data.data_inicio);
                setPrescrito_por(response.data.prescrito_por);
                setSuspensao_data(response.data.suspensao_data);
                setSuspensao_motivo(response.data.suspensao_motivo);
            } catch (error) {
                console.log(undefined);
            }
        }

        carregarMedicamentos();
    }, [props.medicamentosId]);

    const Avaliacao = {
        paciente_id: props.pacienteId,
        nome_medicamento,
        dose,
        data_inicio,
        prescrito_por,
        suspensao_data,
        suspensao_motivo,
    }


    const handleFecharClick = (avaliacoesId) => {
        props.onClose(avaliacoesId);
    }

    const handleEdit = async () => {
        try {
            await api.patch(`v1/avaliacoes/${props.medicamentosId}`, Avaliacao);
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
        handleEdit();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSalvar = (medicamentosId) => {
        setOpen(false);
        props.onClose(medicamentosId);
    }

    return (
        <div className="EditarMedicamentos">
            <div className="LabelInput">
                <label><strong>Nome do medicamento, do fitoterápico, do suplemento ou da vitamina e sua concentração: </strong></label>
                <input defaultValue={avaliacoes ? avaliacoes.nome_medicamento : ''} onChange={(e) => setNome_medicamento(e.target.value)} type="text" className="nome_medicamento" />
            </div>
            <div className="LabelInput">
                <label><strong>Dose e frequência: </strong></label>
                <input defaultValue={avaliacoes ? avaliacoes.dose : ''} onChange={(e) => setDose(e.target.value)} type="text" className="dose" />
            </div>
            <div className="LabelInput">
                <label><strong>Data de início ou tempo de uso: </strong></label>
                <input defaultValue={avaliacoes ? avaliacoes.data_inicio : ''} onChange={(e) => setData_inicio(e.target.value)} type="text" className="data_inicio" />
            </div>
            <div className="LabelInput">
                <label><strong>Foi prescrito por algum profissional de saúde? Qual?: </strong></label>
                <input defaultValue={avaliacoes ? avaliacoes.prescrito_por : ''} onChange={(e) => setPrescrito_por(e.target.value)} type="text" className="prescrito_por" />
            </div>
            <div className="LabelInput">
                <label><strong>Suspensao Data: </strong></label>
                <input defaultValue={avaliacoes ? avaliacoes.suspensao_data : ''} onChange={(e) => setSuspensao_data(e.target.value)} type="text" className="suspensao_data" />
            </div>
            <div className="LabelInput">
                <label><strong>Suspensao Motivo: </strong></label>
                <input defaultValue={avaliacoes ? avaliacoes.suspensao_motivo : ''} onChange={(e) => setSuspensao_motivo(e.target.value)} type="text" className="suspensao_motivo" />
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
                        {"Deseja realmente alterar esse Paciente"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Tem certeza que você deseja alterar os dados desse paciente?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleSalvar} autoFocus>
                            Salvar
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

export default EditarMedicamentos;