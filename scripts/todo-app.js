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
