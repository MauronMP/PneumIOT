

INSERT INTO pneumiot.sensor (sensor_id, sensor_type, sensor_units, min_value, max_value)
VALUES (
    'ddd-ddd',
    'pm_sensor',
    'ug/m3',    
    0,
    99
);

INSERT INTO pneumiot.sensor (sensor_id, sensor_type, sensor_units, min_value, max_value)
VALUES (
    'ccc-ccc',
    'ozone_sensor',
    'ug/m3',
    0,
    99
);

INSERT INTO pneumiot.sensor (sensor_id, sensor_type, sensor_units, min_value, max_value)
VALUES (
    'bbb-bbb',
    'humidity_sensor',
    '%',
    0,
    99
);

INSERT INTO pneumiot.sensor (sensor_id, sensor_type, sensor_units, min_value, max_value)
VALUES (
    'aaa-aaa',
    'temperature_sensor',
    'ºC',
    0,
    99
);

INSERT INTO pneumiot.board (board_id,sensor_id)
VALUES(
    '123-abc-456-def',
    'aaa-aaa'
);

INSERT INTO pneumiot.board (board_id,sensor_id)
VALUES(
    '987-zxc-654-ytr',
    'aaa-aaa'
);

INSERT INTO pneumiot.board (board_id,sensor_id)
VALUES(
    '123-abc-456-def',
    'bbb-bbb'
);

INSERT INTO pneumiot.board (board_id,sensor_id)
VALUES(
    '123-abc-456-def',
    'ccc-ccc'
);

INSERT INTO pneumiot.board (board_id,sensor_id)
VALUES(
    '123-abc-456-def',
    'ddd-ddd'
);

INSERT INTO pneumiot.patient (patient_id, board_id, discharge_date, admission_date)
VALUES (
    '76438301D',
    '123-abc-456-def',
    CURRENT_TIMESTAMP - INTERVAL '8 hours' + INTERVAL '1 minute',
    CURRENT_TIMESTAMP - INTERVAL '28 days' + INTERVAL '1 minute'
);

INSERT INTO pneumiot.patient(patient_id, board_id, discharge_date, admission_date)
VALUES(
    '95846502Y',
    '987-zxc-654-ytr',
    CURRENT_TIMESTAMP - INTERVAL '8 hours' + INTERVAL '1 minute',
    CURRENT_TIMESTAMP - INTERVAL '28 days' + INTERVAL '1 minute'
);

INSERT INTO pneumiot.patient(patient_id, board_id, discharge_date, admission_date)
VALUES(
    '95846502Y',
    '123-abc-456-def',
    CURRENT_TIMESTAMP - INTERVAL '8 hours' + INTERVAL '1 minute',
    CURRENT_TIMESTAMP - INTERVAL '28 days' + INTERVAL '1 minute'
);

INSERT INTO pneumiot.patient(patient_id, board_id, discharge_date, admission_date)
VALUES(
    '96587412H',
    '123-abc-456-def',
    CURRENT_TIMESTAMP - INTERVAL '8 hours' + INTERVAL '1 minute',
    CURRENT_TIMESTAMP - INTERVAL '28 days' + INTERVAL '1 minute'
);


INSERT INTO pneumiot.patient(patient_id, board_id, discharge_date, admission_date)
VALUES(
    '96587412H',
    '987-zxc-654-ytr',
    CURRENT_TIMESTAMP - INTERVAL '8 hours' + INTERVAL '1 minute',
    CURRENT_TIMESTAMP - INTERVAL '28 days' + INTERVAL '1 minute'
);

DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('76438301D','123-abc-456-def', 'ddd-ddd', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;

-- Datos de la tabla worker_log --
INSERT INTO pneumiot.sensor_log (board_id, sensor_id, log_message)
VALUES (    '123-abc-456-def',
            'ddd-ddd',
            'se ha dado una alerta con el usuario ... '
        );

Insert into pneumiot.worker (worker_id, worker_email, worker_name, worker_surname, worker_role)
VALUES ('24183922C', 'correoPruba@correo.ugr.es', 'pruba', 'prubando', 'doctor'),
 ('76438302P', 'pablo@correo.ugr.es', 'pablo', 'morenilla', 'admin'),
 ('95741208Y', 'alexa@correo.ugr.es', 'alexa', 'alexa', 'doctor');

Insert into pneumiot.doctor(patient_id, worker_id)
Values ('76438301D', '24183922C');


INSERT into pneumiot.worker_log(worker_id, log_message)
VALUES ('24183922C', 'se ha dado una alerta con el usuario ... ');

INSERT INTO pneumiot.worker_auth (worker_id, passwd_auth)
VALUES ('24183922C', '1234'),
    ('76438302P', 'admin'),
    ('95741208Y', '1234');
