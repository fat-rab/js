let worker = new Worker("worker.js");
worker.onmessage = function(e) {
    console.log('webworker收到消息', e)
    worker.postMessage('message收到')
}