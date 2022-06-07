const express = require("express");
const ejs = require("ejs");
const path = require("path");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/data/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const personnes = [
  {
    nom: "Amani Bisimwa",
    image: "/data/uploads/9.png",
  },
  {
    nom: "Louis Musole",
    image: "/data/uploads/10.png",
  },
];

app.engine("html", ejs.__express);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { personnes });
});

app.post("/", upload.single("upload_file"), (req, res) => {
  const nouvellePersonne = {
    nom: req.body.nom,
    image: "/data/uploads/" + req.file.filename,
  };
  personnes.push(nouvellePersonne);
  res.render("index", { personnes });
});

app.listen(3000);
console.log("L'application tourne au port 3000");
