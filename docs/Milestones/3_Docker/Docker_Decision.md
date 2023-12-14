# Project Documentation and Docker Usage

##  :elephant: Database (PostgreSQL)
- Reliability: The official PostgreSQL image is maintained by experts, ensuring a stable and reliable database setup.
- Security: It benefits from security updates provided by the PostgreSQL community.
- Maintenance: The official image is regularly updated, ensuring an up-to-date database environment.

## :snake: Testing Environment (Python)
- Environment Isolation: The use of a virtual environment (venv) ensures independence between the development and testing environments, avoiding conflicts between dependencies.
- Dependency Management: Poetry simplifies dependency management and ensures a consistent installation of libraries needed for testing.

## :whale: Need for Testing in Docker
Testing is essential to ensure the proper functioning of the application and to identify potential issues before deploying it in a production environment. By running tests in Docker containers, an isolated and reproducible testing environment is achieved, facilitating the identification and correction of errors.

## :musical_score: Use of Docker Compose
Docker Compose is used to orchestrate the database and testing services. This simplifies the configuration and execution of containers required for development and testing. By defining the environment in a docker-compose.yml file, consistency and replicability of the environment are ensured across different stages of the application lifecycle.

- Simple Orchestration: Docker Compose allows easy definition and management of multiple containers, simplifying development and testing.
- Dependencies: The testing service depends on the database service, ensuring that the database is available before running tests.