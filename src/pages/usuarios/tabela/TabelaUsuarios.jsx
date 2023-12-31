import React, { useState } from "react";
import './TabelaUsuarios.css'
import { IoMdRemoveCircleOutline } from "react-icons/io";
import api from "../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, DialogContentText } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {AiOutlineEdit} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

function UsuarioLinha({ data }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    async function handleDelet() {
        try {
            await api.delete(`v1/usuarios/${data.id}`);
        } catch (error) {
            console.log(undefined);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSalvar = () => {
        setOpen(false);
        handleDelet();
        window.location.reload(true);
    }

    const handleEdit = () => {
        navigate(`editar/${data.usuario}`);
    }

    return (
        <tr key={data.id} className="UsuarioLinha">
            <td className="TextosTabela">
                <div className="NomeUsuario">
                    Usuario: <strong>{data.usuario}</strong>
                </div>
                <div className="NomeUsuario">
                    Email: <strong>{data.email}</strong>
                </div>
                <div className="NomeUsuario">
                    Tipo: <strong>{data.tipo}</strong>
                </div>
            </td>
            <td className="BotaoTabela">
                <div className="ButaoEditar">
                    <button onClick={handleEdit}>
                        <AiOutlineEdit/>
                    </button>
                </div>
                <div className="ButaoRemover">
                    <button onClick={handleClickOpen} style={{backgroundColor: "#00000010"}}>
                        <IoMdRemoveCircleOutline />
                    </button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Deseja realmente apagar esse Usuario"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Tem certeza que você deseja apagar esse usuario?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button onClick={handleSalvar} autoFocus>
                                Sim
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </td>
        </tr>
    );
}

function TabelaUsuarios(props) {
    const [currentPage] = useState(1);
    const itemsPerPage = props.itemsPerPage;

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return props.data.slice(startIndex, endIndex).map((data) => (
            <UsuarioLinha key={data.id} data={data} />
        ));
    }

    return (
        <div className="TabelaUsuarios">
            <table>
                <thead>
                <tr className="Colunas">
                    <th>
                        <div className="ColunaNome">Nome</div>
                    </th>
                    <th>
                        <div className="ColunaAcoes">Ações</div>
                    </th>
                </tr>
                </thead>
                <tbody>{getLinhas()}</tbody>
            </table>
        </div>
    );
}

export default TabelaUsuarios;
