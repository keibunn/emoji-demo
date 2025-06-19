var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.objectCreate=$jscomp.ASSUME_ES5||"function"==typeof Object.create?Object.create:function(a){var h=function(){};h.prototype=a;return new h};$jscomp.underscoreProtoCanBeSet=function(){var a={a:!0},h={};try{return h.__proto__=a,h.a}catch(g){}return!1};
$jscomp.setPrototypeOf="function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(a,h){a.__proto__=h;if(a.__proto__!==h)throw new TypeError(a+" is not extensible");return a}:null;
$jscomp.inherits=function(a,h){a.prototype=$jscomp.objectCreate(h.prototype);a.prototype.constructor=a;if($jscomp.setPrototypeOf){var g=$jscomp.setPrototypeOf;g(a,h)}else for(g in h)if("prototype"!=g)if(Object.defineProperties){var v=Object.getOwnPropertyDescriptor(h,g);v&&Object.defineProperty(a,g,v)}else a[g]=h[g];a.superClass_=h.prototype};
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,h,g){a!=Array.prototype&&a!=Object.prototype&&(a[h]=g.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,h,g,v){if(h){g=$jscomp.global;a=a.split(".");for(v=0;v<a.length-1;v++){var x=a[v];x in g||(g[x]={});g=g[x]}a=a[a.length-1];v=g[a];h=h(v);h!=v&&null!=h&&$jscomp.defineProperty(g,a,{configurable:!0,writable:!0,value:h})}};$jscomp.polyfill("Object.is",function(a){return a?a:function(a,g){return a===g?0!==a||1/a===1/g:a!==a&&g!==g}},"es6","es3");
$jscomp.polyfill("Array.prototype.includes",function(a){return a?a:function(a,g){var h=this;h instanceof String&&(h=String(h));var x=h.length;g=g||0;for(0>g&&(g=Math.max(g+x,0));g<x;g++){var G=h[g];if(G===a||Object.is(G,a))return!0}return!1}},"es7","es3");
$jscomp.checkStringArgs=function(a,h,g){if(null==a)throw new TypeError("The 'this' value for String.prototype."+g+" must not be null or undefined");if(h instanceof RegExp)throw new TypeError("First argument to String.prototype."+g+" must not be a regular expression");return a+""};$jscomp.polyfill("String.prototype.includes",function(a){return a?a:function(a,g){return-1!==$jscomp.checkStringArgs(this,a,"includes").indexOf(a,g||0)}},"es6","es3");
var _0x4e87="LnBva2kuY29t bG9jYWxob3N0 139KObtWR 6505XySddN 1187125jopCbV 913662FnvCIe 740825sNyBkZ 459327dmigPF 335606FqHNeg 770186hYUBAW some top aHR0cHM6Ly9wb2tpLmNvbS9zaXRlbG9jaw== location length href".split(" "),_0x3b7c=function(a,h){return _0x4e87[a-340]};
(function(a,h){for(var g=_0x3b7c;;)try{if(parseInt(g(349))+parseInt(g(348))+-parseInt(g(350))+parseInt(g(345))*parseInt(g(344))+-parseInt(g(346))+-parseInt(g(351))+parseInt(g(347))===h)break;else a.push(a.shift())}catch(v){a.push(a.shift())}})(_0x4e87,725092);
!function(){var a=_0x3b7c,h=window.location.hostname;[a(343),a(342),"LnBva2ktZ2RuLmNvbQ=="].map(function(a){return atob(a)})[a(352)](function(a){var g=_0x3b7c;return"."===a.charAt(0)?-1!==h.indexOf(a,h[g(340)]-a[g(340)]):a===h})||true ||(window[a(355)][a(341)]=atob(a(354)),window[a(353)][a(355)]!==window[a(355)]&&(window[a(353)][a(355)]=window[a(355)]))}();var ad_show=!1;
// 企业微信兼容性全局检测
var isWeWorkApp = /wxwork/i.test(navigator.userAgent) || /MicroMessenger/i.test(navigator.userAgent);
if(isWeWorkApp) {
    console.log("WeChat Work environment detected");
}

function show_ad(){ad_show=!0;PokiSDK.commercialBreak().then(function(){ad_show=!1;console.log("Commercial break finished, proceeding to game")})}window.addEventListener("keydown",function(a){["ArrowDown","ArrowUp"," "].includes(a.key)&&ad_show&&a.preventDefault()});window.addEventListener("wheel",function(a){ad_show&&a.preventDefault()},{passive:!1});var Game=function(){return Phaser.Scene.call(this,"game")||this};$jscomp.inherits(Game,Phaser.Scene);

// 全局变量：5分钟时间限制
var gameTimeLimit = 300;
var timeLimitSprite;
var timeText;
var gameTimeEvent;

Game.prototype.create=function(){
    // 企业微信兼容性检测
    var isWeWorkApp = /wxwork/i.test(navigator.userAgent) || /MicroMessenger/i.test(navigator.userAgent);
    
    if(isWeWorkApp) {
        console.log("WeChat Work environment detected");
        // 企业微信环境下保持音效可用，由用户控制
    }
    
    // 获取动态屏幕尺寸
    var screenWidth = this.scale.width;
    var screenHeight = this.scale.height;
    
    // 移动端优化的UI缩放计算
    var baseWidth = 375;
    var baseHeight = 812;
    var uiScale = Math.min(screenWidth / baseWidth, screenHeight / baseHeight);

    // 确保在小屏幕设备上UI不会太小
    if (screenWidth <= 375 || screenHeight <= 667) {
        uiScale = Math.max(uiScale, 0.8);
    }

    // 确保在大屏幕设备上UI不会太大
    uiScale = Math.min(uiScale, 1.5);

    function a(a,f,b){var B=p.add.sprite(a,f,"obj"+b);p.tweens.add({targets:B,scaleY:0,scaleX:0,duration:150,ease:"Linear",onComplete:function(){B.destroy(!0,!0)}})}function h(a){for(var B=a.length,b,d;B;)d=Math.floor(Math.random()*B--),b=a[B],a[B]=a[d],a[d]=b;return a}function g(){if(q){removeSelectionEffect(q);q=null;}clearSelectionOverlays();for(var a=[],f=u.getLength(),b=u.getChildren(),d=0;10>d;d++)for(var c=0;8>c;c++)l[d][c].filled&&a.push(l[d][c].color);h(a);for(d=0;d<f;d++)c=b[d],c.color=a[d],c.setTexture("obj"+
    c.color);Q();x()?setTimeout(function(){play_sound("shuffle",p)},200):(console.log("not match"),g())}function v(){var a=u.getLength(),f=u.getChildren(),b=x();if(b){E=b;clearSelectionOverlays();for(var d=0;d<a;d++){var c=f[d];if(c.pos.x===b[0].x&&c.pos.y===b[0].y||c.pos.x===b[1].x&&c.pos.y===b[1].y){addSelectionEffect(c,p)}}}else alert("err");setTimeout(function(){play_sound("hint",p)},200)}function x(){for(var a=u.getLength(),f=u.getChildren(),b=0;b<a;b++){var d=f[b];a:{var c=d.pos;for(var e=l[c.y][c.x].color,g=0;10>g;g++)for(var k=
    0;8>k;k++)if((g!==c.y||k!==c.x)&&l[g][k].filled&&l[g][k].color===e&&R(c,{x:k,y:g})){c={x:k,y:g};break a}c=!1}if(c)return[d.pos,c]}return!1}function G(a){y="drop";for(var B=u.getLength(),b=u.getChildren(),d=0;d<B;d++){var c=b[d],e=l[c.pos.y][c.pos.x];if(0!=e.to.x||0!=e.to.y)c.pos.x+=e.to.x,c.pos.y+=e.to.y,p.tweens.add({targets:c,x:H+z.width*c.pos.x,y:I+z.height*c.pos.y,duration:200,ease:"Linear",onComplete:function(){a--;0===a&&(y="play",Q(),x()||(0<player_data.shuffle_left?(C.setVisible(!0),play_sound("nomatch",
    p)):(y="gameover1",setTimeout(S,1E3))))}})}}function Q(){for(var a=0;10>a;a++)for(var f=0;8>f;f++)l[a][f].filled=!1,l[a][f].color=0,l[a][f].to=null;a=u.getLength();f=u.getChildren();for(var b=0;b<a;b++){var d=f[b];l[d.pos.y][d.pos.x].filled=!0;l[d.pos.y][d.pos.x].color=d.color}}function w(a){return Math.PI/180*a}function T(){for(var a=J.getChildren(),f=J.getLength(),b=0;b<f;b++)a[b].setVisible(!1)}function X(a){play_sound("connected",p);T();for(var f=J.getChildren(),b,d,c=0;c<a.length;c++){var e=f[c];e.setVisible(!0);e.setPosition(H+z.width*a[c].x,I+z.height*a[c].y);e.setDisplaySize(z.width * 0.8, z.height * 0.8);e.setDepth(100);0===c?d=a[c].x===a[c+1].x?a[c].y>a[c+1].y?"up":"down":a[c].x>a[c+1].x?"left":"right":c<a.length-1&&(a[c].x===a[c+1].x?a[c].y>a[c+1].y?(d="up","up"===b?e.setFrame(1):"down"!==b&&("left"===b?(e.setFrame(2),e.setRotation(w(180))):"right"===b&&(e.setFrame(2),e.setRotation(w(90))))):(d="down","up"!==b&&("down"===b?e.setFrame(1):"left"===b?(e.setFrame(2),e.setRotation(w(270))):"right"===b&&(e.setFrame(2),e.setRotation(w(0))))):a[c].x>a[c+1].x?(d="left","up"===b?(e.setFrame(2),e.setRotation(w(0))):"down"===b?(e.setFrame(2),e.setRotation(w(90))):"left"===b&&e.setFrame(1)):(d="right","up"===b?(e.setFrame(2),e.setRotation(w(270))):"down"===b?(e.setFrame(2),e.setRotation(w(180))):"left"!==b&&"right"===b&&e.setFrame(1)));c===a.length-1&&(d=a[c].x===a[c-1].x?a[c].y>a[c-1].y?"up":"down":a[c].x>a[c-1].x?"left":"right",e.setFrame(0));0===e.frame.name?"up"===d?e.setRotation(w(270)):"down"===d?e.setRotation(w(90)):"left"===d?e.setRotation(w(180)):"right"===d&&e.setRotation(w(0)):1===e.frame.name&&("up"===d||"down"===d?e.setRotation(w(90)):e.setRotation(w(0)));b=d}}function U(a,f){return 0<=a.x&&0<=a.y&&a.x<f[0].length&&a.y<f.length?!0:!1}function F(a,f,b,d,c){for(var e=[],g=1;10>g;g++){var k={x:f.x+a.x*g,y:f.y+a.y*g};if(U(k,d))if(d[k.y][k.x].filled){if(k.x===b.x&&k.y===b.y)return e.push(k),e;break}else if(e.push(k),c)if(1===a.x||-1===a.x){var h=F({x:0,y:-1},k,b,d);if(h){for(b=0;b<h.length;b++)e.push(h[b]);return e}if(k=F({x:0,y:1},k,b,d)){for(b=
    0;b<k.length;b++)e.push(k[b]);return e}}else{if(h=F({x:-1,y:0},k,b,d)){for(b=0;b<h.length;b++)e.push(h[b]);return e}if(k=F({x:1,y:0},k,b,d)){for(b=0;b<k.length;b++)e.push(k[b]);return e}}else if(1===a.x||-1===a.x){if(K({x:0,y:1},k,b,d)){for(a=k.y+1;a<b.y+1;a++)e.push({x:k.x,y:a});return e}if(K({x:0,y:-1},k,b,d)){for(a=k.y-1;a>b.y-1;a--)e.push({x:k.x,y:a});return e}}else{if(K({x:1,y:0},k,b,d)){for(a=k.x+1;a<b.x+1;a++)e.push({x:a,y:k.y});return e}if(K({x:-1,y:0},k,b,d)){for(a=k.x-1;a>b.x-1;a--)e.push({x:a,
    y:k.y});return e}}}return!1}function K(a,f,b,d){for(var c=1;10>c;c++){var e={x:f.x+a.x*c,y:f.y+a.y*c};if(U(e,d)){if(d[e.y][e.x].filled)return e.x===b.x&&e.y===b.y?!0:!1}else return!1}}function R(a,f){for(var b=JSON.parse(JSON.stringify(l)),d=0;10>d;d++)b[d].unshift({filled:!1}),b[d].push({filled:!1});d=[];for(var c=0;10>c;c++)d.push({filled:!1});b.push(d);b.unshift(d);a.x++;a.y++;f.x++;f.y++;d=[];for(c=0;4>c;c++){var e={x:-1,y:0};1===c?e={x:1,y:0}:2===c?e={x:0,y:-1}:3===c&&(e={x:0,y:1});if(e=F(e,
    a,f,b,!0)){var g=[];e.unshift(a);for(var k=0;k<e.length;k++)g.push({x:e[k].x-1,y:e[k].y-1});d.push(g)}}b=null;c=999;for(e=0;e<d.length;e++)d[e].length<c&&(c=d[e].length,b=d[e]);a.x--;a.y--;f.x--;f.y--;return b}function V(){Y.setText(player_data.shuffle_left);Z.setText(player_data.hint_left)}function S(){PokiSDK.gameplayStop();play_sound("gameover",p);player_data.score>best_score&&(best_score=player_data.score,localStorage.setItem("redfoc_onet_best",best_score));for(var a=u.getLength(),f=u.getChildren(),
    b=0;10>b;b++)for(var d=0;8>d;d++)if(l[b][d].filled){var c=0;a:for(;c<a;c++){var e=f[c];if(e.pos.x===d&&e.pos.y===b){e.depth=0;break a}}}y="gameover";var overlay=p.add.rectangle(0,0,screenWidth,screenHeight,0).setOrigin(0);overlay.alpha=.8;overlay.depth=200;p.add.text(screenWidth/2,screenHeight*0.25,"GAMEOVER",{fontFamily:"PoetsenOne",fontSize:Math.floor(35*uiScale),align:"center",color:"#FFFFFF"}).setOrigin(.5).setDepth(201);var xingxingSprite=p.add.sprite(screenWidth/2,screenHeight*0.32,"xingxing");xingxingSprite.setScale(0.7*uiScale);xingxingSprite.depth=201;p.add.text(screenWidth/2,screenHeight*0.43,String(player_data.score),{fontFamily:"PoetsenOne",fontSize:Math.floor(130*uiScale),align:"center",color:"#FFD93D"}).setOrigin(.5).setDepth(201);var restartBtn=draw_button(screenWidth/2,screenHeight*0.62,"restart",p);restartBtn.setScale(0.6 * uiScale);restartBtn.depth=201;var menuBtn=draw_button(screenWidth/2,screenHeight*0.72,"menu",p);menuBtn.setScale(0.6 * uiScale);menuBtn.depth=201;localStorage.removeItem("redfoc_onet_array");player_data.drop_mode=0;player_data.score=0;last_array=null;localStorage.setItem("redfoc_onet_data",JSON.stringify(player_data))}function W(){var a={arr:l,data:player_data};last_array=JSON.parse(JSON.stringify(l));localStorage.setItem("redfoc_onet_array",JSON.stringify(a))}

// 时间到时的游戏结束函数
function timeUpGameOver(){
    // 停止时间计时器
    if(gameTimeEvent){
        gameTimeEvent.remove();
        gameTimeEvent = null;
    }
    
    y="gameover";
    PokiSDK.gameplayStop();
    play_sound("gameover",p);
    
    // 保存当前分数用于显示
    var finalScore = player_data.score;
    player_data.score>best_score&&(best_score=player_data.score,localStorage.setItem("redfoc_onet_best",best_score));
    
    // 添加半透明黑屏遮罩 - 使用更高的depth确保在所有界面之上
    var overlay = p.add.rectangle(0,0,screenWidth,screenHeight,0).setOrigin(0);
    overlay.alpha = 0.8;
    overlay.depth = 300; // 更高的depth确保在COMPLETED界面之上
    
    // 显示时间到结算信息，使用响应式居中布局
    var timeUpText = p.add.text(screenWidth/2,screenHeight*0.25,"TIME'S UP!",{fontFamily:"PoetsenOne",fontSize:Math.floor(35*uiScale),align:"center",color:"#FF6B6B"}).setOrigin(.5);
    timeUpText.depth = 301; // 确保文字在最上层
    
    // 添加装饰元素 - 位于TIME'S UP和分数之间
    var xingxingSprite = p.add.sprite(screenWidth/2, screenHeight*0.33, "xingxing");
    xingxingSprite.setScale(0.7 * uiScale); // 响应式缩放
    xingxingSprite.depth = 301;
    
    var scoreText = p.add.text(screenWidth/2,screenHeight*0.45,String(finalScore),{fontFamily:"PoetsenOne",fontSize:Math.floor(130*uiScale),align:"center",color:"#FFD93D"}).setOrigin(.5);
    scoreText.depth = 301;
    
    var againBtn = draw_button(screenWidth/2,screenHeight*0.62,"restart",p);
    againBtn.setScale(0.6 * uiScale); // 调整按钮大小
    againBtn.depth = 301; // 按钮也要在最上层
    
    var menuBtn = draw_button(screenWidth/2,screenHeight*0.72,"menu",p);
    menuBtn.setScale(0.6 * uiScale); // 调整按钮大小
    menuBtn.depth = 301;
    
    localStorage.removeItem("redfoc_onet_array");
    player_data.drop_mode=0;
    last_array=null;
    // 注意：不在这里清零分数，保持显示的分数不变，等待按钮点击时再清零
}

// 更新时间显示
function updateTimeDisplay(){
    // 如果已经是游戏结束状态，不再更新时间
    if(y === "gameover") return;
    
    var remainingTime = gameTimeLimit - globalGameTimer;
    if(remainingTime <= 0){
        timeUpGameOver();
        return;
    }
    var minutes = Math.floor(remainingTime / 60);
    var seconds = remainingTime % 60;
    timeText.setText((minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds));
}

var N=this;PokiSDK.gameplayStart();this.add.sprite(0,0,"background").setOrigin(0);var y="play",n=0,p=this,E,O=!1,u=this.add.group();this.add.group();var J=this.add.group();
// emoji矩阵严格25px左右边距设计 - 真正居中布局
var emojiSideMargin = 25; // 严格左右边距25px
var availableEmojiWidth = screenWidth - (emojiSideMargin * 2); // 可用于emoji矩阵的宽度

// 计算emoji单元格尺寸 - 基于8列布局，充分利用可用空间
var cellWidth = Math.floor(availableEmojiWidth / 8);
var cellHeight = Math.floor(cellWidth * 0.97); // 保持宽高比

// 适当放大emoji，确保较小屏幕下也有足够大小，移除过小的最大限制
cellWidth = Math.max(40, cellWidth); // 最小40px
cellHeight = Math.max(38, cellHeight); // 最小38px

// 如果计算出的尺寸太大，适当限制（针对超大屏幕）
if(cellWidth > 65) {
    cellWidth = 65;
    cellHeight = Math.floor(cellWidth * 0.97);
}

q=0,z={width:cellWidth,height:cellHeight};

// 重新计算实际矩阵尺寸
var actualGridWidth = 8 * z.width;  // 实际矩阵宽度
var actualGridHeight = 10 * z.height; // 实际矩阵高度

// 垂直布局计算
var headerHeight = Math.floor(screenHeight * 0.12);
var footerHeight = Math.floor(screenHeight * 0.15);
var availableHeight = screenHeight - headerHeight - footerHeight;

// emoji矩阵真正居中布局 - 计算完美居中的X坐标
var emojiGridStartX = (screenWidth - actualGridWidth) / 2; // 矩阵真正居中
var emojiGridStartY = headerHeight + (availableHeight - actualGridHeight) / 2;

// emoji中心点计算 - 基于左上角起始点
H = emojiGridStartX + z.width / 2;  // 第一个emoji的中心X坐标
I = emojiGridStartY + z.height / 2; // 第一个emoji的中心Y坐标

// 简化布局信息（企业微信兼容）
var actualLeftMargin = emojiGridStartX;
var actualRightMargin = screenWidth - emojiGridStartX - actualGridWidth;
console.log("Layout: " + screenWidth + "x" + screenHeight + " | Grid: " + actualGridWidth + "x" + actualGridHeight + " | Margins: L" + actualLeftMargin.toFixed(1) + " R" + actualRightMargin.toFixed(1));

l=Array(10),r=[],m=1,maxType=18+player_data.drop_mode;22<maxType&&(maxType=22);console.log("Max: "+maxType);for(var A=0;40>A;A++)m>maxType&&(m=1),r.push(m),m++;r=r.concat(r);h(r);m=0;console.log("Total emoji types in array:", r.length);console.log("last_array status:", last_array ? "exists" : "null");
// 强制重新生成emoji网格，不使用last_array
last_array = null;
if(last_array)for(l=last_array,r=0;10>r;r++)for(m=0;8>m;m++)l[r][m].filled&&(maxType=l[r][m].color,A=this.add.sprite(emojiGridStartX+z.width/2+z.width*m,emojiGridStartY+z.height/2+z.height*r,"obj"+maxType).setInteractive(),A.color=maxType,A.piece=!0,A.pos={x:m,y:r},u.add(A));else{console.log("Creating new emoji grid...");var emojiCount=0;for(var row=0;10>row;row++){A=[];for(var col=0;8>col;col++){var P=r[m],aa={color:P,filled:!0};
// 正确的emoji坐标计算：基于网格起始点 + 单元格尺寸 * 索引 + 半个单元格尺寸作为中心点
var emojiX = emojiGridStartX + z.width/2 + z.width * col;
var emojiY = emojiGridStartY + z.height/2 + z.height * row;
var M=this.add.sprite(emojiX, emojiY,"obj"+P).setInteractive();M.color=P;M.piece=!0;M.pos={x:col,y:row};M.setDisplaySize(z.width,z.height);u.add(M);m++;A.push(aa);emojiCount++;if(emojiCount <= 5 || emojiCount % 10 === 0) console.log("Created emoji", emojiCount, "at position ("+col+","+row+") with color obj"+P+" at coordinates ("+emojiX+","+emojiY+")")}l[row]=A}console.log("Total emojis created:", emojiCount);
// 边距验证（企业微信兼容）
var firstEmojiX = emojiGridStartX + z.width/2;
var lastEmojiX = emojiGridStartX + z.width/2 + z.width * 7;
var leftEdge = firstEmojiX - z.width/2;
var rightEdge = lastEmojiX + z.width/2;
var finalLeftMargin = leftEdge;
var finalRightMargin = screenWidth - rightEdge;
console.log("Final margins: L" + finalLeftMargin.toFixed(1) + " R" + finalRightMargin.toFixed(1) + " (target: 25px)");
// 重新设置全局H和I变量为第一个emoji的坐标，以保持兼容性
H = emojiGridStartX + z.width/2;
I = emojiGridStartY + z.height/2;}
// 响应式header和footer
var headerSprite = this.add.sprite(0,0,"header").setOrigin(0);
headerSprite.setDisplaySize(screenWidth, headerHeight);

var footerSprite = this.add.sprite(0,screenHeight,"footer").setOrigin(0,1);
footerSprite.setDisplaySize(screenWidth, footerHeight);

// 统一UI元素布局 - 距离顶部60像素，整齐并列
var topUIY = 60;
var elementHeight = 64; // 统一高度基准

// 计算合适的缩放比例，确保所有元素都能放下
var totalWidth = 152 + 230 + 79 + 79; // 所有元素的原始宽度：540像素
var sideMargin = 25; // 左右边距各25像素
var availableWidth = screenWidth - (sideMargin * 2); // 可用宽度

// 预留间距空间：3个间距
var minSpacing = 8; // 最小间距8像素
var totalSpacingWidth = minSpacing * 3;
var maxScaleByWidth = (availableWidth - totalSpacingWidth) / totalWidth;

// 限制最大缩放，确保不会太大
var uiElementScale = Math.min(maxScaleByWidth, 0.6 * uiScale);

// 重新计算实际使用的尺寸
var scaledTimeWidth = 152 * uiElementScale;
var scaledScoreWidth = 230 * uiElementScale;
var scaledBtnWidth = 79 * uiElementScale;
var totalScaledWidth = scaledTimeWidth + scaledScoreWidth + scaledBtnWidth * 2;

// 计算实际间距（剩余空间平均分配）
var remainingWidth = availableWidth - totalScaledWidth;
var spacing = Math.max(minSpacing, remainingWidth / 3);

// 计算各元素的X位置
var timeX = sideMargin + scaledTimeWidth / 2;
var scoreX = timeX + scaledTimeWidth / 2 + spacing + scaledScoreWidth / 2;
var shuffleX = scoreX + scaledScoreWidth / 2 + spacing + scaledBtnWidth / 2;
var hintX = shuffleX + scaledBtnWidth / 2 + spacing + scaledBtnWidth / 2;

// 1. 时间显示
timeLimitSprite = this.add.sprite(timeX, topUIY, "time_limit");
timeLimitSprite.setScale(uiElementScale);
var remainingTime = gameTimeLimit - globalGameTimer;
var minutes = Math.floor(remainingTime / 60);
var seconds = remainingTime % 60;
timeText = this.add.text(timeX, topUIY, (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds), {
    fontFamily: "robotomono", 
    fontSize: Math.floor(24 * uiElementScale), 
    align: "center", 
    color: "#FFFFFF"
}).setOrigin(0.5);

// 2. 分数显示
var scoreSprite = this.add.sprite(scoreX, topUIY, "score_bar");
scoreSprite.setScale(uiElementScale);
var ba = this.add.text(scoreX, topUIY, String(player_data.score), {
    fontFamily: "robotomono", 
    fontSize: Math.floor(32 * uiElementScale), 
    align: "center", 
    color: "#FFFFFF"
}).setOrigin(0.5);

// 3. Shuffle按钮
r = draw_button(shuffleX, topUIY, "shuffle", this);
r.setScale(uiElementScale);
0 === player_data.shuffle_left && (r.alpha = 0.5);

// 4. Hint按钮  
var hintBtn = draw_button(hintX, topUIY, "hint", this);
hintBtn.setScale(uiElementScale);
0 === player_data.hint_left && (hintBtn.alpha = 0.5);

// 添加按钮上的数字圆圈和文字 - 优化位置计算
var circleOffsetX = scaledBtnWidth * 0.32; // 按钮宽度的32%位置
var circleOffsetY = scaledBtnWidth * 0.25; // 按钮高度的25%位置
var shuffleCircle = this.add.sprite(shuffleX + circleOffsetX, topUIY + circleOffsetY, "circle");
shuffleCircle.setScale(uiElementScale);
var hintCircle = this.add.sprite(hintX + circleOffsetX, topUIY + circleOffsetY, "circle");
hintCircle.setScale(uiElementScale);

var Y = this.add.text(shuffleCircle.x, shuffleCircle.y, String(player_data.shuffle_left), {
    fontFamily: "robotomono", 
    fontSize: Math.floor(24 * uiElementScale), 
    align: "center", 
    color: "#FFFFFF"
}).setOrigin(0.5);

var Z = this.add.text(hintCircle.x, hintCircle.y, String(player_data.hint_left), {
    fontFamily: "robotomono", 
    fontSize: Math.floor(24 * uiElementScale), 
    align: "center", 
    color: "#FFFFFF"
}).setOrigin(0.5);

// 游戏提示标志
var D = this.add.sprite(180, 180, "sign");
D.setDepth(100);D.setVisible(!1);D.setScale(uiScale);

var C=this.add.sprite(shuffleX,140,"arrow");
C.setDepth(100);C.setVisible(!1);C.setScale(uiScale);

this.tweens.add({targets:D,scaleX:1.1*uiScale,scaleY:1.1*uiScale,ease:"Linear",duration:250,yoyo:!0,repeat:-1});this.tweens.add({targets:C,y:C.y+20,ease:"Linear",duration:250,yoyo:!0,repeat:-1});

for(r=0;25>r;r++)m=this.add.sprite(80,80,"lines"),m.setDepth(100),m.setVisible(!1),J.add(m);

// 添加时间事件
gameTimeEvent = this.time.addEvent({delay:1000,callback:function(){
    globalGameTimer++;
    updateTimeDisplay();
},loop:!0});

this.input.keyboard.on("keydown",function(a,f){O=a.key});this.input.keyboard.on("keyup",function(a,f){O=!1});// 企业微信触摸事件兼容性处理
this.input.on("gameobjectdown",function(h,f){
    if(ad_show)return!1;
    
    // 企业微信兼容性：防止事件重复触发
    if(isWeWorkApp && f._lastClickTime && (Date.now() - f._lastClickTime) < 200) {
        return false;
    }
    if(f) f._lastClickTime = Date.now();
    if("z"===O)l[f.pos.y][f.pos.x].filled=!1,f.destroy(!0,!0);else if(f.button)play_sound("click",N),N.tweens.add({targets:f,scaleX:1.05,scaleY:1.05,yoyo:!0,ease:"Back.easeOut",duration:120,onComplete:function(){"play"===y&&("hint"===f.name?0<player_data.hint_left&&(player_data.hint_left--,V(),v(),0===player_data.hint_left&&(f.alpha=.5)):"shuffle"===f.name&&0<player_data.shuffle_left&&(C.visible&&C.setVisible(!1),player_data.shuffle_left--,V(),g(),0===player_data.shuffle_left&&(f.alpha=.5)));"next"===f.name||"bonus"===y&&"next"===f.name?(show_ad(),p.scene.start("game")):"restart"===f.name?(show_ad(),globalGameTimer=0,player_data.drop_mode=0,player_data.score=0,localStorage.setItem("redfoc_onet_data",JSON.stringify(player_data)),p.scene.start("game")):"menu"===f.name&&(show_ad(),globalGameTimer=0,player_data.score=0,localStorage.setItem("redfoc_onet_data",JSON.stringify(player_data)),PokiSDK.gameplayStop(),p.scene.start("menu"))}},N);else if(f.piece){if(E){clearSelectionOverlays();E=null}q?"play"===y&&(f.pos.x===q.pos.x&&f.pos.y===q.pos.y?(removeSelectionEffect(q),clearSelectionOverlays(),q=null,D.setVisible(!1)):(play_sound("itemclick",p),clearSelectionOverlays(),addSelectionEffect(f,p),l[f.pos.y][f.pos.x].color===l[q.pos.y][q.pos.x].color?(h=R(q.pos,f.pos))?(player_data.score+=2,ba.setText(player_data.score),y="wait1",D.setVisible(!1),X(h),l[f.pos.y][f.pos.x].filled=!1,l[q.pos.y][q.pos.x].filled=!1,setTimeout(function(){y="wait";a(f.x,f.y,f.color);a(q.x,q.y,q.color);f.destroy(!0,!0);q.destroy(!0,!0);var selectedEmoji=q;q=null;setTimeout(function(){if(1===player_data.drop_mode)var a="down";else if(2===player_data.drop_mode)a="up";else if(3===player_data.drop_mode)a="left";else if(4===player_data.drop_mode)a="right";else if(5===player_data.drop_mode)0===n?a="down":1===n&&(a="up"),n++,1<n&&(n=0);else if(6===player_data.drop_mode)0===n?a="left":1===n&&(a="right"),n++,1<n&&(n=0);else if(7===player_data.drop_mode)0===n?a="up":1===n&&(a="right"),n++,1<n&&(n=0);else if(8===player_data.drop_mode)0===n?a="down":1===n&&(a="left"),n++,1<n&&(n=0);else if(9===player_data.drop_mode)0===n?a="up":1===n?a="right":2===n?a="down":3===n&&(a="left"),n++,3<n&&(n=0);else if(9<player_data.drop_mode){var b=Math.floor(4*Math.random());0===b?a="up":1===b?a="right":2===b?a="down":3===b&&(a="left")}b=a;a=0;if("down"===b)for(b=0;8>b;b++)for(var c=0,d=9;0<=d;d--)l[d][b].filled?(0!=c&&a++,l[d][b].to={x:0,y:c}):c++;else if("up"===b)for(b=0;8>b;b++)for(d=c=0;10>d;d++)l[d][b].filled?(0!=c&&a++,l[d][b].to={x:0,y:c}):c--;else if("left"===b)for(b=0;10>b;b++)for(d=c=0;8>d;d++)l[b][d].filled?(0!=c&&a++,l[b][d].to={x:c,y:0}):c--;else if("right"===b)for(b=0;10>b;b++)for(c=0,d=7;0<=d;d--)l[b][d].filled?(0!=c&&a++,l[b][d].to={x:c,y:0}):c++;if(a){b=u.getLength();c=u.getChildren();for(var f=d=0;10>f;f++)for(var g=0;8>g;g++)if(l[f][g].filled){d++;var h=0;a:for(;h<b;h++){var m=c[h];if(m.pos.x===g&&m.pos.y===f){m.depth=d;break a}}}G(a)}else if(y="play",!x()){a:{for(a=0;10>a;a++)for(b=0;8>b;b++)if(l[a][b].filled){a=!1;break a}a=!0}a?(PokiSDK.happyTime(.8),PokiSDK.gameplayStop(),play_sound("completed",p),y="bonus",a="hint",1===Math.floor(2*Math.random())&&(a="shuffle"),"hint"===a?player_data.hint_left++:"shuffle"===a&&player_data.shuffle_left++,p.add.rectangle(0,0,screenWidth,screenHeight,0).setOrigin(0).setAlpha(.8).setDepth(200),p.add.text(screenWidth/2,screenHeight*0.31,"COMPLETED",{fontFamily:"PoetsenOne",fontSize:Math.floor(45*uiScale),align:"center",color:"#FFFFFF"}).setOrigin(.5).setDepth(201),p.add.sprite(screenWidth/2,screenHeight*0.43,a+"_icon").setScale(0.7 * uiScale).setDepth(201),p.add.text(screenWidth/2,screenHeight*0.55,"+1",{fontFamily:"PoetsenOne",fontSize:Math.floor(52*uiScale),align:"center",color:"#FFFFFF"}).setOrigin(.5).setDepth(201),(function(){var btn=draw_button(screenWidth/2,screenHeight*0.67,"next",p);btn.setScale(0.7 * uiScale);btn.depth=201;return btn})(),last_array=null,player_data.drop_mode++,l=null,W()):0<player_data.shuffle_left?(C.setVisible(!0),play_sound("nomatch",p)):(y="gameover1",setTimeout(S,1E3))}W()},100);T()},300)):(removeSelectionEffect(q),clearSelectionOverlays(),q=f,addSelectionEffect(f,p),D.setPosition(f.x,f.y)):(removeSelectionEffect(q),clearSelectionOverlays(),q=f,addSelectionEffect(f,p),D.setPosition(f.x,f.y)))):"play"===y&&(play_sound("itemclick",p),q=f,clearSelectionOverlays(),addSelectionEffect(f,p),D.setVisible(!0),D.setPosition(f.x,f.y))}},this);x()||last_array||this.scene.start("game")};

// 场景销毁时清理覆盖层
Game.prototype.destroy = function() {
    clearSelectionOverlays();
    Phaser.Scene.prototype.destroy.call(this);
};

// 选中效果覆盖层管理
var selectedOverlays = [];

function createSelectionOverlay(x, y, width, height, scene) {
    // 创建半透明的青绿色覆盖层
    var overlay = scene.add.rectangle(x, y, width, height, 0x4fdbc6);
    overlay.setAlpha(0.4); // 半透明效果
    overlay.setDepth(99); // 确保在emoji之上，但在UI元素之下
    console.log("Created selection overlay at", x, y, "with size", width, height);
    return overlay;
}

function clearSelectionOverlays() {
    // 清除所有选中覆盖层
    selectedOverlays.forEach(function(overlay) {
        if (overlay && overlay.destroy) {
            overlay.destroy();
        }
    });
    selectedOverlays = [];
}

function addSelectionEffect(emoji, scene) {
    if (isMobileDevice) {
        // 移动端使用覆盖层
        console.log("Mobile device detected - using overlay for selection effect");
        var overlay = createSelectionOverlay(emoji.x, emoji.y, emoji.displayWidth, emoji.displayHeight, scene);
        selectedOverlays.push(overlay);
    } else {
        // 桌面端使用setTint
        console.log("Desktop device detected - using setTint for selection effect");
        emoji.setTint(5233606);
    }
}

function removeSelectionEffect(emoji) {
    if (!isMobileDevice && emoji && emoji.clearTint) {
        // 桌面端清除tint
        emoji.clearTint();
    }
    // 移动端的覆盖层会通过clearSelectionOverlays统一清除
}

function play_sound(a,h){
    // 企业微信兼容性：简化音效播放逻辑，避免复杂操作
    try {
        if(game_data.sound && !ad_show && h && h.sound) {
            h.sound.play(a);
        }
    } catch(e) {
        // 静默处理音效错误，确保游戏不被中断
    }
}function switch_audio(a){game_data[a.name]?(game_data[a.name]=!1,a.setTexture("btn_sound_off")):(game_data[a.name]=!0,a.setTexture("btn_sound_on"))}function check_audio(a){game_data[a.name]?a.setTexture("btn_sound_on"):a.setTexture("btn_sound_off")}function draw_button(a,h,g,v){a=v.add.sprite(a,h,"btn_"+g).setInteractive();a.button=!0;a.name=g;return a}

// 检测设备类型，为桌面端设置固定竖屏尺寸
var isDesktop = window.innerWidth >= 1025;
var gameWidth = isDesktop ? 450 : window.innerWidth;
var gameHeight = isDesktop ? 800 : window.innerHeight;

// 检测移动端设备
var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

var config={
    type: isWeWorkApp ? Phaser.CANVAS : Phaser.AUTO, // 企业微信使用Canvas渲染，更稳定
    scale:{
        mode: isDesktop ? Phaser.Scale.FIT : Phaser.Scale.RESIZE,
        parent:"game_content",
        autoCenter:Phaser.Scale.CENTER_BOTH,
        width: gameWidth,
        height: gameHeight,
        min: {
            width: 320,
            height: 480
        }
    },
    // 企业微信优化配置
    disableContextMenu: true,
    backgroundColor: '#30a8ff',
    render: {
        antialias: !isWeWorkApp && !isMobileDevice, // 移动端和企业微信都禁用抗锯齿
        transparent: false,
        clearBeforeRender: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false
    },
    scene:[Boot,Load,Menu,Game]
},game;PokiSDK.init().then(function(){console.log("Poki SDK successfully initialized");game=new Phaser.Game(config)}).catch(function(){console.log("Initialized, but the user likely has adblock");game=new Phaser.Game(config)});PokiSDK.setDebug(!1); 