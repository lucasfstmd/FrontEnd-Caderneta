import { format } from 'date-fns'
import React, {useEffect, useState} from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { DialogContent, DialogContentText } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Loading from '../../../../../../../components/loading/Loading'
import { useParams } from 'react-router-dom'
import api from "../../../../../../../service/api";

function Linha({ autorrelato, onEditarClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(autorrelato.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(autorrelato.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/autorrelato/${autorrelato.id}`);
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
        handleDelet()
    }

    let p1 = ''

    if (autorrelato.p1 === 0) p1 = 'Nunca';
    if (autorrelato.p1 === 1) p1 = 'Menos de uma vez por semana';
    if (autorrelato.p1 === 2) p1 = 'Uma a duas vezes por semana';
    if (autorrelato.p1 === 3) p1 = 'Três a quatro vezes por semana';
    if (autorrelato.p1 === 4) p1 = 'Cinco a sete vezes por semana';
    if (autorrelato.p1 === 5) p1 = 'Não sei';

    return (
        <tr key={autorrelato.id} className="FrrisquesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Durante o último mês, quantos dias por semana você acordou 2 ou mais vezes para urinar?
                    <br/>
                    <strong>
                        {p1}
                    </strong>
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
                    <button onClick={() => onEditarClick(autorrelato.id)}>
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

function TabelaAutorrelato(props) {
    const [autorrelato, setAutorrelato] = useState([]);
    const currentPage = 1
    const itemsPerPage = props.itemsPerPage;
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { id } = params
    const totalPages = Math.ceil((autorrelato?.length || 0) / itemsPerPage);

    async function carregarDado() {
        try {
            const response = await api.get(
                `v1/autorrelato/paciente/${id}`
            );
            setAutorrelato(response.data);
            setLoading(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarDado();
    }, []);

    const getInfoPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return autorrelato.slice(inicio, fim) || [];
    }

    const handleEditarClick = (autorrelatoId) => {
        props.onEditarClick(autorrelatoId)
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getInfoPagAtual().slice(startIndex, endIndex).map((autorrelato) => (
            <Linha key={autorrelato} autorrelato={autorrelato} onEditarClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaFrrisques">
            {autorrelato.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registrados:{" "} {autorrelato.length}
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

export default TabelaAutorrelato;
