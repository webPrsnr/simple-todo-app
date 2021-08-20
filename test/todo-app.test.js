const test = require('tape')
const fs = require('fs')
const path = require('path')
const initApp = require('../scripts/todo-app.js')

test ('app `Object` was created', (t) => {
	const app = initApp.app
	t.true((typeof app === 'object'), 'app is Object')
	t.deepEqual(Object.keys(app), ['model', 'view'], 'property names of `Object` are `model` and `view`')
	t.end()
})

test('todo `Model` (Object) has desired key', (t) => {
	const key = Object.keys(initApp.app.model)
	t.deepEqual(key, ['todos'], '`todos` is present')
	t.true(Array.isArray(initApp.app.model.todos), 'app.model.todos is an Array')
	t.end()
})

test('`addTodo` method of `Model`', (t)=>{
	const app = initApp.app.model
	t.equal(app.todos.length, 0, 'initial model.todos.length is 0')
	app.addTodo('Go shopping')
	t.equal(app.todos.length, 1, 'updated model.todos.length is 1')
	const expected = {id:1, title:'Go shopping', done:false}
	t.deepEqual(app.todos[0], expected, 'todo list item added')
	app.todos = []
	t.end()
})

test('`editTodo` method of `Model`', (t) => {
	const app = initApp.app.model
	app.addTodo('Buy milk')
	const expected = {id:1, title:'Buy chocolate', done:false}
	app.editTodo(1, 'Buy chocolate')
	t.deepEqual(app.todos[0], expected, 'todo single item edited')
	app.todos = []
	t.end()	
})

test('`deleteTodo` method of `Model`', (t) => {
	const app = initApp.app.model
	app.addTodo('Buy new laptop')
	t.equal(app.todos.length, 1, '`app.todos.length` is 1')
	app.deleteTodo(1)
	t.equal(app.todos.length, 0, '`deleTodo` method is success')
	app.todos = []
	t.end()
})
