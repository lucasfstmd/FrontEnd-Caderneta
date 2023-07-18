import React, {useEffect, useState} from "react"
import "./EditarObitos.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarObitos(props) {
    const [objObito, setObjObito] = useState();
    const [obito, setObito] = useState(null)
    const [quando, setQuando] = useState('');
    const [motivo, setMotivo] = useState('');

    useEffect(() => {
        async function carregarObito() {
            try {
                const response = await api.get(`v1/obitos/${props.obitosId}`);
                setObjObito(response.data);
                setObito(response.data.obito);
                setQuando(response.data.quando);
                setMotivo(response.data.motivo);
            } catch (error) {
                console.log(error);
            }
        }

        carregarObito();
    }, [props.obitosId]);

    const Obito = {
        paciente_id: props.pacienteId,
        obito,
        quando,
        motivo,
    }

    const handleFecharClick = (obitoId) => {
        props.onClose(obitoId);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/obitos/${props.obitosId}`, Obito);
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

    const handleSalvar = (obitoId) => {
        setOpen(false);
        props.onClose(obitoId);
    }

    return (
        <div className="EditarObitos">
            <div className="LabelInput">
                <label><strong>Obito: </strong></label>
                <select value={objObito ? objObito.obito : ""} name="obito" onChange={(e) => setObito(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Quando: </strong></label>
                <input defaultValue={objObito ? objObito.quando : ""} onChange={(e) => setQuando(e.target.value)} type="date" className="quando" />
            </div>
            <div className="LabelInput">
                <label><strong>Motivo: </strong></label>
                <input defaultValue={objObito ? objObito.motivo : ""} onChange={(e) => setMotivo(e.target.value)} type="text" className="motivo" />
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
                        {"Deseja realmente alterar esse Paciente?"}
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

export default EditarObitos;