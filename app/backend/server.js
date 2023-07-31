const express = require('express');
const cors = require('cors');

const patientRoutes = require('./src/routes/patientRoutes');
const workerRoutes = require('./src/routes/workerRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');
const boardRoutes = require('./src/routes/boardRoutes');
const boardPatientRoutes = require('./src/routes/boardPatientRoutes');

const app = express()
const port = 3000

// Configurar las opciones de CORS
const corsOptions = {
    origin: 'http://localhost:5000', // Permitir solicitudes desde este origen
    optionsSuccessStatus: 200, // Algunas versiones de CORS requieren este campo
  };

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req,res) => {
    res.send("Hello world!");
})

app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/worker', workerRoutes);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/board', boardRoutes);
app.use('/api/v1/boardPatient', boardPatientRoutes);

app.listen(port, () => console.log(`Funcionando en el puesto ${port}`))