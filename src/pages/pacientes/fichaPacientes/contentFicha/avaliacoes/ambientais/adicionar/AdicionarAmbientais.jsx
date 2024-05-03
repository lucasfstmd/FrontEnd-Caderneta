import React, {useState} from "react";
import "./AdicionarAmbientais.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../../ContentFicha'

function AdicionarAmbientais() {
    const params = useParams();
    const { id } = params
    const query = useQuery();
    const navigate = useNavigate();

    const [ano, setAno] = useState();
    const [p1, setP1] = useState();
    const [p2, setP2] = useState();
    const [p3, setP3] = useState();
    const [p4, setP4] = useState();
    const [p5, setP5] = useState();
    const [p6, setP6] = useState();
    const [p7, setP7] = useState();
    const [p8, setP8] = useState();
    const [p9, setP9] = useState();
    const [p10, setP10] = useState();
    const [p11, setP11] = useState();

    const Ambiental = {
        paciente_id: parseInt(id),
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
    }

    async function handleSalvarApi() {
        try {
            await api.post("v1/ambientais", Ambiental);
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

    const handleSalvar = () => {
        setOpen(false);
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    }

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    }

    return (
        <div className="AdicionarAmbientais">
            <div className="LabelInput">
                <label><strong>Ano: </strong></label>
                <input value={ano} onChange={(e) => setAno(parseInt(e.target.value))} type="number" className="ano" />
            </div>
            <label className="Titulo"><strong>Áreas de locomoção</strong></label>
            <div className="LabelInput">
                <label><strong>Áreas de locomoção desimpedidas:</strong></label>
                <select value={p1} name="p1" onChange={(e) => setP1(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Presença de barras de apoio:</strong></label>
                <select value={p2} name="p2" onChange={(e) => setP2(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Pisos uniformes e tapetes bem fixos:</strong></label>
                <select value={p3} name="p3" onChange={(e) => setP3(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <label className="Titulo"><strong>Iluminação</strong></label>
            <div className="LabelInput">
                <label><strong>Presença de iluminação suficiente para clarear todo o interior de cada cômodo, incluindo degraus:</strong></label>
                <select value={p4} name="p4" onChange={(e) => setP4(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Interruptores acessíveis na entrada dos cômodos:</strong></label>
                <select value={p5} name="p5" onChange={(e) => setP5(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <label className="Titulo"><strong>Banheiro</strong></label>
            <div className="LabelInput">
                <label><strong>Área do chuveiro com antiderrapante:</strong></label>
                <select value={p6} name="p6" onChange={(e) => setP6(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Box com abertura fácil ou presença de cortina bem firme:</strong></label>
                <select value={p7} name="p7" onChange={(e) => setP7(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <label className="Titulo"><strong>Cozinha e quarto</strong></label>
            <div className="LabelInput">
                <label><strong>Armários baixos, sem necessidade do uso de escada:</strong></label>
                <select value={p8} name="p8" onChange={(e) => setP8(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <label className="Titulo"><strong>Escada</strong></label>
            <div className="LabelInput">
                <label><strong>Piso antiderrapante:</strong></label>
                <select value={p9} name="p9" onChange={(e) => setP9(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Corrimão dos dois lados e firme:</strong></label>
                <select value={p10} name="p10" onChange={(e) => setP10(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Não há:</strong></label>
                <select value={p11} name="p11" onChange={(e) => setP11(parseInt(e.target.value))}>
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

export default AdicionarAmbientais;
