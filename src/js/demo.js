import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, Flip, EaselPlugin, ScrollToPlugin, PixiPlugin } from "gsap/all";
import ScrollMagic from 'scrollmagic'
gsap.registerPlugin(ScrollTrigger, EaselPlugin, Draggable, Flip, MotionPathPlugin, PixiPlugin, ScrollToPlugin);


/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
const gravity = 0.5;
const velocity = 2.5;

const rectProps = { x: 0, y: 0, w: 50, h: 50, fill: '#bada55' };

const drawRect = () => {
    // c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = rectProps.fill;
    c.fillRect(rectProps.x, rectProps.y, rectProps.w, rectProps.h)
        // console.log(rectProps.x)
}

gsap.ticker.add(drawRect)

gsap.to(rectProps, 2, {
    x: 250,
    y: 100,
    fill: '#557799',
    repeat: 1,
    yoyo: true,
    onComplete: () => { gsap.ticker.remove(drawRect) }
})

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100,
        }
        this.velocity = {
            x: 0,
            y: 20
        }
        this.width = 20;
        this.height = 20;
    }
    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else {

            this.velocity.y = 0;
        }
    }
}
const player = new Player();
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    down: {
        pressed: false
    }
}

function animate() {
    drawRect(rectProps)

    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update();
    if (keys.right.pressed) {
        player.velocity.x = velocity
    } else if (keys.left.pressed) {
        player.velocity.x = -velocity
    } else {
        player.velocity.x = 0
    }
    if (keys.up.pressed) {
        player.velocity.y = -velocity
    } else if (keys.down.pressed) {
        player.velocity.y = velocity
    } else {
        player.velocity.y = 0
    }
}

animate()

window.addEventListener('keydown', ({ keyCode, key }) => {
    // 65 'a',  87 'w', 83 's', 68 'd'
    // 38 'ArrowUp', 40 'ArrowDown', 37 'ArrowLeft', 39 'ArrowRight'
    // console.log(keyCode, key);
    switch (keyCode) {
        case 65:
            console.log("LEFT");
            keys.left.pressed = true
            break;
        case 83:
            console.log("DOWN");
            keys.down.pressed = true

            break;
        case 68:
            console.log("RIGHT");
            keys.right.pressed = true
            break;
        case 87:
            console.log("UP");
            keys.up.pressed = true
                // player.velocity.y -= 5
            break;
    }
})

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log("LEFT");
            keys.left.pressed = false

            break;
        case 83:
            console.log("DOWN");
            keys.down.pressed = false
            break;
        case 68:
            console.log("RIGHT");
            keys.right.pressed = false
            break;
        case 87:
            console.log("UP");
            keys.up.pressed = false

            break;
    }
})