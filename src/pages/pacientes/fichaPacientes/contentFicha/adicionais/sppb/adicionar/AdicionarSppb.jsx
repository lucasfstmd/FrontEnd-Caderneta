import React, {useState} from "react";
import "./AdicionarSppb.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function AdicionarSppb(props) {
    const [p1, setP1] = useState("");
    const [p2, setP2] = useState("");
    const [p3, setP3] = useState("");
    const [p4, setP4] = useState("");
    const [p5, setP5] = useState("");
    const [p6, setP6] = useState("");
    const [p7, setP7] = useState("");
    const [p8, setP8] = useState("");
    const [p9, setP9] = useState("");
    const [p10, setP10] = useState("");
    const [p11, setP11] = useState("");
    const [p12, setP12] = useState("");
    const [p13, setP13] = useState("");
    const [p14, setP14] = useState("");

    const Sppb = {
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
        p14,
    }

    async function handleSalvarApi() {
        try {
            await api.post("v1/sppbs", Sppb);
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

    const handleSalvar = (sppbId) => {
        setOpen(false);
        props.onClose(sppbId);
    }

    const handleFecharClick = (sppbId) => {
        props.onClose(sppbId);
    }

    return  (
        <div className="AdicionarSppb">
            <div className="LabelInput">
                <label><strong>Score do Teste de equilíbrio com pés juntos (0: Não chegou aos 10 segundos; 1: Conseguiu passar os 10 segundos): </strong></label>
                <input value={p1} onChange={(e) => setP1(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Se 0, quantos segundos conseguiu ficar?: </strong></label>
                <input value={p2} onChange={(e) => setP2(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Score do Teste de equilíbrio em semi-tandem (0: Não chegou aos 10 segundos; 1: Conseguiu passar os 10 segundos) : </strong></label>
                <input value={p3} onChange={(e) => setP3(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Se 0, quantos segundos conseguiu ficar? : </strong></label>
                <input value={p4} onChange={(e) => setP4(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Se 0, quantos segundos conseguiu ficar?: </strong></label>
                <input value={p5} onChange={(e) => setP5(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Score do Teste de equilíbrio em tandem (0 – 0 a 3 segundos; 1 – 3 a 9,9 segundos; 2 – 10 segundos): </strong></label>
                <input value={p6} onChange={(e) => setP6(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Tempo do teste de equilíbrio em tandem</strong></label>
                <input value={p7} onChange={(e) => setP7(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Teste da Marcha – tempo da 1º tentativa : </strong></label>
                <input defaultValue={p8} onChange={(e) => setP8(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Teste da Marcha – tempo da 2º tentativa : </strong></label>
                <input value={p9} onChange={(e) => setP9(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Menor tempo: </strong></label>
                <input value={p10} onChange={(e) => setP10(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Score do Teste da Marcha (0: Não conseguiu; 1: > 8,70 segundos; 2: ≥ 6,21 a ≤ 8,70 segundos; 3: ≥ 4,82 a ≤ 6,20 segundos; 4: ≤ 4,82 segundos): </strong></label>
                <input value={p11} onChange={(e) => setP11(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Velocidade da marcha : </strong></label>
                <input value={p12} onChange={(e) => setP12(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Tempo do teste de Sentar-Levantar da cadeira: </strong></label>
                <input value={p13} onChange={(e) => setP13(e.target.value)} type="text"/>
            </div>
            <div className="LabelInput">
                <label><strong>Score do Teste de Sentar-Levantar da cadeira (0: Não conseguiu ou fez em mais de 60 segundos; 1: Tempo do teste de 16,70 segundos ou mais; 2: Tempo do teste de 13,70 a 16,69 segundos; 3: Tempo do teste de 11,20 a 13,68 segundos; 4: Tempo do teste de 11,19 segundos ou menos): </strong></label>
                <input value={p14} onChange={(e) => setP14(e.target.value)} type="text"/>
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

export default AdicionarSppb;