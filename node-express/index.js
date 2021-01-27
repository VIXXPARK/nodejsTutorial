const express = require('express');
const http = require('http');
const morgan = require('morgan');
var bodyParser = require('body-parser')

const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leaderRouter');
const promotionRouter = require('./routes/promotionRouter');
const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev')); //터미널에 현재 어떤 상태인지 보여준다 예시 :GET /favicon.ico 200 1.682 ms - -
app.use(bodyParser.json());

app.use('/dishes',dishRouter);
app.use('/dishes/:dishId',dishRouter);
app.use('/leaders',leaderRouter);
app.use('/leaders/:leaderId',leaderRouter);
app.use('/promotions',promotionRouter);
app.use('/promotions/:promoId',promotionRouter);
app.use(express.static(__dirname + '/public')) // 파일 위치 접근


app.use((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
});