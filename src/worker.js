import { USE_TRANSFERRABLE, time } from './shared'

let ready = false;

onmessage = function (e) {
  if (!ready) {
    ready = true;
    log('READY!');

    return;
  }

  // Предположительно, воркер создаст свой собственный Uint8Array или
  // каким-то образом изменит ArrayBuffer (e.data). В этом примере мы просто
  // отправим обратно полученные данные
  const uInt8View = new Uint8Array(e.data);

  if (USE_TRANSFERRABLE) {
    postMessage(uInt8View.buffer, [uInt8View.buffer]);
  } else {
    postMessage(e.data);
  }
};

onerror = function (message) {
  log('worker error');
};

function log(msg) {
  postMessage({
    type: 'debug',
    msg: msg + ' [' + time() + ']',
  });
}