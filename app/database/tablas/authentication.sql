-- Active: 1688058502640@@127.0.0.1@5432@postgres
Create table if not exists worker_auth(
    worker_id character varying(50) REFERENCES worker (worker_id),
    passwd_auth character varying(128) not null
);


SELECT  worker_email, passwd_auth, worker_name, worker_role
FROM pneumiot.worker_auth
INNER JOIN pneumiot.worker
ON pneumiot.worker_auth.worker_id = pneumiot.worker.worker_id
WHERE pneumiot.worker.worker_email = 'mateo@correo.ugr.es';

select * from pneumiot.worker_auth;

drop table if exists worker_auth;