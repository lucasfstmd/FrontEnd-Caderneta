import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaExame from "./tabela/TabelaExame";
import EditarExame from "./editar/EditarExame";
import AdicionarExame from "./adicionar/AdicionarExame";

function Exames(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarExamesId, setEditarExamesId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (examesId) => {
        setComponenteAtivo('editar');
        setEditarExamesId(examesId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarExamesId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Exames">
            <PainelFicha titulo="3.5 Agenda de Consultas e Exames" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaExame
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarExame
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            exameId={editarExamesId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarExame
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Exames;