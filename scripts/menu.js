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
    var playBtn = draw_button(centerX, availableCenterY + availableHeight*0.15, "play", this);
    playBtn.setScale(0.6 * uiScale); // 缩放至60%
    
    // 添加排行榜按钮 - 使用更美观的设计
    var leaderboardBtn = this.add.container(centerX, availableCenterY + availableHeight*0.35);
    
    // 排行榜按钮背景
    var btnBg = this.add.rectangle(0, 0, 200 * uiScale, 50 * uiScale, 0x2c3e50);
    btnBg.setStrokeStyle(3, 0xffffff);
    btnBg.setAlpha(0.9);
    
    // 排行榜图标
    var btnIcon = this.add.text(-60 * uiScale, 0, "🏆", {
        fontSize: Math.floor(24 * uiScale),
        align: "center"
    }).setOrigin(0.5);
    
    // 排行榜文字
    var btnText = this.add.text(10 * uiScale, 0, "排行榜", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(24 * uiScale),
        align: "center",
        color: "#FFFFFF"
    }).setOrigin(0.5);
    
    leaderboardBtn.add([btnBg, btnIcon, btnText]);
    leaderboardBtn.setSize(200 * uiScale, 50 * uiScale);
    leaderboardBtn.setInteractive();
    leaderboardBtn.button = true;
    leaderboardBtn.name = "leaderboard";
    
    // 添加悬停效果
    leaderboardBtn.on('pointerover', function() {
        btnBg.setFillStyle(0x34495e);
    });
    leaderboardBtn.on('pointerout', function() {
        btnBg.setFillStyle(0x2c3e50);
    });
    
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
                    } else if ("leaderboard" === d.name) {
                        // 显示排行榜
                        showLeaderboard(a);
                    }
                }
            }, a);
        }
    }, this);
};

// ===================================
// 排行榜显示功能
// ===================================

/**
 * 显示排行榜界面
 */
function showLeaderboard(scene) {
    var screenWidth = scene.scale.width;
    var screenHeight = scene.scale.height;
    var centerX = screenWidth / 2;
    var centerY = screenHeight / 2;
    var uiScale = Math.min(screenWidth / 375, screenHeight / 812);
    
    // 创建半透明黑色遮罩
    var overlay = scene.add.rectangle(0, 0, screenWidth, screenHeight, 0x000000);
    overlay.setOrigin(0);
    overlay.setAlpha(0.8);
    overlay.setDepth(100);
    overlay.setInteractive(); // 防止点击穿透
    
    // 创建排行榜背景 - 渐变效果
    var leaderboardBg = scene.add.rectangle(centerX, centerY, screenWidth * 0.9, screenHeight * 0.8, 0x2c3e50);
    leaderboardBg.setStrokeStyle(4, 0x30a8ff);
    leaderboardBg.setAlpha(0.95);
    leaderboardBg.setDepth(101);
    
    // 添加装饰边框
    var decorBorder = scene.add.rectangle(centerX, centerY, screenWidth * 0.9 - 8, screenHeight * 0.8 - 8, 0x34495e);
    decorBorder.setStrokeStyle(2, 0xFFD93D);
    decorBorder.setFillStyle(null);
    decorBorder.setDepth(101);
    
    // 排行榜标题容器
    var titleContainer = scene.add.container(centerX, centerY - screenHeight * 0.35);
    
    // 标题背景装饰
    var titleBg = scene.add.rectangle(0, 0, 280 * uiScale, 60 * uiScale, 0x30a8ff);
    titleBg.setStrokeStyle(3, 0xFFD93D);
    titleBg.setAlpha(0.8);
    
    // 排行榜标题
    var title = scene.add.text(0, 0, "🏆 排行榜 🏆", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(32 * uiScale),
        align: "center",
        color: "#FFD93D",
        stroke: "#2c3e50",
        strokeThickness: 2
    }).setOrigin(0.5);
    
    titleContainer.add([titleBg, title]);
    titleContainer.setDepth(102);
    
    // 添加当前玩家昵称显示和修改功能
    var playerInfoContainer = scene.add.container(centerX, centerY - screenHeight * 0.2);
    
    // 玩家信息背景
    var playerInfoBg = scene.add.rectangle(0, 0, screenWidth * 0.7, 50 * uiScale, 0x34495e);
    playerInfoBg.setStrokeStyle(2, 0x95a5a6);
    playerInfoBg.setAlpha(0.8);
    
    // 当前昵称文本
    var currentPlayerName = window.leaderboard ? window.leaderboard.getPlayerName() : "神秘玩家";
    var playerNameText = scene.add.text(0, -8, "👤 " + currentPlayerName, {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(18 * uiScale),
        align: "center",
        color: "#FFD93D"
    }).setOrigin(0.5);
    
    // 修改提示文本
    var editHintText = scene.add.text(0, 12, "点击修改昵称", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(12 * uiScale),
        align: "center",
        color: "#95a5a6"
    }).setOrigin(0.5);
    
    playerInfoContainer.add([playerInfoBg, playerNameText, editHintText]);
    playerInfoContainer.setSize(screenWidth * 0.7, 50 * uiScale);
    playerInfoContainer.setInteractive();
    playerInfoContainer.setDepth(102);
    
    // 添加悬停效果
    playerInfoContainer.on('pointerover', function() {
        playerInfoBg.setFillStyle(0x3498db);
        editHintText.setColor("#FFFFFF");
    });
    playerInfoContainer.on('pointerout', function() {
        playerInfoBg.setFillStyle(0x34495e);
        editHintText.setColor("#95a5a6");
    });
    
    // 点击修改昵称
    playerInfoContainer.on('pointerdown', function() {
        var newName = prompt("请输入新的昵称（最多12个字符）:", currentPlayerName);
        if (newName && newName.trim() && newName.trim() !== currentPlayerName) {
            var trimmedName = newName.trim().substring(0, 12);
            if (window.leaderboard) {
                window.leaderboard.setPlayerName(trimmedName);
                playerNameText.setText("👤 " + trimmedName);
                currentPlayerName = trimmedName;
                
                // 显示成功提示
                var successText = scene.add.text(centerX, centerY + screenHeight * 0.3, "昵称修改成功！", {
                    fontFamily: "PoetsenOne",
                    fontSize: Math.floor(16 * uiScale),
                    align: "center",
                    color: "#2ecc71"
                }).setOrigin(0.5).setDepth(103);
                
                // 3秒后消失
                scene.time.delayedCall(3000, function() {
                    if (successText) successText.destroy();
                });
            }
        }
    });
    
    // 加载中提示
    var loadingText = scene.add.text(centerX, centerY, "正在加载排行榜...", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(24 * uiScale),
        align: "center",
        color: "#FFFFFF"
    }).setOrigin(0.5).setDepth(102);
    
    // 关闭按钮 - 美化设计
    var closeBtn = scene.add.container(centerX + screenWidth * 0.35, centerY - screenHeight * 0.35);
    
    var closeBg = scene.add.circle(0, 0, 20 * uiScale, 0xFF6B6B);
    closeBg.setStrokeStyle(2, 0xffffff);
    closeBg.setAlpha(0.9);
    
    var closeIcon = scene.add.text(0, 0, "✕", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(24 * uiScale),
        align: "center",
        color: "#FFFFFF"
    }).setOrigin(0.5);
    
    closeBtn.add([closeBg, closeIcon]);
    closeBtn.setSize(40 * uiScale, 40 * uiScale);
    closeBtn.setInteractive();
    closeBtn.setDepth(102);
    
    // 悬停效果
    closeBtn.on('pointerover', function() {
        closeBg.setFillStyle(0xe74c3c);
        closeBtn.setScale(1.1);
    });
    closeBtn.on('pointerout', function() {
        closeBg.setFillStyle(0xFF6B6B);
        closeBtn.setScale(1);
    });
    
    closeBtn.on('pointerdown', function() {
        // 关闭排行榜
        overlay.destroy();
        leaderboardBg.destroy();
        decorBorder.destroy();
        titleContainer.destroy();
        playerInfoContainer.destroy();
        loadingText.destroy();
        closeBtn.destroy();
    });
    
    // 获取排行榜数据
    if (window.leaderboard) {
        window.leaderboard.getLeaderboard(10).then(function(data) {
            loadingText.destroy(); // 删除加载提示
            
            if (data.length === 0) {
                // 显示暂无数据
                scene.add.text(centerX, centerY, "暂无排行榜数据\n快去创造第一个记录吧！", {
                    fontFamily: "PoetsenOne",
                    fontSize: Math.floor(20 * uiScale),
                    align: "center",
                    color: "#FFFFFF",
                    lineSpacing: 10
                }).setOrigin(0.5).setDepth(102);
                return;
            }
            
            // 显示排行榜数据
            var startY = centerY - screenHeight * 0.25;
            var lineHeight = Math.floor(35 * uiScale);
            
            for (var i = 0; i < Math.min(data.length, 10); i++) {
                var rank = i + 1;
                var entry = data[i];
                var y = startY + i * lineHeight;
                
                // 创建排行榜条目容器
                var entryContainer = scene.add.container(centerX, y);
                
                // 条目背景
                var entryBg = scene.add.rectangle(0, 0, screenWidth * 0.8, lineHeight - 4, rank <= 3 ? 0x3498db : 0x34495e);
                entryBg.setStrokeStyle(1, rank <= 3 ? 0xFFD93D : 0x7f8c8d);
                entryBg.setAlpha(0.7);
                
                // 排名图标和背景
                var rankBg = scene.add.circle(-screenWidth * 0.32, 0, 16 * uiScale, rank === 1 ? 0xFFD93D : rank === 2 ? 0xC0C0C0 : rank === 3 ? 0xCD7F32 : 0x7f8c8d);
                rankBg.setStrokeStyle(2, 0xffffff);
                
                var rankIcon = "";
                var rankColor = "#2c3e50";
                if (rank === 1) {
                    rankIcon = "👑";
                    rankColor = "#2c3e50";
                } else if (rank === 2) {
                    rankIcon = "🥈";
                    rankColor = "#2c3e50";
                } else if (rank === 3) {
                    rankIcon = "🥉";
                    rankColor = "#2c3e50";
                } else {
                    rankIcon = rank.toString();
                    rankColor = "#FFFFFF";
                }
                
                var rankText = scene.add.text(-screenWidth * 0.32, 0, rankIcon, {
                    fontFamily: "PoetsenOne",
                    fontSize: Math.floor(16 * uiScale),
                    align: "center",
                    color: rankColor
                }).setOrigin(0.5);
                
                // 玩家昵称
                var playerName = entry.playerName || "神秘玩家";
                if (playerName.length > 10) {
                    playerName = playerName.substring(0, 10) + "...";
                }
                
                var nameText = scene.add.text(-screenWidth * 0.2, 0, playerName, {
                    fontFamily: "PoetsenOne",
                    fontSize: Math.floor(16 * uiScale),
                    align: "left",
                    color: rank <= 3 ? "#FFD93D" : "#FFFFFF"
                }).setOrigin(0, 0.5);
                
                // 分数
                var scoreText = scene.add.text(screenWidth * 0.25, 0, entry.score.toString() + " 分", {
                    fontFamily: "robotomono",
                    fontSize: Math.floor(16 * uiScale),
                    align: "right",
                    color: "#FFD93D",
                    stroke: "#2c3e50",
                    strokeThickness: 1
                }).setOrigin(1, 0.5);
                
                // 等级标识
                var levelText = scene.add.text(screenWidth * 0.32, 0, "L" + (entry.level || 1), {
                    fontFamily: "robotomono",
                    fontSize: Math.floor(12 * uiScale),
                    align: "center",
                    color: "#95a5a6"
                }).setOrigin(0.5);
                
                entryContainer.add([entryBg, rankBg, rankText, nameText, scoreText, levelText]);
                entryContainer.setDepth(102);
                
                // 添加条目动画
                entryContainer.setAlpha(0);
                scene.tweens.add({
                    targets: entryContainer,
                    alpha: 1,
                    y: y,
                    duration: 200,
                    delay: i * 50,
                    ease: 'Back.easeOut'
                });
            }
            
        }).catch(function(error) {
            loadingText.setText("加载失败，请检查网络连接");
            console.error("获取排行榜失败:", error);
        });
    } else {
        loadingText.setText("排行榜功能未初始化");
    }
}
