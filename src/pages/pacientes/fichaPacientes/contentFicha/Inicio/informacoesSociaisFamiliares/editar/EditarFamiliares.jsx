import React, {useEffect, useState} from "react";
import "./EditarFamiliares.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarFamiliares(props) {

    const [familiar, setFamiliar] = useState();
    const [ano, setAno] = useState(null);
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

    async function carregarFamiliare() {
        try {
            const response = await api.get(`v1/familiares/${props.familiarId}`);
            setFamiliar(response.data);
            setAno(response.data.ano);
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
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarFamiliare();
    }, []);

    const Familiar = {
        paciente_id: props.pacienteId,
        ano,
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
    }
    const handleFecharClick = (familiaresId) => {
        props.onClose(familiaresId);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/familiares/${props.familiarId}`, Familiar);
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

    const handleSalvar = (familiaresId) => {
        setOpen(false);
        props.onClose(familiaresId);
    }

    return (
        <div className="EditarFamiliares">
            <div className="LabelInput">
                <label><strong>Ano: </strong></label>
                <input value={familiar ? familiar.ano : ''} onChange={(e) => setAno(parseInt(e.target.value))} type="number" className="ano" />
            </div>
            <div className="LabelInput">
                <label><strong>Você mora sozinho(a)?:</strong></label>
                <select value={p1} name="p1" onChange={(e) => setP1(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você mora com familiares?:</strong></label>
                <select value={p2} name="p2" onChange={(e) => setP2(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você mora com seu(sua) cônjuge ou companheiro(a)?:</strong></label>
                <select value={p3} name="p3" onChange={(e) => setP3(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você reside em instituição de longa permanência para idosos (ILPI), abrigo ou casa de repouso?:</strong></label>
                <select value={p4} name="p4" onChange={(e) => setP4(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Nos últimos 30 dias, você se encontrou com amigos ou familiares para conversar ou fazer alguma atividade, como ir ao cinema ou à igreja, passear ou caminhar junto?:</strong></label>
                <select value={p5} name="p5" onChange={(e) => setP5(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Em caso de necessidade, você conta com alguém para acompanhá-lo(a) à unidade de saúde ou a uma consulta?:</strong></label>
                <select value={p6} name="p6" onChange={(e) => setP6(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você tem fácil acesso aos serviços de farmácia, padaria ou supermercado?:</strong></label>
                <select value={p7} name="p7" onChange={(e) => setP7(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você tem fácil acesso a transporte?:</strong></label>
                <select value={p8} name="p8" onChange={(e) => setP8(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você trabalha atualmente?:</strong></label>
                <select value={p9} name="p9" onChange={(e) => setP9(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você recebe aposentadoria ou pensão?:</strong></label>
                <select value={p10} name="p10" onChange={(e) => setP10(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você recebe benefício de prestação continuada (BPC)?:</strong></label>
                <select value={p11} name="p11" onChange={(e) => setP11(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você recebe benefícios do Bolsa-Família?:</strong></label>
                <select value={p12} name="p12" onChange={(e) => setP12(parseInt(e.target.value))}>
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
    );
}

export default EditarFamiliares;