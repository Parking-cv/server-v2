FROM python:3.7-slim-buster

WORKDIR /

# Install packages required for image processing
RUN apt-get update
RUN yes | apt-get install build-essential
RUN apt-get -y install cmake
RUN yes | apt install python3-opencv

COPY requirements.txt /requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000
CMD ["python3", "server.py"]
