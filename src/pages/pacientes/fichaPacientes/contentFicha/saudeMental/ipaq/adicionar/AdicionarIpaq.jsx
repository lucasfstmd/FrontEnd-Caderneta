import React, { useState } from 'react'
import {
    Checkbox,
    DialogContent,
    DialogContentText,
    FormControlLabel
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../../ContentFicha'
import api from "../../../../../../../service/api";

function AdicionarIpaq() {
    const params = useParams();
    const { id } = params
    const query = useQuery();
    const navigate = useNavigate();

    const [ipaq, setIpaq] = useState({
        paciente_id: parseInt(id),
        p1_a: '',
        p1_b_h: '',
        p1_b_m: '',
        p2_a: '',
        p2_b_h: '',
        p2_b_m: '',
        p3_a: '',
        p3_b_h: '',
        p3_b_m: '',
        p4_a_h: '',
        p4_a_m: '',
        p4_b_h: '',
        p4_b_m: '',
    })

    async function handleSalvarApi() {
        try {
            await api.post("v1/ipaq", ipaq);
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
                <label className="Titulo"><strong>Para responder as perguntas pense somente nas atividades que você realiza por pelo menos 10 minutos contínuos de cada vez.</strong></label>
                <label style={{padding: "1vh", width: "20vh"}}>
                    <strong>
                        1. a)  Em quantos dias da última semana você CAMINHOU por pelo menos 10 minutos contínuos em casa ou no trabalho, como forma de transporte para ir de um lugar para outro, por lazer, por prazer ou como forma de exercício?
                    </strong>
                </label>
                <div className="LabelInput">
                    <label><strong>Dias por semana</strong></label>
                    <input value={ipaq.p1_a} onChange={(e) => setIpaq({
                        ...ipaq,
                        p1_a: e.target.value })} type="text"/>
                </div>
                <FormControlLabel
                    value={ipaq.p1_a}
                    onChange={(e) => setIpaq( {
                        ...ipaq,
                        p1_a: e.target.checked ? 'Nenhum' : '' })}
                    control={<Checkbox/>}
                    label="Nenhum"
                />
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: '1vh', width: '20vh'}}>
                    <strong>1. b) Nos dias em que você caminhou por pelo menos 10 minutos contínuos quanto tempo no total você gastou caminhando por dia?</strong>
                </label>
                <div className="LabelInput">
                    <label><strong>Horas?</strong></label>
                    <input value={ipaq.p1_b_h} onChange={(e) => setIpaq({
                        ...ipaq,
                        p1_b_h: e.target.value })} type="text"/>
                </div>
                <label><strong>Minutos?</strong></label>
                <input value={ipaq.p1_b_m} onChange={(e) => setIpaq({
                    ...ipaq,
                    p1_b_m: e.target.value })} type="text"/>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: '1vh', width: '20vh'}}>
                    <strong>2. a) Em quantos dias da última semana, você realizou atividades MODERADAS por pelo menos 10 minutos contínuo, como por exemplo, pedalar leve na bicicleta, nadar, dançar, fazer ginástica aeróbica leve, jogar vôlei recreativo, carregar pesos leves, fazer serviços domésticos em casa, no quintal ou jardim como: varrer, aspirar cuidar ou qualquer atividade que fez aumentar moderadamente sua respiração ou batimentos cardíacos (obs: não inclua caminhada)</strong>
                </label>
                <div className="LabelInput">
                    <label><strong>Dias por semana</strong></label>
                    <input value={ipaq.p2_a} onChange={(e) => setIpaq({
                        ...ipaq,
                        p2_a: e.target.value })} type="text"/>
                </div>
                <FormControlLabel
                    value={ipaq.p2_a}
                    onChange={(e) => setIpaq( {
                        ...ipaq,
                        p2_a: e.target.checked ? 'Nenhum' : '' })}
                    control={<Checkbox/>}
                    label="Nenhum"
                />
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: '1vh', width: '20vh'}}>
                    <strong>2. b) Nos dias em que você fez essas atividades moderadas por pelo menos 10 minutos contínuos quanto tempo no total você gastou fazendo essas atividades por dia?</strong>
                </label>
                <div className="LabelInput">
                    <label><strong>Horas?</strong></label>
                    <input value={ipaq.p2_b_h} onChange={(e) => setIpaq({
                        ...ipaq,
                        p2_b_h: e.target.value })} type="text"/>
                </div>
                <label><strong>Minutos?</strong></label>
                <input value={ipaq.p2_b_m} onChange={(e) => setIpaq({
                    ...ipaq,
                    p2_b_m: e.target.value })} type="text"/>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: '1vh', width: '20vh'}}>
                    <strong>3. a) Em quantos dias da última semana você realizou atividades VIGOROSAS por pelo menos 10 minutos contínuos, como por exemplo: correr, fazer ginástica aeróbica, jogar futebol, pedalar rápido na bicicleta, jogar basquete, fazer serviços domésticos pesados em casa, no quintal, carregar pesos elevados ou qualquer atividade que fez aumentar MUITO sua respiração ou batimentos cardíacos.</strong>
                </label>
                <div className="LabelInput">
                    <label><strong>Dias por semana</strong></label>
                    <input value={ipaq.p3_a} onChange={(e) => setIpaq({
                        ...ipaq,
                        p3_a: e.target.value })} type="text"/>
                </div>
                <FormControlLabel
                    value={ipaq.p3_a}
                    onChange={(e) => setIpaq( {
                        ...ipaq,
                        p3_a: e.target.checked ? 'Nenhum' : '' })}
                    control={<Checkbox/>}
                    label="Nenhum"
                />
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: '1vh', width: '20vh'}}>
                    <strong>3. b) Nos dias em que você fez atividades vigorosas por pelo menos 10 minutos contínuos, quanto tempo no total você gastou fazendo atividades por dia?</strong>
                </label>
                <div className="LabelInput">
                    <label><strong>Horas?</strong></label>
                    <input value={ipaq.p3_b} onChange={(e) => setIpaq({
                        ...ipaq,
                        p3_b_h: e.target.value })} type="text"/>
                </div>
                <label><strong>Minutos?</strong></label>
                <input value={ipaq.p3_b} onChange={(e) => setIpaq({
                    ...ipaq,
                    p3_b_m: e.target.value })} type="text"/>
            </div>
            <label className="Legenda"><strong>Estas últimas questões são sobre o tempo que você permanece sentado todo dia, o trabalho, na igreja ou faculdade, em casa e durante seu tempo livre. Isto inclui o tempo sentado estudando, sentado enquanto descansa, fazendo lição de casa, visitando um amigo, lendo sentado ou deitado assistindo TV. Não inclua o tempo gasto sentado durante o transporte em ônibus, trem, metrô ou carro.</strong></label>
            <hr/>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: '1vh', width: '20vh'}}>
                    <strong>4. a) Quanto tempo no total você gasta sentado durante um dia de semana?</strong>
                </label>
                <div className="LabelInput">
                    <label><strong>Horas?</strong></label>
                    <input value={ipaq.p4_a_h} onChange={(e) => setIpaq({
                        ...ipaq,
                        p4_a_h: e.target.value })} type="text"/>
                </div>
                <label><strong>Minutos?</strong></label>
                <input value={ipaq.p4_a_m} onChange={(e) => setIpaq({
                    ...ipaq,
                    p4_a_m: e.target.value })} type="text"/>
            </div>
            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                <label style={{padding: '1vh', width: '20vh'}}>
                    <strong>4. b) Quanto tempo no total você gasta sentado durante um dia de final de semana?</strong>
                </label>
                <div className="LabelInput">
                    <label><strong>Horas?</strong></label>
                    <input value={ipaq.p4_b_h} onChange={(e) => setIpaq({
                        ...ipaq,
                        p4_b_h: e.target.value })} type="text"/>
                </div>
                <label><strong>Minutos?</strong></label>
                <input value={ipaq.p4_b_m} onChange={(e) => setIpaq({
                    ...ipaq,
                    p4_b_m: e.target.value })} type="text"/>
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

export default AdicionarIpaq;
