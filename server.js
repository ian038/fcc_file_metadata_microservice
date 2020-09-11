'use strict';

var express = require('express');
var cors = require('cors');

let multer = require('multer')
// Input element has type file and name upfile
let upload = multer().single('upfile')

var app = express();
app.use(express.json())
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload, (req, res) => {
  if(req.file) {
    const { originalname, mimetype, size } = req.file
    res.json({
      name: originalname,
      type: mimetype,
      size: size
    })
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
