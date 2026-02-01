const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const selfsigned = require('selfsigned');
const app = require('./app');
const config = require('./config/env');

const PORT = config.port;

// Path to store/load certificates
const certDir = path.join(__dirname, '../certs');
const certPath = path.join(certDir, 'cert.pem');
const keyPath = path.join(certDir, 'key.pem');

async function startServer() {
    let server;
    try {
        let key, cert;

        // Try to load existing certificates
        if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
            console.log('Loading existing SSL certificates...');
            key = fs.readFileSync(keyPath, 'utf8');
            cert = fs.readFileSync(certPath, 'utf8');
        } else {
            // Generate new self-signed certificate
            console.log('Generating new self-signed SSL certificate...');

            // Create certs directory if it doesn't exist
            if (!fs.existsSync(certDir)) {
                fs.mkdirSync(certDir, { recursive: true });
            }

            const attrs = [{ name: 'commonName', value: 'localhost' }];
            const pems = await selfsigned.generate(attrs, {
                days: 365,
                keySize: 2048,
                algorithm: 'sha256',
                extensions: [{
                    name: 'subjectAltName',
                    altNames: [
                        { type: 2, value: 'localhost' },
                        { type: 2, value: '*.localhost' },
                        { type: 7, ip: '127.0.0.1' },
                        { type: 7, ip: '10.20.0.57' },
                        { type: 7, ip: '0.0.0.0' }
                    ]
                }]
            });

            key = pems.private;
            cert = pems.cert;

            // Save for future use
            fs.writeFileSync(keyPath, key);
            fs.writeFileSync(certPath, cert);
            console.log('SSL certificates saved to:', certDir);
        }

        // Create HTTPS server
        const options = { key, cert };
        server = https.createServer(options, app);
        console.log('✅ Starting HTTPS server...');

    } catch (error) {
        // Fallback to HTTP if HTTPS setup fails
        console.warn('⚠️  HTTPS setup failed, falling back to HTTP:', error.message);
        console.error(error);
        server = http.createServer(app);
        console.log('Starting HTTP server...');
    }

    server.listen(PORT, '0.0.0.0', () => {
        const protocol = server instanceof https.Server ? 'HTTPS' : 'HTTP';
        console.log(`🚀 ${protocol} Server running on all interfaces (0.0.0.0) at port ${PORT}`);
    });
}

startServer();
