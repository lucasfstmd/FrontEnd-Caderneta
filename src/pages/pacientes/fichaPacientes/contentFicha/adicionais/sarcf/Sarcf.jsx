import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaSarcf from "./tabela/TabelaSarcf";
import EditarSarcf from "./editar/EditarSarcf";
import AdicionarSarcf from "./adicionar/AdicionarSarcf";

function Sarcf(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarSarcfId, setEditarSarcfId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (sarcfId) => {
        setComponenteAtivo('editar');
        setEditarSarcfId(sarcfId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarSarcfId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Sarc">
            <PainelFicha titulo="4.11 Sarcfs" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoDiagnosticos">
                    {componenteAtivo === 'tabela' && (
                        <TabelaSarcf
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}
                    {componenteAtivo === 'editar' && (
                        <EditarSarcf
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            sarcfId={editarSarcfId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarSarcf
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Sarcf;