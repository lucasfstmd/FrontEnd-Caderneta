FROM node:20-alpine


# Create web-app directory
RUN mkdir -p /usr/src/frontend-cadernteta
WORKDIR /usr/src/frontend-cadernteta

COPY . /usr/src/frontend-cadernteta

RUN npm install
EXPOSE 443
EXPOSE 80

ENTRYPOINT npm run build \
&& export NODE_OPTIONS="--max-old-space-size=2560" \
&& npm run server
