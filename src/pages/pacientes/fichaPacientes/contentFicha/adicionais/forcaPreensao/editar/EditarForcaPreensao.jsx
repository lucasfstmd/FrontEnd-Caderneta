import React, {useEffect, useState} from "react";
import "./EditarForcaPreensao.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useQuery } from '../../../ContentFicha'
import { useNavigate, useParams } from 'react-router-dom'

function EditarForcaPreensao() {
    const query = useQuery();
    const forcaPressaoId = query.get('infoId')
    const params = useParams();
    const { id } = params
    const navigate = useNavigate()

    const [preensaoForca, setPreensaoForca] = useState();
    const [medida_1, setMedida1] = useState(null);
    const [medida_2, setMedida2] = useState(null);
    const [medida_3, setMedida3] = useState(null);
    const [membro_dominante, setMembro] = useState("");

    async function carregarForca() {
        try {
            const response = await api.get(`v1/preensao-forcas/${forcaPressaoId}`);
            setPreensaoForca(response.data);
            setMedida1(response.data.medida_1);
            setMedida2(response.data.medida_2);
            setMedida3(response.data.medida_3);
            setMembro(response.data.membro_dominante);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarForca();
    }, []);

    const PreensaoForca = {
        paciente_id: id,
        medida_1,
        medida_2,
        medida_3,
        membro_dominante,
    }

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/preensao-forcas/${forcaPressaoId}`, PreensaoForca);
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
        <div className="EditarForcaPressao">
            <div className="LabelInput">
                <label><strong>Medida 1: </strong></label>
                <input defaultValue={preensaoForca ? preensaoForca.medida_1 : ''} onChange={(e) => setMedida1(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Medida 2: </strong></label>
                <input defaultValue={preensaoForca ? preensaoForca.medida_2 : ''} onChange={(e) => setMedida2(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Medida 3: </strong></label>
                <input defaultValue={preensaoForca ? preensaoForca.medida_3 : ''} onChange={(e) => setMedida3(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Membro Dominante: </strong></label>
                <input defaultValue={preensaoForca ? preensaoForca.membro_dominante : ''} onChange={(e) => setMembro(e.target.value)} type="text"/>
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

export default EditarForcaPreensao;
