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

function AdicionarAnsiedade() {
    const params = useParams();
    const { id } = params
    const query = useQuery();
    const navigate = useNavigate();

    const [ansiedade, setAnsiedade] = useState({
        paciente_id: parseInt(id),
        p1: null,
        p2: null,
        p3: null,
        p4: null,
        p5: null,
        p6: null,
        p7: null,
        p8: null,
        p9: null,
        p10: null,
        p12: null,
        p13: null,
        p14: null,
        p15: null,
        p16: null,
        p17: null,
        p18: null,
        p19: null,
        p20: null,
    });

    async function handleSalvarApi() {
        try {
            await api.post("v1/ansiedade", {
                ...ansiedade,
                score: (ansiedade.p1 +
                    ansiedade.p2 +
                    ansiedade.p3 +
                    ansiedade.p4 +
                    ansiedade.p5 +
                    ansiedade.p6 +
                    ansiedade.p7 +
                    ansiedade.p8 +
                    ansiedade.p9 +
                    ansiedade.p10 +
                    ansiedade.p11 +
                    ansiedade.p12 +
                    ansiedade.p13 +
                    ansiedade.p14 +
                    ansiedade.p15 +
                    ansiedade.p16 +
                    ansiedade.p17 +
                    ansiedade.p18 +
                    ansiedade.p19 +
                    ansiedade.p20)
            });
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
        <div style={{
            padding: '10px'
        }}
        className="AdicionarIvcf"
        >
            <div className="LabelForm" style={{borderBottom: "1px solid gray", marginBottom: "0.2vh"}}>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}>
                        <strong>
                            1. Ando preocupado (a) a maior parte do tempo.
                        </strong>
                    </label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        2. Tenho dificuldade em tomar decisões.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        3. Sinto-me inquieto (a) muitas vezes.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        4. Tenho dificuldade em relaxar.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        5. Muitas vezes não consigo apreciar as coisas por causa das minhas preocupações.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        6. Coisas sem importância me preocupam bastante.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        7. Sinto muitas vezes um aperto no estômago.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        8. Vejo-me como uma pessoa preocupada.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        9. Não consigo evitar me preocupar, mesmo com coisas menores.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        10. Me sinto muitas vezes nervoso (a).
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        11. Muitas vezes os meus próprios pensamentos me deixam ansioso (a).
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p11: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p11: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        12. Fico com o estômago às voltas devido à minha preocupação constante.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p12: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p12: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        13. Vejo-me como uma pessoa nervosa.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p13: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p13: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        14. Estou sempre à espera que aconteça o pior.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p14: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p14: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        15. Muitas vezes me sinto agitado (a) interiormente.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p15: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p15: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        16. Acho que as minhas preocupações interferem na minha vida.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p16: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p16: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        17. Muitas vezes sou dominado (a) pelas minhas preocupações.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p17: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p17: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        18. Por vezes sinto um nó grande no estômago.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p18: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p18: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        19. Deixo de me envolver nas coisas por me preocupar demasiado.
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p19: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p19: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}><strong>
                        20. Muitas vezes me sinto aflito (a)
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p20: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Concordo"/>
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setAnsiedade({
                                        ...ansiedade,
                                        p20: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="Discordo"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>
            <div className="BotaoForm" style={{
                marginTop: '1vw'
            }}>
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

export default AdicionarAnsiedade;
