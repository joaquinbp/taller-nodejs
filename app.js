var express = require('express');
var app = express();
var moment = require('moment');
var voca = require('voca');
var figlet = require('figlet');

app.get('/', function(req,res) {
    res.send('Hola, bienvenido al Heading To Codefest');
});

app.get('/saludo', function(req,res){
    let nombre = req.query.nombre;
    if(nombre) {
        res.send(`Hola ${nombre}, bienvenido al Heading to Codefest`);
    }
    else{
        res.send('Hola, bienvenido al Heading To Codefest');
    }
});

app.get('/numdias', function(req, res) {
    if(req.query.fecha && req.query.fecha.length <= 10) {
        const regExFecha = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g;

        if(req.query.fecha.match(regExFecha)) {
            const fechaIntroducida = moment(req.query.fecha);
            const fechaActual = moment();
            const dias = fechaIntroducida.diff(fechaActual, 'days');
            if(dias < 0) {
                res.send(`Han transcurrido ${-dias} días desde la fecha introducida`);
            }
            else {
                res.send(`Faltan ${dias} días para la fecha introducida`);
            }
        }
        else {
            res.send('Debes introducir la fecha con el formato yyyy-mm-dd');
        }
        

    }
    else{
        res.send('Debes introducir la fecha con el formato yyyy-mm-dd');
    }

});

app.get('/numDia', function(req,res){
    let fecha = req.query.fecha;
    let formatoCorrecto = moment(fecha);
    if(formatoCorrecto.isValid()){
        var diferencia = formatoCorrecto.diff(moment(),'days');
        res.send(`${diferencia}`);

    } else{
        res.send('El formato de la fecha no es correcto');
    }
});

app.get('/reverse-world', function(req,res){
    let texto = req.query.texto;
    let reves = voca.reverse(texto);
    res.send(`${reves}`);
});

app.get('/is-lower-case', function(req,res){
    let texto = req.query.texto;
    let minus = voca.lowerCase(texto);
    if(minus == texto){
        res.send('está en minúsculas');
    } else{
        res.send('no está en minúsculas');
    }

    
});

app.get('/banner', function(req,res){
    let texto = req.query.texto;
    figlet(texto, function(err, data) {
        console.log(data)
    });
});



app.listen(3000, function(){
    console.log('Taller NodeJS app listening on port 3000!');
});