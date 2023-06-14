import React from "react";
import "./MenuFicha.css";

function MenuFicha(props) {
    const { onItemClick } = props;

    const handleItemClick = (item) => {
        onItemClick(item);
    };

    return (
        <div className="MenuFicha">
            <div className="InformacoesFicha">
                <div className="InicioFicha">
                    <div className="OpcaoFicha" onClick={() => handleItemClick("inicio")}>
                        <strong>1. Inicio</strong>
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("editar-dados")}>
                        1.1 Editar Dados Pessoais
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("informacoes-sociais")}>
                        1.2 Informações sociais e familiares
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("pessoas-referencias")}>
                        1.3 Pessoas de Refêrencias
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("obitos")}>
                        1.4 Obitos
                    </div>
                </div>
                <div className="AvaliacaoFicha">
                    <div className="Titulo">
                        <strong>2. Avaliação da Pessoa Idosa</strong>
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("medicamentos")}>
                        2.1 Medicamentos, Fitoterápicos, Suplementos e Vitaminas em Uso
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("polifarmacia")}>
                        2.1.1 Polifarmácia
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("diagnosticos")}>
                        2.2 Diagnósticos e Internações Prévios
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("cirurgias")}>
                        2.3 Cirurgias Realizadas
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("reacoes")}>
                        2.4 Reações Adversas ou Alergias a Medicamentos
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("antropometricos")}>
                        2.5 Dados Antropométricos
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("perca-peso")}>
                        2.5.1 Controle de Perda de Peso
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("controle-peso")}>
                        2.5.2 Controle de Peso
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("protocolo-identificacao")}>
                        2.6 Protocolo de Identificação do Idoso Vulnerável (VES-13)
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("complementares")}>
                        2.7 Informações Complementares
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("ambientais")}>
                        2.8 Avaliação Ambiental
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("quedas")}>
                        2.9 Quedas
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("cronicas")}>
                        2.10 Identificação de Dor Crônica
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("intensidade")}>
                        2.10.1 Intensidade da Dor
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("habitos")}>
                        2.11 Hábitos de Vida
                    </div>
                </div>
                <div className="OutrasAvaliacoes">
                    <div className="Titulo">
                        <strong>3. Outras Avaliações</strong>
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("pressao")}>
                        3.1 Controle de Pressão Arterial
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("glicemia")}>
                        3.2 Controle de Glicemia
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("vacinacao")}>
                        3.3 Calendário de Vacinação
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("saude-buca")}>
                        3.4 Avalição de Saúde Buca
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("exames")}>
                        3.5 Agenda de Consultas e Exames
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("atualizacoes")}>
                        3.6 Atualizações da Caderneta
                    </div>
                </div>
                <div className="Adicionais">
                    <div className="Titulo">
                        <strong>4. Adicionais</strong>
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("identificacao")}>
                        4.1 Numero de Identificação
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("pcl")}>
                        4.2 PCL
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("forca-preensao")}>
                        4.3 Força de Preensão
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("sppb")}>
                        4.4 SPPB
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("ivcf")}>
                        4.5 IVCF-20
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("bioimpedancias")}>
                        4.6 Bioimpedâncias
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("exames-laboratoriais")}>
                        4.7 Exames Laboratoriais
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("frrisque")}>
                        4.8 Frrisque
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("infancia")}>
                        4.9 Circunstâncias Inicias da Vida e Adversidades na Infancia
                    </div>
                    <div className="OpcaoFicha" onClick={() => handleItemClick("sarcf-f")}>
                        4.10 SARC-F
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuFicha;
