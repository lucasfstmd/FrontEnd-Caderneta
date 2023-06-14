import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import api from "../../../../../../service/api";
import TabelaInfancias from "./tabela/TabelaInfancias";
import EditarInfancias from "./editar/EditarInfancias";
import AdicionarInfancias from "./adicionar/AdicionarInfancias";

function Infancia(props) {
    const [itemsPerPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [infancias, setInfancias] = useState([]);
    const [editarInfanciasId, setEditarInfanciasId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (infanciasId) => {
        setComponenteAtivo('editar');
        setEditarInfanciasId(infanciasId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarInfanciasId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    useEffect(() => {
        async function carregarInfancias() {
            try {
                const response = await api.get(
                    `v1/infancias/paciente/${props.pacienteId}`
                );
                setInfancias(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        carregarInfancias();
    });

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
            <PainelFicha titulo="4.9 Circunstâncias Inicias da Vida e Adversidades na Infancia" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <>
                            <TabelaInfancias
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onEditarClick={handleEditarClick}
                                pacienteId={props.pacienteId}
                                data={getInfanciasPagAtual()}
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
                        <EditarInfancias
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            infanciaId={editarInfanciasId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarInfancias
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>

            </PainelFicha>
        </div>
    );
}

export default Infancia;