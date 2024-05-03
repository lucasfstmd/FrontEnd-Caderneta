import React, { useState } from "react";
import "./AdicionarAntropometricos.css";
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, DialogContentText } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../../ContentFicha'

function AdicionarAntropometricos() {
    const params = useParams();
    const { id } = params
    const query = useQuery();
    const navigate = useNavigate();

    const [ano, setAno] = useState();
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [perimetro_panturrilha, setPerimetroPanturrilha] = useState();

    const pesoFloat = parseFloat(peso.toString().replace(',', '.'));
    const alturaFloat = parseFloat(altura.toString().replace(',', '.'));

    const Imc = isNaN(pesoFloat) || isNaN(alturaFloat) ? 0 : parseFloat((pesoFloat / (alturaFloat * alturaFloat)).toFixed(2));

    const Antropometrico = {
        paciente_id: parseInt(id),
        ano,
        peso: !isNaN(pesoFloat) ? pesoFloat : 0,
        altura: !isNaN(alturaFloat) ? alturaFloat : 0,
        imc: Imc,
        perimetro_panturrilha,
    };

    async function handleSalvarApi() {
        try {
            await api.post("v1/antropometricos", Antropometrico);
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
    };

    const handleFecharErro500 = () => {
        setOpenErro500(false);
    };

    const handleClickOpen = () => {
        handleSalvarApi();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSalvar = () => {
        setOpen(false);
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    };

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    };

    return (
        <div className="AdicionarAntropometricos">
            <div className="LabelInput">
                <label><strong>Ano: </strong></label>
                <input defaultValue={ano} onChange={(e) => setAno(parseInt(e.target.value))} type="number" />
            </div>
            <div className="LabelInput">
                <label><strong>Peso: </strong></label>
                <input defaultValue={peso} onChange={(e) => setPeso(e.target.value)} type="text" />
            </div>
            <div className="LabelInput">
                <label><strong>Altura: </strong></label>
                <input defaultValue={altura} onChange={(e) => setAltura(e.target.value)} type="text" />
            </div>
            <div className="LabelInput">
                <label><strong>Perimetro Panturrilha: </strong></label>
                <input defaultValue={perimetro_panturrilha} onChange={(e) => setPerimetroPanturrilha(parseFloat(e.target.value))} type="text" />
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
    );
}

export default AdicionarAntropometricos;
