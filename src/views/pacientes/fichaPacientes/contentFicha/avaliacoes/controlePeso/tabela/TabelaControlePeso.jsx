import React, {useEffect, useState} from "react"
import "./TabelaControlePeso.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import Dialog from "@mui/material/Dialog";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import DialogTitle from "@mui/material/DialogTitle";
import {AiOutlineEdit} from "react-icons/ai";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function ControlePesoLinha({ controlePeso, onEditClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(controlePeso.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(controlePeso.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/pesos/${controlePeso.id}`);
        } catch (error) {
            console.log(error);
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
    }

    return (
        <tr key={controlePeso.id} className="ControlePesoLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Ano:
                    <strong> {controlePeso.ano}</strong>
                </div>
                <div className="Pergunta">
                    Peso:
                    <strong> {controlePeso.peso}</strong>
                </div>
                <div className="Pergunta">
                    Data de Cadastro:
                    <strong> {formattedDateCreated}</strong>
                </div>
                <div className="Pergunta">
                    Última Atualização:
                    <strong> {formattedDateUpdated}</strong>
                </div>
            </td>
            <td className="BotaoTabela">
                <div className="ButaoEditar">
                    <button onClick={() => onEditClick(controlePeso.id)}>
                        <AiOutlineEdit/>
                    </button>
                </div>
                <div className="ButaoRemover">
                    <button onClick={handleClickOpen}>
                        <IoMdRemoveCircleOutline/>
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
    )
}

function TabelaControlePeso(props) {
    const [controlePeso, setControlePeso] = useState([]);
    const [currentPage] = useState(1);

    const itemsPerPage = props.itemsPerPage;

    useEffect(() => {
        async function carregarPesos() {
            try {
                const response = await api.get(
                    `v1/pesos/paciente/${props.pacienteId}`
                );
                setControlePeso(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        carregarPesos();
    });

    const totalPages = Math.ceil((controlePeso?.length || 0) / itemsPerPage);

    const getPesosPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return controlePeso?.slice(inicio, fim) || [];
    };

    const handleEditarClick = (controlePesoId) => {
        props.onEditarClick(controlePesoId);
    };

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getPesosPaginaAtual().slice(startIndex, endIndex).map((controlePeso) => (
            <ControlePesoLinha key={controlePeso.id} controlePeso={controlePeso} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaControlePeso">
            {controlePeso.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {controlePeso.length}.
                    </div>
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
                </>
            )}
        </div>
    )
}

export default TabelaControlePeso;