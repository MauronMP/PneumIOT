# Use the official Python 3.10 image
FROM python:3.10

# Create the test application directory
RUN mkdir -p /app/test

# Configure the Python virtual environment
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Avoid generating Python bytecode files
RUN export PYTHONDONTWRITEBYTECODE=1

# Update pip and Poetry
RUN pip install --upgrade pip poetry

# Copy the necessary files for Poetry to install dependencies
COPY app/database/pyproject.toml app/database/poetry.lock app/database/tasks.py  ./ 

# Install Python dependencies using Poetry
RUN poetry install

# Create the tests directory and copy test files
RUN mkdir -p /tests
COPY app/database/tests/* /tests/

# Set the working directory
WORKDIR /tests

# Set the container entry point to run tests with Invoke
ENTRYPOINT ["inv", "test"]