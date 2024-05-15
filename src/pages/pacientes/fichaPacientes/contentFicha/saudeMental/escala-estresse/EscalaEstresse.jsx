import PainelFicha from '../../../../../../components/painelFicha/PainelFicha'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'
import React, { useEffect, useState } from 'react'
import api from '../../../../../../service/api'
import AdicionarEscalaEstresse from './adicionar/AdicionarEscalaEstresse'
import TabelaEscalaEstresse from './tabela/TabelaEscalaEstresse'
import EditarEscalaEstresse from './editar/EditarEscalaEstresse'

function EscalaEstresse() {
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [escEstress, setEscEstress] = useState([]);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params
    const [loading, setLoading] = useState(false)

    const handleEditarClick = (estressId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${estressId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    async function carregarEscalaDepre() {
        try {
            const response = await api.get(
                `v1/escala-estresse/paciente/${id}`
            );
            setEscEstress(response.data);
            setLoading(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarEscalaDepre();
    }, []);

    const totalPages = Math.ceil((escEstress?.length || 0) / itemsPerPage);
    const pagesPerGroup = 10;
    const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getBioimpedanciasPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return escEstress?.slice(inicio, fim) || [];
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
                titulo='5.7 Escala de Estresse Percebido'
                botaoNew={true}
                onAdicionarClick={handleAdicionarClick}
            >
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <>
                            <TabelaEscalaEstresse
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onEditarClick={handleEditarClick}
                                data={getBioimpedanciasPagAtual()}
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
                        <AdicionarEscalaEstresse/>
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarEscalaEstresse/>
                    )}
                </div>
            </PainelFicha>
        </div>
    )
}

export default EscalaEstresse;
