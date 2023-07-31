import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from "react";

const Form = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        };
        fetch('http://localhost:3000/api/v1/worker/', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

            })
            .then((data) => {
                if (data === "") {
                    setErrorMessage("ID or email already exists");
                } else {
                    window.location.href = "/worker";
                    setErrorMessage(null); // Limpiar el mensaje de error si hay una respuesta válida
                }

            })
            .catch((error) => {
                setErrorMessage("Error en el servidor")
            });
            
    };


    return (
        <Box m="20px">
            <Header title="New worker" subtitle="Create a new worker" />

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
                                label="ID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.worker_id}
                                name="worker_id"
                                error={!!touched.worker_id && !!errors.worker_id}
                                helperText={touched.worker_id && errors.worker_id}
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

                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.passwd_auth}
                                name="passwd_auth"
                                error={!!touched.passwd_auth && !!errors.passwd_auth}
                                helperText={touched.passwd_auth && errors.passwd_auth}
                                sx={{ gridColumn: "span 4" }}
                            />
                            
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New User
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
const passwordRegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{5,})$/;


const checkoutSchema = yup.object().shape({
    worker_name: yup.string().required("Don't forget the name"),
    worker_surname: yup.string().required("Don't forget the surname"),
    worker_email: yup.string().email("invalid worker_email").required("Don't forget the worker_email"),
    worker_id: yup.string().matches(dniRegExp, "7 numbers and 1 digit").required("required"),
    worker_role: yup.string().required("Select one the roles"),
    passwd_auth: yup.string().required("required").matches(passwordRegExp, "Minumum 5 characters, 1 uppercase and 1 special character"),
});
const initialValues = {
    worker_name: "",
    worker_surname: "",
    worker_email: "",
    worker_id: "",
    worker_role: "",
    passwd_auth: "",
};

export default Form;
