# Utiliza la imagen oficial de Python 3.10
FROM python:3.10

# Crea el directorio de la aplicación de prueba
RUN mkdir -p /app/test

# Configura el entorno virtual de Python
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Evita la generación de archivos bytecode de Python
RUN export PYTHONDONTWRITEBYTECODE=1

# Actualiza pip y Poetry
RUN pip install --upgrade pip poetry
COPY app/database/pyproject.toml app/database/poetry.lock app/database/tasks.py  ./ 

# Elimina los archivos de configuración de Poetry
RUN poetry install

# Crea el directorio de pruebas y copia los archivos de prueba
RUN mkdir -p /tests
COPY app/database/tests/* /tests/

# Establece el directorio de trabajo
WORKDIR /tests

# Establece el punto de entrada del contenedor para ejecutar los tests con Invoke
ENTRYPOINT ["inv", "test"]
