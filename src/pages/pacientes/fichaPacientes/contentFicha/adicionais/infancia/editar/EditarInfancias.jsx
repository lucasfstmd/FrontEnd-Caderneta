import React, {useEffect, useState} from "react"
import "./EditarInfancias.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarInfancias(props) {
    const [infancia, setInfancia] = useState();
    const [a1, setA1] = useState("");
    const [a2_a, setA2_a] = useState("");
    const [a2_b, setA2_b] = useState("");
    const [a3_a, setA3_a] = useState("");
    const [a3_b, setA3_b] = useState("");
    const [a4, setA4] = useState("");
    const [a5_a, setA5_a] = useState("");
    const [a5_b, setA5_b] = useState("");
    const [a5_c, setA5_c] = useState("");
    const [a5_d, setA5_d] = useState("");
    const [a5_e, setA5_e] = useState("");
    const [a5_f, setA5_f] = useState("");
    const [a5_g, setA5_g] = useState("");
    const [a5_h, setA5_h] = useState("");
    const [a6, setA6] = useState("");
    const [a7, setA7] = useState("");
    const [b1, setB1] = useState("");
    const [b2, setB2] = useState("");
    const [b3_a, setB3_a] = useState("");
    const [b3_b, setB3_b] = useState("");
    const [b4, setB4] = useState("");
    const [b5, setB5] = useState("");
    const [b6, setB6] = useState("");

    useEffect(() => {
        async function carregarInfancia() {
            try {
                const response = await api.get(`v1/infancias/${props.infanciaId}`);
                setInfancia(response.data);
                setA1(response.data.a1);
                setA2_a(response.data.a2_a);
                setA2_b(response.data.a2_b);
                setA3_a(response.data.a3_a);
                setA3_b(response.data.a3_b);
                setA4(response.data.a4);
                setA5_a(response.data.a5_a);
                setA5_b(response.data.a5_b);
                setA5_c(response.data.a5_c);
                setA5_d(response.data.a5_d);
                setA5_e(response.data.a5_e);
                setA5_f(response.data.a5_f);
                setA5_g(response.data.a5_g);
                setA5_h(response.data.a5_h);
                setA6(response.data.a6);
                setA7(response.data.a7);
                setB1(response.data.b1);
                setB2(response.data.b2);
                setB3_a(response.data.b3_a);
                setB3_b(response.data.b3_b);
                setB4(response.data.b4);
                setB5(response.data.b5);
                setB6(response.data.b6);

            } catch (error) {
                console.log(error);
            }
        }

        carregarInfancia();
    }, [props.infanciaId]);

    const Infancia = {
        paciente_id: props.pacienteId,
        a1,
        a2_a,
        a2_b,
        a3_a,
        a3_b,
        a4,
        a5_a,
        a5_b,
        a5_c,
        a5_d,
        a5_e,
        a5_f,
        a5_g,
        a5_h,
        a6,
        a7,
        b1,
        b2,
        b3_a,
        b3_b,
        b4,
        b5,
        b6
    };

    const handleFecharClick = (infanciaId) => {
        props.onClose(infanciaId);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/infancias/${props.infanciaId}`, Infancia);
            setOpen(true);
        } catch (error) {
            console.log(error)
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

    const handleSalvar = (infanciaId) => {
        setOpen(false);
        props.onClose(infanciaId);
    }

    return (
        <div className="EditarInfancias">
            <div className="TituloInfancia">
                “Agora eu gostaria que você respondesse algumas perguntas sobre os primeiros 15 anos da sua vida?”
            </div>
            <div className="LabelInput">
                <label><strong>1.Como era a situação econômica da sua família na maior parte do tempo nos primeiros 15 anos da sua vida?: </strong></label>
                <select value={a1} name="tipo" onChange={(e) => setA1(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Boa">Boa</option>
                    <option value="Na média">Na média</option>
                    <option value="Pobre">Pobre</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>2. Qual era a profissão do seu pai na maior parte da sua infância (nos primeiros 15 anos da sua vida)?: </strong></label>
                <input defaultValue={infancia ? infancia.a2_a : ''} onChange={(e) => setA2_a(e.target.value)} type="text"/>
                <br/>
                <select value={a2_b} name="tipo" onChange={(e) => setA2_b(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Não trabalhava">Não trabalhava</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>3. Qual era a profissão da sua mãe na maior parte da sua infância (nos primeiros 15 anos da sua vida)?: </strong></label>
                <input defaultValue={infancia ? infancia.a3_a : ''} onChange={(e) => setA3_a(e.target.value)} type="text"/>
                <br/>
                <select value={a3_b} name="tipo" onChange={(e) => setA3_b(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Não trabalhava">Não trabalhava</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>4. Você diria que a sua saúde nos primeiros 15 anos da sua vida foi excelente, boa ou ruim?: </strong></label>
                <select value={a4} name="tipo" onChange={(e) => setA4(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Excelente">Excelente</option>
                    <option value="Boa">Boa</option>
                    <option value="Ruim">Ruim</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>5. Você lembra de ter tido alguma das doenças citadas nos primeiros 15 anos da sua vida?</strong></label>
            </div>
            <div className="LabelInput">
                <label><strong>a) Nefrite (doença renal)</strong></label>
                <select value={a5_a} name="tipo" onChange={(e) => setA5_a(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>b) Hepatite</strong></label>
                <select value={a5_b} name="tipo" onChange={(e) => setA5_b(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>c) Sarampo</strong></label>
                <select value={a5_c} name="tipo" onChange={(e) => setA5_c(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>d) Tuberculose</strong></label>
                <select value={a5_d} name="tipo" onChange={(e) => setA5_d(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>e) Febre reumática</strong></label>
                <select value={a5_e} name="tipo" onChange={(e) => setA5_e(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>f) Asma</strong></label>
                <select value={a5_f} name="tipo" onChange={(e) => setA5_f(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>g) Brinquite Crônica</strong></label>
                <select value={a5_g} name="tipo" onChange={(e) => setA5_g(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>h) Você teve alguma outra. Especifique:</strong></label>
                <input defaultValue={infancia ? infancia.a5_h : ''} onChange={(e) => setA5_h(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>6. Nos primeiros 15 anos da sua vida você ficou confinado em uma cama por 1 mês ou mais por algum problema de saúde?</strong></label>
                <select value={a6} name="tipo" onChange={(e) => setA6(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>7. Nos primeiros 15 anos da sua vida, você pode afirmar que houve um período em que você não se alimentou bem e que sentia fome?</strong></label>
                <select value={a7} name="tipo" onChange={(e) => setA7(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="TituloInfancia">
                “Agora eu gostaria que você respondesse algumas perguntas sobre dificuldades que você e sua família possam ter tido durante a sua infância (nos primeiros 15 anos da sua vida).”
            </div>
            <div className="LabelInput">
                <label><strong>1. Seu pai ou sua mãe não tinham emprego por muito tempo quando eles queriam trabalhar?</strong></label>
                <select value={b1} name="tipo" onChange={(e) => setB1(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>2. Seu pai ou sua mãe bebeu ou usou drogas com muita frequência a ponto de causar problemas para a família?</strong></label>
                <select value={b2} name="tipo" onChange={(e) => setB2(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>3. Seu pai, sua mãe ou ambos morreram durante a infância?</strong></label>
                <select value={b3_a} name="tipo" onChange={(e) => setB3_a(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
                {b3_a === "Sim" ? (
                    <select value={b3_b} name="tipo" onChange={(e) => setB3_b(e.target.value)}>
                        <option value="">Selecionar</option>
                        <option value="Pai">Pai</option>
                        <option value="Mãe">Mãe</option>
                        <option value="Ambos">Ambos</option>
                    </select>
                ) : null}
            </div>
            <div className="LabelInput">
                <label><strong>4. Seus pais se divorciaram?</strong></label>
                <select value={b4} name="tipo" onChange={(e) => setB4(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>5. Você já presenciou violência física entre as pessoas próximas a você (entre seus pais ou entre seus pais e irmãos)?</strong></label>
                <select value={b5} name="tipo" onChange={(e) => setB5(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>6. Você já foi violentado (a) fisicamente por alguém próximo a você?</strong></label>
                <select value={b6} name="tipo" onChange={(e) => setB6(e.target.value)}>
                    <option value="">Selecionar</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não sabe">Não sabe</option>
                    <option value="Sem resposta">Sem resposta</option>
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

export default EditarInfancias;