import { rgbToHex } from "./tools.js";

export default class Display {
    constructor(canvas, bufferCanvas, colors, color, blank) {
        this.context = canvas.getContext("2d");
        this.buffer = bufferCanvas.getContext("2d");


        this.blank = blank; 

        this.faceFront = true;

        this.colors = {
            back: {},
            front: {}
        }
        
        for (let color in colors.front) {
            let src = "/static/assets/"+colors.front[color]+".png";
            let image = new Image()
            image.src = src;
            this.colors.front[color] = image;

        }
        
        for (let color in colors.back) {
            let src = "/static/assets/"+colors.back[color]+".png";
            let image = new Image();
            image.src = src;
            this.colors.back[color] = image;
        }

        let images = 0;
        this.front = true
        let handleImage = () => {
            images++
            if(images == 2){
                bufferCanvas.height 
                bufferCanvas.width  = canvas.width = 2008;
                bufferCanvas.height  = canvas.height = 1298;
                
                bufferCanvas.width;
                
        
                this.button("Rotate", "#4a99e8", () => {
                    this.front = !this.front;
                    this.image(this.context, blank);
                    this.image(this.buffer, color);
                });
            }
        }
        blank.onload = handleImage;
        color.onload = handleImage;

        this.buttons = {};
        
    }

    button(name, color, call, image=""){
        const w = 500, h = 200;
        const button = {
            x: Object.keys(this.buttons)*w,
            y: this.context.canvas.height - h,
            w,
            h,
            color,
            name,
            call,
            image
        }
        this.buttons[color] = button

        this.drawButton(button, this.context)
        this.drawButton(button, this.buffer)
    }

    drawButton({x, y, w, h, color, name}, context){
        
        context.fillStyle = color;
        context.fillRect(x, y, w, h);

        context.fillStyle = "white";
        context.font = "100px Verdana";
        context.fillText(name, x, y+100);

        // context.drawImage(x, y, w, h)
    }



    image(ctx, img) {

        const scalar = .2
        const {buttons, front} = this;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let sx = 0, x = 0;
        if(front){
            sx = img.width/2;
            x = 400;
        }
        ctx.drawImage(img, sx, 0, img.width/2, img.height, x, 0, img.width , img.height );

        for(const button of Object.values(buttons)){
            this.drawButton(button, ctx);
        }
        
        //490 for end of left
    }


    getPixel(event) {
        const {buttons, buffer, context, context: {canvas}} = this;
        const viewWidth = canvas.getBoundingClientRect().right - canvas.getBoundingClientRect().left;
        const vewHeigh = canvas.getBoundingClientRect().bottom - canvas.getBoundingClientRect().top;

        const mouseX = (event.clientX - canvas.getBoundingClientRect().left)/viewWidth*canvas.width;
        const mouseY = (event.clientY - canvas.getBoundingClientRect().top)/vewHeigh*canvas.height;
    
        // Get the color of the pixel at the clicked coordinates
        const pixelData = buffer.getImageData(mouseX, mouseY, 1, 1).data;
    
        // Extract the RGBA values from the pixel data
        const red = pixelData[0];
        const green = pixelData[1];
        const blue = pixelData[2];
        const str = `${red},${green},${blue}`
        const hex = rgbToHex(red, green, blue);
        console.log(hex, buttons)
        if(buttons[hex]) buttons[hex].call();


        const muscle = this.colors.front[str] || this.colors.back[str]
        if(muscle){
            
            this.image(context, muscle);
            return str;
            
        } else {
            this.image(context, this.blank)
        }
    }
}