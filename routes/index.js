var express = require('express');
var router = express.Router();
var db = null;
require('../database').then(pool => {db = pool;});
console.log('Here!');

//var app = express();
//app.use(express.json()); 

//use db like this: await db.request().query('select * from daaList');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('LEA', { title: 'Express' });
});

var log_message = '';
var logid = 'E';
var email = '';
var password = '';

router.get('/login', function(req, res){
  res.render('Signin', {value: log_message, id: logid});
  log_message = '';
  logid = 'E';
});

var username = '';
router.post('/signin', function(req, res){
  username = req.body.username;
  email = req.body.email;
  password = req.body.password;
  var businessname = req.body.businessname;
  var id = req.body.id;
  logid = id;
 
  //SQL statements
  var sqlA = `EXEC dbo.getAdmin @username = '${username}' , @password = '${password}'`;  
  //var sqlA = "SELECT * FROM dbo.Users WHERE Username = 'Mario' AND Useremail = 'mario@gmail.com'";           //P: username, password Sql to check if user is an admin
  var sql1 = `EXEC dbo.checkEmail @email = '${email}', @login_id = '${id}'`;            //P: email, id Sql to check if the email exists in table with specified id
  var sql2 = `EXEC dbo.enterNewUser @username = '${username}', @useremail = '${email}', @password = '${password}', @login_id = '${id}', @business_name = '${businessname}'`; //Sql to enter the values into the table
  var sql3 = `EXEC dbo.checkNameEmail @username = '${username}', @login_id = '${id}'`;        //P: username, id Sql to check if the email/username exist in table with specified id

  console.log(sqlA);
  var dbdata = null;
  //First checks for admin
  db.request().query(sqlA).then(data =>{
    if (data.recordset.length > 0){
      console.log('GO to Admin');
      res.redirect('/Admin');
    }else{
    
    console.log('runs but no returned value');
   //Case 1: new user signs up
  if(email !=  ''){
  db.request().query(sql1).then(data => {
    if(data.recordset.length > 0){
      console.log('User exists'); 
      log_message = 'This account already Exists';
      res.redirect('/login'); 
    }else{
      db.request().query(sql2).then(dashdata => {
        db.request().query(sql1).then(emdata => {
          console.log(emdata);
          //req.session.user_id = emdata.recordset[0]['UserID'];
        });
        dashboard(id, res);
        console.log('Successful first time login');
        })
      };
    });
  //Case 2: returning user logs in
  }else if(email == ''){
      db.request().query(sql3).then(data =>{
        if(data.recordset.length > 0){
            console.log(data);
            if (data.recordset[0]['Passwords'] == password){
              //req.session.user_id = data.recordset[0]['UserID'];
              dashboard(id, res);
              console.log('Successful returning login');
            }else{
              log_message = 'Incorrect Username or Password';
              res.redirect('/login');
              console.log('Incorrect Password');
            }
        }else{
          log_message = 'You do not have an account with us';
          res.redirect('/login');
          console.log('No account');
        }
      });
    };
    
}
});
});
//Dashboard
//Here I'll get the dashboard after inserting the values of first name and last name if I don't already have it

router.get('/dashboard', function(req, res){
  res.render('investordashboard');
  
  //if(req.session.user_id){
    //var sql1 = ''; //Sql to check if specific person has first and last name
    //db.request().query(sql1).then(data => {
      //if(data[0]['FirstName']){
        //res.render('investordashboard');
      //}else{
        //res.render('Fullname');
      //};
  //});
  //}else{
  //  res.redirect('/landingpage');
  //};
  
});

//Entrepreneur Side
router.get('/edashboard', function(req, res){
  res.render('e-dashboard', {name: username});
  //See all requests made as well as current status of the request and can cancel request
  //Such as mentor request, loan request and application for funds
})
router.get('/Funds', function(req, res){
  //Get specified ID of the user
  var sqid = `EXEC dbo.checkNameEmail @username = '${username}', @login_id = '${logid}'`;
  db.request().query(sqid).then(data => {
    if(data.recordset[0]['Passwords'] == undefined){res.redirect('/login')};
    if(password == data.recordset[0]['Passwords']){
      var id = data.recordset[0]['UserID']; 
      console.log(id, data);  
      if(id){
      var sql1 = `EXEC dbo.selectApplication @id = '${id}'`; //SP to obtain all data related to funds (&loans) request that has not been deleted
      db.request().query(sql1).then(data =>{
        var fundsList = data.recordset;
        if(fundsList){
        res.json(fundsList);
      };
      });
      }else res.json('');
      };
    });
})

router.get('/allFunds', function(req, res){
  var sql1 = `EXEC dbo.selectApplications`;//SP to obtain all data related to funds (&loans) request that has not been deleted
  db.request().query(sql1).then(data =>{
    var fundsList = data.recordset;
    if(fundsList){
      res.json(fundsList);
    }else res.json('');
  });
})

router.get('/allloans', function(req, res){
  var sql1 = `EXEC dbo.selectloans`;//SP to obtain all data related to funds (&loans) request that has not been deleted
  db.request().query(sql1).then(data =>{
    var fundsList = data.recordset;
    if(fundsList){
      res.json(fundsList);
    }else res.json('');

  });
})

router.get('/allmentapp', function(req, res){
  var sql1 = `SELECT * FROM dbo.ApplyMentor`;//SP to obtain all data related to funds (&loans) request that has not been deleted
  db.request().query(sql1).then(data =>{
    var fundsList = data.recordset;
    if(fundsList){
      res.json(fundsList);
    }else res.json('');

  });
})


router.post('/Cancel', function(req, res){
  var fid = req.body.fundid;
  var sql = `EXEC cancelDelete @id = '${fid}'`; //SP to delete a request
  db.request().query(sql).then(data =>{
    res.redirect('/edashboard');
  });
})

router.get('/Mentors', function(req, res){
  var sql1 = '';//SP to obtain all data related to mentorship requests that has not been deleted
  db.request().query(sql1).then(data =>{
    var MentorsList = data.recordset;
    res.json(MentorsList);
  });
})

var mentor = 'not';
router.get('/get-mentor', function(req, res){
  res.render('e-Get-a-mentor', {name: username, applied: mentor});
  mentor = 'not';

  //Able to request for a mentor, to be assigned by admin
})

router.post('/mentors', function(req, res){
  var business = req.body.Business_name;
  var sector = req.body.Your_business_sector;
  var applied = req.body.applied_before;
  var gender = req.body.mentor_gender;

  var sqid = `EXEC dbo.checkNameEmail @username = '${username}', @login_id = '${logid}'`;
  db.request().query(sqid).then(data => {
    if(password == data.recordset[0]['Passwords']){
      var id = data.recordset[0]['UserID']; 
      console.log(id, data);  
      if(id){
        var sql1 = `INSERT INTO dbo.ApplyMentor (BusinessName, BusinessSector, AppliedBefore, MGender, EntreID)
        VALUES('${business}', '${sector}', '${applied}', '${gender}', ${id})`;//Stored procedure to enter values from form into the table

        db.request().query(sql1).then(data => {
        mentor = 'applied';
        res.redirect('/get-mentor');
        })
        }
        }
      });
    });
  

router.get('/E-profile', function(req, res){
  res.render('e-Profile', {name: username});
})

router.get('/E-viewfunds', function(req, res){
  res.render('e-viewfunds', {name: username});
})

router.get('/Apply-for-funds', function(req, res){
  res.render('e-applyfunds', {name: username});
})

var sending = 'not';
router.get('/Apply-funds', function(req, res){
  res.render('Apply-Funds', {sent: sending, name: username});
  sending = 'not';
  //Able to make request to the Investor side
})
router.get('/Take-a-loan', function(req, res){
  res.render('Take-a-loan', {name: username});
  //Able to request for loan
})

router.post('/finance', function(req, res){
  var business = req.body.Business_name;
  var regno = req.body.Business_regno;
  var sector = req.body.Business_sector;
  var ideaDes = req.body.Business_idea_description;
  var email = req.body.Business_email;
  var funds = req.body.Funds_req;
  var terms = req.body.Funds_terms;

  //Get specified ID of the user
  var sqid = `EXEC dbo.checkNameEmail @username = '${username}', @login_id = '${logid}'`;
  db.request().query(sqid).then(data => {
    if(password == data.recordset[0]['Passwords']){
      var userid = data.recordset[0]['UserID']; 
      console.log(userid, data);  
      if(userid){
      //Stored procedure to enter values from form into the table
      var sql1 = `EXEC dbo.enterApplication @business = '${business}', @busregno = '${regno}', @bussector = '${sector}', @BusideaDes = '${ideaDes}' , @busemail = '${email}', @busfunds = '${funds}', @busterms = '${terms}', @entid = ${userid}`;
      console.log('enterappsql', sql1);
      db.request().query(sql1).then(data => {
        sending = 'sent';
        res.redirect('/Apply-funds');
      });
      };
    }
  })
});

router.post('/loan', function(req, res){
  var business = req.body.Business_name;
  var regno = req.body.Business_regno;
  var sector = req.body.Business_sector;
  var ideaDes = req.body.Business_idea_description;
  var email = req.body.Business_email;
  var funds = req.body.Funds_req;
  var terms = req.body.Funds_terms;

  //Get specified ID of the user
  var sqid = `EXEC dbo.checkNameEmail @username = '${username}', @login_id = '${logid}'`;
  db.request().query(sqid).then(data => {
    if(password == data.recordset[0]['Passwords']){
      var userid = data.recordset[0]['UserID']; 
      console.log(userid, data);  
      if(userid){
      //Stored procedure to enter values from form into the table
      var sql1 = `EXEC dbo.enterLoan @business = '${business}', @busregno = '${regno}', @bussector = '${sector}', @BusideaDes = '${ideaDes}' , @busemail = '${email}', @busfunds = '${funds}', @busterms = '${terms}', @entid = ${userid}`;
      console.log('enterappsql', sql1);
      db.request().query(sql1).then(data => {
        sending = 'sent';
        res.redirect('/Take-a-loan');
      });
      };
    }
  })
});




//Investor Side
router.get('/idashboard', function(req, res){
  res.render('i-dashboard',{name: username});
  //See any newly added post about Entrepreneurs who want support
  //Able to view entire proposal including terms
  //Able to either accept or refuse their offer
})

var isent = 'not';
router.get('/investmore', function(req,res){
  res.render('Invest-More',{name: username, Investmore : isent });
  isent = 'not'
})

router.post('/Invest', function(req, res){
  var fid = req.body.fundid;
  var sqid = `EXEC dbo.checkNameEmail @username = '${username}', @login_id = '${logid}'`;
  db.request().query(sqid).then(data => {
    if(password == data.recordset[0]['Passwords']){
      var userid = data.recordset[0]['UserID']; 
      console.log(userid, data);  
      if(userid){
        var sql = `EXEC fundRequest @id = '${fid}', @investid = ${userid}`; //SP to fund a request
        db.request().query(sql).then(data =>{
        isent = 'sent';
        res.redirect('/investmore');
        });
    };
  }
});
})

router.post('/notInvest', function(req, res){
  var fid = req.body.fundid;
  var sqid = `EXEC dbo.checkNameEmail @username = '${username}', @login_id = '${logid}'`;
  console.log(sqid);
  db.request().query(sqid).then(data => {
    if(data.recordset[0]['Passwords'] == undefined){res.redirect('/login')};
    if(password == data.recordset[0]['Passwords']){
      var userid = data.recordset[0]['UserID']; 
      console.log(userid, data);  
      if(userid){
        var sql = `EXEC dbo.cancelRequest @id = ${fid}, @investid = ${userid}`; //SP to remove a request
        console.log('cancel', sql);
        db.request().query(sql).then(data =>{
          if(logid == 'I'){
        isent = 'sent';
        res.redirect('/investmore');
      }else if(logid == 'A'){
        aESending = 'sent';
        res.redirect('/EAdmin');
      };
        });
    };
  }
});
})


router.get('/imentorship', function(req, res){
  res.render('i-mentorship',{name: username});
})

router.get('/Portfolio', function(req, res){
  res.render('i-Portfolio', {name: username});
})

router.get('/Investor-Profile', function(req, res){
  res.render('i-profile',{name: username});
})

//Mentor Side
router.get('/mdashboard', function(req, res){
  res.render('mentors-dashboard',{name: username});
  //Get info from people who requested for you as a mentor display on dashboard
  //Accept or deny their requests
})

router.get('/Mentor-Profile', function(req, res){
  res.render('mentor-profile', {name: username});
  //The profile that the Entrepreneurs will see
})

router.get('/Mentorship', function(req, res){
  res.render('mentorship-page', {name: username});
})

router.post('/names', function(req, res){
  //var id = req.session.user_id;
  var sql1 = ''; //Sql to input first and last name into db with user_id
  res.redirect('/dashboard');
});

function dashboard(id, res){
  if(id == 'E'){
    res.redirect('/edashboard');
  }else if(id == 'I'){
    res.redirect('/idashboard');
  }else if(id == 'M'){
    res.redirect('/mdashboard');
  }
}


//Admin Side
  //Here we'll be able to assign mentors to mentees
  //Investors to entrepreneurs
  router.get('/Admin', function(req, res){
    res.render('admin', {name: username});
    logid = 'A';
  })
  
  var aESending = 'not';
  router.get('/EAdmin', function(req, res){
    res.render('admin-entrepreneur', {name: username, aesent: aESending});
    aESending = 'not';

  })


  router.post('/notLoan', function(req, res){
    var fid = req.body.fundid;
    var sqid = `EXEC dbo.checkNameEmail @username = '${username}', @login_id = '${logid}'`;
    console.log(sqid);
    db.request().query(sqid).then(data => {
      if(password == data.recordset[0]['Passwords']){
        var userid = data.recordset[0]['UserID']; 
        console.log(userid, data);  
        if(userid){
          var sql = `UPDATE dbo.Applyloan
                      SET Approved = 'C'
                      WHERE fundid = ${fid};` //Sql to remove a request
          console.log('cancel', sql);
          db.request().query(sql).then(data =>{
          aESending = 'sent';
          res.redirect('/EAdmin');
          });
      };
    }
  });
  })

  router.post('/apprloan', function(req, res){
    var fid = req.body.fundid;
    var sqid = `EXEC dbo.checkNameEmail @username = '${username}', @login_id = '${logid}'`;
    console.log(sqid);
    db.request().query(sqid).then(data => {
      console.log(data);
      if(password == data.recordset[0]['Passwords']){
        var userid = data.recordset[0]['UserID']; 
        console.log(userid, data);  
        if(userid){
          var sql = `UPDATE dbo.Applyloan
                      SET Approved = 'A'
                      WHERE fundid = ${fid}`; //Sql to remove a request
          console.log('cancel', sql);
          db.request().query(sql).then(data =>{
          aESending = 'sent';
          res.redirect('/EAdmin');
          });
      };
    }
  });
  })

  
  router.get('/IAdmin', function(req, res){
    res.render('admin-investor', {name: username});
  })
  
  router.get('/MAdmin', function(req, res){
    res.render('admin-mentor', {name: username});
  })
  
  
  router.get('/Admin-p', function(req, res){
    res.render('admin-profile', {name: username});
  })
  
  

router.get('/Logout', function(req, res){
  res.redirect('/');
})

module.exports = router;
