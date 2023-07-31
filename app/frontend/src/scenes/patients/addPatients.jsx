import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from "react";
import { styled } from '@mui/material/styles';

const Form = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [errorMessage, setErrorMessage] = useState(null);

    const DateInput = styled('input')({
        // Your custom CSS styles for the date input
        width: '100%',
        height: '40px',
        borderRadius: '4px',
        padding: '8px',
        border: '1px solid #ccc',
    });

    
    const handleSubmit = (values) => {
        // Convertir el valor del campo discharge a un objeto Date
        values.discharge_date = new Date(values.discharge_date);
      
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        };
      
        fetch('http://localhost:3000/api/v1/patients/', requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Devolver la promesa de response.json()
          })
          .then((data) => {
            console.log(data); // Imprimir los datos recibidos desde el servidor
            if (data.message === "Board already exists") {
              setErrorMessage("Board or patient already exists");
            } else {
              window.location.href = "/";
              setErrorMessage(null); // Limpiar el mensaje de error si hay una respuesta válida
            }
          })
          .catch((error) => {
            console.error("Error al enviar la solicitud:", error);
            setErrorMessage("Error en el servidor");
          });
      };
          


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
                        {/* Mostrar mensaje de error si existe */}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const dniRegExp = /^\d{8}[A-Z]$/;

const checkoutSchema = yup.object().shape({
    board_id: yup.string().required("Don't forget the board"),
    patient_id: yup.string()
        .required("Don't forget the patient ID")
        .matches(dniRegExp, "Invalid patient ID"),
    discharge_date: yup.date().required("Please select a trip end date"),
    
});


const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zeros to month and day if needed
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
};

const initialValues = {
    board_id: "",
    patient_id: "",
    discharge_date: getCurrentDate(),
};

export default Form;
