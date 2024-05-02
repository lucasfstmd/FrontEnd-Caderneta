import React, {useState} from "react";
import "./AdicionarPcl.css"
import api from "../../../../../../../service/api";
import {DialogContent, DialogContentText, FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../../ContentFicha'

function AdicionarPcl(props) {
    const params = useParams();
    const { id } = params
    const query = useQuery();
    const navigate = useNavigate();

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
    const [p14, setP14] = useState(null);
    const [p15, setP15] = useState(null);
    const [p16, setP16] = useState(null);
    const [p17, setP17] = useState(null);
    const [p18, setP18] = useState(null);
    const [p19, setP19] = useState(null);
    const [p20, setP20] = useState(null);
    const [p21, setP21] = useState(null);
    const [p22, setP22] = useState(null);
    const [p23, setP23] = useState(null);
    const [p24, setP24] = useState(null);
    const [p25, setP25] = useState(null);
    const [p26, setP26] = useState(null);
    const [p27, setP27] = useState(null);
    const [p28, setP28] = useState(null);
    const [p29, setP29] = useState(null);
    const [p30, setP30] = useState(null);
    const [p31, setP31] = useState(null);
    const [p32, setP32] = useState(null);
    const [p33] = useState(0);


    const Pcl = {
        paciente_id: id,
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
        p14,
        p15,
        p16,
        p17,
        p18,
        p19,
        p20,
        p21,
        p22,
        p23,
        p24,
        p25,
        p26,
        p27,
        p28,
        p29,
        p30,
        p31,
        p32,
        p33,
    };

    async function handleSalvarApi() {
        try {
            await api.post("v1/pcls", Pcl);
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
        <div className="AdicionarPcl">
            <div className="Legenda">
                As vezes, as pessoas se queixam de problemas de memória, o que fazer para ter uma boa memória. Nós vamos fazer um teste e vamos compor uma série de questões que vai nos ajudar a detectar os problemas de memória.
            </div>
            <div className="TituloPcl">
                Você deve responder essas perguntas sozinhas sem ajuda de outra pessoa.
            </div>
            <div className="LabelInput">
                <table>
                    <tbody>
                        <tr key={id}>
                            <td className="TabelaAdicionarPcl">
                                <div className="Pergunta">
                                    Qual é a data de hoje?
                                </div>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value={1} onChange={(e) => setP1(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP1(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Incorreto"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </td>
                            <td className="TabelaAdicionarPcl">
                                <div className="Pergunta">
                                    Que horas são? (+ / - 2 horas)
                                </div>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value={1} onChange={(e) => setP2(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP2(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Incorreto"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </td>
                            <td className="TabelaAdicionarPcl">
                                <div className="Pergunta">
                                    Que dia da semana estamos?
                                </div>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value={1} onChange={(e) => setP3(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP3(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Incorreto"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </td>
                            <td className="TabelaAdicionarPcl">
                                <div className="Pergunta">
                                    Qual é o seu endereço completo?
                                </div>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value={1} onChange={(e) => setP4(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP4(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Incorreto"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </td>
                            <td className="TabelaAdicionarPcl">
                                <div className="Pergunta">
                                    Em que bairro nos estamos?
                                </div>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value={1} onChange={(e) => setP5(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP5(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Incorreto"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </td>
                            <td className="TabelaAdicionarPcl">
                                <div className="Pergunta">
                                    Que idade você tem?
                                </div>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value={1} onChange={(e) => setP6(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP6(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Incorreto"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </td>
                            <td className="TabelaAdicionarPcl">
                                <div className="Pergunta">
                                    Qual é sua data de nascimento?
                                </div>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value={1} onChange={(e) => setP7(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP7(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Incorreto"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </td>
                            <td className="TabelaAdicionarPcl" style={{borderBottom: "1px solid gray"}}>
                                <div className="Pergunta">
                                    Qual é a idade e o nome do(a) filho (a) mais novo da sua mãe?
                                </div>
                                <div className="InputRadio" style={{height: "10vh"}}>
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value={1} onChange={(e) => setP8(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP8(parseInt(e.target.value))}
                                                control={<Radio />}
                                                label="Incorreto"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="Legenda">
                “Nesse momento vou mostrar algumas imagens e vou lhe perguntar o que elas representam para você.”
            </div>
            <div className="TituloPcl">
                Mostre as imagens ao participante e marque se a resposta é correta ou não.
            </div>
            <div className="LabelInput">
                <table>
                    <tbody>
                    <tr key={id}>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Vaca
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP9(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP9(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Barco
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP10(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP10(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Colher
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP11(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP11(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Avião
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP12(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP12(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Garrafa
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP13(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP13(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl" style={{borderBottom: "1px solid gray"}}>
                            <div className="Pergunta">
                                Caminhão
                            </div>
                            <div className="InputRadio" style={{height: "10vh"}}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP14(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP14(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="TituloPcl">
                Agora vou repetir todos os objetos para você olhar. “Você pode me dizer os objetos que você viu, por favor?”
            </div>
            <div className="LabelInput">
                <table>
                    <tbody>
                    <tr key={id}>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Vaca
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP15(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP15(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Barco
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP16(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP16(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Colher
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP17(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP17(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Avião
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP18(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP18(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Garrafa
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP19(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP19(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl" style={{borderBottom: "1px solid gray"}}>
                            <div className="Pergunta">
                                Caminhão
                            </div>
                            <div className="InputRadio" style={{height: "10vh"}}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP20(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP20(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="TituloPcl">
                “Vou lhe contar uma história. Você vai ficar atenta, porque só vou contar uma vez. Quando eu terminar depois de alguns segundos vou lhe perguntar e quero que você repita o que aprendeu. A história é (ler lentamente):”
            </div>
            <div className="Legenda">
                “Três crianças estavam sozinhas em casa quando começou a incendiar. Um bravo bombeiro chegou a tempo entrou pela janela, chegou dentro de casa e levou as crianças para um lugar seguro. Salvo alguns cortes e arranhões as crianças ficaram sãs e salvas.”
            </div>
            <div className="Legenda">
                Depois de dois minutos peça ao participante para dizer o que ele entendeu da história.
            </div>
            <div className="LabelInput">
                <table>
                    <tbody>
                    <tr key={id}>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Três crianças
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP21(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP21(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Incendio
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP22(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP22(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Bombeiro que entrou
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP23(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP23(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Crianças foram socorridas
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP24(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP24(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Cortes e arranhões
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP25(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP25(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl" style={{borderBottom: "1px solid gray"}}>
                            <div className="Pergunta">
                                Sans e salvas
                            </div>
                            <div className="InputRadio" style={{height: "10vh"}}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP26(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP26(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="Legenda">
                5 minutos depois de mostrar as imagens (durante esse tempo, você pode medir a pressão arterial do participante).
            </div>
            <div className="TituloPcl">
                “Você pode repetir os objetos que você viu a poucos minutos?”
            </div>
            <div className="LabelInput">
                <table>
                    <tbody>
                    <tr key={id}>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Vaca
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP27(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP27(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Barco
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP28(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP28(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Colher
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP29(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP29(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Avião
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP30(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP30(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl">
                            <div className="Pergunta">
                                Garrafa
                            </div>
                            <div className="InputRadio">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP31(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP31(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </td>
                        <td className="TabelaAdicionarPcl" style={{borderBottom: "1px solid gray"}}>
                            <div className="Pergunta">
                                Caminhão
                            </div>
                            <div className="InputRadio" style={{height: "10vh"}}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={1} onChange={(e) => setP32(parseInt(e.target.value))} control={<Radio />} label="Correto" />
                                        <FormControlLabel
                                            value={0}
                                            onChange={(e) => setP32(parseInt(e.target.value))}
                                            control={<Radio />}
                                            label="Incorreto"
                                        />
                                    </RadioGroup>
                                </FormControl>
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

export default AdicionarPcl;
