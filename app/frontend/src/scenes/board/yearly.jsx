import { Box, Button, Typography, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import BarChart from "../../components/BarChart";
import { API_BASE_URL } from "../../config.js";

const Form = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);
  const [dataOrigin, setDataOrigin] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { id: patient_id, board_id } = useParams();
  const [items, setItems] = useState([]);

  // Validation schema for the form
  const checkoutSchema = yup.object().shape({
    year_date: yup.mixed().required("Please select a year"),
  });

  // Initial values for the form
  const initialValues = {
    year_date: '',
  };

  // Get years where there is data
  useEffect(() => {
    fetch(`${API_BASE_URL}/yearly/dateRange/${patient_id}/${board_id}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setDataOrigin("useEffect");
        setItems(data.map(item => item.year_date)); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [patient_id, board_id]);

  // Fetch data from the server given the patient_id, year_date and board_id.
  const handleSubmit = (values) => {
    const { year_date } = values;
    // Realizar la petición fetch o axios a la ruta adecuada
    fetch(`http://localhost:3000/api/v1/yearly/sensor/type/${patient_id}/${year_date}/${board_id}`)
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

  // Validation schema for the form
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
                Select a month:
              </Typography>

              <Select
                sx={{
                    gridColumn: "span 2",
                    backgroundColor: "#f1f1f1",
                    color: "#333",
                  }}
                id="year_date"
                name="year_date"
                value={values.year_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.year_date && touched.year_date}
              >
                {items.map((item) => (
                    <MenuItem key={item} value={item}>
                    {item}
                    </MenuItem>
                ))}
                </Select>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                See information
              </Button>
            </Box>
            {errors.year_date && touched.year_date && (
              <p style={{ color: 'red' }}>{errors.year_date}</p>
            )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {/* Display the received data only when the form is successfully submitted */}
            {formSubmitted && data && dataOrigin === 'handleSubmit' && data.map((item, index) => (
              <React.Fragment key={index}>
                <Box height="55vh">
                  <Header title={item.sensor_type} subtitle={`Average ${item.sensor_type} of patient ${patient_id} in ${values.year_date} with board: ${board_id}`}/>
                  <BarChart
                    patient_id={patient_id}
                    day_date={values.year_date}
                    flagQuerietType={2}
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
