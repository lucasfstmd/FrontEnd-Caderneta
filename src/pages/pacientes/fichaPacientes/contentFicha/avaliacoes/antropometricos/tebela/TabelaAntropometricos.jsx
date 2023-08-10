import React, {useEffect, useState} from "react"
import "./TabelaAntropometricos.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function AntropometricosLinha({ antropometricos, onEditClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(antropometricos.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(antropometricos.updated), "dd/MM/yyyy");

    const Imc = (antropometricos.peso / (antropometricos.altura ** 2)).toFixed(2);

    async function handleDelet() {
        try {
            await api.delete(`v1/antropometricos/${antropometricos.id}`);
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
        <tr key={antropometricos.id} className="AntropometricosLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Ano:
                    <strong> {antropometricos.ano}</strong>
                </div>
                <div className="Pergunta">
                    Peso:
                    <strong> { antropometricos.peso}</strong>
                </div>
                <div className="Pergunta">
                    Altura:
                    <strong> {antropometricos.altura}</strong>
                </div>
                <div className="Pergunta">
                    IMC:
                    <strong> {antropometricos.imc === null ? Imc : antropometricos.imc} Kg/m²</strong>
                </div>
                <div className="Pergunta">
                    Perimetro Panturrilha:
                    <strong> {antropometricos.perimetro_panturrilha}</strong>
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
                    <button onClick={() => onEditClick(antropometricos.id)}>
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

function TabelaAntropometricos(props) {
    const [antropometricos, setAntropometricos] = useState([]);
    const [currentPage] = useState(1);

    const itemsPerPage = props.itemsPerPage;

    useEffect(() => {
        async function carregarAntropometricos() {
            try {
                const response = await api.get(
                    `v1/antropometricos/paciente/${props.pacienteId}`
                );
                setAntropometricos(response.data);
            } catch (error) {
                console.log(undefined);
            }
        }

        carregarAntropometricos();
    });


    const totalPages = Math.ceil((antropometricos?.length || 0) / itemsPerPage);

    const getAntropometricosPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return antropometricos?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (antropometricosId) => {
        props.onEditarClick(antropometricosId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getAntropometricosPaginaAtual().slice(startIndex, endIndex).map((antropometricos) => (
            <AntropometricosLinha key={antropometricos.id} antropometricos={antropometricos} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaAntropometricos">
            {antropometricos.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {antropometricos.length}.
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

export default TabelaAntropometricos;