const pool = require('../../db');
const workerQueries = require('../queries/workerQueries');
const workerAuthQueries = require('../queries/workerAuthQueries');
const EMPTY_ARRAY = 0;

//getWorkers
const getWorkers = (req,res) => {
    pool.query(workerQueries.getWorkers, (error, results) => {
        if(error) throw error;
        if(results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            console.log('There are no workers already');
        }
    });  
};

//getWorkerById
const getWorkerById = (req, res) => {

    const worker_id = req.params.worker_id;

    pool.query(workerQueries.getWorkerById, [worker_id], (error, results) => {
        if (error) throw error;
        if(results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            console.log('No Worker exists with this ID');
        }
    });
};

//getWorkerByRole
const getWorkerByRole = (req, res) => {

    const worker_role = req.params.worker_role;

    pool.query(workerQueries.getWorkerByRole, [worker_role], (error, results) => {
        if (error) throw error;
        if(results.rows.length !== EMPTY_ARRAY) {
            res.status(200).json(results.rows);
        } else {
            console.log("There are no workers with this role");
        }
    });
};

//addWorker
const addWorker = (req, res) => {
    const { worker_id, worker_email, worker_name, worker_surname, worker_role, passwd_auth } = req.body;
  
    // Realizar ambas consultas de forma asíncrona y retornar promesas
    const query1 = new Promise((resolve, reject) => {
      pool.query(workerQueries.addWorker, [worker_id, worker_email, worker_name, worker_surname, worker_role], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  
    const query2 = new Promise((resolve, reject) => {
      pool.query(workerAuthQueries.addWorkerAuth, [worker_id, passwd_auth], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  
    // Ejecutar ambas consultas y manejar los resultados
    Promise.all([query1, query2])
      .then(() => {
        res.send(req.body); // Enviar respuesta al cliente si ambas consultas se ejecutan correctamente
      })
      .catch((error) => {
        console.error("Error al agregar el trabajador:", error);
        res.status(500).send("Error en el servidor"); // Enviar respuesta de error si ocurre algún problema
      });
  };

const removeWorker = (req, res) => {
  const worker_id = req.params.worker_id;

  // Promesa para obtener el trabajador por su ID
  const getWorkerPromise = new Promise((resolve, reject) => {
    pool.query(workerQueries.getWorkerById, [worker_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const noWorkerFound = !results.rows.length;
        if (noWorkerFound) {
          reject(new Error("Worker does not exist in the database"));
        } else {
          resolve();
        }
      }
    });
  });

  // Promesa para eliminar el trabajador y su autenticación
  const deleteWorkerPromise = new Promise((resolve, reject) => {
    pool.query(workerQueries.removeWorker, [worker_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  const deleteWorkerAuthPromise = new Promise((resolve, reject) => {
    pool.query(workerAuthQueries.deleteWorkerAuth, [worker_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  // Ejecutar todas las promesas y manejar los resultados
  Promise.all([getWorkerPromise, deleteWorkerPromise, deleteWorkerAuthPromise])
    .then(() => {
      res.status(200).send("Worker removed successfully"); // Enviar respuesta al cliente si todas las consultas se ejecutan correctamente
    })
    .catch((error) => {
      console.error("Error al eliminar el trabajador:", error);
      res.status(500).send("Error en el servidor"); // Enviar respuesta de error si ocurre algún problema
    });
};


const loginWorker = (req, res) => { 
    const worker_email = req.params.worker_email;
    const passwd_auth = req.params.passwd_auth;
    pool.query(workerQueries.loginWorker, [worker_email], (error, results) => {
        if (error) throw error;
        const workerData = results.rows[0];
        if (workerData.worker_email === worker_email && workerData.passwd_auth === passwd_auth){
            res.status(200).json(results.rows);
        }else {
            res.status(200).json("");
        }
    });
}; 

module.exports = {
    getWorkers,
    getWorkerById,
    getWorkerByRole,
    addWorker,
    removeWorker,
    loginWorker,
};
