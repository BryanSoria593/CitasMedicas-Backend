SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

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
(1, 0, 'Agendar cita', 'paciente/agendar', 'fa-solid fa-eye'),
(2, 0, 'Citas pendientes', 'paciente/pendientes', 'fa-solid fa-list-check'),
(3, 1, 'Dashboard', 'doctor/dashboard', 'fa-solid fa-chart-line'),
(5, 0, 'Historial clínico', 'paciente/historial', 'fa-solid fa-laptop-medical'),
(6, 1, 'Citas atendidas', 'doctor/atendidos', 'fa-solid fa-clipboard-check');

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
(4, 'General', 'https://res.cloudinary.com/xxbasmxx/image/upload/v1692669486/optionsAppCites/general_ql7jq8.png');

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
(443, '2024-05-13', 'Asistida', 144, 63, 1),
(444, '2024-05-14', 'Asistida', 144, 63, 1),
(445, '2024-05-13', 'Asistida', 144, 63, 2),
(446, '2024-05-22', 'Cancelada', 144, 63, 22),
(447, '2024-05-14', 'Asistida', 144, 63, 2),
(448, '2024-05-14', 'Pendiente', 144, 63, 3);

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
(62, 1, 146, 3, 3),
(63, 1, 145, 1, 1),
(64, 1, 147, 2, 2),
(65, 1, 148, 4, 4),
(66, 1, 149, 4, 4),
(67, 1, 150, 2, 2),
(68, 1, 151, 1, 1);

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
  `id_historial` int(11) NOT NULL,
  `extra_info` varchar(300) DEFAULT NULL,
  `id_cita` int(11) NOT NULL,
  `fecha_atencion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`id_historial`, `extra_info`, `id_cita`, `fecha_atencion`) VALUES
(2014, 'Tener en cuenta para la próxima cita', 443, '2024-05-13 22:45:14'),
(2015, '', 445, '2024-05-14 00:44:35'),
(2016, '', 444, '2024-05-14 00:46:32'),
(2017, '', 447, '2024-05-14 00:48:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen`
--

CREATE TABLE `imagen` (
  `id_imagen` int(11) NOT NULL,
  `id_historial` int(11) DEFAULT NULL,
  `nombre` varchar(150) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagen`
--

INSERT INTO `imagen` (`id_imagen`, `id_historial`, `nombre`, `url`) VALUES
(31, 2014, 'descarga.jpeg', 'https://res.cloudinary.com/xxbasmxx/image/upload/v1715658314/imagenes/jz4zvfmdjvkjzej6qgmh.jpg'),
(32, 2014, 'X-ray-broken-arm-400x534_1.jpg', 'https://res.cloudinary.com/xxbasmxx/image/upload/v1715658314/imagenes/hzof2xeayptosrcgydgz.jpg'),
(33, 2015, 'X-ray-broken-arm-400x534_1.jpg', 'https://res.cloudinary.com/xxbasmxx/image/upload/v1715665475/imagenes/rkm60a0jndypc2ii5o46.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamento`
--

CREATE TABLE `medicamento` (
  `id_medicamento` int(11) NOT NULL,
  `id_historial` int(11) DEFAULT NULL,
  `medicamento` varchar(100) DEFAULT NULL,
  `indicacion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `medicamento`
--

INSERT INTO `medicamento` (`id_medicamento`, `id_historial`, `medicamento`, `indicacion`) VALUES
(46, 2014, 'Paracetamol', 'Tomar cada 8 horas'),
(47, 2014, 'Analgan', 'Tomar después de cada comida'),
(48, 2015, 'Ibuprofeno', 'Tomar después de cada comiad'),
(49, 2016, 'Paracetamol', 'tomar cada 12 horas'),
(50, 2017, 'Ibuprofeno', 'Tomar después de 8 horas');

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
(144, '2450110859', 'zansoriam@gmail.com', 'Bryan', 'Soria méndez', '2002-02-14', 'Quito', 'Masculino', '$2a$10$RVtYl1XB1zkpPO3OpJMAPu1ZhJNjwbkLxVDjs1qbGtvE6gEo0Ea.S', 0),
(145, '3531221961', 'juanperez@gmail.com', 'Juan', 'Pérez Torres', '1991-03-11', 'Guayaquil', 'Masculino', '$2a$10$Sm.VVPkGv5nkFS/rK0upruUqIP/tKtYWiKkmFSp06RN4Xg3HJiDAG', 1),
(146, '3531221961', 'camilasanchez@gmail.com', 'Camila', 'Sánchez Castro', '1985-06-01', 'Guayaquil', 'Femenino', '$2a$10$QiFhP8T82efc1Xq3XiPtvO2rw2iTRz2fUI2ScU4sO/7oqcUO2NRYS', 1),
(147, '4132145521', 'danielrosales@gmail.com', 'Daniel', 'Rosales Borbor', '1985-01-04', 'Guayaquil', 'Masculino', '$2a$10$K0P6XLsMNZ8NphPmuE0hAeZecW.ZG6MIygvo.n4xBic6I/KbuuKXq', 1),
(148, '4140203816', 'juancastillo@gmail.com', 'Juan', 'Castillo Pérez', '1990-07-15', 'Quito', 'Masculino', '$2a$10$vlYdeQCIsqs4iqDJKM5xUec5B9OQ9dhCKEZVUwZS6pbEkUcnyEPRK', 1),
(149, '0928704285', 'pedro_martinez@hotmail.com', 'Pedro', 'Martínez Gómez', '1983-03-22', 'Cuenca', 'Masculino', '$2a$10$.VXx8HnIdP0Lz2cHuc2S4e3MKYXGB/NZaFnHsttC.ztAIvU765ayi', 1),
(150, '1104876193', 'mariarodriguez@yahoo.com', 'María', 'Rodríguez López', '1988-12-10', 'Guayaquil', 'Femenino', '$2a$10$dAPwWXQCthVgONF60x9ohO59RjCD8JOc7CprOeCPerAZkqzuO6wMe', 1),
(151, '0907654321', 'lauragonzalez@example.com', 'Laura', 'González Ramírez', '1992-06-18', 'Quito', 'Femenino', '$2a$10$Hau22rlyYyDVCX09S8V0KueMNNRQC2Gy72NKw0YSEL6FgdPW4OoR6', 1);

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
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `id` (`id_cita`);

--
-- Indices de la tabla `imagen`
--
ALTER TABLE `imagen`
  ADD PRIMARY KEY (`id_imagen`),
  ADD KEY `id_historial` (`id_historial`);

--
-- Indices de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD PRIMARY KEY (`id_medicamento`),
  ADD KEY `id_historial` (`id_historial`);

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
-- AUTO_INCREMENT de la tabla `accesos`
--
ALTER TABLE `accesos`
  MODIFY `ACC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=449;

--
-- AUTO_INCREMENT de la tabla `disponibilidad_cita`
--
ALTER TABLE `disponibilidad_cita`
  MODIFY `id_disponibilidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id_doctor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id_especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2018;

--
-- AUTO_INCREMENT de la tabla `imagen`
--
ALTER TABLE `imagen`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  MODIFY `id_medicamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `turno`
--
ALTER TABLE `turno`
  MODIFY `id_turno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

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
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`id_cita`) REFERENCES `cita` (`id_cita`);

--
-- Filtros para la tabla `imagen`
--
ALTER TABLE `imagen`
  ADD CONSTRAINT `imagen_ibfk_1` FOREIGN KEY (`id_historial`) REFERENCES `historial` (`id_historial`);

--
-- Filtros para la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD CONSTRAINT `medicamento_ibfk_1` FOREIGN KEY (`id_historial`) REFERENCES `historial` (`id_historial`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`user_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
