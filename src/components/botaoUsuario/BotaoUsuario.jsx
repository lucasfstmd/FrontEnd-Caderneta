import React, {useState} from "react";
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CgLogOut } from "react-icons/cg"
import {logout} from "../../service/auth/auth";

export default function BasicMenu(props) {
    const user = props.user;
    const id = props.sub;
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        logout();
        setAnchorEl(null);
    };

    const handleClose = () => {
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
                <MenuItem onClick={handleLogout}><CgLogOut style={{marginRight: '0.5vh', color: "red"}}/>
                    <Link style={{textDecoration: 'none', color: 'red'}} to={'/'}>Logout</Link></MenuItem>
                <MenuItem onClick={handleClose}><CgLogOut style={{marginRight: '0.5vh', color: "red"}}/>
                    <Link style={{textDecoration: 'none', color: 'red'}} to={`caderneta/usuarios/editar/${id}`}>Editar Usuario</Link></MenuItem>
            </Menu>
        </div>
    );
}
