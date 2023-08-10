import React, {useState} from "react";
import "./AdicionarVacina.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function AdicionarVacina(props) {
    const [data, setData] = useState("");
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [ass, setAss] = useState("");
    const [lote, setLote] = useState("");
    const [outra, setOutra] = useState("");

    const Vacina = {
        paciente_id: props.pacienteId,
        data,
        nome,
        tipo,
        ass,
        lote,
        outra,
    }

    async function handleSalvarApi() {
        try {
            await api.post("v1/vacinas", Vacina);
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

    const handleSalvar = (vacinasId) => {
        setOpen(false);
        props.onClose(vacinasId);
    }

    const handleFecharClick = (vacinasId) => {
        props.onClose(vacinasId);
    }

    return (
        <div className="AdicionarVacina">
            <div className="LabelInput">
                <label><strong>Data: </strong></label>
                <input value={data} onChange={(e) => setData(e.target.value)} type="date"/>
            </div>
            <div className="LabelInput">
                <label><strong>Nome: </strong></label>
                <input value={nome} onChange={(e) => setNome(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Tipo: </strong></label>
                <input value={tipo} onChange={(e) => setTipo(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Ass: </strong></label>
                <input value={ass} onChange={(e) => setAss(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Lote: </strong></label>
                <input value={lote} onChange={(e) => setLote(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Outra: </strong></label>
                <input value={outra} onChange={(e) => setOutra(e.target.value)} type="text"/>
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

export default AdicionarVacina;