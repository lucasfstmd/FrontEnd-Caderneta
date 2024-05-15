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

function IpaqLinha({ ipaq, onEditarClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(ipaq.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(ipaq.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/ipaq/${ipaq.id}`);
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
        <tr key={ipaq.id} className="FrrisquesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    1. a)
                    <strong> {ipaq.p1_a}</strong>
                </div>
                <div className="Pergunta">
                    1. b)
                    <strong> {ipaq.p1_b}</strong>
                </div>
                <div className="Pergunta">
                    2. a)
                    <strong> {ipaq.p2_a}</strong>
                </div>
                <div className="Pergunta">
                    2. b)
                    <strong> {ipaq.p2_b}</strong>
                </div>
                <div className="Pergunta">
                    3. a)
                    <strong> {ipaq.p3_a}</strong>
                </div>
                <div className="Pergunta">
                    3. b)
                    <strong> {ipaq.p3_b}</strong>
                </div>
                <div className="Pergunta">
                    4. a)
                    <strong> {ipaq.p4_a}</strong>
                </div>
                <div className="Pergunta">
                    4. b)
                    <strong> {ipaq.p4_b}</strong>
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
                    <button onClick={() => onEditarClick(ipaq.id)}>
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

function TabelaIpaq(props) {
    const [ipaq, setIpaq] = useState([]);
    const currentPage = 1
    const itemsPerPage = props.itemsPerPage;
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { id } = params
    const totalPages = Math.ceil((ipaq?.length || 0) / itemsPerPage);

    async function carregarDado() {
        try {
            const response = await api.get(
                `v1/ipaq/paciente/${id}`
            );
            setIpaq(response.data);
            setLoading(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarDado();
    }, []);

    const getIpaqPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return ipaq.slice(inicio, fim) || [];
    }

    const handleEditarClick = (ipaqId) => {
        props.onEditarClick(ipaqId)
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getIpaqPagAtual().slice(startIndex, endIndex).map((ipaq) => (
            <IpaqLinha key={ipaq} ipaq={ipaq} onEditarClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaFrrisques">
            {ipaq.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registrados:{" "} {ipaq.length}
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

export default TabelaIpaq;
