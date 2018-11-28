# This Dockerfile is used to create a static build on Zeit Now for previewing
# the example app.

FROM node:8
COPY . /src

WORKDIR /src
RUN yarn
RUN yarn build
RUN rm -rf node_modules

WORKDIR /src/example
RUN yarn
RUN yarn build
RUN rm -rf node_modules

WORKDIR /src
RUN cp -r example/build /public
