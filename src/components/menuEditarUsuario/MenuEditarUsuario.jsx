import React, {useState} from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";
import {CgUser} from "react-icons/cg";
import {AiOutlineEdit, AiOutlineLock} from "react-icons/ai";

function MenuEditarUsuario(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{height: "20px", backgroundColor: "#00000010"}}
            >
                <AiOutlineEdit />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Link style={{textDecoration: 'none', color: 'black'}} to={`/caderneta/usuarios/editar/${props.usuarioId}`}>
                        <CgUser style={{marginRight: '0.5vh'}}/>
                        Editar Dados
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link style={{textDecoration: 'none', color: 'black'}} to={`/caderneta/usuarios/editar/senha/${props.usuarioId}`}>
                        <AiOutlineLock style={{marginRight: '0.5vh'}}/> Alterar Senha
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );

}

export default MenuEditarUsuario;