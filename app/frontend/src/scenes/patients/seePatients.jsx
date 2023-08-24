import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from "../../config.js";

const Worker = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const { id: worker_id } = useParams();

    /**
     * 
     * Fetch the data from the database, the data is an array of objects
     * of patients given a worker_id, worker_id is the id of the doctor after login
     * 
     */
    useEffect(() => {
        fetch(`${API_BASE_URL}/doctor/${worker_id}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error al obtener los datos:', error));
    }, [worker_id]);

    /**
     * 
     * Transform the data to be able to use it in the table.
     * data is an array of objects, each object is a patient
     * from the database
     * 
     */
    const transformedData = data !== null ? data.map((entry) => ({
        id: entry.event_patient_id,
        patient_id: entry.patient_id,
        board_id: entry.board_id,
        discharge_date: new Date(entry.discharge_date).toISOString().split('T')[0],
        admission_date: new Date(entry.admission_date).toISOString().split('T')[0],
    })) : [];

    // Redirect to the add patient page
    const handleAddPatient = (worker_id) => {
        navigate(`/addPatient/${worker_id}`);
    };

    // Redirect to the edit patient page
    const handleDeletePatient = (patient_id) => {
        navigate(`/removePatient/${patient_id}`);
    };

    // Redirect to the edit patient page
    const handleEditPatient = (board_id, patient_id) => {
        navigate(`/editPatient/${board_id}/${patient_id}`);
    };

    // Redirect to see the board given a patient_id and a board_id
    const handleSeeBoard = (patient_id, board_id) => {
        navigate(`/seeBoard/${patient_id}/${board_id}`);
    };

    /**
     * 
     * Define the columns of the table and the actions 
     * with the data of each row of the table 
     * 
     */
    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "board_id",
            headerName: "Board",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "patient_id",
            headerName: "Patient Id",
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
            renderCell: ({ row: { patient_id, board_id } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        value={patient_id}
                        justifyContent="center"
                        backgroundColor={
                            colors.greenAccent[400]
                        }
                        borderRadius="4px"
                        onClick={() => handleSeeBoard(patient_id, board_id)}
                    >
                        {<VisibilityIcon />}
                    </Box>
                );
            },
        },
        {
            field: "Edit_patient",
            headerName: "Edit Patient",
            flex: 1,
            renderCell: ({ row: { board_id, patient_id } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        value={patient_id}
                        justifyContent="center"
                        backgroundColor={
                            colors.yellowAccent[900]
                        }
                        borderRadius="4px"
                        onClick={() => handleEditPatient(board_id, patient_id)}
                    >
                        {<EditIcon />}
                    </Box>
                );
            },
        },
        {
            field: "Delete_Patient",
            headerName: "Delete patient",
            flex: 1,
            renderCell: ({ row: { patient_id } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        value={patient_id}
                        justifyContent="center"
                        backgroundColor={
                            colors.redAccent[500]
                        }
                        borderRadius="4px"
                        onClick={() => handleDeletePatient(patient_id)}
                    >
                        {<DeleteIcon />}

                    </Box>

                );
            },
        },
    ];

    // Render the button to add a new patient
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