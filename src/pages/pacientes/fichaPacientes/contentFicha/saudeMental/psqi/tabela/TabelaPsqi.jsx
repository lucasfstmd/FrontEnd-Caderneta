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

function Linha({ psqi, onEditarClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(psqi.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(psqi.updated), "dd/MM/yyyy");

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSalvar = () => {
        setOpen(false);
    }

    const returnResponse = (value) => {
        if (value === 0) return 'Nenhuma no último mês'
        if (value === 1) return 'Menos de 1 vez/ semana'
        if (value === 2) return '1 ou 2 vezes/ semana'
        if (value === 3) return '3 ou mais vezes/ semana'
    }

    let p6 = ''
    if (psqi.p6 === 0) p6 = 'Muito boa'
    if (psqi.p6 === 1) p6 = 'Boa'
    if (psqi.p6 === 2) p6 = 'Ruim'
    if (psqi.p6 === 3) p6 = 'Muito ruim'

    let p9 = ''
    if (psqi.p9 === 0) p9 = 'Nenhuma dificuldade'
    if (psqi.p9 === 1) p9 = 'Um problema muito leve'
    if (psqi.p9 === 2) p9 = 'Um problema razoável'
    if (psqi.p9 === 3) p9 = 'Um problema muito grande'

    let p10 = ''
    if (psqi.p10 === 0) p10 = 'Não'
    if (psqi.p10 === 1) p10 = 'Parceiro ou colega, mas em outro quarto'
    if (psqi.p10 === 2) p10 = 'Parceiro no mesmo quarto, mas não na mesma cama'
    if (psqi.p10 === 3) p10 = 'Parceiro na mesma cama'

    return (
        <tr key={psqi.id} className="FrrisquesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    1.0. Durante os últimos dias, que horas geralmente você foi para a cama à noite?
                    Hora usual de deitar-se:
                    <br/>
                    Hora usual de deitar-se:
                    <strong> {psqi.p1}</strong>
                </div>
                <div className="Pergunta">
                    2.0. Durante o último mês, quanto tempo (em minutos) você geralmente levou para adormecer à noite?
                    <br/>
                    Número de minutos:
                    <strong> {psqi.p2}</strong>
                </div>
                <div className="Pergunta">
                    3.0. Durante os últimos dias, quando você geralmente se levantou de manhã?
                    <br/>
                    Hora usual de levantar-se
                    <strong> {psqi.p3}</strong>
                </div>
                <div className="Pergunta">
                    4.0. Durante os últimos dias, quantas horas de sono você teve por noite? (Este pode ser diferente do número de horas que você ficou na cama).
                    <br/>
                    Horas de sono por noite:
                    <strong> {psqi.p4}</strong>
                </div>
                <div className="Pergunta">
                    5. a) Não conseguiu adormecer em até 30 minutos
                    <strong> {returnResponse(psqi.p5_a)}</strong>
                </div>
                <div className="Pergunta">
                    5. b) Acordou no meio da noite ou de manhã cedo
                    <strong> {returnResponse(psqi.p5_b)}</strong>
                </div>
                <div className="Pergunta">
                    5. c) Precisou levantar-se para ir ao banheiro
                    <strong> {returnResponse(psqi.p5_c)}</strong>
                </div>
                <div className="Pergunta">
                    5. d) Não conseguiu respirar de forma satisfatória
                    <strong> {returnResponse(psqi.p5_d)}</strong>
                </div>
                <div className="Pergunta">
                    5. e) Tossiu ou roncou forte
                    <strong> {returnResponse(psqi.p5_e)}</strong>
                </div>
                <div className="Pergunta">
                    5. f) Sentiu muito calor
                    <strong> {returnResponse(psqi.p5_f)}</strong>
                </div>
                <div className="Pergunta">
                    5. g) Teve sonhos ruins
                    <strong> {returnResponse(psqi.p5_g)}</strong>
                </div>
                <div className="Pergunta">
                    5. h) Teve dor
                    <strong> {returnResponse(psqi.p5_h)}</strong>
                </div>
                <div className="Pergunta">
                    5. i) Outra(s) razão(ões), por favor descreva
                    <strong> {returnResponse(psqi.p5_i)}</strong>
                </div>
                <div className="Pergunta">
                    5. j) Com que frequência, durante os últimos dias, você teve dificuldade para dormir devido a essa razão?
                    <strong> {returnResponse(psqi.p5_j)}</strong>
                </div>
                <div className="Pergunta">
                    6. Durante os últimos dias, como você classificaria a qualidade do seu sono de uma maneira geral?
                    <strong> {p6}</strong>
                </div>
                <div className="Pergunta">
                    7. Durante os últimos dias, com que frequência você tomou medicamento (prescrito ou “por conta própria”) para lhe ajudar a dormir?
                    <strong> {returnResponse(psqi.p7)}</strong>
                </div>
                <div className="Pergunta">
                    8. Nos últimos dias, com que frequência você teve dificuldade de ficar acordado enquanto dirigia, comia ou participava de uma atividade social (festa, reunião de amigos, trabalho, estudo)?
                    <strong> {returnResponse(psqi.p8)}</strong>
                </div>
                <div className="Pergunta">
                    9. Durante os últimos dias, quão problemático foi para você manter o entusiasmo (ânimo) para fazer as coisas (suas atividades habituais)?
                    <strong> {p9}</strong>
                </div>
                <div className="Pergunta">
                    10. Você tem um(a) parceiro [esposo(a)] ou colega de quarto?
                    <strong> {p10}</strong>
                </div>
                <div className="Pergunta">
                    10. a) Ronco forte
                    <strong> {returnResponse(psqi.p10_a)}</strong>
                </div>
                <div className="Pergunta">
                    10. b) Longas paradas na respiração enquanto dormia
                    <strong> {returnResponse(psqi.p10_b)}</strong>
                </div>
                <div className="Pergunta">
                    10. c) Contrações ou puxões nas pernas enquanto você dormia
                    <strong> {returnResponse(psqi.p10_c)}</strong>
                </div>
                <div className="Pergunta">
                    10. d) Episódio de desorientação ou confusão durante o sono
                    <strong> {returnResponse(psqi.p10_d)}</strong>
                </div>
                <div className="Pergunta">
                    10. e) Outras alteraçãoes (inquietações) enquanto você dorme
                    <strong> {psqi.p10_e_1}</strong>
                </div>
                <div className="Pergunta">
                    <strong> {returnResponse(psqi.p10_e_2)}</strong>
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
                    <button onClick={() => onEditarClick(psqi.id)}>
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

function TabelaPsqi(props) {
    const currentPage = 1
    const itemsPerPage = props.itemsPerPage;
    const totalPages = Math.ceil((props.data?.length || 0) / itemsPerPage);


    const handleEditarClick = (psqiId) => {
        props.onEditarClick(psqiId)
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return props.data.slice(startIndex, endIndex).map((psqi) => (
            <Linha key={psqi} psqi={psqi} onEditarClick={handleEditarClick}/>
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

export default TabelaPsqi;
