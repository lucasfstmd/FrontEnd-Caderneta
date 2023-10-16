import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaSaudeBucal from "./tabela/TabelaSaudeBucal";
import AdicionarSaudeBucal from "./adicionar/AdicionarSaudeBucal";
import EditarSaudeBucal from "./editar/EditarSaudeBucal";
import api from "../../../../../../service/api";

function SaudeBuca(props) {
    const [itemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [saudeBucal, setSaudeBucal] = useState([]);
    const [editarSaudeBucalId, setEditarSaudeBucalId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');
    const [loading, setLoading] = useState(true)

    const handleEditarClick = (saudeBucalId) => {
        setComponenteAtivo('editar');
        setEditarSaudeBucalId(saudeBucalId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarSaudeBucalId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    async function carregarBucalSaudes() {
        try {
            const response = await api.get(
                `v1/bucal-saudes/paciente/${props.pacienteId}`
            );
            setSaudeBucal(response.data);
            setLoading(false)
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarBucalSaudes();
    }, []);

    const totalPages = Math.ceil((saudeBucal?.length || 0) / itemsPerPage);
    const pagesPerGroup = 10;
    const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getBucalSaudesPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return saudeBucal?.slice(inicio, fim) || [];
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
        <div className="SaudeBuca">
            <PainelFicha titulo="3.4 Avalição de Saúde Buca" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <>
                            <TabelaSaudeBucal
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onEditarClick={handleEditarClick}
                                pacienteId={props.pacienteId}
                                data={getBucalSaudesPagAtual()}
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

                    {componenteAtivo === 'editar' && (
                        <EditarSaudeBucal
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            saudeBucalId={editarSaudeBucalId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarSaudeBucal
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default SaudeBuca;
