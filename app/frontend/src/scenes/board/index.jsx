import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config.js";

const Board = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const worker_role = localStorage.getItem("userRole");
  const worker_id = localStorage.getItem("userID");
  let query = "";

  // Query will be different depending on the user role
  if (worker_role === "admin") {
    query = `${API_BASE_URL}/board`;
  } else {
    query = `${API_BASE_URL}/board/worker/${worker_id}`;
  }

  // Fetch data from the server
  useEffect(() => {
    fetch(query)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error in obtaining data:", error));
  }, [query]);

  // Transform the data to be displayed in the table
  const transformedData =
    data !== null
      ? data.map((entry) => {
        const sensorIds = Array.isArray(entry.sensor_types)
          ? entry.sensor_types
          : [];
        return {
          id: entry.board_id,
          sensor_type: sensorIds.join(", "),
        };
      })
      : [];

  // Handle the click on the "Add board" button
  const handleAdd = () => {
    navigate("/addBoard");
  };

  // Handle the click on the "Remove board" button
  const handleDelete = (id) => {
    navigate(`/removeBoard/${id}`);
  };

  // Define the columns of the table
  const columns = [
    {
      field: "id",
      headerName: "board identifier",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "sensor_type",
      headerName: "sensor type",
      flex: 1,
    },

    {
      field: "Edit",
      headerName: "Edit board",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            value={id}
            justifyContent="center"
            backgroundColor={colors.yellowAccent[900]}
            borderRadius="4px"
          >
            {<EditIcon />}
          </Box>
        );
      },
    },
    {
      field: "Delete",
      headerName: "Delete board",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            value={id}
            justifyContent="center"
            backgroundColor={colors.redAccent[500]}
            borderRadius="4px"
            onClick={() => handleDelete(id)}
          >
            {<DeleteIcon />}
          </Box>
        );
      },
    },
  ];

  // Return the table
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Boards" subtitle="Managing boards" />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {worker_role === "admin" ? (
            <Button
              sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.greenAccent[200],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={handleAdd}
            >
              Add
            </Button>
          ) : null}
        </Box>
      </Box>

      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid rows={transformedData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Board;
