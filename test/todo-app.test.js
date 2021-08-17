const test = require('tape')
const fs = require('fs')
const path = require('path')
const initApp = require('../scripts/todo-app.js')

test ('app `Object` was created', (t) => {
	const app = initApp.app
	t.true((typeof app === 'object'), 'app is Object')
	t.deepEqual(Object.getOwnPropertyNames(app), ['model', 'view'], 'property names of `Object` are `model` and `view`')
	t.end()
})

test('todo `Model` (Object) has desired key', (t) =>{
	const key = Object.keys(initApp.app.model.todos)
	t.deepEqual(key, ['todos'], '`todos` is present')
	t.true(Array.isArray(initApp.app.model.todos), 'app.model.todos is an Array')
	t.end()
})
