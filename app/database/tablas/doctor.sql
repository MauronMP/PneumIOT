-- Active: 1688058502640@@127.0.0.1@5432@postgres
Create table if not exists pneumiot.doctor (
    doctor_patient_id serial,
    patient_id VARCHAR(50) not null UNIQUE,
    worker_id VARCHAR(50) not null UNIQUE,
    PRIMARY KEY (doctor_patient_id),
    FOREIGN KEY (patient_id) REFERENCES pneumiot.patient(patient_id),
    FOREIGN KEY (worker_id) REFERENCES pneumiot.worker(worker_id)
);

SELECT * from pneumiot.doctor;

DELETE FROM pneumiot.doctor Where doctor_patient_id = 5;

SELECT * from pneumiot.doctor where worker_id = '24183922C';


SELECT  pneumiot.doctor.patient_id, board_id, discharge_date, admission_date
FROM pneumiot.patient
INNER JOIN pneumiot.doctor
ON pneumiot.patient.patient_id = pneumiot.doctor.patient_id
WHERE pneumiot.doctor.worker_id = '24183922C';

Drop table if EXISTS pneumiot.doctor;