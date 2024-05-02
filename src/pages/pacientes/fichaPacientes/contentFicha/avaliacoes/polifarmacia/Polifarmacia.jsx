import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaPolifarmacia from "./tabela/TabelaPolifarmacia";
import EditarPolifarmacia from "./editar/EditarPolifarmacia";
import AdicionarPolifarmacia from "./adicionar/AdicionarPolifarmacia";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function Polifarmacia() {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const navigate = useNavigate()
    const query = useQuery()
    const params = useParams()
    const { id } = params

    const handleEditarClick = (polifarmaciaId) => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=editar&infoId=${polifarmaciaId}`);

    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${id}?form=${query.get('form')}&view=adicionar`);
    }

    return (
        <div className="Polifarmacia">
            <PainelFicha titulo="2.1.1 Uso Concomitante de 5 ou mais Medicamentos?" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoPolifarmacia">
                    {query.get('view') === 'tabela' && (
                        <TabelaPolifarmacia
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                        />
                    )}
                    {query.get('view') === 'editar' && (
                        <EditarPolifarmacia/>
                    )}
                    {query.get('view') === 'adicionar' && (
                        <AdicionarPolifarmacia/>
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Polifarmacia;
