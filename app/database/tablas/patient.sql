-- Active: 1688058502640@@127.0.0.1@5432@PneumlOT@public
-- Generated by the database client, not guaranteed complete.
CREATE TABLE IF NOT EXISTS pneumiot.patient (
    patient_id VARCHAR(10) PRIMARY KEY,
    board_id character varying(50) REFERENCES board (board_id),
    discharge_date timestamp without time zone NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
    admission_date timestamp without time zone NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text)
);


INSERT INTO pneumiot.patient (patient_id, board_id, discharge_date, admission_date);

SELECT b.patient_id, b.board_id,
       CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '4 hours' + INTERVAL '1 minute' * (v.num - 1) AS discharge_date,
       CURRENT_TIMESTAMP AT TIME ZONE 'UTC' - INTERVAL '4 hours' + INTERVAL '1 minute' * (v.num - 1) AS admission_date
FROM (
  SELECT unnest(ARRAY['P001', 'P002', 'P003', 'P004']) AS patient_id
) AS p
CROSS JOIN (
  SELECT generate_series(1, 1) AS num
) AS v
JOIN pneumiot.board b ON b.patient_id = p.patient_id
WHERE NOT EXISTS (
  SELECT 1
  FROM pneumiot.patient
  WHERE patient.patient_id = b.patient_id
);




select * from pneumiot.patient;

DROP TABLE IF EXISTS pneumiot.patient;