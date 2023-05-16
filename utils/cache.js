const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

const getCacheData = (key) => {
  return cache.get(key);
};

const setCacheData = (key, data) => {
  cache.set(key, data);
};

module.exports = {
  getCacheData,
  setCacheData,
};
