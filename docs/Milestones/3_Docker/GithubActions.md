# GitHub Actions and GitHub Packages for Project

## Overview
This GitHub Actions workflow is designed to automate the build and publishing of Docker images, utilizing GitHub Packages for versioning and distribution. The workflow is triggered on pushes to specific paths and on published releases.

## :arrows_counterclockwise: Workflow Structure
The workflow consists of a job named "docker" that runs on an Ubuntu latest environment. It leverages a matrix strategy to build different Docker images specified in the matrix.

### :koko: Matrix Builds
The matrix includes two configurations:

- Image: spl720/test_database, spl720/test_python_database
- Dockerfile: docker/test/database/test.dockerfile, docker/test/database/test.pythonEnv.dockerfile
- Steps
    - Checkout: Fetches the repository content.
    - Login to Docker Hub: Uses Docker's login action to authenticate with Docker Hub using secret credentials.
    - Login to the Container registry (GitHub Container Registry): Logs in to GitHub Container Registry (ghcr.io) using the GitHub token.
    - Extract metadata (tags, labels) for Docker: Utilizes Docker's metadata-action to gather information for image tagging and labeling.
- Build and push: Uses Docker's build-push-action to build the Docker image, tag it, and push it to the specified registry.
- Triggers
- The workflow triggers on pushes to specific paths, including changes to the PyProject file, Dockerfiles, and release events.

- Permissions
    - Read: Read access to repository contents.
    - Write: Write access to GitHub Packages.


## :question: Why Use GitHub Actions and GitHub Packages?
- Automation: GitHub Actions automates the build and release process, reducing manual intervention and potential errors.
- Matrix Builds: The matrix strategy allows parallel builds for different configurations, optimizing the workflow.
- GitHub Packages: Utilizing GitHub Packages for Docker image hosting provides versioning, dependency management, and access control.

## :construction: Why GitHub Actions?

- Tight Integration: GitHub Actions integrates seamlessly with GitHub repositories, offering a native CI/CD solution.
- Workflow as Code: The workflow is defined in code (YAML), making it versionable, reproducible, and easy to understand.
- Community Actions: A rich ecosystem of community-contributed actions simplifies workflow creation.

## :file_folder: Why GitHub Packages?
- Native Integration: GitHub Packages is tightly integrated with GitHub, offering a centralized registry for packages.
- Scoped Access: Fine-grained access control allows secure package distribution within the GitHub ecosystem.
- Versioning: GitHub Packages provides versioning for Docker images, ensuring consistent and reliable deployments.