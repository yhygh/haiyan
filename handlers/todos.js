var db = require('../models');

exports.getTodos = async function(req, res, next) {
	try {
		let foundTodos = await db.Todo.find();
		return res.status(200).json(foundTodos);
	} catch (err) {
		return next(err);
	}
};

exports.createTodo = async function(req, res, next) {
	console.log(req.body);
	try {
		let newTodo = await db.Todo.create(req.body);
		return res.status(201).json(newTodo);
	} catch (err) {
		return next(err);
	}
};

// /api/todos/:todoId  (this is for potential use in the future)
exports.getTodo = async function(req, res, next) {
	try {
		let foundTodo = await db.Todo.findById(req.params.todoId);
		return res.status(200).json(foundTodo);
	} catch (err) {
		return next(err);
	}
};

// /api/todos/:todoId
// To test:
//    http PUT localhost:4000/api/todos/5f7e1811184d0ae3d572b149 "Authorization:Bearer token" task="updated task"
exports.updateTodo = async function(req, res, next) {
	try {
		let updatedTodo = await db.Todo.findByIdAndUpdate({ _id: req.params.todoId }, req.body, { new: true });
		return res.status(200).json(updatedTodo);
	} catch (err) {
		return next(err);
	}
};

// /api/todos/:todoId
exports.deleteTodo = async function(req, res, next) {
	try {
		let foundTodo = await db.Todo.findByIdAndRemove({ _id: req.params.todoId });
		return res.status(200).json(foundTodo);
	} catch (err) {
		return next(err);
	}
};

module.exports = exports;
