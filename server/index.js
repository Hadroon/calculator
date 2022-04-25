const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;
const memoryOperations = require('./utils/memoryOperations.js')

memoryOperations.createMemoryFile()

app.use(bodyParser.text({ type: 'text/html' }))
app.use(express.static('dist'))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/get-memory', function(req, res) {
    res.send(JSON.stringify(memoryOperations.getMemoryValue()));
});

app.get('/clear-memory', function(req, res) {
    res.send(JSON.stringify(memoryOperations.setMemoryValue('')));
});

app.post('/set-memory', function(req, res) {
    res.send(JSON.stringify(memoryOperations.setMemoryValue(req.body)))

});

app.post('/add-to-memory', function(req, res) {
  const mem = Number(memoryOperations.getMemoryValue())
  const num = Number(req.body)
  memoryOperations.setMemoryValue(mem + num)
  res.send(JSON.stringify('ok'))

});

app.post('/subtract-from-memory', function(req, res) {
  const mem = Number(memoryOperations.getMemoryValue())
  const num = Number(req.body)
  memoryOperations.setMemoryValue(mem - num)
  res.send(JSON.stringify('ok'))

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
