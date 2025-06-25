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
    
    // 添加footer（底部装饰）
    var footer = this.add.sprite(centerX, screenHeight, "footer");
    footer.setOrigin(0.5, 1);
    footer.displayWidth = screenWidth;
    footer.scaleY = footer.scaleX;
    
    // 添加tips.png - 位于距屏幕顶部10%的位置，居中，宽度为屏幕85%
    var tipsY = screenHeight * 0.1;
    var tips = this.add.sprite(centerX, tipsY, "tips");
    tips.setOrigin(0.5, 0); // 设置锚点为顶部中心
    tips.displayWidth = screenWidth * 0.85; // 宽度为屏幕宽度的85%
    tips.scaleY = tips.scaleX; // 保持比例
    
    // 计算输入框位置 - 位于tips.png内部，距离tips.png底部20%的位置
    var tipsHeight = tips.displayHeight;
    var inputY = tipsY + tipsHeight * 0.8; // tips顶部 + tips高度的80%
    
    // 使用name-field.png作为输入框背景
    var inputBg = this.add.sprite(centerX, inputY, "name-field");
    inputBg.setScale(0.6 * uiScale);
    inputBg.setInteractive();
    
    // 输入框提示文本 - "点击输入薯名"
    var placeholderText = this.add.text(centerX, inputY, "点击输入薯名", {
        fontFamily: "PoetsenOne",
        fontSize: Math.floor(20 * uiScale),
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
            okBtn.setInteractive();
        }
    });
    
    // 使用btn_ok.png作为确认按钮 - 位于tips.png下方
    var okBtn = this.add.sprite(centerX, 0, "btn_ok"); // 先创建在临时位置
    okBtn.setScale(0.6 * uiScale);
    okBtn.setAlpha(1.0); // 100%不透明
    
    // 重新计算位置 - tips底部 + 0.9个OK按钮高度的距离
    var okBtnY = tipsY + tipsHeight + (okBtn.displayHeight * 0.9);
    okBtn.y = okBtnY;
    
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
}; 