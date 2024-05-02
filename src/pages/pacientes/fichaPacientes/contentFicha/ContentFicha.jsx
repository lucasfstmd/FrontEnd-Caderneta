import React, { useMemo } from 'react'
import "./ContentFicha.css";

import Inicio from "./Inicio/Inicio";
import EditarInformacoes from "./Inicio/editarInformacoes/EditarInformacoes";
import InformacoesSociaisFamiliares from "./Inicio/informacoesSociaisFamiliares/InformacoesSociaisFamiliares";
import PessoasReferencias from "./Inicio/pessoasReferencia/PessoasReferencias";
import InformacoesObitos from "./Inicio/obitos/InformacoesObitos";
import Medicamentos from "./avaliacoes/medicamentos/Medicamentos";
import Polifarmacia from "./avaliacoes/polifarmacia/Polifarmacia";
import Diagnosticos from "./avaliacoes/diagnosticos/Diagnosticos";
import Cirurgias from "./avaliacoes/cirurgias/Cirurgias";
import Reacoes from "./avaliacoes/reacoes/Reacoes";
import Antropometricos from "./avaliacoes/antropometricos/Antropometricos";
import PercaPeso from "./avaliacoes/percaPeso/PercaPeso";
import ControlePeso from "./avaliacoes/controlePeso/ControlePeso";
import Vulnerabilidades from "./avaliacoes/protocoloIdentificacao/Vulnerabilidades";
import Complementares from "./avaliacoes/complementares/Complementares";
import Ambientais from "./avaliacoes/ambientais/Ambientais";
import Quedas from "./avaliacoes/quedas/Quedas";
import Cronicas from "./avaliacoes/cronicas/Cronicas";
import Intensidade from "./avaliacoes/intensidade/Intensidade";
import Habitos from "./avaliacoes/habitos/Habitos";
import Pressao from "./outrasAvaliacoes/pressao/Pressao";
import Glicemia from "./outrasAvaliacoes/glicemia/Glicemia";
import Vacinacao from "./outrasAvaliacoes/vacinacao/Vacinacao";
import SaudeBuca from "./outrasAvaliacoes/saudeBuca/SaudeBuca";
import Exames from "./outrasAvaliacoes/exames/Exames";
import Atualizacoes from "./outrasAvaliacoes/atualizacoes/Atualizacoes";
import Identificacao from "./adicionais/identificacao/Identificacao";
import Pcl from "./adicionais/pcl/Pcl";
import ForcaPreensao from "./adicionais/forcaPreensao/ForcaPreensao";
import Sppb from "./adicionais/sppb/Sppb";
import Ivcf from "./adicionais/ivcf/Ivcf";
import Bioimpedancias from "./adicionais/bioimpedancias/Bioimpedancias";
import ExamesLaborariais from "./adicionais/examesLaboratorias/ExamesLaborariais";
import Frrisque from "./adicionais/frrisque/Frrisque";
import Infancia from "./adicionais/infancia/Infancia";
import Sarcf from "./adicionais/sarcf/Sarcf";
import RequestAuth from "../../../../service/auth/RequestAuth";
import Fragilidades from "./adicionais/fragilidades/Fragilidades";
import Usabilidade from './saudeMental/usabilidade/Usabilidade'
import { useLocation } from 'react-router-dom'

export function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

export default function ContentFia(props) {
    const query = useQuery();
    const selectedItem = query.get('form');

    const renderContent = () => {
        if (selectedItem === "inicio") {
            return <RequestAuth><Inicio pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "editar-dados") {
            return <RequestAuth><EditarInformacoes pacienteId={props.pacienteId} /></RequestAuth>;
        } else if (selectedItem === "sociais") {
            return <RequestAuth><InformacoesSociaisFamiliares pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "pessoas-referencias") {
            return <RequestAuth><PessoasReferencias pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "obitos") {
            return <RequestAuth><InformacoesObitos pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "medicamentos") {
            return <RequestAuth><Medicamentos pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "polifarmacia") {
            return <RequestAuth><Polifarmacia pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "diagnosticos") {
            return <RequestAuth><Diagnosticos pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "cirurgias") {
            return <RequestAuth><Cirurgias pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "reacoes") {
            return <RequestAuth><Reacoes pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "antropometricos") {
            return <RequestAuth><Antropometricos pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "perca-peso") {
            return <RequestAuth><PercaPeso pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "controle-peso") {
            return <RequestAuth><ControlePeso pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "protocolo-identificacao") {
            return <RequestAuth><Vulnerabilidades pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "complementares") {
            return <RequestAuth><Complementares pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "ambientais") {
            return <RequestAuth><Ambientais pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "quedas") {
            return <RequestAuth><Quedas pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "cronicas") {
            return <RequestAuth><Cronicas pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "intensidade") {
            return <RequestAuth><Intensidade pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "habitos") {
            return <RequestAuth><Habitos pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "pressao") {
            return <RequestAuth><Pressao pacienteId={props.pacienteId}/></RequestAuth>
        } else if (selectedItem === "glicemia") {
            return <RequestAuth><Glicemia pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "vacinacao") {
            return <RequestAuth><Vacinacao pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "saude-buca") {
            return <RequestAuth><SaudeBuca pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "exames") {
            return <RequestAuth><Exames pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "atualizacoes") {
            return <RequestAuth><Atualizacoes pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "identificacao") {
            return <RequestAuth><Identificacao pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "pcl") {
            return <RequestAuth><Pcl pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "forca-preensao") {
            return <RequestAuth><ForcaPreensao pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "sppb") {
            return <RequestAuth><Sppb pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "ivcf") {
            return <RequestAuth><Ivcf pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "bioimpedancias") {
            return <RequestAuth><Bioimpedancias pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "exames-laboratoriais") {
            return <RequestAuth><ExamesLaborariais pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "frrisque") {
            return <RequestAuth><Frrisque pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "fragilidades") {
            return <RequestAuth><Fragilidades pacienteId={props.pacienteId}/></RequestAuth>
        }else if (selectedItem === "infancia") {
            return <RequestAuth><Infancia pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "sarcf-f") {
            return <RequestAuth><Sarcf pacienteId={props.pacienteId}/></RequestAuth>;
        } else if (selectedItem === "usabilidade")  {
            return <RequestAuth><Usabilidade pacientId={props.pacienteId}/></RequestAuth>
        }
        else {
            return <RequestAuth><Inicio pacienteId={props.pacienteId}/></RequestAuth>;
        }
    }

    return (
        <div className="ContentFicha">
            <div className="ItemContente">{renderContent()}</div>
        </div>
    );
}
