import React, {useEffect, useState} from "react"
import "./TabelaPercaPeso.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Loading from "../../../../../../../components/loading/Loading";
import { useParams } from 'react-router-dom'

function PercaPesoLinha({ pesoPerca, onEditClick }){
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(pesoPerca.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(pesoPerca.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/peso-perdas/${pesoPerca.id}`);
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
        <tr key={pesoPerca.id} className="PesoPercaLinhas">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Ano:
                    <strong> {pesoPerca.ano}</strong>
                </div>
                <div className="Pergunta">
                    Perca de Peso?:
                    <strong> {pesoPerca.perda_peso === 0 ? "Não" : "Sim"}</strong>
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
                    <button onClick={() => onEditClick(pesoPerca.id)}>
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

function TabelaPercaPeso(props) {
    const [percaPesos, setPercaPesos] = useState([]);
    const [currentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const params = useParams();
    const { id } = params
    const itemsPerPage = props.itemsPerPage;

    async function carregarPercaPeso() {
        try {
            const response = await api.get(
                `v1/peso-perdas/paciente/${id}`
            );
            setPercaPesos(response.data);
            setLoading(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarPercaPeso();
    }, []);

    const totalPages = Math.ceil((percaPesos?.length || 0) / itemsPerPage);

    const getPesoPercasPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return percaPesos?.slice(inicio, fim) || [];
    };

    const handleEditarClick = (pesoPercaId) => {
        props.onEditarClick(pesoPercaId);
    };

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getPesoPercasPaginaAtual().slice(startIndex, endIndex).map((pesoPerca) => (
            <PercaPesoLinha key={pesoPerca.id} pesoPerca={pesoPerca} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaPercaPeso">
            {percaPesos.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {percaPesos.length}.
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
                            <Loading loading={loading}>
                                {getLinhas()}
                            </Loading>
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}

export default TabelaPercaPeso;
