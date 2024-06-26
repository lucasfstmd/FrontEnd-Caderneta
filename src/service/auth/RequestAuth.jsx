import React, {useEffect, useState} from "react"
import {isAuthenticated, logout, TOKEN_KEY} from "./auth";
import api from "../api";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContent, DialogContentText} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

const RequestAuth = (props) => {

    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);
    const [type, setType] = useState(null);
    const [openErro400, setOpenErro400] = useState(false);


    useEffect(() => {
        async function getProfile() {
            const storageData = localStorage.getItem(TOKEN_KEY);
            try {
                const response = await api.get("auth/profile", {
                    headers: {
                        'Authorization': `Bearer ${storageData}`,
                    },
                })
                setUser(response.data.name);
                setId(response.data.id);
                setType(response.data.typeUser);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setOpenErro400(true);
                }
            }
        }

        getProfile();
    }, []);


    const handleFecharErro400 = () => {
        window.location.reload(true);
        setOpenErro400(false);
        logout();
    }

    return (
        <>
            {isAuthenticated() && user ? (
                <>
                    {React.Children.map(props.children, child => {
                        return React.cloneElement(child, { user: user, id: id, type: type });
                    })}
                </>
            ) : (
                <div className="Dialog">
                    <Dialog
                        open={openErro400}
                        onClose={handleFecharErro400}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Sessão Expirada"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Faça Login novamente para continuar.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleFecharErro400} autoFocus>
                                Fechar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}
        </>
    )
}

export default RequestAuth;
