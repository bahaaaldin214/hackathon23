export default class Display {
    constructor(canvas, buffer){
        this.context = canvas.getContext("2d");
        this.buffer = buffer.getContext("2d");

        this.faceFront = true;

        this.colors = {
            front: {
                "0,255,85": "Fore Arm ",
                "255,0,29": "Shoulder",
                "42,0,55": "Chest",
                "0,255,255": "Biceps",
                "255,255,0": "Abs",
                "255,0,170": "Quads"
            },
            back: {
                "255,0,16": "Triceps",
                "170,255,0": "Lats",
                "186,0,255": "Glutes",
                "255,0,"
            }
        }
    }
    image(color, blank){
        const {context, buffer} = this;

        const scalar = .8

        context.drawImage(blank, 0, 0, 490, 649, 0, 0, 490*scalar, 649*scalar);
        buffer.drawImage(color, 0, 0, 490, 649, 0, 0, 490*scalar, 649*scalar);
        //490 for end of left
    }

    update(){
        // this.conext
    }

    getPixel(x, y){
        return "limb"
    }
}