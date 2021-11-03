const express = require('express')
const app = express()
const router = express.Router();

app.use('/static', express.static('static'))

app.set("trust proxy", true)

router.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.use('/', router);
app.listen(3000);

console.log('Running at Port 3000');