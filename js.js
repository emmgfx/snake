const DIRECTION_UP      = 0;
const DIRECTION_RIGHT   = 1;
const DIRECTION_DOWN    = 2;
const DIRECTION_LEFT    = 3;

$(function(){

    var cookies = Array();

    var snake = {
        drawsCount: 0,
        length: 1,
        currentDirection: DIRECTION_RIGHT,
        speed: 000,
        position: Array(),
        setStartPosition: function(){
            snake.position.push([10, 10],[11, 10],[12, 10],[13, 10],[14, 10]);
        },
        draw: function(){
            this.drawsCount++;
            console.log('Drawing snake... ~~~ ' + this.drawsCount + ' draws');

            $('.snake-col:not(.cookie)').removeClass('on');
            for(i = 0; i < this.position.length; i++){
                $('.snake-col[x='+this.position[i][0]+'][y='+this.position[i][1]+']').addClass('on');
            }
        },
        setSpeed: function(speed){
            if(speed < 1000 && speed > 0){
                this.speed = speed;
                console.log('Speed set to ' + speed);
            }else{
                console.log('Speed ' + speed + ' not valid');
            }
            timer.set_interval((1000 - this.speed));
        },
        updatePosition: function(increase){

            var lastPoint = this.position.slice(-1).pop();
            // Why I can't do newPoint = lastPoint?
            // newPoint keeps as a reference of lastPoint and when I modify
            // one, the other is modified too.
            var newPoint = [lastPoint[0], lastPoint[1]];

            switch(this.currentDirection){
                case DIRECTION_UP:
                    newPoint[1]--; // Y
                    break;
                case DIRECTION_RIGHT:
                    newPoint[0]++; // X
                    break;
                case DIRECTION_DOWN:
                    newPoint[1]++; // Y
                    break;
                case DIRECTION_LEFT:
                    newPoint[0]--; // X
                    break;
            }

            console.log('Cookies: ' + JSON.stringify(cookies));
            var checkCookie = Cookie.checkCoords(newPoint);
            if(checkCookie !== null){
                increase = true;
                cookies[checkCookie].remove();
                cookies.splice(checkCookie, 1);
                cookies.push(new Cookie);
            }

            if(this.drawsCount % 5 === 0)
                increase = true;

            if(!increase)
                this.position.shift();

            this.position.push(newPoint);
            this.draw();
            $('.score > span').text(this.position.length);
        }

    };

    class Cookie{
        constructor() {
            var countRows = $('.snake-row').length;
            var countCols = $('.snake-row').first().find('.snake-col').length;

            var randomPosition = [
                (0 + Math.floor(Math.random() * countCols)),
                (0 + Math.floor(Math.random() * countRows))
            ];

            this.position = randomPosition;
            console.log("New cookie at " + JSON.stringify(this.position));
            this.draw();
        }
        draw(){
            $('.snake-col[x='+this.position[0]+'][y='+this.position[1]+']').addClass('cookie');
        }
        remove(){
            $('.snake-col[x='+this.position[0]+'][y='+this.position[1]+']').removeClass('cookie');
        }

        static checkCoords(coords){
            var ret = null;
            for(i = 0; i < cookies.length; i++){
                if(
                    cookies[i].position[0] == coords[0] &&
                    cookies[i].position[1] == coords[1]
                ){
                    ret = i;
                }
            }
            return ret;
        }
    }

    $(document).keydown(function(e){
        if (e.keyCode == 38){
            snake.currentDirection = DIRECTION_UP;
        }else if (e.keyCode == 39){
            snake.currentDirection = DIRECTION_RIGHT;
        }else if (e.keyCode == 40){
            snake.currentDirection = DIRECTION_DOWN;
        }else if (e.keyCode == 37){
            snake.currentDirection = DIRECTION_LEFT;
        }
        snake.updatePosition();
    });

    cookies.push(new Cookie, new Cookie, new Cookie, new Cookie);

    snake.setStartPosition();
    snake.draw(true);
    // Using the Atticweb response @ http://stackoverflow.com/a/31140418/1378408

    var timer = {
        running: false,
        iv: 5000,
        timeout: false,
        cb : function(){},
        start : function(cb,iv){
            var elm = this;
            clearInterval(this.timeout);
            this.running = true;
            if(cb) this.cb = cb;
            if(iv) this.iv = iv;
            this.timeout = setTimeout(function(){elm.execute(elm)}, this.iv);
        },
        execute : function(e){
            if(!e.running) return false;
            e.cb();
            e.start();
        },
        stop : function(){
            this.running = false;
        },
        set_interval : function(iv){
            clearInterval(this.timeout);
            this.start(false, iv);
        }
    };

    timer.start(function(){
        snake.updatePosition();
    }, (1000 - snake.speed));

});
