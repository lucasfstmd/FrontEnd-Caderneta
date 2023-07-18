import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaReacoes from "./tabela/TabelaReacoes";
import EditarReacoes from "./editar/EditarReacoes";
import AdicionarReacoes from "./adicionar/AdicionarReacoes";

function Reacoes(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarReacoesId, setEditarReacoessId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (reacoesId) => {
        setComponenteAtivo('editar');
        setEditarReacoessId(reacoesId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarReacoessId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Reacoes">
            <PainelFicha titulo="2.4 Reações Adversas ou Alergias a Medicamentos" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoDiagnosticos">
                    {componenteAtivo === 'tabela' && (
                        <TabelaReacoes
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}
                    {componenteAtivo === 'editar' && (
                        <EditarReacoes
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            reacoesId={editarReacoesId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarReacoes
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Reacoes;