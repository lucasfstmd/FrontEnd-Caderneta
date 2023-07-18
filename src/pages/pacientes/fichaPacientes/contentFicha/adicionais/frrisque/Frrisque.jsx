import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaFrrisques from "./tabela/TabelaFrrisques";
import EditarFrrisques from "./editar/EditarFrrisques";
import AdicionarFrrisques from "./adicionar/AdicionarFrrisques";

function Frrisque(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarFrrisquesId, setEditarFrrisquesId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (frrisquesId) => {
        setComponenteAtivo('editar');
        setEditarFrrisquesId(frrisquesId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarFrrisquesId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Frrisque">
            <PainelFicha titulo="4.8 Frrisque" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaFrrisques
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarFrrisques
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            frrisquesId={editarFrrisquesId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarFrrisques
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Frrisque;