import React, {useEffect, useState} from "react";
import "./EditarExame.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarExame(props) {
    const [exame, setExame] = useState();
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [local, setLocal] = useState("");
    const [tipo, setTipo] = useState("");
    const [profissional, setProfissional] = useState("");

    async function carregarExame() {
        try {
            const response = await api.get(`v1/agendas/${props.exameId}`);
            setExame(response.data);
            setData(response.data.data);
            setHora(response.data.hora);
            setLocal(response.data.local);
            setTipo(response.data.tipo);
            setProfissional(response.data.profissional);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarExame();
    }, []);

    const Exame = {
        paciente_id: props.pacienteId,
        data,
        hora,
        local,
        tipo,
        profissional,
    }

    const handleFecharClick = (glicemiaId) => {
        props.onClose(glicemiaId);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/agendas/${props.exameId}`, Exame);
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

    const handleSalvar = (exameId) => {
        setOpen(false);
        props.onClose(exameId);
    }

    return (
        <div className="EditarExame">
            <div className="LabelInput">
                <label><strong>Data: </strong></label>
                <input defaultValue={exame ? exame.data : ''} onChange={(e) => setData(e.target.value)} type="date"/>
            </div>
            <div className="LabelInput">
                <label><strong>Hora: </strong></label>
                <input defaultValue={exame ? exame.hora : ''} onChange={(e) => setHora(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Local: </strong></label>
                <input defaultValue={exame ? exame.local : ''} onChange={(e) => setLocal(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Tipo: </strong></label>
                <input defaultValue={exame ? exame.tipo : ''} onChange={(e) => setTipo(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Profissional: </strong></label>
                <input defaultValue={exame ? exame.profissional : ''} onChange={(e) => setProfissional(e.target.value)} type="text"/>
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

export default EditarExame;