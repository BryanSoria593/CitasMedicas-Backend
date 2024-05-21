const { response } = require('express')
const { connection } = require('../database/database')

const getDoctorsBySpeciality = async (req, res = response) => {
    const { id_area } = req.body
    try {
        const query = `
            SELECT 
                D.id_doctor, D.id_usuario, D.disponibilidad, U.nombres, U.apellidos, U.email,
                E.id_especialidad, E.nombre, A.id_area, A.nombre
            FROM 
                doctor D
            INNER JOIN 
                usuario U ON D.id_usuario = U.id_usuario
            INNER JOIN 
                area A ON D.id_area = A.id_area
            INNER JOIN 
                especialidad E ON D.id_especialidad = E.id_especialidad
            WHERE D.disponibilidad = ? AND D.id_area = ?
                `
        const [rows] = await connection.query(query, [1, id_area])

        if (!rows || rows.length < 1) {
            return res.status(200).json({
                ok: false,
                msg: 'No hay doctores disponibles',
                doctors: []
            })
        }

        return res.status(200).json({
            ok: true,
            doctors: rows
        })
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }
}
const getCitesByDoctor = async (req, res = response) => {
    try {
        const { id_doctor } = req.body
        const query = ` 
            SELECT 
                CI.id_cita, CI.fecha, CI.estado, CI.id_disponibilidad, USU2.nombres AS NombreUsu,
                USU2.apellidos ApellidoUsu, USU2.imagen AS ImagenUsu,
                date_format(TUR.hora_inicio,'%H:%i') as hora_inicio, 
                date_format(TUR.hora_final,'%H:%i') as hora_final, ARE.nombre AS Area
            FROM 
                cita CI 
            INNER JOIN
                doctor DOC on CI.id_doctor = DOC.id_doctor 
            INNER JOIN
                area ARE on DOC.id_area = ARE.id_area 
            INNER JOIN
                usuario USU on DOC.id_usuario = USU.id_usuario 
            INNER JOIN
                usuario USU2 ON ci.id_usuario = USU2.id_usuario 
            INNER JOIN
                disponibilidad_cita DIS on CI.id_disponibilidad = DIS.id_disponibilidad
            INNER JOIN
                turno TUR on DIS.id_turno = TUR.id_turno 
            where USU.id_usuario = ?        
        `
        const [rows] = await connection.query(query, id_doctor)

        if (!rows || rows.length < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay citas disponibles'
            })
        }

        return res.json({
            ok: true,
            data: rows
        })

    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema inesperado.'
        })
    }

}
const getCitesAttendedByDoctor = async (req, res = response) => {
    try {
        const { id_usuario, user_rol } = req.body
        const USU = user_rol === 1 ? 'USU' : 'USU2'
        const query = `
            SELECT 
                CI.id_cita, date_format(CI.fecha, "%Y-%m-%d") AS fecha,CI.estado AS estado,
                CI.id_disponibilidad AS turno,
                concat_ws(' ', USU.nombres, USU.apellidos) as doctor ,
                concat_ws(' ', USU2.nombres, USU2.apellidos) as paciente, USU2.cedula as dni,
                date_format(TUR.hora_inicio,'%H:%i') as hora_inicio,
                date_format(TUR.hora_final,'%H:%i') as hora_final, ARE.nombre AS area
            FROM
                cita CI 
            INNER JOIN
                doctor DOC on CI.id_doctor = DOC.id_doctor 
            INNER JOIN
                area ARE on DOC.id_area = ARE.id_area 
            INNER JOIN
                usuario USU on DOC.id_usuario = USU.id_usuario 
            INNER JOIN
                usuario USU2 ON ci.id_usuario = usu2.id_usuario 
            INNER JOIN
                disponibilidad_cita DIS on CI.id_disponibilidad = DIS.id_disponibilidad 
            INNER JOIN
                turno TUR on DIS.id_turno = TUR.id_turno 
            where ${USU}.id_usuario = ? AND CI.estado = 'Asistida'
        `
        const [rows] = await connection.query(query, id_usuario)

        if (!rows || rows.length < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay citas atendidas'
            })
        }

        return res.json({
            ok: true,
            data: rows
        })
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado, escriba al soporte para más información'
        })
    }
}
module.exports = {
    getDoctorsBySpeciality,
    getCitesByDoctor,
    getCitesAttendedByDoctor
}