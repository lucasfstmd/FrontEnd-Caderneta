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

function EditarEse() {
    const query = useQuery();
    const eseId = query.get('infoId')
    const params = useParams();
    const { id } = params
    const navigate = useNavigate()

    const [ese, setEse] = useState({
        paciente_id: parseInt(id),
        p1: null,
        p2: null,
        p3: null,
        p4: null,
        p5: null,
        p6: null,
        p7: null,
        p8: null,
    })

    async function carregarEse() {
        try {
            const response = await api.get(`v1/ese/${eseId}`)
            const responseData = { ...response.data }
            delete responseData.id
            delete responseData.created
            delete responseData.updated
            setEse(responseData)
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
            await api.patch(`v1/ese/${eseId}`, ese);
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
                <label className="Titulo"><strong>Chances de cochilar</strong></label>
                <div className="LabelInput" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <label style={{
                        width: '30vw'
                    }}>
                        <strong>1. Sentado e lendo
                        </strong>
                    </label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={ese.p1}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="0"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="1"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="2"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p1: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="3"
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
                    }}><strong>2. Vendo TV</strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={ese.p2}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="0"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="1"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="2"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p2: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="3"
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
                    }}><strong>3. Sentado em algum lugar público, sem atividade</strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={ese.p3}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="0"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="1"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="2"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p3: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="3"
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
                    }}><strong>4. Como passageiro de trem, carro ou ônibus andando uma hora sem parar</strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={ese.p4}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="0"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="1"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="2"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p4: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="3"
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
                    }}><strong>5. Deitado para descansar a tarde quando as circunstâncias permitem</strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={ese.p5}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="0"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="1"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="2"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p5: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="3"
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
                    }}><strong>6. Sentado e conversando com alguém</strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={ese.p6}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="0"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="1"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="2"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p6: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="3"
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
                    }}><strong>7. Sentado calmamente, após um almoço sem álcool</strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={ese.p7}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="0"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="1"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="2"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p7: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="3"
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
                    }}><strong>8. Se você estiver de carro, enquanto para por alguns minutos no trânsito intenso</strong></label>
                    <div className="InputRadio">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={ese.p8}
                            >
                                <FormControlLabel
                                    value={0}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="0"/>
                                <FormControlLabel
                                    value={1}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="1"
                                />
                                <FormControlLabel
                                    value={2}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="2"
                                />
                                <FormControlLabel
                                    value={3}
                                    onChange={(e) => setEse({
                                        ...ese,
                                        p8: parseInt(e.target.value) })}
                                    control={<Radio/>}
                                    labelPlacement="top"
                                    label="3"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>
            <label className="Titulo"><strong>Legenda: </strong>0: nenhuma chance; 1:pequena chance; 2: moderada chance; 3: alta chance.</label>

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

export default EditarEse;
