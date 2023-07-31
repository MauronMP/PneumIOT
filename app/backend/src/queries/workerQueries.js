const getWorkers = "SELECT * FROM pneumiot.worker WHERE worker_role != 'admin';";
const getWorkerById = "SELECT * FROM pneumiot.worker WHERE worker_id = $1";
const getWorkerByRole = "SELECT * FROM pneumiot.worker WHERE worker_role = $1";
const addWorker = "INSERT INTO pneumiot.worker(worker_id, worker_email, worker_name, worker_surname, worker_role) VALUES ($1,$2,$3,$4,$5)";
const removeWorker = "DELETE FROM pneumiot.worker WHERE worker_id = $1";
const loginWorker = `SELECT  worker_email, passwd_auth, worker_name, worker_role
FROM pneumiot.worker_auth
INNER JOIN pneumiot.worker
ON pneumiot.worker_auth.worker_id = pneumiot.worker.worker_id
WHERE pneumiot.worker.worker_email = $1`;

module.exports = {
    getWorkers,
    getWorkerById,
    getWorkerByRole,
    addWorker,
    removeWorker,
    loginWorker,
};