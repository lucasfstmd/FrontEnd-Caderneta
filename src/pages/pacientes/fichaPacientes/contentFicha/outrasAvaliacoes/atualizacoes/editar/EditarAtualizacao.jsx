import React, {useEffect, useState} from "react";
import "./EditarAtualizacao.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarAtualizacao(props) {
    const [atualizacao, setAtualizacao] = useState();
    const [data, setData] = useState("");
    const [responsavel, setResponsavel] = useState("");

    useEffect(() => {
        async function carregarExame() {
            try {
                const response = await api.get(`v1/atualizacoes/${props.atualizacaoId}`);
                setAtualizacao(response.data);
                setData(response.data.data);
                setResponsavel(response.data.responsavel);
            } catch (error) {
                console.log(error);
            }
        }

        carregarExame();
    }, [props.atualizacaoId]);


    const Atualizacao = {
        paciente_id: props.pacienteId,
        data,
        responsavel,
    }

    const handleFecharClick = (atualizcaoId) => {
        props.onClose(atualizcaoId);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/atualizacoes/${props.atualizacaoId}`, Atualizacao);
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

    const handleSalvar = (atualizcaoId) => {
        setOpen(false);
        props.onClose(atualizcaoId);
    }

    return (
        <div className="EditarAtualizacao">
            <div className="LabelInput">
                <label><strong>Data: </strong></label>
                <input defaultValue={atualizacao ? atualizacao.data : ''} onChange={(e) => setData(e.target.value)} type="date"/>
            </div>
            <div className="LabelInput">
                <label><strong>Responsavel: </strong></label>
                <input defaultValue={atualizacao ? atualizacao.responsavel : ''} onChange={(e) => setResponsavel(e.target.value)} type="text"/>
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

export default EditarAtualizacao;