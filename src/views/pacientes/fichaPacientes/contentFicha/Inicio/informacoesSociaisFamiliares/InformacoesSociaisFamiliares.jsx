import React, {useState} from "react";
import "./InformacoesSociaisFamiliares.css";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaFamiliares from "./tabela/TabelaFamiliares";
import EditarFamiliares from "./editar/EditarFamiliares"
import AdicionarFamiliares from "./adicionar/AdicionarFamiliares";

function InformacoesSociaisFamiliares(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarFamiliaresId, setEditarFamiliaresId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');

    const handleEditarClick = (familiarId) => {
        setComponenteAtivo('editar');
        setEditarFamiliaresId(familiarId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarFamiliaresId(null);
    }

    const handleAdicionarClick = () => {
        setComponenteAtivo('adicionar');
    }

    return (
        <div className="InformacoesSociaisFamiliares">
            <PainelFicha titulo="1.2 Informações sociais e familiares" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoFamiliares">
                    {componenteAtivo === 'tabela' && (
                        <TabelaFamiliares
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {componenteAtivo === 'editar' && (
                        <EditarFamiliares
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            familiarId={editarFamiliaresId}
                        />
                    )}

                    {componenteAtivo === 'adicionar' && (
                        <AdicionarFamiliares
                            pacienteId={props.pacienteId}
                            onClose={handleFechar}
                        />
                    )}
                </div>
            </PainelFicha>
        </div>
    );
}

export default InformacoesSociaisFamiliares;