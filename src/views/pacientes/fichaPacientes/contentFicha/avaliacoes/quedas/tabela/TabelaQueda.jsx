import React, {useEffect, useState} from "react";
import "./TabelaQueda.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function QuedaLinha({ quedas, onEditClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(quedas.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(quedas.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/quedas/${quedas.id}`);
        } catch (error) {
            console.log(error)
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
        <tr key={quedas.id} className="QuedasLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Queda:
                    <strong> {quedas.queda === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Data Mes:
                    <strong> {quedas.data_mes}</strong>
                </div>
                <div className="Pergunta">
                    Data Ano:
                    <strong> {quedas.data_ano}</strong>
                </div>
                <div className="Pergunta">
                    Local Queda:
                    <strong> {quedas.local_queda}</strong>
                </div>
                <div className="Pergunta">
                    Fratura:
                    <strong> {quedas.fratura === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Fratura Qual:
                    <strong> {quedas.fratura_qual}</strong>
                </div>
                <div className="Pergunta">
                    Parou Atividade:
                    <strong> {quedas.parou_atividade === 0 ? "Não" : "Sim"}</strong>
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
                    <button onClick={() => onEditClick(quedas.id)}>
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

function TabelaQueda(props) {
    const [quedas, setQuedas] = useState([]);
    const [currentPage] = useState(1);


    const itemsPerPage = props.itemsPerPage;

    useEffect(() => {
        async function carregarAmbientais() {
            try {
                const response = await api.get(
                    `v1/quedas/paciente/${props.pacienteId}`
                );
                setQuedas(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        carregarAmbientais();
    });

    const totalPages = Math.ceil((quedas?.length || 0) / itemsPerPage);

    const getQuedasPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return quedas?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (quedasId) => {
        props.onEditarClick(quedasId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getQuedasPaginaAtual().slice(startIndex, endIndex).map((quedas) => (
            <QuedaLinha key={quedas.id} quedas={quedas} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaQueda">
            {quedas.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {quedas.length}.
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

export default TabelaQueda;