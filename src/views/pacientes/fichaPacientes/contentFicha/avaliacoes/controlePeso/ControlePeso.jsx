import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaControlePeso from "./tabela/TabelaControlePeso";
import EditarControlePeso from "./editar/EditarControlePeso";
import AdicionarControlePeso from "./adicionar/AdicionarControlePeso";

function ControlePeso(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarControlePesoId, setEditarControlePesoId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (controlePesoId) => {
        setComponenteAtivo('editar');
        setEditarControlePesoId(controlePesoId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarControlePesoId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="ControlePeso">
            <PainelFicha titulo="2.5.2 Controle de Peso" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoReferencia">
                    {componenteAtivo === 'tabela' && (
                        <TabelaControlePeso
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarControlePeso
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            controlePesoId={editarControlePesoId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarControlePeso
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default ControlePeso;