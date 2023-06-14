import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaVacina from "./tabela/TabelaVacina";
import EditarVacina from "./editar/EditarVacina";
import AdicionarVacina from "./adicionar/AdicionarVacina";

function Vacinacao(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarVacinaId, setEditarVacinaId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (vacinaId) => {
        setComponenteAtivo('editar');
        setEditarVacinaId(vacinaId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarVacinaId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Vacinacao">
            <PainelFicha titulo="3.3 Calendário de Vacinação" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaVacina
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarVacina
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            vacinaId={editarVacinaId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarVacina
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Vacinacao;