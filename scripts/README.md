# Scripts 文件夹说明

这个文件夹包含了连连看游戏的所有JavaScript代码文件。

## 文件结构

### 核心游戏文件

#### `boot.js` - 游戏启动场景
- **功能**: 游戏的第一个加载场景
- **职责**: 
  - 加载启动必需的基本资源（背景、标题、开始按钮）
  - 初始化基本设置
  - 跳转到主加载场景
- **状态**: ✅ 已格式化和注释

#### `preload.js` - 资源预加载场景  
- **功能**: 加载所有游戏资源
- **职责**:
  - 显示加载进度条
  - 加载所有图片资源（UI元素、游戏对象、背景等）
  - 加载所有音频文件
  - 加载完成后跳转到菜单场景
- **状态**: ✅ 已格式化和注释

#### `menu.js` - 主菜单场景
- **功能**: 游戏主菜单界面
- **职责**:
  - 显示游戏标题和背景
  - 显示最高分数
  - 提供开始游戏按钮
  - 处理本地数据存取
- **状态**: ✅ 已格式化和注释

#### `game.js` - 核心游戏逻辑
- **功能**: 连连看游戏的主要逻辑
- **职责**:
  - 游戏界面布局和渲染
  - 5分钟全局计时功能
  - 连连看游戏机制（点击、匹配、消除）
  - 提示和洗牌功能
  - 游戏结束和结算逻辑
  - 关卡进度管理
- **状态**: ⚠️ 待格式化（代码较复杂，需要分模块整理）

#### `stages.js` - 关卡数据配置
- **功能**: 定义游戏关卡布局
- **职责**:
  - 存储各关卡的网格布局数据
  - 验证关卡数据合法性
- **状态**: ✅ 已格式化和注释

### 第三方库

#### `phaser.min.js` - Phaser 游戏引擎
- **功能**: 游戏引擎核心库
- **状态**: 压缩版本，无需修改

### SDK和工具

#### `v2/` - Poki SDK
- **功能**: 广告和分析SDK
- **状态**: 第三方SDK，无需修改

## 代码整理状态

### ✅ 已完成
- `boot.js` - 启动场景
- `preload.js` - 资源加载  
- `menu.js` - 主菜单
- `stages.js` - 关卡数据

### ⚠️ 待完成
- `game.js` - 核心游戏逻辑（代码量大，需要分模块处理）

## 核心功能说明

### 🎮 游戏流程
1. **启动** (`boot.js`) → **加载** (`preload.js`) → **菜单** (`menu.js`) → **游戏** (`game.js`)

### ⏱️ 5分钟计时系统
- **位置**: `game.js` 中的 `globalGameTimer` 和 `timeUpGameOver()` 函数
- **功能**: 全局5分钟倒计时，时间到后显示结算画面

### 🎯 连连看机制
- **路径算法**: 实现了L型、U型等连接路径的计算
- **消除动画**: 包含连线动画和消除特效
- **提示系统**: 自动寻找可消除的配对
- **洗牌功能**: 重新排列游戏对象

### 💾 数据持久化
- **本地存储**: 使用 `localStorage` 保存游戏进度、最高分等
- **关卡进度**: 自动保存当前关卡状态

### 🎨 UI层级系统
- **深度管理**: 通过 `depth` 属性控制UI元素显示层级
- **响应式设计**: 适配不同屏幕尺寸

## 未来优化建议

1. **模块化重构**: 将 `game.js` 拆分为多个功能模块
2. **TypeScript迁移**: 考虑使用TypeScript提供更好的类型安全
3. **代码压缩**: 生产环境使用压缩版本
4. **性能优化**: 优化大量DOM操作和动画性能 