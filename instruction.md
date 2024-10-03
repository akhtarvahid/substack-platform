# grqphql-nestjs > substack-platform
# Project

### Command to generate module, controller, service
[Reference](https://docs.nestjs.com/cli/usages#nest-generate)
```js
nest g mo profile --no-spec // If you need test file then remove --no-spec
nest g co profile --no-spec
nest g s profile --no-spec
```

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
#### Steps to follow for seeding

```bash
npm run db:drop
npm run db:migrate
npm run db:seed
```