let mongoose = require('mongoose')
var ObjectId = require('mongoose').Types.ObjectId

//Connect to the database
// uplus = name, !usertech = password
// Should be in .env but since everybody should be able to work with this test database we'll leave it here.
mongoose.connect('mongodb://uplus:!usertech@ds121716.mlab.com:21716/todo_db')

// Create schema
let todoSchema = new mongoose.Schema({
	name: String,
	isDone: Boolean,
})

let Todo = mongoose.model('Todo', todoSchema)

module.exports = function(app) {
	app.get('/todos', (req, res) => {
		// get dat from db and send JSON back
		Todo.find({}, (err, data) => {
			if (err) throw err
			// res.render('todo', { todos: data })
			res.json(data)
		})
	})

	app.post('/todos', (req, res) => {
		let newTodo = Todo(req.body).save((err, data) => {
			if (err) throw err
			res.json(data)
		})
	})

	app.post('/todo/edit', (req, res) => {
		console.log('req.body', req.body)

		Todo.findOne(
			{
				_id: ObjectId(req.body._id),
			},
			(err, foundObject) => {
				console.log('foundObejct:', foundObject)
				// Mutates object
				err ? res.status(500).send(err) : (foundObject.name = req.body.name)

				// saves found object and responds it back
				foundObject.save((err, updatedObject) => {
					err ? res.status(500).send(err) : res.send(updatedObject)
				})
			},
		)
	})

	app.post('/todo/:todoID', (req, res) => {
		// Find specific todo and change it's property "isDone"
		Todo.findOne(
			{
				_id: ObjectId(req.params.todoID),
			},
			(err, foundObject) => {
				if (err) {
					res.status(500).send()
				} else {
					foundObject.isDone = !foundObject.isDone
				}

				foundObject.save((err, updatedObject) => {
					if (err) {
						res.status(500).send()
					} else {
						res.send(updatedObject)
					}
				})
			},
		)
	})

	app.delete('/todo/:todoID', (req, res) => {
		Todo.findOne(
			{
				_id: ObjectId(req.params.todoID),
			},
			(err, foundObject) => {
				if (err) {
					res.status(500).send()
				} else {
					foundObject.remove((err, data) => {
						if (err) throw err
						res.json(data)
					})
				}
			},
		)
	})
}
