// Firebase 配置和初始化
// Firebase项目配置信息
const firebaseConfig = {
    apiKey: "AIzaSyBQYHFLf7D7JswGN0lu6G7C2twQMR_xup0",
    authDomain: "emoji-fight-59fd4.firebaseapp.com",
    databaseURL: "https://emoji-fight-59fd4-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "emoji-fight-59fd4",
    storageBucket: "emoji-fight-59fd4.firebasestorage.app",
    messagingSenderId: "694336484011",
    appId: "1:694336484011:web:3988a16ef32a6fa63d7dee",
    measurementId: "G-CTQSKYS6LH"
};

// 初始化Firebase应用
let firebaseApp;
let database;

try {
    // 初始化Firebase
    firebaseApp = firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    console.log("Firebase初始化成功");
} catch (error) {
    console.error("Firebase初始化失败:", error);
    // 创建一个模拟的database对象，防止游戏崩溃
    database = {
        ref: () => ({
            push: () => Promise.resolve(),
            once: () => Promise.resolve({ val: () => null }),
            on: () => {},
            off: () => {},
            orderByChild: () => ({
                limitToLast: () => ({
                    once: () => Promise.resolve({ val: () => null })
                })
            })
        })
    };
}

// 全局变量，供其他脚本使用
window.firebaseDatabase = database; 