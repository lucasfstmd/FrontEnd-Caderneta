import React, {useEffect, useState} from "react"
import "./EditarGlicemia.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarGlicemia(props) {
    const [glicemia, setGlicemia] = useState();
    const [data, setData] = useState("");
    const [tipo, setTipo] = useState("");
    const [valor, setValor] = useState(null);

    useEffect(() => {
        async function carregarGlicemia() {
            try {
                const response = await api.get(`v1/glicemia-controles/${props.glicemiaId}`);
                setGlicemia(response.data);
                setData(response.data.data);
                setTipo(response.data.tipo);
                setValor(response.data.valor);
            } catch (error) {
                console.log(undefined);
            }
        }

        carregarGlicemia();
    }, [props.glicemiaId]);

    const Glicemia = {
        paciente_id: props.pacienteId,
        data,
        tipo,
        valor,
    }

    const handleFecharClick = (glicemiaId) => {
        props.onClose(glicemiaId);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/glicemia-controles/${props.glicemiaId}`, Glicemia);
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

    const handleSalvar = (glicemiaId) => {
        setOpen(false);
        props.onClose(glicemiaId);
    }

    return (
        <div className="EditarGlicemia">
            <div className="LabelInput">
                <label><strong>Data: </strong></label>
                <input defaultValue={glicemia ? glicemia.data : ''} onChange={(e) => setData(e.target.value)} type="date"/>
            </div>
            <div className="LabelInput">
                <label><strong>Tipo: </strong></label>
                <input defaultValue={glicemia ? glicemia.tipo : ''} onChange={(e) => setTipo(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Valor: </strong></label>
                <input defaultValue={glicemia ? glicemia.valor : ''} onChange={(e) => setValor(parseInt(e.target.value))} type="number"/>
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

export default EditarGlicemia;