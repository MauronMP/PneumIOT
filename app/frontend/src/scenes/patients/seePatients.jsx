import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { useNavigate, useParams } from 'react-router-dom';

const Worker = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
    const { id: worker_id  } = useParams();

  useEffect(() => {
    // Hacer la petición GET al servidor Express con el ID como parámetro
    fetch(`http://localhost:3000/api/v1/doctor/${worker_id}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error al obtener los datos:', error));
  }, [worker_id]);
  const transformedData = data !== null ? data.map((entry) => ({
    id: entry.patient_id,
    board_id: entry.board_id,
    discharge_date: entry.discharge_date,
    admission_date: entry.admission_date,
  })) : [];


  const handleAddPatient = (worker_id) => {
    navigate(`/addPatient/${worker_id}`);
  };

  const handleDeletePatient = (id) => {
    navigate(`/removePatient/${id}`);
  };

  const handleSeeBoard = (id) => {
    navigate(`/seeBoard/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "board_id",
      headerName: "Board",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "discharge_date",
      headerName: "Discharge date",
      flex: 1,
    },
    {
      field: "admission_date",
      headerName: "Admission date",
      flex: 1,
    },
    {
      field: "Board",
      headerName: "See_board",
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
              colors.greenAccent[400]
            }
            borderRadius="4px"
            onClick={() => handleSeeBoard(id)}
          >
            {<VisibilityIcon/>}
          </Box>
        );
      },
    },
    {
      field: "Edit_patient",
      headerName: "Edit Patient",
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
            {<EditIcon/>}
          </Box>
        );
      },
    },
    {
      field: "Delete_Patient",
      headerName: "Delete patient",
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
              onClick={() => handleDeletePatient(id)}
            >
              {<DeleteIcon />}
              
            </Box>

        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Patients" subtitle="Managing patients" />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.greenAccent[200],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => handleAddPatient(worker_id)}
            >
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
