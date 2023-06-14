import React, {useEffect, useState} from "react"
import "./TabelaVulnerabilidades.css"
import api from "../../../../../../../service/api";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function VulnerabilidadesLinha({ vulnerabilidades, onEditClick }) {
    const [open, setOpen] = useState(false);

    async function handleDelet() {
        try {
            await api.delete(`v1/vulnerabilidades/${vulnerabilidades.id}`);
        } catch (error) {
            console.log(error)
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

    const Classificacao = () => {
        if(vulnerabilidades.pontuacao_total <= 2) {
            return "Idoso Robusto";
        } else if(vulnerabilidades.pontuacao_total >= 3 && vulnerabilidades.pontuacao_total <= 6) {
            return "Idoso em risco de Fragilização";
        } else if (vulnerabilidades.pontuacao_total >= 7 && vulnerabilidades.pontuacao_total <= 10) {
            return "Idoso Frágil";
        }
    }

    return (
        <tr key={vulnerabilidades.id} className="VulnerabilidadesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Data:
                    <strong> {vulnerabilidades.ano}</strong>
                </div>
                <div className="Pergunta">
                    Classificação:
                    <strong> {Classificacao()}</strong>
                </div>
            </td>
            <td className="BotaoTabela">
                <div className="ButaoEditar">
                    <button onClick={() => onEditClick(vulnerabilidades.id)}>
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

function TabelaVulnerabilidades(props) {
    const [vulnerabilidade, setVulnerabilidade] = useState([]);
    const [currentPage] = useState(1);

    const itemsPerPage = props.itemsPerPage;


    useEffect(() => {
        async function carregarVulnerabilidade() {
            try {
                const response = await api.get(
                    `v1/vulnerabilidades/paciente/${props.pacienteId}`
                );
                setVulnerabilidade(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        carregarVulnerabilidade();
    });

    const totalPages = Math.ceil((vulnerabilidade?.length || 0) / itemsPerPage);

    const getVulnerabilidadesPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return vulnerabilidade?.slice(inicio, fim) || [];
    };

    const handleEditarClick = (vulnerabilidadeId) => {
        props.onEditarClick(vulnerabilidadeId);
    };

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getVulnerabilidadesPaginaAtual().slice(startIndex, endIndex).map((vulnerabilidades) => (
            <VulnerabilidadesLinha key={vulnerabilidades.id} vulnerabilidades={vulnerabilidades} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaVulnerabilidades">
            {vulnerabilidade.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {vulnerabilidade.length}.
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

export default TabelaVulnerabilidades;