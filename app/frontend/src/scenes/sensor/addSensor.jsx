import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from "react";
import { API_BASE_URL, unitMapping, MIN_VALUE, MAX_VALUE } from "../../config.js";

const Form = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [errorMessage, setErrorMessage] = useState(null);
    const [unit, setUnit] = useState("");

    /**
     * 
     * Send the form to the server. 
     * if the sensor is added correctly, redirect to the seeSensors page
     * if not, display an error message
     * 
     */
    const handleSubmit = (values) => {

        values.sensor_units = unit;

        // Define the values to send to the server
        const valuesToSend = {
            sensor_id: values.sensor_id,
            sensor_type: values.sensor_type,
            sensor_units: values.sensor_units,
            min_value: values.min_value,
            max_value: values.max_value,
        };

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valuesToSend),
        };

        fetch(`${API_BASE_URL}/sensor/`, requestOptions)
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
                    window.location.href = "/seeSensors";
                    setErrorMessage(null);
                } else {
                    throw new Error("Server error");
                }
            })
            .catch((error) => {
                setErrorMessage(error.message || "Server error");
            });
    };

    /**
     * 
     * Updates the "Unit" field when the sensor type changes
     * 
     */
    const handleChangeSensorType = (event) => {
        const selectedSensorType = event.target.value;
        setUnit(unitMapping[selectedSensorType]);
    };

    /**
     * 
     * Validation schema for the form. 
     * min and max values must be numbers and min value must be less than max value
     * 
     */
    const checkoutSchema = yup.object().shape({
        sensor_id: yup.string().required("Don't forget the sensor ID"),
        sensor_type: yup.string().required("Select one of the types"),
        min_value: yup
            .number()
            .typeError("Min Value must be a number")
            .min(MIN_VALUE, "Min Value is too low")
            .max(yup.ref("max_value"), "Min Value must be less than Max Value")
            .required("Min Value is required"),
        max_value: yup
            .number()
            .typeError("Max Value must be a number")
            .min(yup.ref("min_value"), "Max Value must be greater than Min Value")
            .max(MAX_VALUE, "Max Value is too high")
            .required("Max Value is required"),
    });

    // Initial values for the form
    const initialValues = {
        sensor_id: "",
        sensor_type: "",
        min_value: 0,
        max_value: 1,
    };

    /**
     * 
     * Display the form to add a new sensor, depending on the sensor type, the unit will be displayed automatically
     * it also has a minimum and maximum value that must be respected, it will be checked before sending the form
     * 
     */
    return (
        <Box m="20px">
            <Header title="New sensor" subtitle="Create a new sensor" />

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
                                value={values.sensor_id}
                                name="sensor_id"
                                error={!!(touched.sensor_id && errors.sensor_id)}
                                helperText={touched.sensor_id && errors.sensor_id}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Type"
                                select
                                onBlur={handleBlur}
                                onChange={(event) => {
                                    handleChangeSensorType(event);
                                    handleChange(event);
                                }}
                                value={values.sensor_type}
                                name="sensor_type"
                                error={!!(touched.sensor_type && errors.sensor_type)}
                                helperText={touched.sensor_type && errors.sensor_type}
                                sx={{ gridColumn: "span 4" }}
                            >
                                <MenuItem key={0} value={"Temperature"}>
                                    Temperature
                                </MenuItem>
                                <MenuItem key={1} value={"Humidity"}>
                                    Humidity
                                </MenuItem>
                                <MenuItem key={2} value={"Ozone"}>
                                    Ozone
                                </MenuItem>
                                <MenuItem key={3} value={"Pm25"}>
                                    Pm25
                                </MenuItem>
                            </TextField>

                            <TextField
                                fullWidth
                                variant="filled"
                                label="Unit"
                                disabled
                                value={unit}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Min Value"
                                value={values.min_value}
                                onChange={handleChange}
                                error={!!(touched.min_value && errors.min_value)}
                                helperText={touched.min_value && errors.min_value}
                                name="min_value"
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Max Value"
                                value={values.max_value}
                                onChange={handleChange}
                                error={!!(touched.max_value && errors.max_value)}
                                helperText={touched.max_value && errors.max_value}
                                name="max_value"
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New sensor
                            </Button>
                        </Box>
                        {/* Display error message if exists */}
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default Form;