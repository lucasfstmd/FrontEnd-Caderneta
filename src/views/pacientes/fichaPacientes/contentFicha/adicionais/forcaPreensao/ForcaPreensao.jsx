import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaForcaPreensao from "./tebela/TabelaForcaPreensao";
import EditarForcaPreensao from "./editar/EditarForcaPreensao";
import AdicionarForcaPreensao from "./adicionar/AdicionarForcaPreensao";

function ForcaPreensao(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarForcaPressaoID, setEditarForcaPressaoID] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (forcaPressaoId) => {
        setComponenteAtivo('editar');
        setEditarForcaPressaoID(forcaPressaoId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarForcaPressaoID(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="ForcaPressao">
            <PainelFicha titulo="4.3 Força de Preensão" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaForcaPreensao
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarForcaPreensao
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            forcaPressaoId={editarForcaPressaoID}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarForcaPreensao
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default ForcaPreensao;