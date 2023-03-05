const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv').config()
const cors = require('cors');
const authController = require('./controllers/authController')
const blogController = require('./controllers/blogController')
const multer = require('multer')


const app = express();


const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/blog', blogController)

require('dotenv').config();

// multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images')
    },
    filename: function(req, file, cb){
        cb(null, req.body.filename)
    }
})

const upload = multer({
    storage: storage
})

const uri = process.env.ATLAS_URI;
mongoose.set('strictQuery', false);
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB Connected");
})
app.use('/images', express.static('public/images'))


app.post('/upload', upload.single("image"), async(req, res) => {
    return res.status(200).json({msg: "Successfully uploaded"})
})


app.listen(8000, () => {
    console.log("App Listening")
})
