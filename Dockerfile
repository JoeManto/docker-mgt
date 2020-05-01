FROM node:10

WORKDIR /app

COPY package*.json ./

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#RUN apk --update add \
#		tzdata \
#	&& cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
#	&& apk del tzdata

RUN npm install && \
    npm cache clean --force

#Install the mysql command line tool into the parent docker file
#Used for the bash mysql health check.
RUN set -ex; \
    apt-get update; \
    apt-get install -y --no-install-recommends

COPY . .

#Set some node environment variables
ENV NODE_ENV development
ENV HTTP_PORT 7304
ENV UPDATE_INTERVAL 1


# Expose ports
EXPOSE 7304