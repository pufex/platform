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
        this.spawnCords = [x,y];
        this.setCords = function(w,h,spawnCords){
            let newCords = {tl: "", tr: "", bl: "", br: ""};
            newCords.tl = [spawnCords[0], spawnCords[1]];
            newCords.tr = [spawnCords[0] + w, spawnCords[1]];
            newCords.bl = [spawnCords[0], spawnCords[1]+h];
            newCords.br = [spawnCords[0] + w, spawnCords[1] + h];
            return newCords;
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
        this.hitbox = this.setCords(this.w, this.h, this.spawnCords);
    };
    drawPlayer(ctx, x,y, w, h){
        ctx.save();
        ctx.translate(x,y);
        ctx.fillStyle = "red";

        ctx.fillRect(0,0, w, h);
        // pctx.drawImage(sprite, 0,0, this.width, this.height, 0, 0, this.width, this.height);
        ctx.restore();
    }
}

let player = new Player(50,50, username);

console.log(player)

const canvasOne = document.querySelector("#player")
canvasOne.ctx = canvasOne.getContext("2d");

canvasOne.width = window.innerWidth;
canvasOne.height = window.innerHeight;

let animId, vx = 2, vy = 0, v;


const body = document.querySelector("body");

// canvasOne.ctx.fillStyle = "black"; 
// canvasOne.ctx.fillRect(0,0, canvasOne.width, canvasOne.height);

const canFall = (ctx, vx, w, cord) => {

    for(let i = 0; i < w; i++){
        if(false){
            if(vx == 1) return 0;
            else return canFall(Math.ceil(vx/2), w, h, cord);
        }else{
            return vx;
        }
    }
}

let plainPixels;
console.log(player.hitbox)


animId = setInterval(() => {  
    let plainPixels = canvasOne.ctx.getImageData() 
    canvasOne.ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
    player.drawPlayer(canvasOne.ctx, 600, 600, player.width, player.height);

})

