create table if not exists pneumiot.user_log(
    log_id Serial UNIQUE not null,
    worker_id VARCHAR(50) REFERENCES pneumiot.worker(worker_id),
    log_message VARCHAR(250) not null,
    PRIMARY KEY(log_id)
);

Select * from pneumiot.user_log;

Drop table if not exists pneumiot.user_log;