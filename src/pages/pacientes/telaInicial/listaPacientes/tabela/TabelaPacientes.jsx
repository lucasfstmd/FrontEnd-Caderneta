import React, {useState} from "react";
import { Link } from "react-router-dom";

import "./TabelaPacientes.css";

import { AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { IoMdRemoveCircleOutline } from "react-icons/io";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import {format} from "date-fns";

import api from "../../../../../service/api";

function PacientesLinha({ paciente }) {
    const [open, setOpen] = useState(false);

    const formattedDate = format(new Date(paciente.created), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/pacientes/${paciente.id}`);
            window.location.reload();
        } catch (error) {
            console.log(undefined)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSalvar = () => {
        setOpen(false);
        handleDelet();
    }

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    return (
        <tr key={paciente.id} className="PacienteLinha">
            <td className="TextosTabela">
                <div className="NomePaciente">
                    <strong>{paciente.nome}</strong>
                </div>
                <div className="CadastroPaciente">
                    Cadastro: {formattedDate}
                </div>
                <div className="UbsPaciente">UBS: {paciente.ubs}</div>
                <div className="AbrirFicha">
                    <button>
                        <Link
                            style={{ textDecoration: "none", color: "black" }}
                            to={`/caderneta/pacientes/ficha/${paciente.id}`}
                        >
                            <AiOutlineSearch /> Abrir Ficha do Paciente
                        </Link>
                    </button>
                </div>
            </td>
            <td className="BotaoTabela">
                <div className="ButaoEditar">
                    <button>
                        <Link
                            style={{ textDecoration: "none", color: "black" }}
                            to={`/caderneta/pacientes/ficha/${paciente.id}?selectedItem=editar-dados`}
                        >
                            <AiOutlineEdit />
                        </Link>

                    </button>
                </div>
                <div className="ButaoRemover">
                    <button onClick={handleClickOpen}>
                        <IoMdRemoveCircleOutline />
                    </button>
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
                                Tem certeza que você deseja apagar os dados desse paciente?
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

function TabelaPacientes(props) {
    const [currentPage] = useState(1);
    const itemsPerPage = props.itemsPerPage;

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return props.data.slice(startIndex, endIndex).map((paciente) => (
            <PacientesLinha key={paciente.id} paciente={paciente}/>
        ));
    }

    return (
        <div className="TabelaPacientes">
            <table>
                <thead>
                <tr className="Colunas">
                    <th>
                        <div className="ColunaInformacoes">Informações</div>
                    </th>
                    <th>
                        <div className="ColunaAcoes">Ações</div>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {getLinhas()}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaPacientes;
