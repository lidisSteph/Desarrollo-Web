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
    conexion.query(
        "INSERT INTO tbl_usuario(id_tipo_usuario_fk, id_lugar_fk, nombre_usuario, txt_email, txt_password, txt_username, txt_sexo) VALUES (?,?,?,?,?,?,?)",
        [
            2,
            10,
            req.body.nom,
            req.body.email,
            bcrypt.hashSync(req.body.password,null,null),
            req.body.username,
            req.body.sexo
        ],
        function (error, data, fields) {
            //console.log(error);
            res.send(data);
            res.end();
            conexion.end();
        }
    );
});

app.listen(8001);

 