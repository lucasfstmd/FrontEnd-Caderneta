import PainelFicha from '../../../../../../components/painelFicha/PainelFicha'
import TabelaUsabilidade from './tabela/TabelaUsabilidade'
import AdicionarUsabilidade from './adicionar/AdicionarUsabilidade'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'
import EditarUsabilidade from './editar/EditarUsabilidade'

function Usabilidade() {
    const itemsPerPage = 20;
    const currentPage = 1;
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (usabilidadeId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${usabilidadeId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Usabilidade">
            <PainelFicha
                titulo='5.1 Questionário de Usabilidade'
                botaoNew={true}
                onAdicionarClick={handleAdicionarClick}
            >
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaUsabilidade
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarUsabilidade/>
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarUsabilidade/>
                    )}
                </div>
            </PainelFicha>
        </div>
    )
}

export default Usabilidade;
