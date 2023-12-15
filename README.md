# PneumIOT

## TL:DR

This project aims to implement an environmental monitoring system in the homes of affected patients.
This system would be designed to carry out an exhaustive analysis of the air quality in the home environment. In this way, it would be possible to assess the patient's condition while they are at home, allowing a more accurate study of possible relapses to which they are prone due to the chronic nature of their condition.
The target population for this study focuses on patients with chronic respiratory diseases, such as asthma, chronic obstructive pulmonary disease (COPD) and other recurrent respiratory conditions. These people are particularly susceptible to air quality, and small variations in pollutant levels or humidity can have a significant impact on their health and quality of life.

## Abstract

Currently, it is increasingly common for people, especially during autumn
and winter, to frequently visit healthcare centers to treat pulmonary issues,
resulting in a high rate of recurring patients. The objective of this project is
to conduct a study of the patient’s home environment using a digital system
capable of collecting the most relevant data. These data will be processed
to provide the doctor with a clear understanding of potential home-related
problems that could be negatively affecting the patient’s health. With this
information, the aim is to improve the quality of treatment and offer more
personalized care to each patient.
In addition to focusing on the study of patients’ homes, this project
has the potential to be scaled to include other locations, such as residences
and different environments. These expansions would be considered as future
improvements to the system, allowing its utility and benefits to be extended
to a broader range of people. In this way, the goal is to create a versatile and
adaptable solution that can be applied in various situations and contexts,
thus providing a greater positive impact on the health and well-being of
individuals.

## :rocket: Milestones

### 0. Repository

In this milestone we have to show that we correctly understand the concept of the application to be deployed in the cloud, as well as demonstrate our knowledge of the use of common software development tools. [Here: :arrow_forward:](docs/Milestones/0_Repository/0_Repository.md)

### 1. Project planning

Define a project among the different possibilities that arise and organize the milestones for the work on it, as well as advance as much as possible in the interface and data structures of the initial classes that are going to be implemented. [Here: :arrow_forward:](docs/Milestones/1_Proyect/1_Proyect.md)

### 2. Tests
Add tests and the application's virtual infrastructure, dependency and/or task managers, necessary for the tests to run. [Here: :arrow_forward:](docs/Milestones/2_Tests/2_Test.md)

[Tests code HERE: :arrow_forward: ](app/backend/tests/index.test.js)

![Tests](docs/img/Milestone_2/M_2_tests.png)

### 3. Docker and Github actions

Design a reproducible testing environment using Docker for easy execution of unit tests. Ensure correct installation of necessary tools, understanding container packaging, and submit a Dockerfile to a public repository. Evaluation based on base container choice, Dockerfile quality, Docker Hub upload, and utilization of alternative container registries. Emphasis on creating realistic tests and potential integration with continuous deployment systems.

* [Docker decision documentation :arrow_forward:](docs/Milestones/3_Docker/Docker_Decision.md)
* [Github actions documentation: :arrow_forward:](docs/Milestones/3_Docker/GithubActions.md)


#### Demostration:
![Docker Hub](docs/img/Milestone_3/docker_hub.png)

![Github actions](docs/img/Milestone_3/github_actions.png)

![Github packages](docs/img/Milestone_3/github_packages.png)


#### Database tests:
The tests created to test the database part of the database, use poetry, invoke and pytest.

* [Database tests documentation: :arrow_forward:](docs/Milestones/2_Tests/3_Database_Test.md)

#### Docker tests and docker-compose:
The created tests use two dockers, the first one is based on postgresql and the second one is based on python that connects with the first docker to make a verification test of the existence of the tables created in the database, for the communication docker compose is used as an orchestrator between both dockerfiles.


![Run test on docker composer](docs/img/Milestone_3/docker_compose_run_test.png)

## :hammer: Tools used for development

### Programming Languages
<a href="https://www.cprogramming.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg" alt="c" width="40" height="40"/> </a> 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> 


### Frontend Development
<a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> 
<a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> 
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> 

### Backend Development
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>

### Database
<a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> 

#### Devops
<a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> 

### Others
<a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> 
<a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a>
<a href="https://www.arduino.cc/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/arduino-1.svg" alt="arduino" width="40" height="40"/> </a> 
<a href="https://www.linux.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="linux" width="40" height="40"/> </a>