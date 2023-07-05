import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaVulnerabilidades from "./tabela/TabelaVulnerabilidades";
import EditarVulnerabilidades from "./editar/EditarVulnerabilidades";
import AdicionarVulnerabilidades from "./adicionar/AdicionarVulnerabilidades";
import api from "../../../../../../service/api";
import GraficoVES from "../../../../../../components/graficoVES/GraficoVES";

function Vulnerabilidades(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarVulnerabilidadesId, setEditarVulnerabilidadesId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');
    const [vulnerabilidade, setVulnerabilidade] = useState([]);

    const handleEditarClick = (vulnerabilidadesId) => {
        setComponenteAtivo('editar');
        setEditarVulnerabilidadesId(vulnerabilidadesId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarVulnerabilidadesId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    useEffect(() => {
        async function carregarVulnerabilidade() {
            try {
                const response = await api.get(
                    `v1/vulnerabilidades/paciente/${props.pacienteId}`
                );
                setVulnerabilidade(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        carregarVulnerabilidade();
    });

    return (
        <div className="ProtocoloIdentificacao">
            <PainelFicha titulo="2.6 Protocolo de Identificação do Idoso Vulnerável (VES-13)" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <>
                            <div className="Grafico">
                                <GraficoVES data={vulnerabilidade}/>
                            </div>
                            <TabelaVulnerabilidades
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onEditarClick={handleEditarClick}
                                pacienteId={props.pacienteId}
                                data={vulnerabilidade}
                            />
                        </>
                    )}
                    {componenteAtivo === 'editar' && (
                        <EditarVulnerabilidades
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            vulnerabilidadeId={editarVulnerabilidadesId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarVulnerabilidades
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Vulnerabilidades;
