class Model {
	constructor() {
		this.todos = []		
	}

	bindTodoListChanged(callback) {
	  this.onTodoListChanged = callback
	}
	
	addTodo(title) {
		const todo = {
			id : this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
			title : title,
			done: false
		}
		this.todos.push(todo)

		this.onTodoListChanged(this.todos)
	}

	editTodo(id, title) {
		this.todos.forEach((el)=> el.id === id ? el.title = title : el)
	}

	deleteTodo(id) {
		this.todos.forEach((el, index) => el.id === id ? this.todos.splice(index, 1) : el)

		this.onTodoListChanged(this.todos)
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

	get _todoText() {
		return this.input.value
	}

	_resetInput() {
		this.input.value = ''
	}

	displayTodos(todos) {
		// Delete all nodes
		while (this.todoList.firstChild) {
			this.todoList.removeChild(this.todoList.firstChild)
		}

		if(todos.length == 0) {
			const p = this.createElement('p')
			p.textContent = 'Please add a task.'
			this.todoList.append(p)
		} else {
			todos.forEach((el) => {
				const li = this.createElement('li')
				li.id = el.id

				//checkbox
				const checkbox = this.createElement('input')
				checkbox.type = 'checkbox'
				checkbox.checked = el.done

				//span
				const span = this.createElement('span')
				span.contentEditable = true
				span.classList.add('editable')

				//strike
				if (el.done) {
					const strike = this.createElement('s')
					strike.textContent = el.title
					span.append(strike)
				} else {
					span.textContent = el.title
				}

				//delete button
				const deleteButton = this.createElement('button', 'delete') 
				deleteButton.textContent = 'Delete'
				li.append(checkbox, span, deleteButton)

				//append nodes
				this.todoList.append(li)
				
			})
		}
	}

	bindAddTodo(handler) {
	  this.form.addEventListener('submit', event => {
	    event.preventDefault()
	
	    if (this._todoText) {
	      handler(this._todoText)
	      this._resetInput()
	    }
	  })
	}

	bindDeleteTodo(handler) {
		this.todoList.addEventListener('click', event => {
			if (event.target.className === 'delete') {
				const id = parseInt(event.target.parentElement.id)
				handler(id)
			}
			
		})
	}
}

class Controller {
	constructor(model, view) {
		this.model = model
		this.view = view

		this.view.bindAddTodo(this.handleAddTodo)
		this.view.bindDeleteTodo(this.handleDeleteTodo)
		
		//display todos
		this.onTodoListChanged(this.model.todos)

		//model
		this.model.bindTodoListChanged(this.onTodoListChanged)
	}

	onTodoListChanged = (todos) => {
		this.view.displayTodos(todos)
	}

	handleAddTodo = (todoText) => {
		this.model.addTodo(todoText)
	}

	handleDeleteTodo = (id) => {
		this.model.deleteTodo(id)
	}
}

const app = new Controller(new Model(), new View())

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    app: app
  }
}
