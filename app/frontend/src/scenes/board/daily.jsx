import { Box, Button, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import BarChart from "../../components/BarChart";
import { API_BASE_URL, DateInput } from "../../config.js";

const Form = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [errorMessage, setErrorMessage] = useState(null);
    const [data, setData] = useState(null);
    const [dataOrigin, setDataOrigin] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const { id: patient_id, board_id } = useParams();
    
    // Validation schema for the form
    const checkoutSchema = yup.object().shape({
        discharge_date: yup.date().required("Please select a trip end date"),
    });

    // Initial values for the form
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    };

    // Initial values for the form
    const initialValues = {
        discharge_date: getCurrentDate(),
    };

    /**
     * 
     * Fetch data from the server given the patient_id and board_id. 
     * Set the minDate and maxDate for the DateInput component
     * 
     */
    useEffect(() => {
        fetch(`${API_BASE_URL}/daily/dateRange/${patient_id}/${board_id}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setDataOrigin("useEffect");
                setMinDate(new Date(data[0].mindate));
                setMaxDate(new Date(data[0].maxdate));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [patient_id,board_id]);

    /**
     * 
     * handleSubmit makes a data request to the server to obtain daily information related to a specific sensor and patient. 
     * If the server response is successful, the status is updated with the received data and the form is marked as submitted (formSubmitted will be true). 
     * In case of an error in the request or an unsuccessful response from the server, an error message is set and 
     * the form is marked as not submitted (formSubmitted will be false).
     * 
     */
    const handleSubmit = (values) => {

        const { discharge_date } = values;
      
        fetch(`${API_BASE_URL}/daily/sensor/type/${patient_id}/${discharge_date}/${board_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setDataOrigin("handleSubmit");
                setFormSubmitted(true);
            })
            .catch((error) => {
                setErrorMessage("Error en el servidor");
                setFormSubmitted(false);
            });
    };

    // Render the form
    return (
        <Box m="20px">
            <Header title="Data" subtitle="See data of patient" />

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
                            <Typography sx={{ mt: "10px", ml: "10px", gridColumn: "span 2" }}>
                                Select a date:
                            </Typography>

                            <DateInput
                                sx={{ gridColumn: "span 2" }}
                                type="date"
                                id="discharge_date"
                                name="discharge_date"
                                value={values.discharge_date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                min={minDate ? minDate.toISOString().slice(0, 10) : ''}
                                max={maxDate ? maxDate.toISOString().slice(0, 10) : ''}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                See information
                            </Button>
                        </Box>
                        {errors.discharge_date && touched.discharge_date && (
                            <p style={{ color: 'red' }}>{errors.discharge_date}</p>
                        )}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                        {/* Mostrar los datos recibidos solo cuando el formulario se envíe exitosamente */}
                        {formSubmitted && data && dataOrigin === 'handleSubmit' && data.map((item, index) => (
                            <React.Fragment key={index}>
                            <Box height="55vh">
                                <Header title={item.sensor_type} subtitle={`Average ${item.sensor_type} of patient ${patient_id} at ${values.discharge_date} with board: ${board_id}`} />
                                    <BarChart
                                        patient_id={patient_id}
                                        day_date={values.discharge_date}
                                        flagQuerietType={0}
                                        sensor_id={item.sensor_id}
                                        board_id={board_id}
                                    />
                                </Box>
                            </React.Fragment>
                        ))}
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default Form;
