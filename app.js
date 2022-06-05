const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public')); // to serve static files, so for the static files like css, js, images etc. u need to give the relative path

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");  
});

app.post("/", function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var info = req.body.button;
    console.log(info);
    var stat="";
    if(info=="signout"){
         stat = "unsubscribed";
    }
    else{
         stat = "subscribed";
    }
    
    console.log(stat);
    const data = {
        members: [
            {
                email_address: email,
                status: stat,
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const ApiKey = 'a2a48c028dfe87d0ecb28ffa241293fb-us14';
    const listId = '3a0fb7f4f2';

    const url = 'https://us14.api.mailchimp.com/3.0/lists/'+listId;
    const options = {
        method: 'POST',
        auth: 'Akash:'+ApiKey
    }

    const request= https.request(url, options, function(response){
        console.log(response.statusCode);
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        // response.on('data', function(data){
        //     console.log(JSON.parse(data));
        // });
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure", function (req, res) {
    res.redirect("/");
})

app.post("/success", function (req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT ||  3000, () => {
    console.log('Server started on port 3000');
    });  

//const ApiKey = 'a2a48c028dfe87d0ecb28ffa241293fb-us14';

// const listId = '3a0fb7f4f2';