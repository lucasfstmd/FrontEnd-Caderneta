import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaGlicemia from "./tabela/TabelaGlicemia";
import EditarGlicemia from "./editar/EditarGlicemia";
import AdicionarGlicemia from "./adicionar/AdicionarGlicemia";

function Glicemia(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarGlicemiaId, setEditarGlicemiaId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (glicemiaId) => {
        setComponenteAtivo('editar');
        setEditarGlicemiaId(glicemiaId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarGlicemiaId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Glicemia">
            <PainelFicha titulo="3.2 Controle de Glicemia" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaGlicemia
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarGlicemia
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            glicemiaId={editarGlicemiaId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarGlicemia
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Glicemia;