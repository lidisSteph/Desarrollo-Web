var express  = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var mysql = require("mysql");

var app = express();

var credenciales = {
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "db_ariedit"
};


// puerto
process.env.PORT = process.env.PORT || 8001;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({ secret: "asd.456", resave: true, saveUninitialized: true }));

app.post("/login", function (req, res) {
    var conexion = mysql.createConnection(credenciales);
    console.log(req.body)
    conexion.query(
        "SELECT id_usuario_pk, nombre_usuario, txt_email, txt_username FROM tbl_usuario WHERE txt_email = ? AND txt_password = SHA1(?)",
        [req.body.email, req.body.password],
        function (error, data, fields) {
            if (error) {
                res.send(error);
                res.end();
            } else {
                if (data.length == 1) {
                    console.log(data[0]);
                    
                    req.session.idUsuario = data[0].id_usuario_pk;
                    req.session.nombreUsuario = data[0].nombre_usuario;
                    req.session.emailUsuario = data[0].txt_email;
                    req.session.usernameUsuario = data[0].txt_username;
                }
                res.send(data);
                res.end();
            }
        }
    )
});

app.post("/registroUsuario", function (req, res) {
    var conexion = mysql.createConnection(credenciales);
    console.log(req.body)
    var consulta = "SELECT nombre_usuario, txt_username FROM tbl_usuario WHERE txt_username = ?";
    var insertar = "INSERT INTO tbl_usuario(id_tipo_usuario_fk, id_lugar_fk, nombre_usuario, txt_email, txt_password, txt_username, txt_sexo) VALUES (?,?,?,?,SHA1(?),?,?)";
    var username = req.body.username
    conexion.query(consulta,[username],
        function (error, data, fields) {
            if (data.length > 0) {
                /* if (err---) throw err;
                 */
                $('#ya-eliminado').modal();
                res.send({ estatus: 1, mensaje: "Nombre de usuario ya existe." });
                res.end();

                } else {
                conexion.query(insertar,
                    [
                        2,
                        10,
                        req.body.nom,
                        req.body.email,
                        req.body.password,
                        username,
                        req.body.sexo
                    ], function (err, result) {
                        /* if (err) throw err;
 */
                        res.send(result);

                    
                        
                        /* conexion.end(); */
                    }
                );
            }
            conexion.end();
        }
    );
    
});

app.get("/logout", function (req,res) {

    req.session.destroy();
    let mensaje = {
        status: 200,
        'mensaje': 'Sesión finalizada'
    } 
    res.json(mensaje)
});


app.post("/archivo", function (req, res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = "INSERT INTO tbl_archivo (id_usuario_creador_fk, id_tipo_archivo_fk, txt_nombre_archivo, txt_extension, txt_contenido) VALUES (?,?,?,?,?);"

    conexion.query(
        sql,
        [
            req.session.idUsuario, 
            req.body.tipoArchivo, 
            req.body.nombreArchivo,
            req.body.extension,
            req.body.contenido
        ],
        function(err, result){
            if (err) throw err;
            res.send(result);
        }
    ); 
})

app.get("/archivo", function (req, res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = `
    SELECT txt_contenido, id_tipo_archivo_fk FROM tbl_archivo
    WHERE id_archivo_pk = ?
    `
    conexion.query(
        sql,
        [
            req.query.idArchivo
        ],
        function(err, result){
            if (err) throw err;
            res.send(result);
        }
    );  
})

app.get("/archivo-usuario", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = `
    SELECT id_archivo_pk ,txt_nombre_archivo, id_tipo_archivo_fk, txt_extension 
    FROM tbl_archivo
    WHERE estado = 1 AND id_usuario_creador_fk = ?
    `
    var archivos = [];
    conexion.query(sql, 
    [
        req.session.idUsuario,
    ])
    .on("result", function(resultado){
        archivos.push(resultado);
        console.log(archivos);
        
    })
    .on("end",function(){
        res.send(archivos);
    });
});

app.post("/actualizar-archivo", function (req, res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = `
    UPDATE tbl_archivo SET txt_contenido = ? 
    WHERE id_usuario_creador_fk = ? AND id_archivo_pk = ?    
    `
    conexion.query(
        sql,
        [
            req.body.contenido,
            req.session.idUsuario,
            req.body.idArchivo
        ],
        function(err, result){
            if (err) throw err;
            res.send(result);
        }
    );
})

app.post("/archivo-favorito", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = `
    UPDATE tbl_archivo SET favorito = 1
    WHERE id_usuario_creador_fk = ? AND id_archivo_pk = ?
    `
    conexion.query(
        sql,
        [
            req.session.idUsuario,
            req.body.idArchivo
        ],
        function(err, result){
            if (err) throw err;
            res.send(result);
        }
    );
})

app.post("/archivo-favorito-quitar", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = `
    UPDATE tbl_archivo SET favorito = 0
    WHERE id_usuario_creador_fk = ? AND id_archivo_pk = ?
    `
    conexion.query(
        sql,
        [
            req.session.idUsuario,
            req.body.idArchivo
        ],
        function(err, result){
            if (err) throw err;
            res.send(result);
        }
    );
})

app.get("/archivo-favorito", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = `
    SELECT id_archivo_pk ,txt_nombre_archivo, id_tipo_archivo_fk, txt_extension 
    FROM tbl_archivo
    WHERE estado = 1 AND id_usuario_creador_fk = ? AND favorito = 1
    `
    var archivos = [];
    conexion.query(sql, 
    [
        req.session.idUsuario,
    ])
    .on("result", function(resultado){
        archivos.push(resultado);
        console.log(archivos);
        
    })
    .on("end",function(){
        res.send(archivos);
    });
});

app.post("/archivo-papelera", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = `
    UPDATE tbl_archivo SET estado = 0
    WHERE id_usuario_creador_fk = ? AND id_archivo_pk = ?
    `
    conexion.query(
        sql,
        [
            req.session.idUsuario,
            req.body.idArchivo
        ],
        function(err, result){
            if (err) throw err;
            res.send(result);
        }
    );
})

app.post("/archivo-papelera-quitar", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = `
    UPDATE tbl_archivo SET estado = 1
    WHERE id_usuario_creador_fk = ? AND id_archivo_pk = ?
    `
    conexion.query(
        sql,
        [
            req.session.idUsuario,
            req.body.idArchivo
        ],
        function(err, result){
            if (err) throw err;
            res.send(result);
        }
    );
})

app.post("/archivo-papelera-eliminar", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = `
    DELETE FROM tbl_archivo 
    WHERE id_usuario_creador_fk = ? AND id_archivo_pk = ?
    `
    conexion.query(
        sql,
        [
            req.session.idUsuario,
            req.body.idArchivo
        ],
        function(err, result){
            if (err) throw err;
            res.send(result);
        }
    );
})

app.get("/archivo-papelera", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = `
    SELECT id_archivo_pk ,txt_nombre_archivo, id_tipo_archivo_fk, txt_extension 
    FROM tbl_archivo
    WHERE estado = 0 AND id_usuario_creador_fk = ?
    `
    var archivos = [];
    conexion.query(sql, 
    [
        req.session.idUsuario,
    ])
    .on("result", function(resultado){
        archivos.push(resultado);
        console.log(archivos);
        
    })
    .on("end",function(){
        res.send(archivos);
    });
});

app.get("/obtener-usuarios", function (req, res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT id_usuario_pk, nombre_usuario FROM tbl_usuario
    WHERE id_usuario_pk NOT IN  (
        SELECT id_usuario_amigo from tbl_amigos
        WHERE id_usuario_pk = ?
    ) AND id_usuario_pk != ?`;
    var usuarios = [];
    conexion.query(sql, [
        req.session.idUsuario,
        req.session.idUsuario
    ])
        .on("result", function (resultado) {
            usuarios.push(resultado);
        })
        .on("end", function () {
            res.send(usuarios);
            
        });
});


app.get("/obtener-amigos", function (req, res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT id_usuario_pk, nombre_usuario, txt_email, txt_username
    FROM tbl_usuario
    INNER JOIN tbl_amigos
    ON id_usuario_pk = id_usuario_amigo
    WHERE id_usuario = ?`;
    var amigos = [];
    conexion.query(sql,[req.session.idUsuario])
        .on("result", function (resultado) {
            amigos.push(resultado);
        })
        .on("end", function () {
            res.send(amigos);
            
        });
});

app.post("/agregar-amigo", function (req, res) {

    var conexion = mysql.createConnection(credenciales);
    var sql = `INSERT INTO tbl_amigos (id_usuario, id_usuario_amigo) VALUES (?,?)`;

    conexion.query(
        sql,
        [
            req.session.idUsuario,
            req.body.idAmigo
        ],
        function (err, result) {
            if (err) throw err;
            res.send(result);
        }
    );
});

app.post("/compartir", function (req, res) {

    var conexion = mysql.createConnection(credenciales);
    var sql = `INSERT INTO tbl_archivos_compartidos (id_archivo_fk, id_usuario_fk, id_usuario_amigo) VALUES (?,?,?);`;

    conexion.query(
        sql,
        [
            req.body.idArchivo,
            req.session.idUsuario,
            req.body.idAmigo
        ],
        function (err, result) {
            if (err) throw err;
            res.send(result);
        }
    );
});

app.get("/archivos-compartidos", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = `
    SELECT A.id_archivo_pk , A.txt_nombre_archivo, A.id_tipo_archivo_fk, A.txt_extension
    FROM tbl_archivo A
    INNER JOIN tbl_archivos_compartidos B
    ON B.id_archivo_fk = A.id_archivo_pk
    WHERE A.estado = 1 AND B.id_usuario_amigo = ?
    `
    var archivos = [];
    conexion.query(sql, 
    [
        req.session.idUsuario,
    ])
    .on("result", function(resultado){
        archivos.push(resultado);
        console.log(archivos);
        
    })
    .on("end",function(){
        res.send(archivos);
    });
});

app.post("/obtenerUsuario", function(req, res){

    var conexion = mysql.createConnection(credenciales);
    conexion.query(
        "SELECT txt_username FROM tbl_usuario where id_usuario_pk = ?", [req.session.idUsuario], 
        function (err, result) {
            console.log(req.session.idUsuario)
            console.log(JSON.stringify(result))
            if (err) throw err;
            res.send(JSON.stringify(result));
        
    });
});

app.listen(process.env.PORT,function(){
    console.log(`Se ha iniciado el servidor en http://localhost:${process.env.PORT}`);
});