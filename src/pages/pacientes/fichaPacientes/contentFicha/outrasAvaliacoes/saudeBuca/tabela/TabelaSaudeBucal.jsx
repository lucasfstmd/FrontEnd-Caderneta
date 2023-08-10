import React, {useState} from "react";
import "./TabelaSaudeBucal.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function SaudeBucalLinha({ bucalSaudes, onEditClick }){
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(bucalSaudes.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(bucalSaudes.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/bucal-saudes/${bucalSaudes.id}`);
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
        <tr key={bucalSaudes.id} className="BucalSaudesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Ano:
                    <strong> {bucalSaudes.ano}</strong>
                </div>
                <div className="Pergunta">
                    P1:
                    <strong> {bucalSaudes.p1 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P2:
                    <strong> {bucalSaudes.p2 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P3:
                    <strong> {bucalSaudes.p3 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P4:
                    <strong> {bucalSaudes.p4 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P5:
                    <strong> {bucalSaudes.p5 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P6:
                    <strong> {bucalSaudes.p6 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P7:
                    <strong> {bucalSaudes.p7 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P8:
                    <strong> {bucalSaudes.p8 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P9:
                    <strong> {bucalSaudes.p9 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P10:
                    <strong> {bucalSaudes.p10 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P11:
                    <strong> {bucalSaudes.p11 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P12:
                    <strong> {bucalSaudes.p12 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P13:
                    <strong> {bucalSaudes.p13 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P14:
                    <strong> {bucalSaudes.p14 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P15:
                    <strong> {bucalSaudes.p15 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P16:
                    <strong> {bucalSaudes.p16 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P17:
                    <strong> {bucalSaudes.p17 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P18:
                    <strong> {bucalSaudes.p18 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P19:
                    <strong> {bucalSaudes.p19 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P20:
                    <strong> {bucalSaudes.p20 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P21:
                    <strong> {bucalSaudes.p21 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P22:
                    <strong> {bucalSaudes.p22 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P23:
                    <strong> {bucalSaudes.p23 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P24:
                    <strong> {bucalSaudes.p24 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P25:
                    <strong> {bucalSaudes.p25 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P26:
                    <strong> {bucalSaudes.p26 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P27:
                    <strong> {bucalSaudes.p27 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P28:
                    <strong> {bucalSaudes.p28 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P29:
                    <strong> {bucalSaudes.p29 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P30:
                    <strong> {bucalSaudes.p30 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P31:
                    <strong> {bucalSaudes.p31 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    P32:
                    <strong> {bucalSaudes.p32}</strong>
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
                    <button onClick={() => onEditClick(bucalSaudes.id)}>
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

function TabelaSaudeBucal(props) {
    const [currentPage] = useState(1);

    const itemsPerPage = props.itemsPerPage;
    const totalPages = Math.ceil((props.data?.length || 0) / itemsPerPage);

    const handleEditarClick = (saudeBucalId) => {
        props.onEditarClick(saudeBucalId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return props.data.slice(startIndex, endIndex).map((bucalSaudes) => (
            <SaudeBucalLinha key={bucalSaudes.id} bucalSaudes={bucalSaudes} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaSaudeBucal">
            {props.data.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {props.data.length}.
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

export default TabelaSaudeBucal;