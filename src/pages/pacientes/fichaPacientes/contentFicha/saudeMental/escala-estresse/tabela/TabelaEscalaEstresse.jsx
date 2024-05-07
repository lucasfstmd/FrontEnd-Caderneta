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

    const returnResponse = (response) => {
        if (response === 0) return 'Nunca'
        if (response === 1) return 'Quase nunca'
        if (response === 2) return 'Pouco Frequente'
        if (response === 3) return 'Muito Frequente'
    }

    return (
        <tr key={data.id} className="FrrisquesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    1. Com que frequência você ficou triste por causa de algo que aconteceu inesperadamente?
                    <strong> {returnResponse(data.p1)}</strong>
                </div>
                <div className="Pergunta">
                    2. Com que frequência você se sentiu incapaz de controlar as coisas importantes em sua vida?
                    <strong> {returnResponse(data.p2)}</strong>
                </div>
                <div className="Pergunta">
                    3. Com que frequência você se sentiu nervoso ou estressado?
                    <strong> {returnResponse(data.p3)}</strong>
                </div>
                <div className="Pergunta">
                    4. Com que frequência você lidou com sucesso com os problemas e aborrecimentos do dia a dia?
                    <strong> {returnResponse(data.p4)}</strong>
                </div>
                <div className="Pergunta">
                    5. Com que frequência você sentiu que estava lidando de forma eficaz com as mudanças importantes que estavam acontecendo em sua vida?
                    <strong> {returnResponse(data.p5)}</strong>
                </div>
                <div className="Pergunta">
                    6. Com que frequência você esteve se sentido confiante para lidar com os seus problemas pessoais?
                    <strong> {returnResponse(data.p6)}</strong>
                </div>
                <div className="Pergunta">
                    7. Com que frequência você sentiu que as coisas estavam acontecendo de acordo com sua vontade?
                    <strong> {returnResponse(data.p7)}</strong>
                </div>
                <div className="Pergunta">
                    8. Com que frequência você percebeu que não conseguia lidar com todas as coisas que você tinha para fazer?
                    <strong> {returnResponse(data.p8)}</strong>
                </div>
                <div className="Pergunta">
                    9. Com que frequência você conseguiu controlar as irritações da sua vida?
                    <strong> {returnResponse(data.p9)}</strong>
                </div>
                <div className="Pergunta">
                    10. Com que frequência você percebeu que as coisas estavam sob seu controle?
                    <strong> {returnResponse(data.p10)}</strong>
                </div>
                <div className="Pergunta">
                    11. Com que frequência você se irritou por coisas que aconteceram que estavam fora de seu controle?
                    <strong> {returnResponse(data.p11)}</strong>
                </div>
                <div className="Pergunta">
                    12. Com que frequência você se encontrou pensando em coisas que tinham para fazer?
                    <strong> {returnResponse(data.p12)}</strong>
                </div>
                <div className="Pergunta">
                    13. Com que frequência você conseguiu controlar a maneira como gasta seu tempo?
                    <strong> {returnResponse(data.p13)}</strong>
                </div>
                <div className="Pergunta">
                    14. Com que frequência você sentiu que as dificuldades se acumularam tanto que você não poderia superá-los?
                    <strong> {returnResponse(data.p14)}</strong>
                </div>
                <div className="Pergunta">
                    Escore
                    <strong> {returnResponse(data.score)}</strong>
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

function TabelaEscalaEstresse(props) {
    const currentPage = 1
    const itemsPerPage = props.itemsPerPage;
    const totalPages = Math.ceil((props.data?.length || 0) / itemsPerPage);

    const handleEditarClick = (eseId) => {
        props.onEditarClick(eseId)
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return props.data.slice(startIndex, endIndex).map((data) => (
            <Linha key={data} data={data} onEditarClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaFrrisques">
            {props.data.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registrados:{" "} {props.data.length}
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
                            <Loading loading={props.loading}>
                                {getLinhas()}
                            </Loading>
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}

export default TabelaEscalaEstresse;
