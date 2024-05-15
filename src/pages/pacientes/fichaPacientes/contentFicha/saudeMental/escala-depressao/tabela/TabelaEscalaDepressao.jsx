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
import api from '../../../../../../../service/api'

function Linha({ data, onEditarClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(data.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(data.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/escala-depressao/${data.id}`);
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

    const returnResponse = (response) => {
        if (response === 0) return 'Nunca ou raramente'
        if (response === 1) return 'Às vezes'
        if (response === 2) return 'Frequentemente'
        if (response === 3) return 'Sempre'
    }

    return (
        <tr key={data.id} className="FrrisquesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    1. O(a) Sr(a) sentiu-se incomodado (a) com coisas que habitualmente não lhe incomodam?
                    <strong> {returnResponse(data.p1)}</strong>
                </div>
                <div className="Pergunta">
                    2. O (a) Sr(a) não teve vontade de comer ou teve pouco apetite?
                    <strong> {returnResponse(data.p2)}</strong>
                </div>
                <div className="Pergunta">
                    3. O (a) Sr(a) sentiu não conseguir melhorar seu estado de ânimo mesmo com a ajuda de familiares e amigos?
                    <strong> {returnResponse(data.p3)}</strong>
                </div>
                <div className="Pergunta">
                    4. O(a) Sr(a) sentiu-se, quando a outras pessoas, tendo tanto valor quanto a maioria delas?
                    <strong> {returnResponse(data.p4)}</strong>
                </div>
                <div className="Pergunta">
                    5. O Sr(a) sentiu dificuldade de se concentrar no que fazia?
                    <strong> {returnResponse(data.p5)}</strong>
                </div>
                <div className="Pergunta">
                    6. O Sr(a) Sentiu-se deprimido (a)
                    <strong> {returnResponse(data.p6)}</strong>
                </div>
                <div className="Pergunta">
                    7. O (a) Sr(a) sentiu-se que teve que fazer esforço para dar conta das suas tarefas habituais?
                    <strong> {returnResponse(data.p7)}</strong>
                </div>
                <div className="Pergunta">
                    8. O (a) Sr(a) sentiu-se otimista sobre o futuro
                    <strong> {returnResponse(data.p8)}</strong>
                </div>
                <div className="Pergunta">
                    9. O (a) Sr(a) considerou que sua vida tinha sido um fracasso?
                    <strong> {returnResponse(data.p9)}</strong>
                </div>
                <div className="Pergunta">
                    10. O(a) Sr(a) sentiu-se amedrontado (a)?
                    <strong> {returnResponse(data.p10)}</strong>
                </div>
                <div className="Pergunta">
                    11. Seu sono não foi repousante?
                    <strong> {returnResponse(data.p11)}</strong>
                </div>
                <div className="Pergunta">
                    12. O (a) Sr(a) esteve feliz?
                    <strong> {returnResponse(data.p12)}</strong>
                </div>
                <div className="Pergunta">
                    13. O (a) Sr(a) falou menos que o habitual?
                    <strong> {returnResponse(data.p13)}</strong>
                </div>
                <div className="Pergunta">
                    14. O (a) Sr(a) sentiu-se sozinho (a)?
                    <strong> {returnResponse(data.p14)}</strong>
                </div>
                <div className="Pergunta">
                    15. As pessoas não foram amistosas com o (a) Sr(a)?
                    <strong> {returnResponse(data.p15)}</strong>
                </div>
                <div className="Pergunta">
                    16. O(a) Sr(a). aproveitou a vida?
                    <strong> {returnResponse(data.p16)}</strong>
                </div>
                <div className="Pergunta">
                    17. O(a) Sr(a). teve crises de choro?
                    <strong> {returnResponse(data.p17)}</strong>
                </div>
                <div className="Pergunta">
                    18. O(a) Sr(a). sentiu-se triste?
                    <strong> {returnResponse(data.p18)}</strong>
                </div>
                <div className="Pergunta">
                    19. O(a) Sr(a). sentiu que as pessoas não gostavam do(a) Sr(a).?
                    <strong> {returnResponse(data.p19)}</strong>
                </div>
                <div className="Pergunta">
                    20. O(a) Sr(a). não conseguiu levar adiante suas coisas?
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

function TabelaEscalaDepressao(props) {
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

export default TabelaEscalaDepressao;
