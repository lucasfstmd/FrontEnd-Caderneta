import React, {useEffect, useState} from "react"
import "./EditarAntropometricos.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarAntropometricos(props) {
    const [antropometrico, setAntropometricos] = useState();
    const [ano, setAno] = useState();
    const [peso, setPeso] = useState();
    const [altura, setAltura] = useState();
    const [perimetro_panturrilha, setPerimetroPanturrilha] = useState();

    useEffect(() => {
        async function carregarAntropometricos() {
            try {
                const response = await api.get(`v1/antropometricos/${props.antropometricosId}`);
                setAntropometricos(response.data);
                setAno(response.data.ano);
                setPeso(response.data.peso);
                setAltura(response.data.altura);
                setPerimetroPanturrilha(response.data.perimetro_panturrilha);
            } catch (error) {
                console.log(undefined);
            }
        }

        carregarAntropometricos();
    }, [props.antropometricosId]);

    const Imc = parseFloat((peso / (altura ** 2)).toFixed(2));

    const Antropometrico = {
        paciente_id: props.pacienteId,
        ano,
        peso,
        altura,
        imc: Imc,
        perimetro_panturrilha,
    }

    const handleFecharClick = (reacoesId) => {
        props.onClose(reacoesId);
    }

    const handleEdit = async () => {
        try {
            await api.patch(`v1/antropometricos/${props.antropometricosId}`, Antropometrico);
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
        handleEdit();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSalvar = (reacoesId) => {
        setOpen(false);
        props.onClose(reacoesId);
    }

    return (
        <div className="EditarAntropometricos">
            <div className="LabelInput">
                <label><strong>Ano: </strong></label>
                <input defaultValue={antropometrico ? antropometrico.ano : ''} onChange={(e) => setAno(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Peso: </strong></label>
                <input defaultValue={antropometrico ? antropometrico.peso : ''} onChange={(e) => setPeso(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Altura: </strong></label>
                <input defaultValue={antropometrico ? antropometrico.altura : ''} onChange={(e) => setPeso(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Perimetro Panturrilha: </strong></label>
                <input defaultValue={antropometrico ? antropometrico.perimetro_panturrilha : ''} onChange={(e) => setPeso(parseFloat(e.target.value))} type="text"/>
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
                        {"Deseja realmente alterar esse Paciente"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Tem certeza que você deseja alterar os dados desse paciente?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleSalvar} autoFocus>
                            Salvar
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

export default EditarAntropometricos;