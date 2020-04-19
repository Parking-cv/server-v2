FROM node:12.16.0-alpine3.11

# Install packages
RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4321
CMD ["node", "./bin/www"]
