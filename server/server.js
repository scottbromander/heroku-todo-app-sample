const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todo.router');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.use('/api/todo', todoRouter);

app.listen(PORT, () => {
    console.log('Server running on ', PORT);
});