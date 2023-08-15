const express = require("express");
const router = express.Router();
const Manga = require("../models/Manga.model");

// Importamos los middlewares para usarlos en las rutas
const { updateLocals, isLoggedIn, isAdmin } = require('../middlewares/auth.middlewares')
router.use(updateLocals)

/* GET home page */
router.get("/", (req, res, next) => {

  let isLogged = false;

  if (req.session.user !== undefined) {
    isLogged = true
  }
  console.log(isLogged)

  res.render("index", {
    isLogged
  });
});


router.get("/collections", (req, res, next) => {
  res.render("collections");



  // Manga.find({ collection: collection})
});

//ruta para todos los mangas
router.get("/mangas",isLoggedIn, (req, res, next) => {
  Manga.find()
    .select({ title: 1, image: 1 })
    
    .then((response) => {
      console.log(response);
      res.render("mangas.hbs", {
        mangaTitle: response,
      });
    })
    .catch((error) => {});
});

// Añadimos las rutas de auth para poder usarlas
const authRouter = require("./auth.routes.js");
router.use("/auth", authRouter);

//ruta para monstrar los tomos al clickar
router.get("/mangas/:mangaId", (req, res, next) => {
  let mangaId = req.params.mangaId;
  console.log(mangaId);

  Manga.findById(mangaId)
    .then((response) => {
      console.log(response);
      res.render("tomo.hbs", {
        manga: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

//ruta del buscador
router.get("/search", (req, res, next) => {
  console.log(req.query)
  Manga.findOne({ title: { $regex: req.query.search} })

  .then((foundManga)=>{
    console.log("hoilaaaaaaaaaaaaaaaaaa")
    res.render("tomo-details.hbs",{
      foundManga
    });
  })
  .catch((error)=>{
    next(error)
  })
  
});


// Ruta del perfil de usuario
router.get("/profile", (req, res) => {

  let puedeSubirManga = false;
  if (req.session.user.role === "admin") {
    puedeSubirManga = true
  }

  res.render('profile.hbs', { puedeSubirManga });

  // User
  //   .find({ username: req.session.user })
  //   .then((response) => {
  //     res.render('profile.hbs', { puedeSubirManga, user: response });
  //   })
 
})

router.get('/subir-manga', (req, res) => {
  res.render('subir-manga.hbs')
})

router.post('/subir-manga', async (req, res) => {
  const { title, numVolume, collectionType, description, author, genre, image } = req.body

  if (!title || !numVolume || !collectionType || !description || !author || !genre || !image) {
    res.status(400).render("/subir-manga.hbs", {
      errorMessage: "Todos los campos deben estar llenos",
    });
    return;
  }

  await Manga.create({
    title: title,
    numVolume: numVolume,
    collectionType: collectionType,
    description: description,
    author: author,
    genre: genre,
    image: image
  });

  res.redirect("/mangas");
})

module.exports = router;
