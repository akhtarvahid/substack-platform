# grqphql-nestjs > substack-platform
# Project

### substack-platform
Create application following command

  > nest new substack-platform

### Install dependencies

  ```bash
  $ npm install
  ```

  To run postgres using docker

  > docker run --name substack-platform -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

  Run app through docker
  > docker-compose -f docker-compose.yml up --build -d