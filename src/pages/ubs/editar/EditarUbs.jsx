import React, {useEffect, useState} from "react"
import "./EditarUbs.css"
import RequestAuth from "../../../service/auth/RequestAuth";
import Painel from "../../../components/painel/Painel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import api from "../../../service/api";
import {useNavigate, useParams} from "react-router-dom";

function EditarUbs() {
    const [ubs, setUbs] = useState();
    const [nome, setNome] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

    async function carregarUbs() {
        try {
            const response = await api.get(`v1/ubs/${id}`);
            setUbs(response.data);
            setNome(response.data.nome);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarUbs();
    }, []);

    const Ubs = {
        nome,
    }

    const handleFecharClick = () => {
        navigate("/caderneta/ubs");
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/ubs/${id}`, Ubs);
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

    const handleSalvar = () => {
        setOpen(false);
        navigate("/caderneta/ubs");
    }

    return (
        <RequestAuth>
            <div>
                <Painel titulo="Editar UBS">
                    <div className="EditarUbs">
                        <div className="LabelInput">
                            <label>
                                <strong>Nome:</strong>
                            </label>
                            <input
                                defaultValue={ubs ? ubs.nome: ""}
                                onChange={(e) => setNome(e.target.value)}
                                type="text"
                            />
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
                                    {"Deseja realmente alterar essa UBS"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Tem certeza que você deseja alterar os dados dessa UBS?
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
                </Painel>
            </div>
        </RequestAuth>
    )
}

export default EditarUbs;