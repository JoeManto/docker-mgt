const express = require('express')
const { exec } = require("child_process");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 7304;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));

app.use(express.static(path.join(__dirname, '../build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.post('/exec', (req, res) => {
    exec(req.body.command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.send({error:`error: ${error.message}`});
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.send({stderr:`stderr: ${error.message}`});
            return;
        }
        res.send({body:`${stdout}`});
        //res.send({res:"hello"});
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});