import React, {useEffect, useState} from "react";
import './TabelaFamiliares.css'
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import {format} from "date-fns";
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {DialogContent, DialogContentText} from "@mui/material";
import Loading from "../../../../../../../components/loading/Loading";
import { useParams } from 'react-router-dom'

function FamiliaresLinha({ familiares, onEditClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(familiares.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(familiares.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/familiares/${familiares.id}`);
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
        <tr key={familiares.id} className="FamiliaresLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Ano:
                    <strong> {familiares.ano}</strong>
                </div>
                <div className="Pergunta">
                    Você mora sozinho(a)?:
                    <strong> {familiares.p1 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você mora com familiares?:
                    <strong> {familiares.p2 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você mora com seu(sua) cônjuge ou companheiro(a)?:
                    <strong> {familiares.p3 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você reside em instituição de longa permanência para idosos (ILPI), abrigo ou casa de repouso?:
                    <strong> {familiares.p4 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Nos últimos 30 dias, você se encontrou com amigos ou familiares para conversar ou fazer alguma atividade, como ir ao cinema ou à igreja, passear ou caminhar junto?:
                    <strong> {familiares.p5 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Em caso de necessidade, você conta com alguém para acompanhá-lo(a) à unidade de saúde ou a uma consulta?:
                    <strong> {familiares.p6 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você tem fácil acesso aos serviços de farmácia, padaria ou supermercado?:
                    <strong> {familiares.p7 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você tem fácil acesso a transporte?:
                    <strong> {familiares.p8 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você trabalha atualmente?:
                    <strong> {familiares.p9 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você recebe aposentadoria ou pensão?:
                    <strong> {familiares.p10 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você recebe benefício de prestação continuada (BPC)?:
                    <strong> {familiares.p11 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você recebe benefícios do Bolsa-Família?:
                    <strong> {familiares.p12 === 0 ? "Não" : "Sim"}</strong>
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
                    <button onClick={() => onEditClick(familiares.id)}>
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
    )
}

function TabelaFamiliares(props) {
    const [familiares, setFamiliares] = useState([]);
    const [currentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const params = useParams();
    const { id } = params
    const itemsPerPage = props.itemsPerPage;

    async function carregarFamiliares() {
        try {
            const response = await api.get(
                `v1/familiares/paciente/${id}`
            );
            setFamiliares(response.data);
            setLoading(false);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarFamiliares();
    }, []);

    const totalPages = Math.ceil((familiares?.length || 0) / itemsPerPage);

    const getFamiliaresPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return familiares?.slice(inicio, fim) || [];
    };

    const handleEditarClick = (familiarId) => {
        props.onEditarClick(familiarId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getFamiliaresPaginaAtual().slice(startIndex, endIndex).map((familiares) => (
            <FamiliaresLinha key={familiares.id} familiares={familiares} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaFamiliares">
            {familiares.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {familiares.length}.
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
    );
}

export default TabelaFamiliares;
