export const USE_TRANSFERRABLE = true;

const SIZE = 1024 * 1024 * 32; // 32MB

export function setupArray() {
  const arrayBuffer = new ArrayBuffer(SIZE);
  const uInt8View = new Uint8Array(arrayBuffer);
  const originalLength = uInt8View.length;

  for (let i = 0; i < originalLength; ++i) {
    uInt8View[i] = i;
  }

  log(`filled ${toMB(originalLength)} MB buffer`);

  return uInt8View
}

export function log(message, source = 'main') {
  const logElement = document.getElementById('result');
  const finalMessage =
    `<span style="color: ${source === 'main' ? 'green' : 'red'};">${source} thread: </span>${message}`
  
  logElement.innerHTML += ''.concat(time(), ' ', finalMessage, '\n');
}

export function time() {
  const now = new Date();

  return now.toLocaleTimeString() + `.${now.getMilliseconds()}`
}

export function seconds(since) {
  return (new Date() - since) / 1000.0;
}

export function toMB(bytes) {
  return Math.round(bytes / 1024 / 1024);
}