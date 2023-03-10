const { response } = require('express');
const { connection } = require('../database/database');

const uploadImage = async (req, res = response) => {
    const { id_receta, url } = req.body;

    const newImage = {
        id_receta,
        url
    }

    try {
        const query = `INSERT INTO imagen SET ?`;
        const [rows] = await connection.query(query, newImage);
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo subir la imagen'
            })
        }
        if (rows.affectedRows < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo subir la imagen'
            })
        }
        return res.json({
            ok: true,
            msg: 'Imagen subida correctamente'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un problema inesperado.'
        })
    }




}
const getImageByHistorial = async (req, res = response) => {
    const { id_receta } = req.body;

    try {

        const query = `
            SELECT IMA.id_imagen, IMA.id_receta, IMA.url FROM imagen IMA 
            INNER JOIN historial HI on IMA.id_receta = HI.id_receta 
            where IMA.id_receta = ? 
        `
        const [rows] = await connection.query(query, id_receta);
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo obtener la imagen'
            })
        }
        if (rows.length < 1) {
            return res.status(400).json({
                ok: false,
                msg: 'No existen imágenes en esta receta.'
            })
        }
        return res.json({
            ok: true,
            data: rows
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un problema inesperado."
        })
    }


}
module.exports = {
    uploadImage,
    getImageByHistorial
}