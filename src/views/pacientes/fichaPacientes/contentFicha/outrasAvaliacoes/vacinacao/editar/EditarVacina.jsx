import React, {useEffect, useState} from "react";
import "./EditarVacina.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarVacina(props) {
    const [vacina, setVacina] = useState();
    const [data, setData] = useState("");
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [ass, setAss] = useState("");
    const [lote, setLote] = useState("");
    const [outra, setOutra] = useState("");

    useEffect(() => {
        async function carregarVacina() {
            try {
                const response = await api.get(`v1/vacinas/${props.vacinaId}`);
                setVacina(response.data);
                setData(response.data.data);
                setTipo(response.data.tipo);
                setNome(response.data.nome);
                setAss(response.data.ass);
                setLote(response.data.lote)
                setOutra(response.data.outra);
            } catch (error) {
                console.log(error);
            }
        }

        carregarVacina();
    }, [props.vacinaId]);

    const Vacina = {
        paciente_id: props.pacienteId,
        data,
        nome,
        tipo,
        ass,
        lote,
        outra,
    }

    const handleFecharClick = (vacinaId) => {
        props.onClose(vacinaId);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/vacinas/${props.vacinaId}`, Vacina);
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

    const handleSalvar = (vacinaId) => {
        setOpen(false);
        props.onClose(vacinaId);
    }

    return (
        <div className="EditarVacina">
            <div className="LabelInput">
                <label><strong>Data: </strong></label>
                <input defaultValue={vacina ? vacina.data : ''} onChange={(e) => setData(e.target.value)} type="date"/>
            </div>
            <div className="LabelInput">
                <label><strong>Nome: </strong></label>
                <input defaultValue={vacina ? vacina.nome : ''} onChange={(e) => setNome(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Tipo: </strong></label>
                <input defaultValue={vacina ? vacina.tipo : ''} onChange={(e) => setTipo(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Ass: </strong></label>
                <input defaultValue={vacina ? vacina.ass : ''} onChange={(e) => setAss(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Lote: </strong></label>
                <input defaultValue={vacina ? vacina.lote : ''} onChange={(e) => setLote(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Outra: </strong></label>
                <input defaultValue={vacina ? vacina.outra : ''} onChange={(e) => setOutra(e.target.value)} type="text"/>
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

export default EditarVacina;