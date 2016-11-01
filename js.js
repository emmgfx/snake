const DIRECTION_UP      = 0;
const DIRECTION_RIGHT   = 1;
const DIRECTION_DOWN    = 2;
const DIRECTION_LEFT    = 3;

$(function(){

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
            $('.snake-col').removeClass('on');
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

            if(this.drawsCount % 5 === 0)
                increase = true;

            if(!increase)
                this.position.shift();

            this.position.push(newPoint);
            this.draw();
        }

    };


    $(document).keydown(function(e){

        if (e.keyCode == 38){
            snake.currentDirection = DIRECTION_UP;
            console.log('press UP');
        }else if (e.keyCode == 39){
            snake.currentDirection = DIRECTION_RIGHT;
            console.log('press RIGHT');
        }else if (e.keyCode == 40){
            snake.currentDirection = DIRECTION_DOWN;
            console.log('press DOWN');
        }else if (e.keyCode == 37){
            snake.currentDirection = DIRECTION_LEFT;
            console.log('press LEFT');
        }
        snake.updatePosition();
    });

    snake.setStartPosition();
    snake.draw();

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
