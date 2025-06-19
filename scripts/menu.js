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
    
    // 始终重置游戏状态，防止中途退出后保留分数
    // 清除任何未完成的游戏状态
    localStorage.removeItem("redfoc_onet_array");
    last_array = null;
    
    // 重置玩家数据为初始状态
    player_data = {
        drop_mode: 0,
        hint_left: 5,
        shuffle_left: 5,
        score: 0
    };
    
    // 保存重置后的数据
    localStorage.setItem("redfoc_onet_data", JSON.stringify(player_data));
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
    
    // 响应式尺寸计算
    var screenWidth = this.scale.width;
    var screenHeight = this.scale.height;
    var centerX = screenWidth / 2;
    var centerY = screenHeight / 2;
    var uiScale = Math.min(screenWidth / 375, screenHeight / 812);
    
    // 添加纯色背景 - 响应式尺寸
    this.add.rectangle(centerX, centerY, screenWidth + 50, screenHeight + 50, 0x30a8ff);
    
    // 添加响应式 header (顶部)
    var headerSprite = this.add.sprite(centerX, 0, "header").setOrigin(0.5, 0);
    headerSprite.setDisplaySize(screenWidth, headerSprite.height * (screenWidth / headerSprite.width));
    headerSprite.setDepth(1);
    
    // 添加响应式 footer (底部)  
    var footerSprite = this.add.sprite(centerX, screenHeight, "footer").setOrigin(0.5, 1);
    footerSprite.setDisplaySize(screenWidth, footerSprite.height * (screenWidth / footerSprite.width));
    footerSprite.setDepth(1);
    
    // 计算可用区域
    var headerHeight = headerSprite.displayHeight;
    var footerHeight = footerSprite.displayHeight;
    var availableHeight = screenHeight - headerHeight - footerHeight;
    var availableCenterY = headerHeight + availableHeight/2;
    

    
    // 显示最高分数 - 分开显示，避免重叠
    this.add.text(centerX, screenHeight * 0.25, "BEST SCORE", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(34 * uiScale),  // 调整为34
        align: "center",
        color: "#FFFFFF"
    }).setOrigin(.5);
    
    // 添加装饰元素 - 位于BEST SCORE文本和数字之间
    var xingxingSprite = this.add.sprite(centerX, screenHeight * 0.32, "xingxing");
    xingxingSprite.setScale(0.7 * uiScale); // 响应式缩放
    
    this.add.text(centerX, screenHeight * 0.43, String(best_score), {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(130 * uiScale),  // 数字字体大小设为130
        align: "center",
        color: "#FFFFFF"
    }).setOrigin(.5);
    
    // 添加开始游戏按钮 - 在可用区域下方
    var playBtn = draw_button(centerX, availableCenterY + availableHeight*0.25, "play", this);
    playBtn.setScale(0.6 * uiScale); // 缩放至60%
    
    // 处理按钮点击事件
    this.input.on("gameobjectdown", function(c, d) {
        if (d.button) {
            play_sound("click", a);
            
            // 按钮点击动画 - 响应式缩放比例和时长
            a.tweens.add({
                targets: d,
                scaleX: .45 * uiScale,
                scaleY: .45 * uiScale,
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
