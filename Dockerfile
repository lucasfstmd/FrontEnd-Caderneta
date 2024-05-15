FROM node:20-alpine

# Create web-app directory
RUN mkdir -p /usr/src/frontend-cadernteta
WORKDIR /usr/src/frontend-cadernteta

EXPOSE 443
EXPOSE 80

COPY . /usr/src/frontend-cadernteta

RUN npm install ;\
    export REACT_APP_API_GATEWAY=REACT_APP_API_GATEWAY ;\
    npm run build ;\
    npm uninstall package.json ;\
    rm -rf node_modules/ src/ ;\
    npm install -g serve

ENTRYPOINT sed -i -e "s@REACT_APP_API_GATEWAY@${REACT_APP_API_GATEWAY}@g" build/static/js/*.js build/index.html ;\
            if test -f "$SSL_CERT_PATH" && test -f "$SSL_KEY_PATH";\
            then serve -s -n -l 443 --ssl-cert $SSL_CERT_PATH --ssl-key $SSL_KEY_PATH build;\
            else serve -s -n -l 80 build;fi;
