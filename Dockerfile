FROM ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive
#Set working directory
WORKDIR /home/masjid
#Install git
RUN \ 
  apt-get update && \
  apt-get install -y git && \
  apt-get install -y npm && \
  npm install -g yarn && \
  cd /home && git clone https://github.com/Azmahds/masjid.git && \
  cd /home/masjid/ && \
  yarn && \
  cd /home/masjid/client && \
  yarn


# To run the container do the following with proper path
# docker run -d -it -p 3000:3000 -v /Users/hefayed/masjid:/home/masjid --name masjid hefayed/masjid yarn run dev