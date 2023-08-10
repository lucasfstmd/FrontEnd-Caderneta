import React, {useEffect, useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import api from "../../../../../../service/api";
import TabelaBioimpedancias from "./tabela/TabelaBioimpedancias";
import EditarBioimpedancias from "./editar/EditarBioimpedancias";
import AdicionarBioimpedancias from "./adicionar/AdicionarBioimpedancias";

function Bioimpedancias(props) {
    const [itemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [bioimpedancias, setBioimpedancias] = useState([]);
    const [editarBioimpedanciaId, setEditarBioimpedanciaId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (bioimpedanciaId) => {
        setComponenteAtivo('editar');
        setEditarBioimpedanciaId(bioimpedanciaId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarBioimpedanciaId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    useEffect(() => {
        async function carregarBioimpedancias() {
            try {
                const response = await api.get(
                    `v1/bioimpedancias/paciente/${props.pacienteId}`
                );
                setBioimpedancias(response.data);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setOpenErro400(true);
                } else if (error.response && error.response.status === 500) {
                    setOpenErro500(true);
                }
            }
        }

        carregarBioimpedancias();
    });

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
                    {componenteAtivo === 'tabela' && (
                        <>
                            <TabelaBioimpedancias
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onEditarClick={handleEditarClick}
                                pacienteId={props.pacienteId}
                                data={getBioimpedanciasPagAtual()}
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
                        <EditarBioimpedancias
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            bioimpedanciaId={editarBioimpedanciaId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarBioimpedancias
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Bioimpedancias;