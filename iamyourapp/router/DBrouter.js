const express =require("express");
const DBrouter = express.Router();
const mysql = require('mysql2')

const conn = require("../config/DBConfig.js")

// 회원가입

DBrouter.post("/join", (req,res) => {
    let USER_ID = req.body.id;
    let USER_PW = req.body.pw;
    let USER_NAME = req.body.name;
    let USER_NICK = req.body.nick;
    let USER_HP = req.body.hp;

    console.log(USER_ID, USER_PW);

    let sql = "insert into USERS(USER_ID, USER_PW, USER_NAME, USER_NICK, USER_HP) values(?, ?, ?, ?, ?)";

    conn.query(sql, [USER_ID, USER_PW, USER_NAME, USER_NICK, USER_HP], (err, row) => {
        if(!err){
            console.log("입력성공 : " + row);
            res.send("가입성공")
        } else {
            res.send("가입실패")
            console.log("입력실패 : " + err);
        }
    })
});

// 로그인

DBrouter.post("/login", (req, res) => {
    let USER_ID = req.body.id;
    let USER_PW = req.body.pw;
    console.log(USER_ID, USER_PW);

    let sql = "select * from USERS where USER_ID = ? and USER_PW = ?";

    conn.query(sql, [USER_ID, USER_PW], (err, row) => {
        if(err) {
            console.log("검색실패 : " + err);
        } 
        // 로그인 성공
        else if (row.length > 0 ) {
            // console.log(userId)
            console.log(row[0].USER_ID)
            
            res.json({
                result: "로그인성공",
                //영인
                userId : row[0].USER_ID,
                userNick: row[0].USER_NICK,
                userImage: row[0].USER_IMAGE
                
                //
            })
        } 
        // 로그인 실패
        else if (row. length == 0) {
            res.json({
                result: "로그인실패"
            })
        }
    })
});

// 마이페이지
DBrouter.post("/user", (req,res) => {
    let USER_ID = req.body.id;
    let USER_NICK = req.body.nick;
    let USER_IMAGE = req.body.img;
    let select = req.body.type;
    let sql = '';
    console.log(req.body)
    // console.log(USER_ID)

    sql = `update USERS set ${select} = ? where USER_ID = '${USER_ID}' `
    console.log(sql);
    conn.query(sql, [USER_NICK,USER_ID], (err, row) => {
       if(!err){
           console.log("변경성공 : " + row);
           res.json({
            result: "변경성공",
            data: USER_NICK, USER_IMAGE //USER_IMAGE 추가
            // userId : row[0].USER_ID,
            // userNick: row[0].USER_NICK,
            // userImage: row[0].USER_IMAGE
        })
       } else {
           res.send("변경실패")
           console.log("변경실패 : " + err);
       }
   })


})

module.exports = DBrouter;