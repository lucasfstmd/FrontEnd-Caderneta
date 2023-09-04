import React, {useEffect, useState} from "react";
import "./TabelaMedicamentos.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {DialogContent, DialogContentText} from "@mui/material";

function MedicamentosLinha({ avaliacoes, onEditClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(avaliacoes.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(avaliacoes.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/avaliacoes/${avaliacoes.id}`);
        } catch (error) {
            console.log(undefined)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSalvar = () => {
        setOpen(false);
        handleDelet();
    }

    return (
        <tr key={avaliacoes.id} className="MedicamentosLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Nome Medicamento:
                    <strong> {avaliacoes.nome_medicamento}</strong>
                </div>
                <div className="Pergunta">
                    Dose:
                    <strong> {avaliacoes.dose}</strong>
                </div>
                <div className="Pergunta">
                    Data Inicio:
                    <strong> {avaliacoes.data_inicio}</strong>
                </div>
                <div className="Pergunta">
                    Prescrito Por:
                    <strong> {avaliacoes.prescrito_por}</strong>
                </div>
                <div className="Pergunta">
                    Suspensao Data:
                    <strong> {avaliacoes.suspensao_data}</strong>
                </div>
                <div className="Pergunta">
                    Suspensao Motivo:
                    <strong> {avaliacoes.suspensao_motivo}</strong>
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
                    <button onClick={() => onEditClick(avaliacoes.id)}>
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

function TabelaMedicamentos(props) {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [currentPage] = useState(1);

    const itemsPerPage = props.itemsPerPage;


    async function carregarAvaliacoes() {
        try {
            const response = await api.get(
                `v1/avaliacoes/paciente/${props.pacienteId}`
            );
            setAvaliacoes(response.data);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarAvaliacoes();
    }, []);

    const totalPages = Math.ceil((avaliacoes?.length || 0) / itemsPerPage);

    const getMedicamentosPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return avaliacoes?.slice(inicio, fim) || [];
    };

    const handleEditarClick = (avaliacoesId) => {
        props.onEditarClick(avaliacoesId);
    };

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getMedicamentosPaginaAtual().slice(startIndex, endIndex).map((avaliacoes) => (
            <MedicamentosLinha key={avaliacoes.id} avaliacoes={avaliacoes} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaMedicamentos">
            {avaliacoes.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui registros de Medicamentos Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {avaliacoes.length}.
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

export default TabelaMedicamentos;