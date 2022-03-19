/** @type {HTMLCanvasElement} */

export function drawStatusText(context, input) {
    context.font = '30px Helvetica';
    context.fillText('Last input' + input.lastKey, 50, 50)
}