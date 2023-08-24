import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { API_BASE_URL, DateInput } from "../../config.js";
import { useParams } from 'react-router-dom';

const Form = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [errorMessage, setErrorMessage] = useState(null);
    const { board_id, patient_id  } = useParams();
    const [data, setData] = useState(null); // State to hold sensor data
 
    useEffect(() => {
        fetch(`${API_BASE_URL}/patients/patient/${board_id}/${patient_id}`)
            .then(response => response.json())
            .then(data => {
                setData(data[0]); 
            })
            .catch(error => console.error('Error fetching sensor data:', error));
    }, [board_id,patient_id]);

    /**
     * 
     * Check if the board and patient id are valid
     * otherwise show an error message
     * 
     */
    const checkoutSchema = yup.object().shape({
        discharge_date: yup.date().required("Please select a trip end date"),      
    });

    /**
     * 
     * Make a POST request to the API to add a new patient
     * in case of success redirect to the home page
     * in case of error show an error message
     * 
     */
    const handleSubmit = (values) => {
    
        const valuesToUpdate = {
            board_id: values.board_id,
            patient_id: values.patient_id,
            discharge_date: values.discharge_date,
            admission_date: values.admission_date,
        };
    
        const requestOptions = {
            method: "PUT", // Use "PATCH" if you're partially updating
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valuesToUpdate),
        };
    
        fetch(`${API_BASE_URL}/patients/`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.error || "Network response was not ok");
                    });
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data.message) {
                    window.location.href = "/worker";
                } else {
                    throw new Error("Server error");
                }
            })
            .catch((error) => {
                setErrorMessage(error.message || "Server error");
            });
    };

    // Render the form
    return (
        <Box m="20px">
            <Header title="Edit patient" />
            {data ? (
            <Formik
                onSubmit={handleSubmit}
                initialValues={{
                    board_id: data.board_id,
                    patient_id: data.patient_id,
                    discharge_date: data.discharge_date ? new Date(data.discharge_date).toISOString().split('T')[0] : '',
                    admission_date: data.admission_date ? new Date(data.admission_date).toISOString().split('T')[0] : '',
                }}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Board"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.board_id}
                                name="board_id"
                                disabled
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Patient ID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.patient_id}
                                name="patient_id"
                                disabled
                                sx={{ gridColumn: "span 4" }}
                            />
                            <Typography
                                sx={{ mt: "10px", ml: "10px", gridColumn: "span 2" }}
                            >
                                Discharge
                            </Typography>
                            
                            <DateInput
                                sx={{ gridColumn: "span 2" }}
                                type="date"
                                id="discharge_date"
                                name="discharge_date"
                                value={values.discharge_date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <Typography
                                sx={{ mt: "10px", ml: "10px", gridColumn: "span 2" }}
                            >
                                Admission
                            </Typography>

                            <DateInput
                                sx={{ gridColumn: "span 2" }}
                                type="date"
                                id="admission"
                                name="admission"
                                value={values.admission_date || {}}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Edit Patient
                            </Button>
                        </Box>
                        {/* Display error message if exists */}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </form>
                )}
            </Formik>
            ) : (
                <p>Cargando datos...</p>
            )}
        </Box>
    );
};

export default Form;