import React, {useEffect, useState} from "react";
import "./TabelaAmbientais.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function AmbientaisLinha({ ambientais, onEditClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(ambientais.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(ambientais.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/ambientais/${ambientais.id}`);
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
        <tr key={ambientais.id} className="AmbientaisLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Ano:
                    <strong> {ambientais.ano}</strong>
                </div>
                <div className="Pergunta">
                    Áreas de locomoção desimpedidas:
                    <strong> {ambientais.p1 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Presença de barras de apoio:
                    <strong> {ambientais.p2 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Pisos uniformes e tapetes bem fixos:
                    <strong> {ambientais.p3 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Presença de iluminação suficiente para clarear todo o interior de cada cômodo, incluindo degraus:
                    <strong> {ambientais.p4 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Interruptores acessíveis na entrada dos cômodos:
                    <strong> {ambientais.p5 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Área do chuveiro com antiderrapante:
                    <strong> {ambientais.p6 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Box com abertura fácil ou presença de cortina bem firme:
                    <strong> {ambientais.p7 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Armários baixos, sem necessidade do uso de escada:
                    <strong> {ambientais.p8 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Piso antiderrapante:
                    <strong> {ambientais.p9 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Corrimão dos dois lados e firme:
                    <strong> {ambientais.p10 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Não há:
                    <strong> {ambientais.p11 === 0 ? "Não" : "Sim"}</strong>
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
                    <button onClick={() => onEditClick(ambientais.id)}>
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

function TabelaAmbientais(props) {
    const [ambientais, setAmbientais] = useState([]);
    const [currentPage] = useState(1);


    const itemsPerPage = props.itemsPerPage;

    async function carregarAmbientais() {
        try {
            const response = await api.get(
                `v1/ambientais/paciente/${props.pacienteId}`
            );
            setAmbientais(response.data);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarAmbientais();
    }, []);

    const totalPages = Math.ceil((ambientais?.length || 0) / itemsPerPage);

    const getAmbientaisPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return ambientais?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (ambientaisId) => {
        props.onEditarClick(ambientaisId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getAmbientaisPaginaAtual().slice(startIndex, endIndex).map((ambientais) => (
            <AmbientaisLinha key={ambientais.id} ambientais={ambientais} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaAmbientais">
            {ambientais.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {ambientais.length}.
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

export default TabelaAmbientais;