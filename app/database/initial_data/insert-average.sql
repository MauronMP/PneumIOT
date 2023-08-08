DO $$ 
DECLARE 
    patient_id_val CHARACTER VARYING := '95462380X';
    board_id_val CHARACTER VARYING := 'wdr-523-cxa-098';
    sensor_ids CHARACTER VARYING[] := ARRAY['HUMI-2023', 'OZON-2023'];
    today_date DATE := '2023-07-01';
    start_hour INT := 0;
    end_hour INT := 23;
    start_day INT := 1;
    end_day INT := 31; 
    end_dayFebruary INT := 28; 
    start_month INT := 1; 
    end_month INT := 12; 
    i INT := 1;
BEGIN
    WHILE i <= array_length(sensor_ids, 1) LOOP
        -- Loop to insert data in the hourly_average table
       FOR current_day IN start_day..end_day LOOP
            FOR current_hour IN start_hour..end_hour LOOP
                -- Random value for average_measure between 20 and 45
                RAISE NOTICE 'Inserting data for day %, hour %, sensor_id %', current_day, current_hour, sensor_ids[i];
                INSERT INTO pneumiot.hourly_average (patient_id, board_id, sensor_id, average_measure, hour_time, day_date)
                VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), current_hour, today_date + INTERVAL '1 day' * (current_day - 1));
            END LOOP;
        END LOOP;

        -- Loop for inserting data into the daily_average table
        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 1);
        END LOOP;

        FOR daily_day_val IN start_day..end_dayFebruary
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 2);
        END LOOP;

        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 3);
        END LOOP;
        
        -- Loop to insert data into the monthly_average table
        FOR monthly_day_val IN start_month..end_month
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', monthly_day_val, sensor_ids[i];
            INSERT INTO pneumiot.monthly_average (patient_id, board_id, sensor_id, average_measure, month_number, year_date)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), monthly_day_val, 2023);
        END LOOP;
        
        i := i + 1; -- Increment the index to move to the next value of sensor_id
    END LOOP;
END $$;


DO $$ 
DECLARE 
    patient_id_val CHARACTER VARYING := '76438300D';
    board_id_val CHARACTER VARYING := '123-abc-456-def';
    sensor_ids CHARACTER VARYING[] := ARRAY['TEMP-2023', 'HUMI-2023', 'OZON-2023', 'PM25-2023'];
    today_date DATE := '2023-07-01';
    start_hour INT := 0;
    end_hour INT := 23;
    start_day INT := 1;
    end_day INT := 31; 
    start_month INT := 1; 
    end_month INT := 12; 
    i INT := 1;
BEGIN
    WHILE i <= array_length(sensor_ids, 1) LOOP
        -- Loop to insert data in the hourly_average table
       FOR current_day IN start_day..end_day LOOP
            FOR current_hour IN start_hour..end_hour LOOP
                -- Random value for average_measure between 20 and 45
                RAISE NOTICE 'Inserting data for day %, hour %, sensor_id %', current_day, current_hour, sensor_ids[i];
                INSERT INTO pneumiot.hourly_average (patient_id, board_id, sensor_id, average_measure, hour_time, day_date)
                VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), current_hour, today_date + INTERVAL '1 day' * (current_day - 1));
            END LOOP;
        END LOOP;

        -- Loop for inserting data into the daily_average table
        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 7);
        END LOOP;

        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 6);
        END LOOP;

        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 8);
        END LOOP;
        
        -- Loop to insert data into the monthly_average table
        FOR monthly_day_val IN start_month..end_month
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', monthly_day_val, sensor_ids[i];
            INSERT INTO pneumiot.monthly_average (patient_id, board_id, sensor_id, average_measure, month_number, year_date)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), monthly_day_val, 2023);
        END LOOP;
        
        i := i + 1; -- Increment the index to move to the next value of sensor_id
    END LOOP;
END $$;



DO $$ 
DECLARE 
    patient_id_val CHARACTER VARYING := '76438300D';
    board_id_val CHARACTER VARYING := '987-zxc-654-ytr';
    sensor_ids CHARACTER VARYING[] := ARRAY['TEMP-2023', 'PM25-2023'];
    today_date DATE := '2023-07-01';
    start_hour INT := 0;
    end_hour INT := 23;
    start_day INT := 1;
    end_day INT := 31; 
    start_month INT := 1; 
    end_month INT := 12; 
    i INT := 1;
BEGIN
    WHILE i <= array_length(sensor_ids, 1) LOOP
        -- Loop to insert data in the hourly_average table
       FOR current_day IN start_day..end_day LOOP
            FOR current_hour IN start_hour..end_hour LOOP
                -- Random value for average_measure between 20 and 45
                RAISE NOTICE 'Inserting data for day %, hour %, sensor_id %', current_day, current_hour, sensor_ids[i];
                INSERT INTO pneumiot.hourly_average (patient_id, board_id, sensor_id, average_measure, hour_time, day_date)
                VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), current_hour, today_date + INTERVAL '1 day' * (current_day - 1));
            END LOOP;
        END LOOP;

        -- Loop for inserting data into the daily_average table
        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 6);
        END LOOP;

        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 4);
        END LOOP;

        FOR daily_day_val IN start_day..end_day
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', daily_day_val, sensor_ids[i];
            INSERT INTO pneumiot.daily_average (patient_id, board_id, sensor_id, average_measure, daily_day, month_id)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), daily_day_val, 1);
        END LOOP;
        
        -- Loop to insert data into the monthly_average table
        FOR monthly_day_val IN start_month..end_month
        LOOP
            -- Random value for average_measure between 20 and 45
            RAISE NOTICE 'Inserting data for day %, sensor_id %', monthly_day_val, sensor_ids[i];
            INSERT INTO pneumiot.monthly_average (patient_id, board_id, sensor_id, average_measure, month_number, year_date)
            VALUES (patient_id_val, board_id_val, sensor_ids[i], CAST((RANDOM() * 25 + 20) AS NUMERIC(4,2)), monthly_day_val, 2023);
        END LOOP;
        
        i := i + 1; -- Increment the index to move to the next value of sensor_id
    END LOOP;
END $$;
