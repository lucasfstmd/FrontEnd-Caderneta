import React, {useEffect, useState} from "react"
import "./EditarIvcf.css"
import api from "../../../../../../../service/api";
import {
    Checkbox,
    DialogContent,
    DialogContentText,
    FormControl,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function EditarIvcf(props) {
    const [p1, setP1] = useState(null);
    const [p2, setP2] = useState(null);
    const [p3, setP3] = useState(null);
    const [p4, setP4] = useState(null);
    const [p5, setP5] = useState(null);
    const [p6, setP6] = useState(null);
    const [p7, setP7] = useState(null);
    const [p8, setP8] = useState(null);
    const [p9, setP9] = useState(null);
    const [p10, setP10] = useState(null);
    const [p11, setP11] = useState(null);
    const [p12, setP12] = useState(null);
    const [p13, setP13] = useState(null);
    const [p14_1, setP14_1] = useState(0);
    const [p14_2, setP14_2] = useState(0);
    const [p14_3, setP14_3] = useState(0);
    const [p14_4, setP14_4] = useState(0);
    const [p15, setP15] = useState(null);
    const [p16, setP16] = useState(null);
    const [p17, setP17] = useState(null);
    const [p18, setP18] = useState(null);
    const [p19, setP19] = useState(null);
    const [p20_1, setP20_1] = useState(0);
    const [p20_2, setP20_2] = useState(0);
    const [p20_3, setP20_3] = useState(0);
    const [p21, setP21] = useState(0);
    const [p22, setP22] = useState(0);

    async function carregarPcl() {
        try {
            const response = await api.get(`v1/ivcfs/${props.ivcfId}`);
            setP1(response.data.p1);
            setP2(response.data.p2);
            setP3(response.data.p3);
            setP4(response.data.p4);
            setP5(response.data.p5);
            setP6(response.data.p6);
            setP7(response.data.p7);
            setP8(response.data.p8);
            setP9(response.data.p9);
            setP10(response.data.p10);
            setP11(response.data.p11);
            setP12(response.data.p12);
            setP13(response.data.p13);
            setP14_1(response.data.p14_1);
            setP14_2(response.data.p14_2);
            setP14_3(response.data.p14_3);
            setP14_4(response.data.p14_4);
            setP15(response.data.p15);
            setP16(response.data.p16);
            setP17(response.data.p17);
            setP18(response.data.p18);
            setP19(response.data.p19);
            setP20_1(response.data.p20_1);
            setP20_2(response.data.p20_2);
            setP20_3(response.data.p20_3);
            setP21(response.data.p21);
            setP22(response.data.p22);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarPcl();
    }, []);

    const handleCheckbox14 = () => {
        if (p14_1 === 1 || p14_2 === 1 || p14_3 === 1 || p14_4 === 1) {
            return 1;
        } else {
            return 0;
        }
    };

    const handleCheckbox20 = () => {
        if (p20_1 === 1 || p20_2 === 1 || p20_3 === 1) {
            return 1;
        } else {
            return 0;
        }
    };

    const Ivcf = {
        paciente_id: props.pacienteId,
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
        p12,
        p13,
        p14: handleCheckbox14(),
        p14_1,
        p14_2,
        p14_3,
        p14_4,
        p15,
        p16,
        p17,
        p18,
        p19,
        p20: handleCheckbox20(),
        p20_1,
        p20_2,
        p20_3,
        p21,
        p22,
    };

    const handleFecharClick = (ivcfId) => {
        props.onClose(ivcfId);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/ivcfs/${props.ivcfId}`, Ivcf);
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

    const handleSalvar = (ivcfId) => {
        setOpen(false);
        props.onClose(ivcfId);
    }

    return (
        <div className="EditarIvcf">
            <div className="Legenda">
                Responda às perguntas abaixo com a ajuda de familiares ou acompanhantes. Marque a opção mais apropriada para a sua condição de saúde atual. Todas as respostas devem ser confirmadas por alguém que conviva com você.
                Nos idosos incapazes de responder, utilizar as respostas do cuidador.
            </div>
            <div className="Legenda">
                Nos idosos incapazes de responder, utilizar as respostas do cuidador.
            </div>
            <div className="LabelInput">
                <table style={{border: "1px solid gray", marginLeft: "3vh", marginRight: "3vh", width: "100%"}}>
                    <tbody>
                    <tr>
                        <td style={{border: "1px solid gray", width: "24.5vh"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                Idade:
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <label style={{padding: "1vh"}}><strong>1. Qual é a sua idade?</strong></label>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <select value={p1} onChange={(e) => setP1(parseInt(e.target.value))} style={{border: "1px solid gray", padding: "1vh"}}>
                                <option value={null}>Selecionar</option>
                                <option value={1}>De 60 a 74 anos</option>
                                <option value={2}>De 75 a 84 anos</option>
                                <option value={3}>≥ 85 anos</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid gray"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                Auto-Percepção de Saúde:
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <label style={{padding: "1vh", width: "20vh"}}><strong>2. Em geral, comparando com outras pessoas de sua idade, você diria que sua saúde é:</strong></label>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <select value={p2} onChange={(e) => setP2(parseInt(e.target.value))} style={{border: "1px solid gray", padding: "1vh"}}>
                                <option value={null}>Selecionar</option>
                                <option value={0}>Excelente, muito boa ou boa</option>
                                <option value={1}>Regular ou ruim</option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="LabelInput">
                <table style={{border: "1px solid gray", marginLeft: "3vh", marginRight: "3vh", width: "100%"}}>
                    <tbody>
                    <tr>
                        <td style={{border: "1px solid gray", width: "24.5vh"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                AVD Instrumental:
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <label style={{padding: "1vh", width: "20vh"}}><strong>3. Por causa de sua saúde ou condição física, você deixou de fazer compras?</strong></label>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value={1}
                                            checked={p3 === 1}
                                            onChange={(e) => setP3(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Sim" />
                                        <FormControlLabel
                                            value={0}
                                            checked={p3 === 0}
                                            onChange={(e) => setP3(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Não ou não faz compras por outros motivos que não a saúde"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid gray"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                Respostas positiva valem 4 pontos cada. Todavia, a pontuação máxima do item é de 4 pontos, mesmo que o idoso tenha respondido sim para todas as questões 3, 4 e 5:
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <div className="LabelForm" style={{borderBottom: "1px solid gray", marginBottom: "0.2vh"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>4. Por causa de sua saúde ou condição física, você deixou de controlar seu dinheiro, gastos ou pagar as contas de sua casa?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p4 === 1}
                                                onChange={(e) => setP4(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p4 === 0}
                                                onChange={(e) => setP4(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não ou não faz compras por outros motivos que não a saúde"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="LabelForm" style={{borderTop: "1px solid gray"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>5. Por causa de sua saúde ou condição física, você deixou de realizar pequenos trabalhos domésticos, como lavar louça, arrumar a casa ou fazer limpeza leve?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p5 === 1}
                                                onChange={(e) => setP5(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p5 === 0}
                                                onChange={(e) => setP5(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não ou não faz compras por outros motivos que não a saúde"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid gray", width: "24.5vh"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                AVD Básica
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <label style={{padding: "1vh"}}><strong>6. Por causa de sua saúde ou condição física, você deixou de tomar banho sozinho?</strong></label>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value={1}
                                            checked={p6 === 1}
                                            onChange={(e) => setP6(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Sim" />
                                        <FormControlLabel
                                            value={0}
                                            checked={p6 === 0}
                                            onChange={(e) => setP6(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Não"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="LabelInput">
                <table style={{border: "1px solid gray", marginLeft: "3vh", marginRight: "3vh", width: "100%"}}>
                    <tbody>
                    <tr>
                        <td style={{border: "1px solid gray", width: "24.5vh"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                Cognição
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <div className="LabelForm" style={{borderBottom: "1px solid gray", marginBottom: "0.2vh"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>7. Algum familiar ou amigo falou que você está ficando esquecido?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p7 === 1}
                                                onChange={(e) => setP7(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p7 === 0}
                                                onChange={(e) => setP7(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="LabelForm" style={{borderTop: "1px solid gray", marginBottom: "0.2vh", borderBottom: "1px solid gray"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>8. Este esquecimento está piorando nos últimos meses?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p8 === 1}
                                                onChange={(e) => setP8(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p8 === 0}
                                                onChange={(e) => setP8(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="LabelForm" style={{borderTop: "1px solid gray"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>9. Este esquecimento está impedindo a realização de alguma atividade do cotidiano?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p9 === 1}
                                                onChange={(e) => setP9(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p9 === 0}
                                                onChange={(e) => setP9(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="LabelInput">
                <table style={{border: "1px solid gray", marginLeft: "3vh", marginRight: "3vh", width: "100%"}}>
                    <tbody>
                    <tr>
                        <td style={{border: "1px solid gray", width: "24.5vh"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                Humor
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <div className="LabelForm" style={{borderBottom: "1px solid gray", marginBottom: "0.2vh"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>10. No último mês, você ficou com desânimo, tristeza ou desesperança?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p10 === 1}
                                                onChange={(e) => setP10(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p10 === 0}
                                                onChange={(e) => setP10(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="LabelForm" style={{borderTop: "1px solid gray"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>11. No último mês, você perdeu o interesse ou prazer em atividades anteriormente prazerosas?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p11 === 1}
                                                onChange={(e) => setP11(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p11 === 0}
                                                onChange={(e) => setP11(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="LabelInput">
                <table style={{border: "1px solid gray", marginLeft: "3vh", marginRight: "3vh", width: "100%"}}>
                    <tbody>
                    <tr>
                        <td style={{border: "1px solid gray", width: "24.5vh"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                Alcance, preensão e pinça
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <div className="LabelForm" style={{borderBottom: "1px solid gray", marginBottom: "0.2vh"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>12. Você é incapaz de elevar os braços acima do nível do ombro?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p12 === 1}
                                                onChange={(e) => setP12(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p12 === 0}
                                                onChange={(e) => setP12(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="LabelForm" style={{borderTop: "1px solid gray"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>13. Você é incapaz de manusear ou segurar pequenos objetos?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p13 === 1}
                                                onChange={(e) => setP13(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p13 === 0}
                                                onChange={(e) => setP13(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="LabelInput">
                <table style={{ border: "1px solid gray", marginLeft: "3vh", marginRight: "3vh", width: "100%" }}>
                    <tbody>
                    <tr>
                        <td style={{ border: "1px solid gray", width: "24.5vh" }}>
                            <div className="Pergunta" style={{ marginLeft: "3vh", padding: "1vh", width: "24.5vh" }}>
                                Capacidade aeróbica e/ou muscular
                            </div>
                        </td>
                        <td style={{ border: "1px solid gray" }}>
                            <div className="LabelForm">
                                <label style={{ padding: "1vh", width: "20vh" }}>
                                    <strong>14. Você tem alguma das quatro condições abaixo relacionadas?</strong>
                                </label>
                                <div className="InputCheck" style={{ marginLeft: "5vh" }}>
                                    <FormGroup>
                                        <FormControlLabel
                                            value={p14_1}
                                            checked={p14_1 === 1}
                                            onChange={(e) => setP14_1(e.target.checked ? 1 : 0)}
                                            control={<Checkbox />}
                                            label="Perda de peso não intencional de 4,5 kg ou 5% do peso corporal no último ano ou 6 kg nos últimos 6 meses ou 3 kg no último mês."
                                        />
                                        <FormControlLabel
                                            value={p14_2}
                                            checked={p14_2 === 1}
                                            onChange={(e) => setP14_2(e.target.checked ? 1 : 0)}
                                            control={<Checkbox />}
                                            label="Índice de Massa Corporal (IMC) menor que 22 kg/m2."
                                        />
                                        <FormControlLabel
                                            value={p14_3}
                                            checked={p14_3 === 1}
                                            onChange={(e) => setP14_3(e.target.checked ? 1 : 0)}
                                            control={<Checkbox />}
                                            label="Circunferência da panturrilha a < 31 cm."
                                        />
                                        <FormControlLabel
                                            value={p14_4}
                                            checked={p14_4 === 1}
                                            onChange={(e) => setP14_4(e.target.checked ? 1 : 0)}
                                            control={<Checkbox />}
                                            label="Tempo gasto no teste de velocidade da marcha (4m) > 5 segundos."
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="LabelInput">
                <table style={{border: "1px solid gray", marginLeft: "3vh", marginRight: "3vh", width: "100%"}}>
                    <tbody>
                    <tr>
                        <td style={{border: "1px solid gray", width: "24.5vh"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                Marcha
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <div className="LabelForm" style={{borderBottom: "1px solid gray", marginBottom: "0.2vh"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>15. Você tem dificuldade para caminhar capaz de impedir a realização de alguma atividade do cotidiano?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p15 === 1}
                                                onChange={(e) => setP15(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p15 === 0}
                                                onChange={(e) => setP15(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="LabelForm" style={{borderTop: "1px solid gray"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>16. Você teve duas ou mais quedas no último ano?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p16 === 1}
                                                onChange={(e) => setP16(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p16 === 0}
                                                onChange={(e) => setP16(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="LabelInput">
                <table style={{border: "1px solid gray", marginLeft: "3vh", marginRight: "3vh", width: "100%"}}>
                    <tbody>
                    <tr>
                        <td style={{border: "1px solid gray", width: "24.5vh"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                Continência esfincteriana
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <div className="LabelForm" style={{borderBottom: "1px solid gray", marginBottom: "0.2vh"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>17. Você perde urina ou fezes, sem querer, em algum momento?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p17 === 1}
                                                onChange={(e) => setP17(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p17 === 0}
                                                onChange={(e) => setP17(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="LabelInput">
                <table style={{border: "1px solid gray", marginLeft: "3vh", marginRight: "3vh", width: "100%"}}>
                    <tbody>
                    <tr>
                        <td style={{border: "1px solid gray", width: "24.5vh"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                Visão
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <div className="LabelForm" style={{borderBottom: "1px solid gray", marginBottom: "0.2vh"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>18. Você tem problemas de visão capazes de impedir a realização de alguma atividade do cotidiano? É permitido o uso de óculos ou lentes de contato.</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p18 === 1}
                                                onChange={(e) => setP18(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p18 === 0}
                                                onChange={(e) => setP18(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="LabelInput">
                <table style={{border: "1px solid gray", marginLeft: "3vh", marginRight: "3vh", width: "100%"}}>
                    <tbody>
                    <tr>
                        <td style={{border: "1px solid gray", width: "24.5vh"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                Audição
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <div className="LabelForm" style={{borderBottom: "1px solid gray", marginBottom: "0.2vh"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>19. Você tem problemas de audição capazes de impedir a realização de alguma atividade do cotidiano? É permitido o uso de aparelhos de audição.</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                checked={p19 === 1}
                                                onChange={(e) => setP19(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Sim" />
                                            <FormControlLabel
                                                value={0}
                                                checked={p19 === 0}
                                                onChange={(e) => setP19(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="LabelInput">
                <table style={{border: "1px solid gray", marginLeft: "3vh", marginRight: "3vh", width: "100%"}}>
                    <tbody>
                    <tr>
                        <td style={{border: "1px solid gray", width: "24.5vh"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                Polipatologia,
                                Polifarmácia ou
                                Internação recente (&lt; 6 meses)
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <div className="LabelForm">
                                <label style={{padding: "1vh", width: "20vh"}}><strong>20. Você tem alguma das três condições abaixo relacionadas?</strong></label>
                                <div className="InputCheck" style={{marginLeft: "5vh"}}>
                                    <FormGroup>
                                        <FormControlLabel
                                            value={p20_1}
                                            checked={p20_1 === 1}
                                            onChange={(e) => setP20_1(e.target.checked ? 1 : 0)}
                                            control={<Checkbox />}
                                            label=" Cinco ou mais doenças crônicas."
                                        />
                                        <FormControlLabel
                                            value={p20_2}
                                            checked={p20_2 === 1}
                                            onChange={(e) => setP20_2(e.target.checked ? 1 : 0)}
                                            control={<Checkbox />}
                                            label=" Uso regular de cinco ou mais medicamentos diferentes, todo dia."
                                        />
                                        <FormControlLabel
                                            value={p20_3}
                                            checked={p20_3 === 1}
                                            onChange={(e) => setP20_3(e.target.checked ? 1 : 0)}
                                            control={<Checkbox />}
                                            label=" Internação recente, nos últimos 6 meses."
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
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

export default EditarIvcf;