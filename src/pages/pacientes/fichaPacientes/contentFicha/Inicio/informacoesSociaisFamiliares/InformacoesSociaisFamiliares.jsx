import React, {useState} from "react";
import "./InformacoesSociaisFamiliares.css";
import PainelFicha from "../../../../../../components/painelFicha/PainelFicha";
import TabelaFamiliares from "./tabela/TabelaFamiliares";
import EditarFamiliares from "./editar/EditarFamiliares"
import AdicionarFamiliares from "./adicionar/AdicionarFamiliares";
import { useNavigate } from 'react-router-dom'
import { useQuery } from '../../ContentFicha'

function InformacoesSociaisFamiliares(props) {
    const [itemsPerPage] = useState(20);
    const [currentPage] = useState(1);
    const [editarFamiliaresId, setEditarFamiliaresId] = useState(null);
    const [componenteAtivo, setComponenteAtivo] = useState('tabela');
    const navigate = useNavigate()
    const query = useQuery()

    const handleEditarClick = (familiarId) => {
        setComponenteAtivo('editar');
        setEditarFamiliaresId(familiarId);
    }

    const handleFechar = () => {
        setComponenteAtivo('tabela');
        setEditarFamiliaresId(null);
    }

    const handleAdicionarClick = () => {
        navigate(`/caderneta/pacientes/ficha/${props.pacienteId}?form=${query.get('form')}&view=adicionar`);
    }


    return (
        <div className="InformacoesSociaisFamiliares">
            <PainelFicha titulo="1.2 Informações sociais e familiares" botaoNew={true} onAdicionarClick={handleAdicionarClick}>
                <div className="ConteudoFamiliares">
                    {query.get('view') === 'tabela' && (
                        <TabelaFamiliares
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onEditarClick={handleEditarClick}
                            pacienteId={props.pacienteId}
                        />
                    )}

                    {query.get('view') === 'editar' && (
                        <EditarFamiliares
                            onClose={handleFechar}
                            pacienteId={props.pacienteId}
                            familiarId={editarFamiliaresId}
                        />
                    )}

                    {query.get('view') === 'adicionar' && (
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
