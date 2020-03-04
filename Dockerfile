FROM node:12.16-buster-slim

WORKDIR /

# Build python
RUN apt-get update
RUN apt-get install -y python3.7-dev
RUN yes | apt-get install build-essential
RUN apt-get -y install cmake
RUN yes | apt install python3-opencv

COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt

# Build node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./

RUN npm install

USER node
COPY --chown=node:node . .

EXPOSE 4321
CMD ["node", "./bin/www"]
