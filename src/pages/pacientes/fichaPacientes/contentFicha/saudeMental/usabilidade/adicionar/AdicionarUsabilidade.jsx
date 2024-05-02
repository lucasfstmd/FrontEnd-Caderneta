import React, { useState } from 'react'
import {
    Checkbox,
    DialogContent,
    DialogContentText,
    FormControl,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../../ContentFicha'

function AdicionarUsabilidade() {
    const params = useParams();
    const { id } = params
    const query = useQuery();
    const navigate = useNavigate();

    const [p1, setP1] = useState(null);
    const [p1_0, setP1_0] = useState('');
    const [p1_1, setP1_1] = useState(null);
    const [p1_1_1, setP1_1_1] = useState(null);
    const [p1_1_2, setP1_1_2] = useState(null);
    const [p1_1_3, setP1_1_3] = useState(null);
    const [p1_1_4, setP1_1_4] = useState(null);
    const [p1_1_5, setP1_1_5] = useState(null);
    const [p1_2, setP1_2] = useState(null);
    const [p1_3, setP1_3] = useState(null);
    const [p2_1, setP2_1] = useState(null);
    const [p2_2, setP2_2] = useState(null);
    const [p3_1, setP3_1] = useState(null);
    const [p3_1_1, setP3_1_1] = useState(null);
    const [p3_2, setP3_2] = useState(null);
    const [p3_2_1, setP3_2_1] = useState(null);
    const [p4_1, setP4_1] = useState(null);
    const [p4_1_1, setP4_1_1] = useState(null);

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
        <div className="AdicionarIvcf">
            <div className="LabelInput">
                <table style={{border: "1px solid gray", marginLeft: "3vh", marginRight: "3vh", width: "100%"}}>
                    <tbody>
                    <tr>
                        <td style={{border: "1px solid gray"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                <strong>1. Perfil do Indivíduo:</strong>
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <div className="LabelForm" style={{borderBottom: "1px solid gray", marginBottom: "0.2vh"}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>Você já utilizou algum
                                    dispositivo igual ou
                                    semelhante ao atual?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                onChange={(e) => setP1(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Sim"/>
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP1(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                {p1 === 1 && (
                                    <div className="LabelInput">
                                        <label><strong>Qual?</strong></label>
                                        <input value={p1_0} onChange={(e) => setP1_0(e.target.value)} type="text"/>
                                    </div>
                                )}
                            </div>
                            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                                <label style={{padding: '1vh', width: '20vh'}}>
                                    <strong>1.1. Caso NÃO tenha utilizado, justifique o motivo.</strong>
                                </label>
                                <div className="InputCheck" style={{marginLeft: '5vh'}}>
                                    <FormGroup>
                                        <FormControlLabel
                                            value={p1_1_1}
                                            onChange={(e) => setP1_1_1(e.target.checked ? 1 : 0)}
                                            control={<Checkbox/>}
                                            label="Falta de interesse"
                                        />
                                        <FormControlLabel
                                            value={p1_1_2}
                                            onChange={(e) => setP1_1_2(e.target.checked ? 1 : 0)}
                                            control={<Checkbox/>}
                                            label="Falta de oportunidade"
                                        />
                                        <FormControlLabel
                                            value={p1_1_3}
                                            onChange={(e) => setP1_1_3(e.target.checked ? 1 : 0)}
                                            control={<Checkbox/>}
                                            label="Falta de conhecimento"
                                        />
                                        <FormControlLabel
                                            value={p1_1_4}
                                            onChange={(e) => setP1_1_4(e.target.checked ? 1 : 0)}
                                            control={<Checkbox/>}
                                            label="Falta de recursos financeiros"
                                        />
                                        <FormControlLabel
                                            value={p1_1_5}
                                            onChange={(e) => setP1_1_5(e.target.checked ? 1 : 0)}
                                            control={<Checkbox/>}
                                            label="Falta de habilidade de manuseio"
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                                <label style={{padding: "1vh", width: "20vh"}}><strong>1.2. Qual o seu grau de
                                    experiência
                                    com este tipo de dispositivo/relógio?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP1_2(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Muita"/>
                                            <FormControlLabel
                                                value={1}
                                                onChange={(e) => setP1_2(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Pouca"
                                            />
                                            <FormControlLabel
                                                value={2}
                                                onChange={(e) => setP1_2(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Mais ou menos"
                                            />
                                            <FormControlLabel
                                                value={3}
                                                onChange={(e) => setP1_2(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Nenhuma"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="LabelInput">
                                <label><strong>1.3. Qual o seu grau de experiência/ tempo com este tipo de
                                    dispositivo/relógio?
                                    Anos ou meses</strong></label>
                                <input value={p1_3} onChange={(e) => setP1_3(e.target.value)} type="text"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid gray"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                <strong>2. Satisfação do Usuário:</strong>
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                                <label style={{padding: '1vh', width: '20vh'}}><strong>2.1. Quanto ao manuseio de forma
                                    geral deste dispositivo, qual o seu grau de satisfação? </strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP2_1(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Muito Satisfeito"/>
                                            <FormControlLabel
                                                value={1}
                                                onChange={(e) => setP2_1(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Mais ou menos satisfeito"
                                            />
                                            <FormControlLabel
                                                value={2}
                                                onChange={(e) => setP2_1(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Pouco satisfeito"
                                            />
                                            <FormControlLabel
                                                value={3}
                                                onChange={(e) => setP2_1(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Não fiquei satisfeito"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                                <label style={{padding: '1vh', width: '20vh'}}><strong>2.2. Com relação ao monitoramento
                                    dos seus dados de saúde. Qual seu grau de satisfação? </strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP2_2(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Muito Satisfeito"/>
                                            <FormControlLabel
                                                value={1}
                                                onChange={(e) => setP2_2(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Mais ou menos satisfeito"
                                            />
                                            <FormControlLabel
                                                value={2}
                                                onChange={(e) => setP2_2(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Pouco satisfeito"
                                            />
                                            <FormControlLabel
                                                value={3}
                                                onChange={(e) => setP2_2(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Não fiquei satisfeito"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid gray"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                <strong>3. Utilização do disposto:</strong>
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                                <label style={{padding: '1vh', width: '20vh'}}><strong>3.1 Quanto a utilização do
                                    dispositivo, você sentiu alguma dificuldade? Se sim, justifique o motivo. </strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                onChange={(e) => setP3_1(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Sim"/>
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP3_1(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="LabelInput">
                                    <label><strong>Comente</strong></label>
                                    <input value={p3_1_1} onChange={(e) => setP3_1_1(e.target.value)} type="text"/>
                                </div>
                            </div>
                            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                                <label style={{padding: '1vh', width: '20vh'}}><strong>3.2. Apresentou algum processo
                                    alérgico,
                                    como prurido (coceira), vermelhidão, entre outros?</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={1}
                                                onChange={(e) => setP3_2(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Sim"/>
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP3_2(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Não"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="LabelInput">
                                    <label><strong>Qual tipo de desconforto:</strong></label>
                                    <input value={p3_2_1} onChange={(e) => setP3_2_1(e.target.value)} type="text"/>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid gray"}}>
                            <div className="Pergunta" style={{marginLeft: "3vh", padding: "1vh", width: "24.5vh"}}>
                                <strong>4. Quanto à privacidade:</strong>
                            </div>
                        </td>
                        <td style={{border: "1px solid gray"}}>
                            <div className="LabelForm" style={{borderBottom: '1px solid gray', marginBottom: '0.2vh'}}>
                                <label style={{padding: '1vh', width: '20vh'}}><strong>4.1 Como você se sentiu com uso
                                    do dispositivo:</strong></label>
                                <div className="InputRadio">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value={0}
                                                onChange={(e) => setP4_1(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Constrangido"/>
                                            <FormControlLabel
                                                value={1}
                                                onChange={(e) => setP4_1(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Desconfortável"
                                            />
                                            <FormControlLabel
                                                value={2}
                                                onChange={(e) => setP4_1(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Normal"
                                            />
                                            <FormControlLabel
                                                value={3}
                                                onChange={(e) => setP4_1(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Seguro"
                                            />
                                            <FormControlLabel
                                                value={3}
                                                onChange={(e) => setP4_1(parseInt(e.target.value))}
                                                control={<Radio/>}
                                                label="Confortável"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="LabelInput">
                                    <label><strong>Porquê?</strong></label>
                                    <input value={p4_1_1} onChange={(e) => setP4_1_1(e.target.value)} type="text"/>
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

export default AdicionarUsabilidade;
