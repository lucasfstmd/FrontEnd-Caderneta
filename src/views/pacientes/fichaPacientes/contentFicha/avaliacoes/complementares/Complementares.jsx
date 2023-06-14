import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaComplementares from "./tabela/TabelaComplementares";
import EditarComplementares from "./editar/EditarComplementares";
import AdicionarComplementares from "./adicionar/AdicionarComplementares";

function Complementares(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarComplementaresId, setEditarComplementaresId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (complementarId) => {
        setComponenteAtivo('editar');
        setEditarComplementaresId(complementarId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarComplementaresId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Complementares">
            <PainelFicha titulo="2.7 Informações Complementares" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaComplementares
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}
                    {componenteAtivo === 'editar' && (
                        <EditarComplementares
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            complementaresId={editarComplementaresId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarComplementares
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Complementares;