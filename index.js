require('dotenv').config();

const server = require('./server');


const PORT = 3000;

server.listen(PORT, () => console.log('Server running on', 'http://localhost:' + PORT))