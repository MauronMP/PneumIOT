import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../config.js";

const Worker = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  /**
   * 
   * Fetch the data from the database
   * 
   */
  useEffect(() => {
    fetch(`${API_BASE_URL}/worker/`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error in obtaining data:', error));
  }, []);

  /**
   * 
   * Transform the data to be displayed in the table
   * 
   */
  const transformedData = data !== null ? data.map((entry) => ({
    id: entry.worker_id,
    worker_email: entry.worker_email,
    worker_name: entry.worker_name,
    worker_surname: entry.worker_surname,
    worker_role: entry.worker_role
  })) : [];

  // Redirect to the add worker page
  const handleAdd = () => {
    navigate('/addWorker');
  };

  // Redirect to the remove worker page
  const handleDelete = (id) => {
    navigate(`/removeWorker/${id}`);
  };

  // Redirect to the see patients page
  const handleSeePatients = (id) => {
    navigate(`/seePatients/${id}`);
  };

  /**
   * 
   * Define the columns of the table. 
   * The field of the columns are the keys of the transformedData
   * 
   */
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "worker_email",
      headerName: "email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "worker_name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "worker_surname",
      headerName: "Surname",
      flex: 1,
    },
    {
      field: "worker_role",
      headerName: "Role",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "patients",
      headerName: "See patients",
      flex: 1,
      renderCell: ({ row: { id, worker_role } }) => {
        if (worker_role !== "doctor") {
          return null;
        }

        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            value={id}
            justifyContent="center"
            backgroundColor={colors.greenAccent[400]}
            borderRadius="4px"
            onClick={() => handleSeePatients(id)}
          >
            {<VisibilityIcon />}
          </Box>
        );
      },
    },
    {
      field: "Edit",
      headerName: "Edit worker",
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
            backgroundColor={
              colors.yellowAccent[900]
            }
            borderRadius="4px"
          >
            {<EditIcon />}
          </Box>
        );
      },
    },
    {
      field: "Delete",
      headerName: "Delete worker",
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
            backgroundColor={
              colors.redAccent[500]
            }
            borderRadius="4px"
            onClick={() => handleDelete(id)}
          >
            {<DeleteIcon />}

          </Box>

        );
      },
    },
  ];

  // Return the table with the data and the columns defined above
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Workers" subtitle="Managing workers" />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.greenAccent[200],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleAdd}>
            Add
          </Button>
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
        <DataGrid
          rows={transformedData}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Worker;