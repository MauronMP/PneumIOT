import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const HomeComponent = () => {

    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    /**
     * 
     * logout function, clears the local storage 
     * and redirects to the login page
     * 
     */
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    };

    return (
        <Box m="20px" >
            <Box display="flex" justifyContent="center" alignItems="center">
                <Header title="Vas a cerrar sesión" subtitle="¿Seguro?" />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                    }}
                    onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Box>
    );
};

export default HomeComponent;