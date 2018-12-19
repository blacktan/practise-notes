/**
 * Created by zhengwei on 2017/7/17.
 */


var chart = function () {
    //随机颜色
    function randomColor(num) {
        var colorArr = ["#00FF21", "#FFAA00", "#00AABB", "#FF4400", '#cf8888', '#ffe543', '#fecf45', '#b8f1ed', '#b7d28d', '#e27386', '#d9b8f1', '#dcff93', '#d9b8f1', '#e1622f', '#c38e9e', '#708090'];

        var outColor = [];//输出个数
        while (outColor.length < num) {
            var temp = (Math.random() * colorArr.length) >> 0;
            outColor.push(colorArr.splice(temp, 1));
        }
        return outColor;
    }

    //绘制饼图
    function _drawPieChart(id, data) {
        var canvas = document.getElementById(id);
        var ctx = canvas.getContext('2d');
        var colorArr = randomColor(data.length);

        //变量配置
        var radius = canvas.height / 2 - 20; //半径
        var ox = radius + 20, oy = radius + 20; //确定圆心
        var pWidth = 30, pHeight = 10;//图例宽高
        var posX = canvas.height + 30, posY = 30;
        var textX = posX + pWidth + 5, textY = posY + 10;
        var startAngle = 0;//开始h弧度
        var endAngle = 0;//结束弧度

        for (var i = 0; i < data.length; i++) {
            //绘制圆
            endAngle = endAngle + data[i].val * Math.PI * 2;
            ctx.fillStyle = colorArr[i];
            ctx.beginPath();
            ctx.moveTo(ox, oy);
            ctx.arc(ox, oy, radius, startAngle, endAngle, false);
            ctx.fill();

            startAngle = endAngle;//更新起点

            //绘制图例
            ctx.fillStyle = colorArr[i];
            ctx.fillRect(posX, posY + 20 * i, pWidth, pHeight);

            //绘制文字
            ctx.moveTo(posX, posY + 20 * i);
            ctx.font = '12px 微软雅黑';
            ctx.fillStyle = colorArr[i];
            var text = data[i].name + '：' + 100 * data[i].val + '%';
            ctx.fillText(text, textX, textY + 20 * i);
        }
    }

    //百分比图
    function _drawPercentChart(id, data, type) {
        var canvas = document.getElementById(id);
        var ctx = canvas.getContext('2d');
        var percent = data.percent;
        var title = data.name;

        //变量配置
        var lineWidth = 8;
        var radius = canvas.height / 2 - 30; //半径
        var ox = canvas.width / 2, oy = radius + 20;// 圆心
        var lineCap = 'round';
        var bgColor = '#708090'; //背景颜色
        var fgColor = '#68b92e';
        var fontColor = '#212121';
        var textPercent = ctx.measureText(percent + '%');//文本测量
        var textTitle = ctx.measureText(title);//文本测量

        //绘制圆
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = bgColor;
        ctx.moveTo(ox, oy);
        ctx.beginPath();
        ctx.arc(ox, oy, radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.stroke();

        //圆心绘制百分比文本
        ctx.moveTo(ox, oy);
        ctx.font = 'bold 30px 微软雅黑';
        ctx.fillStyle = fgColor;
        ctx.fillText(percent + '%', ox - textPercent.width / 2, oy);

        //底部绘制图形标题
        ctx.font = '16px 微软雅黑';
        ctx.fillText(title, ox - textTitle.width / 2, oy * 2 + 10);

        ctx.globalCompositeOperation = 'source-atop';//消除锯齿
        //绘制百分比
        if (type == 'static') {
            var endAngle = Math.PI * 2 * percent / 100 - Math.PI / 2;
            ctx.lineCap = lineCap;
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = fgColor;
            ctx.moveTo(ox, oy);
            ctx.beginPath();
            ctx.arc(ox, oy, radius, -Math.PI / 2, endAngle, false);
            ctx.stroke();
        } else {
            // 动态绘制百分比
            var num = 0;
            dynamicPercent();
        }


        //动态绘制百分比
        function dynamicPercent() {
            num++;
            var endAngle = Math.PI * 2 * num / 100 - Math.PI / 2;
            ctx.lineCap = lineCap;
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = fgColor;
            ctx.moveTo(ox, oy);
            ctx.beginPath();
            ctx.arc(ox, oy, radius, -Math.PI / 2, endAngle, false);
            ctx.stroke();
            if (num < percent) {
                setTimeout(dynamicPercent, 10);
            }
        }
    }

    //攻击链图
    function _drawAttackChainChart(id, data) {
        var cicleColor = ['rgb(102,122,179)', 'rgb(0,147,221)', 'rgb(59,179,194)', 'rgb(104,185,46)', 'rgb(248,195,0)', 'rgb(231,120,23)', 'rgb(218,37,29)'];

        var canvas = document.getElementById(id);
        var ctx = canvas.getContext('2d');

        //定义变量
        var dataNum = data.length;
        var lineWidth = canvas.width - 70, lineHeight = 2;
        var lineX = 35, lineY = canvas.height / 2;
        var lineColor = '#cdcdcd';//基线颜色
        var radius = 5;//圆心半径
        var distance = lineWidth / (dataNum - 1); //间距
        var dotRadius = 2;//白色原点半径
        var dotColor = '#FFF';
        var lineRatio = [0.3, 0.5]; //随机比例

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //绘制基线
        ctx.strokeStyle = lineColor;
        ctx.beginPath();
        ctx.moveTo(lineX, lineY);
        ctx.lineTo(lineWidth + lineX, lineY);
        ctx.stroke();

        //绘制数据
        var oX, oY = lineY + lineHeight / 2;
        var ratio = 0, endY = 0, randomIndex = 0, title = '', count = 0;
        for (var i = 0; i < dataNum; i++) {
            title = data[i].desc;
            count = data[i].count;

            oX = lineX + distance * i + radius;

            ctx.globalCompositeOperation = 'source-over';
            //绘制大圆
            ctx.beginPath();
            ctx.moveTo(oX, oY);
            ctx.fillStyle = cicleColor[i];
            ctx.arc(oX, oY, radius, 0, Math.PI * 2, true);
            ctx.fill();

            //绘制白色小圆
            ctx.beginPath();
            ctx.moveTo(oX, oY);
            ctx.fillStyle = dotColor;
            ctx.arc(oX, oY, dotRadius, 0, Math.PI * 2, true);
            ctx.fill();

            //绘制线条
            ctx.globalCompositeOperation = 'destination-over';
            randomIndex = Math.floor((Math.random() * lineRatio.length));
            ratio = lineRatio[randomIndex];
            endY = i % 2 == 0 ? lineY * (1 - ratio) : lineY * (1 + ratio);
            ctx.strokeStyle = cicleColor[i];
            ctx.beginPath();
            ctx.moveTo(oX, oY);
            ctx.lineTo(oX, endY);
            ctx.stroke();

            //绘制彩色小圆球
            ctx.globalCompositeOperation = 'source-over';
            ctx.beginPath();
            ctx.moveTo(oX, endY);
            ctx.fillStyle = cicleColor[i];
            ctx.arc(oX, endY, dotRadius + 1, 0, Math.PI * 2, true);
            ctx.fill();

            //绘制文本
            if (i % 2 == 0) {
                endY = i % 2 == 0 ? endY - 10 : endY + 20;
                drawText(count, oX, endY);

                endY = i % 2 == 0 ? endY - 15 : endY + 15;
                drawText(title, oX, endY);
            } else {
                endY = i % 2 == 0 ? endY - 10 : endY + 20;
                drawText(title, oX, endY);
                endY = i % 2 == 0 ? endY - 15 : endY + 15;
                drawText(count, oX, endY);
            }
        }

        function drawText(text, x, y) {
            ctx.moveTo(oX, endY);
            ctx.font = '12px 微软雅黑';
            var textConf = ctx.measureText(text);
            ctx.fillText(text, x - textConf.width / 2, y);
        }
    }

    function _drawRadiaGauge(id, data) {
        var canvas = document.getElementById(id);
        var ctx = canvas.getContext('2d');

        //配置变量
        var colors = {
            needle: '#64b432', //指针
            area: '#64b432', //面积
            areaShadow: '#64b432',//面积阴影
            shaft: '#64b432'//轴
        };

        var dialColor = 'rgb(0,147,221)';
        var dialLineCap = 'round';
        var dialLineWidth = 4;

        //彩色环配置
        var rangesConfig = [
            {min: 0, max: 2, color: '#64b432'},
            {min: 2, max: 4, color: '#55c3f0'},
            {min: 4, max: 6, color: '#f0c819'},
            {min: 6, max: 8, color: '#f08200'},
            {min: 8, max: 10, color: '#c31e11'}
        ];

        var angleSetting = [
            Math.PI * 5 / 6,
            Math.PI * 7 / 6,
            Math.PI * 8 / 6,
            Math.PI * 10 / 6,
            Math.PI * 1 / 6
        ];

        var intervalAngle = Math.PI * 4 / 15;
        var startAngle = Math.PI * 5 / 6;
        var endAngle = Math.PI * 1 / 6;
        var angleConfig = [
            {start: startAngle, end: startAngle + intervalAngle},
            {start: startAngle + intervalAngle, end: startAngle + intervalAngle * 2},
            {start: startAngle + intervalAngle * 2, end: startAngle + intervalAngle * 3},
            {start: startAngle + intervalAngle * 3, end: startAngle + intervalAngle * 4},
            {start: startAngle + intervalAngle * 4, end: endAngle},
        ];

        var trackWith = 2, // 轨迹的宽度
            height = 200, //图像高度
            width = height / 0.75, //图形宽度
            innerRadius = Math.round((width * 32.25) / 100),
            outterRadius = Math.round((width * 48.0) / 100),
            whiteAreaWith = 5, // 彩色环的宽度
            trackWith = 2, // 轨迹的宽度
            section = 5,//分成5个大的刻度
            majorGraduationLenght = Math.round((width * 4.5) / 100), // 主要刻度的长度
            minorGraduationLenght = Math.round((width * 3) / 100), // 次要刻度的长度
            centerX = canvas.width / 2,
            centerY = canvas.height / 2 + (canvas.height - height) / 2;


        ctx.translate(centerX, centerY);//移动位置

        //画彩色环
        ctx.save();
        ctx.lineWidth = whiteAreaWith;
        for (var i = 0; i < section; i++) {
            var start = angleConfig[i].start;
            var end = angleConfig[i].end;

            //画外层的彩色圆环
            ctx.strokeStyle = rangesConfig[i].color;
            ctx.moveTo(centerX, centerY);
            ctx.beginPath();
            ctx.arc(0, 0, outterRadius, start, end, false);
            ctx.stroke();
        }
        ctx.restore();

        //画长的刻度
        ctx.save();
        ctx.rotate(Math.PI * 5 / 6);
        ctx.strokeStyle = dialColor;
        ctx.lineCap = dialLineCap;
        ctx.lineWidth = dialLineWidth;
        var targetX = outterRadius - whiteAreaWith / 2 - 4;
        for (var i = 0; i < section + 1; i++) {
            ctx.beginPath();
            ctx.moveTo(targetX, 0);
            ctx.lineTo(targetX - majorGraduationLenght, 0);
            ctx.stroke();

            //画文字
            ctx.font = '14px 微软雅黑';
            if (i < section) {
                ctx.fillText(rangesConfig[i].min, targetX - majorGraduationLenght - 20, 0);
            }
            ctx.rotate(Math.PI * 4 / 15);
            if (i == section - 1) {
                ctx.fillText(rangesConfig[i].max, targetX - majorGraduationLenght - 20, 0);
            }
        }
        ctx.restore();

        //画短刻度
        ctx.save();
        ctx.rotate(Math.PI * 5 / 6);
        ctx.strokeStyle = dialColor;
        ctx.lineCap = dialLineCap;
        ctx.lineWidth = dialLineWidth - 1;
        var targetX = outterRadius - whiteAreaWith / 2;
        for (var i = 0; i < section * 2; i++) {
            if (i % 2 !== 0) {
                ctx.beginPath();
                ctx.moveTo(targetX - 4, 0);
                ctx.lineTo(targetX - majorGraduationLenght, 0);
                ctx.stroke();
            }
            ctx.rotate(Math.PI * 2 / 15);
        }
        ctx.restore();
    }

    //芝麻信用
    function _drawSesameCredit(id, data) {
        var canvas = document.getElementById(id);
        var ctx = canvas.getContext('2d');

        var bgColor = '#1290f4';//背景颜色，蓝
        var whiteColor = '#91cef9';
        var scaleBgColor = '#5cb7f7';
        var scaleColor = '#ccc';
        var RADIUS = 180;//最外半径
        var canvasW = canvas.width;
        var canvasH = canvas.height;
        var startAngle = Math.PI * 2 * 7 / 16;//开始弧度
        var endAngle = Math.PI * 2 * 1 / 16;//结束弧度
        var blankMargin = 15;


        //清空画布 & 准备背景
        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvasW, canvasH);

        ctx.save();//保存状态
        ctx.translate(blankMargin, blankMargin);//坐标原点移动，留出边界值，让可能出现在最外层的信息能显示

        //1、画最外层的圈，白色
        ctx.beginPath();
        ctx.fillStyle = whiteColor;
        ctx.arc(RADIUS, RADIUS, RADIUS, startAngle, endAngle, false);
        ctx.lineTo(RADIUS, RADIUS);//设置结束点，形成有角度的圆弧
        ctx.fill();

        // 2.白色圈中画最第二层圈.背景色。 外层圆环完成。
        ctx.beginPath();
        ctx.fillStyle = bgColor;
        ctx.arc(RADIUS, RADIUS, RADIUS - 5, 0, Math.PI * 2, false);
        ctx.lineTo(RADIUS, RADIUS);
        ctx.fill();

        // 3.白色圈。
        ctx.beginPath();
        ctx.fillStyle = scaleBgColor;
        ctx.arc(RADIUS, RADIUS, RADIUS - 20, startAngle, endAngle, false);
        ctx.lineTo(RADIUS, RADIUS);
        ctx.fill();

        //4.通过旋转方式绘制圆中的分割线，外层小刻度（主要是把原点放到圆心位置去。）
        ctx.save();	//保存状态
        ctx.strokeStyle = scaleColor;
        ctx.translate(RADIUS, RADIUS);//移动圆心

        //radians=(Math.PI/180)*degrees
        ctx.rotate(Math.PI / 180 * 22.5);
        ctx.rotate(Math.PI / 180 * 45);
        ctx.lineWidth = 0.5;
        for (var i = 0; i < 28; i++) {
            ctx.rotate(Math.PI / 180 * 7.5);//圆弧从开始位置，到结束位置，共计225°。分三十份，每份7.5°
            ctx.beginPath();
            ctx.moveTo(0, 0);//起点
            ctx.lineTo(0, RADIUS - 20);
            ctx.stroke();
        }
        ctx.restore();

        //5、画一个小一点的白色圆
        ctx.save();	//保存状态
        ctx.beginPath();
        ctx.fillStyle = scaleBgColor;
        ctx.arc(RADIUS, RADIUS, RADIUS - 28, startAngle, endAngle, false);
        ctx.lineTo(RADIUS, RADIUS);
        ctx.fill();

        //6、画大的刻度
        ctx.strokeStyle = scaleColor;
        ctx.translate(RADIUS, RADIUS);//移动圆心
        ctx.rotate(Math.PI / 180 * 22.5);
        ctx.rotate(Math.PI / 180 * 45);
        ctx.lineWidth = 1;
        for (var i = 0; i < 4; i++) {
            ctx.rotate(Math.PI / 180 * 45);//圆弧从开始位置，到结束位置，共计225°。分5份，每份45°
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, RADIUS - 20);
            ctx.stroke();
        }
        ctx.restore();

        //7、内层背景色圆
        ctx.beginPath();
        ctx.fillStyle = bgColor;
        ctx.arc(RADIUS, RADIUS, RADIUS - 35, 0, Math.PI * 2, false);
        ctx.lineTo(RADIUS, RADIUS);
        ctx.fill();
        ctx.restore();

        //  changeCir(-22.5, 157.5, 700, 1500);
    }

    function changeCir(start, end, number, time) {
        var cirDom = $('#cir-wrap')[0];
        cirDom.style.transition = time + 'ms';
        cirDom.style.transform = 'rotate(' + end + 'deg)';

        var numberDom = $('#number')[0];
        var numberGap = number - 350;
        var timer;

        var timeArr = [];
        var callBack = function () {
            var num = numberDom.innerText;

            if (num < number) {
                numberDom.innerText = parseInt(numberDom.innerText) + 1;
                timeArr.pop();
            }
        }

        for (var i = 0; i < numberGap; i++) {
            (function (i) {
                timer = setTimeout(callBack, i * time / numberGap);
                timeArr.push(timer);
            })(i);
        }
    }

    function _drawRadiaGauge2(id, data) {
        var canvas = document.getElementById(id);
        var ctx = canvas.getContext('2d');


        var bgColor = '#28282c';
        var rangesConfig = ['#64b432', '#55c3f0', '#f0c819', '#f08200', '#c31e11'];//彩色环配置
        var canvasW = canvas.width;
        var canvasH = canvas.height;
        var intervalAngle = Math.PI * 2 / 8;//间隔弧度
        var startAngle = Math.PI * 2 * 7 / 16;//开始弧度
        var endAngle = Math.PI * 2 * 1 / 16;//结束弧度
        var blankMargin = 45;//画布边界值
        var RADIUS = 150;//最外半径
        var lineWidth = 5;
        var scaleColor = '#f2f2f2';
        var shadowColor = 'rgba(250,250,50,1)'; //颜色


        //清空画布
        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.fillStyle = bgColor;
        ctx.rect(0, 0, canvasW, canvasH);
        ctx.fill();

        ctx.translate(blankMargin, blankMargin);//坐标原点移动，留出边界值

        //1.通过旋转的方式,画彩色圆环
        ctx.save();//保存状态
        ctx.lineWidth = lineWidth;
        ctx.translate(RADIUS, RADIUS);
        for (var i = 0; i < 5; i++) {
            endAngle = i != 4 ? startAngle + intervalAngle : Math.PI * 2 * 1 / 16;

            ctx.strokeStyle = rangesConfig[i];
            ctx.beginPath();
            ctx.moveTo(RADIUS, RADIUS);
            ctx.beginPath();
            ctx.arc(0, 0, RADIUS, startAngle, endAngle, false);
            ctx.stroke();
            startAngle = i != 4 ? endAngle : Math.PI * 2 * 7 / 16;//开始弧度;
        }
        ctx.restore();


        //2.画大刻度
        ctx.save();	//保存状态
        ctx.strokeStyle = scaleColor;
        ctx.translate(RADIUS, RADIUS);
        ctx.lineWidth = 3;
        ctx.rotate(endAngle);
        for (var i = 0; i < 6; i++) {
            ctx.rotate(Math.PI / 180 * 45);//圆弧从开始位置，到结束位置，共计225°。分5份，每份45°
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, RADIUS - 5);
            ctx.stroke();
        }
        ctx.restore();

        //3、画小刻度
        ctx.save();	//保存状态
        ctx.strokeStyle = scaleColor;
        ctx.translate(RADIUS, RADIUS);
        ctx.rotate(endAngle);
        ctx.rotate(endAngle);
        ctx.lineWidth = 1.5;
        for (var i = 0; i < 5; i++) {
            ctx.rotate(Math.PI / 180 * 45);//圆弧从开始位置，到结束位置，共计225°。分5份，每份45°
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, RADIUS - 5);
            ctx.stroke();
        }
        ctx.restore();

        //4.内层背景色圆
        ctx.beginPath();
        ctx.fillStyle = bgColor;
        ctx.arc(RADIUS, RADIUS, RADIUS - 15, 0, Math.PI * 2, false);
        ctx.fill();
    }

    //圆形扩散
    function _drawCircleSpread(id) {
        var canvas = document.getElementById(id);
        var ctx = canvas.getContext('2d');

        var width = 300;
        var height = 150;
        var radius = 0;

        var backCanvas = document.createElement('canvas');
        var backCtx = backCanvas.getContext('2d');
        backCanvas.width = width;
        backCanvas.height = height;

        ctx.globalAlpha = 0.95;
        backCtx.globalCompositeOperation = 'copy';

        var drawCircle = function (x, y, color) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = color;
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.stroke();
            radius += 0.5;

            if (radius > 30) {
                radius = 0;
            }
        }


        var render = function (x, y, color) {
            //1.先将主canvas的图像缓存到临时canvas中
            backCtx.drawImage(canvas, 0, 0, width, height);

            //2.清除主canvas上的图像
            ctx.clearRect(0, 0, width, height);

            //3.在主canvas上画新圆
            drawCircle(x, y, color);

            //4.等新圆画完后，再把临时canvas的图像绘制回主canvas中
            ctx.drawImage(backCanvas, 0, 0, width, height);
        };

        setInterval(function () {
            var config = [
                {x: 30, y: 55, color: 'rgba(250, 250, 50, 1)'},
                {x: 150, y: 75, color: 'rgba(250, 150, 50, 1)'},
                {x: 260, y: 120, color: '#64b432'},
                {x: 270, y: 30, color: 'rgba(250, 150, 150, 1)'}
            ];
            for (var i = 0; i < config.length; i++) {
                render(config[i].x, config[i].y, config[i].color);
            }
        }, 75);
    }

    return {
        drawPieChart: function (id, data) {
            _drawPieChart(id, data)
        },
        drawPercentChart: function (id, data, type) {
            _drawPercentChart(id, data, type);
        },
        drawAttackChainChart: function (id, data) {
            _drawAttackChainChart(id, data);
        },
        drawRadiaGauge: function (id, data) {
            _drawRadiaGauge(id, data);
        },
        drawRadiaGauge2: function (id, data) {
            _drawRadiaGauge2(id, data);
        },
        drawSesameCredit: function (id, data) {
            _drawSesameCredit(id, data);
        },
        drawCircleSpread: function (id) {
            _drawCircleSpread(id);
        }

    }
};