const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
const Arty = require("./models/artSchema")
 

///لعمل تحديث للموقع مباشرة///
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});




app.get('/', (req, res) => {
  Arty.find()
  
    res.render('index')
 
})

app.get('/Home', (req, res) => {
  Arty.find()
  .then((result) => {
    res.render('home', {qaboos:result })
  })
  .catch((err) => {console.log(err)})
})


app.get('/table', (req, res) => {
  Arty.find()
  .then((result) => {
    res.render('table', {qaboos:result })
  })
  .catch((err) => {console.log(err)})
   
})

app.get('/views/components/add.ejs', (req, res) => {
  res.render('components/add')
})

app.get('/views/components/ubdate.ejs', (req, res) => {
  res.render('components/ubdate')
})

app.get('/views/components/view.ejs', (req,res) => {
  res.render('components/view')
})


mongoose.connect('mongodb+srv://MajanCollege:Hashrinhaoman200200@cluster0.pkvmbhz.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => { 
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`)
    })
  })
  .catch((err) => { console.log(err) });





app.post("/", (req, res) => {
  const prr = new Arty(req.body)
  prr.save()
  .then(() => {res.redirect('home')})

  .catch((err) => {
    console.log(err)
  })
  console.log(req.body)
})  



