const path = require("path");
const express = require("express");
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
  })

const upload = multer({ storage: storage })


const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended : false}));

app.get("/", (req, res) => {
    return res.render("homepage");
})


app.post("/upload", upload.single('profileImage'), function (req, res, next)  {
    console.log(req.file);
    console.log(req.body);
    console.log(`Uploading Done`);
})


app.listen(PORT, () => console.log('Server started at PORT : 8000'));



