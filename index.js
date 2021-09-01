const express = require('express');
const app = express();
const indexRoute = require('./app/src/controllers/todo/todo');
const methodOverride = require('method-override');
const {renderTemplate} = require('./app/src/utils/ui')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('', (req, res) =>{
    return res.redirect('/todos')
})
app.use('/todos', indexRoute)

app.get('*', function(req, res){
    res.status(404).send(renderTemplate('<div class="mx-auto text-center text-danger"><h1>404 resource not found</h1><div>'));
});

app.listen(3000, ()=>{
    console.log('Server running on port 3000!')
});

