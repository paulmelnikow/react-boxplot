# This Dockerfile is used to create a static build on Zeit Now for previewing
# the example app.

FROM mhart/alpine-node:8
WORKDIR /src/example

COPY example/package.json example/yarn.lock .
RUN yarn

WORKDIR /src
COPY package.json yarn.lock .
RUN yarn

WORKDIR /src/example
RUN yarn build && cp -r ./build /public
