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
    var playBtn = draw_button(centerX, availableCenterY + availableHeight*0.10, "play", this);
    playBtn.setScale(0.6 * uiScale); // 缩放至60%
    
    // 添加排行榜按钮 - 使用新的btn_rink.png素材
    var leaderboardBtn = draw_button(centerX, availableCenterY + availableHeight*0.25, "rink", this);
    leaderboardBtn.setScale(0.6 * uiScale); // 与play按钮使用相同的缩放比例
    
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
                    } else if ("rink" === d.name) {
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
    
    // 创建用于跟踪所有排行榜元素的数组
    var leaderboardElements = [];
    
    // 创建半透明黑色遮罩
    var overlay = scene.add.rectangle(0, 0, screenWidth, screenHeight, 0x000000);
    overlay.setOrigin(0);
    overlay.setAlpha(0.8);
    overlay.setDepth(100);
    overlay.setInteractive(); // 防止点击穿透
    leaderboardElements.push(overlay);
    
    // 使用新的弹窗背景图片 - 位于屏幕15%的位置，左右间距约5%
    var bgWidth = screenWidth * 0.9; // 左右间距5%
    var bgHeight = screenHeight * 0.7; // 调整高度适应15%位置
    var bgY = screenHeight * 0.15 + bgHeight / 2; // 位于屏幕15%的位置
    
    var leaderboardBg = scene.add.sprite(centerX, bgY, "leaderboard_bg");
    leaderboardBg.setDisplaySize(bgWidth, bgHeight);
    leaderboardBg.setDepth(101);
    leaderboardElements.push(leaderboardBg);
    
    // 使用新的标题背景图片 - 位于leaderboard_bg.png内部，顶部5%的位置
    var titleY = bgY - bgHeight / 2 + bgHeight * 0.1 + 5 * uiScale; // 背景顶部5%位置，向下移动5px
    var titleBg = scene.add.sprite(centerX, titleY, "leaderboard_title");
    titleBg.setScale(uiScale * 0.6); // 缩小至0.6
    titleBg.setDepth(102);
    leaderboardElements.push(titleBg);
    
    // 移除了玩家昵称修改功能
    
    // 加载中提示 - 调整到新背景的中心位置
    var loadingText = scene.add.text(centerX, bgY, "正在加载排行榜...", {
        fontFamily: "fzltjh",
        fontSize: Math.floor(24 * uiScale),
        align: "center",
        color: "#FFFFFF"
    }).setOrigin(0.5).setDepth(102);
    leaderboardElements.push(loadingText);
    
    // 使用新的关闭按钮图片 - 位于leaderboard_bg.png右上角
    var closeBtnX = centerX + bgWidth / 2 - 20 * uiScale; // 背景右上角，向内偏移减少为20px
    var closeBtnY = bgY - bgHeight / 2 + 20 * uiScale; // 背景顶部，向下偏移减少为20px
    
    var closeBtn = scene.add.sprite(closeBtnX, closeBtnY, "btn_close");
    closeBtn.setScale(uiScale * 0.7); // 缩小至0.7
    closeBtn.setInteractive();
    closeBtn.setDepth(105); // 提高深度确保在最上层
    leaderboardElements.push(closeBtn);
    
    // 悬停效果
    closeBtn.on('pointerover', function() {
        closeBtn.setScale(1.1 * uiScale);
    });
    closeBtn.on('pointerout', function() {
        closeBtn.setScale(uiScale * 0.7);
    });
    
    closeBtn.on('pointerdown', function() {
        // 关闭排行榜 - 使用跟踪数组清理所有元素
        play_sound("click", scene);
        
        // 销毁所有跟踪的排行榜元素
        for (var i = 0; i < leaderboardElements.length; i++) {
            var element = leaderboardElements[i];
            if (element && element.destroy) {
                try {
                    element.destroy();
                } catch (e) {
                    // 忽略销毁错误，可能对象已被销毁
                }
            }
        }
        
        // 清空跟踪数组
        leaderboardElements = [];
        
        // 额外保险：清理所有深度在100以上的游戏对象
        var allChildren = scene.children.list.slice(); // 创建副本避免在遍历时修改原数组
        for (var i = 0; i < allChildren.length; i++) {
            var child = allChildren[i];
            if (child && child.depth >= 100) {
                try {
                    child.destroy();
                } catch (e) {
                    // 忽略销毁错误
                }
            }
        }
    });
    
    // 获取排行榜数据
    if (window.leaderboard) {
        window.leaderboard.getLeaderboard(10).then(function(data) {
            loadingText.destroy(); // 删除加载提示
            
            if (data.length === 0) {
                // 显示暂无数据 - 调整到新背景的中心位置
                var noDataText = scene.add.text(centerX, bgY, "暂无排行榜数据\n快去创造第一个记录吧！", {
                    fontFamily: "fzltjh",
                    fontSize: Math.floor(20 * uiScale),
                    align: "center",
                    color: "#FFFFFF",
                    lineSpacing: 10
                }).setOrigin(0.5).setDepth(102);
                leaderboardElements.push(noDataText);
                return;
            }
            
            // 显示排行榜数据 - 调整起始位置适应新背景
            var startY = titleY + 80 * uiScale; // 从标题下方更远处开始，避免遮挡
            var lineHeight = Math.floor(45 * uiScale); // 调整行高适应40px高度的矩形 + 5px间距
            
            // 创建滚动容器
            var scrollArea = scene.add.container(centerX, bgY);
            scrollArea.setDepth(102);
            leaderboardElements.push(scrollArea);
            
            // 设置遮罩以限制显示区域 - 增加底部空间确保最后一名完整显示
            var maskBounds = scene.add.graphics();
            maskBounds.fillStyle(0xffffff);
            var maskHeight = bgHeight - (startY - (bgY - bgHeight / 2)) - 20 * uiScale; // 减少底部边距从40到20
            maskBounds.fillRect(
                centerX - bgWidth / 2, 
                startY - 20 * uiScale, 
                bgWidth, 
                maskHeight
            );
            var mask = maskBounds.createGeometryMask();
            scrollArea.setMask(mask);
            leaderboardElements.push(maskBounds); // 确保遮罩也被跟踪
            
            // 创建条目容器（用于滑动）
            var entriesContainer = scene.add.container(0, 0);
            scrollArea.add(entriesContainer);
            
            for (var i = 0; i < Math.min(data.length, 10); i++) {
                var rank = i + 1;
                var entry = data[i];
                var y = startY + i * lineHeight - bgY; // 相对于scrollArea的位置
                
                // 创建排行榜条目容器
                var entryContainer = scene.add.container(0, y);
                
                // 新的固定尺寸设计
                var rankBoxSize = 40 * uiScale; // 40*40px
                var infoBoxWidth = 300 * uiScale; // 300*40px
                var infoBoxHeight = 40 * uiScale; // 40px高度
                var gap = 5 * uiScale; // 5px间距
                
                // 计算总宽度和边距，确保居中
                var totalWidth = rankBoxSize + gap + infoBoxWidth;
                var sideMargin = (bgWidth - totalWidth) / 2;
                
                // 排名方块位置
                var rankBoxX = -bgWidth / 2 + sideMargin + rankBoxSize / 2;
                
                // 排名方块 (40*40 圆角矩形) - 根据排名设置不同颜色
                var rankBox = scene.add.graphics();
                var boxColor = 0x1552b5; // 默认颜色
                if (rank === 1) {
                    boxColor = 0xf4c914; // 第1名金色
                } else if (rank === 2) {
                    boxColor = 0xcecece; // 第2名银色
                } else if (rank === 3) {
                    boxColor = 0xf29816; // 第3名铜色
                }
                rankBox.fillStyle(boxColor);
                rankBox.fillRoundedRect(-rankBoxSize / 2, -rankBoxSize / 2, rankBoxSize, rankBoxSize, 7 * uiScale);
                rankBox.setPosition(rankBoxX, 0);
                
                // 排名文字 - 根据排名设置不同颜色，全部使用数字
                var rankIcon = rank.toString(); // 统一使用数字
                var rankColor = "#FFFFFF"; // 默认颜色
                if (rank === 1) {
                    rankColor = "#aa7115"; // 第1名深金色
                } else if (rank === 2) {
                    rankColor = "#7f7f7f"; // 第2名深银色
                } else if (rank === 3) {
                    rankColor = "#a85116"; // 第3名深铜色
                } else {
                    rankColor = "#FFFFFF"; // 其他排名白色
                }
                
                var rankText = scene.add.text(rankBoxX, 0, rankIcon, {
                    fontFamily: "fzltjh",
                    fontSize: Math.floor(23 * uiScale), // 23px字体
                    align: "center",
                    color: rankColor
                }).setOrigin(0.5);
                
                // 信息条目位置
                var infoBoxX = rankBoxX + rankBoxSize / 2 + gap + infoBoxWidth / 2;
                
                // 信息条目 (300*40 圆角矩形)
                var infoBox = scene.add.graphics();
                infoBox.fillStyle(0x1552b5);
                infoBox.fillRoundedRect(-infoBoxWidth / 2, -infoBoxHeight / 2, infoBoxWidth, infoBoxHeight, 7 * uiScale);
                infoBox.setPosition(infoBoxX, 0);
                
                // 玩家昵称、分数、等级 - 全部并列在一排，25px字体
                var playerName = entry.playerName || "神秘玩家";
                if (playerName.length > 8) {
                    playerName = playerName.substring(0, 8) + "...";
                }
                
                var textPadding = 15 * uiScale; // 内边距
                
                // 玩家昵称 - 左侧
                var nameText = scene.add.text(infoBoxX - infoBoxWidth / 2 + textPadding, 0, playerName, {
                    fontFamily: "fzltjh",
                    fontSize: Math.floor(23 * uiScale), // 23px字体
                    align: "left",
                    color: "#FFFFFF"
                }).setOrigin(0, 0.5);
                
                // 分数 - 右侧
                var scoreText = scene.add.text(infoBoxX + infoBoxWidth / 2 - textPadding, 0, entry.score.toString() + " 分", {
                    fontFamily: "fzltjh",
                    fontSize: Math.floor(23 * uiScale), // 23px字体
                    align: "right",
                    color: "#FFD93D"
                }).setOrigin(1, 0.5);
                
                // 删除等级信息
                
                entryContainer.add([rankBox, rankText, infoBox, nameText, scoreText]);
                entriesContainer.add(entryContainer);
                
                // 添加条目动画
                entryContainer.setAlpha(0);
                scene.tweens.add({
                    targets: entryContainer,
                    alpha: 1,
                    duration: 200,
                    delay: i * 50,
                    ease: 'Back.easeOut'
                });
            }
            
            // 添加触摸滑动功能 - 简化版本
            var isDragging = false;
            var startPointerY = 0;
            var startContainerY = 0;
            // 调整最大滚动距离计算，确保最后一名完整显示
            var availableScrollHeight = maskHeight - 40 * uiScale; // 可滚动的实际高度
            var totalContentHeight = data.length * lineHeight; // 总内容高度
            var maxScroll = Math.max(0, totalContentHeight - availableScrollHeight);
            
            // 直接在entriesContainer上设置交互
            entriesContainer.setInteractive(new Phaser.Geom.Rectangle(-bgWidth/2, -bgHeight/2, bgWidth, bgHeight), Phaser.Geom.Rectangle.Contains);
            
            entriesContainer.on('pointerdown', function(event) {
                isDragging = true;
                startPointerY = event.y;
                startContainerY = entriesContainer.y;
                event.stopPropagation(); // 防止事件冒泡
            });
            
            entriesContainer.on('pointermove', function(event) {
                if (isDragging) {
                    var deltaY = event.y - startPointerY;
                    var newY = startContainerY + deltaY;
                    
                    // 限制滚动范围
                    newY = Math.max(-maxScroll, Math.min(0, newY));
                    entriesContainer.setY(newY);
                    event.stopPropagation();
                }
            });
            
            entriesContainer.on('pointerup', function(event) {
                isDragging = false;
                event.stopPropagation();
            });
            
            // 全局pointerup作为备用
            scene.input.on('pointerup', function() {
                isDragging = false;
            });
            
        }).catch(function(error) {
            if (loadingText && !loadingText.scene) {
                loadingText.setText("加载失败，请检查网络连接");
            }
            console.error("获取排行榜失败:", error);
        });
    } else {
        if (loadingText && !loadingText.scene) {
            loadingText.setText("排行榜功能未初始化");
        }
    }
}
