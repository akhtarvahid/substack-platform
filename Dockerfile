# Dockerfile
FROM node:14-alpine

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

COPY wait-for-postgres.sh /usr/src/app/wait-for-postgres.sh
RUN chmod +x /usr/src/app/wait-for-postgres.sh

CMD ["./wait-for-postgres.sh", "npm", "run", "start:dev"]
