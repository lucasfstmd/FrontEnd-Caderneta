import React, {useEffect, useState} from "react"
import "./EditarComplementares.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarComplementares(props) {
    const [complementares, setComplementares] = useState();
    const [ano, setAno] = useState();
    const [p1, setP1] = useState("");
    const [p2, setP2] = useState("");
    const [p3, setP3] = useState("");
    const [p4, setP4] = useState("");
    const [p5, setP5] = useState("");

    useEffect(() => {
        async function carregarComplementar() {
            try {
                const response = await api.get(`v1/complementares/${props.complementaresId}`);
                setComplementares(response.data);
                setAno(response.data.ano);
                setP1(response.data.p1);
                setP2(response.data.p2);
                setP3(response.data.p3);
                setP4(response.data.p4);
                setP5(response.data.p5);
            } catch (error) {
                console.log(error);
            }
        }

        carregarComplementar();
    }, [props.complementaresId]);

    const Complementar = {
        paciente_id: props.pacienteId,
        ano,
        p1,
        p2,
        p3,
        p4,
        p5,
    }

    const handleFecharClick = (complementaresId) => {
        props.onClose(complementaresId);
    }

    const handleEdit = async () => {
        try {
            await api.patch(`v1/complementares/${props.complementaresId}`, Complementar);
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

    const handleSalvar = (complementaresId) => {
        setOpen(false);
        props.onClose(complementaresId);
    }

    return (
        <div className="EditarComplementares">
            <div className="LabelInput">
                <label><strong>Ano: </strong></label>
                <input defaultValue={complementares ? complementares.ano: ''} onChange={(e) => setAno(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Algum familiar ou amigo(a) falou que você está ficando esquecido(a)?: </strong></label>
                <select value={p1} name="uso_concomitante" onChange={(e) => setP1(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>O esquecimento está piorando nos últimos meses?: </strong></label>
                <select value={p2} name="uso_concomitante" onChange={(e) => setP2(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>O esquecimento está impedindo a realização de alguma atividade do cotidiano?: </strong></label>
                <select value={p3} name="uso_concomitante" onChange={(e) => setP3(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>No último mês, você ficou com desânimo, tristeza ou desesperança?: </strong></label>
                <select value={p4} name="uso_concomitante" onChange={(e) => setP4(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>No último mês, você perdeu o interesse ou o prazer por atividades anteriormente prazerosas?: </strong></label>
                <select value={p5} name="uso_concomitante" onChange={(e) => setP5(parseInt(e.target.value))}>
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

export default EditarComplementares;