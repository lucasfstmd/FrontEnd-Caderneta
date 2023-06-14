import React, {useEffect, useState} from "react";
import "./EditarIntensidades.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarIntensidades(props) {
    const [intensidadeObj, setIntensidadeObj] = useState();
    const [data, setData] = useState("");
    const [local_dor, setLocalDor] = useState("");
    const [intensidade, setIntensidade] = useState("");

    useEffect(() => {
        async function carregarIntensidade() {
            try {
                const response = await api.get(`v1/intensidades/${props.intensidadesId}`);
                setIntensidadeObj(response.data);
                setData(response.data.data);
                setLocalDor(response.data.local_dor);
                setIntensidade(response.data.intensidade);
            } catch (error) {
                console.log(error);
            }
        }

        carregarIntensidade();
    }, [props.intensidadesId]);

    const Intensidade = {
        paciente_id: props.pacienteId,
        data,
        local_dor,
        intensidade,
    }

    const handleFecharClick = (cronicaId) => {
        props.onClose(cronicaId);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/intensidades/${props.intensidadesId}`, Intensidade);
            setOpen(true);
        } catch (error) {
            console.log(error)
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

    const handleSalvar = (intensidadesId) => {
        setOpen(false);
        props.onClose(intensidadesId);
    }

    return (
        <div className="EditarIntensidades">
            <div className="LabelInput">
                <label><strong>Data: </strong></label>
                <input defaultValue={intensidadeObj ? intensidadeObj.data : ''} onChange={(e) => setData(e.target.value)} type="date"/>
            </div>
            <div className="LabelInput">
                <label><strong>Local Dor: </strong></label>
                <input defaultValue={intensidadeObj ? intensidadeObj.local_dor : ''} onChange={(e) => setLocalDor(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Intensidade: </strong></label>
                <input defaultValue={intensidadeObj ? intensidadeObj.intensidade : ''} onChange={(e) => setIntensidade(parseInt(e.target.value))} type="number"/>
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

export default EditarIntensidades;