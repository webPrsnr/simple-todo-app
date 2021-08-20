class Model {
	constructor() {
		this.todos = []		
	}
	
	addTodo(title) {
		const todo = {
			id : this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
			title : title,
			done: false
		}
		this.todos.push(todo)
	}

	editTodo(id, title) {
		this.todos.forEach((el)=> el.id === id ? el.title = title : el)
	}

	deleteTodo(id) {
		this.todos.forEach((el) => el.id === id ? this.todos.splice(el.id - 1, 1) : el)
	}

	toggleTodo(id){
		this.todos.forEach((el)=> el.id === id ? el.done = !el.done : el)
	}
}

class View {
	constructor() {
		this.app = this.getElement('#root')

		//title
		this.title = this.createElement('h1')
		this.title.textContent = 'Todos'

		//form
		this.form = this.createElement('form')

		this.input = this.createElement('input')
		this.input.type = 'text'
		this.input.placeholder = 'Add todo'
		this.input.name = 'todo'	

		this.submitButton = this.createElement('button')
		this.submitButton.textContent = 'Submit'

		this.todoList = this.createElement('ul', 'todo-list')

		this.form.append(this.input, this.submitButton)

		this.app.append(this.title, this.form, this.todoList)
	}

	createElement(tag, className) {
		const element = document.createElement(tag)
		if (className) element.classList.add(className)
		return element
	}

	getElement(selector) {
		const element = document.querySelector(selector)
		return element
	}
}

class Controller {
	constructor(model, view) {
		this.model = model
		this.view = view
	}
}

const app = new Controller(new Model(), new View())

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    app: app
  }
}
