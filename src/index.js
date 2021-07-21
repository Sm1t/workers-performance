import { setupArray, USE_TRANSFERRABLE, toMB, log, seconds } from './shared'

let startTime = 0;
const worker = new Worker('worker.js', { type: 'module' });

worker.onmessage = function (event) {
  console.timeEnd('actual postMessage round trip was');

  const { data } = event;

  if (data?.type === 'debug') {
    log(data.msg, 'worker');
  } else {
    const elapsed = seconds(startTime);
    const rate = Math.round(toMB(data.byteLength) / elapsed);

    log(`postMessage roundtrip took: ${elapsed * 1000} ms`);
    log(`postMessage roundtrip rate: ${rate} MB/s`);
  }
};

// Проверяем что worker готов и transferable объекты поддерживается
const buffer = new ArrayBuffer(1);
try {
  worker.postMessage(buffer, [buffer]);
  if (buffer.byteLength) {
    console.log('Transferable объекты не поддерживаются!');
  } else {
    console.log('Transferable объекты поддерживаются!');
  }
} catch (e) {
  alert('Transferables are not supported in your browser!');
}

function test() {
  const uInt8View = setupArray(); // Need to do this on every run for the repeated runs with transferable arrays. They're cleared out after they're transferred.

  startTime = new Date();
  console.time('actual postMessage round trip was');

  if (USE_TRANSFERRABLE) {
    // Note: clears the uInt8View and it's underlying ArrayBuffer, transfering it
    // out of this view, to the worker.
    // Passing multiple transferables:
    //   worker.postMessage({view1: int8View, buffer2: anotherBuffer}, [int8View.buffer, anotherBuffer]);
    //   window.postMessage(arrayBuffer, targetOrigin, [arrayBuffer]);
    worker.postMessage(uInt8View.buffer, [uInt8View.buffer]);
  } else {
    worker.postMessage(uInt8View.buffer);
  }
}

const runTestButton = document.getElementById('run')

runTestButton.addEventListener('click', test)