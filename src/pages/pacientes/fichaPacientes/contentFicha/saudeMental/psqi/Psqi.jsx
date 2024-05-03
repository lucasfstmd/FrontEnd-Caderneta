import PainelFicha from '../../../../../../components/painelFicha/PainelFicha'
import TabelaPsqi from './tabela/TabelaPsqi'
import AdicionarPsqi from './adicionar/AdicionarPsqi'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'
import React, { useEffect, useState } from 'react'
import api from '../../../../../../service/api'
import EditarPsqi from '../ipaq/editar/EditarPsqi'

function Psqi() {
    const itemsPerPage = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [psqi, setPsqi] = useState([
        {
            id: 0,
            p1: 'teste',
            p2: 'teste',
            p3: 'teste',
            p4: 'teste',
            p5_a: 0,
            p5_b: 0,
            p5_c: 0,
            p5_d: 0,
            p5_e: 0,
            p5_f: 0,
            p5_g: 0,
            p5_h: 0,
            p5_i: 'teste',
            p5_j: 0,
            p6: 0,
            p7: 0,
            p8: 0,
            p9: 0,
            p10: 0,
            p10_a: 0,
            p10_b: 0,
            p10_c: 0,
            p10_d: 0,
            p10_e_1: 'teste',
            p10_e_2: 0,
            created: '2019-05-02T00:58:34.000Z',
            updated: '2019-05-02T00:58:34.000Z'
        }
    ]);
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

/*    async function carregarPsqi() {
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
    }, [])*/

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
