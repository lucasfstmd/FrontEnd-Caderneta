import React, {useEffect, useState} from "react"
import "./TabelaGlicemia.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function GlicemiaLinha({ glicemia, onEditClick }) {
    const [open, setOpen] = useState(false);

    const dataFormated = glicemia.data;
    const formattedData = format(new Date(dataFormated.replace(/-/g, '/')), "dd/MM/yyyy");
    const formattedDateCreated = format(new Date(glicemia.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(glicemia.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/glicemia-controles/${glicemia.id}`);
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
        <tr key={glicemia.id} className="GlicemiaLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Data:
                    <strong> {formattedData}</strong>
                </div>
                <div className="Pergunta">
                    Tipo:
                    <strong> {glicemia.tipo}</strong>
                </div>
                <div className="Pergunta">
                    Valor:
                    <strong> {glicemia.valor}</strong>
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
                    <button onClick={() => onEditClick(glicemia.id)}>
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

function TabelaGlicemia(props) {
    const [glicemia, setGlicemia] = useState([]);
    const [currentPage] = useState(1);


    const itemsPerPage = props.itemsPerPage;

    useEffect(() => {
        async function carregarGlicemia() {
            try {
                const response = await api.get(
                    `v1/glicemia-controles/paciente/${props.pacienteId}`
                );
                setGlicemia(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        carregarGlicemia();
    });

    const totalPages = Math.ceil((glicemia?.length || 0) / itemsPerPage);

    const getGlicemiaPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return glicemia?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (glicemiaId) => {
        props.onEditarClick(glicemiaId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getGlicemiaPagAtual().slice(startIndex, endIndex).map((glicemia) => (
            <GlicemiaLinha key={glicemia.id} glicemia={glicemia} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaGlicemia">
            {glicemia.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {glicemia.length}.
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

export default TabelaGlicemia;