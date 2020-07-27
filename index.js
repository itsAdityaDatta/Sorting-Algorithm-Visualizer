const express = require("express");
const bodyParser = require('body-parser');
const ejs = require('ejs');

let port = process.env.PORT;                            // Heroku
if(port == null || port == ""){
    port = 3000;
}

const app = express();
const expressServer = app.listen(port, function(){
    console.log('listening on port', port);
});

app.use(bodyParser.urlencoded({extended:true}));        // bodyParser
app.use(express.static('public'));                      // express.static
app.set('view engine','ejs');                           // ejs

app.get("/",function(req,res){
    res.render('home',{
    });
});
