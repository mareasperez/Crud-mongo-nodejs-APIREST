const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
//conectando a la db :v
mongoose.connect('mongodb://localhost/crud-mongo',{useNewUrlParser: true})
    .then(db =>{
        console.log("db conected");
        
    })
    .catch(e => console.log(e))

//importando rutas
const indexRoutes = require('./routes/index');

// configuraciones
app.set('PORT', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//middleware :v
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))

//rutas
app.use('/', indexRoutes);

//iniciando el server 
app.listen(app.get('PORT'), () => {
    console.log(`Server on port ${app.get('PORT')}`);
});