import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { API_BASE_URL, unitMapping, MIN_VALUE, MAX_VALUE } from "../../config.js";
import { useParams } from "react-router-dom";

const Form = () => {
    
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [errorMessage, setErrorMessage] = useState(null);
    const [unit, setUnit] = useState("");
    const [data, setData] = useState(null); // State to hold sensor data
    const { id: sensor_id } = useParams();

    useEffect(() => {
        fetch(`${API_BASE_URL}/sensor/${sensor_id}`)
            .then(response => response.json())
            .then(data => {
                setData(data[0]); // Assuming your backend returns an array with one object
                const selectedUnit = unitMapping[data[0].sensor_type];
                setUnit(selectedUnit);
            })
            .catch(error => console.error('Error fetching sensor data:', error));
    }, [sensor_id]);
    


    const handleSubmit = (values) => {

        values.sensor_units = unit;
    
        const valuesToUpdate = {
            sensor_id: values.sensor_id,
            sensor_type: values.sensor_type,
            sensor_units: values.sensor_units,
            min_value: values.min_value,
            max_value: values.max_value,
        };
    
        const requestOptions = {
            method: "PUT", // Use "PATCH" if you're partially updating
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valuesToUpdate),
        };
    
        fetch(`${API_BASE_URL}/sensor/${sensor_id}`, requestOptions)
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
                } else {
                    throw new Error("Server error");
                }
            })
            .catch((error) => {
                setErrorMessage(error.message || "Server error");
            });
    };
    

    const handleChangeSensorType = (event) => {
        const selectedSensorType = event.target.value;
        const selectedUnit = unitMapping[selectedSensorType];
        setUnit(selectedUnit);
    };

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

    return (
        <Box m="20px">
            <Header title="Edit sensor" subtitle="Edit an existing sensor" />
            {data ? (
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={{
                        sensor_id: data.sensor_id,
                        sensor_type: data.sensor_type,
                        min_value: parseFloat(data.min_value),
                        max_value: parseFloat(data.max_value),
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
                                    label="Id"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.sensor_id}
                                    name="sensor_id"
                                    disabled
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
                                    Update Sensor
                                </Button>
                            </Box>
                            {/* Display error message if exists */}
                            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
