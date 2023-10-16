import React, {useEffect, useState} from "react";
import "./TabelaVacina.css"
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

function VacinaLinha({ vacina, onEditClick }) {
    const [open, setOpen] = useState(false);

    const dataFormated = vacina.data;
    const formattedData = format(new Date(dataFormated.replace(/-/g, '/')), "dd/MM/yyyy");
    const formattedDateCreated = format(new Date(vacina.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(vacina.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/vacinas/${vacina.id}`);
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
        <tr key={vacina.id} className="VacinaLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Data:
                    <strong> {formattedData}</strong>
                </div>
                <div className="Pergunta">
                    Nome:
                    <strong> {vacina.nome}</strong>
                </div>
                <div className="Pergunta">
                    Tipo:
                    <strong> {vacina.tipo}</strong>
                </div>
                <div className="Pergunta">
                    Ass:
                    <strong> {vacina.ass}</strong>
                </div>
                <div className="Pergunta">
                    Lote:
                    <strong> {vacina.lote}</strong>
                </div>
                <div className="Pergunta">
                    Outra:
                    <strong> {vacina.outra}</strong>
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
                    <button onClick={() => onEditClick(vacina.id)}>
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

function TabelaVacina(props) {
    const [vacina, setVacina] = useState([]);
    const [currentPage] = useState(1);
    const [loading, setLoading] = useState(true)

    const itemsPerPage = props.itemsPerPage;

    async function carregarGlicemia() {
        try {
            const response = await api.get(
                `v1/vacinas/paciente/${props.pacienteId}`
            );
            setVacina(response.data);
            setLoading(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarGlicemia();
    }, []);

    const totalPages = Math.ceil((vacina?.length || 0) / itemsPerPage);

    const getVacinasPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return vacina?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (vacinaId) => {
        props.onEditarClick(vacinaId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getVacinasPagAtual().slice(startIndex, endIndex).map((vacina) => (
            <VacinaLinha key={vacina.id} vacina={vacina} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaVacina">
            {vacina.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {vacina.length}.
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

export default TabelaVacina;
