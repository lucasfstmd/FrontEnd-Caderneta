import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CgLogOut } from "react-icons/cg"
import {logout} from "../../service/auth/auth";
import {AiOutlineEdit} from "react-icons/ai";

export default function BasicMenu(props) {
    const user = props.user;
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        logout();
        setAnchorEl(null);
        navigate("/")
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleEdit = () => {
        navigate(`caderneta/usuarios/editar/${user}`);
        setAnchorEl(null);
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {user}
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
                <MenuItem onClick={handleLogout} style={{color: "red"}}><CgLogOut style={{marginRight: '0.5vh', color: "red"}}/>
                    Sair</MenuItem>
                <MenuItem onClick={handleEdit}><AiOutlineEdit style={{marginRight: '0.5vh', color: "black"}}/>
                    Editar Usuario</MenuItem>
            </Menu>
        </div>
    );
}
