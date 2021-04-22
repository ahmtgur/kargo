const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const {Sequelize} = require('sequelize');
var sequelize = new Sequelize("kargo", "root", "", {
    host: "localhost",
    port:"3306",
    dialect: "mysql",
    logging: function () {},
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

sequelize.authenticate().then(function(){
    console.log("Veritabanı bağlantısı başarılı.");
}).catch(function(err){
    console.log(err);
});

var a = 5;

var Corporate = require('./models/Corporate.js')(sequelize);
var Shipment = require('./models/Shipment.js')(sequelize);

sequelize.sync();

require('./controllers/CorporateController.js')(app,sequelize);

app.get('/hello',function(req,res){
    var name = (!!req.query.name) ? req.query.name : 'World';
    res.send('Hello '+name);
});

app.listen(port,function(){
    console.log("App started on http://localhost:${port}.");
})

