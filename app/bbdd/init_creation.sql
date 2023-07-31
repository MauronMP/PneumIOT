-- Active: 1688058502640@@127.0.0.1@5432@PneumlOT@public

DROP SCHEMA if EXISTS pneumiot CASCADE;

Create SCHEMA IF NOT EXISTS pneumiot;

-- Creacion de la tabla sensor --
CREATE TABLE IF NOT EXISTS pneumiot.sensor(
    sensor_id character varying(50) UNIQUE NOT NULL,
    sensor_type character varying(50) NOT NULL,
    sensor_units character varying(50) NOT NULL,
    min_value numeric(4,2) NOT NULL,
    max_value numeric(4,2) NOT NULL,
    PRIMARY KEY(sensor_id)
);


-- Creación de la tabla board --
CREATE TABLE IF NOT EXISTS pneumiot.board(
    event_id SERIAL NOT NULL,
    board_id character varying(50) NOT NULL,
    sensor_id character varying(50) NOT NULL REFERENCES pneumiot.sensor(sensor_id),
    PRIMARY KEY(event_id)
);

-- Creación de la tabla patient --
CREATE TABLE IF NOT EXISTS pneumiot.patient (
    event_patient_id SERIAL NOT NULL,
    patient_id VARCHAR(10) NOT NULL,
    board_id character varying(50) NOT NULL,
    discharge_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    admission_date timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(event_patient_id)
);

-- Creación de la tabla measurements --
CREATE TABLE IF NOT EXISTS pneumiot.measurements(
    event_id SERIAL NOT NULL,
    patient_id character varying(50),
    board_id character varying(50),
    sensor_id character varying(50) NOT NULL,
    sensor_value numeric(4,2) NOT NULL,
    log_time_utc timestamp without time zone NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
    log_time_local TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(event_id)
);


-- Creación de la tabla sensor_log -- 
CREATE TABLE IF NOT EXISTS pneumiot.sensor_log (
    log_id SERIAL NOT NULL,
    board_id character varying(50),
    sensor_id character varying(50) NOT NULL,
    log_message character varying(250),
    PRIMARY KEY(log_id)
);

-- Creación de la tabla worker --
Create table if not exists pneumiot.worker(
    worker_id VARCHAR(50) UNIQUE NOT NULL,
    worker_email VARCHAR(50) NOT NULL,
    worker_name VARCHAR(20) NOT NULL,
    worker_surname VARCHAR(20) NOT NULL,
    worker_role VARCHAR(20) NOT NULL,
    PRIMARY KEY(worker_id)
);

-- Creación de la tabla worker_auth --
Create table if not exists pneumiot.worker_auth(
    worker_id character varying(50) UNIQUE REFERENCES pneumiot.worker (worker_id),
    passwd_auth character varying(128) not null
);

-- Creación de la tabla user_log --
create table if not exists pneumiot.worker_log(
    log_id Serial UNIQUE not null,
    worker_id VARCHAR(50) REFERENCES pneumiot.worker(worker_id),
    log_message VARCHAR(250) not null,
    PRIMARY KEY(log_id)
);

-- Creación de la tabla doctor --
Create table if not exists pneumiot.doctor (
    doctor_patient_id serial,
    patient_id VARCHAR(50) not null,
    worker_id VARCHAR(50) not null,
    PRIMARY KEY (doctor_patient_id),
    FOREIGN KEY (worker_id) REFERENCES pneumiot.worker(worker_id)
);
