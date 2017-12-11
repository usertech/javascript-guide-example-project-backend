FROM    node:8-alpine

WORKDIR    /opt/app

COPY     package.json yarn.lock /opt/app/

RUN     yarn install --pure-lockfile

COPY     src /opt/app/src

EXPOSE     80

