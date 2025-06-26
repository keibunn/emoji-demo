// 实时排行榜功能
class Leaderboard {
    constructor() {
        this.database = window.firebaseDatabase;
        this.leaderboardRef = this.database.ref('leaderboard');
        this.maxEntries = 200; // 最多保存200条记录（增加容量防止高分记录丢失）
        this.isSubmitting = false; // 防止重复提交
    }

    // 生成唯一的玩家ID
    generatePlayerId() {
        const stored = localStorage.getItem('emoji_game_player_id');
        if (stored) {
            return stored;
        }
        
        // 生成新的玩家ID：时间戳 + 随机数
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        const playerId = timestamp + random;
        
        localStorage.setItem('emoji_game_player_id', playerId);
        return playerId;
    }

    // 生成玩家昵称
    generatePlayerName() {
        const stored = localStorage.getItem('emoji_game_player_name');
        if (stored) {
            return stored;
        }

        // 随机生成有趣的昵称
        const adjectives = ['快乐', '聪明', '幸运', '神奇', '勇敢', '可爱', '闪亮', '超级'];
        const nouns = ['表情', '玩家', '高手', '达人', '大师', '冠军', '英雄', '明星'];
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const number = Math.floor(Math.random() * 999) + 1;
        
        const name = `${adj}${noun}${number}`;
        localStorage.setItem('emoji_game_player_name', name);
        return name;
    }

    // 提交分数到排行榜
    async submitScore(score, level = 1) {
        if (this.isSubmitting || score <= 0) {
            return false;
        }

        this.isSubmitting = true;

        try {
            const playerId = this.generatePlayerId();
            const playerName = this.generatePlayerName();
            const timestamp = Date.now();

            // 构建分数数据
            const scoreData = {
                playerId: playerId,
                playerName: playerName,
                score: score,
                level: level,
                timestamp: timestamp,
                date: new Date().toLocaleDateString('zh-CN')
            };

            console.log('正在提交分数到排行榜:', scoreData);

            // 提交到Firebase
            await this.leaderboardRef.push(scoreData);
            
            console.log('分数提交成功！');
            
            // 清理旧记录（保持数据库整洁）
            this.cleanupOldEntries();
            
            return true;
        } catch (error) {
            console.error('提交分数失败:', error);
            return false;
        } finally {
            this.isSubmitting = false;
        }
    }

    // 获取排行榜数据
    async getLeaderboard(limit = 30) {
        try {
            console.log('正在获取排行榜数据...');
            
            // 获取所有记录以确保准确的去重处理
            const snapshot = await this.leaderboardRef
                .orderByChild('score')
                .once('value');
            
            const data = snapshot.val();
            if (!data) {
                console.log('排行榜暂无数据');
                return [];
            }

            // 转换为数组
            const allRecords = Object.keys(data)
                .map(key => ({
                    id: key,
                    ...data[key]
                }));

            // 按玩家ID分组，只保留每个玩家的最高分记录
            const playerBestScores = {};
            
            allRecords.forEach(record => {
                const playerId = record.playerId;
                
                // 如果该玩家还没有记录，或者当前分数更高，则更新记录
                if (!playerBestScores[playerId] || record.score > playerBestScores[playerId].score) {
                    playerBestScores[playerId] = record;
                }
            });

            // 转换为数组并按分数降序排序，只取前limit名
            const leaderboard = Object.values(playerBestScores)
                .sort((a, b) => {
                    if (b.score !== a.score) {
                        return b.score - a.score; // 分数不同时按分数排序
                    }
                    return a.timestamp - b.timestamp; // 分数相同时按时间先后排序（先达到的排名更高）
                })
                .slice(0, limit);

            console.log('获取到排行榜数据（仅历史最高分）:', leaderboard);
            console.log(`从 ${allRecords.length} 条记录中筛选出 ${Object.keys(playerBestScores).length} 名玩家的最高分，显示前 ${leaderboard.length} 名`);
            return leaderboard;
        } catch (error) {
            console.error('获取排行榜失败:', error);
            return [];
        }
    }

    // 获取玩家个人最佳成绩
    async getPersonalBest() {
        try {
            const playerId = this.generatePlayerId();
            
            const snapshot = await this.leaderboardRef
                .orderByChild('playerId')
                .equalTo(playerId)
                .once('value');
            
            const data = snapshot.val();
            if (!data) {
                return null;
            }

            // 找到最高分
            const scores = Object.values(data);
            const bestScore = Math.max(...scores.map(s => s.score));
            
            return scores.find(s => s.score === bestScore);
        } catch (error) {
            console.error('获取个人最佳失败:', error);
            return null;
        }
    }

    // 实时监听排行榜变化
    listenToLeaderboard(callback, limit = 30) {
        console.log('开始监听排行榜变化...');
        
        // 获取所有记录以确保准确的去重处理
        this.leaderboardRef
            .orderByChild('score')
            .on('value', (snapshot) => {
                const data = snapshot.val();
                if (!data) {
                    callback([]);
                    return;
                }

                // 转换为数组
                const allRecords = Object.keys(data)
                    .map(key => ({
                        id: key,
                        ...data[key]
                    }));

                // 按玩家ID分组，只保留每个玩家的最高分记录
                const playerBestScores = {};
                
                allRecords.forEach(record => {
                    const playerId = record.playerId;
                    
                    // 如果该玩家还没有记录，或者当前分数更高，则更新记录
                    if (!playerBestScores[playerId] || record.score > playerBestScores[playerId].score) {
                        playerBestScores[playerId] = record;
                    }
                });

                // 转换为数组并按分数降序排序，只取前limit名
                const leaderboard = Object.values(playerBestScores)
                    .sort((a, b) => {
                        if (b.score !== a.score) {
                            return b.score - a.score; // 分数不同时按分数排序
                        }
                        return a.timestamp - b.timestamp; // 分数相同时按时间先后排序（先达到的排名更高）
                    })
                    .slice(0, limit);

                callback(leaderboard);
            });
    }

    // 停止监听排行榜
    stopListening() {
        console.log('停止监听排行榜变化');
        this.leaderboardRef.off();
    }

    // 清理旧记录（保持数据库性能）
    async cleanupOldEntries() {
        try {
            const snapshot = await this.leaderboardRef
                .orderByChild('timestamp')
                .once('value');
            
            const data = snapshot.val();
            if (!data) return;

            const entries = Object.keys(data).map(key => ({
                key,
                timestamp: data[key].timestamp
            }));

            // 如果记录超过最大限制，删除最旧的记录
            if (entries.length > this.maxEntries) {
                entries.sort((a, b) => a.timestamp - b.timestamp);
                const toDelete = entries.slice(0, entries.length - this.maxEntries);
                
                for (const entry of toDelete) {
                    await this.leaderboardRef.child(entry.key).remove();
                }
                
                console.log(`清理了 ${toDelete.length} 条旧记录`);
            }
        } catch (error) {
            console.error('清理旧记录失败:', error);
        }
    }

    // 检查是否为新的最佳成绩
    async isNewPersonalBest(score) {
        const personalBest = await this.getPersonalBest();
        return !personalBest || score > personalBest.score;
    }

    // 获取玩家在排行榜中的排名
    async getPlayerRank(playerId = null) {
        if (!playerId) {
            playerId = this.generatePlayerId();
        }

        try {
            const leaderboard = await this.getLeaderboard(100); // 获取更多数据来计算排名（现在已经是去重后的数据）
            const playerEntry = leaderboard.find(entry => entry.playerId === playerId);
            
            if (!playerEntry) {
                return null;
            }

            const rank = leaderboard.findIndex(entry => entry.playerId === playerId) + 1;
            return {
                rank: rank,
                score: playerEntry.score,
                totalPlayers: leaderboard.length
            };
        } catch (error) {
            console.error('获取玩家排名失败:', error);
            return null;
        }
    }

    // 设置玩家昵称
    setPlayerName(name) {
        if (name && name.trim()) {
            const trimmedName = name.trim().substring(0, 12); // 限制昵称长度
            localStorage.setItem('emoji_game_player_name', trimmedName);
            return trimmedName;
        }
        return this.generatePlayerName();
    }

    // 获取玩家昵称
    getPlayerName() {
        return this.generatePlayerName();
    }
}

// 创建全局排行榜实例
window.leaderboard = new Leaderboard();

// 导出给其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Leaderboard;
} 