const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const fs = require('fs');

const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null,'../proyecto2/src/assets')
    },
    filename: (req, file, cb) => {
        
        cb(null, req.body.filename);
    }
});

const upload = multer({ storage });

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//routes
app.use("/api/user",require("./routes/user"));
app.use("/api/datos",require("./routes/datos"));
app.use("/api/generos",require("./routes/genero"));
app.use("/api/tipouser",require("./routes/tipouser"));
app.use("/api/tipocliente",require("./routes/tipocliente"));
app.use("/api/correo",require("./routes/email"));
app.use("/api/disco",require("./routes/disco"));
app.use("/api/bitacora",require("./routes/bitacora"));
app.use("/api/reportes",require("./routes/reportes"));
app.use("/api/categoria",require("./routes/categoria"));
app.use("/api/producto",require("./routes/producto"));

app.get( '/api/archivo/obtener/:name', (req, res) => {
    
    fs.readFile('/home/archivos/'+req.params.name, function(err, data) {
        if (err){
            return err;
        }
        
          //res.writeHead(200, {'Content-Type': 'image/jpeg'});
          res.end(data); // Send the file data to the browser.
    
      });
});

app.post('/api/archivo/subir', upload.single('file'), (req,res) => {
    
    console.log(`Ubicacion: ${req.hostname}/${req.file.path}`);
    return res.send(req.file);
});

//starting
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
});
