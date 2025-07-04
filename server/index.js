require('dotenv').config();
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { dbConnect } = require('./utils/db.utils');
const { errorHandler, asyncRouteHandler } = require('./utils/route.utils');

const app = express();

app.use(cors({ maxAge: 3600 }));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
	})
);

dbConnect()
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log('http://localhost:7000/');
		});
	})
	.catch((err) => {
		console.log(err);
		console.log('DB ERROR');
	});
