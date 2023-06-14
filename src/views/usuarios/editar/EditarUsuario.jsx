import React, {useState} from "react";
import "./EditarUsuario.css"
import Painel from "../../../components/painel/Painel";
import RequestAuth from "../../../service/auth/RequestAuth";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarUsuario() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");


    const Usuario = {
        usuario,
        email,
    }

    const handleFecharClick = () => {
        navigate("/caderneta/usuarios")
    }

    const handleEdit = async () => {
        try {
            await api.patch(`v1/usuarios/${id}`, Usuario);
            setOpen(true);
        } catch (error) {
            setError(error.response.data.message);
            if (error.response && error.response.status === 400) {
                setOpenErro400(true);
            } else if (error.response && error.response.status === 500) {
                setOpenErro500(true);
            }
        }
    }

    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
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
        navigate("/caderneta/usuarios")
    }

    return (
        <RequestAuth>
            <div>
                <Painel titulo="Editar Usuario">
                    <div className="EditarUsuario">
                        <div className="LabelInput">
                            <label>
                                <strong>Novo Nome de Usuario:</strong>
                            </label>
                            <input
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className="LabelInput">
                            <label>
                                <strong>Novo Email:</strong>
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
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
                                        Tem certeza que você deseja alterar os dados desse usuario?
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
                                        {error}
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
                                        {error}
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
export default EditarUsuario;