import PainelFicha from '../../../../../../components/painelFicha/PainelFicha'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'
import React, { useEffect, useState } from 'react'
import api from '../../../../../../service/api'
import EditarAnsiedade from './editar/EditarAnsiedade'
import TabelaAnsiedade from './tabela/TabelaAnsiedade'
import AdicionarAnsiedade from './adicionar/AdicionarAnsiedade'

function Ansiedade() {
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [ansiedade, setAnsiedade] = useState([
        {
            id: 0,
            p1: 1,
            p2: 1,
            p3: 0,
            p4: 1,
            p5: 1,
            p6: 1,
            p7: 0,
            p8: 0,
            p9: 1,
            p10: 0,
            p12: 0,
            p13: 1,
            p14: 0,
            p15: 0,
            p16: 1,
            p17: 1,
            p18: 0,
            p19: 0,
            p20: 1,
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
            setAnsiedade(response.data);
            setLoading(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarEscalaDepre();
    }, []);

    const totalPages = Math.ceil((ansiedade?.length || 0) / itemsPerPage);
    const pagesPerGroup = 10;
    const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getDataPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return ansiedade?.slice(inicio, fim) || [];
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
                titulo='5.8 Inventário de Ansiedade Geriátrica'
                botaoNew={true}
                onAdicionarClick={handleAdicionarClick}
            >
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <>
                            <TabelaAnsiedade
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
                        <AdicionarAnsiedade/>
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarAnsiedade/>
                    )}
                </div>
            </PainelFicha>
        </div>
    )
}

export default Ansiedade;
