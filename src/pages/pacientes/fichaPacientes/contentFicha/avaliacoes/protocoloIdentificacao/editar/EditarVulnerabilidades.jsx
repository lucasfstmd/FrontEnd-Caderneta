import React, {useEffect, useState} from "react"
import "./EditarVulnerabilidades.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useQuery } from '../../../ContentFicha'
import { useNavigate, useParams } from 'react-router-dom'

function EditarVulnerabilidades() {
    const query = useQuery();
    const vulnerabilidadeId = query.get('infoId')
    const params = useParams();
    const { id } = params
    const navigate = useNavigate()

    const [vulnerabilidade, setVulnerabilidade] = useState();
    const [ano, setAno] = useState(0);
    const [idade, setIdade] = useState('');
    const [autopercepcao, setAutopercepcao] = useState('');
    const [limitacao1, setLimitacao1] = useState('');
    const [limitacao2, setLimitacao2] = useState('');
    const [limitacao3, setLimitacao3] = useState('');
    const [limitacao4, setLimitacao4] = useState('');
    const [limitacao5, setLimitacao5] = useState('');
    const [limitacao6, setLimitacao6] = useState('');
    const [incapacidades1, setIncapacidades1] = useState();
    const [incapacidades2, setIncapacidades2] = useState();
    const [incapacidades3, setIncapacidades3] = useState();
    const [incapacidades4, setIncapacidades4] = useState();
    const [incapacidades5, setIncapacidades5] = useState();

    async function carregarVulnerabilidade() {
        try {
            const response = await api.get(`v1/vulnerabilidades/${vulnerabilidadeId}`);
            setVulnerabilidade(response.data);
            setAno(response.data.ano);
            setIdade(response.data.idade);
            setAutopercepcao(response.data.autopercepcao);
            setLimitacao1(response.data.limitacao1);
            setLimitacao2(response.data.limitacao2);
            setLimitacao3(response.data.limitacao3);
            setLimitacao4(response.data.limitacao4);
            setLimitacao5(response.data.limitacao5);
            setLimitacao6(response.data.limitacao6);
            setIncapacidades1(response.data.incapacidades1);
            setIncapacidades2(response.data.incapacidades2);
            setIncapacidades3(response.data.incapacidades3);
            setIncapacidades4(response.data.incapacidades4);
            setIncapacidades5(response.data.incapacidades5);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarVulnerabilidade();
    }, []);

    const getPontos = () => {
        let total = 0;

        // Idade
        if (idade === "De 60 a 74 anos") total += 0;
        else if (idade === "De 75 a 84 anos") total += 1;
        else if (idade === "≥ 85 anos") total += 3;

        // Autopercepção
        if (autopercepcao === "Excelente") total += 0;
        else if (autopercepcao === "Muito boa") total += 0;
        else if (autopercepcao === "Boa") total += 0;
        else if (autopercepcao === "Regular") total += 1;
        else if (autopercepcao === "Ruim") total += 1;

        // LIMITAÇÃO FÍSICA
        if (limitacao1 === "Nenhuma dificuldade") total += 0;
        else if (limitacao1 === "Pouca dificuldade") total += 0;
        else if (limitacao1 === "Média (alguma) dificuldade") total += 0;
        else if (limitacao1 === "Muita dificuldade") total += 1;
        else if (limitacao1 === "Incapaz de fazer (não consegue fazer)") total += 1;

        if (limitacao2 === "Nenhuma dificuldade") total += 0;
        else if (limitacao2 === "Pouca dificuldade") total += 0;
        else if (limitacao2 === "Média (alguma) dificuldade") total += 0;
        else if (limitacao2 === "Muita dificuldade") total += 1;
        else if (limitacao2 === "Incapaz de fazer (não consegue fazer)") total += 1;

        if (limitacao3 === "Nenhuma dificuldade") total += 0;
        else if (limitacao3 === "Pouca dificuldade") total += 0;
        else if (limitacao3 === "Média (alguma) dificuldade") total += 0;
        else if (limitacao3 === "Muita dificuldade") total += 1;
        else if (limitacao3 === "Incapaz de fazer (não consegue fazer)") total += 1;

        if (limitacao4 === "Nenhuma dificuldade") total += 0;
        else if (limitacao4 === "Pouca dificuldade") total += 0;
        else if (limitacao4 === "Média (alguma) dificuldade") total += 0;
        else if (limitacao4 === "Muita dificuldade") total += 1;
        else if (limitacao4 === "Incapaz de fazer (não consegue fazer)") total += 1;

        if (limitacao5 === "Nenhuma dificuldade") total += 0;
        else if (limitacao5 === "Pouca dificuldade") total += 0;
        else if (limitacao5 === "Média (alguma) dificuldade") total += 0;
        else if (limitacao5 === "Muita dificuldade") total += 1;
        else if (limitacao5 === "Incapaz de fazer (não consegue fazer)") total += 1;

        if (limitacao6 === "Nenhuma dificuldade") total += 0;
        else if (limitacao6 === "Pouca dificuldade") total += 0;
        else if (limitacao6 === "Média (alguma) dificuldade") total += 0;
        else if (limitacao6 === "Muita dificuldade") total += 1;
        else if (limitacao6 === "Incapaz de fazer (não consegue fazer)") total += 1;

        if (total > 2) total += 2;
        else total += total;

        let totalIncapacidades = 0;
        if (incapacidades1) totalIncapacidades += 4;
        if (incapacidades2) totalIncapacidades += 4;
        if (incapacidades3) totalIncapacidades += 4;
        if (incapacidades4) totalIncapacidades += 4;
        if (incapacidades5) totalIncapacidades += 4;

        if (totalIncapacidades > 4) total += 4;
        else total += totalIncapacidades;

        return total;
    };

    const Vulnerabilidade = {
        paciente_id: parseInt(id),
        ano,
        idade,
        autopercepcao,
        limitacao1,
        limitacao2,
        limitacao3,
        limitacao4,
        limitacao5,
        limitacao6,
        incapacidades1,
        incapacidades2,
        incapacidades3,
        incapacidades4,
        incapacidades5,
        pontuacao_total: getPontos(),
    }

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    }

    const handleEdit = async () => {
        try {
            await api.patch(`v1/vulnerabilidades/${vulnerabilidadeId}`, Vulnerabilidade);
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
        <div className="EditarVulnerabilidades">
            <div className="LabelInput">
                <label><strong>Ano: </strong></label>
                <input defaultValue={vulnerabilidade ? vulnerabilidade.ano: ''} onChange={(e) => setAno(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="LabelInput">
                <label className="Titulo"><strong>1. Idade: </strong></label>
                <select value={idade} onChange={(e) => setIdade(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="De 60 a 74 anos">De 60 a 74 anos</option>
                    <option value="De 75 a 84 anos">De 75 a 84 anos</option>
                    <option value="≥ 85 anos">≥ 85 anos</option>
                </select>
            </div>
            <div className="LabelInput">
                <label className="Titulo"><strong>2. Autopercepção da Saúde: </strong></label>
                <select value={autopercepcao} onChange={(e) => setAutopercepcao(e.target.value)}>
                    <option value={null}>Selecionar</option>
                    <option value="Excelente">Excelente</option>
                    <option value="Muito boa">Muito Boa</option>
                    <option value="Boa">Boa</option>
                    <option value="Regular">Regular</option>
                    <option value="Ruim">Ruim</option>
                </select>
            </div>
            <label className="Titulo"><strong>3. Limitações Físicas</strong></label>
            <div className="LabelInput">
                <label><strong>Curvar-se, agachar ou ajoelhar-se: </strong></label>
                <select value={limitacao1} onChange={(e) => setLimitacao1(e.target.value)}>
                    <option value={null}>Selecionar</option>
                    <option value="Nenhuma dificuldade">Nenhuma dificuldade</option>
                    <option value="Pouca dificuldade">Pouca dificuldade</option>
                    <option value="Média (alguma) dificuldade">Média (alguma) dificuldade</option>
                    <option value="Muita dificuldade">Muita dificuldade</option>
                    <option value="Incapaz de fazer (não consegue fazer">Incapaz de fazer (não consegue fazer</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Levantar ou carregar objetos com peso aproximado de 5 kg: </strong></label>
                <select value={limitacao2} onChange={(e) => setLimitacao2(e.target.value)}>
                    <option value={null}>Selecionar</option>
                    <option value="Nenhuma dificuldade">Nenhuma dificuldade</option>
                    <option value="Pouca dificuldade">Pouca dificuldade</option>
                    <option value="Média (alguma) dificuldade">Média (alguma) dificuldade</option>
                    <option value="Muita dificuldade">Muita dificuldade</option>
                    <option value="Incapaz de fazer (não consegue fazer">Incapaz de fazer (não consegue fazer</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Elevar ou estender os braços acima do nível do ombro: </strong></label>
                <select value={limitacao3} onChange={(e) => setLimitacao3(e.target.value)}>
                    <option value={null}>Selecionar</option>
                    <option value="Nenhuma dificuldade">Nenhuma dificuldade</option>
                    <option value="Pouca dificuldade">Pouca dificuldade</option>
                    <option value="Média (alguma) dificuldade">Média (alguma) dificuldade</option>
                    <option value="Muita dificuldade">Muita dificuldade</option>
                    <option value="Incapaz de fazer (não consegue fazer">Incapaz de fazer (não consegue fazer</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Escrever ou manusear e segurar pequenos objetos: </strong></label>
                <select value={limitacao4} onChange={(e) => setLimitacao4(e.target.value)}>
                    <option value={null}>Selecionar</option>
                    <option value="Nenhuma dificuldade">Nenhuma dificuldade</option>
                    <option value="Pouca dificuldade">Pouca dificuldade</option>
                    <option value="Média (alguma) dificuldade">Média (alguma) dificuldade</option>
                    <option value="Muita dificuldade">Muita dificuldade</option>
                    <option value="Incapaz de fazer (não consegue fazer">Incapaz de fazer (não consegue fazer</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Andar 400 metros (aproximadamente quatro quarteirões): </strong></label>
                <select value={limitacao5} onChange={(e) => setLimitacao5(e.target.value)}>
                    <option value={null}>Selecionar</option>
                    <option value="Nenhuma dificuldade">Nenhuma dificuldade</option>
                    <option value="Pouca dificuldade">Pouca dificuldade</option>
                    <option value="Média (alguma) dificuldade">Média (alguma) dificuldade</option>
                    <option value="Muita dificuldade">Muita dificuldade</option>
                    <option value="Incapaz de fazer (não consegue fazer">Incapaz de fazer (não consegue fazer</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Fazer serviço doméstico pesado, como esfregar o chão ou limpar janelas: </strong></label>
                <select value={limitacao6} onChange={(e) => setLimitacao6(e.target.value)}>
                    <option value={null}>Selecionar</option>
                    <option value="Nenhuma dificuldade">Nenhuma dificuldade</option>
                    <option value="Pouca dificuldade">Pouca dificuldade</option>
                    <option value="Média (alguma) dificuldade">Média (alguma) dificuldade</option>
                    <option value="Muita dificuldade">Muita dificuldade</option>
                    <option value="Incapaz de fazer (não consegue fazer">Incapaz de fazer (não consegue fazer</option>
                </select>
            </div>
            <label className="Titulo"><strong>4. Incapacidades</strong></label>
            <div className="LabelInput">
                <label><strong>Por causa de sua saúde ou condição física, você deixou de fazer compras?: </strong></label>
                <select value={incapacidades1} onChange={(e) => setIncapacidades1(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Por causa de sua saúde ou condição física, você deixou de controlar seu dinheiro, seus gastos ou de pagar suas contas?: </strong></label>
                <select value={incapacidades2} onChange={(e) => setIncapacidades2(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Por causa de sua saúde ou condição física, você deixou de caminhar dentro de casa?: </strong></label>
                <select value={incapacidades3} onChange={(e) => setIncapacidades3(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Por causa de sua saúde ou condição física, você deixou de realizar tarefas domésticas leves, como lavar louça ou fazer limpeza leve?: </strong></label>
                <select value={incapacidades4} onChange={(e) => setIncapacidades4(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Por causa de sua saúde ou condição física, você deixou de tomar banho sozinho(a)?: </strong></label>
                <select value={incapacidades5} onChange={(e) => setIncapacidades5(parseInt(e.target.value))}>
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

export default EditarVulnerabilidades;
