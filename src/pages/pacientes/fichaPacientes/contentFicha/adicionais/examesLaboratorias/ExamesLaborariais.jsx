import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import api from "../../../../../../service/api";
import TabelaExameLab from "./tabela/TabelaExameLab";
import EditarExameLab from "./editar/EditarExameLab";
import AdicionarExameLab from "./adicionar/AdicionarExameLab";

function ExamesLaborariais(props) {
    const [itemsPerPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [exameLab, setExameLab] = useState([]);
    const [editarExameLabId, setEditarExameLabId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (exameLabId) => {
        setComponenteAtivo('editar');
        setEditarExameLabId(exameLabId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarExameLabId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    async function carregarExamesLab() {
        try {
            const response = await api.get(
                `v1/laboratorial-exames/paciente/${props.pacienteId}`
            );
            setExameLab(response.data);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarExamesLab();
    }, []);

    const totalPages = Math.ceil((exameLab?.length || 0) / itemsPerPage);
    const pagesPerGroup = 10;
    const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getExamesLabPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return exameLab?.slice(inicio, fim) || [];
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
        <div className="ExamesLaborariais">
            <PainelFicha titulo="4.7 Exames Laboratoriais" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <>
                            <TabelaExameLab
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onEditarClick={handleEditarClick}
                                pacienteId={props.pacienteId}
                                data={getExamesLabPagAtual()}
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
                        <EditarExameLab
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            exameLabId={editarExameLabId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarExameLab
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default ExamesLaborariais;