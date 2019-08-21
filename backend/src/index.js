const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

//CONECTANDO AO MONGODB
mongoose.connect('mongodb://localhost:27017/upload', {
    useNewUrlParser: true
})
app.use(express.urlencoded({ 
    extended: true})
);

//LIB LOGS
app.use(morgan('dev'))
// INSTANCIA AS ROTAS DA APLICAÇÃO
app.use(require('./routes'));
app.listen(3001);