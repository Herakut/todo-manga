const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/collections", (req, res, next) => {
  res.render('collections')

  
})

router.get("/mangas", async (req, res, next) => {

  try {
    // const data = await Manga.find()

    // console.log(data)

    res.render('mangas')

    // res.render('mangas', {mangas: data})
  } catch (error) {
    next(error)
  }
  
})

router.get("/profile", (req, res, next) => {
  res.render('profile')
})

// Añadimos las rutas de auth para poder usarlas
const authRouter = require("./auth.routes.js");
router.use("/auth", authRouter)

module.exports = router;
