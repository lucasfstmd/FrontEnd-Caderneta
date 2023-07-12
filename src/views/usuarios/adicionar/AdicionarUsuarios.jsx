import React, {useState} from "react";
import "./AdicionarUsuarios.css"
import Painel from "../../../components/painel/Painel";
import api from "../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {TOKEN_KEY} from "../../../service/auth/auth";

function AdicionarUsuarios() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("");

    const Usuario = {
        usuario,
        email,
        senha,
        tipo,
    }

    async function handleSalvarApi() {
        try {
            await api.post("v1/usuarios", Usuario, {
                headers: {
                    'Authorization' : `${localStorage.getItem(TOKEN_KEY)}`,
                },
            });
            setOpen(true);
        } catch (error) {
            setError(error.response.data.message);
            if (error.response.status >= 400 || error.response.status < 499) {
                setOpenErro400(true);
            } else if (error.response.status >= 500 || error.response.status < 599) {
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
        handleSalvarApi();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSalvar = () => {
        setOpen(false);
        navigate("/caderneta/usuarios")
    }

    const handleFecharClick = () => {
        navigate("/caderneta/usuarios")
    }

    return (
        <div>
            <Painel titulo="Adicionar Usuario">
                <div className="AdicionarUsuarios">
                    <div className="LabelInput">
                        <label>
                            <strong>Nome de Usuario:</strong>
                        </label>
                        <input
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div className="LabelInput">
                        <label>
                            <strong>Email:</strong>
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                        />
                    </div>
                    <div className="LabelInput">
                        <label>
                            <strong>Senha:</strong>
                        </label>
                        <input
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            type="password"
                        />
                    </div>
                    <div className="LabelInput">
                        <label>
                            <strong>Tipo:</strong>
                        </label>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option value="">Selecinar</option>
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
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
                                {"Sucesso!"}
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
    )
}

export default AdicionarUsuarios;
