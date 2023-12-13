import React from "react"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {CSVLink} from "react-csv";
import {AiOutlineDownload, AiFillCloseCircle} from "react-icons/ai";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom'


function ExportDialog(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Link onClick={handleClickOpen} style={{ textDecoration: 'none', color: '#1E90FF', margin: "1vh" }}>
                <strong>{props.name}</strong>
            </Link>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Baixar csv"}
                </DialogTitle>
                <DialogContent>
                    {props.loading ?
                        <DialogContentText id="alert-dialog-description">
                            Carregando CSV
                        </DialogContentText>
                        :
                        <DialogContentText id="alert-dialog-description">
                            Pronto!
                        </DialogContentText>
                        }
                </DialogContent>
                <DialogActions>
                    {props.loading ?
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <CircularProgress/>
                        </div>
                        :
                        <>
                            <Button onClick={handleClose} variant="outlined" color="success">
                                {props.headers ?
                                    <CSVLink style={{textDecoration: 'none', color: 'green'}}
                                             data={props.data}
                                             filename={props.fileName}
                                             headers={props.headers}
                                    >
                                        <AiOutlineDownload/> Baixar
                                    </CSVLink>
                                :
                                    <CSVLink style={{textDecoration: 'none', color: 'green'}} data={props.data}
                                             filename={props.fileName}>
                                        <AiOutlineDownload/> Baixar
                                    </CSVLink>
                                }

                            </Button>
                            <Button onClick={handleClose} variant="outlined" color="error">
                                <AiFillCloseCircle style={{marginRight: "1vh"}}/> Fechar
                            </Button>
                        </>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ExportDialog;
