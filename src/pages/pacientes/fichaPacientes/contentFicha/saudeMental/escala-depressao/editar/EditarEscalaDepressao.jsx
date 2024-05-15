import { useQuery } from '../../../ContentFicha'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import api from '../../../../../../../service/api'
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

function EditarEscalaDepressao() {
    const query = useQuery();
    const escDepreId = query.get('infoId')
    const params = useParams();
    const { id } = params
    const navigate = useNavigate()

    const [escDepre, setEscDepre] = useState({
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
    })

    async function carregarEse() {
        try {
            const response = await api.get(`v1/escala-depressao/${escDepreId}`)
            const responseData = { ...response.data }
            delete responseData.id
            delete responseData.created
            delete responseData.updated
            setEscDepre(responseData)
        } catch (error) {
            console.log(undefined)
        }
    }

    useEffect(() => {
        carregarEse()
    }, [])

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/escala-depressao/${escDepreId}`, {
                ...escDepre,
                score: (escDepre.p1 +
                    escDepre.p2 +
                    escDepre.p3 +
                    escDepre.p4 +
                    escDepre.p5 +
                    escDepre.p6 +
                    escDepre.p7 +
                    escDepre.p8 +
                    escDepre.p9 +
                    escDepre.p10 +
                    escDepre.p11 +
                    escDepre.p12 +
                    escDepre.p13 +
                    escDepre.p14 +
                    escDepre.p15 +
                    escDepre.p16 +
                    escDepre.p17 +
                    escDepre.p18 +
                    escDepre.p19 +
                    escDepre.p20
                )});
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
        <div className="AdicionarIvcf" style={{
            padding: '5vh'
        }}>
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
                            1. O(a) Sr(a) sentiu-se incomodado (a) com coisas que habitualmente não lhe incomodam?
                        </strong>
                    </label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p1}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        2. O (a) Sr(a) não teve vontade de comer ou teve pouco apetite?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p2}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        3. O (a) Sr(a) sentiu não conseguir melhorar seu estado de ânimo mesmo com a ajuda de familiares e amigos?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p3}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        4. O(a) Sr(a) sentiu-se, quando a outras pessoas, tendo tanto valor quanto a maioria delas?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p4}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        5. O Sr(a) sentiu dificuldade de se concentrar no que fazia?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p5}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        6. O Sr(a) Sentiu-se deprimido (a)
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p6}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        7. O (a) Sr(a) sentiu-se que teve que fazer esforço para dar conta das suas tarefas habituais?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p7}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        8. O (a) Sr(a) sentiu-se otimista sobre o futuro
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p8}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        9. O (a) Sr(a) considerou que sua vida tinha sido um fracasso?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p9}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p9: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        10. O(a) Sr(a) sentiu-se amedrontado (a)?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p10}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p10: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        11. Seu sono não foi repousante?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p11}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p11: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p11: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p11: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p11: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        12. O (a) Sr(a) esteve feliz?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p12}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p12: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p12: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p12: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p12: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        13. O (a) Sr(a) falou menos que o habitual?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p13}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p13: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p13: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p13: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p13: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        14. O (a) Sr(a) sentiu-se sozinho (a)?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p14}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p14: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p14: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p14: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p14: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        15. As pessoas não foram amistosas com o (a) Sr(a)?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p15}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p15: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p15: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p15: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p15: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        16. O(a) Sr(a). aproveitou a vida?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p16}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p16: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p16: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p16: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p16: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        17. O(a) Sr(a). teve crises de choro?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p17}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p17: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p17: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p17: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p17: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        18. O(a) Sr(a). sentiu-se triste?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p18}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p18: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p18: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p18: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p18: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        19. O(a) Sr(a). sentiu que as pessoas não gostavam do(a) Sr(a).?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p19}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p19: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p19: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p19: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p19: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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
                        20. O(a) Sr(a). não conseguiu levar adiante suas coisas?
                    </strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={escDepre.p20}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p20: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Nunca ou raramente"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p20: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Às vezes"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p20: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Frequentemente"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEscDepre({
                                        ...escDepre,
                                        p20: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="rigth"
                                    label="Sempre"
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

export default EditarEscalaDepressao;
