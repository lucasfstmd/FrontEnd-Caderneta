import React, {useEffect, useState} from "react";
import "./EditarSarcf.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useQuery } from '../../../ContentFicha'
import { useNavigate, useParams } from 'react-router-dom'

function EditarSarcf() {
    const query = useQuery();
    const sarcfId = query.get('infoId')
    const params = useParams();
    const { id } = params
    const navigate = useNavigate()

    const [p1, setP1] = useState("");
    const [p2, setP2] = useState("");
    const [p3, setP3] = useState("");
    const [p4, setP4] = useState("");
    const [p5, setP5] = useState("");

    async function carregarSarcf() {
        try {
            const response = await api.get(`v1/sarcfs/${sarcfId}`);
            setP1(response.data.p1);
            setP2(response.data.p2);
            setP3(response.data.p3);
            setP4(response.data.p4);
            setP5(response.data.p5);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarSarcf()
    }, []);

    const Sarcf = {
        paciente_id: parseInt(id),
        p1,
        p2,
        p3,
        p4,
        p5,
    }

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/sarcfs/${sarcfId}`, Sarcf);
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

    const handleSalvar = () => {
        setOpen(false);
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    }

    return (
        <div className="EditarSarcf">
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

export default EditarSarcf;
