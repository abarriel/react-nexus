/**
 * Extracts headers from the given headers according his type into an Object.
 *
 * @param {Object} headers The headers to extract
 * @throws {Error} An error throws if the headers cannot be extracted
 * @return {Object} The extracted headers
 */
const headersToObject = (headers) => {
  if(typeof headers.raw === 'function') {
    return headers.raw();
  }
  if(typeof headers.forEach === 'function') {
    const o = {};
    headers.forEach((v, k) => o[k] = v); // eslint-disable-line no-return-assign
    return o;
  }
  throw new Error('Could not find a suitable interface for converting headers to object');
};

export default headersToObject;
