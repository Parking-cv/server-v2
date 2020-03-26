FROM python:3.7-slim-buster AS build

WORKDIR /

# Install packages required for image processing
RUN apt-get update
RUN yes | apt-get install build-essential
RUN apt-get -y install cmake
RUN yes | apt install python3-opencv

COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt


FROM build

# Install node js 12
RUN apt install curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | -E bash -
RUN apt-get install -y nodejs

# Install packages
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./

RUN npm install

USER node
COPY --chown=node:node . .

EXPOSE 4321
CMD ["node", "./bin/www"]
