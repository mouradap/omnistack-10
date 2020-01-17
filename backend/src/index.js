const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const http = require('http');
const { setupWebSocket } = require('./websocket')

const routes = require('./routes')

mongoose.connect('mongodb+srv://omnistack:omnistack2020@cluster0-wkjr2.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors({ origin: 'http://localhost:3000'}))

app.use(express.json());
const server = http.Server(app);

setupWebSocket(server);



//Deve-se informar ao express que os dados deverão ser tratados como json para que possam ser interpretados corretamente.

//Métodos HTTP: get, post, put, delete (Métodos do app)

//Tipos de parâmetros
//Query Params: request.query (Filtros, ordenação, paginação, etc)
//Router Params: request.params (Identificar um recurso na alteração ou remoção)
//Body Params: request.body (Dados para criação/Alteração de um registro)



//MongoDB: Banco não relacional

app.use(routes);

server.listen(3333);
