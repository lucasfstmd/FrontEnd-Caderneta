import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import api from "../../../../../../service/api";
import TabelaInfancias from "./tabela/TabelaInfancias";
import EditarInfancias from "./editar/EditarInfancias";
import AdicionarInfancias from "./adicionar/AdicionarInfancias";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Infancia(props) {
    const [itemsPerPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [infancias, setInfancias] = useState([]);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params
    const [loading, setLoading] = useState(true)

    const handleEditarClick = (infanciasId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${infanciasId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    async function carregarInfancias() {
        try {
            const response = await api.get(
                `v1/infancias/paciente/${id}`
            );
            setInfancias(response.data);
            setLoading(false);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarInfancias();
    }, []);

    const totalPages = Math.ceil((infancias?.length || 0) / itemsPerPage);
    const pagesPerGroup = 10;
    const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getInfanciasPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return infancias?.slice(inicio, fim) || [];
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
        <div className="Infancia">
            <PainelFicha titulo="4.10 Circunstâncias Inicias da Vida e Adversidades na Infancia" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <>
                            <TabelaInfancias
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onEditarClick={handleEditarClick}
                                data={getInfanciasPagAtual()}
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
                        <EditarInfancias/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarInfancias/>
                    )}
                </div>

            </PainelFicha>
        </div>
    );
}

export default Infancia;
