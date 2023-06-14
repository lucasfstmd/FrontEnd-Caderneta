import React, {useState} from "react";
import "./EditarSenhaUsuario.css"
import Painel from "../../../components/painel/Painel";
import RequestAuth from "../../../service/auth/RequestAuth";
import api from "../../../service/api";
import {useNavigate, useParams} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarSenhaUsuario() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");

    const NewPassword = {
        currentPassword,
        newPassword
    }

    const handleFecharClick = () => {
        navigate("/caderneta/usuarios")
    }

    const handleEdit = async () => {
        try {
            await api.patch(`v1/usuarios/password/${id}`, NewPassword);
            setOpen(true);
        } catch (error) {
           setError(error.response.data.message);
           setOpenError(true);
        }
    }

    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleFecharError = () => {
        setOpenError(false);
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
                <Painel titulo="Alterar Senha">
                    <div className="EditarSenhaUsuario">
                        <div className="LabelInput">
                            <label>
                                <strong>Senha Atual:</strong>
                            </label>
                            <input
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                type="password"
                            />
                        </div>
                        <div className="LabelInput">
                            <label>
                                <strong>Nova Senha:</strong>
                            </label>
                            <input
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type="password"
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
                                open={openError}
                                onClose={handleFecharError}
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
                                    <Button onClick={handleFecharError} autoFocus>
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

export default EditarSenhaUsuario;