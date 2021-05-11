const express = require('express');
const router = express.Router();
const {renderTemplate, updateTasksCard} = require('../../utils/ui');
const {todoCard} = require('../../utils/ui');
const {createTasksCard} = require('../../utils/ui');
const {TodoStore} = require('../../model/todo/todo');
const {Todo} = require('../../model/todo/todo')
const config = require('../../config/config');
const {formatDate} = require('../../utils/formatUtils');
let todoStore = new TodoStore();

if(config.usefake){
    let fakeTodo1 = new Todo(4132, 'Create Site', Date.now(), 'work', 'Create the website');
    let fakeTodo2 = new Todo(3432, 'Wash', Date.now(), 'cooking', 'Wash the utensils');
    todoStore.addTodo(fakeTodo1);
    todoStore.addTodo(fakeTodo2);

}

router.get('/', (req, res) => {
    const todos = todoStore.getTodos();
    if(req.accepts('text/html')){
        let htmlFrag = '';
        for (todo of todos) {
            let date = new Date(todo.date)
            date = `${date.toDateString()}`
            htmlFrag += `
            <tr>
                <th scope="row">${todos.indexOf(todo) + 1}</th>
                <td>${todo.title}</td>
                <td>${date}</td>
                <td>${todo.type}</td>
                <td>${todo.description}</td>
                <td><form action = "/todos/${todo.id}?_method=DELETE" method="POST"><input class="btn btn-danger" type="submit" value="Delete"></form></td>
                <td><a href="/todos/update-task/${todo.id}"><button class="btn btn-warning">Edit</button></a></td>
            </tr>       
            `
        }
    
        return res.send(renderTemplate(todoCard(htmlFrag)))
    }
    else{
        todos.forEach(todo =>{
            todo.date = (new Date(todo.date)).toDateString();
        })
        let response = {
            code: 'success',
            message: 'request successful',
            result: {
                todos: todos
            }
        }
        return res.send(response);
    }
})

router.get('/create-task', (req, res) => {

    res.send(renderTemplate(createTasksCard()));
})

router.get('/update-task/:id', (req, res) => {
    const todo = todoStore.getTodo(req.params.id)
    if(!todo) return res.status(404).end()
    res.send(renderTemplate(updateTasksCard(
        req.params.id,
        todo.title, 
        formatDate(new Date(todo.date)), 
        todo.type, 
        todo.description))
    );
})

router.put('/:id', (req, res) =>{
    const newTodo = new Todo(
        req.params.id,
        req.body.title,
        req.body.date,
        req.body.type,
        req.body.description
    );
    todoStore.editTodo(req.params.id, newTodo);
    return res.redirect('/')
})

router.post('/', (req, res) =>{
    console.log("Creating..");
    let todo = new Todo(
        Date.now(), 
        req.body.title, 
        Date.parse(req.body.date),
        req.body.type,
        req.body.description
    )
    todoStore.addTodo(todo);
    if(req.accepts('text/html')){
        // if request is made by browser
        return res.redirect('/')
    }else{
        // if request is made by application
        let response = {
            code: "success",
            message: "resource created successfully!",
            result: {
                todos: todoStore.getTodos()
            }
        }

        return res.send(response);
    }
    
    // res.send('Ok')
})


router.delete('/:id', (req, res) =>{
    let response;
    let todoId = parseInt(req.params.id);
    let todoObject = todoStore.getTodo(todoId);
    if(todoObject != null){
        todoStore.deleteTodo(todoObject)
        if(req.accepts('text/html')){
            return res.redirect('/');
        }
        else{
            response = {
                code: 'success',
                message: 'resource deleted successfully',
                result: {
                    todos: todoStore.getTodos()
                }
            }

            return res.send(response);
        }
        
    }
    else {
        response = {
            code: 'failed',
            message: 'resource delete failed',
            result: {
                todos: todoStore.getTodos(),
            }
        }
        return res.status(404).send(response);
    }
})

module.exports = router;