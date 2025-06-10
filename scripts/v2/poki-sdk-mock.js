// 简化的 Poki SDK 模拟文件用于本地开发
window.PokiSDK = {
    init: function() {
        console.log("Poki SDK Mock: init");
        return Promise.resolve();
    },
    gameLoadingStart: function() {
        console.log("Poki SDK Mock: gameLoadingStart");
    },
    gameLoadingFinished: function() {
        console.log("Poki SDK Mock: gameLoadingFinished");
    },
    gameplayStart: function() {
        console.log("Poki SDK Mock: gameplayStart");
    },
    gameplayStop: function() {
        console.log("Poki SDK Mock: gameplayStop");
    },
    commercialBreak: function() {
        console.log("Poki SDK Mock: commercialBreak");
        return Promise.resolve();
    },
    rewardedBreak: function() {
        console.log("Poki SDK Mock: rewardedBreak");
        return Promise.resolve(false);
    },
    happyTime: function(intensity) {
        console.log("Poki SDK Mock: happyTime", intensity);
    },
    setDebug: function(debug) {
        console.log("Poki SDK Mock: setDebug", debug);
    },
    // 添加其他可能需要的方法
    customEvent: function() {},
    gameInteractive: function() {},
    muteAd: function() {},
    roundEnd: function() {},
    roundStart: function() {},
    sendHighscore: function() {},
    setLogging: function() {},
    setPlayerAge: function() {},
    enableEventTracking: function() {}
}; 