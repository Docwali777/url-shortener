const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
let{Schema} = mongoose
const PORT = process.env.PORT || 3000
const URL = require('./Schemas/url');
const random = require('./functions/random')

app.use(bodyParser.urlencoded({extended: true}))

// mongoose.connect('mongodb://localhost/url')
// 'mongodb://admin:admin@ds163340.mlab.com:63340/urlshortener'
var url = process.env.MONGOLAB_URI || 'mongodb://admin:admin@ds163340.mlab.com:63340/urlshortener'
mongoose.connect(url, (err)=>{
  if(err){ console.log('error')}
  else{console.log('connected')}
} )

mongoose.connection.on('connected', ()=>{
  console.log('connected to mongoLAB')
})


//set view engine
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
  res.render('index', {
    url: '',
    shortenedUrl: ''

  })
})

app.post('/', (req, res)=>{
let url = req.body.url //get form data
let code = random()   //generate random URL code
var baseURL =req.headers.referer
if(url !== ''){
  var newUrl = new URL({ //create mongodb data
    id: code,
    url: url
  }).save((err)=>{  //save it to database
    if(err) {throw err}
    console.log('Save successful')
  })
    res.json({ //render to index page
      url,
      shortenedUrl: `${baseURL}${code}`
    })
} else {res.send('Please enter URL')}
})

app.get('/:data', (req, res)=>{
let code =req.params.data
URL.findOne({id: code}, (err, url)=>{
  if(err) {throw err}
  else{
    res.redirect(`${url.url}`)
  }
})
})

app.listen(PORT, ()=>{
  console.log( `PORT ${PORT}`)
})
