import React, {useState} from "react";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaPressao from "./tabela/TabelaPressao";
import EditarPressao from "./editar/EditarPressao";
import AdicionarPressao from "./adicionar/AdicionarPressao";

function Pressao(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarPressaoId, setEditarPressaoId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (pressaoId) => {
        setComponenteAtivo('editar');
        setEditarPressaoId(pressaoId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarPressaoId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Pressao">
            <PainelFicha titulo="3.1 Controle de Pressão Arterial" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="Conteudo">
                    {componenteAtivo === 'tabela' && (
                        <TabelaPressao
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarPressao
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            pressaoId={editarPressaoId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarPressao
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default Pressao;