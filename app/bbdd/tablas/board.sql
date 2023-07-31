-- Active: 1688058502640@@127.0.0.1@5432@PneumlOT@public
-- Generated by the database client, not guaranteed complete.
CREATE TABLE IF NOT EXISTS pneumiot.board(
    event_id SERIAL NOT NULL,
    board_id character varying(50) NOT NULL,
    PRIMARY KEY(event_id)
);

INSERT INTO pneumiot.board (board_id, pm_sensor, ozone_sensor, humidity_sensor, temperature_sensor, log_time)
VALUES( '123-abc-456-def', (RANDOM() * 100)::numeric(4,2), (RANDOM() * 100)::numeric(4,2), (RANDOM() * 100)::numeric(4,2), (RANDOM() * 100)::numeric(4,2),
       CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '1 hours' + INTERVAL '1 minute');


DO $$
DECLARE
    counter INTEGER := 1;
BEGIN
    WHILE counter <= 200 LOOP
        INSERT INTO pneumiot.board (board_id, pm_sensor, ozone_sensor, humidity_sensor, temperature_sensor, log_time)
        VALUES ('123-abc-456-def', (RANDOM() * 100)::numeric(4,2), (RANDOM() * 100)::numeric(4,2), (RANDOM() * 100)::numeric(4,2), (RANDOM() * 100)::numeric(4,2),
               CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '8 hour' + INTERVAL '1 minute' * counter);
        
        counter := counter + 1;
    END LOOP;
END $$;


DELETE FROM pneumiot.board WHERE board_id = '123-abc-456-def';

SELECT * FROM pneumiot.board;

Select DISTINCT(pneumiot.board.board_id), pneumiot.patient.patient_id from pneumiot.board inner JOIN pneumiot.patient ON pneumiot.board.board_id = pneumiot.patient.board_id;

DROP TABLE IF EXISTS board;