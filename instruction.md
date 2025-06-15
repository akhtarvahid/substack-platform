### Substack app




## TODO
- Migrate from postgreSQL to mongodb atlas
- 

### substack-platform
Create application following command
```bash
nest new substack-platform
```
### Running installation

  ```bash
  $ npm install
  ```

  To run postgres using docker
```bash
docker run --name substack-platform -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```
  Run app through docker
```bash
docker-compose -f docker-compose.yml up --build -d
```