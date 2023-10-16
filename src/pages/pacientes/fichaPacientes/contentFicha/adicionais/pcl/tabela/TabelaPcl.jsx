import React, {useEffect, useState} from "react";
import "./TabelaPcl.css"
import api from "../../../../../../../service/api";
import {format} from "date-fns";
import {AiOutlineEdit} from "react-icons/ai";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Loading from "../../../../../../../components/loading/Loading";
import {useParams} from "react-router-dom";

function PclLinha({ pcl, onEditClick }) {
    const [open, setOpen] = useState(false);

    const formattedDateCreated = format(new Date(pcl.created), "dd/MM/yyyy");
    const formattedDateUpdated = format(new Date(pcl.updated), "dd/MM/yyyy");

    const total = (pcl.p1 + pcl.p2 + pcl.p3 + pcl.p4 + pcl.p5 + pcl.p6 + pcl.p7 + pcl.p8 + pcl.p9 + pcl.p10 + pcl.p11 + pcl.p12 + pcl.p13 + pcl.p14 + pcl.p15 + pcl.p16 + pcl.p17 + pcl.p18 + pcl.p19 + pcl.p20 + pcl.p21 + pcl.p22 + pcl.p23 + pcl.p24 + pcl.p25 + pcl.p26 + pcl.p27 + pcl.p28 + pcl.p29 + pcl.p30 + pcl.p31 + pcl.p32 + pcl.p33);

    async function handleDelet() {
        try {
            await api.delete(`v1/pcls/${pcl.id}`);
        } catch (error) {
            console.log(undefined)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSalvar = () => {
        setOpen(false);
        handleDelet();
    }

    return (
        <tr key={pcl.id} className="PclLinha">
            <td className="TextosTabela">
                <div className="Pergunta">
                    Total:
                    <strong> {total}</strong>
                </div>
                <div className="Pergunta">
                    Data de Cadastro:
                    <strong> {formattedDateCreated}</strong>
                </div>
                <div className="Pergunta">
                    Última Atualização:
                    <strong> {formattedDateUpdated}</strong>
                </div>
            </td>
            <td className="BotaoTabela">
                <div className="ButaoEditar">
                    <button onClick={() => onEditClick(pcl.id)}>
                        <AiOutlineEdit/>
                    </button>
                </div>
                <div className="ButaoRemover">
                    <button onClick={handleClickOpen}>
                        <IoMdRemoveCircleOutline/>
                    </button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Deseja realmente alterar esse Paciente"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Tem certeza que você deseja apagar os dados desse paciente?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button onClick={handleSalvar} autoFocus>
                                Sim
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </td>
        </tr>
    )
}

function TabelaPcl(props) {
    const [pcls, setPcls] = useState([]);
    const [currentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const { id } = useParams();

    const itemsPerPage = props.itemsPerPage;

    async function carregarPcl() {
        try {
            const response = await api.get(
                `v1/pcls/paciente/${id}`
            );
            setPcls(response.data);
            setLoading(false);
        } catch (error) {
            console.log(undefined);
        }
    }

    useEffect(() => {
        carregarPcl();
    }, []);


    const totalPages = Math.ceil((pcls?.length || 0) / itemsPerPage);

    const getPclsPagAtual = () => {
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;
        return pcls?.slice(inicio, fim) || [];
    }

    const handleEditarClick = (pclsId) => {
        props.onEditarClick(pclsId);
    }

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return getPclsPagAtual().slice(startIndex, endIndex).map((pcl) => (
            <PclLinha key={pcl.id} pcl={pcl} onEditClick={handleEditarClick}/>
        ))
    }

    return (
        <div className="TabelaPcl">
            {pcls.length === 0 ? (
                <div className="InfoObitos">
                    <h1>Esse Paciente não possui dados Cadastrados.</h1>
                </div>
            ) : (
                <>
                    <div className="Paginas">
                        Pagina {currentPage} de {totalPages}, Total registros:{" "}
                        {pcls.length}.
                    </div>
                    <table>
                        <thead>
                        <tr className="Colunas">
                            <th>
                                <div className="ColunaInformacoes">Informações</div>
                            </th>
                            <th>
                                <div className="ColunaAcoes">Ações</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            <Loading loading={loading}>
                                {getLinhas()}
                            </Loading>
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}

export default TabelaPcl;
