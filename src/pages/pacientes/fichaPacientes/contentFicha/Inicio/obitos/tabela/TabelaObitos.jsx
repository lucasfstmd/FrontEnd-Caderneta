import React, { useEffect, useState } from "react";
import "./TabelaObitos.css";
import api from "../../../../../../../service/api";
import { AiOutlineEdit } from "react-icons/ai";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {DialogContent, DialogContentText} from "@mui/material";

function ObitosLinha({ obitos, onEditClick }) {
    const [open, setOpen] = useState(false);


    async function handleDelet() {
        try {
            await api.delete(`v1/obitos/${obitos.id}`);
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
    }

    return (
        <tr key={obitos.id} className="ObitosLinha">
            <td className="TextosTabela">
                <div className="Pergunda">
                    Obito?:<strong> {obitos.obito === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Quando?:<strong> {obitos.quando}</strong>
                </div>
                <div className="Pergunda">
                    Motivo:<strong> {obitos.motivo}</strong>
                </div>
            </td>
            <td className="BotaoTabela">
                <div className="ButaoEditar">
                    <button onClick={() => onEditClick(obitos.id)}>
                        <AiOutlineEdit />
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

function TabelaObitos(props) {
    const [obitos, setObitos] = useState([]);
    const [currentPage] = useState(1);
    const [showInfoObitos, setShowInfoObitos] = useState(false);

    const itemsPerPage = props.itemsPerPage;

    async function carregarObitos() {
        try {
            const response = await api.get(`v1/obitos/paciente/${props.pacienteId}`);
            setObitos(response.data);
            setShowInfoObitos(response.data.length === 0);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarObitos();
    }, []);

    const totalPages = Math.ceil((obitos?.length || 0) / itemsPerPage);

    const getObitosPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return obitos?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (obitosId) => {
        props.onEditarClick(obitosId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getObitosPaginaAtual().slice(startIndex, endIndex).map((obitos) => (
            <ObitosLinha key={obitos.id} obitos={obitos} onEditClick={handleEditarClick}/>
        ));
    }

    return (
        <div className="TabelaObitos">
            {showInfoObitos ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros: {obitos.length}.
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
    );
}

export default TabelaObitos;
