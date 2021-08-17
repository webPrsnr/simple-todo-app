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
	t.equal(app.todos.length, 2, 'initial model.todos.length is 2')
	app.addTodo('Go shopping')
	t.equal(app.todos.length, 3, 'updated model.todos.length is 3')
	const expected = {id:3, title:'Go shopping', done:false}
	t.deepEqual(app.todos[2], expected, 'todo list item added')
	t.end()
	
})
