import React, {useState} from "react"
import "./TabelaUbs.css"
import api from "../../../service/api";
import Button from "@mui/material/Button";
import {IoMdRemoveCircleOutline} from "react-icons/io";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import {AiOutlineEdit} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

function UbsLinha({ data }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    async function handleDelet() {
        try {
            console.log(data.id);
            await api.delete(`v1/ubs/${data.id}`);
            window.location.reload(true);
        } catch (error) {
            console.log(error);
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
        <tr key={data.id} className="UbsLinha">
            <td className="TextosTabela">
                <div className="nomeUbs">
                    Nome: <strong>{data.nome}</strong>
                </div>
            </td>
            <td className="BotaoTabela">
                <div className="ButaoEditar">
                    <button onClick={() => navigate(`/caderneta/ubs/editar/${data.id}`)}>
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
                            {"Deseja realmente apagar essa UBS"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Tem certeza que você deseja apagar essa UBS?
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
    );
}

function TabelaUbs(props) {
    const [currentPage] = useState(1);
    const itemsPerPage = props.itemsPerPage;

    function getLinhas() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return props.data.slice(startIndex, endIndex).map((data) => (
            <UbsLinha key={data.id} data={data} />
        ));
    }

    return (
        <div className="TabelaUbs">
            <table>
                <thead>
                <tr className="Colunas">
                    <th>
                        <div className="ColunaNome">Nome</div>
                    </th>
                    <th>
                        <div className="ColunaAcoes">Ações</div>
                    </th>
                </tr>
                </thead>
                <tbody>{getLinhas()}</tbody>
            </table>
        </div>
    )
}

export default TabelaUbs;