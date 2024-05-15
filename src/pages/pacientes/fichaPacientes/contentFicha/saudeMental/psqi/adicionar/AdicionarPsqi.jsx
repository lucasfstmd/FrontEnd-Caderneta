import React, { useState } from 'react'
import {
    DialogContent,
    DialogContentText,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../../ContentFicha'
import api from "../../../../../../../service/api";

function AdicionarPsqi() {
    const params = useParams();
    const { id } = params
    const query = useQuery();
    const navigate = useNavigate();

    const [psqi, setPsqi] = useState({
        paciente_id: parseInt(id),
        p1: '',
        p2: '',
        p3: '',
        p4: '',
        p5_a: null,
        p5_b: null,
        p5_c: null,
        p5_d: null,
        p5_e: null,
        p5_f: null,
        p5_g: null,
        p5_h: null,
        p5_i: '',
        p5_j: null,
        p6: null,
        p7: null,
        p8: null,
        p9: null,
        p10: null,
        p10_a: null,
        p10_b: null,
        p10_c: null,
        p10_d: null,
        p10_e_1: '',
        p10_e_2: null,
    })

    async function handleSalvarApi() {
        try {
            await api.post("v1/psqi", psqi);
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
        <div className="AdicionarIvcf" style={{
            padding: '5vh'
        }}>
            <label style={{padding: "1vh", width: "20vh"}}>
                <strong>
                    As seguintes perguntas são relativas aos seus hábitos usuais de sono durante os últimos dias somente. Suas respostas devem indicar a lembrança mais exata da maioria dos dias e noites nos últimos dias. Por favor, responda a todas as perguntas.                </strong>
                <hr/>
            </label>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        1. Durante os últimos dias, que horas geralmente você foi para a cama à noite?
                    </strong>
                </label>
                <div className="LabelInput">
                    <label><strong>Hora usual de deitar-se:</strong></label>
                    <input value={psqi.p1} onChange={(e) => setPsqi({
                        ...psqi,
                        p1: e.target.value })} type="text"/>
                </div>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        2. Durante o último mês, quanto tempo (em minutos) você geralmente levou para adormecer à noite?
                    </strong>
                </label>
                <div className="LabelInput">
                    <label><strong>Número de minutos:</strong></label>
                    <input value={psqi.p2} onChange={(e) => setPsqi({
                        ...psqi,
                        p2: e.target.value })} type="text"/>
                </div>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        3. Durante os últimos dias, quando você geralmente se levantou de manhã?
                    </strong>
                </label>
                <div className="LabelInput">
                    <label><strong>Hora usual de levantar-se:</strong></label>
                    <input value={psqi.p3} onChange={(e) => setPsqi({
                        ...psqi,
                        p3: e.target.value })} type="text"/>
                </div>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        4. Durante os últimos dias, quantas horas de sono você teve por noite? (Este pode ser diferente do número de horas que você ficou na cama).
                    </strong>
                </label>
                <div className="LabelInput">
                    <label><strong>Horas de sono por noite:</strong></label>
                    <input value={psqi.p4} onChange={(e) => setPsqi({
                        ...psqi,
                        p4: e.target.value })} type="text"/>
                </div>
            </div>
            <label style={{padding: "1vh", width: "20vh"}}>
                <strong>
                    Para cada uma das questões restantes, marque a melhor (uma) resposta. Por favor, responda a todas as questões.                <hr/>
                </strong>
            </label>
            <label style={{padding: "1vh", width: "20vh"}}>
                <strong>
                    5. Durante os últimos dias, com que frequência você teve dificuldade de dormir porque você...
                </strong>
            </label>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        a) Não conseguiu adormecer em até 30 minutos
                    </strong>
                </label>
                <div className="InputRadio">
                    <FormControl>
                        <RadioGroup
                            column
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value={0}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_a: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Nenhuma no último mês"/>
                            <FormControlLabel
                                value={1}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_a: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Menos de 1 vez/ semana"
                            />
                            <FormControlLabel
                                value={2}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_a: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="1 ou 2 vezes/ semana"
                            />
                            <FormControlLabel
                                value={3}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_a: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="3 ou mais vezes/ semana"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        b) Acordou no meio da noite ou de manhã cedo
                    </strong>
                </label>
                <div className="InputRadio">
                    <FormControl>
                        <RadioGroup
                            column
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value={0}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_b: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Nenhuma no último mês"/>
                            <FormControlLabel
                                value={1}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_b: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Menos de 1 vez/ semana"
                            />
                            <FormControlLabel
                                value={2}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_b: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="1 ou 2 vezes/ semana"
                            />
                            <FormControlLabel
                                value={3}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_b: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="3 ou mais vezes/ semana"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        c) Precisou levantar-se para ir ao banheiro
                    </strong>
                </label>
                <div className="InputRadio">
                    <FormControl>
                        <RadioGroup
                            column
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value={0}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_c: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Nenhuma no último mês"/>
                            <FormControlLabel
                                value={1}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_c: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Menos de 1 vez/ semana"
                            />
                            <FormControlLabel
                                value={2}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_c: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="1 ou 2 vezes/ semana"
                            />
                            <FormControlLabel
                                value={3}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_c: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="3 ou mais vezes/ semana"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        d) Não conseguiu respirar de forma satisfatória
                    </strong>
                </label>
                <div className="InputRadio">
                    <FormControl>
                        <RadioGroup
                            column
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value={0}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_d: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Nenhuma no último mês"/>
                            <FormControlLabel
                                value={1}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_d: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Menos de 1 vez/ semana"
                            />
                            <FormControlLabel
                                value={2}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_d: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="1 ou 2 vezes/ semana"
                            />
                            <FormControlLabel
                                value={3}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_d: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="3 ou mais vezes/ semana"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        e) Tossiu ou roncou forte
                    </strong>
                </label>
                <div className="InputRadio">
                    <FormControl>
                        <RadioGroup
                            column
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value={0}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_e: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Nenhuma no último mês"/>
                            <FormControlLabel
                                value={1}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_e: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Menos de 1 vez/ semana"
                            />
                            <FormControlLabel
                                value={2}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_e: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="1 ou 2 vezes/ semana"
                            />
                            <FormControlLabel
                                value={3}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_e: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="3 ou mais vezes/ semana"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        f) Sentiu muito calor
                    </strong>
                </label>
                <div className="InputRadio">
                    <FormControl>
                        <RadioGroup
                            column
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value={0}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_f: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Nenhuma no último mês"/>
                            <FormControlLabel
                                value={1}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_f: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Menos de 1 vez/ semana"
                            />
                            <FormControlLabel
                                value={2}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_f: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="1 ou 2 vezes/ semana"
                            />
                            <FormControlLabel
                                value={3}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_f: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="3 ou mais vezes/ semana"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        g) Teve sonhos ruins
                    </strong>
                </label>
                <div className="InputRadio">
                    <FormControl>
                        <RadioGroup
                            column
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value={0}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_g: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Nenhuma no último mês"/>
                            <FormControlLabel
                                value={1}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_g: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Menos de 1 vez/ semana"
                            />
                            <FormControlLabel
                                value={2}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_g: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="1 ou 2 vezes/ semana"
                            />
                            <FormControlLabel
                                value={3}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_g: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="3 ou mais vezes/ semana"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        h) Teve dor
                    </strong>
                </label>
                <div className="InputRadio">
                    <FormControl>
                        <RadioGroup
                            column
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value={0}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_h: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Nenhuma no último mês"/>
                            <FormControlLabel
                                value={1}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_h: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Menos de 1 vez/ semana"
                            />
                            <FormControlLabel
                                value={2}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_h: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="1 ou 2 vezes/ semana"
                            />
                            <FormControlLabel
                                value={3}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_h: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="3 ou mais vezes/ semana"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="LabelInput">
                <label><strong>i) Outra(s) razão(ões), por favor descreva</strong></label>
                <input value={psqi.p5_i} onChange={(e) => setPsqi({
                    ...psqi,
                    p5_i: e.target.value })} type="text"/>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        j) Com que frequência, durante os últimos dias, você teve dificuldade para dormir devido a essa razão?
                    </strong>
                </label>
                <div className="InputRadio">
                    <FormControl>
                        <RadioGroup
                            column
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value={0}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_j: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Nenhuma no último mês"/>
                            <FormControlLabel
                                value={1}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_j: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Menos de 1 vez/ semana"
                            />
                            <FormControlLabel
                                value={2}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_j: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="1 ou 2 vezes/ semana"
                            />
                            <FormControlLabel
                                value={3}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p5_j: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="3 ou mais vezes/ semana"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        6. Durante os últimos dias, como você classificaria a qualidade do seu sono de uma maneira geral?
                    </strong>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                column
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Muito boa"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Boa"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Ruim"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Muito ruim"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </label>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        7. Durante os últimos dias, com que frequência você tomou medicamento (prescrito ou “por conta própria”) para lhe ajudar a dormir?                    </strong>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                column
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Nenhuma no último mês"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Menos de 1 vez/ semana"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="1 ou 2 vezes/ semana"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="3 ou mais vezes/ semana"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </label>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        8. Nos últimos dias, com que frequência você teve dificuldade de ficar acordado enquanto dirigia, comia ou participava de uma atividade social (festa, reunião de amigos, trabalho, estudo)?
                    </strong>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                column
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Nenhuma no último mês"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Menos de 1 vez/ semana"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="1 ou 2 vezes/ semana"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="3 ou mais vezes/ semana"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </label>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        9. Durante os últimos dias, quão problemático foi para você manter o entusiasmo (ânimo) para fazer as coisas (suas atividades habituais)?
                    </strong>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                column
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Nenhuma dificuldade"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Um problema muito leve"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Um problema razoável"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Um problema muito grande"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </label>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        10. Você tem um(a) parceiro [esposo(a)] ou colega de quarto?
                    </strong>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                column
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Não"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Parceiro ou colega, mas em outro quarto"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Parceiro no mesmo quarto, mas não na mesma cama"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Parceiro na mesma cama"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </label>
            </div>
            <label style={{padding: "1vh", width: "20vh"}}>
                <strong>
                    Se você tem um parceiro ou colega de quarto, pergunte a ele/ela com que frequência nos últimos dias você teve ...
                </strong>
                <hr/>
            </label>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        <br/>
                        a) Ronco forte
                    </strong>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                column
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_a: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Nenhuma no último mês"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_a: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Menos de 1 vez/ semana"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_a: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="1 ou 2 vezes/ semana"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_a: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="3 ou mais vezes/ semana"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </label>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        b) Longas paradas na respiração enquanto dormia
                    </strong>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                column
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_b: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Nenhuma no último mês"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_b: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Menos de 1 vez/ semana"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_b: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="1 ou 2 vezes/ semana"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_b: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="3 ou mais vezes/ semana"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </label>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        c) Contrações ou puxões nas pernas enquanto você dormia
                    </strong>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                column
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_c: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Nenhuma no último mês"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_c: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Menos de 1 vez/ semana"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_c: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="1 ou 2 vezes/ semana"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_c: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="3 ou mais vezes/ semana"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </label>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        d) Episódios de desorientação ou confusão durante o sono
                    </strong>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                column
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_d: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Nenhuma no último mês"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_d: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="Menos de 1 vez/ semana"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_d: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="1 ou 2 vezes/ semana"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setPsqi({
                                        ...psqi,
                                        p10_d: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    label="3 ou mais vezes/ semana"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </label>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray'}}>
                <div className="LabelInput">
                    <label><strong>e) Outras alterações (inquietações) enquanto você dorme; por favor, descreva</strong></label>
                    <input value={psqi.p10_e_1} onChange={(e) => setPsqi({
                        ...psqi,
                        p10_e_1: e.target.value })} type="text"/>
                </div>
                <div className="InputRadio">
                    <FormControl>
                        <RadioGroup
                            column
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel
                                value={0}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p10_e_2: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Nenhuma no último mês"/>
                            <FormControlLabel
                                value={1}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p10_e_2: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Menos de 1 vez/ semana"
                            />
                            <FormControlLabel
                                value={2}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p10_e_2: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="1 ou 2 vezes/ semana"
                            />
                            <FormControlLabel
                                value={3}
                                onChange={(e) => setPsqi({
                                    ...psqi,
                                    p10_e_2: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="3 ou mais vezes/ semana"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="BotaoForm"
                style={{
                    marginTop: '1vh'
                }}
            >
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

export default AdicionarPsqi;
