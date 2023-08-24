import React from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config.js";

const HomeComponent = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();

    /**
     * 
     * Remove worker function, removes the worker from the database given its id.
     * if the response is ok, redirects to the worker page.
     * 
     */
    const handleDeleteUser = () => {
        fetch(`${API_BASE_URL}/worker/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
            })
            .then((data) => {
                window.location.href = "/worker";
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

    // Render the button to remove the worker
    return (
        <Box m="20px" >
            <Box display="flex" justifyContent="center" alignItems="center">
                <Header title={`You are going to delete the worker with ${id}`} subtitle="Are you sure you want to delete it?" />
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
                    onClick={handleDeleteUser}>
                    Remove worker
                </Button>
            </Box>
        </Box>
    );
};

export default HomeComponent;