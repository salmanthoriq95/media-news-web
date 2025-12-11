const Hashids = require('hashids/cjs');

const hashids = new Hashids(
  process.env.HASHIDS_SALT || 'default-salt',
  8 // minimum length
);

module.exports = {
  encode: (id) => {
    return hashids.encode(id);
  },

  decode: (hash) => {
    const decoded = hashids.decode(hash);
    return decoded.length > 0 ? decoded[0] : null;
  }
};
