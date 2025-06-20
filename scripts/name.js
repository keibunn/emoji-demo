// ===================================
// 昵称设置场景 - 仅首次访问显示
// ===================================

var Name = function() {
    return Phaser.Scene.call(this, "name") || this
};
$jscomp.inherits(Name, Phaser.Scene);

/**
 * 昵称设置场景创建函数
 */
Name.prototype.create = function() {
    var scene = this;
    
    // 响应式尺寸计算
    var screenWidth = this.scale.width;
    var screenHeight = this.scale.height;
    var centerX = screenWidth / 2;
    var centerY = screenHeight / 2;
    var uiScale = Math.min(screenWidth / 375, screenHeight / 812);
    
    // 添加蓝色背景
    this.add.rectangle(centerX, centerY, screenWidth + 50, screenHeight + 50, 0x30a8ff);
    
    // 添加响应式 header (顶部)
    var headerSprite = this.add.sprite(centerX, 0, "header").setOrigin(0.5, 0);
    headerSprite.setDisplaySize(screenWidth, headerSprite.height * (screenWidth / headerSprite.width));
    headerSprite.setDepth(1);
    
    // 添加响应式 footer (底部)  
    var footerSprite = this.add.sprite(centerX, screenHeight, "footer").setOrigin(0.5, 1);
    footerSprite.setDisplaySize(screenWidth, footerSprite.height * (screenWidth / footerSprite.width));
    footerSprite.setDepth(1);
    
    // 欢迎标题
    this.add.text(centerX, screenHeight * 0.2, "欢迎来到表情消消乐！", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(32 * uiScale),
        align: "center",
        color: "#FFFFFF",
        stroke: "#2c3e50",
        strokeThickness: 2
    }).setOrigin(0.5);
    
    // 副标题
    this.add.text(centerX, screenHeight * 0.27, "请设置你的游戏昵称", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(20 * uiScale),
        align: "center",
        color: "#FFD93D"
    }).setOrigin(0.5);
    
    // 在屏幕35%位置创建输入区域
    var inputY = screenHeight * 0.35;
    
    // 输入框背景（长的白色矩形）
    var inputBg = this.add.rectangle(centerX, inputY, screenWidth * 0.7, 50 * uiScale, 0xffffff);
    inputBg.setStrokeStyle(3, 0x2c3e50);
    inputBg.setAlpha(0.95);
    
    // 输入框提示文本
    var placeholderText = this.add.text(centerX, inputY, "点击输入昵称（最多12个字符）", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(16 * uiScale),
        align: "center",
        color: "#95a5a6"
    }).setOrigin(0.5);
    
    // 用户输入的昵称文本
    var userNameText = this.add.text(centerX, inputY, "", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(18 * uiScale),
        align: "center",
        color: "#2c3e50"
    }).setOrigin(0.5);
    
    // 当前输入的昵称
    var currentName = "";
    
    // 使输入框可交互
    inputBg.setInteractive();
    inputBg.on('pointerdown', function() {
        // 使用浏览器原生输入框
        var inputName = prompt("请输入你的游戏昵称（最多12个字符）:", currentName);
        if (inputName !== null && inputName.trim() !== "") {
            currentName = inputName.trim().substring(0, 12);
            userNameText.setText(currentName);
            placeholderText.setVisible(false);
            
            // 启用OK按钮
            okBtn.setAlpha(1);
            okBtnText.setColor("#FFFFFF");
            okBtn.setInteractive();
        }
    });
    
    // OK按钮（短的矩形）
    var okBtn = this.add.rectangle(centerX, inputY + 80 * uiScale, 120 * uiScale, 45 * uiScale, 0x27ae60);
    okBtn.setStrokeStyle(3, 0x2c3e50);
    okBtn.setAlpha(0.5); // 初始状态为半透明（未激活）
    
    var okBtnText = this.add.text(centerX, inputY + 80 * uiScale, "确认", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(20 * uiScale),
        align: "center",
        color: "#95a5a6"
    }).setOrigin(0.5);
    
    // 初始状态下OK按钮不可交互
    
    // OK按钮点击事件
    var okButtonHandler = function() {
        if (currentName && currentName.trim()) {
            // 保存用户昵称
            if (window.leaderboard) {
                window.leaderboard.setPlayerName(currentName);
            }
            
            // 标记用户已设置过昵称
            localStorage.setItem('emoji_game_name_set', 'true');
            
            // 播放点击音效
            if (game_data.sound) {
                scene.sound.play("click");
            }
            
            // 切换到菜单场景
            scene.scene.start("menu");
        }
    };
    
    // 悬停效果
    okBtn.on('pointerover', function() {
        if (currentName) {
            okBtn.setFillStyle(0x2ecc71);
        }
    });
    
    okBtn.on('pointerout', function() {
        if (currentName) {
            okBtn.setFillStyle(0x27ae60);
        }
    });
    
    okBtn.on('pointerdown', okButtonHandler);
    
    // 添加装饰元素
    var decorSprite = this.add.sprite(centerX, screenHeight * 0.6, "xingxing");
    decorSprite.setScale(0.8 * uiScale);
    decorSprite.setAlpha(0.7);
    
    // 添加提示文本
    this.add.text(centerX, screenHeight * 0.75, "💡 昵称将显示在排行榜中", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(14 * uiScale),
        align: "center",
        color: "#FFFFFF",
        alpha: 0.8
    }).setOrigin(0.5);
    
    this.add.text(centerX, screenHeight * 0.8, "🎮 设置完成后即可开始游戏", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(14 * uiScale),
        align: "center",
        color: "#FFD93D",
        alpha: 0.8
    }).setOrigin(0.5);
    
    // 跳过按钮（使用随机昵称）
    var skipBtn = this.add.text(screenWidth - 20, screenHeight - 30, "跳过 >", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(14 * uiScale),
        align: "right",
        color: "#95a5a6",
        alpha: 0.7
    }).setOrigin(1);
    
    skipBtn.setInteractive();
    skipBtn.on('pointerover', function() {
        skipBtn.setColor("#FFFFFF");
        skipBtn.setAlpha(1);
    });
    skipBtn.on('pointerout', function() {
        skipBtn.setColor("#95a5a6");
        skipBtn.setAlpha(0.7);
    });
    skipBtn.on('pointerdown', function() {
        // 使用随机生成的昵称
        localStorage.setItem('emoji_game_name_set', 'true');
        
        // 播放点击音效
        if (game_data.sound) {
            scene.sound.play("click");
        }
        
        // 切换到菜单场景
        scene.scene.start("menu");
    });
}; 