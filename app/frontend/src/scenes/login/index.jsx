import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";


const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (values) => {
    fetch(`http://localhost:3000/api/v1/worker/login/${values.email}/${values.userpassword}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Manejar la respuesta del servidor
      if (data === "") {
        setErrorMessage("Email or password incorrect");
      } else {
        localStorage.setItem("userEmail", values.email);
        localStorage.setItem("userName", data[0]["worker_name"]);
        localStorage.setItem("userRole", data[0]["worker_role"]);
        window.location.href = "/";
        setErrorMessage(null); // Limpiar el mensaje de error si hay una respuesta válida
      }
    })
    .catch((error) => {
      setErrorMessage("Error en el servidor");
    });
  };

  return (
    <Box m="20px">
      <Header title="User login" subtitle="Log in" />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userpassword}
                name="userpassword"
                error={!!touched.userpassword && !!errors.userpassword}
                helperText={touched.userpassword && errors.userpassword}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Log in
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

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Please enter your email address."),
  userpassword: yup.string().required("Please enter your password"),
});

const initialValues = {
  email: "",
  userpassword: "",
};

export default Form;
