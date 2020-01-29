type BufferSize = number;

interface IBufferCollection {
  // [key: number] here represents the BufferSize
  [key: number]: Uint32Array;
}

// Storing the buffers should conserve memory. Have to do more benchmarks to test if this is true
let buffers: IBufferCollection = {};

// This function uses the browsers crypto API to generate a new UInt32 array of bytes
export default (bytes: BufferSize) => {
  let buf = buffers[bytes];
  if (!buf) {
    buf = new Uint32Array(bytes);
    if (bytes <= 255) buffers[bytes] = buf;
  }
  return crypto.getRandomValues(buf);
}
