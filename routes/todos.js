var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require('../handlers/todos');

//router.route('/').get(helpers.getTodos).post(helpers.createTodos);
router.route('/').get(helpers.getTodos);
// router.post('/', loginRequired, helpers.createTodos);
router.route('/').post(helpers.createTodo);

//router.route('/:todoId').get(helpers.getTodo).put(helpers.updateTodo).delete(helpers.deleteTodo);
router.route('/:todoId').get(helpers.getTodo);
router.route('/:todoId').put(helpers.updateTodo).delete(helpers.deleteTodo);

module.exports = router;
