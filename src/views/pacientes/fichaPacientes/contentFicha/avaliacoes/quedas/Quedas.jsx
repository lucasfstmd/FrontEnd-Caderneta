import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaQueda from "./tabela/TabelaQueda";
import EditarQueda from "./editar/EditarQueda";
import AdicionarQueda from "./adicionar/AdicionarQueda";

function Quedas(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarQuedasId, setEditarQuedasId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (quedasId) => {
        setComponenteAtivo('editar');
        setEditarQuedasId(quedasId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarQuedasId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }
    return (
        <div className="Quedas">
            <PainelFicha titulo="2.9 Quedas" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaQueda
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                    <EditarQueda
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            quedaId={editarQuedasId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarQueda
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Quedas;