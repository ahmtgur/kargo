module.exports = function(app,sequelize){
    var Corporate = require('../models/Corporate.js')(sequelize);
    var bcrpyt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    var fs = require('fs');

    app.post('/registerCorporate',async function(req,res){
        var name = req.body.name;
        var password =  req.body.password;
        var repeatPassword = req.body.repeatPassword;
        if(password != repeatPassword){
            res.send("Passwords don't match");
            return;
        }
        var saltRounds = 10;
        var hashedPassword = await bcrpyt.hash(password, saltRounds);
        const corporate = Corporate.build({name:name,password:hashedPassword});
        await corporate.save();
        res.send('Corporate created successfully.');
    });

    app.post('/authenticate',async function(req,res){
        var name = req.body.name;
        var password = req.body.password;
        var corporate = await Corporate.scope('withPassword').findOne({where:{name:name}});
        if(corporate == null){
            res.send('Firma bulunamadı.');
            return;
        }
        var result = await bcrpyt.compare(password, corporate.password);
        if(!!result){
            const privateKey = await fs.promises.readFile('private.key', 'utf8');
            var token = jwt.sign({ id: corporate.id }, privateKey, {expiresIn: '2h'});
            res.send(token);
            return;
        }else{
            res.send("Şifre yanlış.");
            return;
        }
    })
}