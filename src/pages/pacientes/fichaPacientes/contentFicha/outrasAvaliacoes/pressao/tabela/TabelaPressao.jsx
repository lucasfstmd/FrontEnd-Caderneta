import React, {useEffect, useState} from "react";
import "./TabelaPressao.css"
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

function PressaoLinha({ Pressao, onEditClick }) {
    const [open, setOpen] = useState(false);

    const dataFormated = Pressao.data;
    const formattedData = format(new Date(dataFormated.replace(/-/g, '/')), "dd/MM/yyyy");
    const formattedDateCreated = format(new Date(Pressao.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(Pressao.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/pressao-controles/${Pressao.id}`);
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
        <tr key={Pressao.id} className="PressaoLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Data:
                    <strong> {formattedData}</strong>
                </div>
                <div className="Pergunta">
                    Local Dor:
                    <strong> {Pressao.pressao}</strong>
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
                    <button onClick={() => onEditClick(Pressao.id)}>
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

function TabelaPressao(props) {
    const [pressao, setPressao] = useState([]);
    const [currentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const params = useParams();
    const { id } = params
    const itemsPerPage = props.itemsPerPage;

    async function carregarPrecao() {
        try {
            const response = await api.get(
                `v1/pressao-controles/paciente/${id}`
            );
            setPressao(response.data);
            setLoading(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarPrecao();
    }, []);

    const totalPages = Math.ceil((pressao?.length || 0) / itemsPerPage);

    const getPressaoPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return pressao?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (cronicasId) => {
        props.onEditarClick(cronicasId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getPressaoPagAtual().slice(startIndex, endIndex).map((Pressao) => (
            <PressaoLinha key={Pressao.id} Pressao={Pressao} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaPressao">
            {pressao.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {pressao.length}.
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

export default TabelaPressao;
