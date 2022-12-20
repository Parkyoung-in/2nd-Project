const express  = require('express');
let ejs = require('ejs');
const app  = express();
const router = require('./router/router.js');
const DBrouter = require('./router/DBrouter')
const bodyParser = require('body-parser');
const cors = require('cors'); //외부에 있는 정보들을 요청할때 사용하는 모듈 , 데이터 통신 필수 등록
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.use(cors());
app.use(router);
app.use(DBrouter);
app.use(express.json);
app.listen(3001,()=>{
    console.log('start!');
});