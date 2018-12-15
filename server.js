var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt-nodejs");

var app = express();
var credenciales = {
    host: "localhost",
    user: "root",
    password: "",
    port: "3308",
    database: "db_ariedit"
};

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/registroUsuario", function (req, res) {
    var conexion = mysql.createConnection(credenciales);
    console.log(req.body)
    var consulta = "SELECT nombre_usuario, txt_username FROM tbl_usuario WHERE txt_username = ?";
    var insertar = "INSERT INTO tbl_usuario(id_tipo_usuario_fk, id_lugar_fk, nombre_usuario, txt_email, txt_password, txt_username, txt_sexo) VALUES (?,?,?,?,?,?,?)";
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
                        bcrypt.hashSync(req.body.password, null, null),
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

app.listen(8001);

 