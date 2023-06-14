import React, {useState} from "react";
import "./PessoasReferencias.css"

import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaReferencias from "./tabela/TabelaReferencias";
import EditarReferencias from "./editar/EditarReferencias";
import AdicionarReferencias from "./adicionar/AdicionarReferencias";

function PessoasReferencias(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarRefernciasId, setEditarRefernciasId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (referenicaId) => {
        setComponenteAtivo('editar');
        setEditarRefernciasId(referenicaId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarRefernciasId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="PessoasReferencia">
            <PainelFicha titulo="1.3 Pessoas de Refência" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoReferencia">
                    {componenteAtivo === 'tabela' && (
                        <TabelaReferencias
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarReferencias
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            referenciaId={editarRefernciasId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarReferencias
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default PessoasReferencias;