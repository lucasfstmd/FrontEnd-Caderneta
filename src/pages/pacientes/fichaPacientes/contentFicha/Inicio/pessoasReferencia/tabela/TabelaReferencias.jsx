import React, {useEffect, useState} from "react"
import "./TabelaReferencias.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {DialogContent, DialogContentText} from "@mui/material";

function ReferenciaLinha({ referencias, onEditClick }){
    const [open, setOpen] = useState(false);

    const formattedDateInformacao = format(new Date(referencias.data_informacao), "dd/MM/yyyy");
    const formattedDateCreated = format(new Date(referencias.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(referencias.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/referencias/${referencias.id}`);
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
        <tr key={referencias.id} className="ReferenciasLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Nome:
                    <strong> {referencias.nome}</strong>
                </div>
                <div className="Pergunta">
                    Data Nascimento:
                    <strong> {referencias.data_nascimento}</strong>
                </div>
                <div className="Pergunta">
                    Vinculo:
                    <strong> {referencias.vinculo}</strong>
                </div>
                <div className="Pergunta">
                    Endereço:
                    <strong> {referencias.endereco}</strong>
                </div>
                <div className="Pergunta">
                    Telefone:
                    <strong> {referencias.telefone}</strong>
                </div>
                <div className="Pergunta">
                    Celular
                    <strong> {referencias.celular}</strong>
                </div>
                <div className="Pergunta">
                    Mora com você?:
                    <strong> {referencias.mora_com_voce === false ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Data Informação:
                    <strong> {formattedDateInformacao}</strong>
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
                    <button onClick={() => onEditClick(referencias.id)}>
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

function TabelaReferencias(props) {
    const [referencias, setReferencias] = useState([]);
    const [currentPage] = useState(1);


    const itemsPerPage = props.itemsPerPage;

    useEffect(() => {
        async function carregarReferencias() {
            try {
                const response = await api.get(
                    `v1/referencias/paciente/${props.pacienteId}`
                );
                setReferencias(response.data);
            } catch (error) {
                console.log(undefined);
            }
        }

        carregarReferencias();
    });

    const totalPages = Math.ceil((referencias?.length || 0) / itemsPerPage);

    const getReferenciasPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return referencias?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (referenciaId) => {
        props.onEditarClick(referenciaId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getReferenciasPaginaAtual().slice(startIndex, endIndex).map((referencias) => (
            <ReferenciaLinha key={referencias.id} referencias={referencias} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaReferencias">
            {referencias.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {referencias.length}.
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
    );
}

export default TabelaReferencias;