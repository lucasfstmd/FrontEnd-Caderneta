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

function EditarAutorrelato() {
    const query = useQuery();
    const autorrelatoId = query.get('infoId')
    const params = useParams();
    const { id } = params
    const navigate = useNavigate()

    const [autorrelato, setAutorrelato] = useState({
        paciente_id: parseInt(id),
        p1: null
    })

    async function carregarAutorrelato() {
        try {
            const response = await api.get(`v1/autorrelato/${autorrelatoId}`)
            setAutorrelato(response.data)
        } catch (error) {
            console.log(undefined)
        }
    }

    useEffect(() => {
        carregarAutorrelato()
    }, [])

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/autorrelato/${autorrelatoId}`, autorrelato);
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
        <div style={{
            padding: '10px'
        }}
             className="AdicionarIvcf"
        >
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: '1vh', width: '20vh'}}>
                    <strong>Durante o último mês, quantos dias por semana você acordou 2 ou mais vezes para urinar? </strong>
                </label>
                <div className="InputCheck" style={{marginLeft: '5vh'}}>
                    <FormControl>
                        <RadioGroup
                            column
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue={autorrelato.p1}
                        >
                            <FormControlLabel
                                value={0}
                                onChange={(e) => setAutorrelato({ p1: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Nunca"/>
                            <FormControlLabel
                                value={1}
                                onChange={(e) => setAutorrelato({ p1: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Menos de uma vez por semana"
                            />
                            <FormControlLabel
                                value={2}
                                onChange={(e) => setAutorrelato({ p1: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Uma a duas vezes por semana"
                            />
                            <FormControlLabel
                                value={3}
                                onChange={(e) => setAutorrelato({ p1: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Trez a quatro vezes por semana"
                            />
                            <FormControlLabel
                                value={4}
                                onChange={(e) => setAutorrelato({ p1: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Cinco a sete vezes por semana"
                            />
                            <FormControlLabel
                                value={5}
                                onChange={(e) => setAutorrelato({ p1: parseInt(e.target.value) })}
                                control={<Radio/>}
                                label="Não sei"
                            />
                        </RadioGroup>
                    </FormControl>
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

export default EditarAutorrelato;
