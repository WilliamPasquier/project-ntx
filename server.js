// server.js
// load the things we need
const PORT = process.env.PORT || 8080;
var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var path = require('path');
var nodemailer = require('nodemailer');
var i18n = require('i18n-express');
const { type } = require('os');
const { request } = require('http');


// Add list
var countryList = require('./public/js/countrylist');
var cpuProducts = require('./public/js/cpuProduct');
var gpuProducts = require('./public/js/gpuProduct');
var langList = require('./public/js/langList');


// set the view engine to ejs
var app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(i18n({
    translationsPath: path.join(__dirname, 'public/i18n'),
    cookieLangName: 'ulang',
    defaultLang: 'fr',
    siteLangs: ["fr", "en", "de"],
    textsVarName: 'translation'
}));


// index page 
app.get('/', function(req, res) {
    res.render('pages/index', {
        langList : langList
    });
});


// product page
// CPU
app.get('/product/cpu', function(req, res) {
    res.render('pages/product/cpu/cpu', {
        cpuProducts: cpuProducts,
        langList: langList
    });
});
// GPU
app.get('/product/gpu', function(req, res) {
    res.render('pages/product/gpu/gpu', {
        gpuProducts: gpuProducts,
        langList: langList
    });
});
// Product request
app.get('/shopping-cart', function(req, res) {
    res.render('pages/product/product-request', {
        countryList: countryList,
        langList: langList
    });
});
// Product confirmation
app.post('/shopping-cart/confirmation', (req, res) => {
    var compiled = ejs.compile(fs.readFileSync(__dirname + '/views/pages/email-template/confirm/confirm.ejs', 'utf-8'));
    var htmlMail = compiled({
        name : `${req.body.name}`,
        firstname: `${req.body.firstname}`,
        adress: `${req.body.adress}`,
        NPA: `${req.body.NPA}`,
        city: `${req.body.city}`,
        country: `${req.body.country}`,
        cart: req.body.cart,
        total: req.body.cart.reduce((derniereValeur, valeurCourante) => derniereValeur + (valeurCourante.quantity * valeurCourante.price), 0)
    }).toString()

    let stmpTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'ntxtechnologie@gmail.com', 
            pass: 'William17_'
        },
        tls:{
            rejectUnauthorized:false
        }
    });
        
    let mailOptions = {
        from: 'ntxtechnologie@gmail.com', 
        to: `${req.body.email}, ntxtechnologie@gmail.com`, 
        subject: 'Reçu de commande', 
        html: htmlMail,
        attachments: [{
            filename: 'Logo-NTX-blanc.png',
            path: __dirname + '/views/pages/email-template/confirm/asset/Logo-NTX-blanc.png',
            cid: 'logo'
        }]
    };
    
    stmpTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    res.render('pages/product/product-confirmation', {
        langList: langList
    });
});


// news page
app.get('/news', function(req, res) {
    res.render('pages/news/news', {
        langList: langList
    });
});
// news CPU
app.get('/news/speedx', function(req, res) {
    res.render('pages/news/speedx/speedx', {
        langList: langList
    });
});
// news CPU
app.get('/news/scantracing', function(req, res) {
    res.render('pages/news/scantracing/scantracing', {
        langList: langList
    });
});
// news CPU
app.get('/news/cpu', function(req, res) {
    res.render('pages/news/news-cpu/cpu', {
        langList: langList
    });
});

// partner page
app.get('/partner', function(req, res) {
    res.render('pages/partner/partner', {
        langList: langList
    });
});


// support page
app.get('/support', function(req, res) {
    res.render('pages/support/support', {
        langList: langList
    });
});
// CPU Support
app.get('/support/cpu', function(req, res) {
    res.render('pages/support/cpu-support/cpu-support', {
        langList: langList
    });
});
// GPU support
app.get('/support/gpu', function(req, res) {
    res.render('pages/support/gpu-support/gpu-support', {
        langList: langList
    });
});
// Send page
app.post('/support/send', (req, res) => {
    var compiled = ejs.compile(fs.readFileSync(__dirname + '/views/pages/email-template/support/support.ejs', 'utf-8'));
    var htmlMail = compiled({
        model: `${req.body.model}`,
        serial: `${req.body.serialNumber}`,
        problem: `${req.body.problem}`
    }).toString()
    console.log(req.body)
    
    let stmpTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'ntxtechnologie@gmail.com', 
            pass: 'William17_'
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    
    let mailOptions = {
        from: 'ntxtechnologie@gmail.com', 
        to: `${req.body.email}`, 
        subject: 'Copie du message au support', 
        html: htmlMail,
        attachments: [{
            filename: 'Logo-NTX-blanc.png',
            path: __dirname + '/views/pages/email-template/support/asset/Logo-NTX-blanc.png',
            cid: 'logo'
        }]
    };
    
    stmpTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    res.render('pages/support/send', {
        langList : langList
    });
})


// who are we
app.get('/who-are-we', function(req, res) {
    res.render('pages/who-are-we/who-are-we', {
        langList: langList
    });
});
// about
app.get('/who-are-we/about', function(req, res) {
    res.render('pages/who-are-we/about/about', {
        langList: langList
    });
});
// about-vision
app.get('/who-are-we/about#vision', function(req, res) {
    res.render('pages/who-are-we/about/about#vision', {
        langList: langList
    });
});
// about-history
app.get('/who-are-we/about#history', function(req, res) {
    res.render('pages/who-are-we/about/about#history', {
        langList: langList
    });
});
// about-contact
app.get('/who-are-we/about#contact', function(req, res) {
    res.render('pages/who-are-we/about/about#contact', {
        langList: langList
    });
});


// error
app.get('*', function(req, res) {
    res.render('pages/error', {
        langList: langList,
        countryList: countryList
    });
});


app.listen(PORT);
console.log(`Starting application on port ${PORT}`);