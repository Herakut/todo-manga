const express = require("express");
const router = express.Router();
const Manga = require("../models/Manga.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/collections", (req, res, next) => {
  res.render("collections");
});

// router.get("/mangas", async (req, res, next) => {

//   try {
//     // const data = await Manga.find()

//     // console.log(data)

//     res.render('mangas')

//     // res.render('mangas', {mangas: data})
//   } catch (error) {
//     next(error)
//   }

// })

//ruta para todos los mangas
router.get("/mangas", (req, res, next) => {
  Manga.find()
    .select({ title: 1 },{})
    





    
    .then((response) => {
      console.log(response);
      res.render("mangas.hbs", {
        mangaTitle: response,
      });
    })
    .catch((error) => {});
});

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

//ruta de creacion perfil
router.get("/create-profile", (req, res, next) => {
  res.render("/mangas/create-profil.hbs");
});

//ruta vista perfil

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

//

// Añadimos las rutas de auth para poder usarlas
const authRouter = require("./auth.routes.js");
router.use("/auth", authRouter);

//ruta del buscador
router.get("/search", (req, res, next) => {
  res.render("search.hbs");
});

module.exports = router;
