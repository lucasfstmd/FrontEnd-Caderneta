import React, {useEffect, useState} from "react";
import "./TabelaPolifarmacia.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {DialogContent, DialogContentText} from "@mui/material";
import Loading from "../../../../../../../components/loading/Loading";

function PolifarmaciaLinha({ polifarmacia, onEditClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(polifarmacia.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(polifarmacia.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/polifarmacias/${polifarmacia.id}`);
        } catch (error) {
            console.log(undefined)
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

    return (
        <tr key={polifarmacia.id} className="PolifarmaciaLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Uso Concomitante:
                    <strong> {polifarmacia.uso_concomitante === 0 ? "Não" : "Sim"}</strong>
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
                    <button onClick={() => onEditClick(polifarmacia.id)}>
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

function TabelaPolifarmacia(props) {
    const [polifarmacia, setPolifarmacia] = useState([]);
    const [currentPage] = useState(1);
    const [loading, setLoading] = useState(true)

    const itemsPerPage = props.itemsPerPage;

    async function carregarPolifarmacia() {
        try {
            const response = await api.get(
                `v1/polifarmacias/paciente/${props.pacienteId}`
            );
            setPolifarmacia(response.data);
            setLoading(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarPolifarmacia();
    }, []);

    const totalPages = Math.ceil((polifarmacia?.length || 0) / itemsPerPage);

    const getPolifarmaciasPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return polifarmacia?.slice(inicio, fim) || [];
    };

    const handleEditarClick = (polifarmaciaId) => {
        props.onEditarClick(polifarmaciaId);
    };

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getPolifarmaciasPaginaAtual().slice(startIndex, endIndex).map((polifarmacia) => (
            <PolifarmaciaLinha key={polifarmacia.id} polifarmacia={polifarmacia} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaPolifarmacia">
            {polifarmacia.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {polifarmacia.length}.
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

export default TabelaPolifarmacia;
