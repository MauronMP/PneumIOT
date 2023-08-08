import { styled } from "@mui/material/styles";

// Define API base URL and project title. Used for API calls and page title.
export const API_BASE_URL = `http://localhost:3000/api/v1`;

// Define project title. Used for page title.
export const PROJECT_TITLE = `Pneumiot`;

// Define custom input component for date picker. Used for date picker component.
const DateInput = styled("input")({
    width: "100%",
    height: "40px",
    borderRadius: "4px",
    padding: "8px",
    border: "1px solid #ccc",
});

// Define min and max values for sensor data. Used for sensor data table.
const MIN_VALUE = -100;
const MAX_VALUE = 100;

// Define unit mapping for each sensor type. Used for sensor data table.
const unitMapping = {
  Temperature: "ºC",
  Humidity: "%",
  Ozone: "µg/m³",
  Pm25: "µg/m³",
};

// Get current date in YYYY-MM-DD format. Used for date picker component.
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

// Define month names for month picker component.
const monthNames = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

export { DateInput, monthNames, getCurrentDate, unitMapping, MIN_VALUE, MAX_VALUE };