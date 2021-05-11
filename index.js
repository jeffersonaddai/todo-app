const express = require('express');
const app = express();
const indexRoute = require('./app/src/controllers/todo/todo');
const methodOverride = require('method-override');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('', (req, res) =>{
    return res.redirect('/todos')
})
app.use('/todos', indexRoute)


app.listen(3000, ()=>{
    console.log('Server running on port 3000!')
});

