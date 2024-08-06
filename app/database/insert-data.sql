-- Configurar el entorno para plpgsql
DO $$
DECLARE
    -- Variables de bucle
    i INT;
    j INT;
    patient_count INT := 100;
    board_count INT := 10;
    sensor_count INT := 10;
    worker_count INT := 10;
    index_rate_count INT := 3;
BEGIN
    -- Habilitar la extensión pgcrypto para generar UUIDs
    CREATE EXTENSION IF NOT EXISTS pgcrypto;

    -- Inserción de datos en la tabla units
    INSERT INTO pneumiot.units (unit_abbreviation, unit_description) VALUES
    ('TEMP', 'Temperature in Celsius'),
    ('PRES', 'Pressure in mmHg'),
    ('HUM', 'Humidity in %'),
    ('O2', 'Oxygen level in %');

    -- Inserción de datos en la tabla board con UUID
    FOR i IN 1..board_count LOOP
        INSERT INTO pneumiot.board (board_code) VALUES
        (gen_random_uuid());
    END LOOP;

    -- Inserción de datos en la tabla sensor con UUID
    FOR i IN 1..sensor_count LOOP
        INSERT INTO pneumiot.sensor (sensor_code, sensor_type, unit_id, min_value, max_value) VALUES
        (gen_random_uuid(), 'Temperature Sensor', 1, 0, 50),
        (gen_random_uuid(), 'Pressure Sensor', 2, 0, 30),
        (gen_random_uuid(), 'Humidity Sensor', 3, 0, 99),
        (gen_random_uuid(), 'Oxygen Sensor', 4, 0, 99);
    END LOOP;

    -- Inserción de datos en la tabla board_sensor
    FOR i IN 1..board_count LOOP
        FOR j IN 1..sensor_count LOOP
            INSERT INTO pneumiot.board_sensor (board_id, sensor_id) VALUES
            (i, j);
        END LOOP;
    END LOOP;

    -- Inserción de datos en la tabla patient
    FOR i IN 1..patient_count LOOP
        INSERT INTO pneumiot.patient (patient_dni, board_id, discharge_date, admission_date) VALUES
        ('' || LPAD(FLOOR(RANDOM() * 100000000)::TEXT, 8, '0') || CHR(65 + FLOOR(RANDOM() * 26)::INT), (i % board_count) + 1, CURRENT_DATE + interval '30 day', CURRENT_DATE);
    END LOOP;

    -- Inserción de datos en la tabla measurements
    FOR i IN 1..patient_count LOOP
        FOR j IN 1..sensor_count LOOP
            INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id, sensor_value, log_time_utc, log_time_local) VALUES
            (i, (i % board_count) + 1, j, (random() * 10)::numeric(4,2), CURRENT_TIMESTAMP AT TIME ZONE 'UTC', CURRENT_TIMESTAMP);
        END LOOP;
    END LOOP;

    -- Inserción de datos en la tabla sensor_log
    FOR i IN 1..board_count LOOP
        FOR j IN 1..sensor_count LOOP
            INSERT INTO pneumiot.sensor_log (board_id, sensor_id, log_message) VALUES
            (i, j, 'Log message for board ' || LPAD(i::text, 3, '0') || ' sensor ' || LPAD(j::text, 2, '0'));
        END LOOP;
    END LOOP;

    -- Inserción de datos en la tabla worker_role
    INSERT INTO pneumiot.worker_role (worker_role_name, worker_role_description) VALUES
    ('admin', 'Administrator with full access'),
    ('doctor', 'Medical doctor with patient access'),
    ('nurse', 'Nurse with patient access'),
    ('demo', 'Demo role with limited access');

    -- Inserción de datos en la tabla worker
    INSERT INTO pneumiot.worker (worker_dni, worker_email, worker_name, worker_surname, worker_role_id) VALUES
    ('12345678A', 'marta.perez@example.com', 'Marta', 'Pérez', (SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'nurse')),  -- nurse
    ('23456789B', 'juan.martin@example.com', 'Juan', 'Martín', (SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'doctor')),  -- doctor
    ('34567890C', 'ana.garcia@example.com', 'Ana', 'García', (SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'demo')),  -- demo
    ('45678901D', 'luis.fernandez@example.com', 'Luis', 'Fernández', (SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'admin')),  -- admin
    ('56789012E', 'luisa.lopez@example.com', 'Luisa', 'López', (SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'admin')),  -- admin
    ('67890123F', 'jorge.martinez@example.com', 'Jorge', 'Martínez', (SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'doctor')),  -- doctor
    ('78901234G', 'elena.gonzalez@example.com', 'Elena', 'González', (SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'nurse')),  -- nurse
    ('89012345H', 'pedro.sanchez@example.com', 'Pedro', 'Sánchez', (SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'demo')),  -- demo
    ('90123456I', 'paola.romero@example.com', 'Paola', 'Romero', (SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'doctor')),  -- doctor
    ('01234567J', 'alvaro.morales@example.com', 'Álvaro', 'Morales', (SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'nurse'));  -- nurse

    -- Inserción de datos en la tabla worker_auth
    FOR i IN 1..worker_count LOOP
        INSERT INTO pneumiot.worker_auth (worker_id, passwd_auth) VALUES
        (i, LPAD('password' || i, 128, '0'));
    END LOOP;

    -- Inserción de datos en la tabla worker_log
    FOR i IN 1..worker_count LOOP
        INSERT INTO pneumiot.worker_log (worker_id, log_message) VALUES
        (i, 'Log message for worker ' || i);
    END LOOP;

    -- Inserción de datos en la tabla doctor
    FOR i IN 1..patient_count LOOP
        INSERT INTO pneumiot.doctor (patient_id, worker_id) VALUES
        (i, (i % worker_count) + 1);
    END LOOP;

    -- Inserción de datos en la tabla index_rate
    INSERT INTO pneumiot.index_rate (rate, rate_description) VALUES
    ('Low', 'Low risk'),
    ('Medium', 'Medium risk'),
    ('High', 'High risk');

    -- Inserción de datos en la tabla hourly_average
    FOR i IN 1..patient_count LOOP
        FOR j IN 1..sensor_count LOOP
            INSERT INTO pneumiot.hourly_average (patient_id, board_id, sensor_id, average_measure, index_rate_id, hour_time, day_date) VALUES
            (i, (i % board_count) + 1, j, (random() * 10)::numeric(4,2), (j % index_rate_count) + 1, 12, CURRENT_DATE);
        END LOOP;
    END LOOP;

    -- Inserción de datos en la tabla daily_average
    FOR i IN 1..patient_count LOOP
        FOR j IN 1..sensor_count LOOP
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id) VALUES
            (i, (i % board_count) + 1, j, (random() * 10)::numeric(4,2), (j % index_rate_count) + 1, EXTRACT(DAY FROM CURRENT_DATE)::INT, EXTRACT(MONTH FROM CURRENT_DATE)::INT);
        END LOOP;
    END LOOP;

    -- Inserción de datos en la tabla monthly_average
    FOR i IN 1..patient_count LOOP
        FOR j IN 1..sensor_count LOOP
            INSERT INTO pneumiot.monthly_average (patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date) VALUES
            (i, (i % board_count) + 1, j, (random() * 10)::numeric(4,2), (j % index_rate_count) + 1, EXTRACT(MONTH FROM CURRENT_DATE)::INT, EXTRACT(YEAR FROM CURRENT_DATE)::INT);
        END LOOP;
    END LOOP;

    -- Inserción de datos en la tabla error_log
    FOR i IN 1..100 LOOP
        INSERT INTO pneumiot.error_log (log_message) VALUES
        ('Error log message ' || LPAD(i::text, 3, '0'));
    END LOOP;

    -- Inserción de permisos
    INSERT INTO pneumiot.permissions (permission_name, permission_description) VALUES
    ('view_patient_data', 'View patient data'),
    ('edit_patient_data', 'Edit patient data'),
    ('view_measurements', 'View sensor measurements'),
    ('edit_measurements', 'Edit sensor measurements'),
    ('manage_roles', 'Manage user roles and permissions'),
    ('manage_users', 'Manage user accounts'),
    ('view_system_logs', 'View system and error logs');

    -- Asignar permisos a roles
    -- Admin role with all permissions
    INSERT INTO pneumiot.role_permissions (worker_role_id, permission_id) VALUES
    ((SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'admin'), 
     (SELECT permission_id FROM pneumiot.permissions WHERE permission_name = 'view_patient_data')),
    ((SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'admin'), 
     (SELECT permission_id FROM pneumiot.permissions WHERE permission_name = 'edit_patient_data')),
    ((SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'admin'), 
     (SELECT permission_id FROM pneumiot.permissions WHERE permission_name = 'view_measurements')),
    ((SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'admin'), 
     (SELECT permission_id FROM pneumiot.permissions WHERE permission_name = 'edit_measurements')),
    ((SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'admin'), 
     (SELECT permission_id FROM pneumiot.permissions WHERE permission_name = 'manage_roles')),
    ((SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'admin'), 
     (SELECT permission_id FROM pneumiot.permissions WHERE permission_name = 'manage_users')),
    ((SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'admin'), 
     (SELECT permission_id FROM pneumiot.permissions WHERE permission_name = 'view_system_logs'));

    -- Doctor role with specific permissions
    INSERT INTO pneumiot.role_permissions (worker_role_id, permission_id) VALUES
    ((SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'doctor'), 
     (SELECT permission_id FROM pneumiot.permissions WHERE permission_name = 'view_patient_data')),
    ((SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'doctor'), 
     (SELECT permission_id FROM pneumiot.permissions WHERE permission_name = 'view_measurements'));

    -- Nurse role with specific permissions
    INSERT INTO pneumiot.role_permissions (worker_role_id, permission_id) VALUES
    ((SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'nurse'), 
     (SELECT permission_id FROM pneumiot.permissions WHERE permission_name = 'view_patient_data')),
    ((SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'nurse'), 
     (SELECT permission_id FROM pneumiot.permissions WHERE permission_name = 'view_measurements'));

    -- Demo role with limited permissions
    INSERT INTO pneumiot.role_permissions (worker_role_id, permission_id) VALUES
    ((SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'demo'), 
     (SELECT permission_id FROM pneumiot.permissions WHERE permission_name = 'view_patient_data')),
    ((SELECT worker_role_id FROM pneumiot.worker_role WHERE worker_role_name = 'demo'), 
     (SELECT permission_id FROM pneumiot.permissions WHERE permission_name = 'view_measurements'));

END $$;
