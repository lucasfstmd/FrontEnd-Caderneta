import React, {useState} from "react";
import "./AdicionarSarcf.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function AdicionarSarcf(props) {
    const [p1, setP1] = useState("");
    const [p2, setP2] = useState("");
    const [p3, setP3] = useState("");
    const [p4, setP4] = useState("");
    const [p5, setP5] = useState("");

    const Sarcf = {
        paciente_id: props.pacienteId,
        p1,
        p2,
        p3,
        p4,
        p5,
    }

    async function handleSalvarApi() {
        try {
            await api.post("v1/sarcfs", Sarcf);
            setOpen(true);
        } catch (error) {
            console.log(error)
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

    const handleSalvar = (sarcfsId) => {
        setOpen(false);
        props.onClose(sarcfsId);
    }

    const handleFecharClick = (sarcfsId) => {
        props.onClose(sarcfsId);
    }

    return (
        <div className="AdicionarSarc">
            <div className="TituloSarcf">
                FORÇA
            </div>
            <div className="LabelInput">
                <label><strong>O quanto de dificuldade você tem para levantar e carregar 5 kg?</strong></label>
                <select value={p1} name="tipo" onChange={(e) => setP1(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Nenhuma">Nenhuma</option>
                    <option value="Alguma">Alguma</option>
                    <option value="Muita">Muita</option>
                    <option value="Não consegue">Não consegue</option>
                </select>
            </div>
            <div className="TituloSarcf">
                AJUDA PARA CAMINHAR
            </div>
            <div className="LabelInput">
                <label><strong>O quanto de dificuldade você tem para atravessar um cômodo?</strong></label>
                <select value={p2} name="tipo" onChange={(e) => setP2(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Nenhuma">Nenhuma</option>
                    <option value="Alguma">Alguma</option>
                    <option value="Muita">Muita</option>
                    <option value="Usa apoio">Usa apoio</option>
                    <option value="Incapaz">Incapaz</option>
                </select>
            </div>
            <div className="TituloSarcf">
                LEVANTAR DA CADEIRA
            </div>
            <div className="LabelInput">
                <label><strong>O quanto de dificuldade você tem para levantar de uma cama ou cadeira?</strong></label>
                <select value={p3} name="tipo" onChange={(e) => setP3(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Nenhuma">Nenhuma</option>
                    <option value="Alguma">Alguma</option>
                    <option value="Muita">Muita</option>
                    <option value="Não consegue sem ajuda">Não consegue sem ajuda</option>
                </select>
            </div>
            <div className="TituloSarcf">
                FORÇASUBIR ESCADAS
            </div>
            <div className="LabelInput">
                <label><strong>O quanto de dificuldade você tem para subir um lance de escadas de 10 degraus?</strong></label>
                <select value={p4} name="tipo" onChange={(e) => setP4(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Nenhuma">Nenhuma</option>
                    <option value="Alguma">Alguma</option>
                    <option value="Muita">Muita</option>
                    <option value="Não consegue">Não consegue</option>
                </select>
            </div>
            <div className="TituloSarcf">
                QUEDA
            </div>
            <div className="LabelInput">
                <label><strong>Quantas vezes você caiu no último ano?</strong></label>
                <select value={p5} name="tipo" onChange={(e) => setP5(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Nenhuma">Nenhuma</option>
                    <option value="1 a 3 quedas">1 a 3 quedas</option>
                    <option value="4 ou mais quedas">4 ou mais quedas</option>
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

export default AdicionarSarcf;