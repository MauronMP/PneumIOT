
CREATE TABLE IF NOT EXISTS pneumiot.measurements(
    event_id SERIAL NOT NULL,
    patient_id character varying(50) REFERENCES pneumiot.patient(patient_id),
    board_id character varying(50) REFERENCES pneumiot.board(board_id),
    sensor_id character varying(50) NOT NULL,
    sensor_value numeric(4,2) NOT NULL,
    log_time_utc timestamp without time zone NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
    log_time_local TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(sensor_id)
);
