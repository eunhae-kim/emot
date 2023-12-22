FROM node:16-alpine

RUN mkdir -p /usr/app/
WORKDIR /usr/app/

COPY ./ ./

RUN chmod u+x build.sh && ./build.sh

EXPOSE 3000
CMD ["sh", "-c", "npm run start-dd"]
