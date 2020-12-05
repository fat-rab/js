function fibonacci(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

postMessage(fibonacci(40));
onmessage = function(e) {
    console.log("worker收到消息", e);
};