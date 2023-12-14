from invoke import task, run

@task
def test(c):
    run("poetry run pytest -v")

@task
def install(c):
    run("poetry install --no-root")