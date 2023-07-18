import React, {useState} from "react";
import "./AdicionarQueda.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function AdicionarQueda(props) {
    const [queda, setQueda] = useState();
    const [data_mes, setDataMes] = useState();
    const [data_ano, setDataAno] = useState();
    const [fratura, setFratura] = useState();
    const [parou_atividade, setParouAtividade] = useState();
    const [local_queda, setLocalQueda] = useState('');
    const [fratura_qual, setFraturaQual] = useState('');

    const Queda = {
        paciente_id: props.pacienteId,
        queda,
        data_mes,
        data_ano,
        fratura,
        parou_atividade,
        local_queda,
        fratura_qual
    }

    async function handleSalvarApi() {
        try {
            await api.post("v1/quedas", Queda);
            setOpen(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setOpenErro400(true);
            } else if (error.response && error.response.status === 500) {
                setOpenErro500(true);
            }
        }
    }

    const [open, setOpen] = useState(false);
    const [openErro400, setOpenErro400] = useState(false);
    const [openErro500, setOpenErro500] = useState(false);

    const handleFecharErro400 = () => {
        setOpenErro400(false);
    }

    const handleFecharErro500 = () => {
        setOpenErro500(false);
    }

    const handleClickOpen = () => {
        handleSalvarApi();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSalvar = (quedasId) => {
        setOpen(false);
        props.onClose(quedasId);
    }

    const handleFecharClick = (quedasId) => {
        props.onClose(quedasId);
    }

    return (
        <div className="AdicionarQueda">
            <div className="LabelInput">
                <label><strong>Queda: </strong></label>
                <select value={queda} onChange={(e) => setQueda(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Data Mes: </strong></label>
                <input value={data_mes} onChange={(e) => setDataMes(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Data Ano: </strong></label>
                <input value={data_ano} onChange={(e) => setDataAno(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Local Queda: </strong></label>
                <input value={local_queda} onChange={(e) => setLocalQueda(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Fratura?: </strong></label>
                <select value={fratura} onChange={(e) => setFratura(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Fratura Qual: </strong></label>
                <input value={fratura_qual} onChange={(e) => setFraturaQual(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Parou Atividade?: </strong></label>
                <select value={parou_atividade} onChange={(e) => setParouAtividade(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="BotaoForm">
                <button onClick={handleClickOpen} className="botaoFormSalvar">Salvar</button>
                <button onClick={handleFecharClick} className="botaoFormFechar">Fechar</button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Sucesso!"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Informações salvas com sucesso!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSalvar} autoFocus>
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openErro400}
                    onClose={handleFecharErro400}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Erro"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Algum campo está com dados errados.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleFecharErro400} autoFocus>
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openErro500}
                    onClose={handleFecharErro500}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Erro"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Ocorreu um erro no servidor.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleFecharErro500} autoFocus>
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default AdicionarQueda;