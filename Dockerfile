# This Dockerfile is used to create a static build on Zeit Now for previewing
# the example app.

FROM mhart/alpine-node:8
WORKDIR /src

COPY . .
RUN yarn
RUN yarn build
RUN rm -rf node_modules

RUN cd example && yarn
RUN cd example && yarn build

RUN cp -r example/build /public
