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
    
    // 在屏幕35%位置创建输入区域
    var inputY = screenHeight * 0.35;
    
    // 使用name-field.png作为输入框背景
    var inputBg = this.add.sprite(centerX, inputY, "name-field");
    inputBg.setScale(uiScale);
    inputBg.setInteractive();
    
    // 输入框提示文本 - "点击输入薯名"
    var placeholderText = this.add.text(centerX, inputY, "点击输入薯名", {
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
    inputBg.on('pointerdown', function() {
        // 使用浏览器原生输入框
        var inputName = prompt("请输入你的游戏昵称（最多12个字符）:", currentName);
        if (inputName !== null && inputName.trim() !== "") {
            currentName = inputName.trim().substring(0, 12);
            userNameText.setText(currentName);
            placeholderText.setVisible(false);
            
            // 启用OK按钮
            okBtn.setAlpha(1);
            okBtn.setInteractive();
        }
    });
    
    // 使用btn_ok.png作为确认按钮
    var okBtn = this.add.sprite(centerX, inputY + 80 * uiScale, "btn_ok");
    okBtn.setScale(uiScale);
    okBtn.setAlpha(0.5); // 初始状态为半透明（未激活）
    
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
            okBtn.setTint(0xcccccc); // 浅灰色悬停效果
        }
    });
    
    okBtn.on('pointerout', function() {
        if (currentName) {
            okBtn.clearTint(); // 清除悬停效果
        }
    });
    
    okBtn.on('pointerdown', okButtonHandler);
    
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