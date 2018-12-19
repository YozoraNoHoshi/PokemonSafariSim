const { Client } = require('pg');

const client = new Client('postgres:///pokemon-catch');

client.connect();

module.exports = client;
