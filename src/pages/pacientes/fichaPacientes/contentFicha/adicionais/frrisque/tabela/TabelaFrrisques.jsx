import React, {useEffect, useState} from "react";
import "./TabelaFrrisques.css";
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Loading from "../../../../../../../components/loading/Loading";
import { useParams } from 'react-router-dom'

function FrrisquesLinha({ frrisques, onEditarClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(frrisques.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(frrisques.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/frrisques/${frrisques.id}`);
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
        <tr key={frrisques.id} className="FrrisquesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    1. Você caiu nos últimos 12 meses?
                    <strong> {frrisques.p1 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    2. Usa algum aparelho que te ajude a andar (bengala, muleta, andador)?
                    <strong> {frrisques.p2 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    3. Usa 4 ou mais medicamentos/dia?
                    <strong> {frrisques.p3 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    4. Usa medicamentos psicotrópicos?
                    <strong> {frrisques.p4 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    5. Tem dificuldades para subir ou descer uma ladeira?
                    <strong> {frrisques.p5 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    6. Precisa de ajuda para andar 100 metros?
                    <strong> {frrisques.p6 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    7. Tem dificuldades para enxergar (considerar o uso de lentes)?
                    <strong> {frrisques.p7 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    8. Tem dificuldades para ouvir o que as outras pessoas lhe falam?
                    <strong> {frrisques.p8 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    9. Faz exercícios físicos durante a semana?
                    <strong> {frrisques.p9 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    10 Ambiente mal iluminado? (Quando deitado, tem que levantar para acender a luz - interruptor longe da cama ou de difícil de visualização; não há abajur, não deixa luz do corredor acesa durante a noite)?
                    <strong> {frrisques.p10 === 0 ? "Não" : "Sim"}</strong>
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
                    <button onClick={() => onEditarClick(frrisques.id)}>
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

function TabelaFrrisques(props) {
    const [frrisques, setFrrisques] = useState([]);
    const [currentPage] = useState(1);
    const itemsPerPage = props.itemsPerPage;
    const [loading, setLoading] = useState(true)
    const params = useParams();
    const { id } = params
    async function carregarFrrisques() {
        try {
            const response = await api.get(
                `v1/frrisques/paciente/${id}`
            );
            setFrrisques(response.data);
            setLoading(false);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarFrrisques();
    }, []);

    const totalPages = Math.ceil((frrisques?.length || 0) / itemsPerPage);

    const getFrrisquesPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return frrisques?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (habitosId) => {
        props.onEditarClick(habitosId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getFrrisquesPagAtual().slice(startIndex, endIndex).map((frrisques) => (
            <FrrisquesLinha key={frrisques} frrisques={frrisques} onEditarClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaFrrisques">
            {frrisques.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {frrisques.length}.
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

export default TabelaFrrisques;
