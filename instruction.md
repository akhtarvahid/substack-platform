# grqphql-nestjs > substack-platform
# Project

### substack-platform
Create application following command

  > nest new substack-platform

### Install dependencies

```bash
npm install
```

#### To run postgres using docker
 ```bash
docker run --name substack -p 5454:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=substack -d postgres
```
#### Run app through docker

### Migrations
#### Create and run migration

```bash
npm run db:create src/migrations/CreateUsers 
npm run db:migrate
```

