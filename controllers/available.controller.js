const { response } = require('express')
const { connection } = require('../database/database')

const getEspecialidad = async (req, res = response) => {

    try {
        const [rows] = await connection.query('SELECT * FROM area')
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay especialidades'
            })
        }
        if (rows.length < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay especialidades'
            })
        }
        return res.json({
            ok: true,
            data: rows
        })

    } catch {
        res.status(401).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const getTurnos = async (req, res = response) => {
    try {
        const { date, id_doctor } = req.body

        const citasQuery = `
            SELECT DISTINCT id_disponibilidad
            FROM cita
            INNER JOIN doctor doc ON cita.id_doctor = doc.id_doctor
            WHERE fecha = ? AND doc.id_doctor = ?
        `
        const [citasRows] = await connection.query(citasQuery, [date, id_doctor])

        // Obtener las id_disponibilidad ocupadas para hoy
        const citasIds = citasRows.map(cita => cita.id_disponibilidad)

        // Consultar la tabla disponibilidad_cita para obtener las disponibilidades no ocupadas
        let disponibilidadesQuery = `
            SELECT DC.id_disponibilidad, TU.id_turno, DATE_FORMAT(TU.hora_inicio, '%H:%i') as hora_inicio, DATE_FORMAT(TU.hora_final, '%H:%i') as hora_final
            FROM disponibilidad_cita DC
            INNER JOIN turno TU ON DC.id_turno = TU.id_turno
        `

        if (citasIds.length > 0) {
            disponibilidadesQuery += `
                WHERE DC.id_disponibilidad NOT IN (${citasIds.join(',')})
            `
        }

        const [disponibilidadesRows] = await connection.query(disponibilidadesQuery)

        if (disponibilidadesRows.length < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay turnos disponibles para hoy'
            })
        }

        return res.json({
            ok: true,
            data: disponibilidadesRows
        })
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


module.exports = {
    getEspecialidad,
    getTurnos
}