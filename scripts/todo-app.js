class Model {
	constructor() {
		this.todos = [
			{id:1, title:'Find work', done:false},
			{id:2, title:'Make dinner', done:false}
		]		
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
