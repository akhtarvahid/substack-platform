grqphql-nestjs > substack

# Substack
**Project Description: Substack blog Application**

The goal of this project is to build a robust, scalable, and modern blog platform that enables users to write, read, and share blogs seamlessly. The application will be designed with a microservices architecture to ensure modularity, scalability, and maintainability, leveraging a variety of cutting-edge technologies.

How to clone and start the application

```bash
git clone https://github.com/akhtarvahid/substack
cd substack
```

### Install dependencies

```bash
substack> npm install
```

#### Run docker command to start postgres server

```bash
docker run --name substack -p 5454:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=substack -d postgres
```

#### Run app now(running through nodemon)
```bash 
npm start
```

### Migrations

#### Create and run migration for new entity file

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

### Schema Design

Schema design using https://www.eraser.io/

NOTE:

---

## Nestjs official

Command to generate module, controller, service

[Reference](https://docs.nestjs.com/cli/usages#nest-generate)

```js
nest g mo module_name --no-spec // If you need test file then remove --no-spec
nest g co module_name --no-spec
nest g s module_name --no-spec
```