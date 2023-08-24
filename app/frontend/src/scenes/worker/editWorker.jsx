import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config.js";
import { useParams } from "react-router-dom";

const Form = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [errorMessage, setErrorMessage] = useState(null);
    const [data, setData] = useState(null); // State to hold sensor data
    const { id: worker_id } = useParams();

    useEffect(() => {
        fetch(`${API_BASE_URL}/worker/${worker_id}`)
            .then(response => response.json())
            .then(data => {
                setData(data[0]); 
            })
            .catch(error => console.error('Error fetching sensor data:', error));
    }, [worker_id]);

    /**
     * 
     * Validate the form fields. 
     * worker_id calls the dniRegExp and passwd_auth calls the passwordRegExp
     * 
     */
    const checkoutSchema = yup.object().shape({
        worker_name: yup.string().required("Don't forget the name"),
        worker_surname: yup.string().required("Don't forget the surname"),
        worker_email: yup.string().email("invalid worker_email").required("Don't forget the worker_email"),
        worker_role: yup.string().required("Select one the roles"),
    });

    const handleSubmit = (values) => {
    
        const valuesToUpdate = {
            worker_id: values.worker_id,
            worker_email: values.worker_email,
            worker_name: values.worker_name,
            worker_surname: values.worker_surname,
            worker_role: values.worker_role
        };
    
        const requestOptions = {
            method: "PUT", // Use "PATCH" if you're partially updating
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valuesToUpdate),
        };
    
        fetch(`${API_BASE_URL}/worker/${worker_id}`, requestOptions)
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
            <Header title="Edit worker" subtitle="Edit worker" />
            {data ? (
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={{
                        worker_id: data.worker_id,
                        worker_email: data.worker_email,
                        worker_name: data.worker_name,
                        worker_surname: data.worker_surname,
                        worker_role: data.worker_role
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
                                    label="ID"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.worker_id}
                                    name="worker_id"
                                    disabled
                                    sx={{ gridColumn: "span 4" }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="worker_email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.worker_email}
                                    name="worker_email"
                                    error={!!touched.worker_email && !!errors.worker_email}
                                    helperText={touched.worker_email && errors.worker_email}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.worker_name}
                                    name="worker_name"
                                    error={!!touched.worker_name && !!errors.worker_name}
                                    helperText={touched.worker_name && errors.worker_name}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.worker_surname}
                                    name="worker_surname"
                                    error={!!touched.worker_surname && !!errors.worker_surname}
                                    helperText={touched.worker_surname && errors.worker_surname}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Role"
                                    select
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.worker_role}
                                    name="worker_role"
                                    error={!!touched.worker_role && !!errors.worker_role}
                                    helperText={touched.worker_role && errors.worker_role}
                                    sx={{ gridColumn: "span 4" }}
                                >
                                    <MenuItem key={0} value={"admin"}>admin</MenuItem>
                                    <MenuItem key={1} value={"doctor"}>doctor</MenuItem>
                                    <MenuItem key={2} value={"other"}>other</MenuItem>
                                </TextField>                                
                            </Box>

                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Edit worker
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