const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
})

//jis naam se index.js mein apna database rahega
//Model name convention should be first letter capital
const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;