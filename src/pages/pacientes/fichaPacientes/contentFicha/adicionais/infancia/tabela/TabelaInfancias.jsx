import React, {useState} from "react"
import "./TabelaInfancias.css"
import {format} from "date-fns";
import api from "../../../../../../../service/api";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function InfanciasLinha({ infancias, onEditarClick }){
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(infancias.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(infancias.updated), "dd/MM/yyyy");

    async function handleDelet() {
        try {
            await api.delete(`v1/infancias/${infancias.id}`);
        } catch (error) {
            console.log(error)
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
        <tr key={infancias.id} className="InfanciasLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    1.Como era a situação econômica da sua família na maior parte do tempo nos primeiros 15 anos da sua vida?:
                    <strong> {infancias.a1}</strong>
                </div>
                <div className="Pergunta">
                    2. Qual era a profissão do seu pai na maior parte da sua infância (nos primeiros 15 anos da sua vida)?
                    <strong> {infancias.a2_a}</strong>
                    <br/>
                    <strong> {infancias.a2_b}</strong>
                </div>
                <div className="Pergunta">
                    3. Qual era a profissão da sua mãe na maior parte da sua infância (nos primeiros 15 anos da sua vida)?
                    <strong> {infancias.a3_a}</strong>
                    <br/>
                    <strong> {infancias.a3_b}</strong>
                </div>
                <div className="Pergunta">
                    4. Você diria que a sua saúde nos primeiros 15 anos da sua vida foi excelente, boa ou ruim?
                    <strong> {infancias.a4}</strong>
                </div>
                <div className="Pergunta">
                    5. Você lembra de ter tido alguma das doenças citadas nos primeiros 15 anos da sua vida?
                </div>
                <div className="Pergunta">
                    a) Nefrite (doença renal)
                    <strong> {infancias.a5_a}</strong>
                </div>
                <div className="Pergunta">
                    b) Hepatite
                    <strong> {infancias.a5_b}</strong>
                </div>
                <div className="Pergunta">
                    c) Sarampo
                    <strong> {infancias.a5_c}</strong>
                </div>
                <div className="Pergunta">
                    d) Tuberculose
                    <strong> {infancias.a5_d}</strong>
                </div>
                <div className="Pergunta">
                    e) Febre reumática
                    <strong> {infancias.a5_e}</strong>
                </div>
                <div className="Pergunta">
                    f) Asma
                    <strong> {infancias.a5_f}</strong>
                </div>
                <div className="Pergunta">
                    g) Brinquite Crônica
                    <strong> {infancias.a5_g}</strong>
                </div>
                <div className="Pergunta">
                    h) Você teve alguma outra. Especifique:
                    <strong> {infancias.a5_h}</strong>
                </div>
                <div className="Pergunta">
                    6. Nos primeiros 15 anos da sua vida você ficou confinado em uma cama por 1 mês ou mais por algum problema de saúde?
                    <strong> {infancias.a6}</strong>
                </div>
                <div className="Pergunta">
                    7. Nos primeiros 15 anos da sua vida, você pode afirmar que houve um período em que você não se alimentou bem e que sentia fome?
                    <strong> {infancias.a7}</strong>
                </div>
                <div className="Pergunta">
                    1. Seu pai ou sua mãe não tinham emprego por muito tempo quando eles queriam trabalhar?
                    <strong> {infancias.b1}</strong>
                </div>
                <div className="Pergunta">
                    2. Seu pai ou sua mãe bebeu ou usou drogas com muita frequência a ponto de causar problemas para a família?
                    <strong> {infancias.b2}</strong>
                </div>
                <div className="Pergunta">
                    3. Seu pai, sua mãe ou ambos morreram durante sai infância?
                    <strong> {infancias.b3_a}</strong>
                </div>
                <div className="Pergunta">
                    4. Seus pais se divorciaram?
                    <strong> {infancias.b4}</strong>
                </div>
                <div className="Pergunta">
                    5. Você já presenciou violência física entre as pessoas próximas a você (entre seus pais ou entre seus pais e irmãos)?
                    <strong> {infancias.b5}</strong>
                </div>
                <div className="Pergunta">
                    6. Você já foi violentado (a) fisicamente por alguém próximo a você?
                    <strong> {infancias.b6}</strong>
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
                    <button onClick={() => onEditarClick(infancias.id)}>
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

function TabelaInfancias(props) {
    const [currentPage] = useState(1);

    const itemsPerPage = props.itemsPerPage;
    const totalPages = Math.ceil((props.data?.length || 0) / itemsPerPage);

    const handleEditarClick = (exameLabId) => {
        props.onEditarClick(exameLabId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return props.data.slice(startIndex, endIndex).map((infancias) => (
            <InfanciasLinha key={infancias.id} infancias={infancias} onEditarClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaInfancias">
            {props.data.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {props.data.length}.
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
                        {getLinhas()}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}

export default TabelaInfancias;