# This Dockerfile is used to create a static build on Zeit Now for previewing
# the example app.

FROM node:8
COPY . /src
WORKDIR /src/example
RUN yarn
RUN yarn build
RUN cp -r example/build /public
