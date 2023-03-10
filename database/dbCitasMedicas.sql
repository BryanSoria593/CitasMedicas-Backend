-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-03-2023 a las 07:53:05
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appcitas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accesos`
--

CREATE TABLE `accesos` (
  `ACC_ID` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `ACC_NOMBRE` varchar(200) NOT NULL,
  `ACC_PAGINA` varchar(200) NOT NULL,
  `logo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `accesos`
--

INSERT INTO `accesos` (`ACC_ID`, `id_rol`, `ACC_NOMBRE`, `ACC_PAGINA`, `logo`) VALUES
(0, 0, 'Registrar citas', 'cites/new', 'fa-solid fa-eye'),
(1, 0, 'Citas registradas', 'cites/appointments', 'fa-solid fa-list-check'),
(2, 0, 'Modificar citas', 'modificar', 'fa-solid fa-file-pen'),
(4, 1, 'Mostrar Citas', 'citasdoctor', 'fa-solid fa-eye'),
(5, 1, 'Asignar Medicamento', 'asignar', 'fa-solid fa-file-pen'),
(6, 0, 'Historial', 'historial', 'fa-solid fa-file-waveform');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `id_area` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id_area`, `nombre`, `image`) VALUES
(1, 'Odontología', 'https://res.cloudinary.com/xxbasmxx/image/upload/v1664171099/optionsAppCites/odontologiapng_v1gb6q.png'),
(2, 'Fisioterapia', 'https://res.cloudinary.com/xxbasmxx/image/upload/v1664170584/optionsAppCites/fisioterapia_vr3avj.png'),
(3, 'Obstetricia', 'https://res.cloudinary.com/xxbasmxx/image/upload/v1664170456/optionsAppCites/obstetricia_iv6lku.png'),
(4, 'General', 'https://res.cloudinary.com/xxbasmxx/image/upload/v1664170331/optionsAppCites/generalMedicine_mjmqkg.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `id_cita` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(30) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_doctor` int(11) DEFAULT NULL,
  `id_disponibilidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`id_cita`, `fecha`, `estado`, `id_usuario`, `id_doctor`, `id_disponibilidad`) VALUES
(274, '2022-08-26', 'Cancelada', 7, 59, 2),
(275, '2022-08-26', 'Asistida', 7, 10, 17),
(276, '2022-08-26', 'Asistida', 7, 61, 21),
(277, '2022-08-26', 'Asistida', 7, 61, 16),
(278, '2022-08-26', 'Cancelada', 7, 61, 15),
(279, '2022-08-26', 'Cancelada', 7, 10, 16),
(280, '2022-08-26', 'Asistida', 7, 61, 20),
(281, '2022-08-26', 'Asistida', 7, 61, 2),
(283, '2022-08-31', 'Asistida', 63, 61, 22),
(284, '2022-08-26', 'Asistida', 7, 61, 22),
(285, '2022-08-26', 'Asistida', 7, 61, 22),
(286, '2022-08-25', 'Asistida', 63, 61, 21),
(287, '2022-08-26', 'Asistida', 64, 61, 17),
(288, '2022-08-26', 'Asistida', 65, 61, 18),
(305, '2022-03-03', 'Cancelada', 7, 10, 4),
(306, '2022-03-03', 'Cancelada', 7, 10, 4),
(307, '2022-03-03', 'Cancelada', 7, 10, 4),
(339, '2022-03-03', 'Cancelada', 7, 10, 4),
(340, '2022-03-03', 'Cancelada', 7, 10, 4),
(341, '2022-09-26', 'Pendiente', 7, 59, 2),
(342, '2022-09-26', 'Pendiente', 7, 59, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disponibilidad_cita`
--

CREATE TABLE `disponibilidad_cita` (
  `id_disponibilidad` int(11) NOT NULL,
  `id_turno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `disponibilidad_cita`
--

INSERT INTO `disponibilidad_cita` (`id_disponibilidad`, `id_turno`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20),
(21, 21),
(22, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctor`
--

CREATE TABLE `doctor` (
  `id_doctor` int(11) NOT NULL,
  `disponibilidad` tinyint(1) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_area` int(11) DEFAULT NULL,
  `id_especialidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `doctor`
--

INSERT INTO `doctor` (`id_doctor`, `disponibilidad`, `id_usuario`, `id_area`, `id_especialidad`) VALUES
(10, 1, 10, 3, 3),
(59, 1, 59, 1, 1),
(60, 1, 60, 1, 1),
(61, 1, 61, 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `id_especialidad` int(11) NOT NULL,
  `nombre` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id_especialidad`, `nombre`) VALUES
(1, 'Odontólogo'),
(2, 'Fisioteraopeuta'),
(3, 'Obstetra'),
(4, 'General');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id_receta` int(11) NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `id_cita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen`
--

CREATE TABLE `imagen` (
  `id_imagen` int(11) NOT NULL,
  `id_receta` int(11) NOT NULL,
  `url` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `rol` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `rol`) VALUES
(0, 'P'),
(1, 'D');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turno`
--

CREATE TABLE `turno` (
  `id_turno` int(11) NOT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_final` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `turno`
--

INSERT INTO `turno` (`id_turno`, `hora_inicio`, `hora_final`) VALUES
(1, '07:00:00', '07:30:00'),
(2, '07:30:00', '08:00:00'),
(3, '08:00:00', '08:30:00'),
(4, '08:30:00', '09:00:00'),
(5, '09:00:00', '09:30:00'),
(6, '09:30:00', '10:00:00'),
(7, '10:00:00', '10:30:00'),
(8, '10:30:00', '11:00:00'),
(9, '11:00:00', '11:30:00'),
(10, '11:30:00', '12:00:00'),
(11, '13:00:00', '13:30:00'),
(12, '13:30:00', '14:00:00'),
(13, '14:00:00', '14:30:00'),
(14, '14:30:00', '15:00:00'),
(15, '15:00:00', '15:30:00'),
(16, '15:30:00', '16:00:00'),
(17, '16:00:00', '16:30:00'),
(18, '16:30:00', '17:00:00'),
(19, '17:00:00', '17:30:00'),
(20, '17:30:00', '18:00:00'),
(21, '18:00:00', '18:30:00'),
(22, '18:30:00', '19:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `cedula` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `fecha` date DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `sexo` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `cedula`, `email`, `nombres`, `apellidos`, `fecha`, `ciudad`, `sexo`, `password`, `user_rol`) VALUES
(7, '2450110859', 'paciente@gmail.com', 'Bryan', 'Soria', '2002-08-07', 'La libertad', 'Masculino', '$2a$10$HtM1MH2GqlAeoxw4QFblIegrt8xeUaBWHn0vDbQJgxs/zjfUTNTTm', 0),
(10, '123456', 'doctor@gmail.com', 'Juan', 'Piguave', '1992-08-07', 'La libertad', 'Masculino', '$2a$12$SXN8/EVK/MsMLjlCtZ5bIemo9v.jgTQA3bGfQ6tVRNCxH9DOBGO3i', 1),
(59, '131313', 'odontologo1@gmail.com', 'Daniel', 'Rosales', '1989-05-01', 'Quito', 'Masculino', '123456', 1),
(60, '13271', 'odontologo2@gmail.com', 'Ariel', 'Borbor', '1995-05-21', 'Guayaquil', 'Masculino', '123456', 1),
(61, '13271', 'fisio@gmail.com', 'Bacilio', 'Espinoza', '1980-05-21', 'Guayaquil', 'Masculino', '123456', 1),
(62, '13271', 'fisio2@gmail.com', 'Diego', 'Soria', '1988-11-08', 'Guayaquil', 'Masculino', '123456', 1),
(63, '2615381', 'borbor@gmail.com', 'Ariel', 'Borbor', '2022-06-07', 'La libertad', 'Masculino', '123456', 0),
(64, '1726126', 'jose@gmail.com', 'jose', 'jose', '2022-08-02', 'La libertad ', 'Masculino', '123456', 0),
(65, '172615', 'rosalva@gmail.com', 'Rosalba ', 'Rodríguez ', '2022-08-26', 'La libertad ', 'Masculino', '123456', 0),
(66, '2400455891', 'jesusmald.23@gmail.com', 'jesus', 'Maldonado ', '2022-08-08', 'Libertad ', 'Masculino', 'jarm3105', 0),
(114, '121212', '1x9@gmail.com', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$EJ.FzIUGZkEqZcZfqR5pgehR0b1Z91bWcPq4HOBKwzYIPBASeM5oC', 0),
(115, '121212', '1xx9@gmail.com', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$XM8Y3FEzmBu8Y8w0RbjvXOkTd4cx2N3tGL2/Mny.9HvK88r97/u/2', 0),
(116, '121212', '1xxs9@gmail.com', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$O0qxS/U4gFsDRn/7Q44bgukhTm05VJw72r8RUrecfmyNbtRxlHFZS', 0),
(117, '121212', '1xzxs9@gmail.com', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$VZzNMwSoRLkRDbFwwZDsUO.1ue7Zfe.ue5.ypIMHKaG8z9irs8UHu', 0),
(119, '121212', 'pepe@gmail.oms', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$nwVUq/MiujLOCs2uzNhgqebT6GbtZpTsBi0rSqynIWvLnrBzTkQaK', 0),
(120, '121212', 'pepe@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$Ai4JZv9uCj3A6YhkRDWFNO/80A8y8/wh/5.8myG/rMfMpBBax4Op6', 0),
(121, '121212', 'pepas@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$6w7bc7HzKK5KsXr8ifUXQ.1.MA/KWBLPyOMEHAaqYvRYkjoHx15dy', 0),
(122, '121212', 'pepas1@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$3cPsnHskFqxY90KVQVbXwOL6g84oN5aty0bF4awGw1A.EUxy8oYKm', 0),
(123, '121212', 'pepas2@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$p088uFhiD57KW6RSrh72Ge/JnNF4ipyL0FFlYePdGVgM6Y4Fe/9Ue', 0),
(124, '121212', 'pepas3@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$.L5DbFvI12kKRG3.WkDYPOBHxlI7F7m.1us5RjbzApV9Htq8v4OjO', 0),
(125, '121212', 'pepas31@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$dHSZlXWKGtTui2ttxCHJWOJqjGX.p./6feX2gq7OgxZ5HbyyR0F5u', 0),
(126, '121212', 'pepa12s31@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$kqIvbMjWZ9GOkJ7qg.KA.uuBkRVIYSU/OMjt6J12y82BTGrtjIj..', 0),
(127, '121212', 'pe1pa12s31@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$4QXwaw4mIvBPLKMvRCd6Hu5kGZTMJ.F5/ZxqQM2Io4AH863kdO4iq', 0),
(128, '121212', 'pe111pa12s3x1@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$S9uaV5RlAhuolHr24RaSeesTdYnKG5pFmmRVL/Vscxi.R7ulGbvNC', 0),
(129, '111', 'p1111111epe@gmail.omsww', '111', '111', '0001-11-11', '11', 'Masculino', '$2a$10$Bg6idB0SpNTTQaFM5A0Sn.sVwdO.XvHwxTgJ9AyII3AqJa/GxQZUu', 0),
(130, '11', 'pepexxxxxxz@gmail.omsww', '111', '111', '0001-11-11', '1', 'Masculino', '$2a$10$gNhOmzAVZU4iS0Wz916ND.zs3Xy/b1YwnORkPjQ/5xDdPuuc9aOGO', 0),
(131, '111', 'pepxzzxe@gmail.omsww', '21', '111', '0011-11-11', '11', 'Masculino', '$2a$10$PDsdMpMnic4tfi/7BHJ/.eHp5JgfO/jiVAjj3UxojvzWsH8C5DWJa', 0),
(132, 'nnn', 'pep121212121e@gmail.omsww', 'nnnnn', 'nnn', '0001-11-11', '1111', 'Femenino', '$2a$10$WIvao9lfh0n.OdNNo1b3fe3SkafyUn0Ur7ow/JrCNJxjPzYBkOOfW', 0),
(133, '111111', 'pepessss@gmail.omsww', 'skmmmkl', 'mlmnbgv', '0001-11-11', '111', 'Masculino', '$2a$10$k3i3P26Ll5jyLI9Bh4cw5eMm8kn1Iky4kFZIf8ZcPCpIv5ZpCm63e', 0),
(134, '121212', 'pepaxs@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$ZMoytlmT5Qma1I7EJQDlTO0uz4HbasJ0JDBFf.56qHmQgNSlo.Cde', 0),
(135, '121212', 'pepaxxs@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$aw75arV/lhDk0lPkoeAvR.YhnQSlx1WOUPwnmu2cB/dav1PFBxhz2', 0),
(136, '121212', 'pepaxzxs@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$BOFJ/LwpJj17K4LhUIHvYuHH4jAFInc/ON7QAdFbKtoxStYUfXhTS', 0),
(137, '121212', 'pepzaxzxs@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$LAsOVNeE46ZCJ/0CHlTu.eIRoeCWNqM3gt0gB7/rnLxkwLFNyjD7y', 0),
(138, '121212', 'pepzaxszxs@gmail.omsww', 'Pepe', 'Ce', '2022-02-02', 'Quito', 'Masculino', '$2a$10$Gmjtcyj1cW.IMdJwUeY7.uNFn2muEpBQ0Dk7QXSYQ6OP63BXMNI0y', 0),
(139, '1312', 'keyla@gmail.com', 'Keyla', 'Cruz', '2023-03-09', 'Santa elena', 'Femenino', '$2a$10$qnOeh7JlIbPwuBxVgwSX.ezg7UdEbmH2/67BsaWoIVaIJN6aYcF7u', 0),
(140, '12121', 'danielr@gmail.com', 'Daniel', 'Rosales', '2023-01-03', 'ss', 'Masculino', '$2a$10$9lmoxVGKaJoKGdDnTYTo4uva8xB1zZLjWNoXa.OQnZ3DRLSnwr2F6', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accesos`
--
ALTER TABLE `accesos`
  ADD PRIMARY KEY (`ACC_ID`),
  ADD KEY `fk_idAcc` (`id_rol`);

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id_area`);

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `id_disponibilidad` (`id_disponibilidad`),
  ADD KEY `cita_ibfk_2` (`id_doctor`),
  ADD KEY `idd` (`id_usuario`);

--
-- Indices de la tabla `disponibilidad_cita`
--
ALTER TABLE `disponibilidad_cita`
  ADD PRIMARY KEY (`id_disponibilidad`),
  ADD KEY `id_turno` (`id_turno`);

--
-- Indices de la tabla `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id_doctor`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_area` (`id_area`),
  ADD KEY `id_especialidad` (`id_especialidad`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id_especialidad`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id_receta`),
  ADD KEY `id` (`id_cita`);

--
-- Indices de la tabla `imagen`
--
ALTER TABLE `imagen`
  ADD PRIMARY KEY (`id_imagen`),
  ADD KEY `id_receta` (`id_receta`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `turno`
--
ALTER TABLE `turno`
  ADD PRIMARY KEY (`id_turno`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `user_rol` (`user_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=343;

--
-- AUTO_INCREMENT de la tabla `disponibilidad_cita`
--
ALTER TABLE `disponibilidad_cita`
  MODIFY `id_disponibilidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id_doctor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id_especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id_receta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;

--
-- AUTO_INCREMENT de la tabla `imagen`
--
ALTER TABLE `imagen`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;

--
-- AUTO_INCREMENT de la tabla `turno`
--
ALTER TABLE `turno`
  MODIFY `id_turno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accesos`
--
ALTER TABLE `accesos`
  ADD CONSTRAINT `fk_idAcc` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`id_doctor`) REFERENCES `doctor` (`id_doctor`),
  ADD CONSTRAINT `cita_ibfk_4` FOREIGN KEY (`id_disponibilidad`) REFERENCES `disponibilidad_cita` (`id_disponibilidad`),
  ADD CONSTRAINT `cita_ibfk_5` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `disponibilidad_cita`
--
ALTER TABLE `disponibilidad_cita`
  ADD CONSTRAINT `disponibilidad_cita_ibfk_1` FOREIGN KEY (`id_turno`) REFERENCES `turno` (`id_turno`);

--
-- Filtros para la tabla `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `doctor_ibfk_2` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`),
  ADD CONSTRAINT `doctor_ibfk_3` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_especialidad`);

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`id_cita`) REFERENCES `cita` (`id_cita`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `imagen`
--
ALTER TABLE `imagen`
  ADD CONSTRAINT `imagen_ibfk_1` FOREIGN KEY (`id_receta`) REFERENCES `historial` (`id_receta`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`user_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
