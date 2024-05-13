const cache = new Map();

export default function Cache({ dataKey }) {
  return {
    dataKey,

    has(key) {
      return cache.has(key);
    },

    set(key, value) {
      const res = cache.set(key, value);
      console.log(cache);
      return res;
    },

    get(key) {
      return cache.get(key);
    },

    delete(key) {
      return cache.delete(key);
    },

    clear() {
      return cache.clear();
    },
  };
}
