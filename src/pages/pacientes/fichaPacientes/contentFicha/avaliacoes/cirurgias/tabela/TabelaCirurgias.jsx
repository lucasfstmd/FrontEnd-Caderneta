import React, {useEffect, useState} from "react"
import "./TabelaCirurgias.css"
import api from "../../../../../../../service/api";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {format} from "date-fns";

function CirurgiasLinha({ cirurgias, onEditClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(cirurgias.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(cirurgias.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/cirurgias/${cirurgias.id}`);
        } catch (error) {
            console.log(error);
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
        <tr key={cirurgias.id} className="CirurgiasLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Cirurgia:
                    <strong> {cirurgias.cirurgia}</strong>
                </div>
                <div className="Pergunta">
                    Ano:
                    <strong> {cirurgias.ano}</strong>
                </div>
                <div className="Pergunta">
                    Observação:
                    <strong> {cirurgias.observacao}</strong>
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
                    <button onClick={() => onEditClick(cirurgias.id)}>
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

function TabelaCirurgias(props) {
    const [cirurgias, setCirurgias] = useState([]);
    const [currentPage] = useState(1);

    const itemsPerPage = props.itemsPerPage;

    useEffect(() => {
        async function carregarCirurgias() {
            try {
                const response = await api.get(
                    `v1/cirurgias/paciente/${props.pacienteId}`
                );
                setCirurgias(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        carregarCirurgias();
    });

    const totalPages = Math.ceil((cirurgias?.length || 0) / itemsPerPage);

    const getCirurgiasPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return cirurgias?.slice(inicio, fim) || [];
    };

    const handleEditarClick = (cirurgiasId) => {
        props.onEditarClick(cirurgiasId);
    };

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getCirurgiasPaginaAtual().slice(startIndex, endIndex).map((cirurgias) => (
            <CirurgiasLinha key={cirurgias.id} cirurgias={cirurgias} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaCirurgias">
            {cirurgias.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {cirurgias.length}.
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

export default TabelaCirurgias;