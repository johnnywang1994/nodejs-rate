const fs = require('fs');
const path = require('path');
const express = require('express');
const { gitbookErrorHandler } = require('../module');
const app = express.Router();
const CWD = process.cwd();


app.use(express.json());


/* Book */
app.route('/')
  .get((req, res) => {
    const query = req.query;
    const filepath = path.join(CWD, 'gitbook', query.path + '.md');

    fs.access(filepath, fs.F_OK, (err) => {
      if (err) return gitbookErrorHandler(res, err, 'File not found!');
      fs.readFile(filepath, 'utf-8', (err, data) => {
        if (err) console.error(err);
        res.end(JSON.stringify({
          content: data
        }));
      });
    });
  })
  .post((req, res) => {
    const emp = req.body;
    const filepath = path.join(CWD, 'gitbook', emp.path + '.md');
    const content = emp.content;

    fs.writeFile(filepath, content, 'utf8', (err) => {
      if (err) return gitbookErrorHandler(res, err, 'File path illegal!');
      console.log('File saved!');
      res.end(JSON.stringify({
        status: 200,
        msg: 'File saved!'
      }));
    });
  })
  .delete((req, res) => {
    const emp = req.body;
    const filepath = path.join(CWD, 'gitbook', emp.path + '.md');

    fs.access(filepath, fs.F_OK, (err) => {
      if (err) return gitbookErrorHandler(res, err, 'File not found!');
      fs.unlink(filepath, (err) => {
        if (err) console.error(err);
        console.log('File removed!');
        res.end(JSON.stringify({
          status: 200,
          msg: 'File removed!'
        }));
      });
    });
  });


module.exports = app;