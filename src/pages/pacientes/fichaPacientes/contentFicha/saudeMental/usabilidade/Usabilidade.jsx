import { useState } from 'react'
import PainelFicha from '../../../../../../components/painelFicha/PainelFicha'
import TabelaUsabilidade from './tabela/TabelaUsabilidade'
import AdicionarUsabilidade from './adicionar/AdicionarUsabilidade'

function Usabilidade(props) {
    const itemsPerPage = 20;
    const currentPage = 1;
    const [editarUsabilidade, setEditarUsabilidade] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (usabilidadeId) => {
        setComponenteAtivo('editar');
        setEditarUsabilidade(usabilidadeId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarUsabilidade(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Usabilidade">
            <PainelFicha
                titulo='5.1 Questionário de Usabilidade'
                botaoNew={true}
                onAdicionarClick={handleAdicionarClick}
            >
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaUsabilidade
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacientId={props.pacienteId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarUsabilidade
                            pacienteId={props.pacientId}
                            onClose={handleFechar}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <>

                        </>
                    )}
                </div>
            </PainelFicha>
        </div>
    )
}

export default Usabilidade;
