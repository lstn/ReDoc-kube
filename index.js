const express = require('express');
const app = express()
const path = require('path');
const morgan = require('morgan');
const mustacheExpress = require('mustache-express');

const PORT = process.env.PORT || 3000;
const REDOC_VER = process.env.REDOC_VER || '2.0.0-rc.2'
const API_PATH = process.env.API_PATH || path.join(__dirname, 'apis');
const API_URLS = process.env.API_URLS || [
    { name: "Swagger PetStore", url: "apis/petstore.swagger.yml" },
    { name: "USPTO", url: "apis/uspto.swagger.yml" }
]

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views',path.join(__dirname, 'views'));

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/', function(req, res){
    res.render('index.html', { 
        redoc_ver: REDOC_VER,
        api_urls: API_URLS
    });
});

app.get('/apis/:api', function(req, res) {
    res.sendFile(path.join(API_PATH, req.params.api));
});