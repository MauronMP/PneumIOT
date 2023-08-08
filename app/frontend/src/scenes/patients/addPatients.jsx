import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from "react";
import { API_BASE_URL, DateInput, getCurrentDate } from "../../config.js";
import { useParams } from 'react-router-dom';

const Form = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [errorMessage, setErrorMessage] = useState(null);
    const { id: worker_id  } = useParams();

    // Regex for dni validation (8 numbers + 1 letter)
    const dniRegExp = /^\d{8}[A-Z]$/;

    /**
     * 
     * Check if the board and patient id are valid
     * otherwise show an error message
     * 
     */
    const checkoutSchema = yup.object().shape({
        board_id: yup.string().required("Don't forget the board"),
        patient_id: yup.string()
            .required("Don't forget the patient ID")
            .matches(dniRegExp, "Invalid patient ID"),
        discharge_date: yup.date().required("Please select a trip end date"),
        
    });

    // Set the initial values of the form
    const initialValues = {
        board_id: "",
        patient_id: "",
        discharge_date: getCurrentDate(),
    };

    /**
     * 
     * Make a POST request to the API to add a new patient
     * in case of success redirect to the home page
     * in case of error show an error message
     * 
     */
    const handleSubmit = (values) => {

        values.discharge_date = new Date(values.discharge_date);
        values.worker_id = worker_id;
      
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        };
      
        fetch(`${API_BASE_URL}/patients/`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .then((data) => {
                if (data === "") {
                    setErrorMessage("Board or id already exists");
                } else {
                    window.location.href = "/";
                    setErrorMessage(null);
                }

            })
            .catch((error) => {
                setErrorMessage("Server error")
            });
    };

    // Render the form
    return (
        <Box m="20px">
            <Header title="New patient" subtitle="Create a new patient" />
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
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
                                error={!!touched.board_id && !!errors.board_id}
                                helperText={touched.board_id && errors.board_id}
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
                                error={!!touched.patient_id && !!errors.patient_id}
                                helperText={touched.patient_id && errors.patient_id}
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Patient
                            </Button>
                        </Box>
                        {/* Display error message if exists */}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default Form;