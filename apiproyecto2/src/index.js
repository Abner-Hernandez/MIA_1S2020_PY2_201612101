const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const fs = require('fs');
var terminal = require('child_process').spawn('bash');

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

app.get('/api/producto/cargamasiva', (req,res) => {
    //terminal.stdin.write('node --version\n');
/*
    console.log("vamos");
    terminal.stdin.write('docker exec -it c74cd1533346 bash\n');
    terminal.stdin.write('ls\n');

    /*
    terminal.stdin.write('gosu oracle bash\n');
    terminal.stdin.write('export ORACLE_SID=ORCL18\n');
    terminal.stdin.write('export ORACLE_BASE=/u01/app/oracle\n');
    terminal.stdin.write('export ORACLE_HOME=/u01/app/oracle/product/18.0.0/dbhome_1\n');
    terminal.stdin.write('export PATH=$ORACLE_HOME/bin:$PATH\n');
    terminal.stdin.write('cd Archivos/\n');
    terminal.stdin.write('sqlldr userid=Abner/renovation control=carga_productos.ctl\n');
*/
    //terminal.stdin.write('cp ../proyecto2/src/assets/masive.csv /home/Archivos/\n');
    //terminal.stdin.write('docker cp /home/Archivos/masive.csv c74cd1533346:Archivos/masive.csv\n');
    
    
    //terminal.stdin.write('ls\n');
    //terminal.stdin.write('docker cp /home/Archivos/carga_productos.ctl c74cd1533346:Archivos/carga_productos.ctl\n');
    return res.send({RESPUESTA: 'correcto'});
});

terminal.stdout.on('data', function (data) { 
    console.log('stdout: ' + data); 
    terminal.stdin.end();
}); 

terminal.on('exit', function (code) { 
    console.log('child process exited with code ' + code);
});

//starting
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
});
