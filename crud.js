var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var ejs = require('ejs');
var path = require('path');
var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/images', express.static('images'));

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "bharat.kumar",
    database: "bharat"
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/p.html');
});

app.get('/register', function (req, res) {
    res.sendFile(__dirname + '/registration.html');
});

app.post("/Submit-data", function (req, res) {
    var sid = req.body.sid;
    var sname = req.body.sname;
    var email = req.body.email;
    var age = req.body.age;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var marks = req.body.marks;


    conn.connect(function (err) {
        var sql = "insert into register(sid,sname,email,Age,City,State,Country,marks) values(" + sid + ",'" + sname + "','" + email + "'," + age + ",'" + city + "','" + state + "','" + country + "'," + marks + ")";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Record Inserted");
            res.redirect('/Register');

        });
    });
});

app.get('/update', function (req, res) {
    res.sendFile(__dirname + '/update.html')
})

app.post("/update-data", function (req, res) {

    var sid = req.body.sid;
    var sname = req.body.sname;
    var email = req.body.email;
    var age = req.body.age;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var marks = req.body.marks;

    conn.connect(function (err) {
        var sql = "update register set sname='" + sname + "',Email='" + email + "',Age=" + age + ",City='" + city + "',State='" + state + "',Country='" + country + "',Marks=" + marks + " where Sid=" + sid + "";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Data Updated on the basis of Sid");
            res.redirect('/update');

        });
    });
});

app.get('/delete', function (req, res) {
    res.sendFile(__dirname + '/delete.html')
})

app.post("/delete-data", function (req, res) {

    var sid = req.body.sid;


    conn.connect(function (err) {
        var sql = "delete from register  where Sid=" + sid + "";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Data Deleted on the basis of sid");
            res.redirect('/delete');

        });
    });
});

app.get('/students', function (req, res) {
    var sql = "Select * from register";
    conn.query(sql, function (err, rows) {
        if (err) throw err;
        res.render('select', {
            studs: rows
        });
    });
});
app.get('/login', function (request, response) {
    response.sendFile(__dirname + '/login.html');
});

app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        conn.query('select * from user_login WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {

                response.redirect('/');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.get('/', function (request, response) {
    response.send('Welcome back');

    response.end();
});

app.get('/batch', function (req, res) {
    res.sendFile(__dirname + '/batch.html');
});

app.post("/submit-batch", function (req, res) {
    var Bid = req.body.Bid;
    var Bname = req.body.Bname;
    var Course = req.body.Course;

    conn.connect(function (err) {
        var sql = "insert into batchinfo(Bid,Sid,Bname,Course) values(" + Bid + "," +Sid+ ",'" + Bname + "','" + Course + "')";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Record Inserted");
            res.redirect('/batch');
        });
    });
});

app.get('/sdetails',function(req,res){
    res.sendFile(__dirname+'/sdetails.html')
})

app.post('/submit-sdetails',function(req,res){
    var Bid=req.body.Bid;
    var Bname=req.body.Bname;
    var Course=req.body.Course;
    var Sid =req.body.Sid;

    conn.connect(function(err){
      var sql="Select Sid from register";

        conn.query(sql,function(err,result){
            if(err) throw err;
            console.log("Added");
            res.redirect('/sdetails')
        });
    });
});



app.get('/bmodify', function (req, res) {
    res.sendFile(__dirname + '/bmodify.html')
})

app.post("/modify-data", function (req, res) {
    var Bid = req.body.Bid;
    var Bname = req.body.Bname;
    var Sid = req.body.Sid;
    var Course = req.body.Course;


    conn.connect(function (err) {
        var sql = "update batchinfo set Bname='" + Bname + "',Course='" + Course + "',Bid="+Bid+"  where Sid=" + Sid + "";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Data Updated on the basis of sid");
            res.redirect('/bmodify');
        });

    });
});

app.get('/Remove', function (req, res) {
    res.sendFile(__dirname + '/remove.html')
})

app.post("/remove-data", function (req, res) {

    var Bid = req.body.Bid;


    conn.connect(function (err) {
        var sql = "delete from batchinfo where Bid=" + Bid + "";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Data Deleted on the basis of bid");
            res.redirect('/remove');
        });
    });
});

app.get('/Batchview', function (req, res) {
    var sql = "select * from batchinfo";
    conn.query(sql, function (err, rows) {
        if (err) throw err;
        res.render('Batchview', {
            studs: rows
        });
    });
});

app.get('/attendance', function (req, res) {
    res.sendFile(__dirname + '/attendance.html')
})

app.post('/submit-attend', function (req, res) {
    var Bid = req.body.Bid;
    var Sid = req.body.Sid;
    var Status = req.body.Status;

    conn.connect(function (err) {
        var sql = "update attendance set Status ='" + Status + "' where Sid=" + Sid + "";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Data Updated on the basis of sid")
            res.redirect('/attendance');
        });
    });
});

app.get('/Aupdate', function (req, res) {
    res.sendFile(__dirname + '/Aupdate.html')
})

app.post('/update-attend', function (req, res) {
    var Bid = req.body.Bid;
    var Sid = req.body.Sid;
    var Status = req.body.Status;

    conn.connect(function (err) {
        var sql="update attendance set Status ='" + Status + "',Bid="+Bid+" where Sid=" + Sid + "";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Data Updated on the basis of sid")
            res.redirect('/Aupdate');
        });
    });
});

app.get('/Aremove',function(req,res){
    res.sendFile(__dirname+'/Aremove.html')
})

app.post('/remove-attend',function(req,res){
    var Sid=req.body.Sid;
    conn.connect(function(err){
        var sql="Delete from Attendance where Sid="+Sid+"";
        conn.query(sql,function(err,result){
            if(err) throw err;
            console.log("Data Deleted on the basis of Sid")
            res.redirect('/Aremove');
        });
    });
});

app.get('/Attend', function (req, res) {
    var sql = " select Bid ,Sid,Sname ,Status,DateofAttendance from register join attendance using(Sid)";
    conn.query(sql, function (err, rows) {
        if (err) throw err;
        res.render('Attend', {
            studs: rows
        });
    });
});



app.listen(3000);
console.log("server started with port 3000");

