import React, {useState} from "react"
import "./TabelaIvcf.css"
import {format} from "date-fns";
import api from "../../../../../../../service/api";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function IvcfLinha({ ivcf, onEditClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(ivcf.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(ivcf.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/ivcfs/${ivcf.id}`);
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
        <tr key={ivcf.id} className="IvcfLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    P1:
                    <strong> {ivcf.p1}</strong>
                </div>
                <div className="Pergunta">
                    P2:
                    <strong> {ivcf.p2}</strong>
                </div>
                <div className="Pergunta">
                    P3:
                    <strong> {ivcf.p3}</strong>
                </div>
                <div className="Pergunta">
                    P4:
                    <strong> {ivcf.p4}</strong>
                </div>
                <div className="Pergunta">
                    P5
                    <strong> {ivcf.p5}</strong>
                </div>
                <div className="Pergunta">
                    P6:
                    <strong> {ivcf.p6}</strong>
                </div>
                <div className="Pergunta">
                    P7
                    <strong> {ivcf.p7}</strong>
                </div>
                <div className="Pergunta">
                    P8:
                    <strong> {ivcf.p8}</strong>
                </div>
                <div className="Pergunta">
                    P9:
                    <strong> {ivcf.p9}</strong>
                </div>
                <div className="Pergunta">
                    P10:
                    <strong> {ivcf.p10}</strong>
                </div>
                <div className="Pergunta">
                    P11:
                    <strong> {ivcf.p11}</strong>
                </div>
                <div className="Pergunta">
                    P12:
                    <strong> {ivcf.p12}</strong>
                </div>
                <div className="Pergunta">
                    P13:
                    <strong> {ivcf.p13}</strong>
                </div>
                <div className="Pergunta">
                    P14:
                    <strong> {ivcf.p14}</strong>
                </div>
                <div className="Pergunta">
                    P15:
                    <strong> {ivcf.p15}</strong>
                </div>
                <div className="Pergunta">
                    P16:
                    <strong> {ivcf.p16}</strong>
                </div>
                <div className="Pergunta">
                    P17:
                    <strong> {ivcf.p17}</strong>
                </div>
                <div className="Pergunta">
                    P18:
                    <strong> {ivcf.p18}</strong>
                </div>
                <div className="Pergunta">
                    P19:
                    <strong> {ivcf.p19}</strong>
                </div>
                <div className="Pergunta">
                    P20:
                    <strong> {ivcf.p20}</strong>
                </div>
                <div className="Pergunta">
                    P21:
                    <strong> {ivcf.p21}</strong>
                </div>
                <div className="Pergunta">
                    P22:
                    <strong> {ivcf.p22}</strong>
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
                    <button onClick={() => onEditClick(ivcf.id)}>
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

function TabelaIvcf(props) {
    const [currentPage] = useState(1);

    const itemsPerPage = props.itemsPerPage;
    const totalPages = Math.ceil((props.data?.length || 0) / itemsPerPage);

    const handleEditarClick = (saudeBucalId) => {
        props.onEditarClick(saudeBucalId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return props.data.slice(startIndex, endIndex).map((ivcf) => (
            <IvcfLinha key={ivcf.id} ivcf={ivcf} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaIvcf">
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

export default TabelaIvcf;