import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaCronicas from "./tabela/TabelaCronicas";
import EditarCronicas from "./editar/EditarCronicas";
import AdicionarCronicas from "./adicionar/AdicionarCronicas";

function Cronicas(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarCronicasId, setEditarCronicasId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (cronicasId) => {
        setComponenteAtivo('editar');
        setEditarCronicasId(cronicasId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarCronicasId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Cronicas">
            <PainelFicha titulo="2.10 Identificação de Dor Crônica" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaCronicas
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarCronicas
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            cronicasId={editarCronicasId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarCronicas
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Cronicas;