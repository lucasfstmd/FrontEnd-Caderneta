import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaVulnerabilidades from "./tabela/TabelaVulnerabilidades";
import EditarVulnerabilidades from "./editar/EditarVulnerabilidades";
import AdicionarVulnerabilidades from "./adicionar/AdicionarVulnerabilidades";
import api from "../../../../../../service/api";
import GraficoVES from "../../../../../../components/graficoVES/GraficoVES";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Vulnerabilidades(props) {
    const [itemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [vulnerabilidade, setVulnerabilidade] = useState([]);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params
    const [loading, setLoading] = useState(true)

    const handleEditarClick = (vulnerabilidadesId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${vulnerabilidadesId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    async function carregarVulnerabilidade() {
        try {
            const response = await api.get(
                `v1/vulnerabilidades/paciente/${id}`
            );
            setVulnerabilidade(response.data);
            setLoading(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarVulnerabilidade();
    }, []);

    const totalPages = Math.ceil((vulnerabilidade?.length || 0) / itemsPerPage);
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
                    {query.get('view') === 'tabela' && (
                        <>
                            <div className="Grafico" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <GraficoVES data={vulnerabilidade}/>
                            </div>
                            <TabelaVulnerabilidades
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onEditarClick={handleEditarClick}
                                data={getVulnerabilidadesPaginaAtual()}
                                loading={loading}
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
                    {query.get('view') === 'editar' && (
                        <EditarVulnerabilidades/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarVulnerabilidades/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Vulnerabilidades;
