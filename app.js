const menu = document.querySelector(".menu");
let username = "Anonymous";

menu.addEventListener("submit", (e) => {
    e.preventDefault();
    if(e.target[0].value.length > 0) username = e.target[0].value;
    menu.remove();
})

class Player{
    constructor(x,y, name){
        this.h = 80;
        this.w = 25;
        this.name = name;
        this.sprites = {
            static: "/static.svg",
            goes: "/move.svg",
        }
        this.spawnCords = [x,y]
        this.setCords = function(w,h,spawnCords){
            let newCords = {tl, tr, bl, br};
            newCords.tl = [spawnCords[0], spawnCords[1]];
            newCords.tr = [spawnCords[0] + w, spawnCords[1]];
            newCords.bl = [spawnCords[0], spawnCords[1]+h];
            newCords.br = [spawnCords[0] + w, spawnCords[1] + h];
            return newCords;
        }
        this.hitbox = setCords(this.w, this.h, this.spawnCords)
    };
    drawPlayer(pctx, x,y, sprite){
        pctx.save();
        pctx.translate(x,y);
        pctx.drawImage(sprite, 0,0, this.width, this.height, 0, 0, this.width, this.height);
        pctx.restore();
    }
}

let player = new Player(50,50, username);

const canvasOne = document.querySelector("#player")
canvasOne.ctx = canvasOne.getContext("2d");

canvasOne.width = window.innerWidth;
canvasOne.height = window.innerHeight;

let animId, vx = 2, vy = 0, v;

animId = requestAnimationFrame(() => {  

})
