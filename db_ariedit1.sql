-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3308
-- Tiempo de generación: 19-12-2018 a las 07:03:50
-- Versión del servidor: 5.7.21
-- Versión de PHP: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_ariedit1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_amigos`
--

DROP TABLE IF EXISTS `tbl_amigos`;
CREATE TABLE IF NOT EXISTS `tbl_amigos` (
  `id_usuario` int(11) NOT NULL,
  `id_usuario_amigo` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_amigos`
--

INSERT INTO `tbl_amigos` (`id_usuario`, `id_usuario_amigo`) VALUES
(8, 14),
(8, 6),
(19, 13),
(25, 16),
(27, 26),
(27, 9),
(26, 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_archivo`
--

DROP TABLE IF EXISTS `tbl_archivo`;
CREATE TABLE IF NOT EXISTS `tbl_archivo` (
  `id_archivo_pk` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario_creador_fk` int(11) NOT NULL,
  `id_tipo_archivo_fk` int(11) NOT NULL,
  `txt_nombre_archivo` varchar(45) NOT NULL,
  `txt_extension` varchar(45) NOT NULL,
  `txt_contenido` text,
  `favorito` tinyint(1) DEFAULT '0',
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_archivo_pk`),
  KEY `fk_tbl_archivo_tbl_usuario1_idx` (`id_usuario_creador_fk`),
  KEY `fk_tbl_archivo_tbl_tipo_archivo1_idx` (`id_tipo_archivo_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_archivo`
--

INSERT INTO `tbl_archivo` (`id_archivo_pk`, `id_usuario_creador_fk`, `id_tipo_archivo_fk`, `txt_nombre_archivo`, `txt_extension`, `txt_contenido`, `favorito`, `estado`) VALUES
(2, 8, 1, 'test', 'html', '<p>Test</p>', 0, 1),
(3, 8, 2, 'hola', 'css', 'p {\n    background-color: red;\n}', 0, 1),
(4, 19, 1, 'yey', 'html', '<div></div>', 0, 1),
(5, 25, 1, 'wenas', 'html', '<div id=\"hi\" class=\"a\">Hola buenas </div>', 0, 1),
(6, 25, 2, 'run', 'css', '.a {\n   color:blue; \n}', 0, 1),
(7, 25, 3, 'yey', 'js', 'var a = document.getElementById(\"hi\");\na.style.display=\"none\";', 0, 1),
(8, 26, 1, 'packet tracer', 'html', '<div id=\"router\" class=\"redes\">Mi primer router</div>', 0, 1),
(9, 26, 2, 'redes', 'css', '.a{\n    color:blue;\n}', 0, 1),
(10, 26, 3, 'router', 'js', 'var a = document.getElementById(\"juego\");\n', 0, 1),
(11, 27, 1, 'muchachos', 'html', '<div id=\"hi\"> Buenas tardes muchachos</div>', 0, 1),
(12, 27, 2, 'redes', 'css', '.a {\n    color:blue;\n}', 0, 1),
(13, 27, 3, 'gerencia', 'js', 'document.getElementById(\"hi\").innerHTML = \"Se acuerdan de la muchacha que subi[o la foto extraña?\";\n', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_archivos_compartidos`
--

DROP TABLE IF EXISTS `tbl_archivos_compartidos`;
CREATE TABLE IF NOT EXISTS `tbl_archivos_compartidos` (
  `id_archivo_fk` int(11) NOT NULL,
  `id_usuario_fk` int(11) NOT NULL,
  `id_usuario_amigo` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_archivos_compartidos`
--

INSERT INTO `tbl_archivos_compartidos` (`id_archivo_fk`, `id_usuario_fk`, `id_usuario_amigo`) VALUES
(2, 8, 14),
(4, 19, 6),
(11, 27, 0),
(11, 27, 26),
(12, 27, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_archivo_x_carpeta`
--

DROP TABLE IF EXISTS `tbl_archivo_x_carpeta`;
CREATE TABLE IF NOT EXISTS `tbl_archivo_x_carpeta` (
  `id_archivo_x_carpeta_pk` int(11) NOT NULL AUTO_INCREMENT,
  `id_carpeta_fk` int(11) NOT NULL,
  `id_archivo_fk` int(11) NOT NULL,
  PRIMARY KEY (`id_archivo_x_carpeta_pk`),
  KEY `fk_tbl_archivo_x_carpeta_tbl_archivo1_idx` (`id_carpeta_fk`),
  KEY `fk_tbl_archivo_x_carpeta_tbl_archivo2_idx` (`id_archivo_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_archivo_x_usuario`
--

DROP TABLE IF EXISTS `tbl_archivo_x_usuario`;
CREATE TABLE IF NOT EXISTS `tbl_archivo_x_usuario` (
  `idl_archivo_x_usuario_pk` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario_fk` int(11) NOT NULL,
  `id_archivo_fk` int(11) NOT NULL,
  PRIMARY KEY (`idl_archivo_x_usuario_pk`),
  KEY `fk_tbl_archivo_x_usuario_tbl_usuario1_idx` (`id_usuario_fk`),
  KEY `fk_tbl_archivo_x_usuario_tbl_archivo1_idx` (`id_archivo_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_lugar`
--

DROP TABLE IF EXISTS `tbl_lugar`;
CREATE TABLE IF NOT EXISTS `tbl_lugar` (
  `id_lugar_pk` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_lugar_fk` int(11) NOT NULL,
  `id_lugar_padre_fk` int(11) DEFAULT NULL,
  `txt_nombre_lugar` varchar(45) NOT NULL,
  PRIMARY KEY (`id_lugar_pk`),
  KEY `fk_tbl_lugar_tbl_tipo_lugar_idx` (`id_tipo_lugar_fk`),
  KEY `fk_tbl_lugar_tbl_lugar1_idx` (`id_lugar_padre_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_lugar`
--

INSERT INTO `tbl_lugar` (`id_lugar_pk`, `id_tipo_lugar_fk`, `id_lugar_padre_fk`, `txt_nombre_lugar`) VALUES
(3, 1, NULL, 'América'),
(4, 2, 3, 'Honduras'),
(5, 3, 4, 'Francisco Morazán'),
(6, 5, 5, 'Tegucigalpa'),
(7, 1, NULL, 'None'),
(8, 2, 7, 'None'),
(9, 3, 8, 'None'),
(10, 5, 9, 'None');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tipo_archivo`
--

DROP TABLE IF EXISTS `tbl_tipo_archivo`;
CREATE TABLE IF NOT EXISTS `tbl_tipo_archivo` (
  `id_tipo_archivo_pk` int(11) NOT NULL AUTO_INCREMENT,
  `txt_nombre_tipo_archivo` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_archivo_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_tipo_archivo`
--

INSERT INTO `tbl_tipo_archivo` (`id_tipo_archivo_pk`, `txt_nombre_tipo_archivo`) VALUES
(1, 'HTML'),
(2, 'CSS'),
(3, 'Javascript'),
(4, 'Carpeta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tipo_lugar`
--

DROP TABLE IF EXISTS `tbl_tipo_lugar`;
CREATE TABLE IF NOT EXISTS `tbl_tipo_lugar` (
  `id_tipo_lugar_pk` int(11) NOT NULL AUTO_INCREMENT,
  `txt_nombre_tipo_lugar` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_lugar_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_tipo_lugar`
--

INSERT INTO `tbl_tipo_lugar` (`id_tipo_lugar_pk`, `txt_nombre_tipo_lugar`) VALUES
(1, 'Continente'),
(2, 'Pais'),
(3, 'Departamento'),
(4, 'Estado'),
(5, 'Ciudad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tipo_usuario`
--

DROP TABLE IF EXISTS `tbl_tipo_usuario`;
CREATE TABLE IF NOT EXISTS `tbl_tipo_usuario` (
  `id_tipo_usuario_pk` int(11) NOT NULL AUTO_INCREMENT,
  `txt_nombre_tipo_usuario` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_usuario_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_tipo_usuario`
--

INSERT INTO `tbl_tipo_usuario` (`id_tipo_usuario_pk`, `txt_nombre_tipo_usuario`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuario`
--

DROP TABLE IF EXISTS `tbl_usuario`;
CREATE TABLE IF NOT EXISTS `tbl_usuario` (
  `id_usuario_pk` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_usuario_fk` int(11) NOT NULL,
  `id_lugar_fk` int(11) DEFAULT NULL,
  `nombre_usuario` varchar(45) NOT NULL,
  `txt_email` varchar(45) NOT NULL,
  `txt_password` varchar(45) NOT NULL,
  `txt_username` varchar(45) NOT NULL,
  `txt_sexo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_usuario_pk`),
  KEY `fk_tbl_usuario_tbl_tipo_usuario1_idx` (`id_tipo_usuario_fk`),
  KEY `fk_tbl_usuario_tbl_lugar1_idx` (`id_lugar_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_usuario`
--

INSERT INTO `tbl_usuario` (`id_usuario_pk`, `id_tipo_usuario_fk`, `id_lugar_fk`, `nombre_usuario`, `txt_email`, `txt_password`, `txt_username`, `txt_sexo`) VALUES
(2, 2, NULL, 'Alejandra Rodriguez', 'ale95@gmail.com', 'CASdaskmdas', 'AlejitaMamaDeTodos', 'Femenino'),
(4, 2, 10, 'nklnlnlk', 'vytvytcyt', 'buybinni', 'nlknlknvuy', '1'),
(5, 2, 10, 'Tomi Meza', 'tomi@gmail.com', 'ohyes', 'TomiSepsi', '1'),
(6, 2, 10, 'Blanca Calderini', 'vere@gmail.com', 'niasofnasoifasf', 'MeraVersh', '1'),
(7, 2, 10, 'Daniela Rob', 'Dani@gmail.com', 'sadasdasd', 'Dan23', '1'),
(8, 2, 10, 'Jesus Herrera', 'chungo@gmail.com', 'bcdcb29ed2aab16d48c11485264df665e906bdd9', 'yisus', '2'),
(9, 2, 10, 'Susana Zavaleta', 'susy@gmail.com', '$2a$10$5cuJB4DHI4im31.e8JuryunZ/A64B.9nHcMXpi', 'Susy', '1'),
(10, 2, 10, 'asidosan', 'dnaisod@gmail.com', '$2a$10$MGB5FhXHwSE8bYm7WgQnx.AX1e4KsHai0.ondK', 'dasdad', '1'),
(11, 2, 10, 'Yelsin Ramirez', 'yelsin@gmail.com', '$2a$10$qRpcoK1k86cInT06p1UBEuUwCuRaDFxVKBYr..', 'YelsinRa', '1'),
(12, 2, 10, 'Jonathan Melgar', 'jona@gmail.com', '$2a$10$CnwjnijrCDlpLE1ZI.3zBOTBco/VD8sbppE3b4', 'JonaMe', '1'),
(13, 2, 10, 'Matusalen Marín', 'matu@gmail.com', '$2a$10$.jFttw5Cw.mwIKfIMRfor.KRDhE9/EIcbQnwWq', 'MAtu', '2'),
(14, 2, 10, 'Daniel Ochoa', 'dani@gmail.com', 'bcdcb29ed2aab16d48c11485264df665e906bdd9', 'DanielO', '1'),
(15, 2, 10, 'Alejandra Rodriguez', 'alero@gmail.com', '$2a$10$quThckZFtH4EqHqzO94um.xRAnPG01wgtrf7bh', 'alero', '1'),
(16, 2, 10, 'Leonel Andres Messi Cuccitini', 'leomessi@gmail.com', 'bcdcb29ed2aab16d48c11485264df665e906bdd9', 'leomessi', '2'),
(17, 2, 10, 'hola', 'hola@gmail.com', 'bcdcb29ed2aab16d48c11485264df665e906bdd9', 'hola', '1'),
(18, 2, 10, 'abra', 'kadabra@gmail.com', 'bcdcb29ed2aab16d48c11485264df665e906bdd9', 'kadra', '1'),
(19, 2, 10, 'ca', 'ca@gmail.com', 'bcdcb29ed2aab16d48c11485264df665e906bdd9', 'caca', '1'),
(21, 2, 10, 'aja', 'aja@gmail.com', 'bcdcb29ed2aab16d48c11485264df665e906bdd9', 'aja', '1'),
(25, 2, 10, 'Maria de los Campos', 'maru@gmail.com', 'bcdcb29ed2aab16d48c11485264df665e906bdd9', 'Maru', '1'),
(26, 2, 10, 'Jose Mario Lopez', 'jose@gmail.com', 'bcdcb29ed2aab16d48c11485264df665e906bdd9', 'Joshe', '2'),
(27, 2, 10, 'Rosalba Canales', 'rosy@gmail.com', 'bcdcb29ed2aab16d48c11485264df665e906bdd9', 'Rosy', '1');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_archivo`
--
ALTER TABLE `tbl_archivo`
  ADD CONSTRAINT `fk_tbl_archivo_tbl_tipo_archivo1` FOREIGN KEY (`id_tipo_archivo_fk`) REFERENCES `tbl_tipo_archivo` (`id_tipo_archivo_pk`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tbl_archivo_tbl_usuario1` FOREIGN KEY (`id_usuario_creador_fk`) REFERENCES `tbl_usuario` (`id_usuario_pk`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbl_archivo_x_carpeta`
--
ALTER TABLE `tbl_archivo_x_carpeta`
  ADD CONSTRAINT `fk_tbl_archivo_x_carpeta_tbl_archivo1` FOREIGN KEY (`id_carpeta_fk`) REFERENCES `tbl_archivo` (`id_archivo_pk`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tbl_archivo_x_carpeta_tbl_archivo2` FOREIGN KEY (`id_archivo_fk`) REFERENCES `tbl_archivo` (`id_archivo_pk`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbl_archivo_x_usuario`
--
ALTER TABLE `tbl_archivo_x_usuario`
  ADD CONSTRAINT `fk_tbl_archivo_x_usuario_tbl_archivo1` FOREIGN KEY (`id_archivo_fk`) REFERENCES `tbl_archivo` (`id_archivo_pk`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tbl_archivo_x_usuario_tbl_usuario1` FOREIGN KEY (`id_usuario_fk`) REFERENCES `tbl_usuario` (`id_usuario_pk`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbl_lugar`
--
ALTER TABLE `tbl_lugar`
  ADD CONSTRAINT `fk_tbl_lugar_tbl_lugar1` FOREIGN KEY (`id_lugar_padre_fk`) REFERENCES `tbl_lugar` (`id_lugar_pk`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tbl_lugar_tbl_tipo_lugar` FOREIGN KEY (`id_tipo_lugar_fk`) REFERENCES `tbl_tipo_lugar` (`id_tipo_lugar_pk`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD CONSTRAINT `fk_tbl_usuario_tbl_lugar1` FOREIGN KEY (`id_lugar_fk`) REFERENCES `tbl_lugar` (`id_lugar_pk`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tbl_usuario_tbl_tipo_usuario1` FOREIGN KEY (`id_tipo_usuario_fk`) REFERENCES `tbl_tipo_usuario` (`id_tipo_usuario_pk`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
