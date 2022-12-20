const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

let conn = mysql.createConnection({
    host: 'project-db-stu.ddns.net',
    user: 'iamyourapp',
    password: '12345',
    port: '3307',
    database: 'iamyourapp'
});

router.get('/', (req, res) => {

    res.render('main', {})
})

router.post('/device', (req, res) => {

    const parm = req.body.data;
    let option = '';
    if (parm.type == 'add') {
       
        if (parm.option.length > 0) {
            for (let i = 0; i < parm.option.length; i++) {
                option = option+','+parm.option[i]
            }
        }

        console.log('디바이스입력' + parm.type);
        const sql = "insert into DEVICES (USER_ID,DEVICE_NAME,DEVICE_UID,REG_DATE,DEVICE_STATUS,DEVICE_OPTION,DEVICE_CATE) values('admin',?,?,NOW(),'OFF',?,?)";
        conn.query(sql, [parm.name, parm.no,option, parm.cate], (err, row) => {
            if (err) {
                console.log(err)
                res.json({
                    result: 'err'
                });
            } else if (row.affectedRows > 0) {

                console.log("명령에 성공한 수 : " + row.affectedRows);
                const sql2 = 'select * from DEVICES where USER_ID="admin" ';
                conn.query(sql2, [], (err, row) => {
                    if (row.length > 0) {
                        res.json({
                            result: 'success',
                            row: row
                        });
                    }
                });

            } else if (row.affectedRows == 0) {

                console.log("입력된 값이 없습니다.")
            }
        })
    } else if (parm.type == 'list') {

        let sql2 = `select * from DEVICES where USER_ID="admin" and DEVICE_CATE='${parm.cate}' `;
        if (parm.cate == '전체') {
            sql2 = 'select * from DEVICES where USER_ID="admin"  ';
        }
        console.log(sql2)
        conn.query(sql2, [], (err, row) => {
            if (row.length > 0) {
                res.json({
                    result: 'success',
                    row: row
                });
            }
        });
    } else if (parm.type == 'del') {
        console.log('디바이스입력' + parm.type);
        const sql = "delete from DEVICES where DEVICE_SEQ = ?";
        conn.query(sql, [parm.no], (err, row) => {
            if (err) {
                console.log(err)
                res.json({
                    result: 'err'
                });
            } else if (row.affectedRows > 0) {

                console.log("명령에 성공한 수 : " + row.affectedRows);
                const sql2 = 'select * from DEVICES where USER_ID="admin" ';
                conn.query(sql2, [], (err, row) => {
                    if (row.length > 0) {
                        res.json({
                            result: 'success',
                            row: row
                        });
                    }
                });

            } else if (row.affectedRows == 0) {

                console.log("입력된 값이 없습니다.")
            }
        })
    } else if (parm.type == 'edit') {
        console.log('디바이스입력' + parm.name);
        const sql = `update  DEVICES set ${parm.select} =? where DEVICE_SEQ = ?`;
        console.log(sql+ parm.no+parm.name);
        conn.query(sql, [parm.name, parm.no], (err, row) => {
            if (err) {
                console.log(err)
                res.json({
                    result: 'err'
                });
            } else if (row.affectedRows > 0) {

                console.log("명령에 성공한 수 : " + row.affectedRows);
                const sql2 = 'select * from DEVICES where USER_ID="admin" ';
                conn.query(sql2, [], (err, row) => {
                    if (row.length > 0) {
                        res.json({
                            result: 'success',
                            row: row
                        });
                    }
                });

            } else if (row.affectedRows == 0) {

                console.log("입력된 값이 없습니다.")
            }
        })
    }
})

router.post('/total', (req, res) => {
    const parm = req.body.type;
    if (parm == 'wPower') {
        const sql = "SELECT format(sum(POWER_USE),3) as p FROM POWERS where REG_DATE between '2016-01-07' and '2016-01-14 23:59' ";
        conn.query(sql, [], (err, rows) => {
            if (rows.length > 0) {
                res.json({
                    result: 'success',
                    power: rows[0].p,
                });
            }
        })
    } else if (parm == 'mPower') {
        const sql = "SELECT format(sum(POWER_USE),3) as p FROM POWERS where REG_DATE between '2016-01-01' and '2016-01-30 23:59' ";
        conn.query(sql, [], (err, rows) => {
            if (rows.length > 0) {
                res.json({
                    result: 'success',
                    power: rows[0].p,
                });
            }
        })
    } else if (parm == 'device') {
        const sql = "select count(*) as cnt from DEVICES where device_status = 'ON' ";
        conn.query(sql, [], (err, rows) => {
            if (rows.length > 0) {
                res.json({
                    result: 'success',
                    device: rows[0].cnt,
                });
            }
        })
    } else if (parm == 'wPowerChk1') {
        const strdate = req.body.date.start;
        const enddate = req.body.date.end;
        arrdateStr = String(strdate).split('T');
        arrdateEnd = String(enddate).split('T');
        const weekend = ['일', '월', '화', '수', '목', '금', '토'];
        const label = [];
        let deDay = req.body.date.diDay;
        let Dformat = 'd';

        if (deDay == 7) {
            Dformat = 'w';
        }

        if (deDay >= 28) {
            Dformat = 'm';
        }
        //이번주 전력
        //const sql = " SELECT DATE_FORMAT(REG_DATE,'%w') as m, sum(POWER_USE) as p FROM POWERS where REG_DATE between '2016-01-03' and '2016-01-10 23:59'  GROUP BY m;";

        const sql = " SELECT DATE_FORMAT(REG_DATE,'%" + Dformat + "') as m, sum(POWER_USE) as p FROM POWERS where REG_DATE between '" + arrdateStr[0] + "' and '" + arrdateEnd[0] + " 23:59'  GROUP BY m;";
        console.log('이번주전력' + sql);
        conn.query(sql, [], (err, rows) => {
            if (rows.length > 0) {
                let list = [];
                for (let i = 0; i < rows.length; i++) {
                    list.push(rows[i].p);
                    if (Dformat == 'w') {
                        label.push(weekend[rows[i].m]);
                    } else if (Dformat == 'm') {
                        label.push(rows[i].m + '월달');
                    } else {
                        label.push(rows[i].m + '일');
                    }
                }
                console.log(list);
                res.json({
                    result: 'success',
                    power: list,
                    label: label
                });
            } else {
                res.json({
                    result: 'success',
                    power: ''
                });
            }
        })

    } else if (parm == 'wPowerChk2') {
        const strdate = req.body.date.start;
        const enddate = req.body.date.end;
        let deDay = req.body.date.diDay;
        const weekend = ['일', '월', '화', '수', '목', '금', '토'];
        const label = [];
        let Dformat = 'd';

        arrdateStr = String(strdate).split('T');
        arrdateEnd = String(enddate).split('T');
        // console.log(new Date(arrdateStr).getMonth()-1+'다라라랄');
        if (deDay == 0) {
            deDay = 1;
        }
        if (deDay == 7) {
            Dformat = 'w';
        }

        if (deDay >= 28) {
            Dformat = 'y';
        }

        //저번주 전력
        // const sql2 = " SELECT DATE_FORMAT(REG_DATE,'%w') as m, sum(POWER_USE) as p FROM POWERS where REG_DATE between '2016-01-10' and '2016-01-17 23:59'  GROUP BY m;";  
        const sql2 = " SELECT DATE_FORMAT(REG_DATE,'%" + Dformat + "') as m, sum(POWER_USE) as p FROM POWERS where REG_DATE between  date_add('" + arrdateStr[0] + "',INTERVAL -" + deDay + " DAY) and  date_add('" + arrdateEnd[0] + " 23:59',INTERVAL -" + deDay + "  DAY)  GROUP BY m;";
        console.log(sql2 + '저번주전력');
        conn.query(sql2, [], (err, rows) => {

            if (rows.length > 0) {
                const list = [];
                let did = 0;
                for (let i = 0; i < rows.length; i++) {
                    list.push(rows[i].p);
                    if (Dformat == 'w') {
                        label.push(weekend[rows[i].m]);
                    } else if (Dformat == 'm' || Dformat == 'y') {
                        let Montn = new Date(arrdateStr).getMonth();
                        label.push((("00" + Montn.toString()).slice(-2)) + '월달');
                    } else {
                        label.push(rows[i].m + '일');
                    }

                    if (rows.length == 1) {
                        did = 1;
                    }

                }
                res.json({
                    result: 'success',
                    power: list,
                    label: label,
                    did: did
                });
            } else {
                res.json({
                    result: 'success',
                    power: ''
                });
            }
        })
    } else if (parm == 'deviceUse') {
        const strdate = req.body.date.start;
        const enddate = req.body.date.end;

        arrdateStr = String(strdate).split('T');
        arrdateEnd = String(enddate).split('T');
        // console.log(new Date(arrdateStr).getMonth()-1+'다라라랄');

        const sql = "select " +
            "concat(round(( sum(HEATER)/sum(POWER_USE) * 100 ),2),'') AS heater_p, " +
            "concat(round(( sum(AIRCONDITIONER)/sum(POWER_USE) * 100 ),2),'') AS ac_p, " +
            "concat(round(( sum(SMARTLIGHT)/sum(POWER_USE) * 100 ),2),'') AS sl_p, " +
            "concat(round(( sum(VENTILATOR)/sum(POWER_USE) * 100 ),2),'') AS vl_p, " +
            "concat(round(( sum(HUMIDIFER)/sum(POWER_USE) * 100 ),2),'') AS hd_p, " +
            "concat(round(( sum(SMARTBLIND)/sum(POWER_USE) * 100 ),2),'') AS sb_p " +
            " from POWERS  where REG_DATE between '" + arrdateStr[0] + "' and '" + arrdateEnd[0] + " 23:59' ";
        // console.log(sql+'디바이스 사용률');
        conn.query(sql, [], (err, rows) => {

            if (rows.length > 0) {
                const list = [];
                list.push(rows[0].heater_p);
                list.push(rows[0].ac_p);
                list.push(rows[0].sl_p);
                list.push(rows[0].vl_p);
                list.push(rows[0].hd_p);
                list.push(rows[0].sb_p);
                console.log(list + '디바이스 사용률');
                res.json({
                    result: 'success',
                    power: list
                });
            } else {
                res.json({
                    result: 'success',
                    power: ''
                });
            }
        })
    }
})

router.post('/db', (req, res) => {
    console.log('router enter' + conn.state);
    const parm = req.body.type;
    let arrdateStr = '';
    let arrdateEnd = '';
    let sql = '';
    console.log(parm);
    if (parm == 'power') {

        let datewhere = "where REG_DATE between '2016-02-01' and '2016-02-01 23:59'";
        if (req.body.date != undefined) {
            console.log(req.body.date.start);
            const strdate = req.body.date.start;
            const enddate = req.body.date.end;
            arrdateStr = String(strdate).split('T');
            arrdateEnd = String(enddate).split('T');
            console.log(arrdateStr[0]);
            datewhere = "where REG_DATE between '" + arrdateStr[0] + "' and '" + arrdateEnd[0] + " 23:59'";
        }
        if (req.body.date != undefined && (arrdateStr[0] != arrdateEnd[0])) {
            sql = "SELECT DATE_FORMAT(REG_DATE,'%d') as m, sum(POWER_USE) as p FROM POWERS " + datewhere + " GROUP BY m ";
        } else {
            sql = "select REG_DATE,POWER_USE  from POWERS " + datewhere + "";
        }

        console.log(sql);
        conn.query(sql, [], (err, rows) => {
            if (rows.length > 0) {
                let time = [];
                let power = [];
                if (req.body.date != undefined && (arrdateStr[0] != arrdateEnd[0])) {
                    for (let i = 0; i < rows.length; i++) {
                        time.push(rows[i].m + '일');
                        power.push(rows[i].p);
                    }

                    // const set = new Set(time)
                    console.log(time);
                    console.log(power);
                    console.log(Math.max.apply(null, power));

                    res.json({
                        result: 'success',
                        time: time,
                        power: power,
                        maxVal: Math.max.apply(null, power),
                        strDate: arrdateStr[0],
                        endDate: arrdateStr[1]
                    });
                } else {
                    for (let i = 0; i < rows.length; i++) {
                        //    console.log(String(rows[i].REG_DATE));
                        let t = String(rows[i].REG_DATE).split(' ');
                        let h = t[4].split(':');
                        // console.log(h[0]);
                        if ((Number(h[0]) % 2 === 0 && time.indexOf(h[0]) == -1) || (Number(h[0]) % 23 === 0 && Number(h[1]) == 59 && time.indexOf(h[0]) == -1)) {
                            // console.log(rows[i].POWER_USE);
                            time.push(h[0]);
                            power.push(rows[i].POWER_USE);
                        }

                    }
                    let retime = [];
                    for (let z = 0; z < time.length; z++) {
                        retime.push(String(time[z]) + '시');
                    }
                    // const set = new Set(time)
                    console.log(time);
                    console.log(power);
                    console.log(Math.max.apply(null, power));

                    res.json({
                        result: 'success',
                        time: retime,
                        power: power,
                        maxVal: Math.max.apply(null, power),
                        strDate: arrdateStr[0],
                        endDate: arrdateStr[1]
                    });
                }

            } else {
                res.json({
                    result: 'faile'
                });
            }
        })
    }
})


module.exports = router;