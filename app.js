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
	res.render('index', {title: 'Welcome', subtitle: 'How are you today Saravanan?'});
});

app.get('/about', function(req,res){
	res.render('about');
});

app.get('/contact', function(req,res){
	res.render('contact');
});

app.post('/contact/send', function(req,res){
	 // Not the movie transporter!
	var smtpTransport = require('nodemailer-smtp-transport');
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
            user: 'abini.sara2001@gmail.com', // Your email id
            pass: 'Micron@123' // Your password
        },
		tls: { rejectUnauthorized: false }
    }));
	// To send mails the two settings we have made
		//1. tls property added to the transporter constructor
		//2. The gmail account setting has been changed [risky] -Access for less secure apps : Turn on.
		//    https://www.google.com/settings/security/lesssecureapps
	var mailOptions = {
	    from: 'abini.sara2001@gmail.com', // sender address
	    to: 'abini.sara2001@gmail.com', // list of receivers
	    subject: 'Email Example through nodejs', // Subject line
	    //text: 'text' //, // plaintext body
	    html: '<b>Hello world ✔ Hi Naga bagu unnara</b>' // You can choose to send an HTML body instead
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

