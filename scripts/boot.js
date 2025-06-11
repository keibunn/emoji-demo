// ===================================
// 游戏启动场景
// ===================================

var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;

$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? 
    Object.create : function(a) {
        var b = function() {};
        b.prototype = a;
        return new b
    };

$jscomp.underscoreProtoCanBeSet = function() {
    var a = {a: !0}, b = {};
    try {
        return b.__proto__ = a, b.a
    } catch (c) {}
    return !1
};

$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? 
    Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? 
    function(a, b) {
        a.__proto__ = b;
        if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
        return a
    } : null;

$jscomp.inherits = function(a, b) {
    a.prototype = $jscomp.objectCreate(b.prototype);
    a.prototype.constructor = a;
    if ($jscomp.setPrototypeOf) {
        var c = $jscomp.setPrototypeOf;
        c(a, b)
    } else for (c in b)
        if ("prototype" != c)
            if (Object.defineProperties) {
                var d = Object.getOwnPropertyDescriptor(b, c);
                d && Object.defineProperty(a, c, d)
            } else a[c] = b[c];
    a.superClass_ = b.prototype
};

// ===================================
// 启动场景类定义
// ===================================

var Boot = function() {
    return Phaser.Scene.call(this, "boot") || this
};
$jscomp.inherits(Boot, Phaser.Scene);

/**
 * 启动场景预加载函数
 * 只加载启动必需的基本资源
 */
Boot.prototype.preload = function() {
    // 加载启动界面必需的资源
    this.load.image("background", "img/background.png");     // 背景图
    this.load.image("game_title", "img/game_title.png");     // 游戏标题
    this.load.image("btn_start", "img/btn_start.png");       // 开始按钮
};

/**
 * 启动场景创建函数
 * 启动完成后跳转到加载场景
 */
Boot.prototype.create = function() {
    // 停止缩放监听器
    this.scale.stopListeners();
    
    // 跳转到加载场景
    this.scene.start("load");
};
