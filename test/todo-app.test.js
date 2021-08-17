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
