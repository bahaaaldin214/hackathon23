export default class Display {
    constructor(canvas, buffer, colors) {
        this.context = canvas.getContext("2d");
        this.buffer = buffer.getContext("2d");

        this.faceFront = true;

        this.colors = colors
    }
    image(color, blank) {
        const { context, buffer } = this;

        const scalar = .8

        context.drawImage(blank, 0, 0, 490, 649, 0, 0, 490 * scalar, 649 * scalar);
        buffer.drawImage(color, 0, 0, 490, 649, 0, 0, 490 * scalar, 649 * scalar);
        //490 for end of left
    }

    update() {
        // this.conext
    }

    getPixel(x, y) {
        return "limb"
    }
    
   