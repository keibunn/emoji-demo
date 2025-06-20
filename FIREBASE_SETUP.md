# Firebase 实时排行榜设置指南

## 🚀 快速开始

### 1. 创建Firebase项目

1. 访问 [Firebase控制台](https://console.firebase.google.com/)
2. 点击"添加项目"
3. 输入项目名称，例如：`emoji-fight-leaderboard`
4. 选择地区（建议选择：亚洲-东南1）
5. 按照向导完成项目创建

### 2. 启用实时数据库

1. 在Firebase控制台中，选择你刚创建的项目
2. 在左侧菜单中点击"Realtime Database"
3. 点击"创建数据库"
4. 选择数据库位置：**asia-southeast1**（亚洲-东南1）
5. 选择安全规则模式：
   - **测试模式**：允许读写30天（推荐用于开发测试）
   - **锁定模式**：需要手动配置安全规则

### 3. 配置安全规则

在"Realtime Database"页面的"规则"标签中，使用以下规则：

```json
{
  "rules": {
    "leaderboard": {
      ".read": true,
      ".write": true,
      "$scoreId": {
        ".validate": "newData.hasChildren(['playerId', 'playerName', 'score', 'timestamp', 'date']) && newData.child('score').isNumber() && newData.child('timestamp').isNumber()"
      }
    }
  }
}
```

### 4. 获取配置信息

1. 在Firebase控制台中，点击项目设置图标（齿轮图标）
2. 选择"项目设置"
3. 滚动到"您的应用"部分
4. 如果没有Web应用，点击"添加应用" > Web图标
5. 注册应用名称，例如：`emoji-fight-web`
6. 复制Firebase SDK配置代码

### 5. 更新游戏配置

在 `scripts/firebase-config.js` 文件中，替换配置信息：

```javascript
const firebaseConfig = {
    apiKey: "你的-api-key",
    authDomain: "你的项目id.firebaseapp.com",
    databaseURL: "https://你的项目id-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "你的项目id",
    storageBucket: "你的项目id.appspot.com",
    messagingSenderId: "你的发送者id",
    appId: "你的应用id"
};
```

## 🎯 重要配置说明

### 数据库URL格式
确保 `databaseURL` 包含正确的地区信息：
- 亚洲-东南1：`asia-southeast1`
- 美国中部：`us-central1`  
- 欧洲西部：`europe-west1`

### 安全规则解释

我们的安全规则允许：
- ✅ 任何人读取排行榜数据
- ✅ 任何人写入符合格式的排行榜数据
- ❌ 写入格式不正确的数据

数据格式要求：
```json
{
  "playerId": "唯一玩家ID",
  "playerName": "玩家昵称",
  "score": 123,
  "level": 1,
  "timestamp": 1234567890123,
  "date": "2024/1/1"
}
```

## 🔧 功能特性

### 自动功能
- ✨ 游戏结束时自动提交分数
- 🎮 自动生成唯一玩家ID和随机昵称
- 🧹 自动清理旧记录（保持数据库性能）
- 📱 完全响应式排行榜界面

### 排行榜功能
- 🏆 显示前10名玩家
- 🥇🥈🥉 前三名特殊标识
- 📅 显示得分日期
- 🔄 实时数据更新

### 数据管理
- 最多保存50条记录
- 按分数降序排列
- 自动去重和验证

## 🛠️ 测试排行榜功能

1. 确保Firebase配置正确
2. 打开浏览器开发者工具的Console
3. 开始游戏并获得分数
4. 观察Console输出：
   ```
   Firebase初始化成功
   正在提交分数到排行榜: {score: 123, ...}
   分数提交成功！
   ```
5. 在主菜单点击"排行榜"按钮查看数据

## 🚨 常见问题

### Q: 看到"Firebase初始化失败"错误
**A**: 检查：
- 网络连接是否正常
- Firebase配置信息是否正确
- 是否包含了所有必需的配置字段

### Q: 分数无法提交
**A**: 检查：
- Firebase控制台的安全规则是否正确
- 数据库URL是否包含正确的地区后缀
- 浏览器Console是否有详细错误信息

### Q: 排行榜显示"暂无数据"
**A**: 可能原因：
- 还没有玩家提交过分数
- 数据库连接问题
- 安全规则阻止了读取操作

### Q: 如何自定义玩家昵称？
**A**: 在浏览器Console中执行：
```javascript
window.leaderboard.setPlayerName("你的昵称");
```

## 📊 数据库结构

```
firebase-project/
└── leaderboard/
    ├── -N1234567890abcdef/
    │   ├── playerId: "abc123def456"
    │   ├── playerName: "快乐玩家123"
    │   ├── score: 456
    │   ├── level: 3
    │   ├── timestamp: 1703123456789
    │   └── date: "2023/12/21"
    └── ...
```

## 🎉 完成！

设置完成后，你的Emoji游戏就具备了完整的实时排行榜功能！玩家的分数会自动提交，并在排行榜中实时显示。 