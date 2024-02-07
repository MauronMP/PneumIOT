# Docker compose:


```yaml
version: "3.9"

services:
  frontend:
    build:
      context: ./app/frontend
    image: spl720/frontend:latest
    ports:
      - "5000:5000"
    depends_on:
      - backend

  backend:
    build:
      context: ./app/backend
    image: spl720/backend:latest
    ports:
      - "3000:3000"
    depends_on:
      - database

  database:
    build:
      context: ./app/database
    image: spl720/database:latest
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: root
      POSTGRES_DB: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```


## Explanation

This `docker-compose.yml` file describes the configuration for orchestrating Docker containers that compose an application. Here's an explanation of each section:

**Version**: Indicates the version of Docker Compose that will be used to interpret this file. In this case, version 3.9 is being used.

**Services**: Defines the different container services that compose the application.

- **Frontend**: Configures the service for the application's frontend. It specifies building the image from the context of the directory `./app/frontend`, tags the resulting image as `spl720/frontend:latest`, exposes port 5000 of the container to port 5000 of the host, and depends on the `backend` service.

- **Backend**: Configures the service for the application's backend. Similar to the frontend, it specifies building the image from the context of the directory `./app/backend`, tags the image as `spl720/backend:latest`, exposes port 3000 of the container to port 3000 of the host, and depends on the `database` service.

- **Database**: Configures the service for the PostgreSQL database. It is built from the context of the directory `./app/database`, tags the image as `spl720/database:latest`, always restarts, defines environment variables for the PostgreSQL user, password, and database, exposes ports 5432 of the container to port 5432 of the host, and mounts a volume named `postgres_data` to store PostgreSQL's persistent data.

**Volumes**: Defines the `postgres_data` volume used to store PostgreSQL's persistent data.

In summary, this Docker Compose file defines the structure of the application, including frontend, backend, and database services, and sets up the necessary configurations for the containers to run and communicate with each other correctly.
