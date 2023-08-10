import React, {useEffect, useState} from "react";
import "./TabelaCronicas.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function CronicasLinha({ cronicas, onEditClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(cronicas.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(cronicas.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/cronicas/${cronicas.id}`);
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
        <tr key={cronicas.id} className="CronicasLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Ano:
                    <strong> {cronicas.ano}</strong>
                </div>
                <div className="Pergunta">
                    Você tem alguma dor com duração igual ou superior a 3 meses?:
                    <strong> {cronicas.p1 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    A dor é como um choque ou uma queimação?:
                    <strong> {cronicas.p2 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    A dor piora ao andar?:
                    <strong> {cronicas.p3 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    A dor melhora com o repouso?:
                    <strong> {cronicas.p4 === 0 ? "Não" : "Sim"}</strong>
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
                    <button onClick={() => onEditClick(cronicas.id)}>
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

function TabelaCronicas(props) {
    const [cronicas, setCronicas] = useState([]);
    const [currentPage] = useState(1);


    const itemsPerPage = props.itemsPerPage;

    useEffect(() => {
        async function carregarCronicas() {
            try {
                const response = await api.get(
                    `v1/cronicas/paciente/${props.pacienteId}`
                );
                setCronicas(response.data);
            } catch (error) {
                console.log(undefined);
            }
        }

        carregarCronicas();
    });

    const totalPages = Math.ceil((cronicas?.length || 0) / itemsPerPage);

    const getCronicasPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return cronicas?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (cronicasId) => {
        props.onEditarClick(cronicasId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getCronicasPaginaAtual().slice(startIndex, endIndex).map((cronicas) => (
            <CronicasLinha key={cronicas.id} cronicas={cronicas} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaCronicas">
            {cronicas.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {cronicas.length}.
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

export default TabelaCronicas;