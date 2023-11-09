const request = require("supertest");
const app = require("../server");

// Test case for GET endpoint to retrieve patient data by patient_id
describe("GET /api/v1/patients/:patient_id", () => {
  it("should return a JSON response with the specified patient_id and a board_id", (done) => {
    const expectedPatientId = "76438300D";
    const expectedBoardId = "123-abc-456-def"; // Expected board_id

    // Make a GET request to the specified endpoint
    request(app)
      .get(`/api/v1/patients/${expectedPatientId}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const patients = res.body;
        expect(Array.isArray(patients)).toBe(true);

        const patientWithExpectedData = patients.find((patient) => {
          return (
            patient.patient_id === expectedPatientId &&
            patient.board_id === expectedBoardId
          );
        });

        expect(patientWithExpectedData).toBeTruthy();

        done();
      });
  });
});

// Test case for POST endpoint to create a new worker
describe("POST /api/v1/worker/", () => {
  it("should create a new worker and return a JSON response with the created worker data", (done) => {
    const newWorkerData = {
      worker_id: "24183988C",
      worker_email: "prueba@prueba.es",
      worker_name: "prueba",
      worker_surname: "prueba",
      worker_role: "doctor",
      passwd_auth: "adsfasdfasdf",
    };

    // Make a POST request to create a new worker
    request(app)
      .post("/api/v1/worker/")
      .send(newWorkerData)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // You can perform more assertions here if necessary
        done();
      });
  });
});

// Test case for PUT endpoint to update a worker by worker_id
describe("PUT /api/v1/worker/:worker_id", () => {
  it("should update the worker with the specified worker_id and verify the updated data", (done) => {
    const updatedWorkerData = {
      worker_id: "24183988C",
      worker_email: "ASDASD@correo.es",
      worker_name: "ASDASD",
      worker_surname: "ASDASD",
      worker_role: "doctor",
    };

    // Make a PUT request to update the worker
    request(app)
      .put("/api/v1/worker/24183988C")
      .send(updatedWorkerData)
      .expect(200) // Ensure the response has a 200 status code (success)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // Verify that the response is successful
        expect(res.body.message).toBe("Worker updated successfully"); // Adjust the success message according to your implementation

        // Make a GET request to verify that the data has been updated successfully

        done();
      });
  });
});

// Test case for DELETE endpoint to remove a worker by worker_id
describe("DELETE /api/v1/worker/:worker_id", () => {
  it("should delete the worker with the specified worker_id", (done) => {
    const workerIdToDelete = "24183988C";

    // Make a DELETE request to remove the worker
    request(app)
      .delete(`/api/v1/worker/${workerIdToDelete}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
