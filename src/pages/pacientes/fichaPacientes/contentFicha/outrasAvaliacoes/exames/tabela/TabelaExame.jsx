import React, {useEffect, useState} from "react";
import "./TabelaExame.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function ExameLinha({ exame, onEditClick }) {
    const [open, setOpen] = useState(false);

    const dataFormated = exame.data;
    const formattedData = format(new Date(dataFormated.replace(/-/g, '/')), "dd/MM/yyyy");
    const formattedDateCreated = format(new Date(exame.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(exame.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/agendas/${exame.id}`);
        } catch (error) {
            console.log(undefined)
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
        <tr key={exame.id} className="ExamesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Data:
                    <strong> {formattedData}</strong>
                </div>
                <div className="Pergunta">
                    Hora:
                    <strong> {exame.hora}</strong>
                </div>
                <div className="Pergunta">
                    Local:
                    <strong> {exame.local}</strong>
                </div>
                <div className="Pergunta">
                    Tipo:
                    <strong> {exame.tipo}</strong>
                </div>
                <div className="Pergunta">
                    Profissional:
                    <strong> {exame.profissional}</strong>
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
                    <button onClick={() => onEditClick(exame.id)}>
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

function TabelaExame(props) {
    const [exames, setExames] = useState([]);
    const [currentPage] = useState(1);


    const itemsPerPage = props.itemsPerPage;

    useEffect(() => {
        async function carregarExames() {
            try {
                const response = await api.get(
                    `v1/agendas/paciente/${props.pacienteId}`
                );
                setExames(response.data);
            } catch (error) {
                console.log(undefined);
            }
        }

        carregarExames();
    });

    const totalPages = Math.ceil((exames?.length || 0) / itemsPerPage);

    const getExamesPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return exames?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (examesId) => {
        props.onEditarClick(examesId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getExamesPagAtual().slice(startIndex, endIndex).map((exame) => (
            <ExameLinha key={exame.id} exame={exame} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaExame">
            {exames.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {exames.length}.
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

export default TabelaExame;