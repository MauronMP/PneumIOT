
CREATE TABLE IF NOT EXISTS pneumiot.sensor(
    sensor_id character varying(50) UNIQUE NOT NULL,
    sensor_type character varying(50) NOT NULL,
    sensor_units character varying(50) NOT NULL,
    min_value numeric(4,2) NOT NULL,
    max_value numeric(4,2) NOT NULL,
    PRIMARY KEY(sensor_id)
);


SELECT * FROM pneumiot.sensor where sensor_id = '123-abc-456-def';