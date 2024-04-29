const models = require('../database/models');
const axios = require('axios');

const saveUser = async (req, res) => {
    try {

        const response = await axios.get('https://randomuser.me/api/');
        const userData = response.data.results[0];

        const photoUrl = userData.picture.large;

        const user = await models.User.create({
            firstName: userData.name.first,
            lastName: userData.name.last,
            email: userData.email,
            photo: photoUrl
        });

        console.log('Usuario agregado a la base de datos:', user.toJSON());
        return res.status(200).json({ user });

    } catch (error) {
        console.error('Error al obtener el usuario del endpoint o agregarlo a la base de datos:', error);
        throw error; // Propagar el error hacia arriba para manejarlo en otro lugar si es necesario
    }
};

const getLastAddedUser = async (req, res) => {
    try {
        // Consultar el último usuario agregado a la base de datos
        const lastUser = await models.User.findOne({
            order: [['createdAt', 'DESC']] // Ordenar por la fecha de creación en orden descendente para obtener el último agregado
        });

        return res.status(200).json({ lastUser });
    } catch (error) {
        console.error('Error al obtener el último usuario agregado:', error);
        throw error; // Propagar el error hacia arriba para manejarlo en otro lugar si es necesario
    }
};

const getUser = async (req, res) => {
    try {
        const users = await models.User.findAll({
            order: [['createdAt', 'DESC']] // Ordenar por la fecha de creación en orden descendente para obtener los usuarios agregados recientemente
        });

        return res.status(200).json({ users });
    } catch (error) {
        console.error('Error al obtener los usuarios agregados:', error);
        throw error; // Propagar el error hacia arriba para manejarlo en otro lugar si es necesario
    }

}

module.exports = {
    saveUser,
    getLastAddedUser,
    getUser
}
