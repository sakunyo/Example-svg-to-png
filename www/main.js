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

        /**
         * @returns {Promise}
         */
        getImage() {
            let img = new Image();
            let bbox = this.svg.getBBox();
            
            img.src = base64dataURLencode((new XMLSerializer()).serializeToString(this.svg));
            img.width = bbox.width;
            img.height = bbox.height;

            return new Promise((resolve, reject) => {
                img.onload = () => {
                    resolve(img);
                }
            });
        }

        /**
         * @returns {Promise}
         */
        getCanvas() {
            let bbox = this.svg.getBBox();
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
          
            return new Promise((resolve, reject) => {
                this.getImage().then((img) => {
                    canvas.setAttribute("width", ~~(bbox.width) + 1);
                    canvas.setAttribute("height", ~~(bbox.height) + 1);
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas);
                });
            });
        }
    };

})(app);

(function (app) {
    "use strict";
    
    const svg = new app.MySVG(document.querySelector("svg"));

    // buttons
    let add = document.getElementById("add").querySelector("a");
    let cv = document.getElementById("canvas").querySelector("a");
    
    add.addEventListener("click", (event) => {
        event.preventDefault();

        svg.getImage().then((element) => {
            let images = document.querySelector(".images");
            let img = images.querySelector("img");
            
            if (img) {
                images.removeChild(img);
            }
            
            images.appendChild(element);
            console.log('added.');
        });
    }, false);

    cv.addEventListener("click", (event) => {
        event.preventDefault();

        svg.getCanvas().then((canvas) => {
            document.querySelector(".canvas").appendChild(canvas);
            console.log("convert to canvas.");
        });
    }, false);
    
    console.log('launched.');
})(app);
