import React, {useEffect, useState} from "react";
import "./EditarHabitos.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarHabitos(props) {
    const [habito, setHabito] = useState();
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
    const [p13, setP13] = useState(null);
    const [p14, setP14] = useState(null);
    const [p15, setP15] = useState(null);
    const [p16, setP16] = useState(null);
    const [p17, setP17] = useState(null);
    const [p18, setP18] = useState(null);
    const [p19, setP19] = useState(null);

    useEffect(() => {
        async function carregarHabito() {
            try {
                const response = await api.get(`v1/habitos/${props.habitosId}`);
                setHabito(response.data);
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
                setP13(response.data.p13);
                setP14(response.data.p14);
                setP15(response.data.p15);
                setP16(response.data.p16);
                setP17(response.data.p17);
                setP18(response.data.p18);
                setP19(response.data.p19);

            } catch (error) {
                console.log(undefined);
            }
        }

        carregarHabito();
    }, [props.habitosId]);

    const Habito = {
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
        p13,
        p14,
        p15,
        p16,
        p17,
        p18,
        p19,
    }

    const handleFecharClick = (habitosId) => {
        props.onClose(habitosId);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/habitos/${props.habitosId}`, Habito);
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

    const handleSalvar = (habitosId) => {
        setOpen(false);
        props.onClose(habitosId);
    }

    return (
        <div className="EditarHabitos">
            <div className="LabelInput">
                <label><strong>Ano: </strong></label>
                <input defaultValue={habito ? habito.ano : ''} onChange={(e) => setAno(parseInt(e.target.value))} type="number" className="ano" />
            </div>
            <label className="Titulo"><strong>Interesse social e lazer</strong></label>
            <div className="LabelInput">
                <label><strong>Você frequenta centros-dia, clubes ou grupos de convivência?: </strong></label>
                <select value={p1} name="p1" onChange={(e) => setP1(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você realiza algum trabalho voluntário?:</strong></label>
                <select value={p2} name="p2" onChange={(e) => setP2(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você tem alguma atividade de lazer?:</strong></label>
                <select value={p3} name="p3" onChange={(e) => setP3(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <label className="Titulo"><strong>Atividade Física</strong></label>
            <div className="LabelInput">
                <label><strong>Você pratica algum tipo de atividade física (como caminhadas, natação, dança, ginástica etc.) pelo menos três vezes por semana?:</strong></label>
                <select value={p4} name="p4" onChange={(e) => setP4(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você gostaria de começar algum programa de atividade física?:</strong></label>
                <select value={p5} name="p5" onChange={(e) => setP5(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <label className="Titulo"><strong>Alimentação</strong></label>
            <div className="LabelInput">
                <label><strong>Você faz pelo menos três refeições por dia?:</strong></label>
                <select value={p6} name="p6" onChange={(e) => setP6(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você come frutas, legumes e verduras nas suas refeições ao longo do dia? :</strong></label>
                <select value={p7} name="p7" onChange={(e) => setP7(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Em pelo menos uma refeição diária, você come carnes, peixes ou ovos?:</strong></label>
                <select value={p8} name="p8" onChange={(e) => setP8(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você tem o costume de consumir bebidas açucaradas, bolos, biscoitos recheados e sobremesas?:</strong></label>
                <select value={p9} name="p9" onChange={(e) => setP9(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>No preparo das suas refeições, é utilizada grande quantidade de óleos, gorduras, açúcar e sal?:</strong></label>
                <select value={p10} name="p10" onChange={(e) => setP10(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você inclui a ingestão de água na sua rotina diária?:</strong></label>
                <select value={p11} name="p11" onChange={(e) => setP11(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <label className="Titulo"><strong>Tabagismo</strong></label>
            <div className="LabelInput">
                <label><strong>Atualmente, você fuma algum produto do tabaco?:</strong></label>
                <select value={p12} name="p11" onChange={(e) => setP12(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você gostaria de parar de fumar?:</strong></label>
                <select value={p13} onChange={(e) => setP13(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você é ex-fumante?:</strong></label>
                <select value={p14} name="p11" onChange={(e) => setP14(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <label className="Titulo"><strong>Álcool</strong></label>
            <div className="LabelInput">
                <label><strong>Você consome bebida alcoólica?:</strong></label>
                <select value={p15} name="p11" onChange={(e) => setP15(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Você já sentiu a necessidade de reduzir ou suspender o consumo de álcool?:</strong></label>
                <select value={p16} name="p11" onChange={(e) => setP16(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Alguém já lhe criticou por você beber?:</strong></label>
                <select value={p17} name="p11" onChange={(e) => setP17(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Sente-se culpado(a) por beber?:</strong></label>
                <select value={p18} name="p11" onChange={(e) => setP18(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Costuma beber logo pela manhã?:</strong></label>
                <select value={p19} name="p11" onChange={(e) => setP19(parseInt(e.target.value))}>
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
    )
}

export default EditarHabitos;