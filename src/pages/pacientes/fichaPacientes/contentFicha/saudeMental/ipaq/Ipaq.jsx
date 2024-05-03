import PainelFicha from '../../../../../../components/painelFicha/PainelFicha'
import TabelaIpaq from './tabela/TabelaIpaq'
import AdicionarIpaq from './adicionar/AdicionarIpaq'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'
import EditarPsqi from './editar/EditarPsqi'

function Ipaq() {
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
                titulo='5.1 Questionário Internacional de Atividade Física (IPAQ) - Versão Curta'
                botaoNew={true}
                onAdicionarClick={handleAdicionarClick}
            >
                <div className="Conteudo">
                    {query.get('view') === 'tabela' && (
                        <TabelaIpaq
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarIpaq/>
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarPsqi/>
                    )}
                </div>
            </PainelFicha>
        </div>
    )
}

export default Ipaq;
