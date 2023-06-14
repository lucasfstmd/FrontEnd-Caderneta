import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaAtualizacao from "./tabela/TabelaAtualizacao";
import EditarAtualizacao from "./editar/EditarAtualizacao";
import AdicionarAtualizacao from "./adicionar/AdicionarAtualizacao";

function Atualizacoes(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarAtualizacaoId, setEditarAtualizacaoId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (atualizacaoId) => {
        setComponenteAtivo('editar');
        setEditarAtualizacaoId(atualizacaoId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarAtualizacaoId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Atualizacoes">
            <PainelFicha titulo="3.6 Atualizações da Caderneta" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaAtualizacao
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarAtualizacao
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            atualizacaoId={editarAtualizacaoId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarAtualizacao
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Atualizacoes;