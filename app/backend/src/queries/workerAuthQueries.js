const getPasswordHash = "SELECT * FROM pneumiot.worker_auth WHERE worker_id = $1";
const addWorkerAuth = "INSERT INTO pneumiot.worker_auth(worker_id, passwd_auth) VALUES ($1,$2)";
const deleteWorkerAuth = "DELETE FROM pneumiot.worker_auth WHERE worker_id = $1";

module.exports = {
    getPasswordHash,
    addWorkerAuth,
    deleteWorkerAuth,
};
