import React from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

const HomeComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();

  const handleDeleteUser = () => {
    fetch(`http://localhost:3000/api/v1/worker/${id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        // Realizar acciones adicionales después de eliminar al usuario
        window.location.href = "/worker";
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (

    <Box m="20px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Header title={`Vas a eliminar al usuario con el ${id}`} subtitle="¿Estas seguro de borrarlo?" />
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
          Eliminar usuario
        </Button>
      </Box>
    </Box>

  );
};

export default HomeComponent;
