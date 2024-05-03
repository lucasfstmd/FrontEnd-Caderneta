import React, {useEffect, useState} from "react"
import "./EditarAntropometricos.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useQuery } from '../../../ContentFicha'
import { useNavigate, useParams } from 'react-router-dom'

function EditarAntropometricos() {
    const query = useQuery();
    const antropometricosId = query.get('infoId')
    const params = useParams();
    const { id } = params
    const navigate = useNavigate()

    const [antropometrico, setAntropometricos] = useState();
    const [ano, setAno] = useState();
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [perimetro_panturrilha, setPerimetroPanturrilha] = useState();

    async function carregarAntropometricos() {
        try {
            const response = await api.get(`v1/antropometricos/${antropometricosId}`);
            setAntropometricos(response.data);
            setAno(response.data.ano);
            setPeso(response.data.peso);
            setAltura(response.data.altura);
            setPerimetroPanturrilha(response.data.perimetro_panturrilha);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarAntropometricos();
    }, []);

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

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    }

    const handleEdit = async () => {
        try {
            await api.patch(`v1/antropometricos/${antropometricosId}`, Antropometrico);
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
        <div className="EditarAntropometricos">
            <div className="LabelInput">
                <label><strong>Ano: </strong></label>
                <input defaultValue={antropometrico ? antropometrico.ano : ''} onChange={(e) => setAno(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label><strong>Peso: </strong></label>
                <input defaultValue={antropometrico ? antropometrico.peso : ''} onChange={(e) => setPeso(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Altura: </strong></label>
                <input defaultValue={antropometrico ? antropometrico.altura : ''} onChange={(e) => setPeso(parseFloat(e.target.value))} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Perimetro Panturrilha: </strong></label>
                <input defaultValue={antropometrico ? antropometrico.perimetro_panturrilha : ''} onChange={(e) => setPeso(parseFloat(e.target.value))} type="text"/>
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

export default EditarAntropometricos;
