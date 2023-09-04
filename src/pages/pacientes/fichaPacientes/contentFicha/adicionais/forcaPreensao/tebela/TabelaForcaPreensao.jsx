import React, {useEffect, useState} from "react";
import "./TabelaForcaPreensao.css"
import api from "../../../../../../../service/api";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function ForcaPreensaoLinha({ forca, onEditarClick }) {
    const [open, setOpen] = useState(false);

    async function handleDelet() {
        try {
            await api.delete(`v1/preensao-forcas/${forca.id}`);
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

    const mediaArredondada = ((forca.medida_1 + forca.medida_2 + forca.medida_3) / 3);
    const media = mediaArredondada.toFixed(2);

    return (
        <tr key={forca.id} className="PreensaoLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    <strong>{forca.medida_1}</strong>
                </div>
            </td>
            <td className="TextosTabela">
                <div className="Pergunta">
                    <strong>{forca.medida_2}</strong>
                </div>
            </td>
            <td className="TextosTabela">
                <div className="Pergunta">
                    <strong>{forca.medida_3}</strong>
                </div>
            </td>
            <td className="TextosTabela">
                <div className="Pergunta">
                    <strong>{media}</strong>
                </div>
            </td>
            <td className="TextosTabela">
                <div className="Pergunta">
                    <strong>{forca.membro_dominante}</strong>
                </div>
            </td>
            <td className="BotaoTabela">
                <div className="ButaoEditar">
                    <button onClick={() => onEditarClick(forca.id)}>
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
    );
}

function TabelaForcaPreensao(props) {
    const [forcasPreensao, setForcasPreensao] = useState([]);
    const [currentPage] = useState(1);
    const itemsPerPage = props.itemsPerPage;

    async function carregarForcas() {
        try {
            const response = await api.get(
                `v1/preensao-forcas/paciente/${props.pacienteId}`
            );
            setForcasPreensao(response.data);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarForcas();
    }, []);

    const totalPages = Math.ceil((forcasPreensao?.length || 0) / itemsPerPage);

    const getForcasPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return forcasPreensao?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (forcasPreensaoId) => {
        props.onEditarClick(forcasPreensaoId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getForcasPagAtual().slice(startIndex, endIndex).map((forca) => (
            <ForcaPreensaoLinha key={forca.id} forca={forca} onEditarClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaForcaPreensao">
            {forcasPreensao.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {forcasPreensao.length}.
                    </div>
                    <table>
                        <thead>
                        <tr className="Colunas">
                            <th>
                                <div className="ColunaInformacoes">Medida 1</div>
                            </th>
                            <th>
                                <div className="ColunaInformacoes">Medida 2</div>
                            </th>
                            <th>
                                <div className="ColunaInformacoes">Medida 3</div>
                            </th>
                            <th>
                                <div className="ColunaInformacoes">Média</div>
                            </th>
                            <th>
                                <div className="ColunaInformacoes">Membro Dominante</div>
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

export default TabelaForcaPreensao;