import React, {useState} from "react";
import "./TabelaExameLab.css"
import {format} from "date-fns";
import api from "../../../../../../../service/api";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function ExameLabLinha({ ExameLab, onEditarClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(ExameLab.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(ExameLab.updated), "dd/MM/yyyy");
    async function handleDelet() {
        try {
            await api.delete(`v1/laboratorial-exames/${ExameLab.id}`);
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSalvar = () => {
        setOpen(false);
        handleDelet();
    }

    return (
        <tr key={ExameLab.id} className="ExameLabLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Hemograma:
                    <strong> {ExameLab.hemograma}</strong>
                </div>
                <div className="Pergunta">
                    Plaquetas:
                    <strong> {ExameLab.plaquetas}</strong>
                </div>
                <div className="Pergunta">
                    Contagem:
                    <strong> {ExameLab.contagem}</strong>
                </div>
                <div className="Pergunta">
                    MPV:
                    <strong> {ExameLab.mpv}</strong>
                </div>
                <div className="Pergunta">
                    Observações Morfológicas:
                    <strong> {ExameLab.observacoes_morfologicas}</strong>
                </div>
                <div className="Pergunta">
                    VSH:
                    <strong> {ExameLab.vsh}</strong>
                </div>
                <div className="Pergunta">
                    Classificação Sanguínea:
                    <strong> {ExameLab.classifi_sanguinea}</strong>
                </div>
                <div className="Pergunta">
                    IC:
                    <strong> {ExameLab.ic}</strong>
                </div>
                <div className="Pergunta">
                    TS:
                    <strong> {ExameLab.ts}</strong>
                </div>
                <div className="Pergunta">
                    Glicemia de Jejum:
                    <strong> {ExameLab.glicemia_de_jejum}</strong>
                </div>
                <div className="Pergunta">
                    Hb Glicosilada:
                    <strong> {ExameLab.hb_glicosilada}</strong>
                </div>
                <div className="Pergunta">
                    Ureia:
                    <strong> {ExameLab.ureia}</strong>
                </div>
                <div className="Pergunta">
                    Creatina:
                    <strong> {ExameLab.creatina}</strong>
                </div>
                <div className="Pergunta">
                    Sódio:
                    <strong> {ExameLab.sodio}</strong>
                </div>
                <div className="Pergunta">
                    Potássio:
                    <strong> {ExameLab.potassio}</strong>
                </div>
                <div className="Pergunta">
                    Colesterol Total:
                    <strong> {ExameLab.colesterol_total}</strong>
                </div>
                <div className="Pergunta">
                    HDL:
                    <strong> {ExameLab.hdl}</strong>
                </div>
                <div className="Pergunta">
                    LDL:
                    <strong> {ExameLab.ldl}</strong>
                </div>
                <div className="Pergunta">
                    Triglicerídes:
                    <strong> {ExameLab.triglicerides}</strong>
                </div>
                <div className="Pergunta">
                    HIV:
                    <strong> {ExameLab.hiv}</strong>
                </div>
                <div className="Pergunta">
                    TGO:
                    <strong> {ExameLab.tgo}</strong>
                </div>
                <div className="Pergunta">
                    TGP:
                    <strong> {ExameLab.tgp}</strong>
                </div>
                <div className="Pergunta">
                    Bilirrubina Total e Frações:
                    <strong> {ExameLab.bt_e_fracoes}</strong>
                </div>
                <div className="Pergunta">
                    Ácido Úrico:
                    <strong> {ExameLab.acido_urico}</strong>
                </div>
                <div className="Pergunta">
                    PSA:
                    <strong> {ExameLab.psa}</strong>
                </div>
                <div className="Pergunta">
                    T3:
                    <strong> {ExameLab.t3}</strong>
                </div>
                <div className="Pergunta">
                    T4:
                    <strong> {ExameLab.t4}</strong>
                </div>
                <div className="Pergunta">
                    TSH:
                    <strong> {ExameLab.tsh}</strong>
                </div>
                <div className="Pergunta">
                    ASLO:
                    <strong> {ExameLab.aslo}</strong>
                </div>
                <div className="Pergunta">
                    Látex:
                    <strong> {ExameLab.latex}</strong>
                </div>
                <div className="Pergunta">
                    PCR:
                    <strong> {ExameLab.pcr}</strong>
                </div>
                <div className="Pergunta">
                    Mucoproteína:
                    <strong> {ExameLab.mucoproteina}</strong>
                </div>
                <div className="Pergunta">
                    Célula LE:
                    <strong> {ExameLab.celula_le}</strong>
                </div>
                <div className="Pergunta">
                    VDRL:
                    <strong> {ExameLab.vdrl}</strong>
                </div>
                <div className="Pergunta">
                    EAS:
                    <strong> {ExameLab.eas}</strong>
                </div>
                <div className="Pergunta">
                    EPF:
                    <strong> {ExameLab.epf}</strong>
                </div>
                <div className="Pergunta">
                    Determinação do Fator Reumatoide:
                    <strong> {ExameLab.determinacao_do_fator_reumatoide}</strong>
                </div>
                <div className="Pergunta">
                    Eritrograma - Eritrócitos:
                    <strong> {ExameLab.eritrograma_eritrocitos}</strong>
                </div>
                <div className="Pergunta">
                    Eritrograma - Hemoglobina:
                    <strong> {ExameLab.eritrograma_hemoglobina}</strong>
                </div>
                <div className="Pergunta">
                    Eritrograma - Hematócrito:
                    <strong> {ExameLab.eritrograma_hematocrito}</strong>
                </div>
                <div className="Pergunta">
                    Eritrograma - VCM:
                    <strong> {ExameLab.eritrograma_vcm}</strong>
                </div>
                <div className="Pergunta">
                    Eritrograma - HCM:
                    <strong> {ExameLab.eritrograma_hcm}</strong>
                </div>
                <div className="Pergunta">
                    Eritrograma - CHCM:
                    <strong> {ExameLab.eritrograma_chcm}</strong>
                </div>
                <div className="Pergunta">
                    Eritrograma - RDW:
                    <strong> {ExameLab.eritrograma_rdw}</strong>
                </div>
                <div className="Pergunta">
                    Eritrograma - RDW-FL:
                    <strong> {ExameLab.eritrograma_rdw_fl}</strong>
                </div>
                <div className="Pergunta">
                    Leucograma - Leucócitos:
                    <strong> {ExameLab.leucograma_leucocitos}</strong>
                </div>
                <div className="Pergunta">
                    Leucograma - Promielócitos:
                    <strong> {ExameLab.leucograma_promielocitos}</strong>
                </div>
                <div className="Pergunta">
                    Leucograma - Mielócitos:
                    <strong> {ExameLab.leucograma_mielocitos}</strong>
                </div>
                <div className="Pergunta">
                    Leucograma - Metamielócitos:
                    <strong> {ExameLab.leucograma_metamielocitos}</strong>
                </div>
                <div className="Pergunta">
                    Leucograma - Neutrófilos em Bastão:
                    <strong> {ExameLab.leucograma_neutrofilos_em_bastao}</strong>
                </div>
                <div className="Pergunta">
                    Leucograma - Neutrófilos Segmentados:
                    <strong> {ExameLab.leucograma_neutrofilos_segmentados}</strong>
                </div>
                <div className="Pergunta">
                    Leucograma - Eosinófilos:
                    <strong> {ExameLab.leucograma_eosinofilos}</strong>
                </div>
                <div className="Pergunta">
                    Leucograma - Basófilos:
                    <strong> {ExameLab.leucograma_basofilos}</strong>
                </div>
                <div className="Pergunta">
                    Leucograma - Linfócitos:
                    <strong> {ExameLab.leucograma_linfocitos}</strong>
                </div>
                <div className="Pergunta">
                    Leucograma - Monócitos:
                    <strong> {ExameLab.leucograma_monocitos}</strong>
                </div>
                <div className="Pergunta">
                    Data de Cadastro:
                    <strong> {formattedDateCreated}</strong>
                </div>
                <div className="Pergunta">
                    Última Atualização:
                    <strong> {formattedDateUpdated}</strong>
                </div>
            </td>
            <td className="BotaoTabela">
                <div className="ButaoEditar">
                    <button onClick={() => onEditarClick(ExameLab.id)}>
                        <AiOutlineEdit/>
                    </button>
                </div>
                <div className="ButaoRemover">
                    <button onClick={handleClickOpen}>
                        <IoMdRemoveCircleOutline/>
                    </button>
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
                                Tem certeza que você deseja apagar os dados desse paciente?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button onClick={handleSalvar} autoFocus>
                                Sim
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </td>
        </tr>
    );
}

function TabelaExameLab(props) {
    const [currentPage] = useState(1);
    const itemsPerPage = props.itemsPerPage;
    const totalPages = Math.ceil((props.data?.length || 0) / itemsPerPage);

    const handleEditarClick = (exameLabId) => {
        props.onEditarClick(exameLabId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return props.data.slice(startIndex, endIndex).map((ExameLab) => (
            <ExameLabLinha key={ExameLab.id} ExameLab={ExameLab} onEditarClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaExameLab">
            {props.data.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {props.data.length}.
                    </div>
                    <table>
                        <thead>
                        <tr className="Colunas">
                            <th>
                                <div className="ColunaInformacoes">Informações</div>
                            </th>
                            <th>
                                <div className="ColunaAcoes">Ações</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {getLinhas()}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}

export default TabelaExameLab;