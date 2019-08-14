const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());


app.use(express.urlencoded({ 
    extended: true})
);

//LIB LOGS
app.use(morgan('dev'))
// INSTANCIA AS ROTAS DA APLICAÇÃO
app.use(require('./routes'));
app.listen(3000);