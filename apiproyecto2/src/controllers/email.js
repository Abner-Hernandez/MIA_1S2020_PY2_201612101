var nodem = require("nodemailer");
//var datos = require("./routes/datos"); '<img src="' + datos.PAGE_LOGO +  'align="middle"> </img><br>' + 

module.exports = {
    enviarCorreo: async (req, res, next) => {
        console.log(req.body);
        var transp = nodem.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'battle.ah.av@gmail.com',
                pass: '1Present'
            }
        });
        var opt = {
            from: 'battle.ah.av@gmail.com',
            to: req.body.destino,
            subject: req.body.asunto,
            html: '<img src="' + req.body.page_logo +  '" align="middle"> </img><br>' +  '<h1>Enhorabuena!</h1> Gracias por Registrarse en nuestra plataforma lo invitamos a que ingrese en el siguinete Link para verificar su cuenta.'
            +'\nhttp://localhost:4200/verificar?un='+req.body.username
        };

        transp.sendMail(opt, function (error, info) {
            if (error) {
                console.log(error);
                res.send(500, error.message);
            } else {
                console.log('Un error a ocurrido no se a podido mandar el correo');
                res.status(200).jsonp(req.body);
            }
        });
    },
    recuperarCorreo: async (req, res, next) => {
        console.log(req.body);
        var transp = nodem.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'battle.ah.av@gmail.com',
                pass: '1Present'
            }
        });
        var opt = {
            from: 'battle.ah.av@gmail.com',
            to: req.body.destino,
            subject: req.body.asunto,
            html: '<img src="' + req.body.page_logo +  'align="middle"> </img><br>' +  'Estimado. '+req.body.username+', se ha solicitado cambio de contraseña por lo que se le da una contraseña provicional para que pueda ingresar y cambiar la contraseña, recuerde es temporal.'
            +'\nhttp://localhost:4200/verificar?un='+req.body.username
            +'\n Tu Contraseña para Ingresar es: '+req.body.password
        };

        transp.sendMail(opt, function (error, info) {
            if (error) {
                console.log(error);
                res.send(500, error.message);
            } else {
                console.log('un error a ocurrido no se a podido mandar el correo');
                res.status(200).jsonp(req.body);
            }
        });
    }

    
};