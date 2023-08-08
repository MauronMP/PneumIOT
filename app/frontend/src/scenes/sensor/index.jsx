import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../config.js";

const Sensor = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    /**
     * 
     * Fetch the data from the database, the data is an array of objects
     * 
     */
    useEffect(() => {
        fetch(`${API_BASE_URL}/sensor`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error al obtener los datos:', error));
    }, []);

    // Transform the data to be able to use it in the table.
    const transformedData = data !== null ? data.map((entry) => ({
        id: entry.sensor_id,
        sensor_type: entry.sensor_type,
        sensor_units: entry.sensor_units,
        min_value: entry.min_value,
        max_value: entry.max_value
    })) : [];

    // Redirect to the add sensor page
    const handleAdd = () => {
        navigate('/addSensor');
    };

    // Redirect to the remove sensor page
    const handleDelete = (id) => {
        navigate(`/removeSensor/${id}`);
    };

    const columns = [
        {
            field: "id",
            headerName: "Identifier",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "sensor_type",
            headerName: "sensor type",
            flex: 1,
        },
        {
            field: "sensor_units",
            headerName: "sensor type",
            flex: 1,
        },
        {
            field: "min_value",
            headerName: "sensor type",
            flex: 1,
        },
        {
            field: "max_value",
            headerName: "sensor type",
            flex: 1,
        },

        {
            field: "Edit",
            headerName: "Edit sensor",
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
            headerName: "Delete sensor",
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

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Boards" subtitle="Managing boards" />
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

export default Sensor;