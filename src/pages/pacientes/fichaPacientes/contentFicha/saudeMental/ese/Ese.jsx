import PainelFicha from '../../../../../../components/painelFicha/PainelFicha'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'
import TabelaEse from './tabela/TabelaEse'
import AdicionarEse from './adicionar/AdicionarEse'
import EditarEse from './editar/EditarEse'

function Ese() {
    const itemsPerPage = 20;
    const currentPage = 1;
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (ipaqId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${ipaqId}`);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Ipaq">
            <PainelFicha
                titulo='5.5 Escala de Sonolência de Epworth (ESE) Para Avaliação de Sono'
                botaoNew={true}
                onAdicionarClick={handleAdicionarClick}
            >
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaEse
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarEse/>
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarEse/>
                    )}
                </div>
            </PainelFicha>
        </div>
    )
}

export default Ese;
