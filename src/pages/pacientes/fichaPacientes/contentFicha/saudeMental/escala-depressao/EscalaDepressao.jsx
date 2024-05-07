import PainelFicha from '../../../../../../components/painelFicha/PainelFicha'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'
import React, { useEffect, useState } from 'react'
import api from '../../../../../../service/api'
import TabelaEscalaDepressao from './tabela/TabelaEscalaDepressao'
import AdicionarEscalaDepressao from './adicionar/AdicionarEscalaDepressao'
import EditarEscalaDepressao from './editar/EditarEscalaDepressao'

function EscalaDepressao() {
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [escDepre, setEscDepre] = useState([
        {
            id: 0,
            p1: 1,
            p2: 3,
            p3: 0,
            p4: 2,
            p5: 1,
            p6: 2,
            p7: 0,
            p8: 3,
            p9: 3,
            p10: 2,
            p12: 2,
            p13: 1,
            p14: 0,
            p15: 2,
            p16: 3,
            p17: 1,
            p18: 2,
            p19: 0,
            p20: 3,
            score: 22,
            created: '2019-05-02T00:58:34.000Z',
            updated: '2019-05-02T00:58:34.000Z'
        }
    ]);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params
    const [loading, setLoading] = useState(false)

    const handleEditarClick = (ipaqId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${ipaqId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    async function carregarEscalaDepre() {
        try {
            const response = await api.get(
                `v1/escala-depressao/paciente/${id}`
            );
            setEscDepre(response.data);
            setLoading(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarEscalaDepre();
    }, []);

    const totalPages = Math.ceil((escDepre?.length || 0) / itemsPerPage);
    const pagesPerGroup = 10;
    const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getDataPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return escDepre?.slice(inicio, fim) || [];
    }

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
        <div className="Ipaq">
            <PainelFicha
                titulo='5.6 Escala de Depressão do Center Epidemiological Studies (Últimos 7 dias)'
                botaoNew={true}
                onAdicionarClick={handleAdicionarClick}
            >
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <>
                            <TabelaEscalaDepressao
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onEditarClick={handleEditarClick}
                                data={getDataPagAtual()}
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
                    {query.get('view') === 'adicionar' && (
                        <AdicionarEscalaDepressao/>
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarEscalaDepressao/>
                    )}
                </div>
            </PainelFicha>
        </div>
    )
}

export default EscalaDepressao;
