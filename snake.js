
// pen = canvas.getContext('2d');
// pen.fillStyle = "red";

// pen.fillRect(20, 20, 60 , 60);


function init(){
    canvas = document.getElementById('mycanvas');
    start = document.getElementById("start");
    s = document.getElementById("score");
    elm = document.getElementById("border");
    btn = document.getElementById("tital");
    wi = canvas.width = 1000;
    hi = canvas.height = 1000;
    cs = 67;
    pen = canvas.getContext('2d');
    border = "green";
    rem = Math.floor(Math.random()*3);
    score = 0;
    game_over = false;



    food = randomFood();
    
    snake = {
        init_len: 1,
        cell :[],
        direction : "nun",
        color :"blue",

        createSnake : function(){
            for(let i=this.init_len; i>0; i--){
                this.cell.push({x:i, y:0});
            }
        },

        drawSnake : function(){
            pen.fillStyle = this.color;
            for(let i=0; i<this.cell.length; i++){
                pen.fillRect(this.cell[i].x*cs, this.cell[i].y*cs, cs-2, cs-2);
            }
        },

        updateSnake : function(){
            // have to check snake has eaten food and if 
            // -> increase length of snake
            // ->create new food
            
            let headx = this.cell[0].x;
            let heady = this.cell[0].y;
            let new_x, new_y;
            if(snake.direction=="right"){
                new_x = headx+1;
                new_y = heady;
            }else if(snake.direction=="left"){
                new_x = headx-1;
                new_y = heady;
            }else if(snake.direction=="down"){
                new_x = headx;
                new_y = heady+1;
            }else if(snake.direction=="up"){
                new_x = headx;
                new_y = heady-1;
            }else{
                new_x = headx;
                new_y = heady;
            }
            

            if(border=="green"){
                if(new_x>14){
                    new_x= 0;
                }else if(new_x<0){
                    new_x = 14;
                }
    
                if(new_y<0){
                    new_y = 14;
                }else if(new_y>14){
                    new_y = 0;
                }
                canvas.style.border.color = "15px solid green";
            }else{
                if(new_x>14 || new_x<0 || new_y<0 || new_y>14){
                    game_over= true;
                    btn.innerHTML = "Game Over";
                }
                canvas.style.border = "15px solid brown";
            }

            // food eaten or not
            if(new_x == food.x && new_y== food.y ){
                food = randomFood();
                while(this.cell.indexOf({x : food.x, y : food.y})!=-1){
                    food = randomFood();
                }
                rem = Math.floor(Math.random()*3);
                score++;
                s.innerHTML = score;
            }else{
                this.cell.pop();
            }
            
            this.cell.unshift({x : new_x, y: new_y});
        }
    }

    snake.createSnake();

    function keypress(k){
        start.innerHTML = "Reload to start again";
        if(k.key=="ArrowRight" || k.key=="d"){
            if(snake.direction!="left")
                snake.direction = "right";
        }else if(k.key=="ArrowLeft" || k.key=="a"){
            if(snake.direction!="right")
                snake.direction = "left";
        }else if(k.key=="ArrowDown" || k.key=="s"){
            if(snake.direction!="up")
                snake.direction = "down";
        }else if(k.key=="ArrowUp" || k.key=="w"){
            if(snake.direction!="down")
            snake.direction = "up";
        }else if(snake.direction=="nun"){
            snake.direction = "right";
        }
    }
    

    function randomFood(){
        foodx = Math.round(Math.random()*(wi-2*cs)/cs);
        foody = Math.round(Math.random()*(hi-2*cs)/cs);

        food = {
            x : foodx,
            y : foody,
            // color : "red",
        }

        return food;
    }


    document.addEventListener('keydown', keypress);


}

function draw(){
    pen.clearRect(0, 0, wi, hi);
    snake.drawSnake();
    // pen.fillStyle = food.color;
    fimage = new Image();
    
    extra = 30;
    if(rem==1){
        fimage.src = "asserts/food1.png";
    }else{
        extra = 20;
        fimage.src = "asserts/food2.png";
    }
    pen.drawImage(fimage,food.x*cs, food.y*cs, cs + extra, cs + extra);  
    
    if(elm.checked){
        border = "green";
    }else{
        border = "brown";
    }
    

}

function update(){
    //erase previous screen
    
    snake.updateSnake();
}

function gameloop(){

    if(game_over){
        clearInterval(loop);
    }

    draw();
    update();
}

init();
gameloop();

loop = setInterval(gameloop, 100);
// draw();
