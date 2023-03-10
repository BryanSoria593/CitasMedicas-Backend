const { response } = require('express');
const { connection } = require('../database/database');

const registerMedicament = async (req, res = response) => {
    const { descripcion, id_cita } = req.body;
    try {
        const newMedicament = {
            descripcion,
            id_cita
        }
        const query = `INSERT INTO historial SET ?`;
        const queryUpdate = `UPDATE cita CI SET estado='Asistido' WHERE CI.id_cita = ?`;
        //Insertar nuevo medicamento

        const [rows] = await connection.query(query, newMedicament);
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo registrar el medicamento'
            })
        }
        if (rows.affectedRows < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo registrar el medicamento'
            })
        }
        //Actualizar estado de la cita a asistido
        const [rowsUpdate] = await connection.query(queryUpdate, id_cita);
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
        return res.json({
            ok: true,
            msg: 'Medicamento registrado correctamente',
            rows,
            rowsUpdate
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }
}

const getHistorialByCite = async (req, res = response) => {

    const { id_cita } = req.body;

    try {
        // const connection = getConnection();

        const query = `
            SELECT HI.id_receta, HI.descripcion, HI.id_cita FROM historial HI 
            INNER JOIN cita CI on HI.id_cita = CI.id_cita 
            WHERE CI.id_cita = ? 
        `
        const [rows] = await connection.query(query, id_cita);
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo obtener el historial'
            })
        }
        if (rows.length < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo obtener el historial'
            })
        }
        return res.json({
            ok: true,
            msg: 'Historial obtenido correctamente',
            rows
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado'
        })
    }

}
module.exports = {
    getHistorialByCite,
    registerMedicament
}
