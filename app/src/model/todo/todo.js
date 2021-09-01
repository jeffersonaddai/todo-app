class TodoStore{
    constructor(todos){
        this.todos = [];
    }

    getTodos(){
        return this.todos.slice(0);
    }
    addTodo(todo){
        this.todos.push(todo);
    }

    deleteTodo(todo){
        let foundTodo = this.getTodo(todo.id);
        if(foundTodo !== null){
            this.todos = this.todos.filter(localTodo => {
                return localTodo != foundTodo;
            })
            return true;
        }else{
            return false;
        }

    }

    getTodo(todoId){
        for(let localTodo of this.todos){
            if(todoId == localTodo.id){
                return localTodo;
            }
        }
        return null;
    }

    editTodo(id, todo){
        const foundTodo = this.getTodo(id);
        if(foundTodo){
            foundTodo.title = todo.title;
            foundTodo.type = todo.type;
            foundTodo.date = todo.date;
            foundTodo.description = todo.description;
            return true;
        }

        return false;

    }

}

class Todo{
    constructor(id, title, date, type, description){
        this.id = id;
        this.title = title;
        this.date = date;
        this.type = type;
        this.description = description;
    }
}


module.exports.TodoStore = TodoStore;
module.exports.Todo = Todo;