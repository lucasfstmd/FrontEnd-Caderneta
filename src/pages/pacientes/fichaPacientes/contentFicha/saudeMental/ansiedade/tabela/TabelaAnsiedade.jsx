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
        if (response === 0) return 'Discordo'
        if (response === 1) return 'Concordo'
    }

    return (
        <tr key={data.id} className="FrrisquesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    1. Ando preocupado (a) a maior parte do tempo.
                    <strong> {returnResponse(data.p1)}</strong>
                </div>
                <div className="Pergunta">
                    2. Tenho dificuldade em tomar decisões.
                    <strong> {returnResponse(data.p2)}</strong>
                </div>
                <div className="Pergunta">
                    3. Sinto-me inquieto (a) muitas vezes.
                    <strong> {returnResponse(data.p3)}</strong>
                </div>
                <div className="Pergunta">
                    4. Tenho dificuldade em relaxar.
                    <strong> {returnResponse(data.p4)}</strong>
                </div>
                <div className="Pergunta">
                    5. Muitas vezes não consigo apreciar as coisas por causa das minhas preocupações.
                    <strong> {returnResponse(data.p5)}</strong>
                </div>
                <div className="Pergunta">
                    6. Coisas sem importância me preocupam bastante.
                    <strong> {returnResponse(data.p6)}</strong>
                </div>
                <div className="Pergunta">
                    7. Sinto muitas vezes um aperto no estômago.
                    <strong> {returnResponse(data.p7)}</strong>
                </div>
                <div className="Pergunta">
                    8. Vejo-me como uma pessoa preocupada.
                    <strong> {returnResponse(data.p8)}</strong>
                </div>
                <div className="Pergunta">
                    9. Não consigo evitar me preocupar, mesmo com coisas menores.
                    <strong> {returnResponse(data.p9)}</strong>
                </div>
                <div className="Pergunta">
                    10. Me sinto muitas vezes nervoso (a).
                    <strong> {returnResponse(data.p10)}</strong>
                </div>
                <div className="Pergunta">
                    11. Muitas vezes os meus próprios pensamentos me deixam ansioso (a).
                    <strong> {returnResponse(data.p11)}</strong>
                </div>
                <div className="Pergunta">
                    12. Fico com o estômago às voltas devido à minha preocupação constante.
                    <strong> {returnResponse(data.p12)}</strong>
                </div>
                <div className="Pergunta">
                    13. Vejo-me como uma pessoa nervosa.
                    <strong> {returnResponse(data.p13)}</strong>
                </div>
                <div className="Pergunta">
                    14. Estou sempre à espera que aconteça o pior.
                    <strong> {returnResponse(data.p14)}</strong>
                </div>
                <div className="Pergunta">
                    15. Muitas vezes me sinto agitado (a) interiormente.
                    <strong> {returnResponse(data.p15)}</strong>
                </div>
                <div className="Pergunta">
                    16. Acho que as minhas preocupações interferem na minha vida.
                    <strong> {returnResponse(data.p16)}</strong>
                </div>
                <div className="Pergunta">
                    17. Muitas vezes sou dominado (a) pelas minhas preocupações.
                    <strong> {returnResponse(data.p17)}</strong>
                </div>
                <div className="Pergunta">
                    18. Por vezes sinto um nó grande no estômago.
                    <strong> {returnResponse(data.p18)}</strong>
                </div>
                <div className="Pergunta">
                    19. Deixo de me envolver nas coisas por me preocupar demasiado.
                    <strong> {returnResponse(data.p19)}</strong>
                </div>
                <div className="Pergunta">
                    20. Muitas vezes me sinto aflito (a)
                    <strong> {returnResponse(data.p20)}</strong>
                </div>
                <div className="Pergunta">
                    Escore:
                    <strong> {data.score}</strong>
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

function TabelaAnsiedade(props) {
    const currentPage = 1
    const itemsPerPage = props.itemsPerPage;
    const totalPages = Math.ceil((props.data?.length || 0) / itemsPerPage);

    const handleEditarClick = (eseId) => {
        props.onEditarClick(eseId)
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return props.data.slice(startIndex, endIndex).map((escDepre) => (
            <Linha key={escDepre} data={escDepre} onEditarClick={handleEditarClick}/>
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

export default TabelaAnsiedade;
