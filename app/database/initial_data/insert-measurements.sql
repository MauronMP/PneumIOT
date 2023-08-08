
DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('95462380X','wdr-523-cxa-098', 'HUMI-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;

DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('95462380X','wdr-523-cxa-098', 'OZON-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;


DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('76438300D','987-zxc-654-ytr', 'PM25-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;


DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('76438300D','987-zxc-654-ytr', 'TEMP-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;

DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('76438300D','987-zxc-654-ytr', 'PM25-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;


DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('76438300D','123-abc-456-def', 'TEMP-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;


DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.measurements (patient_id, board_id, sensor_id , sensor_value, log_time_utc, log_time_local)
        VALUES ('96587412H','123-abc-456-def', 'PM25-2023', 
            (RANDOM() * 99)::numeric(4,2),
            CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter,
            CURRENT_TIMESTAMP - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);   
        counter := counter + 1;
    END LOOP;
END $$;
