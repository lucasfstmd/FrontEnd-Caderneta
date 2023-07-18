import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaIntensidades from "./tabela/TabelaIntensidades";
import EditarIntensidades from "./editar/EditarIntensidades";
import AdicionarIntensidades from "./adicionar/AdicionarIntensidades";

function Intensidade(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarIntensidadesId, setEditarIntensidadesId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (intensidadesId) => {
        setComponenteAtivo('editar');
        setEditarIntensidadesId(intensidadesId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarIntensidadesId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Intensidade">
            <PainelFicha titulo="2.10.1 Intensidade da Dor" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaIntensidades
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarIntensidades
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            intensidadesId={editarIntensidadesId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarIntensidades
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Intensidade;