FROM node:11.9.0 AS build-env
RUN mkdir -p /app/redoc
ADD . /app/redoc

WORKDIR /app/redoc
RUN npm config set strict-ssl false
RUN npm install

FROM gcr.io/distroless/nodejs
COPY --from=build-env /app /app
WORKDIR /app/redoc
CMD ["index.js"]