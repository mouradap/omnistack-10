const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();


routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.delete('/devs', DevController.destroy);
routes.put('/devs', DevController.update);
//routes.get('/devs', DevController.show);
//Aparentemente só dá pra ter um routes.get de um mesmo arquivo/controle. Cancelando o index, funciona.
//Pode ser resolvido criando um novo controller apenas para o show.

routes.get('/search', SearchController.index);

module.exports = routes;