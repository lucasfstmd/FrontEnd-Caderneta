const fs = require("fs");
const http = require("http");
const https = require("https");
const dotenv = require("dotenv");
const axios = require("axios");
const { createServer } = require('http');

if (!fs.existsSync('build')) {
    console.error(`To start in production mode you need to run the project build. Run npm run build`)
    process.exit()
}

dotenv.config();

const SSL_PRIV_KEY = process.env.SSL_PRIV_KEY
const SSL_CERT_KEY = process.env.SSL_CERT_KEY

if (!fs.existsSync(SSL_PRIV_KEY)) {
    console.error(`SSL key required!\nPlease provide the ssl key in the .env file in SSL_KEY_PATH.`)
    process.exit()
}

if (!fs.existsSync(SSL_CERT_KEY)) {
    console.error(`SSL certificate required!\nPlease provide the ssl certificate in the .env file in SSL_CERT_PATH.`)
    process.exit()
}

const privateKey = fs.readFileSync(SSL_PRIV_KEY, 'utf8')
const certificate = fs.readFileSync(SSL_CERT_KEY, 'utf8')

const credentials = {
    key: privateKey,
    cert: certificate
}

const port_http = process.env.PORT_HTTP
const port_https = process.env.PORT_HTTPS

const httpServer = createServer((req, res) => {
    if (req.headers.host) {
        const host = req.headers.host;
        const url = `https://${host.replace(/:\d+/, `:${port_https}`)}${req.url}`;
        axios.get(url)
            .then((response) => {
                res.writeHead(response.status, response.headers);
                res.end(response.data);
            })
            .catch((error) => {
                console.error(error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            });
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
    }
});

httpServer.listen(port_http, () => {
    console.log('WebApp with HTTP running on PORT ' + port_http)
});

const httpsServer = https.createServer(credentials, (req, res) => {
    res.writeHead(301, { 'Location': `https://${req.headers.host}${req.url}` });
    res.end();
});

httpsServer.listen(port_https, () => {
    console.log('WebApp with HTTPS running on PORT ' + port_https)
});