import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaAmbientais from "./tabela/TabelaAmbientais";
import EditarAmbientais from "./editar/EditarAmbientais";
import AdicionarAmbientais from "./adicionar/AdicionarAmbientais";

function Ambientais(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarAmbientaisId, setEditarAmbientaisId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (ambientaisId) => {
        setComponenteAtivo('editar');
        setEditarAmbientaisId(ambientaisId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarAmbientaisId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Ambientais">
            <PainelFicha titulo="2.8 Avaliação Ambiental" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaAmbientais
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarAmbientais
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            ambientaisId={editarAmbientaisId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarAmbientais
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Ambientais;