const express = require('express');
const path = require('path');
const http = require('http');
const { PeerServer } = require('peer');

const app = express();
const server = http.createServer(app);
const root = __dirname;
const port = Number(process.env.PORT || 3000);
const peerPort = Number(process.env.PEER_PORT || 9000);

app.disable('x-powered-by');
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    next();
});
app.get('/healthz', (req, res) => {
    res.json({ ok: true, service: 'geobek-lan' });
});
app.use(express.static(root, { index: 'index.html', fallthrough: false }));

server.listen(port, '0.0.0.0', () => {
    console.log(`Geobek LAN uygulamasÄ±: http://localhost:${port}`);
    console.log(`PeerJS signaling: ws://localhost:${peerPort}/peerjs`);
    console.log('Dosya ve ders verisi bu sunucuya kaydedilmez; yalnÄ±zca statik dosya ve signaling saÄŸlanÄ±r.');
});

const peerServer = PeerServer({
    port: peerPort,
    path: '/peerjs',
    allow_discovery: false,
    proxied: false
});

peerServer.on('error', error => {
    console.error('PeerJS signaling baÅŸlatÄ±lamadÄ±:', error);
    process.exitCode = 1;
});

peerServer.on('connection', client => {
    console.log(`Peer signaling baÄŸlantÄ±sÄ±: ${client.getId()}`);
});

peerServer.on('disconnect', client => {
    console.log(`Peer signaling ayrÄ±ldÄ±: ${client.getId()}`);
});

process.on('SIGINT', () => {
    server.close(() => process.exit(0));
});
