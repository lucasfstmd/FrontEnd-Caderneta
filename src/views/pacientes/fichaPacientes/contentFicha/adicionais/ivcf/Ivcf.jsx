import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import api from "../../../../../../service/api";
import TabelaIvcf from "./tabela/TabelaIvcf";
import EditarIvcf from "./editar/EditarIvcf";
import AdicionarIvcf from "./adicionar/AdicionarIvcf";

function Ivcf(props) {
    const [itemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [ivcf, setIvcf] = useState([]);
    const [editarIvcfId, setEditarIvcfId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (ivcfId) => {
        setComponenteAtivo('editar');
        setEditarIvcfId(ivcfId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarIvcfId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    useEffect(() => {
        async function carregarIvcfs() {
            try {
                const response = await api.get(
                    `v1/ivcfs/paciente/${props.pacienteId}`
                );
                setIvcf(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        carregarIvcfs();
    });

    const totalPages = Math.ceil((ivcf?.length || 0) / itemsPerPage);
    const pagesPerGroup = 10;
    const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getIvcfsPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return ivcf?.slice(inicio, fim) || [];
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
        <div className="Ivcf">
            <PainelFicha titulo="4.5 Índice de Vulnerabilidade Clínico-Funcional-20 (IVCF-20)" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <>
                            <TabelaIvcf
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onEditarClick={handleEditarClick}
                                pacienteId={props.pacienteId}
                                data={getIvcfsPagAtual()}
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
                        <EditarIvcf
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            ivcfId={editarIvcfId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarIvcf
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>

            </PainelFicha>
        </div>
    );
}

export default Ivcf;