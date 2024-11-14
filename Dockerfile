FROM node:22.11.0-alpine3.20
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "start:dev-db"]