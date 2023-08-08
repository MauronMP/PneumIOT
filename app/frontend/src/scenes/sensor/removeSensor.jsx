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
   * Remove sensor function, removes the sensor from the database
   * by its id, if the response is ok, redirects to the home page
   * 
   */
  const handleDeleteSensor = () => {
    fetch(`${API_BASE_URL}/sensor/${id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        window.location.href = "/seeSensors";
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  // Render the form to delete the sensor
  return (
    <Box m="20px" >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Header title={`You will delete the sensor ${id}`} subtitle="Are you sure?" />
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
          onClick={handleDeleteSensor}>
          Delete sensor
        </Button>
      </Box>
    </Box>
  );
};

export default HomeComponent;