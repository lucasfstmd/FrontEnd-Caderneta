import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaAntropometricos from "./tebela/TabelaAntropometricos";
import EditarAntropometricos from "./editar/EditarAntropometricos";
import AdicionarAntropometricos from "./adicionar/AdicionarAntropometricos";

function Antropometricos(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarAntropometricosId, setEditarAntropometricosId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (antropometricosId) => {
        setComponenteAtivo('editar');
        setEditarAntropometricosId(antropometricosId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarAntropometricosId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Antropometricos">
            <PainelFicha titulo="2.5 Dados Antropométricos" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoDiagnosticos">
                    {componenteAtivo === 'tabela' && (
                        <TabelaAntropometricos
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}
                    {componenteAtivo === 'editar' && (
                        <EditarAntropometricos
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            antropometricosId={editarAntropometricosId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarAntropometricos
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Antropometricos;