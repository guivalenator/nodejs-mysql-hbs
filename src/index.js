const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//initiliazations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials') ,
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Global Variables
app.use((req, res, next) => {

    next();
});

//Routes
app.use(require('./routes'))
app.use(require('./routes/authentications'));
app.use('/links',require('./routes/links'));


//Pulic
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'),() =>{
    console.log('Server running on port 3000')
});