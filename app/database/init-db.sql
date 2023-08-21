-- Active: 1688058502640@@127.0.0.1@5432@PneumlOT@public

DROP SCHEMA if EXISTS pneumiot CASCADE;

CREATE SCHEMA IF NOT EXISTS pneumiot;

-- Creation of the sensor board --
CREATE TABLE IF NOT EXISTS pneumiot.sensor(
    sensor_id CHARACTER VARYING(50) UNIQUE NOT NULL,
    sensor_type CHARACTER VARYING(50) NOT NULL,
    sensor_units CHARACTER VARYING(50) NOT NULL,
    min_value numeric(4,2) NOT NULL,
    max_value numeric(4,2) NOT NULL,
    PRIMARY KEY(sensor_id)
);


-- Creation of the board table --
CREATE TABLE IF NOT EXISTS pneumiot.board(
    event_id SERIAL NOT NULL,
    board_id CHARACTER VARYING(50) NOT NULL,
    sensor_id CHARACTER VARYING(50) NOT NULL REFERENCES pneumiot.sensor(sensor_id),
    PRIMARY KEY(event_id)
);

-- Creation of the patient table --
CREATE TABLE IF NOT EXISTS pneumiot.patient (
    event_patient_id SERIAL NOT NULL,
    patient_id VARCHAR(10) NOT NULL,
    board_id CHARACTER VARYING(50) NOT NULL,
    discharge_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    admission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(event_patient_id)
);

-- Creation of the measurements table --
CREATE TABLE IF NOT EXISTS pneumiot.measurements(
    event_id SERIAL NOT NULL,
    patient_id CHARACTER VARYING(50),
    board_id CHARACTER VARYING(50),
    sensor_id CHARACTER VARYING(50) NOT NULL,
    sensor_value numeric(4,2) NOT NULL,
    log_time_utc TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
    log_time_local TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(event_id)
);


-- Creation of the sensor_log table -- 
CREATE TABLE IF NOT EXISTS pneumiot.sensor_log (
    log_id SERIAL NOT NULL,
    board_id CHARACTER VARYING(50),
    sensor_id CHARACTER VARYING(50) NOT NULL,
    log_message CHARACTER VARYING(250),
    PRIMARY KEY(log_id)
);

-- Creation of the worker table --
CREATE TABLE IF NOT EXISTS pneumiot.worker(
    worker_id VARCHAR(50) UNIQUE NOT NULL,
    worker_email VARCHAR(50) NOT NULL,
    worker_name VARCHAR(20) NOT NULL,
    worker_surname VARCHAR(20) NOT NULL,
    worker_role VARCHAR(20) NOT NULL,
    PRIMARY KEY(worker_id)
);

-- Creation of the worker_auth table --
CREATE TABLE IF NOT EXISTS pneumiot.worker_auth(
    worker_id CHARACTER VARYING(50) UNIQUE REFERENCES pneumiot.worker (worker_id),
    passwd_auth CHARACTER VARYING(128) NOT NULL
);

-- Creation of the worker_log table --
CREATE TABLE IF NOT EXISTS pneumiot.worker_log(
    log_id Serial UNIQUE NOT NULL,
    worker_id VARCHAR(50) NOT NULL,
    log_message VARCHAR(250) NOT NULL,
    PRIMARY KEY(log_id)
);

-- Creation of the doctor table --
CREATE TABLE IF NOT EXISTS pneumiot.doctor (
    doctor_patient_id serial,
    patient_id VARCHAR(50) NOT NULL,
    worker_id VARCHAR(50) NOT NULL,
    PRIMARY KEY (doctor_patient_id),
    FOREIGN KEY (worker_id) REFERENCES pneumiot.worker(worker_id)
);

-- Creation of the hourly_average table --
CREATE TABLE IF NOT EXISTS pneumiot.hourly_average(
    event_id SERIAL NOT NULL,
    patient_id CHARACTER VARYING(50),
    board_id CHARACTER VARYING(50),
    sensor_id CHARACTER VARYING(50) NOT NULL,
    average_measure numeric(4,2) NOT NULL,
    hour_time int NOT NULL,
    day_date date NOT NULL,
    PRIMARY KEY(event_id)
);

-- Creation of the daily_average table --
CREATE TABLE IF NOT EXISTS pneumiot.daily_average(
    event_id SERIAL NOT NULL,
    patient_id CHARACTER VARYING(50),
    board_id CHARACTER VARYING(50),
    sensor_id CHARACTER VARYING(50) NOT NULL,
    average_measure numeric(4,2) NOT NULL,
    daily_day int NOT NULL,
    month_id int NOT NULL,
    PRIMARY KEY(event_id)
);

-- Creation of the monthly_average table --
CREATE TABLE IF NOT EXISTS pneumiot.monthly_average(
    event_id SERIAL NOT NULL,
    patient_id CHARACTER VARYING(50),
    board_id CHARACTER VARYING(50),
    sensor_id CHARACTER VARYING(50) NOT NULL,
    average_measure numeric(4,2) NOT NULL,
    month_number int NOT NULL,
    year_date int NOT NULL,
    PRIMARY KEY(event_id)
);

-- Creation of the error_log table -- 
CREATE TABLE IF NOT EXISTS pneumiot.error_log (
    log_id SERIAL NOT NULL,
    log_message CHARACTER VARYING(250),
    PRIMARY KEY(log_id)
);