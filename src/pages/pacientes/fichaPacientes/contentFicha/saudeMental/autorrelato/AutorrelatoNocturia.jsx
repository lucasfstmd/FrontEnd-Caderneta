import PainelFicha from '../../../../../../components/painelFicha/PainelFicha'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'
import EditarAutorrelato from './editar/EditarAutorrelato'
import TabelaAutorrelato from './tabela/TablelaAutorrelato'
import AdicionarAutorrelato from './adicionar/AdicionarAutorrelato'

function AutorrelatoNocturia() {
    const itemsPerPage = 20;
    const currentPage = 1;
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (autorrelatoId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${autorrelatoId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Autorrelato">
            <PainelFicha
                titulo='5.2 Autorrelato de Noctúria'
                botaoNew={true}
                onAdicionarClick={handleAdicionarClick}
            >
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaAutorrelato
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarAutorrelato/>
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarAutorrelato/>
                    )}
                </div>
            </PainelFicha>
        </div>
    )
}

export default AutorrelatoNocturia;
