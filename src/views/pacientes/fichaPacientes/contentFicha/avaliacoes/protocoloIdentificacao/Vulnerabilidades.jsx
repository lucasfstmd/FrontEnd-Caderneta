import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaVulnerabilidades from "./tabela/TabelaVulnerabilidades";
import EditarVulnerabilidades from "./editar/EditarVulnerabilidades";
import AdicionarVulnerabilidades from "./adicionar/AdicionarVulnerabilidades";
import api from "../../../../../../service/api";
import GraficoVES from "../../../../../../components/graficoVES/GraficoVES";

function Vulnerabilidades(props) {
    const [itemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [vulnerabilidade, setVulnerabilidade] = useState([]);
    const [editarVulnerabilidadesId, setEditarVulnerabilidadesId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

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

    const totalPages = Math.ceil((props.data?.length || 0) / itemsPerPage);
    const pagesPerGroup = 10;
    const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getVulnerabilidadesPaginaAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return vulnerabilidade?.slice(inicio, fim) || [];
    };

    const renderGroups = () => {
        const groups = [];

        // Primeira página
        groups.push(
            <button
                key={1000}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </button>
        );

        const startGroup = (currentPageGroup - 1) * pagesPerGroup + 1;
        const endGroup = Math.min(startGroup + pagesPerGroup - 1, totalPages);

        for (let i = startGroup; i <= endGroup; i++) {
            groups.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? "PaginaAtiva" : "PaginaInativa"}
                >
                    {i}
                </button>
            );
        }

        groups.push(
            <button
                key={1001}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Próxima
            </button>
        );

        return groups;
    };

    return (
        <div className="ProtocoloIdentificacao">
            <PainelFicha titulo="2.6 Protocolo de Identificação do Idoso Vulnerável (VES-13)" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <>
                            <div className="Grafico" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <GraficoVES data={vulnerabilidade}/>
                            </div>
                            <TabelaVulnerabilidades
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onEditarClick={handleEditarClick}
                                pacienteId={props.pacienteId}
                                data={getVulnerabilidadesPaginaAtual()}
                            />
                            <div className="Paginacao">
                                <button
                                    key="primeira"
                                    onClick={() => handlePageChange(1)}
                                    disabled={currentPage === 1}
                                >
                                    Primeira
                                </button>
                                {renderGroups()}
                                <button
                                    key="ultima"
                                    onClick={() => handlePageChange(totalPages)}
                                    disabled={currentPage === totalPages}
                                >
                                    Última
                                </button>
                            </div>
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
