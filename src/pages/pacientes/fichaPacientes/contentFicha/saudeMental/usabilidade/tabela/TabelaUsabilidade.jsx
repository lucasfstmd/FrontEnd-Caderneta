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

function UsabilidadeLinha({ usabilidade, onEditarClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(usabilidade.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(usabilidade.updated), "dd/MM/yyyy");

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
        <tr key={usabilidade.id} className="FrrisquesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    1.0. Você já utilizou algum dispositivo igual ou semelhante ao atual?
                    <strong> {usabilidade.p1 === 0 ? 'Não' : 'Sim'}</strong>
                    <br/>
                     Qual?
                    <strong> {usabilidade.p1_0}</strong>
                </div>
                <div className="Pergunta">
                    1.1. Caso <strong>NÃO</strong> tenha utilizado, justifique o motivo:
                    <strong> {usabilidade.p1_1_1}</strong>
                </div>
                <div className="Pergunta">
                    1.2. Qual o seu grau de experiência com este tipo de dispositivo/relógio?
                    <strong> {usabilidade.p1_2}</strong>
                </div>
                <div className="Pergunta">
                    1.3. Qual o seu grau de experiência/ tempo com este tipo de dispositivo/relógio?
                    <strong> {usabilidade.p1_3}</strong>
                </div>
                <div className="Pergunta">
                    <strong>2.0. Satisfação do Usuário:</strong>
                </div>
                <div className="Pergunta">
                    2.1. Quanto ao manuseio de forma geral deste dispositivo, qual o seu grau de satisfação?
                    <strong> {usabilidade.p2_1}</strong>
                </div>
                <div className="Pergunta">
                    2.2. Com relação ao monitoramento dos seus dados de saúde. Qual seu grau de satisfação?
                    <strong> {usabilidade.p2_2}</strong>
                </div>
                <div className="Pergunta">
                    <strong>3.0. Utilização do Disposto:</strong>
                </div>
                <div className="Pergunta">
                    3.1. Quanto a utilização do dispositivo, você sentiu alguma dificuldade? Se sim, justifique o
                    motivo.
                    <strong> {usabilidade.p3_1}</strong>
                </div>
                <div className="Pergunta">
                    3.2. Apresentou algum processo alérgico, como prurido (coceira), vermelhidão, entre outros?
                    <strong> {usabilidade.p3_2}</strong>
                    <br/>
                    Qual tipo de desconforto:
                    <strong> {usabilidade.p3_2_1}</strong>
                </div>
                <div className="Pergunta">
                    <strong>4.0. Quanto à privacidade:</strong>
                </div>
                <div className="Pergunta">
                    4.1. Como você se sentiu com uso do dispositivo
                    <strong> {usabilidade.p4_1}</strong>
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
                    <button onClick={() => onEditarClick(usabilidade.id)}>
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

function TabelaUsabilidade(props) {
    const [usabilidade, setUsabilidade] = useState([
        {
            id: 0,
            p1: 'teste',
            p1_0: 'teste',
            p1_1_1: 'teste',
            p1_1_2: 'teste',
            p1_1_3: 'teste',
            p1_1_4: 'teste',
            p1_1_5: 'teste',
            p1_2: 'teste',
            p1_3: 'teste',
            p2_1: 'teste',
            p2_2: 'teste',
            p3_1: 'teste',
            p3_1_1: 'teste',
            p3_2: 'teste',
            p3_2_1: 'teste',
            p4_1: 'teste',
            p4_1_1: 'teste',
            created: '2019-05-02T00:58:34.000Z',
            updated: '2019-05-02T00:58:34.000Z'
        }
    ]);
    const currentPage = 1
    const itemsPerPage = props.itemsPerPage;
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { id } = params
    const totalPages = Math.ceil((usabilidade?.length || 0) / itemsPerPage);

    const getUsabilidadesPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return usabilidade.slice(inicio, fim) || [];
    }

    const handleEditarClick = (usabilidadeId) => {
        props.onEditarClick(usabilidadeId)
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getUsabilidadesPagAtual().slice(startIndex, endIndex).map((usabilidade) => (
            <UsabilidadeLinha key={usabilidade} usabilidade={usabilidade} onEditarClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaFrrisques">
            {usabilidade.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registrados:{" "} {usabilidade.length}
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

export default TabelaUsabilidade;
