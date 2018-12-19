/**
 * Created by zhengwei on 2017/7/5.
 */
var canvasUniverse = function () {
    var canvas;

    function _initCanvas(id) {
        canvas = document.getElementById(id);
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            return ctx;
        }
    }

    //叠加的长方形
    function _overlay(ctx) {
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(10, 10, 100, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(30, 30, 100, 50);
    }

    //绘制矩形
    function _drawRect(ctx) {
        ctx.fillRect(25, 25, 100, 100);
        ctx.clearRect(45, 45, 60, 60);
        ctx.strokeRect(50, 50, 50, 50);
    }

    //绘制三角形
    function _drawTriangle(ctx) {
        ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        ctx.closePath();
        ctx.fill();
    }

    //笑脸
    function _smilingFace(ctx) {
        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制原型
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false);   // 口(顺时针)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // 左眼
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // 右眼

        ctx.stroke();
    }

    //填充三角形和描边三角形
    function _fillAndStrokeTriangle(ctx) {
        ctx.beginPath();
        ctx.moveTo(25, 25);
        ctx.lineTo(105, 25);
        ctx.lineTo(25, 105);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.lineTo(120, 40);
        ctx.lineTo(40, 120);
        ctx.closePath();
        ctx.stroke();
    }

    //不同形状的圆弧
    function _differentShapesArc(ctx) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                var x = 25 + (j * 50);
                var y = 25 + (i * 50);
                var radius = 20;
                var startAngle = 0;
                var endAngle = Math.PI + (Math.PI * j) / 2; // 结束点;
                var anticlockwise = i % 2 == 0 ? true : false; // 顺时针或逆时针

                ctx.beginPath();
                ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise); // 绘制原型
                ctx.closePath();
                if (i > 1) {
                    ctx.fill();
                } else {
                    ctx.stroke();
                }
            }
        }
    }

    // 二次贝尔赛曲线
    function _quadraticBezier(ctx) {
        ctx.beginPath();
        ctx.moveTo(75, 25);
        ctx.quadraticCurveTo(25, 25, 25, 62.5); //左上角
        ctx.quadraticCurveTo(25, 100, 50, 100);//左下角
        ctx.quadraticCurveTo(50, 120, 30, 125);//左下角
        ctx.quadraticCurveTo(60, 120, 65, 100);
        ctx.quadraticCurveTo(125, 100, 125, 62.5);//右下角
        ctx.quadraticCurveTo(125, 25, 75, 25);//右上角
        ctx.stroke();
    }

    function _path2d(ctx) {
        var rectangle = new Path2D();
        rectangle.rect(10, 10, 50, 50);

        var circle = new Path2D();
        circle.moveTo(125, 35);
        circle.arc(100, 35, 25, 0, Math.PI * 2);

        ctx.fill(rectangle);
        ctx.stroke(circle);
    }

    //调色板
    function _palette(ctx) {
        for (var i = 0; i < 11; i++) {
            for (var j = 0; j < 11; j++) {
                ctx.fillStyle = 'rgb(' + Math.floor(255 - 25.5 * i) + ',' + Math.floor(255 - 25.5 * j) + ',0)';
                ctx.fillRect(j * 20, i * 20, 20, 20);
            }
        }
    }

    function _littleCircle(ctx) {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                ctx.strokeStyle = 'rgb(' + Math.floor(255 - 25.5 * i) + ',' + Math.floor(255 - 25.5 * j) + ',0)';
                ctx.beginPath();
                ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, 2 * Math.PI, true);
                ctx.closePath();
                ctx.stroke();
            }
        }
    }

    //四色格子
    function _fourColorGrids(ctx) {
        // 画背景
        ctx.fillStyle = '#b7d28d';
        ctx.fillRect(0, 0, 75, 75);
        ctx.fillStyle = '#cf8888';
        ctx.fillRect(75, 0, 75, 75);
        ctx.fillStyle = '#d9b8f1';
        ctx.fillRect(0, 75, 75, 75);
        ctx.fillStyle = '#f3d64e';
        ctx.fillRect(75, 75, 75, 75);

        ctx.fillStyle = '#FFF';
        // 设置透明度值
        ctx.globalAlpha = 0.2;

        for (var i = 0; i < 7; i++) {
            ctx.beginPath();
            ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }

    function _lineWidth(ctx) {
        for (var i = 0; i < 10; i++) {
            ctx.lineWidth = i * 1;
            ctx.beginPath();
            ctx.moveTo(5 + i * 14, 5);
            ctx.lineTo(5 + i * 14, 140);
            ctx.stroke();
        }
    }

    function _lineCap(ctx) {
        var lineCapConfig = ['butt', 'round', 'square'];

        //创建基线
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(140, 10);
        ctx.moveTo(10, 140);
        ctx.lineTo(140, 140);
        ctx.stroke();

        //画线条
        ctx.strokeStyle = '#b7d28d';
        for (var i = 0; i < lineCapConfig.length; i++) {
            ctx.lineWidth = 15;
            ctx.lineCap = lineCapConfig[i];
            ctx.beginPath();
            ctx.moveTo(25 + i * 50, 10);
            ctx.lineTo(25 + i * 50, 140);
            ctx.stroke();
        }
    }

    //行军蚁
    function _armyAnt(ctx) {
        var offset = 0;

        function draw() {
            ctx.clearRect(0, 0, ctx.width, ctx.height);
            ctx.setLineDash([4, 2]);
            ctx.lineDashOffset = -offset;
            ctx.strokeRect(10, 10, 100, 100);
        }

        function march() {
            offset++;
            if (offset > 16) {
                offset = 0;
            }
            draw();
            setTimeout(march, 20);
        }

        march();
    }

    //线性渐变
    function _linearGradient(ctx) {
        var lineGrad = ctx.createLinearGradient(0, 0, 0, 150);
        lineGrad.addColorStop(0, '#00ABEB');
        lineGrad.addColorStop(0.5, '#FFFFFF');
        lineGrad.addColorStop(0.5, '#FFFFFF');
        lineGrad.addColorStop(1, '#26C000');

        var lineGrad2 = ctx.createLinearGradient(0, 50, 0, 100);
        lineGrad2.addColorStop(0.5, '#000000');
        lineGrad2.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = lineGrad;
        ctx.strokeStyle = lineGrad2;

        ctx.fillRect(10, 10, 130, 130);
        ctx.strokeRect(50, 50, 50, 50);
    }

    //径向渐变
    function _radialGradient(ctx) {
        //创建渐变
        var radGrad = ctx.createRadialGradient(45, 45, 10, 53, 50, 30);
        radGrad.addColorStop(0, '#A7D30c');
        radGrad.addColorStop(0.9, '#019f62');
        radGrad.addColorStop(1, 'rgba(1,159,98,0)');

        var radGrad2 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50);
        radGrad2.addColorStop(0, '#FF5F98');
        radGrad2.addColorStop(0.75, '#FF0188');
        radGrad2.addColorStop(1, 'rgba(255,1,136,0)');

        var radGrad3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);
        radGrad3.addColorStop(0, '#00C9FF');
        radGrad3.addColorStop(0.75, '#00B5E2');
        radGrad3.addColorStop(1, 'rgba(0,201,255,0)');

        var radGrad4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90);
        radGrad4.addColorStop(0, '#F4F201');
        radGrad4.addColorStop(0.8, '#E4C700');
        radGrad4.addColorStop(1, 'rgba(228,199,0,0)');


        //画图形
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, 150, 150);
        ctx.fillStyle = radGrad2;
        ctx.fillRect(0, 0, 150, 150);
        ctx.fillStyle = radGrad3;
        ctx.fillRect(0, 0, 150, 150);
        ctx.fillStyle = radGrad4;
        ctx.fillRect(0, 0, 150, 150);
    }

    //图案样式
    function _wallpaper(ctx) {
        var img = new Image();
        img.src = './img/wallpaper.png';
        img.onload = function () {
            var ptrn = ctx.createPattern(img, 'repeat');
            ctx.fillStyle = ptrn;
            ctx.fillRect(0, 0, 150, 150);
        }
    }

    //文字阴影
    function _fontShadow(ctx) {
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';

        ctx.font = '20px Times New Roman';
        ctx.fillStyle = 'black';
        ctx.fillText('Sample String', 5, 30);
    }

    //填充规则
    function _fillRule(ctx) {
        ctx.beginPath();
        ctx.arc(50, 50, 30, 0, 2 * Math.PI, true);
        ctx.arc(50, 50, 10, 0, 2 * Math.PI, true);
        ctx.fill('evenodd');
    }

    //绘制文本
    function _drawText(ctx) {
        ctx.font = "25px serif";
        ctx.fillText('Hello World', 10, 50);
        ctx.strokeText("Hello world", 10, 100);
    }

    //状态的保存和恢复
    function _saveAndRestore(ctx) {
        ctx.fillRect(0, 0, 150, 150);
        ctx.save();

        ctx.fillStyle = '#09f';
        ctx.fillRect(15, 15, 120, 120);

        ctx.save();
        ctx.fillStyle = '#FFF';
        ctx.globalAlpha = 0.5;
        ctx.fillRect(30, 30, 90, 90);

        ctx.restore();
        ctx.fillRect(45, 45, 60, 60);

        ctx.restore();
        ctx.fillRect(60, 60, 30, 30);
    }

    //万花筒
    function _drawSpirograph(ctx) {
        ctx.fillRect(0, 0, 150, 150);
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                ctx.save();
                ctx.strokeStyle = "#9CFF00";
                ctx.translate(25 + j * 50, 25 + i * 50);
                drawSpirograph(ctx, 20 * (j + 2) / (j + 1), -8 * (i + 3) / (i + 1), 10);
                ctx.restore();
            }
        }

        function drawSpirograph(ctx, R, r, O) {
            var x1 = R - O;
            var y1 = 0;
            var i = 1;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            do {
                if (i > 20000) break;
                var x2 = (R + r) * Math.cos(i * Math.PI / 72) - (r + O) * Math.cos(((R + r) / r) * (i * Math.PI / 72))
                var y2 = (R + r) * Math.sin(i * Math.PI / 72) - (r + O) * Math.sin(((R + r) / r) * (i * Math.PI / 72))
                ctx.lineTo(x2, y2);
                x1 = x2;
                y1 = y2;
                i++;
            } while (x2 != R - O && y2 != 0);
            ctx.stroke();
        }
    }

    function _rotate(ctx) {
        ctx.translate(75, 75);//移动原点

        for (var i = 1; i < 6; i++) { // Loop through rings (from inside to out)
            ctx.save();
            ctx.fillStyle = 'rgb(' + (51 * i) + ',' + (255 - 51 * i) + ',255)';

            for (var j = 0; j < i * 6; j++) { // draw individual dots
                ctx.rotate(Math.PI * 2 / (i * 6));
                ctx.beginPath();
                ctx.arc(0, i * 12.5, 5, 0, Math.PI * 2, true);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    //裁切路径
    function _clippingPath(ctx) {
        ctx.fillRect(0, 0, 150, 150);
        ctx.translate(75, 75);

        //创建一个圆形的裁切路径
        ctx.beginPath();
        ctx.arc(0, 0, 60, 0, Math.PI * 2, true);
        ctx.clip();

        //绘制背景色
        var lingrad = ctx.createLinearGradient(0, -75, 0, 75);
        lingrad.addColorStop(0, '#232256');
        lingrad.addColorStop(1, '#143778');

        ctx.fillStyle = lingrad;
        ctx.fillRect(-75, -75, 150, 150);

        //画星星
        for (var j = 1; j < 50; j++) {
            ctx.save();
            ctx.fillStyle = '#fff';
            ctx.translate(75 - Math.floor(Math.random() * 150),
                75 - Math.floor(Math.random() * 150));
            drawStar(ctx, Math.floor(Math.random() * 4) + 2);
            ctx.restore();
        }

        function drawStar(ctx, r) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(r, 0);
            for (var i = 0; i < 9; i++) {
                ctx.rotate(Math.PI / 5);
                if (i % 2 == 0) {
                    ctx.lineTo((r / 0.525731) * 0.200811, 0);
                } else {
                    ctx.lineTo(r, 0);
                }
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    //画一个时钟
    function _drawClock(ctx) {
        var now = new Date();

        ctx.save();
        ctx.clearRect(0, 0, 150, 150);//清空画布
        ctx.translate(75, 75);//移动位置
        ctx.scale(0.5, 0.5);
        ctx.rotate(-Math.PI / 2);//
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";

        //小时刻度
        ctx.save();
        for (var i = 0; i < 12; i++) {
            ctx.beginPath();
            ctx.rotate(Math.PI / 6);
            ctx.moveTo(100, 0);
            ctx.lineTo(120, 0);
            ctx.stroke();
        }
        ctx.restore();

        //分钟刻度
        ctx.save();
        for (var i = 0; i < 60; i++) {
            if (i % 5 !== 0) {
                ctx.beginPath();
                ctx.moveTo(117, 0);
                ctx.lineTo(120, 0);
                ctx.stroke();
            }
            ctx.rotate(Math.PI / 30);
        }
        ctx.restore();

        var sec = now.getSeconds();
        var min = now.getMinutes();
        var hr = now.getHours();
        hr = hr >= 12 ? hr - 12 : hr;

        ctx.fillStyle = "black";

        //画时针
        ctx.save();
        ctx.lineWidth = 14;
        ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec);//时针旋转角度
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(80, 0);
        ctx.stroke();
        ctx.restore();

        //画分针
        ctx.save();
        ctx.lineWidth = 10;
        ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);//时针旋转角度
        ctx.beginPath();
        ctx.moveTo(-28, 0);
        ctx.lineTo(112, 0);
        ctx.stroke();
        ctx.restore();

        //画秒针
        ctx.save();
        ctx.rotate(sec * Math.PI / 30);
        ctx.strokeStyle = "#D40000";
        ctx.fillStyle = "#D40000";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.lineTo(83, 0);
        ctx.stroke();

        //秒针中心的小圆
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
        ctx.fill();

        //秒针末端的小圆
        ctx.beginPath();
        ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
        ctx.stroke();

        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.restore();

        //画表盘
        ctx.beginPath();
        ctx.lineWidth = 14;
        ctx.strokeStyle = '#325FA2';
        ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.restore();
    }

    function _rollingBall(id) {
        var canvas = document.getElementById(id);
        var ctx = canvas.getContext('2d');
        var raf;
        var running = false;

        var ball = {
            x: 100,
            y: 100,
            vx: 5,
            vy: 1,
            radius: 25,
            color: 'blue',
            draw: function () {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        };

        function clear() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        function draw() {
            clear();
            ball.draw();
            ball.x += ball.vx;
            ball.y += ball.vy;

            if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
                ball.vy = -ball.vy;
            }
            if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
                ball.vx = -ball.vx;
            }

            raf = window.requestAnimationFrame(draw);
        }

        canvas.addEventListener('mousemove', function (e) {
            if (!running) {
                clear();
                ball.x = e.clientX;
                ball.y = e.clientY;
                ball.draw();
            }
        });

        canvas.addEventListener('click', function (e) {
            if (!running) {
                raf = window.requestAnimationFrame(draw);
                running = true;
            }
        });

        canvas.addEventListener('mouseout', function (e) {
            window.cancelAnimationFrame(raf);
            running = false;
        });

        ball.draw();
    }

    function _pixel() {
        var img = new Image();
        img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
        img.onload = function() {
            draw(this);
        };

        function draw(img) {
            var canvas = document.getElementById('canvas-28');
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            console.log(ctx);
            img.style.display = 'none';
            var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
            var data = imageData.data;

            var invert = function() {
                for (var i = 0; i < data.length; i += 4) {
                    data[i]     = 225 - data[i];     // red
                    data[i + 1] = 225 - data[i + 1]; // green
                    data[i + 2] = 225 - data[i + 2]; // blue
                }
                ctx.putImageData(imageData, 0, 0);
            };

            var grayscale = function() {
                for (var i = 0; i < data.length; i += 4) {
                    var avg = (data[i] + data[i +1] + data[i +2]) / 3;
                    data[i]     = avg; // red
                    data[i + 1] = avg; // green
                    data[i + 2] = avg; // blue
                }
                ctx.putImageData(imageData, 0, 0);
            };

            var invertbtn = document.getElementById('invertbtn');
            invertbtn.addEventListener('click', invert);
            var grayscalebtn = document.getElementById('grayscalebtn');
            grayscalebtn.addEventListener('click', grayscale);
        }


    }

    return {
        init: function (id) {
            return _initCanvas(id);
        },
        overlayGraph: function (ctx) {
            return _overlay(ctx);
        },
        drawRect: function (ctx) {
            return _drawRect(ctx);
        },
        drawTriangle: function (ctx) {
            return _drawTriangle(ctx);
        },
        smilingFace: function (ctx) {
            return _smilingFace(ctx);
        },
        fillAndStrokeTriangle: function (ctx) {
            return _fillAndStrokeTriangle(ctx);
        },
        differentShapesArc: function (ctx) {
            return _differentShapesArc(ctx);
        },
        quadraticBezier: function (ctx) {
            return _quadraticBezier(ctx);
        },
        path2d: function (ctx) {
            return _path2d(ctx);
        },
        palette: function (ctx) {
            return _palette(ctx);
        },
        littleCircle: function (ctx) {
            return _littleCircle(ctx);
        },
        fourColorGrids: function (ctx) {
            return _fourColorGrids(ctx);
        },
        lineWidth: function (ctx) {
            return _lineWidth(ctx);
        },
        lineCap: function (ctx) {
            return _lineCap(ctx);
        },
        armyAnt: function (ctx) {
            return _armyAnt(ctx);
        },
        linearGradient: function (ctx) {
            return _linearGradient(ctx);
        },
        radialGradient: function (ctx) {
            return _radialGradient(ctx);
        },
        wallpaper: function (ctx) {
            return _wallpaper(ctx);
        },
        fontShadow: function (ctx) {
            return _fontShadow(ctx);
        },
        fillRule: function (ctx) {
            return _fillRule(ctx);
        },
        drawText: function (ctx) {
            return _drawText(ctx);
        },
        saveAndRestore: function (ctx) {
            return _saveAndRestore(ctx);
        },
        drawSpirograph: function (ctx) {
            return _drawSpirograph(ctx);
        },
        rotate: function (ctx) {
            return _rotate(ctx);
        },
        clippingPath: function (ctx) {
            return _clippingPath(ctx);
        },
        drawClock: function (ctx) {
            return _drawClock(ctx);
        },
        rollingBall: function (ctx) {
            return _rollingBall(ctx);
        },
        pixel: function (ctx) {
            return _pixel(ctx);
        }
    }
}
