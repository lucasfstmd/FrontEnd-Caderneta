import React, {useEffect, useState} from "react"
import "./EditarCirurgias.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarCirurgias(props) {
    const [objCirurgia, setObjCirurgia] = useState();
    const [cirurgia, setCirurgia] = useState('');
    const [ano, setAno] = useState('');
    const [observacao, setObservacao] = useState('');

    useEffect(() => {
        async function carregarCirurgia() {
            try {
                const response = await api.get(`v1/cirurgias/${props.cirurgiasId}`);
                setObjCirurgia(response.data);
                setCirurgia(response.data.cirurgia);
                setAno(response.data.ano);
                setObservacao(response.data.observacao);
            } catch (error) {
                console.log(error);
            }
        }

        carregarCirurgia();
    }, [props.cirurgiasId]);

    const Cirurgia = {
        paciente_id: props.pacienteId,
        cirurgia,
        ano,
        observacao,
    }

    const handleFecharClick = (cirurgiaId) => {
        props.onClose(cirurgiaId);
    }

    const handleEdit = async () => {
        try {
            await api.patch(`v1/cirurgias/${props.cirurgiasId}`, Cirurgia);
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

    const handleSalvar = (cirurgiaId) => {
        setOpen(false);
        props.onClose(cirurgiaId);
    }

    return (
        <div className="EditarCirurgias">
            <div className="LabelInput">
                <label><strong>Cirurgia: </strong></label>
                <input defaultValue={objCirurgia ? objCirurgia.cirurgia : ''} onChange={(e) => setCirurgia(e.target.value)} type="text" className="cirurgia" />
            </div>
            <div className="LabelInput">
                <label><strong>Ano: </strong></label>
                <input defaultValue={objCirurgia ? objCirurgia.ano : ''} onChange={(e) => setAno(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Cirurgia: </strong></label>
                <textarea defaultValue={objCirurgia ? objCirurgia.observacao : ''} onChange={(e) => setObservacao(e.target.value)} name="subject" placeholder="..." style={{height: "150"}}></textarea>
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

export default EditarCirurgias;