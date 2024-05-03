import React, {useState} from "react";
import "./AdicionarSaudeBucal.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../../ContentFicha'

function AdicionarSaudeBucal() {
    const params = useParams();
    const { id } = params
    const query = useQuery();
    const navigate = useNavigate();

    const [ano, setAno] = useState(null)
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
    const [p32, setP32] = useState("");

    const BucalSaude = {
        paciente_id: parseInt(id),
        ano,
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
    };

    async function handleSalvarApi() {
        try {
            await api.post("v1/bucal-saudes", BucalSaude);
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
        <div className="AdicionarSaudeBucal">
            <div className="LabelInput">
                <label><strong>Ano: </strong></label>
                <input value={ano} onChange={(e) => setAno(parseInt(e.target.value))} type="number"/>
            </div>
            <div className="TituloSaude">
                Hábitos
            </div>
            <div className="LabelInput">
                <label><strong>Álcool:</strong></label>
                <select value={p1} name="p1" onChange={(e) => setP1(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Fumo:</strong></label>
                <select value={p2} name="p2" onChange={(e) => setP2(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="TituloSaude">
                Alterações ou lesões de mucosa
            </div>
            <div className="LabelInput">
                <label><strong>Presença de lesão na mucosa bucal :</strong></label>
                <select value={p3} name="p3" onChange={(e) => setP3(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Boca seca (xerostomia – falta de saliva):</strong></label>
                <select value={p4} name="p4" onChange={(e) => setP4(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Presença de língua saburrosa (língua branca):</strong></label>
                <select value={p5} name="p5" onChange={(e) => setP5(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Presença de candidíase bucal:</strong></label>
                <select value={p6} name="p6" onChange={(e) => setP6(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Presença de halitose:</strong></label>
                <select value={p7} name="p7" onChange={(e) => setP7(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="TituloSaude">
                Cárie dentária e doença periodontal
            </div>
            <div className="LabelInput">
                <label><strong>Presença de placa bacteriana (biofilme dental):</strong></label>
                <select value={p8} name="p8" onChange={(e) => setP8(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Fatores retentivos de placa (raízes residuais, cálculo):</strong></label>
                <select value={p9} name="p9" onChange={(e) => setP9(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Presença evidente de gengivite/sangramento gengival:</strong></label>
                <select value={p10} name="p10" onChange={(e) => setP10(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Presença evidente de periodontite/perda óssea:</strong></label>
                <select value={p11} name="p11" onChange={(e) => setP11(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Presença de cárie:</strong></label>
                <select value={p12} name="p12" onChange={(e) => setP12(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Perda dental no último ano:</strong></label>
                <select value={p13} name="p13" onChange={(e) => setP13(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="TituloSaude">
                Prótese dentária superior
            </div>
            <div className="LegendaSaude">
                <u>
                    Prótese total (dentadura)
                </u>
            </div>
            <div className="LabelInput">
                <label><strong>Não utiliza e não necessita:</strong></label>
                <select value={p14} name="p14" onChange={(e) => setP14(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Não utiliza, mas necessita:</strong></label>
                <select value={p15} name="p15" onChange={(e) => setP15(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Utiliza – Adaptada/sem necessidade de troca:</strong></label>
                <select value={p16} name="p16" onChange={(e) => setP16(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Utiliza – Não adaptada/necessita de troca:</strong></label>
                <select value={p17} name="p17" onChange={(e) => setP17(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LegendaSaude">
                <u>
                    Prótese parcial (ponte móvel)
                </u>
            </div>
            <div className="LabelInput">
                <label><strong>Não utiliza e não necessita:</strong></label>
                <select value={p18} name="p18" onChange={(e) => setP18(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Não utiliza, mas necessita:</strong></label>
                <select value={p19} name="p19" onChange={(e) => setP19(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Utiliza – Adaptada/sem necessidade de troca:</strong></label>
                <select value={p20} name="p20" onChange={(e) => setP20(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Utiliza – Não adaptada/necessita de troca :</strong></label>
                <select value={p21} name="p21" onChange={(e) => setP21(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="TituloSaude">
                Prótese dentária inferior
            </div>
            <div className="LegendaSaude">
                <u>
                    Prótese total (dentadura)
                </u>
            </div>
            <div className="LabelInput">
                <label><strong>Não utiliza e não necessita:</strong></label>
                <select value={p22} name="p22" onChange={(e) => setP22(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Não utiliza, mas necessita:</strong></label>
                <select value={p23} name="p23" onChange={(e) => setP23(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Utiliza – Adaptada/sem necessidade de troca:</strong></label>
                <select value={p24} name="p24" onChange={(e) => setP24(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Utiliza – Não adaptada/necessita de troca:</strong></label>
                <select value={p25} name="p25" onChange={(e) => setP25(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LegendaSaude">
                <u>
                    Prótese parcial (ponte móvel)
                </u>
            </div>
            <div className="LabelInput">
                <label><strong>Não utiliza e não necessita:</strong></label>
                <select value={p26} name="p26" onChange={(e) => setP26(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Não utiliza, mas necessita:</strong></label>
                <select value={p27} name="p27" onChange={(e) => setP27(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Utiliza – Adaptada/sem necessidade de troca:</strong></label>
                <select value={p28} name="p28" onChange={(e) => setP28(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Utiliza – Não adaptada/necessita de troca:</strong></label>
                <select value={p29} name="p29" onChange={(e) => setP29(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="TituloSaude">
                Consulta clínica
            </div>
            <div className="LabelInput">
                <label><strong>Atendimento na unidade de saúde:</strong></label>
                <select value={p30} name="p30" onChange={(e) => setP30(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="LabelInput">
                <label><strong>Atendimento no domicílio:</strong></label>
                <select value={p31} name="p31" onChange={(e) => setP31(parseInt(e.target.value))}>
                    <option value={null}>Selecionar</option>
                    <option value={0}>Não</option>
                    <option value={1}>Sim</option>
                </select>
            </div>
            <div className="TituloSaude">
                Encaminhamento para especialidades odontológicas
            </div>
            <div className="LabelInput">
                <label>
                    <strong>
                        (D) diagnóstico bucal;
                        (P) periodontia;
                        (E) endodontia;
                        (C) cirurgia; (PCD) pessoa com deficiência;
                        (O) outras especialidades.
                    </strong>
                </label>
                <input value={p32} onChange={(e) => setP32(e.target.value)} type="text"/>
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

export default AdicionarSaudeBucal;
