import React, {useEffect, useState} from "react";
import "./EditarExameLab.css"
import api from "../../../../../../../service/api";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useQuery } from '../../../ContentFicha'
import { useNavigate, useParams } from 'react-router-dom'

function EditarExameLab() {
    const query = useQuery();
    const exameLabId = query.get('infoId')
    const params = useParams();
    const { id } = params
    const navigate = useNavigate()

    const [ExameLab, setExameLab] = useState();
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

    async function carregarExameLab() {
        try {
            const response = await api.get(`v1/laboratorial-exames/${exameLabId}`);
            setExameLab(response.data);
            setHemograma(response.data.hemograma);
            setPlaquetas(response.data.plaquetas);
            setContagem(response.data.contagem);
            setMpv(response.data.mpv);
            setObservacoesMorfologicas(response.data.observacoes_morfologicas);
            setVsh(response.data.vsh);
            setClassifiSanguinea(response.data.classifi_sanguinea);
            setIc(response.data.ic);
            setTs(response.data.ts);
            setGlicemiaDeJejum(response.data.glicemia_de_jejum);
            setHbGlicosilada(response.data.hb_glicosilada);
            setUreia(response.data.ureia);
            setCreatina(response.data.creatina);
            setSodio(response.data.sodio);
            setPotassio(response.data.potassio);
            setColesterolTotal(response.data.colesterol_total);
            setHdl(response.data.hdl);
            setLdl(response.data.ldl);
            setTriglicerides(response.data.triglicerides);
            setHiv(response.data.hiv);
            setTgo(response.data.tgo);
            setTgp(response.data.tgp);
            setBtEFracoes(response.data.bt_e_fracoes);
            setAcidoUrico(response.data.acido_urico);
            setPsa(response.data.psa);
            setT3(response.data.t3);
            setT4(response.data.t4);
            setTsh(response.data.tsh);
            setAslo(response.data.aslo);
            setLatex(response.data.latex);
            setPcr(response.data.pcr);
            setMucoproteina(response.data.mucoproteina);
            setCelulaLe(response.data.celula_le);
            setVdrl(response.data.vdrl);
            setEas(response.data.eas);
            setEpf(response.data.epf);
            setDeterminacaoDoFatorReumatoide(response.data.determinacao_do_fator_reumatoide);
            setEritrogramaEritrocitos(response.data.eritrograma_eritrocitos);
            setEritrogramaHemoglobina(response.data.eritrograma_hemoglobina);
            setEritrogramaHematocrito(response.data.eritrograma_hematocrito);
            setEritrogramaVcm(response.data.eritrograma_vcm);
            setEritrogramaHcm(response.data.eritrograma_hcm);
            setEritrogramaChcm(response.data.eritrograma_chcm);
            setEritrogramaRdw(response.data.eritrograma_rdw);
            setEritrogramaRdwFl(response.data.eritrograma_rdw_fl);
            setLeucogramaLeucocitos(response.data.leucograma_leucocitos);
            setLeucogramaPromielocitos(response.data.leucograma_promielocitos);
            setLeucogramaMielocitos(response.data.leucograma_mielocitos);
            setLeucogramaMetamielocitos(response.data.leucograma_metamielocitos);
            setLeucogramaNeutrofilosEmBastao(response.data.leucograma_neutrofilos_em_bastao);
            setLeucogramaNeutrofilosSegmentados(response.data.leucograma_neutrofilos_segmentados);
            setLeucogramaEosinofilos(response.data.leucograma_eosinofilos);
            setLeucogramaBasofilos(response.data.leucograma_basofilos);
            setLeucogramaLinfocitos(response.data.leucograma_linfocitos);
            setLeucogramaMonocitos(response.data.leucograma_monocitos);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarExameLab();
    }, []);


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

    const handleFecharClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=tabela`);
    };

    const handleEdit = async () => {
        try {
            await api.patch(`v1/laboratorial-exames/${exameLabId}`, ExameLabo);
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
        <div className="EditarExameLab">
            <div className="LabelInput">
                <label>
                    <strong>Hemograma:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.hemograma : ""}
                    onChange={(e) => setHemograma(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Plaquetas:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.plaquetas : ""}
                    onChange={(e) => setPlaquetas(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Contagem:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.contagem : ""}
                    onChange={(e) => setContagem(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>MPV:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.mpv : ""}
                    onChange={(e) => setMpv(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Observações Morfológicas:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.observacoes_morfologicas : ""}
                    onChange={(e) => setObservacoesMorfologicas(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>VSH:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.vsh : ""}
                    onChange={(e) => setVsh(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Classificação Sanguínea:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.classifi_sanguinea : ""}
                    onChange={(e) => setClassifiSanguinea(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>IC:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.ic : ""}
                    onChange={(e) => setIc(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>TS:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.ts : ""}
                    onChange={(e) => setTs(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Glicemia de Jejum:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.glicemia_de_jejum : ""}
                    onChange={(e) => setGlicemiaDeJejum(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Hb Glicosilada:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.hb_glicosilada : ""}
                    onChange={(e) => setHbGlicosilada(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Ureia:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.ureia : ""}
                    onChange={(e) => setUreia(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Creatina:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.creatina : ""}
                    onChange={(e) => setCreatina(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Sódio:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.sodio : ""}
                    onChange={(e) => setSodio(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Potássio:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.potassio : ""}
                    onChange={(e) => setPotassio(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Colesterol Total:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.colesterol_total : ""}
                    onChange={(e) => setColesterolTotal(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>HDL:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.hdl : ""}
                    onChange={(e) => setHdl(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>LDL:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.ldl : ""}
                    onChange={(e) => setLdl(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Triglicerídes:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.triglicerides : ""}
                    onChange={(e) => setTriglicerides(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>HIV:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.hiv : ""}
                    onChange={(e) => setHiv(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>TGO:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.tgo : ""}
                    onChange={(e) => setTgo(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>TGP:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.tgp : ""}
                    onChange={(e) => setTgp(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Bilirrubina Total e Fracões:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.bt_e_fracoes : ""}
                    onChange={(e) => setBtEFracoes(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Ácido Úrico:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.acido_urico : ""}
                    onChange={(e) => setAcidoUrico(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>PSA:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.psa : ""}
                    onChange={(e) => setPsa(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>T3:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.t3 : ""}
                    onChange={(e) => setT3(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>T4:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.t4 : ""}
                    onChange={(e) => setT4(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>TSH:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.tsh : ""}
                    onChange={(e) => setTsh(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>ASLO:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.aslo : ""}
                    onChange={(e) => setAslo(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Latex:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.latex : ""}
                    onChange={(e) => setLatex(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>PCR:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.pcr : ""}
                    onChange={(e) => setPcr(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Mucoproteína:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.mucoproteina : ""}
                    onChange={(e) => setMucoproteina(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Célula LE:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.celula_le : ""}
                    onChange={(e) => setCelulaLe(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>VDRL:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.vdrl : ""}
                    onChange={(e) => setVdrl(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>EAS:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.eas : ""}
                    onChange={(e) => setEas(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>EPF:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.epf : ""}
                    onChange={(e) => setEpf(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Determinação do Fator Reumatoide:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.determinacao_do_fator_reumatoide : ""}
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
                    defaultValue={ExameLab ? ExameLab.eritrograma_eritrocitos : ""}
                    onChange={(e) => setEritrogramaEritrocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - Hemoglobina:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.eritrograma_hemoglobina : ""}
                    onChange={(e) => setEritrogramaHemoglobina(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - Hematócrito:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.eritrograma_hematocrito : ""}
                    onChange={(e) => setEritrogramaHematocrito(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - VCM:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.eritrograma_vcm : ""}
                    onChange={(e) => setEritrogramaVcm(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - HCM:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.eritrograma_hcm : ""}
                    onChange={(e) => setEritrogramaHcm(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - CHCM:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.eritrograma_chcm : ""}
                    onChange={(e) => setEritrogramaChcm(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Eritrograma - RDW: </strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.eritrograma_rdw : ""}
                    onChange={(e) => setEritrogramaRdw(e.target.value)}
                    type="text"
                />
            </div>
            <label className="Titulo"><strong>Leucograma</strong></label>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Leucócitos:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.leucograma_leucocitos : ""}
                    onChange={(e) => setLeucogramaLeucocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Promielocitos:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.leucograma_promielocitos: ""}
                    onChange={(e) => setLeucogramaPromielocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Mielocitos:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.leucograma_mielocitos: ""}
                    onChange={(e) => setLeucogramaMielocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Metamielocitos:</strong>
                </label>
                <input
                    value={ExameLab ? ExameLab.leucograma_metamielocitos: ""}
                    onChange={(e) => setLeucogramaMetamielocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Neutrófilos em Bastão:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.leucograma_neutrofilos_em_bastao : ""}
                    onChange={(e) => setLeucogramaNeutrofilosEmBastao(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Neutrófilos Segmentado:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.leucograma_neutrofilos_segmentados: ""}
                    onChange={(e) => setLeucogramaNeutrofilosSegmentados(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Linfócitos:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.leucograma_linfocitos : ""}
                    onChange={(e) => setLeucogramaLinfocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Monócitos:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.leucograma_monocitos : ""}
                    onChange={(e) => setLeucogramaMonocitos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Eosinófilos:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.leucograma_eosinofilos : ""}
                    onChange={(e) => setLeucogramaEosinofilos(e.target.value)}
                    type="text"
                />
            </div>
            <div className="LabelInput">
                <label>
                    <strong>Leucograma - Basófilos:</strong>
                </label>
                <input
                    defaultValue={ExameLab ? ExameLab.leucograma_basofilos : ""}
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
                        {"Deseja realmente alterar esse Paciente"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Tem certeza que você deseja alterar os dados desse paciente?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleSalvar} autoFocus>
                            Salvar
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

export default EditarExameLab;
