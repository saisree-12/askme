const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

app.use(express.urlencoded({ extended:true}));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads/'); // specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, 'temp' + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve your frontend code (if applicable)
app.use(express.static('public'));

// Handle file upload
app.post('/uploaded', upload.single('file'), (req, res) => {
  // Access the uploaded file using req.file

  const uploadedFile = req.file;

  // You can do further processing with the file, such as storing the filename in a database
  const fileName = uploadedFile.filename;

  // Respond with a success message
  res.json({ message: 'File uploaded successfully', fileName });
});

module.exports = app 