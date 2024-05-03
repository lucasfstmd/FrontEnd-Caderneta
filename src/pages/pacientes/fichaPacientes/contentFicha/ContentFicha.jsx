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
import Ipaq from './saudeMental/ipaq/Ipaq'
import AutorrelatoNocturia from './saudeMental/autorrelato/AutorrelatoNocturia'
import Psqi from './saudeMental/psqi/Psqi'

export function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

export default function ContentFia(props) {
    const query = useQuery();
    const selectedItem = query.get('form');

    const renderContent = () => {
        if (selectedItem === "inicio") {
            return <RequestAuth><Inicio/></RequestAuth>;
        } else if (selectedItem === "editar-dados") {
            return <RequestAuth><EditarInformacoes /></RequestAuth>;
        } else if (selectedItem === "sociais") {
            return <RequestAuth><InformacoesSociaisFamiliares/></RequestAuth>;
        } else if (selectedItem === "pessoas-referencias") {
            return <RequestAuth><PessoasReferencias/></RequestAuth>;
        } else if (selectedItem === "obitos") {
            return <RequestAuth><InformacoesObitos/></RequestAuth>;
        } else if (selectedItem === "medicamentos") {
            return <RequestAuth><Medicamentos/></RequestAuth>;
        } else if (selectedItem === "polifarmacia") {
            return <RequestAuth><Polifarmacia/></RequestAuth>;
        } else if (selectedItem === "diagnosticos") {
            return <RequestAuth><Diagnosticos/></RequestAuth>;
        } else if (selectedItem === "cirurgias") {
            return <RequestAuth><Cirurgias/></RequestAuth>;
        } else if (selectedItem === "reacoes") {
            return <RequestAuth><Reacoes/></RequestAuth>;
        } else if (selectedItem === "antropometricos") {
            return <RequestAuth><Antropometricos/></RequestAuth>;
        } else if (selectedItem === "perca-peso") {
            return <RequestAuth><PercaPeso/></RequestAuth>;
        } else if (selectedItem === "controle-peso") {
            return <RequestAuth><ControlePeso/></RequestAuth>;
        } else if (selectedItem === "protocolo-identificacao") {
            return <RequestAuth><Vulnerabilidades/></RequestAuth>;
        } else if (selectedItem === "complementares") {
            return <RequestAuth><Complementares/></RequestAuth>;
        } else if (selectedItem === "ambientais") {
            return <RequestAuth><Ambientais/></RequestAuth>;
        } else if (selectedItem === "quedas") {
            return <RequestAuth><Quedas/></RequestAuth>;
        } else if (selectedItem === "cronicas") {
            return <RequestAuth><Cronicas/></RequestAuth>;
        } else if (selectedItem === "intensidade") {
            return <RequestAuth><Intensidade/></RequestAuth>;
        } else if (selectedItem === "habitos") {
            return <RequestAuth><Habitos/></RequestAuth>;
        } else if (selectedItem === "pressao") {
            return <RequestAuth><Pressao/></RequestAuth>
        } else if (selectedItem === "glicemia") {
            return <RequestAuth><Glicemia/></RequestAuth>;
        } else if (selectedItem === "vacinacao") {
            return <RequestAuth><Vacinacao/></RequestAuth>;
        } else if (selectedItem === "saude-buca") {
            return <RequestAuth><SaudeBuca/></RequestAuth>;
        } else if (selectedItem === "exames") {
            return <RequestAuth><Exames/></RequestAuth>;
        } else if (selectedItem === "atualizacoes") {
            return <RequestAuth><Atualizacoes/></RequestAuth>;
        } else if (selectedItem === "identificacao") {
            return <RequestAuth><Identificacao/></RequestAuth>;
        } else if (selectedItem === "pcl") {
            return <RequestAuth><Pcl/></RequestAuth>;
        } else if (selectedItem === "forca-preensao") {
            return <RequestAuth><ForcaPreensao/></RequestAuth>;
        } else if (selectedItem === "sppb") {
            return <RequestAuth><Sppb/></RequestAuth>;
        } else if (selectedItem === "ivcf") {
            return <RequestAuth>/></RequestAuth>;
        } else if (selectedItem === "bioimpedancias") {
            return <RequestAuth><Bioimpedancias/></RequestAuth>;
        } else if (selectedItem === "exames-laboratoriais") {
            return <RequestAuth><ExamesLaborariais/></RequestAuth>;
        } else if (selectedItem === "frrisque") {
            return <RequestAuth><Frrisque/></RequestAuth>;
        } else if (selectedItem === "fragilidades") {
            return <RequestAuth><Fragilidades/></RequestAuth>
        }else if (selectedItem === "infancia") {
            return <RequestAuth><Infancia/></RequestAuth>;
        } else if (selectedItem === "sarcf-f") {
            return <RequestAuth><Sarcf/></RequestAuth>;
        } else if (selectedItem === "usabilidade")  {
            return <RequestAuth><Usabilidade/></RequestAuth>
        } else if (selectedItem === "ipaq")  {
            return <RequestAuth><Ipaq/></RequestAuth>
        } else if (selectedItem === "autorrelato-nocturia")  {
            return <RequestAuth><AutorrelatoNocturia/></RequestAuth>
        } else if (selectedItem === "psqi")  {
            return <RequestAuth><Psqi/></RequestAuth>
        }
        else {
            return <RequestAuth><Inicio/></RequestAuth>;
        }
    }

    return (
        <div className="ContentFicha">
            <div className="ItemContente">{renderContent()}</div>
        </div>
    );
}
