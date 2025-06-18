// ===================================
// 游戏资源预加载场景
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

// 加载场景类定义
var Load = function() {
    return Phaser.Scene.call(this, "load") || this
};
$jscomp.inherits(Load, Phaser.Scene);

// 预加载函数 - 加载所有游戏资源
Load.prototype.preload = function() {
    var a = this;
    
    // 开始游戏加载
    PokiSDK.gameLoadingStart();
    
    // 响应式尺寸计算
    var centerX = config.width / 2;
    var centerY = config.height / 2;
    var uiScale = Math.min(config.width / 375, config.height / 812);
    
    // 添加纯色背景 - 响应式尺寸
    this.add.rectangle(centerX, centerY, config.width + 50, config.height + 50, 0x73cdff);
    
    // 添加游戏标题 - 垂直居中偏上
    var titleSprite = this.add.sprite(centerX, centerY - 100 * uiScale, "game_title");
    titleSprite.setScale(0.6 * uiScale); // 响应式缩放
    
    // 加载完成处理
    this.load.on("complete", function() {
        PokiSDK.gameLoadingFinished();
        
        // 创建开始按钮 - 在底部20%位置
        var d = draw_button(centerX, config.height * 0.8, "start", a);
        d.setScale(0.5 * uiScale); // 缩放至85%
        
        // 简单的按钮脉冲动画
        a.tweens.add({
            targets: d,
            scaleX: .55 * uiScale,
            scaleY: .55 * uiScale,
            yoyo: !0,
            ease: "Linear",
            duration: 800,
            repeat: -1
        })
    }, this);
    
    // 点击开始游戏
    this.input.on("gameobjectdown", function() {
        a.scene.start("menu")
    }, this);
    
    // ===================================
    // 加载所有游戏资源
    // ===================================
    
    // UI元素
    this.load.image("sign", "img/sign.png");
    this.load.image("header", "img/header.png");
    this.load.image("footer", "img/footer.png");
    
    // 按钮资源
    this.load.image("btn_shuffle", "img/btn_shuffle.png");
    this.load.image("btn_hint", "img/btn_hint.png");
    this.load.image("btn_play", "img/btn_play.png");
    this.load.image("btn_next", "img/btn_next.png");
    this.load.image("btn_restart", "img/btn_restart.png");
    this.load.image("btn_menu", "img/btn_menu.png");
    this.load.image("btn_start", "img/btn_start.png");
    
    // 游戏界面元素
    this.load.image("circle", "img/circle.png");
    this.load.image("arrow", "img/arrow.png");
    this.load.image("shuffle_icon", "img/shuffle_icon.png");
    this.load.image("hint_icon", "img/hint_icon.png");
    this.load.image("score_bar", "img/score_bar.png");
    this.load.image("time_limit", "img/time-limit.png");
    
    // 背景图片
    this.load.image("background", "img/background.png");
    
    // 连线动画精灵表
    this.load.spritesheet("lines", "img/lines.png", {
        frameWidth: 90,
        frameHeight: 90
    });
    
    // 加载所有游戏对象图片(obj1-obj22)
    for (var d = 1; 22 >= d; d++) {
        this.load.image("obj" + d, "img/obj" + d + ".png");
    }
    
    // ===================================
    // 加载所有音频资源
    // ===================================
    this.load.audio("click", "audio/click.mp3");
    this.load.audio("connected", "audio/connected.mp3");
    this.load.audio("itemclick", "audio/itemclick.mp3");
    this.load.audio("gameover", "audio/gameover.mp3");
    this.load.audio("nomatch", "audio/nomatch.mp3");
    this.load.audio("completed", "audio/completed.mp3");
    this.load.audio("hint", "audio/hint.mp3");
    this.load.audio("shuffle", "audio/shuffle.mp3");
};

// 创建函数 - 预加载场景创建时调用
Load.prototype.create = function() {
    // 预加载场景不需要额外的创建逻辑
};
