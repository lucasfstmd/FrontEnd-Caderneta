import React, {useEffect, useState} from "react"
import "./TabelaComplementares.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function ComplementaresLinha({ complementares, onEditClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(complementares.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(complementares.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/complementares/${complementares.id}`);
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
    };

    return (
        <tr key={complementares.id} className="ComplementaresLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Ano:
                    <strong> {complementares.ano}</strong>
                </div>
                <div className="Pergunta">
                    Algum familiar ou amigo(a) falou que você está ficando esquecido(a)?:
                    <strong> {complementares.p1 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    O esquecimento está piorando nos últimos meses?:
                    <strong> {complementares.p1 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    O esquecimento está impedindo a realização de alguma atividade do cotidiano?:
                    <strong> {complementares.p1 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    No último mês, você ficou com desânimo, tristeza ou desesperança?:
                    <strong> {complementares.p1 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    No último mês, você perdeu o interesse ou o prazer por atividades anteriormente prazerosas?:
                    <strong> {complementares.p1 === 0 ? "Não" : "Sim"}</strong>
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
                    <button onClick={() => onEditClick(complementares.id)}>
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

function TabelaComplementares(props) {
    const [complementares, setComplementares] = useState([]);
    const [currentPage] = useState(1);

    const itemsPerPage = props.itemsPerPage;

    async function carregarComplementares() {
        try {
            const response = await api.get(
                `v1/complementares/paciente/${props.pacienteId}`
            );
            setComplementares(response.data);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarComplementares();
    }, []);

    const totalPages = Math.ceil((complementares?.length || 0) / itemsPerPage);

    const getComplementaresPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return complementares?.slice(inicio, fim) || [];
    };

    const handleEditarClick = (complementaresId) => {
        props.onEditarClick(complementaresId);
    };

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getComplementaresPaginaAtual().slice(startIndex, endIndex).map((complementares) => (
            <ComplementaresLinha key={complementares.id} complementares={complementares} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaComplementares">
            {complementares.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {complementares.length}.
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

export default TabelaComplementares;