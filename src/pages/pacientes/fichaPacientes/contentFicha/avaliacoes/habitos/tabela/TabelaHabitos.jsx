import React, {useEffect, useState} from "react";
import "./TabelaHabitos.css"
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

function HabitosLinha({ habitos, onEditClick }){
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(habitos.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(habitos.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/habitos/${habitos.id}`);
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
        <tr key={habitos.id} className="HabitosLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Ano:
                    <strong> {habitos.ano}</strong>
                </div>
                <div className="Pergunta">
                    Você frequenta centros-dia, clubes ou grupos de convivência?
                    <strong> {habitos.p1 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você realiza algum trabalho voluntário?
                    <strong> {habitos.p2 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você tem alguma atividade de lazer?
                    <strong> {habitos.p3 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você pratica algum tipo de atividade física (como caminhadas, natação, dança, ginástica etc.) pelo menos três vezes por semana?
                    <strong> {habitos.p4 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você gostaria de começar algum programa de atividade física?
                    <strong> {habitos.p5 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você faz pelo menos três refeições por dia?
                    <strong> {habitos.p6 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você come frutas, legumes e verduras nas suas refeições ao longo do dia?
                    <strong> {habitos.p7 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Em pelo menos uma refeição diária, você come carnes, peixes ou ovos?
                    <strong> {habitos.p8 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você tem o costume de consumir bebidas açucaradas, bolos, biscoitos recheados e sobremesas?
                    <strong> {habitos.p9 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    No preparo das suas refeições, é utilizada grande quantidade de óleos, gorduras, açúcar e sal?
                    <strong> {habitos.p10 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você inclui a ingestão de água na sua rotina diária?
                    <strong> {habitos.p11 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Atualmente, você fuma algum produto do tabaco?
                    <strong> {habitos.p12 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você gostaria de parar de fumar?
                    <strong> {habitos.p13 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você é ex-fumante?
                    <strong> {habitos.p14 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você consome bebida alcoólica?
                    <strong> {habitos.p15 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Você já sentiu a necessidade de reduzir ou suspender o consumo de álcool?
                    <strong> {habitos.p16 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Alguém já lhe criticou por você beber?
                    <strong> {habitos.p17 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Sente-se culpado(a) por beber?
                    <strong> {habitos.p18 === 0 ? "Não" : "Sim"}</strong>
                </div>
                <div className="Pergunta">
                    Costuma beber logo pela manhã?
                    <strong> {habitos.p19 === 0 ? "Não" : "Sim"}</strong>
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
                    <button onClick={() => onEditClick(habitos.id)}>
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

function TabelaHabitos(props) {
    const [habitos, setHabitos] = useState([]);
    const [currentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const params = useParams();
    const { id } = params
    const itemsPerPage = props.itemsPerPage;

    async function carregarHabitos() {
        try {
            const response = await api.get(
                `v1/habitos/paciente/${id}`
            );
            setHabitos(response.data);
            setLoading(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarHabitos();
    }, []);

    const totalPages = Math.ceil((habitos?.length || 0) / itemsPerPage);

    const getHabitosPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return habitos?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (habitosId) => {
        props.onEditarClick(habitosId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getHabitosPaginaAtual().slice(startIndex, endIndex).map((habitos) => (
            <HabitosLinha key={habitos.id} habitos={habitos} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaHabitos">
            {habitos.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {habitos.length}.
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

export default TabelaHabitos;
