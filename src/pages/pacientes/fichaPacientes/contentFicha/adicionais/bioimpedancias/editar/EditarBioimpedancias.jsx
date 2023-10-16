import React, {useEffect, useState} from "react";
import "./EditarBioimpedancias.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";

function EditarBioimpedancias(props) {
    const [bioimpedancia, setBioimpedancia] = useState();
    const [p1, setP1] = useState(null);
    const [p2, setP2] = useState(null);
    const [p3, setP3] = useState(null);
    const [p4, setP4] = useState(null);
    const [p5, setP5] = useState(null);
    const [p6, setP6] = useState(null);
    const [p7, setP7] = useState(null);
    const [p8, setP8] = useState(null);
    const [p9, setP9] = useState(null);
    const [p10, setP10] = useState(null);
    const [p11, setP11] = useState(null);
    const [p12, setP12] = useState(null);
    const [p13, setP13] = useState(null);
    const [p14, setP14] = useState(null);
    const [p15, setP15] = useState(null);
    const [p16, setP16] = useState(null);
    const [p17, setP17] = useState(null);
    const [p18, setP18] = useState(null);
    const [p19, setP19] = useState(null);
    const [p20, setP20] = useState(null);
    const [p21, setP21] = useState(null);
    const [p22, setP22] = useState(null);
    const [p23, setP23] = useState(null);
    const [p24, setP24] = useState(null);
    const [p25, setP25] = useState(null);
    const { id } = useParams()

    async function carregarBioimpedancia() {
        try {
            const response = await api.get(`v1/bioimpedancias/${props.bioimpedanciaId}`);
            setBioimpedancia(response.data);
            setP1(response.data.p1);
            setP2(response.data.p2);
            setP3(response.data.p3);
            setP4(response.data.p4);
            setP5(response.data.p5);
            setP6(response.data.p6);
            setP7(response.data.p7);
            setP8(response.data.p8);
            setP9(response.data.p9);
            setP10(response.data.p10);
            setP11(response.data.p11);
            setP12(response.data.p12);
            setP13(response.data.p13);
            setP14(response.data.p14);
            setP15(response.data.p15);
            setP16(response.data.p16);
            setP17(response.data.p17);
            setP18(response.data.p18);
            setP19(response.data.p19);
            setP20(response.data.p20);
            setP21(response.data.p21);
            setP22(response.data.p22);
            setP23(response.data.p23);
            setP24(response.data.p24);
            setP25(response.data.p25);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarBioimpedancia();
    }, []);

    const Bioimpedancia = {
        paciente_id: id,
        p1,
        p2,
        p3,
        p4,
        p5,
        p6,
        p7,
        p8,
        p9,
        p10,
        p11,
        p12,
        p13,
        p14,
        p15,
        p16,
        p17,
        p18,
        p19,
        p20,
        p21,
        p22,
        p23,
        p24,
        p25,
    };

    const handleFecharClick = (bioimpedanciaId) => {
        props.onClose(bioimpedanciaId);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/bioimpedancias/${props.bioimpedanciaId}`, Bioimpedancia);
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

    const handleSalvar = (bioimpedanciaId) => {
        setOpen(false);
        props.onClose(bioimpedanciaId);
    }

    return (
        <div className="EditarBioimpedancias">
            <div className="LabelInput">
                <label><strong>Ângulo de fase:</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p1 : ''} onChange={(e) => setP1(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Capacitância do corpo:</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p2 : ''} onChange={(e) => setP2(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Resistência:</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p3 : ''} onChange={(e) => setP3(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Reatância:</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p4 : ''} onChange={(e) => setP4(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Massa celular corporal (kg):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p5 : ''} onChange={(e) => setP5(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Massa celular corporal (%)::</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p6 : ''} onChange={(e) => setP6(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Massa extracelular (kg):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p7 : ''} onChange={(e) => setP7(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Massa extracelular (%):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p8 : ''} onChange={(e) => setP8(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Massa magra (kg):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p9 : ''} onChange={(e) => setP9(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Massa magra (%)::</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p10 : ''} onChange={(e) => setP10(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Massa gorda (kg):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p11 : ''} onChange={(e) => setP11(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Massa gorda (%):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p12 : ''} onChange={(e) => setP12(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Peso total (kg):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p13 : ''} onChange={(e) => setP13(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Peso total (%):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p14 : ''} onChange={(e) => setP14(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>ME/MCC (kg):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p15 : ''} onChange={(e) => setP15(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>IMC (kg):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p16 : ''} onChange={(e) => setP16(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Taxa metabólica basal (cals):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p17 : ''} onChange={(e) => setP17(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Água intracelular (kg):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p18 : ''} onChange={(e) => setP18(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Água intracelular (%):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p19 : ''} onChange={(e) => setP19(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Água extracelular (kg):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p20 : ''} onChange={(e) => setP20(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Água extracelular (%):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p21 : ''} onChange={(e) => setP21(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Água corporal total (kg):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p22 : ''} onChange={(e) => setP22(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Água corporal total (%):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p23 : ''} onChange={(e) => setP23(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>ACT/massa magra (%):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p24 : ''} onChange={(e) => setP24(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>ACT/peso total (%):</strong></label>
                <input defaultValue={bioimpedancia ? bioimpedancia.p25 : ''} onChange={(e) => setP25(parseFloat(e.target.value))} type="text"/>
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

export default EditarBioimpedancias;
