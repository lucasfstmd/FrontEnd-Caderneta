import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaPercaPeso from "./tebela/TebelaPercaPeso";
import EditarPercaPeso from "./editar/EditarPercaPeso";
import AdicionarPercaPeso from "./adicionar/AdicionarPercaPeso";

function PercaPeso(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarPercaPesoId, setEditarPercaPesoId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (percaPesoId) => {
        setComponenteAtivo('editar');
        setEditarPercaPesoId(percaPesoId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarPercaPesoId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="PercaPeso">
            <PainelFicha titulo="2.5.1 Controle de Perda de Peso" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaPercaPeso
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}
                    {componenteAtivo === 'editar' && (
                        <EditarPercaPeso
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            percaPesoId={editarPercaPesoId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarPercaPeso
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default PercaPeso;