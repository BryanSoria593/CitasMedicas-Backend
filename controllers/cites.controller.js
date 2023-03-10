const { response } = require('express');
const { connection } = require('../database/database');
const newCite = async (req, res = response) => {
    const { fecha, id_usuario, id_doctor, id_disponibilidad } = req.body;
    try {
        const newCite = {
            fecha,
            "estado": "Pendiente",
            id_usuario,
            id_doctor,
            id_disponibilidad
        }

        const query = `INSERT INTO cita SET ?`;
        const [rows] = await connection.query(query, newCite);
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

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Hubo un error inesperado'
        })
    }
}

const getCitesByPatient = async (req, res = response) => {
    const { id_usuario } = req.body;
    try {

        const query = ` 
        SELECT CI.id_cita, 
        date_format(CI.fecha, "%d-%m-%Y") as fecha,CI.estado, CI.id_disponibilidad,
        concat_ws(' ', USU.nombres, USU.apellidos) as doctor ,
        concat_ws(' ', USU2.nombres, USU2.apellidos) as paciente ,
        concat_ws(' - ', date_format(TUR.hora_inicio,'%H:%i') , date_format(TUR.hora_final,'%H:%i')) as hora ,
        ARE.nombre AS area
        FROM cita CI 
        INNER JOIN doctor DOC on CI.id_doctor = DOC.id_doctor
        INNER JOIN area ARE on DOC.id_area = ARE.id_area
        INNER JOIN usuario USU on DOC.id_usuario = USU.id_usuario
        INNER JOIN usuario USU2 ON CI.id_usuario = USU2.id_usuario
        INNER JOIN disponibilidad_cita DIS on CI.id_disponibilidad = DIS.id_disponibilidad
        INNER JOIN turno TUR on DIS.id_turno = TUR.id_turno
        where USU2.id_usuario = ?
        order by ci.id_cita desc

        `
        const [rows] = await connection.query(query, id_usuario);
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo obtener las citas'
            })
        }
        if (rows.length < 1) {

            return res.status(200).json({
                ok: true,
                msg: 'No se encontraron citas'
            })
        }
        return res.json({
            ok: true,
            msg: 'Citas obtenidas correctamente',
            citas: rows
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema inesperado.',
            error
        })
    }

}

const getCite = async (req, res = response) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT CI.id_cita, CI.fecha, CI.estado, CI.id_disponibilidad, USU.nombres AS NombreDoc, USU.apellidos AS ApellidoDoc,
            USU.imagen AS ImagenDoc,USU2.nombres AS NombreUsu, USU2.apellidos ApellidoUsu, USU2.imagen AS ImagenUsu,
            date_format(TUR.hora_inicio,'%H:%i') as hora_inicio,  date_format(TUR.hora_final,'%H:%i') as hora_final, ARE.nombre AS Area
            FROM cita CI
            INNER JOIN doctor DOC on CI.id_doctor = DOC.id_doctor
            INNER JOIN area ARE on DOC.id_area = ARE.id_area
            INNER JOIN usuario USU on DOC.id_usuario = USU.id_usuario
            INNER JOIN usuario USU2 ON CI.id_usuario = USU2.id_usuario
            INNER JOIN disponibilidad_cita DIS on CI.id_disponibilidad = DIS.id_disponibilidad
            INNER JOIN turno TUR on DIS.id_turno = TUR.id_turno
            WHERE CI.id_cita = ?
        `
        const [rows] = await connection.query(query, id);
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo obtener la cita'
            })
        }
        if (rows.length < 1) {
            return res.status(400).json({
                ok: true,
                msg: 'No se encontraron citas'
            })
        }
        return res.json({
            ok: true,
            msg: 'Cita obtenida correctamente',
            cita: rows
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error inesperado'
        })
    }
}

const updateCite = async (req, res = response) => {
    const { id } = req.params;
}

const deleteCite = async (req, res = response) => {
    const { id } = req.params;

    try {
        const query = `
            UPDATE cita CI SET estado = 'Cancelado'
            WHERE CI.id_cita = ?
        
        `;
        const [rows] = await connection.query(query, id);
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

    } catch (error) {

    }

}

const getCitesByPending = async (req, res = response) => {
    const { id_usuario } = req.body;
    try {

        const query = `
            SELECT CI.id_cita, 
            date_format(CI.fecha, "%d-%m-%Y") as fecha,CI.estado, CI.id_disponibilidad,
            concat_ws(' ', USU.nombres, USU.apellidos) as doctor ,
            concat_ws(' ', USU2.nombres, USU2.apellidos) as paciente ,
            concat_ws(' - ', date_format(TUR.hora_inicio,'%H:%i') , date_format(TUR.hora_final,'%H:%i')) as hora ,
            ARE.nombre AS area
            FROM cita CI 
            INNER JOIN doctor DOC on CI.id_doctor = DOC.id_doctor 
            INNER JOIN area ARE on DOC.id_area = ARE.id_area 
            INNER JOIN usuario USU on DOC.id_usuario = USU.id_usuario 
            INNER JOIN usuario USU2 ON CI.id_usuario = USU2.id_usuario 
            INNER JOIN disponibilidad_cita DIS on CI.id_disponibilidad = DIS.id_disponibilidad 
            INNER JOIN turno TUR on DIS.id_turno = TUR.id_turno 
            where USU2.id_usuario = ? AND CI.estado = 'Pendiente'
            order by ci.id_cita desc
        `;
        const [rows] = await connection.query(query, id_usuario);
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo obtener las citas'
            })
        }
        if (rows.length < 1) {
            return res.status(200).json({
                ok: true,
                msg: 'No tiene citas pendientes.'
            })
        }
        return res.json({
            ok: true,
            citas: rows
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado, escriba al soporte para más información',
            error
        })
    }
}

const getAssistedCites = async (req, res = response) => {
    const { id_usuario } = req.body;
    try {

        const query = `
            SELECT CI.id_cita, CI.fecha, CI.estado, CI.id_disponibilidad, 
            USU.nombres AS NombreDoc, USU.apellidos AS ApellidoDoc, USU.imagen AS ImagenDoc,USU2.nombres AS NombreUsu, USU2.apellidos ApellidoUsu, USU2.imagen AS ImagenUsu,date_format(TUR.hora_inicio,'%H:%i') as hora_inicio,  date_format(TUR.hora_final,'%H:%i') as hora_final, ARE.nombre AS Area      
            FROM cita CI 
            INNER JOIN doctor DOC on CI.id_doctor = DOC.id_doctor 
            INNER JOIN area ARE on DOC.id_area = ARE.id_area 
            INNER JOIN usuario USU on DOC.id_usuario = USU.id_usuario 
            INNER JOIN usuario USU2 ON ci.id_usuario = usu2.id_usuario 
            INNER JOIN disponibilidad_cita DIS on CI.id_disponibilidad = DIS.id_disponibilidad 
            INNER JOIN turno TUR on DIS.id_turno = TUR.id_turno 
            where USU2.id_usuario = ? and CI.estado = 'Asistido'
        
        `

        const [rows] = await connection.query(query, id_usuario);
        if (!rows) {
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo obtener las citas'
            })
        }
        if (rows.length < 1) {
            return res.status(400).json({
                ok: true,
                msg: 'No tiene citas asistidas.'
            })
        }
        return res.json({
            ok: true,
            citas: rows
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error inesperado, escriba al soporte para más información'
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
}
