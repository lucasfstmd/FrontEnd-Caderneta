import React, {useEffect, useState} from "react"
import "./EditarReacoes.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useQuery } from '../../../ContentFicha'
import { useNavigate, useParams } from 'react-router-dom'

function EditarReacoes() {
    const query = useQuery();
    const reacoesId = query.get('infoId')
    const params = useParams();
    const { id } = params
    const navigate = useNavigate()

    const [reacao, setReacao] = useState();
    const [medicamento, setMedicamento] = useState('');
    const [data, setData] = useState('');
    const [reacoes_adversas_ou_alergicas, setReacoesAlergicas] = useState('');

    async function carregarReacao() {
        try {
            const response = await api.get(`v1/reacoes/${reacoesId}`);
            setReacao(response.data);
            setMedicamento(response.data.medicamento);
            setData(response.data.data);
            setReacoesAlergicas(response.data.reacoesAdversasOuAlergicas);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarReacao();
    }, []);

    const Reacao = {
        paciente_id: parseInt(id),
        medicamento,
        data,
        reacoes_adversas_ou_alergicas,
    }

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/reacoes/${reacoesId}`, Reacao);
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
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSalvar = () => {
        setOpen(false);
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    }


    return (
        <div className="EditarReacoes">
            <div className="LabelInput">
                <label><strong>Medicamento: </strong></label>
                <input defaultValue={reacao ? reacao.medicamento : ''} onChange={(e) => setMedicamento(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Ano: </strong></label>
                <input defaultValue={reacao ? reacao.data : ''} onChange={(e) => setData(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Reações Adversas Ou Alérgicas: </strong></label>
                <input defaultValue={reacao ? reacao.reacoes_adversas_ou_alergicas : ''} onChange={(e) => setReacoesAlergicas(e.target.value)} type="text"/>
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

export default EditarReacoes;
