import React from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config.js";

const RemoveBoardComponent = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const worker_id = localStorage.getItem('userID');
  const worker_role = localStorage.getItem('userRole');
  const { id } = useParams(); 
  let query = '';

  // Query will be different depending on the user role
  if (worker_role === 'admin') {
    query = `${API_BASE_URL}/board/remove/${id}`;
  } else {
    query = `${API_BASE_URL}/board/${id}`;
  }

  // Fetch to the server to delete the board
  const handleDeleteUser = () => {
    const data = {
      board_id: id,
      worker_id: worker_id,
    };

    fetch(query, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        window.location.href = "/boards";
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <Box m="20px" >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Header title={`You are going to delete a board with the identifier ${id}`} subtitle="Are you sure you want to delete it? Deleting it means deleting the patients associated with it and all related data." />
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
          Remove board
        </Button>
      </Box>
    </Box>
  );
};

export default RemoveBoardComponent;
