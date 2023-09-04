import React, {useEffect, useState} from "react";
import "./TabelaAtualizacao.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function AtualizacaoLinha({ atualizacao, onEditClick }){
    const [open, setOpen] = useState(false);

    const dataFormated = atualizacao.data;
    const formattedData = format(new Date(dataFormated.replace(/-/g, '/')), "dd/MM/yyyy");
    const formattedDateCreated = format(new Date(atualizacao.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(atualizacao.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/atualizacoes/${atualizacao.id}`);
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
        <tr key={atualizacao.id} className="AtualizacoesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Data:
                    <strong> {formattedData}</strong>
                </div>
                <div className="Pergunta">
                    Responsavel:
                    <strong> {atualizacao.responsavel}</strong>
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
                    <button onClick={() => onEditClick(atualizacao.id)}>
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

function TabelaAtualizacao(props) {
    const [atualizacaos, setAtualizacoes] = useState([]);
    const [currentPage] = useState(1);


    const itemsPerPage = props.itemsPerPage;

    async function carregarAtualizacoes() {
        try {
            const response = await api.get(
                `v1/atualizacoes/paciente/${props.pacienteId}`
            );
            setAtualizacoes(response.data);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarAtualizacoes();
    }, []);


    const totalPages = Math.ceil((atualizacaos?.length || 0) / itemsPerPage);

    const getExamesPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return atualizacaos?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (atualizacaosId) => {
        props.onEditarClick(atualizacaosId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getExamesPagAtual().slice(startIndex, endIndex).map((atualizacao) => (
            <AtualizacaoLinha key={atualizacao.id} atualizacao={atualizacao} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaAtualizacao">
            {atualizacaos.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {atualizacaos.length}.
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

export default TabelaAtualizacao;