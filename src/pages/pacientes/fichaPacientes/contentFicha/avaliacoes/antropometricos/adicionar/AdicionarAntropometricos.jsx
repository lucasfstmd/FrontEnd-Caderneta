import React, {useState} from "react"
import "./AdicionarAntropometricos.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function AdicionarAntropometricos(props) {
    const [ano, setAno] = useState();
    const [peso, setPeso] = useState();
    const [altura, setAltura] = useState();
    const [perimetro_panturrilha, setPerimetroPanturrilha] = useState();

    const Imc = parseFloat((peso / (altura ** 2)).toFixed(2));

    const Antropometrico = {
        paciente_id: props.pacienteId,
        ano,
        peso,
        altura,
        imc: Imc,
        perimetro_panturrilha,
    }

    async function handleSalvarApi() {
        try {
            await api.post("v1/antropometricos", Antropometrico);
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

    const handleSalvar = (antropometricosId) => {
        setOpen(false);
        props.onClose(antropometricosId);
    }

    const handleFecharClick = (antropometricosId) => {
        props.onClose(antropometricosId);
    }

    return (
        <div className="AdicionarAntropometricos">
            <div className="LabelInput">
                <label><strong>Ano: </strong></label>
                <input defaultValue={ano} onChange={(e) => setAno(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Peso: </strong></label>
                <input defaultValue={peso} onChange={(e) => setPeso(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Altura: </strong></label>
                <input defaultValue={altura} onChange={(e) => setAltura(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Perimetro Panturrilha: </strong></label>
                <input defaultValue={perimetro_panturrilha} onChange={(e) => setPerimetroPanturrilha(parseFloat(e.target.value))} type="text"/>
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

export default AdicionarAntropometricos;