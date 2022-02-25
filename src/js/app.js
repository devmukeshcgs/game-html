import '../scss/app.scss';
/* Your JS Code goes here */

/* Demo JS */
import './demo.js';
// import './pixi_sketch.js';
/**
 * Animation API
 */
const item = document.querySelector(".logo");

item.animate([
    { transform: 'translateX(0px)' },
    { transform: 'translateX(10px)' },
], {
    duration: 1000,
    easing: 'ease-in-out',
    direction: 'alternate',
    iterations: Infinity
})