const express = require('express')
const { exec } = require("child_process");
const bodyParser = require('body-parser');
const path = require('path');
const Docker = require('dockerode');
const app = express();
const port = 7304;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));

const docker = new Docker({sockerPath: 'var/run/docker.sock'});

app.use(express.static(path.join(__dirname, '../build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.post('/containers', async(req, res) => {

    const containers = await docker.listContainers({all:req.body.all});

    res.send({body: containers});
});

app.post('/images', async(req, res) => {
    
    const images = await docker.listImages({all:req.body.all});

    const sortedImages = new Array(images.length);

    let s = 0;
    let e = images.length-1;
    let numberDanglingImages = 0;

    for(let i = 0; i < images.length; i++){
        if(images[i].RepoTags[0] !== '<none>:<none>'){
            sortedImages[s] = images[i];
            s++;
        }else{
            sortedImages[e] = {...images[i], dangling :true};
            e--;
            numberDanglingImages++;
        }
    }
    
    res.send({body: sortedImages,numDanglingImages:numberDanglingImages});
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