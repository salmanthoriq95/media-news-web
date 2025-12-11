import Hashids from 'hashids';

const hashids = new Hashids(
  process.env.HASHIDS_SALT || 'default-salt',
  8 // minimum length
);

export const encode = (id) => {
  return hashids.encode(id);
};

export const decode = (hash) => {
  const decoded = hashids.decode(hash);
  return decoded.length > 0 ? decoded[0] : null;
};
