let express = require('express')
let bodyParser = require('body-parser')
let todoController = require('./controllers/todoController')

let app = express()

// // set up template engine
app.set('view engine', 'ejs')

// // static files
app.use(express.static('./public'))

// parsing JSONs
app.use(bodyParser.json())

// Allowing all CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'),
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	)
	next()
})

// fire controllers
todoController(app)

// listen to port
app.listen(8080)
console.log('Listening on :8080')
