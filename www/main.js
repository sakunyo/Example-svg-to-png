const app = {};

(function (app) {
    "use strict";

    function base64dataURLencode(s) {
        let str = window.btoa ? btoa(s) : Base64.encode(s);
        return "data:image/svg+xml;base64," + str;
    }

    app.MySVG = class MySVG {
        constructor(svg) {
            this.svg = svg;
        }

        getSvg() {
            return this.svg;
        }

        getImage() {
            let img = new Image();
            img.src = base64dataURLencode((new XMLSerializer()).serializeToString(this.svg));
            return img;
        }

        getCanvas(box = {width: 33, height: 33}) {
            let img = this.getImage();
            let canvas = document.createElement('canvas');
            canvas.setAttribute("width", box.width);
            canvas.setAttribute("height", box.height);
            
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            return canvas;
        }
    };

})(app);

(function (app) {
    "use strict";
    
    let svg = new app.MySVG(document.querySelector("svg"));

    // buttons
    let add = document.getElementById("add").querySelector("a");
    let cv = document.getElementById("canvas").querySelector("a");
    
    add.addEventListener("click", (event) => {
        event.preventDefault();
        
        let images = document.querySelector(".images");
        let img = images.querySelector("img");
        
        if (img) {
            images.removeChild(img);
        }
        images.appendChild(svg.getImage());
        
        console.log('added.');
    }, false);

    cv.addEventListener("click", (event) => {
        event.preventDefault();

        let canvas = svg.getCanvas();

        document.querySelector(".canvas").appendChild(canvas);

        console.log("convert to canvas.");
    });
    
    console.log('launched.');
})(app);
