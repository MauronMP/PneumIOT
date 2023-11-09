const express = require('express');
const cors = require('cors');

const patientRoutes = require('./src/routes/patientRoutes');
const workerRoutes = require('./src/routes/workerRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');
const boardRoutes = require('./src/routes/boardRoutes');
const sensorRoutes = require('./src/routes/sensorRoutes');
const dailyRoutes = require('./src/routes/dailyRoutes');
const monthlyRoutes = require('./src/routes/monthlyRoutes');
const yearlyRoutes = require('./src/routes/yearlyRoutes');
const logRoutes = require('./src/routes/logRoutes');

const app = express();
const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;

/**
 * 
 * Configure CORS options
 * Allow requests from this source
 * 
 */
const corsOptions = {
    origin: 'http://localhost:5000', 
    optionsSuccessStatus: 200, 
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/worker', workerRoutes);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/board', boardRoutes);
app.use('/api/v1/sensor', sensorRoutes);
app.use('/api/v1/daily', dailyRoutes);
app.use('/api/v1/monthly', monthlyRoutes);
app.use('/api/v1/yearly', yearlyRoutes);
app.use('/api/v1/log', logRoutes);

app.listen(port, () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`Working on port: ${port}`);
    }
});

module.exports = app;
