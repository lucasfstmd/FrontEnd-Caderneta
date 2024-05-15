import PainelFicha from '../../../../../../components/painelFicha/PainelFicha'
import TabelaPsqi from './tabela/TabelaPsqi'
import AdicionarPsqi from './adicionar/AdicionarPsqi'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'
import React, { useEffect, useState } from 'react'
import EditarPsqi from './editar/EditarPsqi'
import api from "../../../../../../service/api";

function Psqi() {
    const itemsPerPage = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [psqi, setPsqi] = useState([]);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params
    const [loading, setLaoding] = useState(false)

    const handleEditarClick = (psqiId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${psqiId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    async function carregarPsqi() {
        try {
            const response = await api.get(`v1/psqi/paciente/${id}`)
            setPsqi(response.data)
            setLaoding(false)
        } catch (err) {
            console.log(undefined)
        }
    }

    useEffect(() => {
        carregarPsqi()
    }, [])

    const totalPages = Math.ceil((psqi.length || 0) / itemsPerPage);
    const pagesPerGroup = 10;
    const currentPageGroup = Math.ceil(currentPage / pagesPerGroup)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const getPsqiPagAtual = () => {
        const inicio = ( currentPage - 1 ) * itemsPerPage
        const fim = inicio + itemsPerPage
        return psqi.slice(inicio, fim) || []
    }

    const renderGroups = () => {
        const groups = [];

        groups.push(
            <button
                key={1000}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </button>
        )

        const startGroup = (currentPageGroup - 1) * pagesPerGroup + 1
        const endGroup = Math.min(startGroup + pagesPerGroup - 1, totalPages)

        for (let i = startGroup; i <= endGroup; i++) {
            groups.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === 1 ? 'PaginaAtiva' : 'PaginaInativa'}
                >
                    {i}
                </button>
            )
        }

        groups.push(
            <button
                key={1001}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Próxima
            </button>
        )

        return groups
    }

    return (
        <div className="Usabilidade">
            <PainelFicha
                titulo='5.4 Índice de Qualidade de Sono de Pittsburgh em Português (PSQUI-BR)'
                botaoNew={true}
                onAdicionarClick={handleAdicionarClick}
            >
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <>
                            <TabelaPsqi
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                data={getPsqiPagAtual()}
                                loading={loading}
                                onEditarClick={handleEditarClick}
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
                        <AdicionarPsqi/>
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarPsqi/>
                    )}
                </div>
            </PainelFicha>
        </div>
    )
}

export default Psqi;
