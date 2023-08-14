const express = require('express');
const router = express.Router();
const Manga= require("../models/Manga.model")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/collections", (req, res, next) => {
  res.render('collections')

  
})



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




router.get("/mangas",(req, res, next) =>{
  Manga.find(mangas)
  .select({title:1})
  .then(()=>{

  })
  .catch((error)=>{}
  )



  res.render("mangas")
})







router.get("/profile", (req, res, next) => {
  res.render('profile')
})

//

// Añadimos las rutas de auth para poder usarlas
const authRouter = require("./auth.routes.js");
router.use("/auth", authRouter)

//ruta del buscador
router.get("/search", (req, res, next)=>{

  res.render("search.hbs")
})

module.exports = router;
