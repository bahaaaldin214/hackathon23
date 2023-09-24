export default class Display {
    constructor(canvas, bufferCanvas, colors, color, blank) {
        this.context = canvas.getContext("2d");
        this.buffer = bufferCanvas.getContext("2d");


        this.blank = blank; 

        this.faceFront = true;

        this.colors = colors
        
        for (let color in colors.front) {
            let src = "/static/assets/"+colors.front[color]+".png";
            let image = new Image()
            image.src = src;
            colors.front[color] = image;

        }
        
        for (let color in colors.back) {
            let src = "/static/assets/"+colors.back[color]+".png";
            let image = new Image()
            image.src = src;
            colors.back[color] = image;
        }

        let images = 0;
         let handleImage = () => {
            images++
            if(images == 2){
                bufferCanvas.height 
                bufferCanvas.width  = canvas.width = 2008;
                bufferCanvas.height  = canvas.height = 1298;
                
                bufferCanvas.width 
                this.image(this.context, blank)
                this.image(this.buffer, color)
                
            }
        }
        blank.onload = handleImage;
        color.onload = handleImage;
        
    }
    image(ctx, img) {

        const scalar = .2
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


        ctx.drawImage(img, 0, 0, img.width/2, img.height, 0, 0, img.width , img.height );
        
        //490 for end of left
    }

    update() {
        // this.conext
    }

    getPixel(event) {
        const {buffer, context, context: {canvas}} = this;
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

        if(this.colors.front[str]){
            
            this.image(context, this.colors.front[str])
            
        } else {
            this.image(context, this.blank)
        }
    }
}