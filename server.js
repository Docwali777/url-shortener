const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
let{Schema} = mongoose
const PORT = process.env.PORT || 3000
const URL = require('./Schemas/url');
const random = require('./functions/random')
const path = require('path');
const isUrl = require('is-url');



app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))


var url = process.env.MONGODB_URI

//url varia
mongoose.connect(url, (err)=>{
  if(err){ console.log('error')}
  else{console.log('connected')}
} )

mongoose.connection.on('connected', ()=>{
  console.log('mongoLAB')
})


//set view engine
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
  res.render('index', {
    url: '',
    shortenedUrl: ''

  })
})

app.post('/newURL', (req, res)=>{
let url = req.body.url //get form data
let code = random()   //generate random URL code
console.log(req.headers.origin)
var baseURL =req.headers.referer
if(url !== '' && isUrl(url)== true){
  console.log(typeof isUrl(url))
  var newUrl = new URL({ //create mongodb data
    id: code,
    url: url
  }).save((err)=>{  //save it to database
    if(err) {throw err}
    console.log('Save successful')
  })
    res.render('index', { //render to index page
      url: req.body.url,
      shortenedUrl: `${req.headers.origin}/newURL/${code}`
    })
} else {res.render('error')}
})

app.get('/newURL', (req,res)=>{
  res.render('index', {
    url: '',
    shortenedUrl: ''

  })
})

app.get('/newURL/:data', (req, res)=>{
let code =req.params.data

URL.findOne({id: code}, (err, url)=>{
  if(err) {throw err}
  else{
    res.redirect(url.url)

  }
})
})

app.listen(PORT, ()=>{
  console.log( `PORT ${PORT}`)
})
