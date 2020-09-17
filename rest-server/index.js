const express = require('express');
const morgan = require('morgan');
var data = require('./data').data;

const app = express();
app.use(morgan('combined'));
morgan(':remote-addr :method :url');
app.use(express.json());

app.get('/', (req,res) => {
    res.send(data);
});
app.get('/:id', (req,res) => {
    var user = null;
    for(var i = 0; i < data.length; i++)
    {
        if(data[i].id == req.params.id)
        {
            user = data[i];
        }
    }
    res.send(user);
});

app.post('/addUser', (req,res) => {
    console.log(req.body);
    var newUser = {
        id: data.length + 1,
        name: req.body.name
    };
    console.log(newUser);
    data.push(newUser);

    res.send({
        data: 'No Data',
        message: 'User Added'
    });
});
app.listen(4000, () => {
    console.log('Rest Server Started');
});