import React, {useEffect, useState} from "react";
import "./TabelaSppb.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function SppbLinha({ sppb, onEditClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(sppb.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(sppb.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/sppbs/${sppb.id}`);
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
        <tr key={sppb.id} className="SppbLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    P1:
                    <strong> {sppb.p1}</strong>
                </div>
                <div className="Pergunta">
                    P2:
                    <strong> {sppb.p2}</strong>
                </div>
                <div className="Pergunta">
                    P3:
                    <strong> {sppb.p3}</strong>
                </div>
                <div className="Pergunta">
                    P4:
                    <strong> {sppb.p4}</strong>
                </div>
                <div className="Pergunta">
                    P5
                    <strong> {sppb.p5}</strong>
                </div>
                <div className="Pergunta">
                    P6:
                    <strong> {sppb.p6}</strong>
                </div>
                <div className="Pergunta">
                    P7
                    <strong> {sppb.p7}</strong>
                </div>
                <div className="Pergunta">
                    P8:
                    <strong> {sppb.p8}</strong>
                </div>
                <div className="Pergunta">
                    P9:
                    <strong> {sppb.p9}</strong>
                </div>
                <div className="Pergunta">
                    P10:
                    <strong> {sppb.p10}</strong>
                </div>
                <div className="Pergunta">
                    P11:
                    <strong> {sppb.p11}</strong>
                </div>
                <div className="Pergunta">
                    P12:
                    <strong> {sppb.p12}</strong>
                </div>
                <div className="Pergunta">
                    P13:
                    <strong> {sppb.p13}</strong>
                </div>
                <div className="Pergunta">
                    P14:
                    <strong> {sppb.p14}</strong>
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
                    <button onClick={() => onEditClick(sppb.id)}>
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

function TabelaSppb(props) {
    const [sppbs, setSppbs] = useState([]);
    const [currentPage] = useState(1);


    const itemsPerPage = props.itemsPerPage;

    useEffect(() => {
        async function carregarSppb() {
            try {
                const response = await api.get(
                    `v1/sppbs/paciente/${props.pacienteId}`
                );
                setSppbs(response.data);
            } catch (error) {
                console.log(undefined);
            }
        }

        carregarSppb();
    });

    const totalPages = Math.ceil((sppbs?.length || 0) / itemsPerPage);

    const getSppbPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return sppbs?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (sppbsId) => {
        props.onEditarClick(sppbsId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getSppbPagAtual().slice(startIndex, endIndex).map((sppb) => (
            <SppbLinha key={sppb.id} sppb={sppb} onEditClick={handleEditarClick}/>
        ))
    }

    return  (
        <div className="TabelaSppb">
            {sppbs.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {sppbs.length}.
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

export default TabelaSppb;