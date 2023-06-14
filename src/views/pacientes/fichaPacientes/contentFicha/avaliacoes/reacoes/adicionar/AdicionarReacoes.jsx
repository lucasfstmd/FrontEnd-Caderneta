import React, {useState} from "react"
import "./AdicionarReacoes.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function AdicionarReacoes(props) {
    const [medicamento, setMedicamento] = useState('');
    const [data, setData] = useState(0);
    const [reacoes_adversas_ou_alergicas, setReacoesAlergicas] = useState('');

    const Reacao = {
        paciente_id: props.pacienteId,
        medicamento,
        data,
        reacoes_adversas_ou_alergicas,
    }

    async function handleSalvarApi() {
        try {
            await api.post("v1/reacoes", Reacao);
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

    const handleSalvar = (reacaoId) => {
        setOpen(false);
        props.onClose(reacaoId);
    }

    const handleFecharClick = (reacaoId) => {
        props.onClose(reacaoId);
    }

    return (
        <div className="AdicionarReacoes">
            <div className="LabelInput">
                <label><strong>Medicamento: </strong></label>
                <input value={medicamento} onChange={(e) => setMedicamento(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Ano: </strong></label>
                <input value={data} onChange={(e) => setData(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Reações Adversas Ou Alérgicas: </strong></label>
                <input value={reacoes_adversas_ou_alergicas} onChange={(e) => setReacoesAlergicas(e.target.value)} type="text"/>
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

export default AdicionarReacoes;