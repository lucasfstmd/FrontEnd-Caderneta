import React, {useEffect, useState} from "react";
import "./EditarQueda.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useQuery } from '../../../ContentFicha'
import { useNavigate, useParams } from 'react-router-dom'

function EditarQueda() {
    const query = useQuery();
    const quedaId = query.get('infoId')
    const params = useParams();
    const { id } = params
    const navigate = useNavigate()

    const [quedaObj, setQuedaObj] = useState();
    const [queda, setQueda] = useState();
    const [data_mes, setDataMes] = useState();
    const [data_ano, setDataAno] = useState();
    const [fratura, setFratura] = useState();
    const [parou_atividade, setParouAtividade] = useState();
    const [local_queda, setLocalQueda] = useState('');
    const [fratura_qual, setFraturaQual] = useState('');

    async function carregarQuedas() {
        try {
            const response = await api.get(`v1/quedas/${quedaId}`);
            setQuedaObj(response.data);
            setQueda(response.data.queda);
            setDataMes(response.data.data_mes);
            setDataAno(response.data.data_ano);
            setFratura(response.data.fratura);
            setParouAtividade(response.data.parou_atividade);
            setLocalQueda(response.data.local_queda);
            setFraturaQual(response.data.fratura_qual);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarQuedas();
    }, []);

    const Queda = {
        paciente_id: parseInt(id),
        queda,
        data_mes,
        data_ano,
        fratura,
        parou_atividade,
        local_queda,
        fratura_qual
    }

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/quedas/${quedaId}`, Queda);
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
        <div className="EditarQueda">
            <div className="LabelInput">
                <label><strong>Queda: </strong></label>
                <select value={queda} onChange={(e) => setQueda(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Data Mes: </strong></label>
                <input defaultValue={quedaObj ? quedaObj.data_mes : ''} onChange={(e) => setDataMes(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Data Ano: </strong></label>
                <input defaultValue={quedaObj ? quedaObj.data_ano : ''} onChange={(e) => setDataAno(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Local Queda: </strong></label>
                <input defaultValue={quedaObj ? quedaObj.local_queda : ''} onChange={(e) => setLocalQueda(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Fratura?: </strong></label>
                <select value={fratura} onChange={(e) => setFratura(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Fratura Qual: </strong></label>
                <input defaultValue={quedaObj ? quedaObj.fratura_qual : ''} onChange={(e) => setFraturaQual(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Parou Atividade?: </strong></label>
                <select value={parou_atividade} onChange={(e) => setParouAtividade(parseInt(e.target.value))}>
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

export default EditarQueda;
