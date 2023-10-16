import React, {useEffect, useState} from "react";
import "./TabelaSarcf.css"
import api from "../../../../../../../service/api";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Loading from "../../../../../../../components/loading/Loading";

function SarcfLinha({ sarcf, onEditClick }) {
    const [open, setOpen] = useState(false);

    async function handleDelet() {
        try {
            await api.delete(`v1/sarcfs/${sarcf.id}`);
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
        <tr key={sarcf.id} className="SarcfLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    O quanto de dificuldade você tem para levantar e carregar 5 kg?:
                    <strong> {sarcf.p1}</strong>
                </div>
                <div className="Pergunta">
                    O quanto de dificuldade você tem para atravessar um cômodo?
                    <strong> {sarcf.p2}</strong>
                </div>
                <div className="Pergunta">
                    O quanto de dificuldade você tem para levantar de uma cama ou cadeira?
                    <strong> {sarcf.p3}</strong>
                </div>
                <div className="Pergunta">
                    O quanto de dificuldade você tem para subir um lance de escadas de 10 degraus?
                    <strong> {sarcf.p4}</strong>
                </div>
                <div className="Pergunta">
                    Quantas vezes você caiu no último ano?
                    <strong> {sarcf.p5}</strong>
                </div>
            </td>
            <td className="BotaoTabela">
                <div className="ButaoEditar">
                    <button onClick={() => onEditClick(sarcf.id)}>
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

function TabelaSarcf(props) {
    const [sarcf, setSarcf] = useState([]);
    const [loading, setLoading] = useState(true)
    const [currentPage] = useState(1);

    const itemsPerPage = props.itemsPerPage;

    async function carregarSarcfs() {
        try {
            const response = await api.get(
                `v1/sarcfs/paciente/${props.pacienteId}`
            );
            setSarcf(response.data);
            setLoading(false);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarSarcfs();
    }, []);

    const totalPages = Math.ceil((sarcf?.length || 0) / itemsPerPage);

    const getSarcfPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return sarcf?.slice(inicio, fim) || [];
    };

    const handleEditarClick = (sarcId) => {
        props.onEditarClick(sarcId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getSarcfPagAtual().slice(startIndex, endIndex).map((sarcf) => (
            <SarcfLinha key={sarcf.id} sarcf={sarcf} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaSarcf">
            {sarcf.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {sarcf.length}.
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

export default TabelaSarcf;
