"use strict";

import Http from "http";
import Jade from "jade";
import Sass from "node-sass";
import Url from "url";
import Fs from "fs";
import {octcat} from  "./shape";

const server = Http.createServer();
const sassObject = Sass.renderSync({
    file: './templates/style.sass',
    outputStyle: 'compressed'
});

server.on('request', (request, response) => {
    let path = Url.parse(request.url, true);
    let matches;

    if ('/' === path.path) {
        let compile = Jade.compileFile('./templates/index.jade', { pretty: true });
        
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(compile({
          title: "svg-to-png",  
          svg: octcat,
          css: sassObject.css
        }));
        response.end();
    }
    
    if ((matches = /(.*).js$/.exec(path.path)) && matches) {
        Fs.readFile('./www' + matches[0], (err, data) => {
            response.writeHead(200, {'Content-Type': 'text/javascript'});
            response.end(data);
        });
    }
});

server.listen(8080, 'localhost');

console.log("server running at http://localhost:8080");