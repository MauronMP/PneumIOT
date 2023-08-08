import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config.js";

const Form = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [errorMessage, setErrorMessage] = useState(null);
    const [data, setData] = useState(null);

    // Validation schema for the form
    const checkoutSchema = yup.object().shape({
        board_id: yup.string().required("Don't forget the board ID"),
        sensor_id: yup.string().required("Select one the sensors"),
    });

    // Initial values for the form
    const initialValues = {
        board_id: "",
        sensor_id: "",
    };

    // Fetch data from the server
    useEffect(() => {
        fetch(`${API_BASE_URL}/board/all/type/sensor_type`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error in obtaining data:', error));
    }, []);

    // Transform data into a format that can be used by the MenuItem component
    const transformedData = data !== null ? data.map((entry) => ({
        sensor_id: entry.sensor_id,
        sensor_type: entry.sensor_type,
    })) : [];


    /**
     * 
     * handleSubmit is a function used to submit a form via a POST request to the server. 
     * It takes the values from the form, converts them into JSON format and sends them to the server using the fetch function. 
     * If the response is successful and contains a message, it redirects the user to the "/boards" page. 
     * If there is any error in the response, an error message is displayed in the "errorMessage" state.
     * 
     */
    const handleSubmit = (values) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        };

        fetch(`${API_BASE_URL}/board/`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Network response was not ok');
                    });
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data.message) {
                    window.location.href = "/boards";
                    setErrorMessage(null); // Clear error message if there is a valid response
                } else {
                    throw new Error("Server error");
                }
            })
            .catch((error) => {
                // Handle the error by displaying the message in the "errorMessage" status.
                setErrorMessage(error.message || 'Server error');
            });
    };
    

    // Return the form
    return (
        <Box m="20px">
            <Header title="New board" subtitle="Create a new board" />
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
                                label="Board ID"
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
                                label="Sensor ID"
                                select
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.sensor_id}
                                name="sensor_id"
                                error={!!touched.sensor_id && !!errors.sensor_id}
                                helperText={touched.sensor_id && errors.sensor_id}
                                sx={{ gridColumn: "span 4" }}
                            >
                                {transformedData.map((sensor) => (
                                    <MenuItem key={sensor.sensor_id} value={sensor.sensor_id}>
                                        {sensor.sensor_type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Board
                            </Button>
                        </Box>
                        {/* Show error message if exists */}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default Form;
