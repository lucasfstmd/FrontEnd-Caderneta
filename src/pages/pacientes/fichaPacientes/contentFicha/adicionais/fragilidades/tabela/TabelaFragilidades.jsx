import React, {useState} from "react";
import "./TabelaFragilidades.css"
import api from "../../../../../../../service/api";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Loading from "../../../../../../../components/loading/Loading";

function FragilidadesLinha({ fragilidades, onEditClick }) {
    const [open, setOpen] = useState(false);

    async function handleDelet() {
        try {
            await api.delete(`v1/fragilidades/${fragilidades.id}`);
        } catch (error) {
            console.log(undefined);
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
        <tr key={fragilidades.id} className="FragilidadesLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    P1:
                    <strong>{fragilidades.p1}</strong>
                </div>
                <div className="Pergunta">
                    P2_1:
                    <strong>{fragilidades.p2_1}</strong>
                </div>
                <div className="Pergunta">
                    P2_2:
                    <strong>{fragilidades.p2_2}</strong>
                </div>
                <div className="Pergunta">
                    P3_1:
                    <strong>{fragilidades.p3_1}</strong>
                </div>
                <div className="Pergunta">
                    P3_2:
                    <strong>{fragilidades.p3_2}</strong>
                </div>
                <div className="Pergunta">
                    P3_3:
                    <strong>{fragilidades.p3_3}</strong>
                </div>
                <div className="Pergunta">
                    P4_1:
                    <strong>{fragilidades.p4_1}</strong>
                </div>
                <div className="Pergunta">
                    P4_2:
                    <strong>{fragilidades.p4_2}</strong>
                </div>
                <div className="Pergunta">
                    P5_1a_1:
                    <strong>{fragilidades.p5_1a_1}</strong>
                </div>
                <div className="Pergunta">
                    P5_1a_2:
                    <strong>{fragilidades.p5_1a_2}</strong>
                </div>
                <div className="Pergunta">
                    P5_1b_1:
                    <strong>{fragilidades.p5_1b_1}</strong>
                </div>
                <div className="Pergunta">
                    P5_1b_2:
                    <strong>{fragilidades.p5_1b_2}</strong>
                </div>
                <div className="Pergunta">
                    P5_2a_1:
                    <strong>{fragilidades.p5_2a_1}</strong>
                </div>
                <div className="Pergunta">
                    P5_2a_2:
                    <strong>{fragilidades.p5_2a_2}</strong>
                </div>
                <div className="Pergunta">
                    P5_2b_1:
                    <strong>{fragilidades.p5_2b_1}</strong>
                </div>
                <div className="Pergunta">
                    P5_2b_2:
                    <strong>{fragilidades.p5_2b_2}</strong>
                </div>
                <div className="Pergunta">
                    P5_3a_1:
                    <strong>{fragilidades.p5_3a_1}</strong>
                </div>
                <div className="Pergunta">
                    P5_3a_2:
                    <strong>{fragilidades.p5_3a_2}</strong>
                </div>
                <div className="Pergunta">
                    P5_3b_1:
                    <strong>{fragilidades.p5_3b_1}</strong>
                </div>
                <div className="Pergunta">
                    P5_3b_2:
                    <strong>{fragilidades.p5_3b_2}</strong>
                </div>
                <div className="Pergunta">
                    P5_4a_1:
                    <strong>{fragilidades.p5_4a_1}</strong>
                </div>
                <div className="Pergunta">
                    P5_4a_2:
                    <strong>{fragilidades.p5_4a_2}</strong>
                </div>
                <div className="Pergunta">
                    P5_4b_1:
                    <strong>{fragilidades.p5_4b_1}</strong>
                </div>
                <div className="Pergunta">
                    P5_4b_2:
                    <strong>{fragilidades.p5_4b_2}</strong>
                </div>
                <div className="Pergunta">
                    Ipaq:
                    <strong>{fragilidades.ipaq}</strong>
                </div>
                <div className="Pergunta">
                    Baixo_nivel_atividade_fisica:
                    <strong>{fragilidades.baixo_nivel_atividade_fisica}</strong>
                </div>
                <div className="Pergunta">
                    Classificacao_da_fragilidade:
                    <strong>{fragilidades.classificacao_da_fragilidade}</strong>
                </div>
            </td>
            <td className="BotaoTabela">
                <div className="ButaoEditar">
                    <button onClick={() => onEditClick(fragilidades.id)}>
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

function TabelaFragilidades(props) {
    const [currentPage] = useState(1);

    const itemsPerPage = props.itemsPerPage;

    const totalPages = Math.ceil((props.data?.length || 0) / itemsPerPage);

    const handleEditarClick = (fragilidadesId) => {
        props.onEditarClick(fragilidadesId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIdex = startIndex + itemsPerPage;

        return props.data.slice(startIndex, endIdex).map((fragilidades) => (
            <FragilidadesLinha key={fragilidades.id} fragilidades={fragilidades} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaFragilidades">
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

export default TabelaFragilidades;
