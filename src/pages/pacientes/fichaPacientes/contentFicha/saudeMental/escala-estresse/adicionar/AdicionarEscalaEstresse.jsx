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

function AdicionarEscalaEstresse() {
    const params = useParams();
    const { id } = params
    const query = useQuery();
    const navigate = useNavigate();

    const [escEstress, setEscEstress] = useState([
        {
            id: null,
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
            created: '2019-05-02T00:58:34.000Z',
            updated: '2019-05-02T00:58:34.000Z'
        }
    ]);


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
        // handleSalvarApi();
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
                            1. Com que frequência você ficou triste por causa de algo que aconteceu inesperadamente?
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
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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
                        2. Com que frequência você se sentiu incapaz de controlar as coisas importantes em sua vida?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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
                        3. Com que frequência você se sentiu nervoso ou estressado?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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
                        4. Com que frequência você lidou com sucesso com os problemas e aborrecimentos do dia a dia?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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
                        5. Com que frequência você sentiu que estava lidando de forma eficaz com as mudanças importantes que estavam acontecendo em sua vida?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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
                        6. Com que frequência você esteve se sentido confiante para lidar com os seus problemas pessoais?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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
                        7. Com que frequência você sentiu que as coisas estavam acontecendo de acordo com sua vontade?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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
                        8. Com que frequência você percebeu que não conseguia lidar com todas as coisas que você tinha para fazer?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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
                        9. Com que frequência você conseguiu controlar as irritações da sua vida?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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
                        10. Com que frequência você percebeu que as coisas estavam sob seu controle?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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
                        11. Com que frequência você se irritou por coisas que aconteceram que estavam fora de seu controle?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p11: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p11: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p11: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p11: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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
                        12. Com que frequência você se encontrou pensando em coisas que tinham para fazer?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p12: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p12: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p12: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p12: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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
                        13. Com que frequência você conseguiu controlar a maneira como gasta seu tempo?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p13: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p13: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p13: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p13: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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
                        14. Com que frequência você sentiu que as dificuldades se acumularam tanto que você não poderia superá-los?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p14: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p14: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Quase nunca"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p14: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Pouco Frequente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscEstress({
                                        ...escEstress,
                                        p14: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Muito frequente"
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

export default AdicionarEscalaEstresse;
