# This Dockerfile is used to create a static build on Zeit Now for previewing
# the example app.

FROM mhart/alpine-node:8

WORKDIR /src

RUN mkdir example
COPY example/package.json example/yarn.lock ./example/
COPY package.json yarn.lock ./

RUN cd example && yarn
RUN yarn --ignore-scripts

COPY . ./

RUN yarn build
RUN cd example && yarn build && cp -r ./build /public

