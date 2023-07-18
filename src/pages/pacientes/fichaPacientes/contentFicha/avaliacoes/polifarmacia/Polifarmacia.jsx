import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaPolifarmacia from "./tabela/TabelaPolifarmacia";
import EditarPolifarmacia from "./editar/EditarPolifarmacia";
import AdicionarPolifarmacia from "./adicionar/AdicionarPolifarmacia";

function Polifarmacia(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarPolifarmaciaId, setEditarPolifarmaciaId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (polifarmaciaId) => {
        setComponenteAtivo('editar');
        setEditarPolifarmaciaId(polifarmaciaId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarPolifarmaciaId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Polifarmacia">
            <PainelFicha titulo="2.1.1 Uso Concomitante de 5 ou mais Medicamentos?" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoPolifarmacia">
                    {componenteAtivo === 'tabela' && (
                        <TabelaPolifarmacia
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}
                    {componenteAtivo === 'editar' && (
                        <EditarPolifarmacia
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            polifarmaciaId={editarPolifarmaciaId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarPolifarmacia
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Polifarmacia;