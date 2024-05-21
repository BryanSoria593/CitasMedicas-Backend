const { response } = require('express')
const { connection } = require('../database/database')

const newCite = async (req, res = response) => {
    const { fecha, id_usuario, id_doctor, id_disponibilidad } = req.body
    try {
        const newCite = {
            fecha,
            "estado": "Pendiente",
            id_usuario,
            id_doctor,
            id_disponibilidad
        }

        const query = `INSERT INTO cita SET ?`
        const [rows] = await connection.query(query, newCite)

        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo registrar la cita'
            })
        }
        return res.json({
            ok: true,
            msg: 'Cita registrada correctamente',
        })

    } catch {
        res.status(401).json({
            ok: false,
            msg: 'Hubo un error inesperado, vuelva a intentarlo'
        })
    }
}

const getCitesByPatient = async (req, res = response) => {
    try {
        const { id_usuario, user_rol } = req.body
        const USU = user_rol === 1 ? 'USU' : 'USU2'

        const query = ` 
            SELECT
            CI.id_cita, date_format(CI.fecha, "%d-%m-%Y") AS fecha,CI.estado AS estado,
            CI.id_disponibilidad AS turno, concat_ws(' ', USU.nombres, USU.apellidos) as doctor ,
            concat_ws(' ', USU2.nombres, USU2.apellidos) as paciente , concat_ws(' - ', date_format(TUR.hora_inicio,'%H:%i'),
            date_format(TUR.hora_final,'%H:%i')) as hora, ARE.nombre AS area
            FROM
                cita CI
            INNER JOIN 
                doctor DOC on CI.id_doctor = DOC.id_doctor
            INNER JOIN 
                area ARE on DOC.id_area = ARE.id_area
            INNER JOIN 
                usuario USU on DOC.id_usuario = USU.id_usuario
            INNER JOIN 
                usuario USU2 ON CI.id_usuario = USU2.id_usuario
            INNER JOIN 
                disponibilidad_cita DIS on CI.id_disponibilidad = DIS.id_disponibilidad
            INNER JOIN 
                turno TUR on DIS.id_turno = TUR.id_turno
            where ${USU}.id_usuario = ?
            order by CI.id_cita desc
        `
        const [rows] = await connection.query(query, [id_usuario])

        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo obtener las citas'
            })
        }
        if (rows.length < 1) {
            return res.status(200).json({
                ok: true,
                citas: [],
                msg: 'No se encontraron citas'
            })
        }
        return res.json({
            ok: true,
            msg: 'Citas obtenidas correctamente',
            citas: rows
        })
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado, vuelva a intentarlo'
        })
    }
}

const getCite = async (req, res = response) => {
    const { id } = req.params
    try {
        const query = `
            SELECT
                CI.id_cita, CI.fecha AS fecha, CI.estado AS estado, CI.id_disponibilidad AS turno, 
                USU.nombres AS nombreDoc, USU.apellidos AS apellidoDoc,
                USU2.nombres AS nombreUsu, USU2.apellidos apellidoUsu,
                date_format(TUR.hora_inicio,'%H:%i') as horaInicial, 
                date_format(TUR.hora_final,'%H:%i') as horaFinal, ARE.nombre AS area
            FROM
                cita CI
            INNER JOIN 
                doctor DOC on CI.id_doctor = DOC.id_doctor
            INNER JOIN 
                area ARE on DOC.id_area = ARE.id_area
            INNER JOIN 
                usuario USU on DOC.id_usuario = USU.id_usuario
            INNER JOIN 
                usuario USU2 ON CI.id_usuario = USU2.id_usuario
            INNER JOIN 
                disponibilidad_cita DIS on CI.id_disponibilidad = DIS.id_disponibilidad
            INNER JOIN 
                turno TUR on DIS.id_turno = TUR.id_turno
            WHERE CI.id_cita = ?
        `
        const [rows] = await connection.query(query, id)
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo obtener la cita'
            })
        }
        if (rows.length < 1) {
            return res.status(400).json({
                ok: true,
                cita: [],
                msg: 'No se encontraron citas'
            })
        }
        return res.json({
            ok: true,
            msg: 'Cita obtenida correctamente',
            cita: rows
        })
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado, vuelva a intentarlo'
        })
    }
}

const updateCite = async (req, res = response) => {
    const { id_cita, fecha, id_disponibilidad } = req.body
    try {
        const query = `
            UPDATE cita SET fecha=?, id_disponibilidad=? WHERE id_cita=?
        `
        const [rows] = await connection.query(query, [fecha, id_disponibilidad, id_cita])

        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo actualizar la cita'
            })
        }
        if (rows.affectedRows < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No se existe esa cita'
            })
        }
        return res.json({
            ok: true,
            msg: 'Cita actualizada correctamente',
        })
    } catch {
        res.status(500).json({
            ok: false,
            msg: error
        })
    }
}

const deleteCite = async (req, res = response) => {
    const { id } = req.params

    try {
        const query = `
            UPDATE cita CI SET estado = 'Cancelada'
            WHERE CI.id_cita = ?
        `
        const [rows] = await connection.query(query, id)
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo cancelar la cita'
            })
        }
        if (rows.affectedRows < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo cancelar la cita'
            })
        }
        return res.json({
            ok: true,
            msg: 'Cita cancelada correctamente'
        })

    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado, vuelva a intentarlo'
        })
    }

}

const getCitesByPending = async (req, res = response) => {
    const { id_usuario, user_rol } = req.body
    const USU = user_rol === 1 ? 'USU' : 'USU2'

    try {
        const query = `
            SELECT 
                CI.id_cita, 
                date_format(CI.fecha, "%Y-%m-%d") as fecha,CI.estado, CI.id_disponibilidad AS turno,
                concat_ws(' ', USU.nombres, USU.apellidos) as doctor ,
                concat_ws(' ', USU2.nombres, USU2.apellidos) as paciente,
                USU2.cedula as dni,
                CI.id_usuario,
                CI.id_doctor,
                date_format(TUR.hora_inicio,'%H:%i') as hora_inicio,
                date_format(TUR.hora_final,'%H:%i') as hora_final,
                ARE.nombre AS area
            FROM
                cita CI 
            INNER JOIN 
                doctor DOC on CI.id_doctor = DOC.id_doctor 
            INNER JOIN 
                area ARE on DOC.id_area = ARE.id_area 
            INNER JOIN 
                usuario USU on DOC.id_usuario = USU.id_usuario 
            INNER JOIN 
                usuario USU2 ON CI.id_usuario = USU2.id_usuario 
            INNER JOIN 
                disponibilidad_cita DIS on CI.id_disponibilidad = DIS.id_disponibilidad 
            INNER JOIN 
                turno TUR on DIS.id_turno = TUR.id_turno 
            where ${USU}.id_usuario = ? AND CI.estado = 'Pendiente'
            order by CI.id_cita desc
        `
        const [rows] = await connection.query(query, id_usuario)
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo obtener las citas'
            })
        }
        if (rows.length < 1) {
            return res.status(200).json({
                ok: true,
                citas: [],
                msg: 'No tiene citas pendientes.'
            })
        }
        return res.json({
            ok: true,
            citas: rows
        })

    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado, vuelva a intentarlo',
        })
    }
}

const getAssistedCites = async (req, res = response) => {
    const { id_usuario, user_rol } = req.body
    const USU = user_rol === 1 ? 'USU' : 'USU2'
    try {
        const query = `
            SELECT 
                CI.id_cita, date_format(CI.fecha, "%Y-%m-%d") AS fecha,CI.estado AS estado,
                CI.id_disponibilidad AS turno, concat_ws(' ', USU.nombres, USU.apellidos) as doctor ,
                concat_ws(' ', USU2.nombres, USU2.apellidos) as paciente, USU2.cedula as dni,
                CI.id_usuario, CI.id_doctor, date_format(TUR.hora_inicio,'%H:%i') as hora_inicio,
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
                usuario USU2 ON CI.id_usuario = USU2.id_usuario 
            INNER JOIN 
                disponibilidad_cita DIS on CI.id_disponibilidad = DIS.id_disponibilidad 
            INNER JOIN 
                turno TUR on DIS.id_turno = TUR.id_turno 
            where ${USU}.id_usuario = ? AND CI.estado = 'Asistida'
        `
        const [rows] = await connection.query(query, id_usuario)
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo obtener las citas'
            })
        }
        if (rows.length < 1) {
            return res.status(400).json({
                ok: true,
                citas: [],
                msg: 'No tiene citas asistidas.'
            })
        }
        return res.json({
            ok: true,
            citas: rows
        })
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado, vuelva a intentarlo'
        })
    }
}

module.exports = {
    newCite,
    getCitesByPatient,
    getCite,
    deleteCite,
    getCitesByPending,
    getAssistedCites,
    updateCite
}