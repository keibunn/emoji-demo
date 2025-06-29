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
    var screenWidth = this.scale.width;
    var screenHeight = this.scale.height;
    var centerX = screenWidth / 2;
    var centerY = screenHeight / 2;
    var uiScale = Math.min(screenWidth / 375, screenHeight / 812);
    
    // 添加纯色背景 - 响应式尺寸
    this.add.rectangle(centerX, centerY, screenWidth + 50, screenHeight + 50, 0x30a8ff);
    
    // 添加游戏标题 - 垂直居中偏上
    var titleSprite = this.add.sprite(centerX, centerY - 105 * uiScale, "game_title");
    titleSprite.setScale(0.7 * uiScale); // 响应式缩放
    
    // 加载完成处理
    this.load.on("complete", function() {
        PokiSDK.gameLoadingFinished();
        
        // 创建开始按钮 - 在屏幕65%位置
        var d = draw_button(centerX, screenHeight * 0.65, "start", a);
        d.setScale(0.6 * uiScale); // 缩放至60%
        
        // 简单的按钮脉冲动画
        a.tweens.add({
            targets: d,
            scaleX: .65 * uiScale,
            scaleY: .65 * uiScale,
            yoyo: !0,
            ease: "Linear",
            duration: 800,
            repeat: -1
        });
        
        // 添加底部三排文字，替换原有的text1图片
        var textY = screenHeight * 0.85; // 底部15%位置
        var lineSpacing = 22 * uiScale; // 行间距22px
        
        // 第1排：《暑假特辑——设计友好赛》正式开始！
        var line1 = a.add.text(centerX + 3 * uiScale, textY, "《暑假特辑——设计友好赛》正式开始！", {
            fontFamily: "fzltjh",
            fontSize: Math.floor(17 * uiScale) + "px",
            color: "#FFFFFF",
            align: "center"
        }).setOrigin(0.5);
        
        // 第2排：给自己放个5分钟连连看暑假，有机会获得特别奖品哦！
        var line2 = a.add.text(centerX + 3 * uiScale, textY + lineSpacing, "给自己放个5分钟连连看暑假，有机会获得特别奖品哦！", {
            fontFamily: "fzltjh",
            fontSize: Math.floor(17 * uiScale) + "px",
            color: "#FFFFFF",
            align: "center"
        }).setOrigin(0.5);
    }, this);
    
    // 点击开始游戏
    this.input.on("gameobjectdown", function() {
        // 检查用户是否已设置过昵称
        var hasSetName = localStorage.getItem('emoji_game_name_set');
        if (hasSetName === 'true') {
            // 已设置昵称，直接进入菜单
            a.scene.start("menu");
        } else {
            // 首次访问，进入昵称设置页面
            a.scene.start("name");
        }
    }, this);
    
    // ===================================
    // 加载所有游戏资源
    // ===================================
    
    // UI元素
    this.load.image("sign", "img/sign.png");
    this.load.image("header", "img/header.png");
    this.load.image("footer", "img/footer.png");
    this.load.image("xingxing", "img/xingxing.png");
    
    // 按钮资源
    this.load.image("btn_shuffle", "img/btn_shuffle.png");
    this.load.image("btn_hint", "img/btn_hint.png");
    this.load.image("btn_play", "img/btn_play.png");
    this.load.image("btn_next", "img/btn_next.png");
    this.load.image("btn_restart", "img/btn_restart.png");
    this.load.image("btn_menu", "img/btn_menu.png");
    this.load.image("btn_start", "img/btn_start.png");
    this.load.image("btn_ok", "img/btn_ok.png");
    this.load.image("btn_rink", "img/btn_rink.png");
    this.load.image("btn_close", "img/btn_close.png");
    
    // 排行榜界面资源
    this.load.image("leaderboard_bg", "img/leaderboard_bg.png");
    this.load.image("leaderboard_title", "img/leaderboard_title.png");
    
    // 排行榜排名方块素材
    this.load.image("rank_block1", "img/rank-block1.png");
    this.load.image("rank_block2", "img/rank-block2.png");
    this.load.image("rank_block3", "img/rank-block3.png");
    this.load.image("rank_block4", "img/rank-block4.png");
    
    // 排行榜信息条目素材
    this.load.image("information_item1", "img/information-item1.png");
    this.load.image("information_item2", "img/information-item2.png");
    this.load.image("information_item3", "img/information-item3.png");
    this.load.image("information_item4", "img/information-item4.png");
    
    // 昵称设置页面资源
    this.load.image("name-field", "img/name-field.png");
    this.load.image("tips", "img/tips.png");
    
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
