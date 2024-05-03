import React, {useEffect, useState} from "react"
import "./EditarReferencias.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useQuery } from '../../../ContentFicha'
import { useNavigate, useParams } from 'react-router-dom'

function EditarReferencias() {
    const query = useQuery();
    const referenciaId = query.get('infoId')
    const params = useParams();
    const { id } = params
    const navigate = useNavigate()

    const [referencia, setReferencia] = useState();
    const [nome, setNome] = useState("");
    const [data_nascimento, setDataNascimento] = useState("");
    const [vinculo, setVinculo] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [celular, setCelular] = useState("");
    const [mora_com_voce, setMora_com_voce] = useState();
    const [data_informacao, setData_informacao] = useState("");

    async function carregarReferencia() {
        try {
            const response = await api.get(`v1/referencias/${referenciaId}`);
            setReferencia(response.data);
            setNome(response.data.nome);
            setDataNascimento(response.data.data_nascimento);
            setVinculo(response.data.vinculo);
            setEndereco(response.data.endereco);
            setTelefone(response.data.telefone);
            setCelular(response.data.celular);
            setMora_com_voce(response.data.mora_com_voce);
            setData_informacao(response.data.data_informacao);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarReferencia();
    }, []);

    const Referencia = {
        paciente_id: parseInt(id),
        nome,
        data_nascimento,
        vinculo,
        endereco,
        telefone,
        celular,
        mora_com_voce,
        data_informacao,
    }

    function formatarTelefone(valor) {
        let numero = valor.replace(/\D/g, "");
        numero = numero.substring(0, 10);
        if (numero.length === 10) {
            numero = numero.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
        return numero;
    }

    function formatarCelular(valor) {
        let numero = valor.replace(/\D/g, "");
        numero = numero.substring(0, 11);
        if (numero.length === 11) {
            numero = numero.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
        return numero;
    }

    const handleTelefoneChange = (e) => {
        setTelefone(formatarTelefone(e.target.value));
    }

    const handleCelularChange = (e) => {
        setCelular(formatarCelular(e.target.value));
    }

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    }

    const handleEdit = async () => {
        try {
            await api.patch(`v1/referencias/${referenciaId}`, Referencia);
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
        <div className="EditarReferencias">
            <div className="LabelInput">
                <label><strong>Nome: </strong></label>
                <input defaultValue={referencia ? referencia.nome : ''} onChange={(e) => setNome(e.target.value)} type="text" className="nome" />
            </div>
            <div className="LabelInput">
                <label><strong>Data Nascimento: </strong></label>
                <input defaultValue={referencia ? referencia.data_nascimento : ''} onChange={(e) => setDataNascimento(e.target.value)} type="date" className="data_nascimento" />
            </div>
            <div className="LabelInput">
                <label><strong>Vinculo: </strong></label>
                <input defaultValue={referencia ? referencia.vinculo : ''} onChange={(e) => setVinculo(e.target.value)} type="text" className="vinculo" />
            </div>
            <div className="LabelInput">
                <label><strong>Endereço: </strong></label>
                <input defaultValue={referencia ? referencia.endereco : ''} onChange={(e) => setEndereco(e.target.value)} type="text" className="endereco" />
            </div>
            <div className="LabelInput">
                <label><strong>Telefone: </strong></label>
                <input defaultValue={referencia ? referencia.telefone : ''} type="text" onChange={handleTelefoneChange} className="telefone" />
            </div>
            <div className="LabelInput">
                <label><strong>Celular: </strong></label>
                <input defaultValue={referencia ? referencia.celular : ''} type="text" onChange={handleCelularChange} className="celular" />
            </div>
            <div className="LabelInput">
                <label><strong>Mora com você?: </strong></label>
                <select value={referencia ? referencia.mora_com_voce: ''} name="mora_com_voce" onChange={(e) => setMora_com_voce(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Data Informação: </strong></label>
                <input defaultValue={referencia ? referencia.data_informacao : ''} onChange={(e) => setData_informacao(e.target.value)} type="date" className="data_informacao" />
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

export default EditarReferencias;
