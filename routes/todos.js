var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require('../handlers/todos');

const { loginRequired } = require('../middleware/auth');

//router.route('/').get(helpers.getTodos).post(helpers.createTodos);
router.route('/').get(helpers.getTodos);
// router.post('/', loginRequired, helpers.createTodos);
router.route('/').post(loginRequired, helpers.createTodos);

//router.route('/:todoId').get(helpers.getTodo).put(helpers.updateTodo).delete(helpers.deleteTodo);
router.route('/:todoId').get(helpers.getTodo);
router.route('/:todoId').put(loginRequired, helpers.updateTodo).delete(loginRequired, helpers.deleteTodo);

module.exports = router;
