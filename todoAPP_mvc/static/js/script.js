// Tnx 2 Tania Rascia
// https://www.taniarascia.com/

// https://www.taniarascia.com/javascript-mvc-todo-app

// Model
// =====================================================================================================================
// Let's focus on the model first, as it's the simplest of the three parts.
//It doesn't involve any events or DOM manipulation. It's just storing and modifying data.
// =====================================================================================================================
/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {
    constructor() {
        this.todos = JSON.parse(window.localStorage.getItem('todos')) || []
    }

    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback
    }

    _commit(todos) {
        this.onTodoListChanged(todos)
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    addTodo(todoText) {
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: todoText,
            complete: false,
        }

        this.todos.push(todo)

        this._commit(this.todos)
    }

    editTodo(id, updatedText) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { id: todo.id, text: updatedText, complete: todo.complete } : todo
        )

        this._commit(this.todos)
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)

        this._commit(this.todos)
    }

    // set to complete a ACTION
    toggleTodo(id) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo
        )

        this._commit(this.todos)
    }
}
// View
// =====================================================================================================================
// We're going to create the view by manipulating the DOM - the document object model. 
// Since we're doing this in plain JavaScript without the aid of React's JSX or a templating language, 
// it will be kind of verbose and ugly, but such is the nature of manipulating the DOM directly.
// =====================================================================================================================
// Neither the controller nor the model should know anything about the DOM, HTML elements, CSS, or any of that.Anything relating to it should be in the view.

/**
 * @class View
 *
 * Visual representation of the model.
 */
class View {
    constructor() {
        // The root element
        this.app = this.getElement('#root')
        
        // The form, with a [type="text"] input, and a submit button
        this.form = this.createElement('form')
        
        // text
        this.input = this.createElement('input')
        this.input.type = 'text'
        this.input.placeholder = 'Add todo'
        this.input.name = 'todo'

        // button
        this.submitButton = this.createElement('button')
        this.submitButton.textContent = 'Submit'

        // ADD text and button to FORM
        this.form.append(this.input, this.submitButton)

        // The title of the app
        this.title = this.createElement('h1')
        this.title.textContent = 'Todos'

        // The visual representation of the todo list
        this.todoList = this.createElement('ul', 'todo-list')

        // append FORM to APP
        this.app.append(this.title, this.form, this.todoList)

        this._temporaryTodoText = ''
        this._initLocalListeners()
    }

    get _todoText() {
        return this.input.value
    }

    _resetInput() {
        this.input.value = ''
    }

    // ----------------------------------------------------------
    // Create an element with an optional CSS class
    createElement(tag, className) {
        const element = document.createElement(tag)

        if (className) {
            console.log(`Rx ${className}`)
            const classNames = className.split(" ");
            console.log(`Size ${classNames.length} ${classNames}`)

            // let classe;
            // for (classe in classNames) {
            //     console.log(`\t ${classNames[classe]}`)
            // }

            element.classList.add(...classNames);

        }
 
        // if (className) element.classList.add(className)

        return element
    }

    // Retrieve an element from the DOM
    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }
    // ----------------------------------------------------------

    displayTodos(todos) {
        // Delete all nodes
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild)
        }

        // Show default message
        if (todos.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Nothing to do! Add a task?'
            this.todoList.append(p)
        } else {
            // Create nodes
            todos.forEach(todo => {
                const li = this.createElement('li')
                li.id = todo.id

                const checkbox = this.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.checked = todo.complete

                const span = this.createElement('span')
                span.contentEditable = true
                span.classList.add('editable')

                if (todo.complete) {
                    const strike = this.createElement('s')
                    strike.textContent = todo.text
                    span.append(strike)
                } else {
                    span.textContent = todo.text
                }

                const deleteButton = this.createElement('button', 'delete btn btn-danger')
                // const deleteButton = this.createElement('button', 'delete')
                deleteButton.textContent = 'Delete'
                li.append(checkbox, span, deleteButton)

                // Append nodes
                this.todoList.append(li)
            })
        }

        // Debugging
        console.log(todos)
    }

    _initLocalListeners() {
        this.todoList.addEventListener('input', event => {
            if (event.target.className === 'editable') {
                this._temporaryTodoText = event.target.innerText
            }
        })
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
            console.log(`binDeleteTodo .... ${event.target.className}`)
            // if (event.target.className === 'delete') {
            if (event.target.className.includes('delete') ) {
                const id = parseInt(event.target.parentElement.id)

                handler(id)
            }
        })
    }

    bindEditTodo(handler) {
        this.todoList.addEventListener('focusout', event => {
            if (this._temporaryTodoText) {
                const id = parseInt(event.target.parentElement.id)

                handler(id, this._temporaryTodoText)
                this._temporaryTodoText = ''
            }
        })
    }

    bindToggleTodo(handler) {
        this.todoList.addEventListener('change', event => {
            if (event.target.type === 'checkbox') {
                const id = parseInt(event.target.parentElement.id)

                handler(id)
            }
        })
    }
}


// =====================================================================================================================
// =====================================================================================================================

/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        // Explicit this binding
        this.model.bindTodoListChanged(this.onTodoListChanged)

        this.view.bindAddTodo(this.handleAddTodo)
        this.view.bindEditTodo(this.handleEditTodo)
        this.view.bindDeleteTodo(this.handleDeleteTodo)
        this.view.bindToggleTodo(this.handleToggleTodo)

        // Display initial todos
        this.onTodoListChanged(this.model.todos)
    }

    onTodoListChanged = todos => {
        this.view.displayTodos(todos)
    }


    handleAddTodo = todoText => {
        this.model.addTodo(todoText)
    }

    handleEditTodo = (id, todoText) => {
        this.model.editTodo(id, todoText)
    }

    handleDeleteTodo = id => {
        this.model.deleteTodo(id)
    }

    handleToggleTodo = id => {
        this.model.toggleTodo(id)
    }
}


// =====================================================================================================================
// APP
// =====================================================================================================================
const app = new Controller(new Model(), new View())
