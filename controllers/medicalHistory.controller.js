const { response } = require('express')
const { connection } = require('../database/database')
const { getImagesByHistorial } = require('./image.controller')

const updateStatusOfCite = async (id_cita) => {
    try {
        const queryUpdate = `UPDATE cita SET estado='Asistida' WHERE id_cita = ?`
        const [rowsUpdate] = await connection.query(queryUpdate, id_cita)

        if (!rowsUpdate) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo actualizar el estado de la cita'
            })
        }
        if (rowsUpdate.affectedRows < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo actualizar el estado de la cita'
            })
        }
        return {
            ok: true,
            msg: 'Estado de la cita actualizado correctamente'
        }
    } catch {
        res.status(401).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }
}

const registerMedicamentByCite = async (req, res = response) => {
    try {
        const { id_cita, extraInfo } = req.body
        const query = `INSERT INTO historial (extra_info, id_cita) VALUES (?, ?)`
        const [historialResult] = await connection.query(query, [extraInfo, id_cita])
        // Obtener el id del historial registrado para insertar los medicamentos e imagenes
        const idHistorial = historialResult.insertId
        if (!historialResult) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo registrar el historial'
            })
        }
        // Insertar información en la tabla medicamento
        for (const medicamento of req.body.medicaments) {
            await connection.query('INSERT INTO medicamento (id_historial, medicamento, indicacion) VALUES (?, ?, ?)', [idHistorial, medicamento.medicament, medicamento.instruction])
        }
        // Insertar imagenes
        for (const image of req.body.images) {
            await connection.query('INSERT INTO imagen (id_historial, nombre, url) VALUES (?, ?, ?)', [idHistorial, image.name, image.url])
        }
        // Actualizar el estado de la cita de Pendiente a 'Asistido'
        await updateStatusOfCite(id_cita)
        return res.status(200).json({
            ok: true,
            msg: 'Medicamentos registrados correctamente'
        })
    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado al registrar medicamentos',
        })
    }
}

const getHistorialByCite = async (req, res = response) => {
    try {
        const { idCite } = req.body
        const query = `
            SELECT 
                HI.extra_info, HI.fecha_atencion FROM historial HI 
            INNER JOIN 
                cita CI on HI.id_cita = CI.id_cita 
            WHERE HI.id_cita = ?
        `
        const [extraInfo] = await connection.query(query, idCite)

        if (!extraInfo) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo obtener el historial'
            })
        }
        const medicaments = await getMedicamentsByHistorial(idCite)
        const images = await getImagesByHistorial(idCite)

        return res.status(200).json({
            ok: true,
            history: {
                info: extraInfo[0],
                medicaments,
                images
            }
        })
    } catch {
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado al obtener datos del historial',
        })
    }
}

const getMedicamentsByHistorial = async (idCite) => {
    try {
        const query = `
            SELECT 
                ME.id_medicamento, ME.medicamento, ME.indicacion
            FROM 
                historial
            INNER JOIN
                medicamento ME on historial.id_historial = ME.id_historial
            WHERE id_cita = ?
        `
        const [medicaments] = await connection.query(query, idCite)

        if (!medicaments) {
            return {
                ok: false,
                msg: 'No se pudo obtener los medicamentos'
            }
        }
        return medicaments
    } catch {
        return {
            ok: false,
            msg: 'Ha ocurrido un error inesperado al obtener los medicamentos',
        }
    }
}

module.exports = {
    getHistorialByCite,
    registerMedicamentByCite
}