import React, {useState} from "react"
import "./AdicionarUbs.css"
import {useNavigate} from "react-router-dom";
import api from "../../../service/api";
import RequestAuth from "../../../service/auth/RequestAuth";
import Painel from "../../../components/painel/Painel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function AdicionarUbs() {
    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    const Ubs = {
        nome,
    }

    async function handleSalvarApi() {
        try {
            await api.post("v1/ubs", Ubs);
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
        navigate("/caderneta/sistema")
    }

    const handleFecharClick = () => {
        navigate("/caderneta/sistema")
    }

    return (
        <RequestAuth>
            <div>
                <Painel titulo="Adicionar UBS">
                    <div className="AdicionarUbs">
                        <div className="LabelInput">
                            <label>
                                <strong>Nome:</strong>
                            </label>
                            <input
                                value={nome}
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
                                    {"Deseja realmente alterar esse Paciente"}
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
                </Painel>
            </div>
        </RequestAuth>
    )
}

export default AdicionarUbs;