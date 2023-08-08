-- Active: 1688058502640@@127.0.0.1@5432@postgres@pneumiot
Create table if not exists worker(
    worker_id VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) NOT NULL,
    worker_name VARCHAR(20) NOT NULL,
    worker_surname VARCHAR(20) NOT NULL,
    rol VARCHAR(20) NOT NULL,
    PRIMARY KEY(worker_id)
);

SELECT * from pneumiot.worker;

SELECT * FROM pneumiot.worker WHERE worker_role != 'admin';

Select * from pneumiot.worker_auth;

Delete from pneumiot.worker where worker_id = '14120840P'; 

DROP table if EXISTS pneumiot.worker;