const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.set('view engine' ,'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('./public/style.css'))

let tasks = []

app.get('/', (req, res) => {
    res.render('index', { tasks: tasks });
});

app.post('/addTask', (req, res)=>{
    const newTask = req.body.task;
    tasks.push({id: Date.now(), text: newTask});
    res.redirect('/')
});

app.get('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    res.render('edit', { task });
});

app.post('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedText = req.body.task;
    const task = tasks.find(task => task.id === taskId);
    if(task) {
        task.text = updatedText;
    }
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});
