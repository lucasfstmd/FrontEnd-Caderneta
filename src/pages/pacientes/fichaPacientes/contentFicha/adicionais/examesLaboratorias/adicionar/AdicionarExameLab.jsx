import React, {useState} from "react";
import "./AdicionarExameLab.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../../ContentFicha'

function AdicionarExameLab() {
    const params = useParams();
    const { id } = params
    const query = useQuery();
    const navigate = useNavigate();

    const [hemograma, setHemograma] = useState("");
    const [plaquetas, setPlaquetas] = useState("");
    const [contagem, setContagem] = useState("");
    const [mpv, setMpv] = useState("");
    const [observacoes_morfologicas, setObservacoesMorfologicas] = useState("");
    const [vsh, setVsh] = useState("");
    const [classifi_sanguinea, setClassifiSanguinea] = useState("");
    const [ic, setIc] = useState("");
    const [ts, setTs] = useState("");
    const [glicemia_de_jejum, setGlicemiaDeJejum] = useState("");
    const [hb_glicosilada, setHbGlicosilada] = useState("");
    const [ureia, setUreia] = useState("");
    const [creatina, setCreatina] = useState("");
    const [sodio, setSodio] = useState("");
    const [potassio, setPotassio] = useState("");
    const [colesterol_total, setColesterolTotal] = useState("");
    const [hdl, setHdl] = useState("");
    const [ldl, setLdl] = useState("");
    const [triglicerides, setTriglicerides] = useState("");
    const [hiv, setHiv] = useState("");
    const [tgo, setTgo] = useState("");
    const [tgp, setTgp] = useState("");
    const [bt_e_fracoes, setBtEFracoes] = useState("");
    const [acido_urico, setAcidoUrico] = useState("");
    const [psa, setPsa] = useState("");
    const [t3, setT3] = useState("");
    const [t4, setT4] = useState("");
    const [tsh, setTsh] = useState("");
    const [aslo, setAslo] = useState("");
    const [latex, setLatex] = useState("");
    const [pcr, setPcr] = useState("");
    const [mucoproteina, setMucoproteina] = useState("");
    const [celula_le, setCelulaLe] = useState("");
    const [vdrl, setVdrl] = useState("");
    const [eas, setEas] = useState("");
    const [epf, setEpf] = useState("");
    const [determinacao_do_fator_reumatoide, setDeterminacaoDoFatorReumatoide] = useState("");
    const [eritrograma_eritrocitos, setEritrogramaEritrocitos] = useState("");
    const [eritrograma_hemoglobina, setEritrogramaHemoglobina] = useState("");
    const [eritrograma_hematocrito, setEritrogramaHematocrito] = useState("");
    const [eritrograma_vcm, setEritrogramaVcm] = useState("");
    const [eritrograma_hcm, setEritrogramaHcm] = useState("");
    const [eritrograma_chcm, setEritrogramaChcm] = useState("");
    const [eritrograma_rdw, setEritrogramaRdw] = useState("");
    const [eritrograma_rdw_fl, setEritrogramaRdwFl] = useState("");
    const [leucograma_leucocitos, setLeucogramaLeucocitos] = useState("");
    const [leucograma_promielocitos, setLeucogramaPromielocitos] = useState("");
    const [leucograma_mielocitos, setLeucogramaMielocitos] = useState("");
    const [leucograma_metamielocitos, setLeucogramaMetamielocitos] = useState("");
    const [leucograma_neutrofilos_em_bastao, setLeucogramaNeutrofilosEmBastao] = useState("");
    const [leucograma_neutrofilos_segmentados, setLeucogramaNeutrofilosSegmentados] = useState("");
    const [leucograma_eosinofilos, setLeucogramaEosinofilos] = useState("");
    const [leucograma_basofilos, setLeucogramaBasofilos] = useState("");
    const [leucograma_linfocitos, setLeucogramaLinfocitos] = useState("");
    const [leucograma_monocitos, setLeucogramaMonocitos] = useState("");

    const ExameLabo = {
        paciente_id: parseInt(id),
        hemograma,
        plaquetas,
        contagem,
        mpv,
        observacoes_morfologicas,
        vsh,
        classifi_sanguinea,
        ic,
        ts,
        glicemia_de_jejum,
        hb_glicosilada,
        ureia,
        creatina,
        sodio,
        potassio,
        colesterol_total,
        hdl,
        ldl,
        triglicerides,
        hiv,
        tgo,
        tgp,
        bt_e_fracoes,
        acido_urico,
        psa,
        t3,
        t4,
        tsh,
        aslo,
        latex,
        pcr,
        mucoproteina,
        celula_le,
        vdrl,
        eas,
        epf,
        determinacao_do_fator_reumatoide,
        eritrograma_eritrocitos,
        eritrograma_hemoglobina,
        eritrograma_hematocrito,
        eritrograma_vcm,
        eritrograma_hcm,
        eritrograma_chcm,
        eritrograma_rdw,
        eritrograma_rdw_fl,
        leucograma_leucocitos,
        leucograma_promielocitos,
        leucograma_mielocitos,
        leucograma_metamielocitos,
        leucograma_neutrofilos_em_bastao,
        leucograma_neutrofilos_segmentados,
        leucograma_eosinofilos,
        leucograma_basofilos,
        leucograma_linfocitos,
        leucograma_monocitos
    };

    async function handleSalvarApi() {
        try {
            await api.post("v1/laboratorial-exames", ExameLabo);
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
        <div className="AdicionarExameLab">
            <div className="LabelInput">
                <label>
                    <strong>Hemograma:</strong>
                </label>
                <input
                    value={hemograma}
                    onChange={(e) => setHemograma(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Plaquetas:</strong>
                </label>
                <input
                    value={plaquetas}
                    onChange={(e) => setPlaquetas(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Contagem:</strong>
                </label>
                <input
                    value={contagem}
                    onChange={(e) => setContagem(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>MPV:</strong>
                </label>
                <input
                    value={mpv}
                    onChange={(e) => setMpv(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Observações Morfológicas:</strong>
                </label>
                <input
                    value={observacoes_morfologicas}
                    onChange={(e) => setObservacoesMorfologicas(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>VSH:</strong>
                </label>
                <input
                    value={vsh}
                    onChange={(e) => setVsh(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Classificação Sanguínea:</strong>
                </label>
                <input
                    value={classifi_sanguinea}
                    onChange={(e) => setClassifiSanguinea(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>IC:</strong>
                </label>
                <input
                    value={ic}
                    onChange={(e) => setIc(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>TS:</strong>
                </label>
                <input
                    value={ts}
                    onChange={(e) => setTs(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Glicemia de Jejum:</strong>
                </label>
                <input
                    value={glicemia_de_jejum}
                    onChange={(e) => setGlicemiaDeJejum(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>HB Glicosilada:</strong>
                </label>
                <input
                    value={hb_glicosilada}
                    onChange={(e) => setHbGlicosilada(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Ureia:</strong>
                </label>
                <input
                    value={ureia}
                    onChange={(e) => setUreia(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Creatina:</strong>
                </label>
                <input
                    value={creatina}
                    onChange={(e) => setCreatina(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Sódio:</strong>
                </label>
                <input
                    value={sodio}
                    onChange={(e) => setSodio(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Potássio:</strong>
                </label>
                <input
                    value={potassio}
                    onChange={(e) => setPotassio(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Colesterol Total:</strong>
                </label>
                <input
                    value={colesterol_total}
                    onChange={(e) => setColesterolTotal(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>HDL:</strong>
                </label>
                <input
                    value={hdl}
                    onChange={(e) => setHdl(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>LDL:</strong>
                </label>
                <input
                    value={ldl}
                    onChange={(e) => setLdl(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Triglicerídes:</strong>
                </label>
                <input
                    value={triglicerides}
                    onChange={(e) => setTriglicerides(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>HIV:</strong>
                </label>
                <input
                    value={hiv}
                    onChange={(e) => setHiv(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>TGO:</strong>
                </label>
                <input
                    value={tgo}
                    onChange={(e) => setTgo(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>TGP:</strong>
                </label>
                <input
                    value={tgp}
                    onChange={(e) => setTgp(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Bilirrubina Total e Fracões:</strong>
                </label>
                <input
                    value={bt_e_fracoes}
                    onChange={(e) => setBtEFracoes(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Ácido Úrico:</strong>
                </label>
                <input
                    value={acido_urico}
                    onChange={(e) => setAcidoUrico(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>PSA:</strong>
                </label>
                <input
                    value={psa}
                    onChange={(e) => setPsa(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>T3:</strong>
                </label>
                <input
                    value={t3}
                    onChange={(e) => setT3(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>T4:</strong>
                </label>
                <input
                    value={t4}
                    onChange={(e) => setT4(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>TSH:</strong>
                </label>
                <input
                    value={tsh}
                    onChange={(e) => setTsh(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>ASLO:</strong>
                </label>
                <input
                    value={aslo}
                    onChange={(e) => setAslo(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Látex:</strong>
                </label>
                <input
                    value={latex}
                    onChange={(e) => setLatex(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>PCR:</strong>
                </label>
                <input
                    value={pcr}
                    onChange={(e) => setPcr(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Mucoproteína:</strong>
                </label>
                <input
                    value={mucoproteina}
                    onChange={(e) => setMucoproteina(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Célula LE:</strong>
                </label>
                <input
                    value={celula_le}
                    onChange={(e) => setCelulaLe(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>VDRL:</strong>
                </label>
                <input
                    value={vdrl}
                    onChange={(e) => setVdrl(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>EAS:</strong>
                </label>
                <input
                    value={eas}
                    onChange={(e) => setEas(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>EPF:</strong>
                </label>
                <input
                    value={epf}
                    onChange={(e) => setEpf(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Determinação do Fator Reumatoide:</strong>
                </label>
                <input
                    value={determinacao_do_fator_reumatoide}
                    onChange={(e) => setDeterminacaoDoFatorReumatoide(e.target.value)}
                    type="text"
                />
            </div>
            <label className="Titulo"><strong>Eritrograma</strong></label>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - Eritrócitos:</strong>
                </label>
                <input
                    value={eritrograma_eritrocitos}
                    onChange={(e) => setEritrogramaEritrocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - Hemoglobina:</strong>
                </label>
                <input
                    value={eritrograma_hemoglobina}
                    onChange={(e) => setEritrogramaHemoglobina(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - Hematócrito:</strong>
                </label>
                <input
                    value={eritrograma_hematocrito}
                    onChange={(e) => setEritrogramaHematocrito(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - VCM:</strong>
                </label>
                <input
                    value={eritrograma_vcm}
                    onChange={(e) => setEritrogramaVcm(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - HCM:</strong>
                </label>
                <input
                    value={eritrograma_hcm}
                    onChange={(e) => setEritrogramaHcm(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - CHCM:</strong>
                </label>
                <input
                    value={eritrograma_chcm}
                    onChange={(e) => setEritrogramaChcm(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - RDW:</strong>
                </label>
                <input
                    value={eritrograma_rdw}
                    onChange={(e) => setEritrogramaRdw(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - RDW - FL:</strong>
                </label>
                <input
                    value={eritrograma_rdw_fl}
                    onChange={(e) => setEritrogramaRdwFl(e.target.value)}
                    type="text"
                />
            </div>
            <label className="Titulo"><strong>Leucograma</strong></label>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Leucócitos:</strong>
                </label>
                <input
                    value={leucograma_leucocitos}
                    onChange={(e) => setLeucogramaLeucocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Promielocitos:</strong>
                </label>
                <input
                    value={leucograma_promielocitos}
                    onChange={(e) => setLeucogramaPromielocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Mielocitos:</strong>
                </label>
                <input
                    value={leucograma_mielocitos}
                    onChange={(e) => setLeucogramaMielocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Metamielocitos:</strong>
                </label>
                <input
                    value={leucograma_metamielocitos}
                    onChange={(e) => setLeucogramaMetamielocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Neutrófilos em Bastão:</strong>
                </label>
                <input
                    value={leucograma_neutrofilos_em_bastao}
                    onChange={(e) => setLeucogramaNeutrofilosEmBastao(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Neutrófilos Segmentado:</strong>
                </label>
                <input
                    value={leucograma_neutrofilos_segmentados}
                    onChange={(e) => setLeucogramaNeutrofilosSegmentados(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Linfócitos:</strong>
                </label>
                <input
                    value={leucograma_linfocitos}
                    onChange={(e) => setLeucogramaLinfocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Monócitos:</strong>
                </label>
                <input
                    value={leucograma_monocitos}
                    onChange={(e) => setLeucogramaMonocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Eosinófilos:</strong>
                </label>
                <input
                    value={leucograma_eosinofilos}
                    onChange={(e) => setLeucogramaEosinofilos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Basófilos:</strong>
                </label>
                <input
                    value={leucograma_basofilos}
                    onChange={(e) => setLeucogramaBasofilos(e.target.value)}
                    type="text"
                />
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

export default AdicionarExameLab;
