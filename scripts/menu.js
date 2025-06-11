// ===================================
// 游戏主菜单场景
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
                var e = Object.getOwnPropertyDescriptor(b, c);
                e && Object.defineProperty(a, c, e)
            } else a[c] = b[c];
    a.superClass_ = b.prototype
};

// ===================================
// 全局变量定义
// ===================================

var last_array = 0;  // 上次游戏数组状态
var best_score = 0;   // 最高分数
var game_data = {sound: !0};  // 游戏设置数据

// 玩家数据
var player_data = {
    drop_mode: 0,      // 掉落模式
    hint_left: 5,      // 剩余提示次数
    shuffle_left: 5,   // 剩余洗牌次数
    score: 0           // 当前分数
};

var globalGameTimer = 0;  // 全局游戏计时器

// 加载存储的游戏数据
load_data();

/**
 * 从本地存储加载游戏数据
 */
function load_data() {
    // 加载最高分数
    var a = localStorage.getItem("redfoc_onet_best");
    a && (best_score = a);
    
    // 加载玩家数据
    (a = localStorage.getItem("redfoc_onet_data")) && (player_data = JSON.parse(a));
    
    // 加载游戏状态
    if (a = localStorage.getItem("redfoc_onet_array")) {
        a = JSON.parse(a);
        last_array = a.arr;
        player_data = a.data;
    }
    
    // 重置提示和洗牌次数
    player_data.hint_left = 5;
    player_data.shuffle_left = 5;
}

// ===================================
// 菜单场景类定义
// ===================================

var Menu = function() {
    return Phaser.Scene.call(this, "menu") || this
};
$jscomp.inherits(Menu, Phaser.Scene);

/**
 * 菜单场景创建函数
 */
Menu.prototype.create = function() {
    var a = this, b = this;
    
    // 添加背景图片(使用background.png)
    this.add.sprite(0, 0, "background").setOrigin(0);
    
    // 添加头部和底部框架
    this.add.sprite(0, 0, "header").setOrigin(0);
    this.add.sprite(0, config.height, "footer").setOrigin(0, 1);
    
    // 添加游戏标题并设置动画
    var c = this.add.sprite(360, 320, "game_title");
    this.tweens.add({
        targets: c,
        y: c.y + 30,
        duration: 1300,
        ease: "Sine.easeInOut",
        yoyo: !0,
        repeat: -1
    });
    
    // 显示最高分数
    this.add.text(360, 600, "BEST SCORE:", {
        fontFamily: "PoetsenOne",
        fontSize: 35,
        align: "center",
        color: "#FFFFFF"
    }).setOrigin(.5);
    
    this.add.text(360, 650, String(best_score), {
        fontFamily: "PoetsenOne",
        fontSize: 30,
        align: "center",
        color: "#FFFFFF"
    }).setOrigin(.5);
    
    // 添加开始游戏按钮
    draw_button(360, 760, "play", this);
    
    // 处理按钮点击事件
    this.input.on("gameobjectdown", function(c, d) {
        if (d.button) {
            play_sound("click", a);
            
            // 按钮点击动画
            a.tweens.add({
                targets: d,
                scaleX: .9,
                scaleY: .9,
                yoyo: !0,
                ease: "Linear",
                duration: 100,
                onComplete: function() {
                    // 开始游戏
                    if ("play" === d.name) {
                        globalGameTimer = 0;  // 重置全局计时器
                        show_ad();
                        b.scene.start("game");
                    }
                }
            }, a);
        }
    }, this);
};
