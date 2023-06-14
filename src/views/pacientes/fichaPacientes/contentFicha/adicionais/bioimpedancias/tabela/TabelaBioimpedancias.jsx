import React, { useState } from "react";
import "./TabelaBioimpedancias.css";
import { format } from "date-fns";
import api from "../../../../../../../service/api";
import { AiOutlineEdit } from "react-icons/ai";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, DialogContentText } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function BioimpedanciaLinha({ bioimpedancia, onEditarClick }) {
    const [open, setOpen] = useState(false);

    async function handleDelet() {
        try {
            await api.delete(`v1/bioimpedancias/${bioimpedancia.id}`);
        } catch (error) {
            console.log(error);
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

    const formattedDateCreated = format(
        new Date(bioimpedancia.created),
        "dd/MM/yyyy"
    );
    const formattedDateUpdated = format(
        new Date(bioimpedancia.updated),
        "dd/MM/yyyy"
    );

    return (
        <tr key={bioimpedancia.id} className="BioimpedanciasLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Ângulo de fase:
                    <strong> {bioimpedancia.p1}</strong>
                </div>
                <div className="Pergunta">
                    Capacitância do corpo:
                    <strong> {bioimpedancia.p2}</strong>
                </div>
                <div className="Pergunta">
                    Resistência:
                    <strong> {bioimpedancia.p3}</strong>
                </div>
                <div className="Pergunta">
                    Reatância:
                    <strong> {bioimpedancia.p4}</strong>
                </div>
                <div className="Pergunta">
                    Massa celular corporal (kg):
                    <strong> {bioimpedancia.p5}</strong>
                </div>
                <div className="Pergunta">
                    Massa celular corporal (%):
                    <strong> {bioimpedancia.p6}</strong>
                </div>
                <div className="Pergunta">
                    Massa extracelular (kg):
                    <strong> {bioimpedancia.p7}</strong>
                </div>
                <div className="Pergunta">
                    Massa extracelular (%):
                    <strong> {bioimpedancia.p8}</strong>
                </div>
                <div className="Pergunta">
                    Massa magra (kg):
                    <strong> {bioimpedancia.p9}</strong>
                </div>
                <div className="Pergunta">
                    Massa magra (%):
                    <strong> {bioimpedancia.p10}</strong>
                </div>
                <div className="Pergunta">
                    Massa gorda (kg):
                    <strong> {bioimpedancia.p11}</strong>
                </div>
                <div className="Pergunta">
                    Massa gorda (%):
                    <strong> {bioimpedancia.p12}</strong>
                </div>
                <div className="Pergunta">
                    Peso total (kg):
                    <strong> {bioimpedancia.p13}</strong>
                </div>
                <div className="Pergunta">
                    Peso total (%):
                    <strong> {bioimpedancia.p14}</strong>
                </div>
                <div className="Pergunta">
                    ME/MCC (kg):
                    <strong> {bioimpedancia.p15}</strong>
                </div>
                <div className="Pergunta">
                    IMC (kg):
                    <strong> {bioimpedancia.p16}</strong>
                </div>
                <div className="Pergunta">
                    Taxa metabólica basal (cals):
                    <strong> {bioimpedancia.p17}</strong>
                </div>
                <div className="Pergunta">
                    Água intracelular (kg):
                    <strong> {bioimpedancia.p18}</strong>
                </div>
                <div className="Pergunta">
                    Água intracelular (%):
                    <strong> {bioimpedancia.p19}</strong>
                </div>
                <div className="Pergunta">
                    Água extracelular (kg):
                    <strong> {bioimpedancia.p20}</strong>
                </div>
                <div className="Pergunta">
                    Água extracelular (%):
                    <strong> {bioimpedancia.p21}</strong>
                </div>
                <div className="Pergunta">
                    Água corporal total (kg):
                    <strong> {bioimpedancia.p22}</strong>
                </div>
                <div className="Pergunta">
                    Água corporal total (%):
                    <strong> {bioimpedancia.p23}</strong>
                </div>
                <div className="Pergunta">
                    ACT/massa magra (%):
                    <strong> {bioimpedancia.p24}</strong>
                </div>
                <div className="Pergunta">
                    ACT/peso total (%):
                    <strong> {bioimpedancia.p25}</strong>
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
                    <button onClick={() => onEditarClick(bioimpedancia.id)}>
                        <AiOutlineEdit />
                    </button>
                </div>
                <div className="ButaoRemover">
                    <button onClick={handleClickOpen}>
                        <IoMdRemoveCircleOutline />
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

function TabelaBioimpedancias(props) {
    const [currentPage] = useState(1);
    const itemsPerPage = props.itemsPerPage;
    const totalPages = Math.ceil((props.data?.length || 0) / itemsPerPage);

    const handleEditarClick = (bioimpedanciasId) => {
        props.onEditarClick(bioimpedanciasId);
    };

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return props.data
            .slice(startIndex, endIndex)
            .map((bioimpedancia) => (
                <BioimpedanciaLinha
                    key={bioimpedancia.id}
                    bioimpedancia={bioimpedancia}
                    onEditarClick={handleEditarClick}
                />
            ));
    }

    return (
        <div className="TabelaBioimpedancias">
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
                        <tbody>{getLinhas()}</tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default TabelaBioimpedancias;