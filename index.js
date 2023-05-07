const express = require('express');
const port = 8000;
const path = require('path');

const db = require('./config/mongoose')
const Contact = require('./models/contacts')

const app = express();

app.set('view engine', 'ejs');   // ejs  provided to view engine
app.set('views', path.join(__dirname, 'views'))   //in predefined keyword "views" we give our ejs(html) file's folder

app.use(express.urlencoded()); // middleware
app.use(express.static('assets')); // css and js handler

// let contactList = [
//     {
//         name:'Adish',
//         phone:'454354353433'
//     },{
//         name:'Jaini',
//         phone:'098908394732'
//     }
// ]

app.get('/', function (req, res) {

    // Contact.find({},function(err,contacts){
    //     if(err){
    //         console.error(console,"Error in fetching contact details");
    //         return;
    //     }

    //     return res.render('home',{
    //         title:'Home Page' , 
    //         contact_list : contacts
    //     })
    // })

    Contact.find({})
        .then(contacts => {
            return res.render('home', {
                title: 'Home Page',
                contact_list: contacts
            });
        })
        .catch(error => {
            console.error('Error in fetching contact details', error);
            return;
        });

})

app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: 'My practice page'
    })
})

app.post('/create-contact', function (req, res) {

    // Contact.create({
    //     name: req.body.name,
    //     phone: req.body.phone
    // }, function (err, newContact) {
    //     if (err) {
    //         console.log("error in creating a contact");
    //         return;
    //     }

    //     console.log('*******', newContact);
    //     return res.redirect('back')
    // })

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
        .then(newContact => {
            console.log('*******', newContact);
            return res.redirect('back');
        })
        .catch(error => {
            console.log('error in creating a contact', error);
            return;
        });

})

//params
// not readed by our middleware - urlencoded

// app.get('/delete-contact/:phone',function(req,res){
//     console.log(req.params); //{ phone: '098908394732' }


// })

//query params
app.get('/delete-contact/', function (req, res) {
    //get the id from query in the ul
    let id = req.query.id;

    //find the contact in the database using id and delete
    // Contact.findByIdAndDelete(id, function (err) {
    //     if (err) {
    //         console.log("Error in deleting an object from database");
    //         return;
    //     }

    //     return res.redirect('back')
    // })

    Contact.findByIdAndDelete(id)
        .then(() => {
            return res.redirect('back');
        })
        .catch(error => {
            console.log('Error in deleting an object from database', error);
            return;
        });
})

app.listen(port, function (err) {
    if (err) {
        console.log("Error Occured", err);
        return;
    }

    console.log("Server is up and running");
})