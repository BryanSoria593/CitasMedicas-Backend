const { response } = require('express');
const { connection } = require('../database/database')

const getEspecialidad = async (req, res = response) => {

    try {
        const [rows] = await connection.query('SELECT * FROM area');
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

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const getTurnos = async (req, res = response) => {


    try {
        const query = `
        SELECT id_disponibilidad, TU.id_turno, date_format(TU.hora_inicio,'%H:%i') as hora_inicio,  date_format(TU.hora_final,'%H:%i') as hora_final
        FROM disponibilidad_cita DIS
        INNER JOIN turno TU
        ON DIS.id_turno = TU.id_turno
        `
        const [rows] = await connection.query(query);
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay turnos disponibles'

            })
        }
        if (rows.length < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay turnos disponibles'
            })
        }
        return res.json({
            ok: true,
            data: rows
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getEspecialidad,
    getTurnos
}