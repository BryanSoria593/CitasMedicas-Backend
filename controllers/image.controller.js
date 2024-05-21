const { connection } = require('../database/database')

const getImagesByHistorial = async (idCite) => {
    try {
        const query = `                
            SELECT
                IM.id_imagen, H.id_historial, IM.nombre, IM.url 
            FROM 
                historial H
            INNER JOIN
                imagen IM ON H.id_historial = IM.id_historial
            WHERE H.id_cita = ?
        `
        const [images] = await connection.query(query, idCite)

        if (!images) {
            return {
                ok: false,
                msg: 'No se pudo obtener las imágenes'
            }
        }
        if (images.length < 1) return []
        return images
    } catch {
        return {
            ok: false,
            msg: 'Ha ocurrido un error inesperado al obtener los medicamentos',
        }
    }
}
module.exports = {
    getImagesByHistorial
}