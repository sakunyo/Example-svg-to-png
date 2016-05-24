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
        getCanvas() {
        }
    };

})(app);

(function (app) {
    "use strict";

    let btn = document.getElementById("add").querySelector("a");
    let images = document.querySelector(".images");
    let svg = new app.MySVG(document.querySelector("svg"));
    
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        let img = images.querySelector("img");
        if (img) {
            images.removeChild(img);
        }
        images.appendChild(svg.getImage());
        console.log('added.');
    }, false);
    
    console.log('launched.');
})(app);
