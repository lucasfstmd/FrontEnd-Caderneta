import React, {useEffect, useState} from "react"
import "./TabelaDiagnosticos.css"
import api from "../../../../../../../service/api";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Loading from "../../../../../../../components/loading/Loading";
import { useParams } from 'react-router-dom'

function DiagnosticosLinha({ diagnosticos, onEditClick }) {
    const [open, setOpen] = useState(false);

    async function handleDelet() {
        try {
            await api.delete(`v1/diagnosticos/${diagnosticos.id}`);
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
        <tr key={diagnosticos.id} className="DiagnosticosLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Tipo:
                    <strong> {diagnosticos.tipo_outro === "" ? diagnosticos.tipo : diagnosticos.tipo_outro}</strong>
                </div>
                <div className="Pergunta">
                    Ano Diagnostico:
                    <strong> {diagnosticos.ano_diagnostico}</strong>
                </div>
            </td>
            <td className="BotaoTabela">
                <div className="ButaoEditar">
                    <button onClick={() => onEditClick(diagnosticos.id)}>
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

function TabelaDiagnosticos(props) {
    const [diagnosticos, setDiagnosticos] = useState([]);
    const [currentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const params = useParams();
    const { id } = params
    const itemsPerPage = props.itemsPerPage;

    async function carregarDiagnosticos() {
        try {
            const response = await api.get(
                `v1/diagnosticos/paciente/${id}`
            );
            setDiagnosticos(response.data);
            setLoading(false);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarDiagnosticos();
    }, []);

    const totalPages = Math.ceil((diagnosticos?.length || 0) / itemsPerPage);

    const getDiagnosticosPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return diagnosticos?.slice(inicio, fim) || [];
    };

    const handleEditarClick = (diagnosticosId) => {
        props.onEditarClick(diagnosticosId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getDiagnosticosPaginaAtual().slice(startIndex, endIndex).map((diagnosticos) => (
            <DiagnosticosLinha key={diagnosticos.id} diagnosticos={diagnosticos} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaDiagnosticos">
            {diagnosticos.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {diagnosticos.length}.
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

export default TabelaDiagnosticos;
