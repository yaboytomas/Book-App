const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // Cache items for 1 hour

module.exports = cache;
