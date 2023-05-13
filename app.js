const express=require('express');
const path=require('path')
const port=8000;
const app = express();
const bodyparser= require("body-parser")
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    address: String,
    concern: String
  });
  const Contact = mongoose.model('Contact', contactSchema);
  

// EXPRESS RELATED STUFF
app.use('/static', express.static('static'));  // serving static files
app.use(express.urlencoded())

// PUG RELATED STUFF
app.set('view engine', 'pug');   // set the template engine as pug
app.set('views',path.join(__dirname,'views'));   // set views directory


// ENDPOINTS
app.get('/', (req,res)=>{
    const params= {}
    res.status(200).render('home.pug',params);
});
app.get('/contact', (req,res)=>{
    const params= {}
    res.status(200).render('contact.pug',params);
});

app.post('/contact', (req,res)=>{
    var myData= new Contact(req.body)
    myData.save().then(()=>{
        res.send("the data is saved on the database")
    }).catch(()=>{
        res.status(400).send("Item not saved")
    })
    // res.status(200).render('contact.pug',params);
});

// START THE SERVER
app.listen(port,()=>{
    console.log(`The application started succesfully on port ${port}`);
});