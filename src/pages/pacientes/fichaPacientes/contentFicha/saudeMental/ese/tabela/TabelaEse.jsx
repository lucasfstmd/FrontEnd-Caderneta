import { format } from 'date-fns'
import React, { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { DialogContent, DialogContentText } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Loading from '../../../../../../../components/loading/Loading'
import { useParams } from 'react-router-dom'

function Linha({ data, onEditarClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(data.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(data.updated), "dd/MM/yyyy");

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSalvar = () => {
        setOpen(false);
    }

    return (
        <tr key={data.id} className="FrrisquesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    <strong>Chance de cochilar:</strong>
                </div>
                <div className="Pergunta">
                    1. Sentado e lendo
                    <strong> {data.p1}</strong>
                </div>
                <div className="Pergunta">
                    2. Vendo TV
                    <strong> {data.p2}</strong>
                </div>
                <div className="Pergunta">
                    3. Sentado em algum lugar público, sem atividade
                    <strong> {data.p3}</strong>
                </div>
                <div className="Pergunta">
                    4. Como passageiro de trem, carro ou ônibus andando uma hora sem parar
                    <strong> {data.p4}</strong>
                </div>
                <div className="Pergunta">
                    5. Deitado para descansar a tarde quando as circunstâncias permitem
                    <strong> {data.p5}</strong>
                </div>
                <div className="Pergunta">
                    6. Sentado e conversando com alguém
                    <strong> {data.p6}</strong>
                </div>
                <div className="Pergunta">
                    7. Sentado calmamente, após o almoço sem álcool
                    <strong> {data.p7}</strong>
                </div>
                <div className="Pergunta">
                    8. Se você estiver de carro, enquanto para por alguns  minutos no trânsito intenso.
                    <strong> {data.p8}</strong>
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
                    <button onClick={() => onEditarClick(data.id)}>
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

function TabelaEse(props) {
    const [ese, setEse] = useState([
        {
            id: 0,
            p1: 0,
            p2: 0,
            p3: 0,
            p4: 0,
            p5: 0,
            p6: 0,
            p7: 0,
            p8: 0,
            created: '2019-05-02T00:58:34.000Z',
            updated: '2019-05-02T00:58:34.000Z'
        }
    ]);
    const currentPage = 1
    const itemsPerPage = props.itemsPerPage;
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { id } = params
    const totalPages = Math.ceil((ese?.length || 0) / itemsPerPage);

    const getDataPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return ese.slice(inicio, fim) || [];
    }

    const handleEditarClick = (eseId) => {
        props.onEditarClick(eseId)
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getDataPagAtual().slice(startIndex, endIndex).map((ese) => (
            <Linha key={ese} data={ese} onEditarClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaFrrisques">
            {ese.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registrados:{" "} {ese.length}
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

export default TabelaEse;
