import pytest
from sqlalchemy import create_engine, text

# Database connection configuration
DB_CONFIG = {
    'user': 'postgres',
    'password': 'root',
    'host': 'database',  # Nombre del servicio del contenedor Docker
    # 'host': 'localhost',    # En  caso de ejecutar en local
    'port': '5432',
    'database': 'postgres'
}

# Function to connect to the database using sqlalchemy
def connect_db():
    engine = create_engine(f"postgresql+psycopg2://{DB_CONFIG['user']}:{DB_CONFIG['password']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['database']}")
    return engine

# Pytest fixture to set up and close the database connection
@pytest.fixture
def db_connection():
    connection = connect_db()
    yield connection
    connection.dispose()

# Test example to check the existence of a table in the 'pneumiot' schema
@pytest.mark.parametrize("table_name", ["sensor", "board", "patient", "measurements", "sensor_log", "worker", "worker_auth", "worker_log", "doctor", "hourly_average", "daily_average", "monthly_average", "error_log"])
def test_table_existence(db_connection, table_name):
    query = text(f"SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '{table_name}' AND table_schema = 'pneumiot')")
    with db_connection.connect() as connection:
        result = connection.execute(query)
        assert result.scalar(), f"The '{table_name}' table does not exist in the 'pneumiot' schema."
