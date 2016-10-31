var express = require('express');
var path = require('path');
var bodyPaser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res){
	console.log('Hello World');
	//res.send('Hello World');
	res.render('index', {title: 'Welcome', subtitle: 'How are you?'});
});

app.get('/about', function(req,res){
	res.render('about');
});

app.get('/contact', function(req,res){
	res.render('contact');
});

app.post('/contact/send', function(req,res){
	 // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'example@gmail.com', // Your email id
            pass: 'password' // Your password
        }
    })


	var mailOptions = {
	    from: 'cheershema@gmail.com>', // sender address
	    to: 'abini.sara2001@gmail.com', // list of receivers
	    subject: 'Email Example through nodejs', // Subject line
	    text: 'text' //, // plaintext body
	    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	        res.json({yo: 'error'});
	    }else{
	        console.log('Message sent: ' + info.response);
	        res.json({yo: info.response});
	    };
	});
});

app.listen(3000);
console.log('Server is running on port 3000...');

