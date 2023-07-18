import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaDiagnosticos from "./tabela/TabelaDiagnosticos";
import EditarDiagnosticos from "./editar/EditarDiagnosticos";
import AdicionarDiagnosticos from "./adicionar/AdicionarDiagnosticos";

function Diagnosticos(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarDiagnosticosId, setEditarDiagnosticosId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (diagnosticosId) => {
        setComponenteAtivo('editar');
        setEditarDiagnosticosId(diagnosticosId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarDiagnosticosId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Diagnosticos">
            <PainelFicha titulo="2.2 Diagnósticos e Internações Prévios" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoDiagnosticos">
                    {componenteAtivo === 'tabela' && (
                        <TabelaDiagnosticos
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}
                    {componenteAtivo === 'editar' && (
                        <EditarDiagnosticos
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            diagnosticosId={editarDiagnosticosId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarDiagnosticos
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Diagnosticos;