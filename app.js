const menu = document.querySelector(".menu");
let username = "Anonymous";

menu.addEventListener("submit", (e) => {
    e.preventDefault();
    if(e.target[0].value.length > 0) username = e.target[0].value;
    menu.remove();
})

class Player{
    constructor(x,y, name){
        this.height = 80;
        this.width = 25;
        this.name = name;
        this.position = [x,y];
        this.vx = 2;
        this.vy = 0;
        this.setCollisionBox = function(w,h,position){
            let newCollisionBox = {tl: "", tr: "", bl: "", br: ""};
            newCollisionBox.tl = [position[0], position[1]];
            newCollisionBox.tr = [position[0] + w, position[1]];
            newCollisionBox.bl = [position[0], position[1]+h];
            newCollisionBox.br = [position[0] + w, position[1] + h];
            return newCollisionBox;
        }
        this.setSprites = function(images = []){
            let array = [];
            images.forEach((element) => {
                let img = new Image();
                img.src = element;
                array.push(img);
            })
            return array;
        };
        this.sprites = this.setSprites(["/static.svg","/move.svg"]);
        this.collisionBox = this.setCollisionBox(this.width, this.height, this.position);
    };
    drawPlayer(ctx, x,y, w, h){
        ctx.save();
        ctx.translate(x,y);
        ctx.fillStyle = "red";

        ctx.fillRect(0,0, w, h);
        // pctx.drawImage(sprite, 0,0, this.width, this.height, 0, 0, this.width, this.height);
        ctx.restore();
    };
    setNewCollisionBox(position,w,h){
        let newCollisionBox = {tl: "", tr: "", bl: "", br: ""};
        newCollisionBox.tl = [position[0], position[1]];
        newCollisionBox.tr = [position[0] + w, position[1]];
        newCollisionBox.bl = [position[0], position[1]+h];
        newCollisionBox.br = [position[0] + w, position[1] + h];
        return newCollisionBox;
    }
}

let player = new Player(30, window.innerHeight-400, username);

console.log(player)

const canvasOne = document.querySelector("#player")
canvasOne.ctx = canvasOne.getContext("2d");

canvasOne.width = window.innerWidth;
canvasOne.height = window.innerHeight;

const canvasTwo = document.querySelector("#background")
canvasTwo.ctx = canvasTwo.getContext("2d");

canvasTwo.width = window.innerWidth;
canvasTwo.height = window.innerHeight;

let animId, vx = 2, vy = 0, v;

const drawTerrain = (ctx) => {
    ctx.save();

    ctx.fillStyle = "black"
    ctx.fillRect(0,window.innerHeight, window.innerWidth, -300);
    ctx.fillRect(20, 80, player.width, 20)
    ctx.fillStyle = "brown"
    ctx.fillRect(window.innerWidth/2-50,window.innerHeight-300, 100, -300);
    ctx.fillStyle = "green";
    ctx.fillRect(window.innerWidth/2-250, window.innerHeight-600, 500, -200);



    ctx.restore();
}

drawTerrain(canvasTwo.ctx);

let pixelPlain = canvasTwo.ctx.getImageData(0, 0, window.innerWidth, window.innerHeight).data;
const canFall = (vy, w, h, pos) => {
    console.log(vy)
    let readPosition = 0, block = [0, 0 , 0, 255], match = 0;
    let x = pos[0], y = pos[1];

    for(let i = 0; i < w; i++){
        readPosition = y+i * (window.innerWidth * 4) + (x+i-1) * 4;
        for(let j = 0; j < 4; j++){
            if(pixelPlain[readPosition] == block[j]) match++;
            readPosition++;
        };
        if(match == 4){
            console.log("matched");
            if(vy == 1) return 0;
            else return canFall(Math.ceil(vy/2), w, pos);
        }
        match = 0;
    }
    return vy;
}



let speedY = 4, speedX;

animId = setInterval(() => {  

    // Setup

    canvasOne.ctx.clearRect(0,0, window.innerWidth, window.innerHeight);

    // Position manipulation

    vy = canFall(speedY, player.width, player.height, player.position);
    console.log(vy);



    player.position[1] += vy;

    console.log(player.position);

    if(vy != 0 || vx != 0) player.collisionBox = player.setNewCollisionBox(player.position, player.width, player.height)

    player.drawPlayer(canvasOne.ctx, player.position[0], player.position[1], player.width, player.height);
    if(vy == 0){

        console.log(pixelPlain);
        clearInterval(animId);
    } 
})

