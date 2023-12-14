# Set the base image
FROM postgres:latest

# Copy the script to generate the database
COPY init-db.sql /docker-entrypoint-initdb.d/

# Copy the script to insert data
COPY insert-data.sql /docker-entrypoint-initdb.d/

