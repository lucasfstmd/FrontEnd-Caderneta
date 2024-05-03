import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import api from "../../../../../../service/api";
import TabelaBioimpedancias from "./tabela/TabelaBioimpedancias";
import EditarBioimpedancias from "./editar/EditarBioimpedancias";
import AdicionarBioimpedancias from "./adicionar/AdicionarBioimpedancias";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Bioimpedancias() {
    const [itemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [bioimpedancias, setBioimpedancias] = useState([]);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params
    const [loading, setLoading] = useState(true)

    const handleEditarClick = (bioimpedanciaId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${bioimpedanciaId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    async function carregarBioimpedancias() {
        try {
            const response = await api.get(
                `v1/bioimpedancias/paciente/${id}`
            );
            setBioimpedancias(response.data);
            setLoading(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarBioimpedancias();
    }, []);

    const totalPages = Math.ceil((bioimpedancias?.length || 0) / itemsPerPage);
    const pagesPerGroup = 10;
    const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getBioimpedanciasPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return bioimpedancias?.slice(inicio, fim) || [];
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
        <div className="Bioimpedancias">
            <PainelFicha titulo="4.6 Bioimpedâncias" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <>
                            <TabelaBioimpedancias
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

                    {query.get('view') === 'editar' && (
                        <EditarBioimpedancias/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarBioimpedancias/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Bioimpedancias;
