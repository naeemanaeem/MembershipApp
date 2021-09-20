FROM ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive

#Set working directory
WORKDIR /home/masjid
# WORKDIR /home/Documents/MHMA-project/masjid
#Install needed packages
RUN \
  apt-get update && \
  apt-get install -y git && \
  apt-get install -y npm && \
  apt-get install -y wget && \
  npm install -g yarn && \
  npm cache clean -f && \
  npm install -g n && \
  n stable && \
  cd /home && git clone https://github.com/camper2018/masjid.git && \
  cd /home/masjid/ && \
  yarn && \
  cd /home/masjid/client && \
  yarn
# docker images
# docker run -d -it -p 3010:3000  tania/masjid yarn run dev
# docker run -d -it -p 3000:3000 -v /Users/taniaali/Documents/MHMA-project/masjid:/home/masjid --name masjid tania/masjid yarn run dev
# docker run -d -it -p 3001:3000 -v /Users/taniaali/Documents/MHMA-project/masjid:/home/masjid --name masjid taniali/masjid yarn run dev
# docker logs <ID of container>
# docker ps -a
# docker rm $(docker ps -a -q -f status=exited)
# docker rm $(docker ps -a -q)
# docker stop <ID of container>
# docker rm <ID of container>
# lsof -i:3001