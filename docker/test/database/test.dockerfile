# Set the base image
FROM postgres:latest

# Copy the script to generate the database
COPY /app/database/init-db.sql /docker-entrypoint-initdb.d/
# Copy the script to insert data
COPY /app/database/insert-data.sql /docker-entrypoint-initdb.d/

# Grant execution permissions
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sql
RUN chmod +x /docker-entrypoint-initdb.d/insert-data.sql