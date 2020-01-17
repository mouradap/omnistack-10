const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket')


//Funções de um Controller:
// Index, Show, Store, Update, Destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },


    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({ github_username});

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            // Continuar
        
            // console.log(apiResponse.data);
        
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            // if (!name) {
            //     name = apiResponse.data.login;
            // };
        
        
            console.log(`Developer ${name} signed up.`);
            
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

            //Filtrar as conexões que estão há no máximo 10km de distância e que o novo dev tenha pelo menos 1 das techs filtradas.
            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray,
            )
            sendMessage(sendSocketMessageTo, 'newDev', dev);
        };
         
   
        return response.json(dev);
    },

    async destroy(request, response) {
        const { _id } = request.body;
        let dev = await Dev.deleteOne({ _id });
    
        console.log("One entry deleted.")

        return response.json({message: 'User deleted.'})

    },

    async update(request, response) {
        const { github_username, newName, newTechs, newLatitude, newLongitude } = request.body
        console.log(github_username, newName, newTechs, newLatitude, newLongitude)

        const techsArray = parseStringAsArray(newTechs)

        const newLocation = {
            type: 'Point',
            coordinates: [newLongitude, newLatitude],
        };

        let dev = await Dev.findOneAndUpdate(github_username,
            { "name": newName, "techs": techsArray, "location": newLocation});


        return response.json({message: "placeholder"})
    },

    async show(request, response) {
        const { github_username } = request.query
        const dev = await Dev.find({github_username: github_username})

        console.log(github_username)

        return response.json(dev)
    }
};