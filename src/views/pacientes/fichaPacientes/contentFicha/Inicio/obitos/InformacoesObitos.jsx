import React, {useState} from "react";
import "./InformacoesObitos.css"

import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaObitos from "./tabela/TabelaObitos";
import EditarObitos from "./editar/EditarObitos";
import AdicionarObitos from "./adicionar/AdicionarObitos";

function InformacoesObitos(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarObitosId, setEditarObitosId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (obitosId) => {
        setComponenteAtivo('editar');
        setEditarObitosId(obitosId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarObitosId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="Obitos">
            <PainelFicha titulo="1.4 Informações Obitos" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoObitos">
                    {componenteAtivo === 'tabela' && (
                        <TabelaObitos
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarObitos
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            obitosId={editarObitosId}
                        />
                    )}
                    {componenteAtivo === 'adicionar' && (
                        <AdicionarObitos
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default InformacoesObitos;