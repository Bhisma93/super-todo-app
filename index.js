const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

const Todo = require('./db');


const expressHbs = require('express-handlebars');

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

const static = express.static;
app.use(static('public'));

// LIST ALL THE TODOS/HOMEPAGE
app.get('/', (req, res) => {
    Todo.getAll()
        .then((data) => {
            console.log(data);
            // res.send(data);
            res.render('homepage', {
                todos: data
            });
        })
        .catch((error) =>{
            console.log(error);
        });
});

// CREATE NEW TODOS

app.get('/new', (req, res) => {
    res.render('todo-create-page');
});

app.post('/new', (req, res) => {
    console.log(req.body);
    // res.send('hey you submitted the form')

    Todo.addOne(req.body.title )
    .then((data) => {
        // console.log(data);
        // res.send(data);
        res.redirect(`/${data.id}`);
    })
});

// EDIT EXISTING TODOS BY TITLE

app.get('/:id/edit', (req, res) => {
    Todo.getOne(req.params.id)
    .then((data) => {
        console.log(data);
        // res.send(data);
        res.render('todo-edit-page', data);
    })
    .catch((error) =>{
        console.log(error);
    });
});

app.post('/:id/edit', (req, res) => {
    // console.log(req.body);
    // console.log('That was the shit from the forum')
    // console.log(req.params)
    Todo.setTitle(req.params.id, req.body.title)
    .then((data) => {
        console.log(data)
        console.log('That was the data')
        // res.redirect(`/${req.params.id}`);
        if(req.body.finished) {
            var done = true;
        } else {
            done = false;
        };
        Todo.setFinished(req.params.id, done)
        .then((data) => {
            console.log(data)
            res.redirect(`/${req.params.id}`);
        })
    })

    .catch((error) => {
        console.log(error);
    })

});

// EDIT EXISTING TODOS BY TRUE/FALSE

app.get('/:id/edit', (req, res) => {
    Todo.getOne(req.params.id)
    .then((data) => {
        console.log(data);
        res.render('todo-edit-page', data);
    })
    .catch((error) => {
        console.log(error);
    })
});


// DELETE TODOS
app.get('/:id/delete', (req, res) => {
    Todo.getOne(req.params.id)
    .then((data) => {
        console.log(data);
        res.render('todo-delete-page', data);
    })
    .catch((error) => {
        console.log(error);
    })
});

app.post('/:id/delete', (req, res) => {
    if(req.body.delete) {
        Todo.deleteById(req.params.id)
        .then((data) => {
            console.log(data);
            // res.send(data);
            Todo.getAll()
            .then((data) => {
               console.log(data); 
               res.render('homepage', {
                   todos: data
               });
            })
        })
        .catch((error) =>{
            console.log(error);
        });
    };
   
});


// ADD NEW TODOS

app.get('/:id', (req, res) => {
    Todo.getOne(req.params.id)
        .then((data) => {
            console.log(data);
            // res.send(data);
            res.render('todo-detail-page', data);
        })
        .catch((error) =>{
            console.log(error);
        });
});


// LISTEN FOR LOCALHOST SERVER

app.listen(3000, () => {
    console.log('Your server is running!');
});