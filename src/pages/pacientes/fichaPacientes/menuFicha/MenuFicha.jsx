import React from "react";
import "./MenuFicha.css";
import { Link } from 'react-router-dom'

function MenuFicha() {
    return (
        <div className="MenuFicha">
            <div className="InformacoesFicha">
                <div className="InicioFicha">
                    <Link to={'?form=inicio'} className="OpcaoFicha">
                        <strong>1. Inicio</strong>
                    </Link>
                    <Link to={'?form=editar-dados'} className="OpcaoFicha">
                        1.1 Editar Dados Pessoais
                    </Link>
                    <Link to={'?form=sociais&view=tabela'} className="OpcaoFicha">
                        1.2 Informações sociais e familiares
                    </Link>
                    <Link to={'?form=pessoas-referencias&view=tabela'} className="OpcaoFicha">
                        1.3 Pessoas de Refêrencias
                    </Link>
                    <Link to={'?form=obitos&view=tabela'} className="OpcaoFicha">
                        1.4 Obitos
                    </Link>
                </div>
                <div className="AvaliacaoFicha">
                    <div className="Titulo">
                        <strong>2. Avaliação da Pessoa Idosa</strong>
                    </div>
                    <Link to={'?form=medicamentos&view=tabela'} className="OpcaoFicha">
                        2.1 Medicamentos, Fitoterápicos, Suplementos e Vitaminas em Uso
                    </Link>
                    <Link to={'?form=polifarmacia&view=tabela'} className="OpcaoFicha">
                        2.1.1 Polifarmácia
                    </Link>
                    <Link to={'?form=diagnosticos&view=tabela'} className="OpcaoFicha">
                        2.2 Diagnósticos e Internações Prévios
                    </Link>
                    <Link to={'?form=cirurgias&view=tabela'} className="OpcaoFicha">
                        2.3 Cirurgias Realizadas
                    </Link>
                    <Link to={'?form=reacoes&view=tabela'} className="OpcaoFicha">
                        2.4 Reações Adversas ou Alergias a Medicamentos
                    </Link>
                    <Link to={'?form=antropometricos&view=tabela'} className="OpcaoFicha">
                        2.5 Dados Antropométricos
                    </Link>
                    <Link to={'?form=perca-peso&view=tabela'} className="OpcaoFicha">
                        2.5.1 Controle de Perda de Peso
                    </Link>
                    <Link to={'?form=controle-peso&view=tabela'} className="OpcaoFicha">
                        2.5.2 Controle de Peso
                    </Link>
                    <Link to={'?form=protocolo-identificacao&view=tabela'} className="OpcaoFicha">
                        2.6 Protocolo de Identificação do Idoso Vulnerável (VES-13)
                    </Link>
                     <Link to={'?form=complementares&view=tabela'} className="OpcaoFicha">
                         2.7 Informações Complementares
                    </Link>
                     <Link to={'?form=ambientais&view=tabela'} className="OpcaoFicha">
                         2.8 Avaliação Ambiental
                    </Link>
                    <Link to={'?form=quedas&view=tabela'} className="OpcaoFicha">
                        2.9 Quedas
                    </Link>
                    <Link to={'?form=cronicas&view=tabela'} className="OpcaoFicha">
                        2.10 Identificação de Dor Crônica
                    </Link>
                    <Link to={'?form=intensidade&view=tabela'} className="OpcaoFicha">
                        2.10.1 Intensidade da Dor
                    </Link>
                    <Link to={'?form=habitos&view=tabela'} className="OpcaoFicha">
                        2.11 Hábitos de Vida
                    </Link>
                </div>
                <div className="OutrasAvaliacoes">
                    <div className="Titulo">
                        <strong>3. Outras Avaliações</strong>
                    </div>
                    <Link to={'?form=pressao&view=tabela'} className="OpcaoFicha">
                        3.1 Controle de Pressão Arterial
                    </Link>
                    <Link to={'?form=glicemia&view=tabela'} className="OpcaoFicha">
                        3.2 Controle de Glicemia
                    </Link>
                    <Link to={'?form=vacinacao&view=tabela'} className="OpcaoFicha">
                        3.3 Calendário de Vacinação
                    </Link>
                    <Link to={'?form=saude-buca&view=tabela'} className="OpcaoFicha">
                        3.4 Avalição de Saúde Buca
                    </Link>
                    <Link to={'?form=exames&view=tabela'} className="OpcaoFicha">
                        3.5 Agenda de Consultas e Exames
                    </Link>
                    <Link to={'?form=atualizacoes&view=tabela'} className="OpcaoFicha">
                        3.6 Atualizações da Caderneta
                    </Link>
                </div>
                <div className="Adicionais">
                    <div className="Titulo">
                        <strong>4. Adicionais</strong>
                    </div>
                    <Link to={'?form=identificacao&view=tabela'} className="OpcaoFicha">
                        4.1 Numero de Identificação
                    </Link>
                    <Link to={'?form=pcl&view=tabela'} className="OpcaoFicha">
                        4.2 PCL
                    </Link>
                    <Link to={'?form=forca-preensao&view=tabela'} className="OpcaoFicha">
                        4.3 Força de Preensão
                    </Link>
                    <Link to={'?form=sppb&view=tabela'} className="OpcaoFicha">
                        4.4 SPPB
                    </Link>
                    <Link to={'?form=ivcf&view=tabela'} className="OpcaoFicha">
                        4.5 IVCF-20
                    </Link>
                    <Link to={'?form=bioimpedancias&view=tabela'} className="OpcaoFicha">
                        4.6 Bioimpedâncias
                    </Link>
                    <Link to={'?form=exames-laboratoriais&view=tabela'} className="OpcaoFicha">
                        4.7 Exames Laboratoriais
                    </Link>
                    <Link to={'?form=frrisque&view=tabela'} className="OpcaoFicha">
                        4.8 Frrisque
                    </Link>
                    <Link to={'?form=fragilidades&view=tabela'} className="OpcaoFicha">
                        4.9 Fragilidades
                    </Link>
                    <Link to={'?form=infancia&view=tabela'} className="OpcaoFicha">
                        4.10 Circunstâncias Inicias da Vida e Adversidades na Infancia
                    </Link>
                    <Link to={'?form=sarcf-f&view=tabela'} className="OpcaoFicha">
                        4.11 SARC-F
                    </Link>
                </div>
                <div className="Adicionais">
                    <div className="Titulo">
                        <strong>5. Saúde Mental</strong>
                    </div>
                    <Link to={'?form=usabilidade&view=tabela'} className="OpcaoFicha">
                        5.1 Questionário de Usabilidade
                    </Link>
                    <Link to={'?form=ipaq&view=tabela'} className="OpcaoFicha">
                        5.2 Questionário Internacional de Atividade Física (IPAQ) – Versão Curta
                    </Link>
                    <Link to={'?form=autorrelato-nocturia&view=tabela'} className="OpcaoFicha">
                        5.3 Autorrelato de Noctúria
                    </Link>
                    <Link to={'?form=psqi&view=tabela'} className="OpcaoFicha">
                        5.4 Índice de Qualidade de Sono de Pittsburgh em Português (PSQI-BR)
                    </Link>
                    <Link to={'?form=ese&view=tabela'} className="OpcaoFicha">
                        5.5 Escala de Sonolência de Epworth (ESE) para Avaliação do Sono
                    </Link>
                    <Link to={'?form=escala-depressao&view=tabela'} className="OpcaoFicha">
                        5.6 Escala de Depressão do Center Epidemiological Studies (Últimos 7 dias)
                    </Link>
                    <Link to={'?form=escala-estresse&view=tabela'} className="OpcaoFicha">
                        5.7 Escala de Estresse Percebido
                    </Link>
                    <Link to={'?form=gai&view=tabela'} className="OpcaoFicha">
                        5.8 Inventário de Ansiedade Geriátrica (GAI)
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MenuFicha;
